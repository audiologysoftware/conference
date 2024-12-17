import React, { useState } from 'react';
import './Registration.css';
import qr from '../assets/img/speakers/QR code.jpg'
const Registration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [paymentEmail, setPaymentEmail] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentResponse, setPaymentResponse] = useState("");
  const closeModal = () => setIsModalOpen(false);
  const [bankType, setBankType] = useState('');

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



  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentResponse("Payment details submitted successfully!");
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

                <h4 className="registration-info">Registration Fee</h4><p className='note'>(UPI and IMPS only)</p>
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
                <div className='note'>The last date for early bird registration is 20th January 2025.</div>
                <h6 style={{ textAlign: 'center' }}>
                  After registration, please sign up for RCI-CRE points:
                  <a href="https://shorturl.at/xzDI9" className="link" target="_blank" rel="noopener noreferrer">
                    RCI-CRE
                  </a>
                </h6>

                {/* Payment Section */}
                <div className="section-header">
                  <h3>Payment</h3>
                </div>
                <div className="paper-container">
                  <table className="paper-table">
                    <tbody>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>
                          <h5><b>Transaction Details</b></h5>
                          <form method="POST" action="#" id="payment-form">
                            <div className="form-group">
                              Email ID
                              <input
                                type="text"
                                name="emailid"
                                className="text-input"
                                placeholder="Email ID"
                                value={paymentEmail}
                                onChange={(e) => setPaymentEmail(e.target.value)}
                              />
                            </div>

                            <div className="form-group">
                              Transaction ID<br />
                              <input
                                type="text"
                                name="transactionid"
                                className="text-input"
                                placeholder="Transaction ID"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                              />
                            </div>

                            <div className="form-group">
                              <label>Bank Type</label>
                              <div className="select-wrapper">
                                <select
                                  name="banktype"
                                  className="text-input"
                                  value={bankType}
                                  onChange={(e) => setBankType(e.target.value)}
                                >
                                  <option value="">Select Bank Type</option>
                                  <option value="paytm">Paytm</option>
                                  <option value="phonepe">PhonePe</option>
                                  <option value="googlepay">Google Pay</option>
                                  <option value="imps">IMPS</option>
                                </select>
                              </div>
                            </div>



                            <div className="form-group">
                              <label>Attachment</label>
                              <input type="file" name="file" />
                            </div>

                            <div className="text-center">
                              <button
                                type="button"
                                id="payment-submit"
                                className="btn"
                                onClick={handlePaymentSubmit}
                              >
                                Submit
                              </button>
                            </div>

                            {paymentResponse && (
                              <div className="text-center mt-3">{paymentResponse}</div>
                            )}
                          </form>
                        </td>
                        <td style={{ verticalAlign: "top" }}>
                          <h5><b>QR Code</b></h5>
                          <center>
                            <img
                              src={qr}
                              alt="QR Code"
                              style={{ width: "150px", height: "150px" }}
                            />
                          </center>
                          <br />
                          <p className='grid-master'>
                         
                          <div className='grid-client'> <b>Name:</b> Karnataka Bank Ltd</div>
                          <div className='grid-client'> <b>Event:</b> National Conference On CBR</div>
                          <div className='grid-client'>  <b>A/C Number:</b> 6832000100002901</div>
                          <div className='grid-client'> <b>IFSC Code:</b> KARB0000683</div>
                          <div className='grid-client'> <b>Branch:</b> Ramanuja Road</div>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <h6 style={{ textAlign: 'center' }}>Contact Details</h6>
                <p style={{ textAlign: 'center' }}>Ms. Rashmi D G: 9448130580</p>
                <p style={{ textAlign: 'center' }}>Mrs. Amruthavarshini: 9739557938</p>

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
