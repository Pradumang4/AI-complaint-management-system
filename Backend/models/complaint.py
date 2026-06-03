from sqlalchemy import Column, Integer, String
from app.database.db import Base

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)

    category = Column(String)
    sentiment = Column(String)
    priority = Column(String)

    status = Column(String, default="Submitted")
    user = Column(String)
