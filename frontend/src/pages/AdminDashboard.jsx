import { useEffect, useState } from "react";
import { getComplaints, updateStatus } from "../api";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AdminDashboard() {

  const username = localStorage.getItem("username");
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await getComplaints(username);
    setData(res);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdate = async (id, status) => {
    await updateStatus(id, status);
    loadData(); // refresh
  };

  return (
    
      

      <div className="container py-5">
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        {/* Stats */}
        <div className="row g-4 mb-5">

          <div className="col-md-4">
            <div className="card text-center shadow border-0">
              <div className="card-body">
                <h3>{data.length}</h3>
                <p>Total Complaints</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow border-0">
              <div className="card-body">
                <h3>{data.filter(c => c.status !== "Resolved").length}</h3>
                <p>Pending</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow border-0">
              <div className="card-body">
                <h3>{data.filter(c => c.status === "Resolved").length}</h3>
                <p>Resolved</p>
              </div>
            </div>
          </div>

        </div>

        {/* Complaints */}
        <div className="card p-3">
          <h4>Manage Complaints</h4>

         {data.map((c) => (
  <div key={c.id} className="border p-3 mb-3 rounded">
    <h5>{c.text}</h5>
    <p>
      <strong>Category:</strong> {c.category} <br />
      <strong>Priority:</strong> {c.priority} <br />
      <strong>Status:</strong> {c.status}
    </p>

    <button
      className="btn btn-warning me-2"
      onClick={() => handleUpdate(c.id, "In Progress")}
    >
      Start
    </button>

    <button
      className="btn btn-success"
      onClick={() => handleUpdate(c.id, "Resolved")}
    >
      Resolve
    </button>
  </div>
))}

        </div>
      </div>

      
    
  );
}

export default AdminDashboard;
