import React, { useState } from 'react';
import './Registration.css';

const Registration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields.');
      return;
    }

    alert('Registration successful!');
    setFormData({ name: '', email: '' }); // Reset the form
    closeModal(); // Close the modal
  };

  return (
    <section id="registration" className="registration-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Conference Registration</h2>
          <p className="section-subtitle">Join us for an insightful conference!</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card registration-card">
              <div className="card-body">
              
                <h4 className="registration-info">Registration Fees</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Early Bird Fee</th>
                      <th>Post Early Bird Fee</th>
                      <th>Spot Registration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Students</td>
                      <td>₹2700</td>
                      <td>₹3200</td>
                      <td>₹3700</td>
                    </tr>
                    <tr>
                      <td>Professionals</td>
                      <td>₹2900</td>
                      <td>₹3500</td>
                      <td>₹4000</td>
                    </tr>
                  </tbody>
                </table>
                <h5>The last date for early bird registration is 20th January 2025.</h5>

                <h6>
                  After registration, please sign up for RCI-CRE points:
                  <a href="https://shorturl.at/xzDI9" className="link" target="_blank" rel="noopener noreferrer">
                    RCI-CRE
                  </a>
                </h6>

                <div className="text-center">
                  <button className="btn btn-primary" onClick={openModal}>Register Now</button>
                </div>
                <h3>Contact Details</h3>
                <p >Ms. Rashmi D G: 9448130580</p>
                <p >Mrs. Amruthavarshini: 9739557938</p>

              </div>
         
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="modal-close" onClick={closeModal}>&times;</span>
              <h3>Complete your Registration</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="btn btn-submit">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Registration;
