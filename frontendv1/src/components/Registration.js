import React, { useState, useRef } from 'react';
import './Registration.css';
import qr from '../assets/img/speakers/QR code.jpg';
import { registerUser } from '../api/usersapi';
import phonepe from '../assets/img/banks/phonepay.png'
import paytm from '../assets/img/banks/paytm.png'
import googlepay from '../assets/img/banks/googlepay.png'
import imps from '../assets/img/banks/imps.png'
import { modal } from 'react-modal'

const Registration = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    bank_type: "",
    transaction_id: "",
    transaction_screenshot: "",
    extension: "", // Added for file extension
    content_type: "", // Added for MIME type
    file_size: 0, // Added for file size in bytes
    email_type: "user-registration" // Added for email type
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
  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 });
  const screenShotFileUpload = useRef(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false }); // Reset the specific field error

  };

  const handleSelect = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false }); // Reset the specific field error

    //open modal
    setPhotoOpenToggle()
    //set a timer which will close the modal
    setTimeout(() => {
      closeModal()
    }, 3000);
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      const extension = file.name.split(".").pop(); // Get file extension
      const content_type = file.type; // Get MIME type
      const file_size = file.size; // Get file size in bytes
      if (file.size > 5 * 1024 * 1024) { // Example: 5MB limit
        alert("File size exceeds the limit of 5MB.");
        screenShotFileUpload.current.value = null;
        return;
      }
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        alert("Unsupported file type. only png/jpg files are alowed");
        screenShotFileUpload.current.value = null;
        return;
      }

      setForm({
        ...form,
        transaction_screenshot: base64,
        extension,
        content_type,
        file_size
      });
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


  const handleSubmit = async (e) => {
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

    setLoading(true); // Show loading spinner
    try {
      const res = await registerUser(form);
      console.log("Register User Response:", res);
      setLoading(false); // hide  loading spinner
      alert(res.detail.message);

      if (res.detail.status == "success") {
        setForm({
          fullname: "",
          email: "",
          phone: "",
          bank_type: "",
          transaction_id: "",
          transaction_screenshot: "",
          extension: "",
          content_type: "",
          file_size: 0,          
        });
        screenShotFileUpload.current.value = null;
        setErrors({
          fullname: false,
          email: false,
          phone: false,
          bank_type: false,
          transaction_id: false,
          transaction_screenshot: false,
        });
      }
    } catch (err) {
      console.error("Error registering user:", err);
      alert("User registration failed");
    }
    finally {
      setLoading(false); // hide  loading spinner
    }
  };



  const handleIconClick = (e) => {
    const photo = bankPhotos[form.bank_type];
    if (photo) {
      const iconRect = e.target.getBoundingClientRect();

      const viewportWidth = window.innerWidth;
      let offsetTop = iconRect.top;
      let offsetLeft = iconRect.left;

      if (viewportWidth <= 768) {
        // Mobile or tablet view
        offsetTop -= 500; // Adjust as needed for mobile view
        offsetLeft -= 0; // Adjust as needed for mobile view
      } else if (viewportWidth <= 1024) {
        // Tablet or small desktop view
        offsetTop -= 400; // Adjust as needed for tablet view
        offsetLeft -= 450; // Adjust as needed for tablet view
      } else {
        // Desktop view
        offsetTop -= 450; // Your original value for desktop
        offsetLeft -= 600; // Your original value for desktop
      }

      setIconPosition({ top: offsetTop, left: offsetLeft });
      setPhotoOpenToggle();
    } else {
      alert('Please select a valid bank type.');
    }
  };

  const setPhotoOpenToggle = () => {
    const photo = bankPhotos[form.bank_type];
    if (selectedBankPhoto === photo && isPhotoVisible) {
      setIsPhotoVisible(false);
    } else {
      setSelectedBankPhoto(photo);
      setIsPhotoVisible(true);
    }
  }

  const closeModal = () => {
    setIsClosing(true); // Trigger the animation
    setTimeout(() => {
      setIsPhotoVisible(false);
      setIsClosing(false); // Reset closing state for next time
    }, 500); // Match this duration with the CSS animation duration
  };


  const bankPhotos = {
    paytm,
    phonepe,
    googlepay,
    imps,
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
                  <th>Early Bird Fee (March 8th)</th>
                  <th>Post Early Bird Fee</th>
                  <th>Spot Registration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Students & Alumini</td>
                  <td>₹2000</td>
                  <td>₹2500</td>
                  <td>₹2800</td>
                </tr>
                <tr>
                  <td>Professionals</td>
                  <td>₹2500</td>
                  <td>₹2800</td>
                  <td>₹3100</td>
                </tr>
              </tbody>
            </table>
            <div className='note'>The last date for early bird registration is 8th March 2025.</div>


            {/* Payment Section */}
            <div className="section-header">
              <h3>Registation and Payment</h3>
            </div>
            <div className="paper-container">
              <table className="paper-table">
                <tbody>
                  <tr>
                    <td className='paper-table-column' style={{ verticalAlign: "top" }}>
                      <div className='note'>Note: First Scan the QR Code for Payment</div>
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
                        <div className='grid-client'> <b>Event:</b> VISHRUTA 2:JSS ANNUAL VAK-SHRAVANA CONFERENCE 2025</div>
                        <div className='grid-client'> <b>A/C Number:</b> 6832000100002901</div>
                        <div className='grid-client'> <b>IFSC Code:</b> KARB0000683</div>
                        <div className='grid-client'> <b>Branch:</b> Ramanuja Road</div>
                      </p>
                    </td>
                    <td className='paper-table-column' style={{ verticalAlign: "top" }}>
                      <div className='note'>Note: Provide the Transaction Details After Payment</div>
                      <h5><b>Transaction Details</b></h5>

                      <form method="POST" action="#" id="payment-form" onSubmit={handleSubmit}>
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
                          {errors.fullname && <span className="error"> <i className="required-icon">*</i> This field is required</span>}
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
                          {errors.email && <span className="error"> <i className="required-icon">*</i> This field is required</span>}
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
                          {errors.phone && <span className="error"> <i className="required-icon">*</i> This field is required</span>}
                        </div>

                        <div className="form-group">
                          Bank Type
                          <div className="select-wrapper">
                            <select
                              name="bank_type"
                              className="text-input"
                              value={form.bank_type}
                              onChange={handleSelect}
                            >
                              <option value="">Mode of Payment</option>
                              <option value="paytm">Paytm</option>
                              <option value="phonepe">PhonePe</option>
                              <option value="googlepay">Google Pay</option>
                              <option value="imps">IMPS</option>
                            </select>
                          </div>
                          {errors.bank_type && <span className="error"> <i className="required-icon">*</i> This field is required</span>}
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
                              maxLength={12}
                              minLength={12}
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
                              <i className="required-icon">*</i> This field is required
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          Attachment <br/>(png/jpg only)
                          <input type="file" ref={screenShotFileUpload} name="transaction_screenshot" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" />
                          {errors.transaction_screenshot && <span className="error"> <i className="required-icon">*</i> This field is required</span>}
                        </div>

                        <div className="text-center">
                          <button
                            type="submit"
                            id="payment-submit"
                            className="btn btn-primary"
                          >
                            {loading ? (
                              <span className="spinner" /> // Replace with a spinner element
                            ) : (
                              "Submit"
                            )}
                          </button>
                        </div>
                      </form>
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>
            <h6 style={{ textAlign: 'center' }}>
              After registration, please sign up for RCI-CRE points:
              <a href="https://shorturl.at/xzDI9" className="link" target="_blank" rel="noopener noreferrer">
                RCI-CRE
              </a>
            </h6>

            <h6 style={{ textAlign: 'center' }}>Contact Details</h6>
            <p style={{ textAlign: 'center' }}>Ms. Rashmi D G: 9448130580</p>
          </div>
        </div>
      </div>

      {/* {Display the following as pop modal} */}
      {isPhotoVisible && selectedBankPhoto && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className={`modal-content ${isClosing ? "modal-closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
            style={
              isClosing
                ? {
                  "--closing-top": `${iconPosition.top}px`,
                  "--closing-left": `${iconPosition.left}px`,
                }
                : {}
            }
          >
            <div className="bank-photo">
              <img
                src={selectedBankPhoto}
                alt="Bank"
                style={{
                  width: '200px',
                  marginTop: '20px',
                  borderRadius: '10px',
                }}
              />
            </div>
            <button className="btn btn-primary close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}


    </section>
  );
};

export default Registration;