

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
  return (
    
     

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="fw-bold">About Us</h1>
            <p className="lead text-muted">
              Revolutionizing complaint handling with Artificial Intelligence
            </p>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978"
                alt="About"
                className="img-fluid rounded shadow"
              />
            </div>

            <div className="col-lg-6">
              <h3 className="mb-4">Who We Are</h3>
              <p>
                AI Complaint Management System is a smart platform designed to
                automate complaint registration, categorization, tracking and
                resolution using advanced artificial intelligence.
              </p>

              <p>
                Our mission is to improve customer satisfaction by providing
                quick, transparent and efficient complaint resolution.
              </p>

              <div className="mt-4">
                <div className="mb-3">
                  <h5>✔ Smart Complaint Analysis</h5>
                </div>

                <div className="mb-3">
                  <h5>✔ Real-Time Tracking</h5>
                </div>

                <div className="mb-3">
                  <h5>✔ Secure Data Management</h5>
                </div>

                <div className="mb-3">
                  <h5>✔ Faster Resolution</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    
  );
}

export default About;
