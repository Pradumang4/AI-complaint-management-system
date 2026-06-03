from app.models.user import User
from app.services.auth import hash_password, verify_password, create_token

from fastapi.middleware.cors import CORSMiddleware
from app.services.ai import analyze_complaint

from app.database.db import SessionLocal, engine, Base
from app.models.complaint import Complaint
from app.services.similarity import is_duplicate
from sentence_transformers import SentenceTransformer, util
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

model = SentenceTransformer('all-MiniLM-L6-v2')
  
app = FastAPI()

# create tables
Base.metadata.create_all(bind=engine)

@app.post("/complaint")
def create_complaint(text: str, username: str, db: Session = Depends(get_db)):

    # 🔍 Get all user's active complaints
    complaints = db.query(Complaint).filter(
        Complaint.username == username,
        Complaint.status != "Resolved"
    ).all()

    # 🔍 Compare similarity
    new_embedding = model.encode(text, convert_to_tensor=True)

    for c in complaints:
        existing_embedding = model.encode(c.text, convert_to_tensor=True)

        similarity = util.cos_sim(new_embedding, existing_embedding).item()

        if similarity > 0.75:   # 🔥 threshold
            return {
                "error": "Similar complaint already exists ❌"
            }

    # ✅ Save if unique
    complaint = Complaint(
        text=text,
        username=username,
        status="Submitted"
    )

    db.add(complaint)
    db.commit()
    db.refresh(complaint)

    return complaint

@app.get("/complaints")
def get_all_complaints(username: str):
    db = SessionLocal()

    if username == "admin":
       complaints = db.query(Complaint).all()   # ✅ admin sees all
    else:
       complaints = db.query(Complaint).filter(Complaint.user == username).all()

    result = []
    for c in complaints:
        result.append({
            "id": c.id,
            "text": c.text,
            "category": c.category,
            "sentiment": c.sentiment,
            "priority": c.priority,
            "status": c.status
        })

    return result

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
def register(username: str, password: str):
    db = SessionLocal()
    
    existing = db.query(User).filter(User.username == username).first()
    if existing:
        return {"error": "User already exists"}

    user = User(username=username, password=hash_password(password))
    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User created"}

@app.post("/login")
def login(username: str, password: str):
    db = SessionLocal()

    user = db.query(User).filter(User.username == username).first()

    if not user or not verify_password(password, user.password):
        return {"error": "Invalid credentials"}

    token = create_token({"username": username})

    return {"token": token}


@app.put("/update-status")
def update_status(id: int, status: str):
    db = SessionLocal()

    complaint = db.query(Complaint).filter(Complaint.id == id).first()

    if not complaint:
        return {"error": "Complaint not found"}

    complaint.status = status
    db.commit()

    return {"message": "Status updated"}
    
   
@app.get("/complaint/{id}")
def get_complaint_by_id(id: int):
    db = SessionLocal()

    complaint = db.query(Complaint).filter(Complaint.id == id).first()

    if not complaint:
        return {"error": "Complaint not found"}

    return complaint   
