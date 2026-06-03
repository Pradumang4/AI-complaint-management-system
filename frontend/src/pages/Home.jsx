// src/pages/Home.jsx

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      

      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">
            AI Complaint Management System
          </h1>

          <p className="lead mt-3">
            Smart, Fast and Efficient Complaint Resolution Platform
          </p>

          <div className="mt-4">
            <Link to="/login" className="btn btn-light btn-lg me-3">
              Login
            </Link>

            <Link to="/register" className="btn btn-outline-light btn-lg">
              Register
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container text-center">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow h-100">
                <div className="card-body">
                  <i className="bi bi-robot display-4 text-primary"></i>
                  <h4 className="mt-3">AI Analysis</h4>
                  <p>
                    Automatically categorize and prioritize complaints using AI.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow h-100">
                <div className="card-body">
                  <i className="bi bi-lightning-charge display-4 text-success"></i>
                  <h4 className="mt-3">Fast Resolution</h4>
                  <p>
                    Resolve issues quickly with intelligent routing.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow h-100">
                <div className="card-body">
                  <i className="bi bi-shield-check display-4 text-danger"></i>
                  <h4 className="mt-3">Secure Platform</h4>
                  <p>
                    Your complaints are safe and confidential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </>
  );
}

export default Home;
