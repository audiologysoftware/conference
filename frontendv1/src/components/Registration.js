import React, { useState, useRef, createRef } from 'react';
import './Registration.css';
import qr from '../assets/img/speakers/QR code.jpg'
import { registerUser } from '../api/users';

const Registration = () => {
  
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    bank_type: "",
    transaction_id: "",
  });

  const filehandler = useRef();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(1)
    if (file) {
      const base64 = await convertToBase64(file);    
      setForm({ ...form, transaction_screenshot: base64 });
    }
  };

  // Function to convert a file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };


  const handlePaymentSubmit = async(e) => {
    e.preventDefault();
    e.preventDefault();        
    try {      
      const res = await registerUser(form);
      console.log("Register User Response:", res);
      alert("Payment details submitted successfully!");
      setForm({
        fullname: "",
        email: "",
        phone: "",
        bank_type: "",
        transaction_id: "",
      });
      filehandler.current.value = "";
    } catch (err) {
      console.error("Error registering user:", err);
      alert("Payment details failed to submit");
    }
  };

  return (

    <div className="reg-container">


      <div className="card registration-card">
        <div className="card-body">
          <h2 className="section-title">Conference Registration</h2>
          <p className="section-subtitle">Join us for an insightful conference!</p>
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
                  <td className='paper-table-column' style={{ verticalAlign: "top"}}>
                    <h5><b>Transaction Details</b></h5>
                    <form method="POST" action="#" id="payment-form">

                    <div className="form-group">
                        Full name
                        <input
                          type="text"
                          name="fullname"
                          className="text-input"
                          placeholder="Fullname"
                          value={form.fullname}
                          onChange={handleChange}
                        />
                      </div>
                     
                    <div className="form-group">
                        Email ID
                        <input
                          type="text"
                          name="email"
                          className="text-input"
                          placeholder="Email ID"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>
                     
                      <div className="form-group">
                        Phone
                        <input
                          type="text"
                          name="phone"
                          className="text-input"
                          placeholder="phone number"
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Bank Type</label>
                        <div className="select-wrapper">
                          <select
                            name="bank_type"
                            className="text-input"
                            value={form.bank_type}
                            onChange={handleChange}
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
                        Transaction ID<br />
                        <input
                          type="text"
                          name="transaction_id"
                          className="text-input"
                          placeholder="Transaction ID"
                          value={form.transaction_id}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Attachment</label>
                        <input type="file" ref={filehandler} name="transaction_screenshot" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" required />
                      </div>

                      

                      <div className="text-center">
                        <button type="button"  id="payment-submit"  className="btn btn-primary"  onClick={handlePaymentSubmit}> Submit </button>
                      </div>
                    </form>
                  </td>
                  <td className='paper-table-column' style={{ verticalAlign: "top"}}>
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

  );
};

export default Registration;
