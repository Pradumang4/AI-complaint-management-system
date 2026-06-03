
import { getComplaintById } from "../api";
import { useState } from 'react';
import { getComplaints } from "../api";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Status() {
  const username = localStorage.getItem("username");
  const [complaintId, setComplaintId] = useState('');
  const [complaint, setComplaint] = useState(null);


const handleSearch = async (e) => {
  e.preventDefault();

  const res = await getComplaintById(complaintId);

  if (res.error) {
    setComplaint(null);
    alert("Complaint not found ❌");
  } else {
    setComplaint(res); // ✅ full object
  }
};

  const getBadgeClass = () => {
  if (!complaint) return "bg-secondary";

  if (complaint.status === 'Submitted') return 'bg-primary';
  if (complaint.status === 'In Progress') return 'bg-warning text-dark';
  if (complaint.status === 'Resolved') return 'bg-success';

  return 'bg-secondary';
};

  return (
    
      

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="card shadow border-0">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">
                  Track Complaint Status
                </h2>

                <form onSubmit={handleSearch}>
                  <div className="input-group mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Complaint ID"
                      value={complaintId}
                      onChange={(e) => setComplaintId(e.target.value)}
                      required
                    />
                    <button className="btn btn-primary" type="submit">
                      Search
                    </button>
                  </div>
                </form>

                {complaint && (
  <div className="card mt-4 p-4 shadow">
    <h5><strong>ID:</strong> {complaint.id}</h5>

    <p><strong>Complaint:</strong> {complaint.text}</p>

    <p><strong>Category:</strong> {complaint.category}</p>

    <p><strong>Priority:</strong> {complaint.priority}</p>

    <p>
      <strong>Status:</strong>{" "}
      <span className={`badge ${getBadgeClass()} px-3 py-2`}>
        {complaint.status}
      </span>
    </p>
  </div>
  )}
              </div>
            </div>
          </div>
        </div>
      </div>

    
    
  );
}

export default Status;
