// src/pages/UserDashboard.jsx
import { getComplaints } from '../api';
import { useEffect } from 'react';

import { createComplaint } from '../api';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



function UserDashboard() {
  const username = localStorage.getItem("username");
  const [complaint, setComplaint] = useState({
    title: '',
    category: '',
    description: ''
  });
  const [list, setList] = useState([]);

const loadComplaints = async () => {
  const data = await getComplaints(username);
  setList(data);
};

useEffect(() => {
  loadComplaints();
}, []);

  const handleChange = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  loadComplaints();

  // combine fields into one text (backend expects single "text")
  const text = `${complaint.title} - ${complaint.category} - ${complaint.description}`;

  if (!complaint.title || !complaint.category || !complaint.description) {
    alert("Please fill complaint ❌");
    return;
  }

  const res = await createComplaint(text,username);

  if (res.message === "Duplicate complaint detected") {
    alert("Duplicate complaint ❌");
  } else {
    alert(`Complaint submitted ✅\nYour ID: ${res.id}`);
  }



    setComplaint({
      title: '',
      category: '',
      description: ''
    });
  };

  return (
    
      

      <div className="container py-5">
        <h2 className="mb-4 text-center">User Dashboard</h2>

        <div className="row">
          <div className="col-lg-5 mb-4">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <h4 className="mb-4">Submit Complaint</h4>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Complaint Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={complaint.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      name="category"
                      className="form-select"
                      value={complaint.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option>Billing</option>
                      <option>Service</option>
                      <option>Technical</option>
                      <option>Product</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      rows="5"
                      className="form-control"
                      value={complaint.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Submit Complaint
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <h4 className="mb-4">My Complaints</h4>

                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                 <tbody>
                  {list.map((c) => (
                    <tr key={c.id}>
                   <td>{c.id}</td>
                    <td>{c.text}</td>
                        <td>
                   <span className={`badge ${
                    c.status === "Resolved"
                    ? "bg-success"
                     : c.status === "In Progress"
                       ? "bg-info"
                        : "bg-warning text-dark"
                       }`}>
                       {c.status}
                       </span>
                       </td>
                        </tr>
                   ))}
                   </tbody>
                 
                 
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    
  );
}

export default UserDashboard;
