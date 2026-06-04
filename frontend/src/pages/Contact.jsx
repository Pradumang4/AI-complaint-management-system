

// Correct Import Paths

import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Contact Form:', formData);

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    
      

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="fw-bold">Contact Us</h1>
            <p className="lead text-muted">
              We'd love to hear from you
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow border-0">
                <div className="card-body p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="form-label">Your Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Message</label>
                      <textarea
                        name="message"
                        rows="6"
                        className="form-control"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    
  );
}

export default Contact;
