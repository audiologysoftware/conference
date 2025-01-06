import React, { useState, useRef } from 'react';
import './Registration.css';
import qr from '../assets/img/speakers/QR code.jpg';
import { registerUser } from '../api/users';
import phonepe from '../assets/img/banks/phonepay.png'
import paytm from '../assets/img/banks/paytm.png'
import googlepay from '../assets/img/banks/googlepay.png'
import imps from '../assets/img/banks/imps.png'

const Registration = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    bank_type: "",
    transaction_id: "",
    transaction_screenshot: "",
  });
  const [selectedBankPhoto, setSelectedBankPhoto] = useState(null);
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);
  const [errors, setErrors] = useState({
    fullname: false,
    email: false,
    phone: false,
    bank_type: false,
    transaction_id: false,
    transaction_screenshot: false,
  });
  const fileHandler = useRef()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false }); // Reset the specific field error
    
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setForm({ ...form, transaction_screenshot: base64 });
      setErrors({ ...errors, transaction_screenshot: false }); // Reset the error for the file input
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
  const handleIconClick = () => {
    const photo = bankPhotos[form.bank_type];
    if (photo) {
      if (selectedBankPhoto === photo && isPhotoVisible) {
        // If the same photo is already visible, toggle off
        setIsPhotoVisible(false);
      } else {
        // Otherwise, set the photo and toggle on
        setSelectedBankPhoto(photo);
        setIsPhotoVisible(true);
      }
    } else {
      alert('Please select a valid bank type.');
    }
  };

  const bankPhotos = {
    paytm,
    phonepe,
    googlepay,
    imps,
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {
      fullname: !form.fullname.trim(),
      email: !form.email.trim(),
      phone: !form.phone.trim(),
      bank_type: !form.bank_type.trim(),
      transaction_id: !form.transaction_id.trim(),
      transaction_screenshot: !form.transaction_screenshot,
    };

    setErrors(newErrors);

    // Check if any required field is empty
    if (Object.values(newErrors).some((error) => error)) {
      return; // Prevent submission if validation fails
    }

    try {
      const res = await registerUser(form);      
      alert("User registered successfully!");
      setForm({
        fullname: "",
        email: "",
        phone: "",
        bank_type: "",
        transaction_id: "",
        transaction_screenshot: "",
      });
      setErrors({
        fullname: false,
        email: false,
        phone: false,
        bank_type: false,
        transaction_id: false,
        transaction_screenshot: false,
      });
      fileHandler.current.value = '';
    } catch (err) {      
      alert("User registration failed, please check, emailid, phonenumber and transactionid(no duplication allowed)");
    }
  };

  const isFormValid = Object.values(form).every((value) => value !== "");

  return (
    <section id="registration">
      <div className="reg-container">
        <div className="card registration-card">
          <div className="card-body">
            <h2 className="section-title">Conference Registration</h2>
            <p className="section-subtitle">Join us for an insightful conference!</p>
            <h4 className="registration-info">Registration Fee</h4>
            <p className='note'>(UPI and IMPS only)</p>
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
                    <td className='paper-table-column' style={{ verticalAlign: "top" }}>
                      <h5><b>Transaction Details</b></h5>
                      <form method="POST" action="#" id="payment-form" onSubmit={handlePaymentSubmit}>
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
                          {errors.fullname && <span className="error"> <i className="required-icon">*</i></span>}
                        </div>

                        <div className="form-group">
                          Email ID
                          <input
                            type="email"
                            name="email"
                            className="text-input"
                            placeholder="Email ID"
                            value={form.email}
                            onChange={handleChange}
                          />
                          {errors.email && <span className="error"> <i className="required-icon">*</i></span>}
                        </div>

                        <div className="form-group">
                          Phone
                          <input
                            type="text"
                            name="phone"
                            className="text-input"
                            placeholder="Phone number"
                            value={form.phone}
                            onChange={handleChange}
                          />
                          {errors.phone && <span className="error"> <i className="required-icon">*</i></span>}
                        </div>

                        <div className="form-group">
                          Bank Type
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
                          {errors.bank_type && <span className="error"> <i className="required-icon">*</i> </span>}
                        </div>

                        <div className="form-group">
                          Transaction ID
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input
                              type="text"
                              name="transaction_id"
                              className="text-input"
                              placeholder="Transaction ID"
                              value={form.transaction_id}
                              onChange={handleChange}
                              style={{ flex: 1 }}
                            />
                            <i
                              className="info-icon"
                              style={{
                                cursor: 'pointer',
                                marginLeft: '10px',
                                color: '#007bff',
                              }}
                              onClick={handleIconClick}
                            >
                              ℹ️
                            </i>
                          </div>
                          {errors.transaction_id && (
                            <span className="error">
                              <i className="required-icon">*</i> 
                            </span>
                          )}
                        </div>

                        {/* Display bank photo */}
                        {isPhotoVisible && selectedBankPhoto && (
                          <div className="bank-photo">
                            <img
                              src={selectedBankPhoto}
                              alt="Bank"
                              style={{ width: '200px', marginTop: '20px', borderRadius: '10px' }}
                            />
                            <button className='btn btn-primary' onClick={()=>setIsPhotoVisible(false)}>Ok</button>
                          </div>                          
                        )}
                        <div className="form-group">
                          Attachment
                          <input type="file" ref={fileHandler} name="transaction_screenshot" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" />
                          {errors.transaction_screenshot && <span className="error"> <i className="required-icon">*</i> This field is required</span>}
                        </div>

                        <div className="text-center">
                          <button
                            type="submit"
                            id="payment-submit"
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </td>
                    <td className='paper-table-column' style={{ verticalAlign: "top" }}>
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
                        <div className='grid-client'> <b>A/C Number:</b> 6832000100002901</div>
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
            <p style={{ textAlign: 'center' }}>Email: </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
