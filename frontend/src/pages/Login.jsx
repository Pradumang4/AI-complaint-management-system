
import { loginUser } from "../api";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); // default user

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.username || !formData.password) {
    alert("Fill all fields ");
    return;
  }
  
  if (role === "admin" && formData.username !== "admin") {
  alert("Only admin can login here ");
  return;
}

  const res = await loginUser(formData.username, formData.password);

  if (res.token) {
  localStorage.setItem("token", res.token);
  localStorage.setItem("username", formData.username);
  localStorage.setItem("role", role);

  alert("Login successful ✅");

  if (role === "admin") {
    navigate("/admin-dashboard");
  } else {
    navigate("/user-dashboard");
  }

} else {
  alert("Invalid credentials ");
}
};

  return (
    
      

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow border-0">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Login</h2>
                
                <div className="d-flex justify-content-center mb-4">
                <button
                type="button"
           className={`btn me-2 ${role === "user" ? "btn-primary" : "btn-outline-primary"}`}
             onClick={() => setRole("user")}
             >
              User
           </button>

           <button
         type="button"
            className={`btn ${role === "admin" ? "btn-danger" : "btn-outline-danger"}`}
               onClick={() => setRole("admin")}
             >
               Admin
             </button>
                   </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                  {role === "admin" ? "Admin Login" : "User Login"}

                  </button>
                </form>

                {role === "user" && (
  <p className="text-center mt-4 mb-0">
    Don't have an account?{' '}
    <Link to="/register">Register Here</Link>
  </p>
)}
              </div>
            </div>
          </div>
        </div>
      </div>

      
  );
}

export default Login;
