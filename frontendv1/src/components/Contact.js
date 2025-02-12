import React, { useState } from 'react';
import './Contact.css';
import {addQuery} from '../api/queries'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await addQuery(formData)
    setResponseMessage(response);
    // Clear form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    alert("your query submitted successfully!");
  };

  return (
    <section id="contact" className="section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Contact Us</h2>
        </div>

        <div className="row contact-info">
          <div className="col-md-4">
            <div className="contact-address">
              <i className="bi bi-geo-alt"></i>
              <h3>Address</h3>
              <address>JSS Institute Of Speech And Hearing, Mysuru</address>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-phone">
              <i className="bi bi-phone"></i>
              <h3>Phone Number</h3>
              <p>+91 9986511550</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-email">
              <i className="bi bi-envelope"></i>
              <h3>Email</h3>
              <p>hemanthn.shetty@jssish.in</p>
            </div>
          </div>
        </div>

        <div className="section-header">
          <h2 className="mt-8">Any Query?</h2>
        </div>

        <div className="form">
          <form onSubmit={handleSubmit} id="write-form">
            <div className="row">
              <div className="form-group col-md-6">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-6 mt-3 mt-md-0">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="emailid"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group mt-3">
              <input
                type="text"
                name="subject"
                className="form-control"
                id="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group mt-3">
              <textarea
                className="form-control"
                name="message"
                id="message"
                rows="5"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="text-center mt-3">
              <button type="submit" className="btn" id="write-submit">Send Message</button>
            </div>
          </form>
        </div>

        {responseMessage && <div id="feedback-response" className="mt-3 text-center">{responseMessage}</div>}
      </div>
    </section>
  );
};

export default Contact;
