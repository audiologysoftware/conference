import React, { useState } from "react";
import "./Upload.css";
import qr from '../assets/img/speakers/QR code.jpg'
const Upload = () => {
  const [abstractFile, setAbstractFile] = useState(null);
  const [plagiarismFile, setPlagiarismFile] = useState(null);
  const [manuscriptFile, setManuscriptFile] = useState(null);
  const [email, setEmail] = useState("");
  const [paymentEmail, setPaymentEmail] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentResponse, setPaymentResponse] = useState("");

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    alert(`Submitted ${type} successfully!`);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentResponse("Payment details submitted successfully!");
  };

  return (
    <section id="buy-tickets" className="section-with-bg text-center">
      <div className="container" data-aos="fade-up">
        {/* Paper Upload Section */}
        <div className="section-header">
          <h2>Manuscript Upload</h2>
        </div>
        <div className="paper-container">
          <form method="POST" action="#" id="paper-upload-form">
            <table className="paper-table">
              <tbody>
                <tr>
                  <td className="abstract" style={{ verticalAlign: "top" }}>
                    <h2 className="dark-black-text"><b>Abstract</b></h2>
                    <p>
                      <a href="https://docs.google.com/document/d/1uf_wllM4xaO1sz856e943OizSHsQztgW/edit?usp=sharing&ouid=104714808109637915499&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer"><u>Download template</u></a>
                      <br />
                      <a href="https://docs.google.com/document/d/1eosrShnBkmhTXX1LqphqTcR15PJgxNCp/edit?usp=sharing&ouid=104714808109637915499&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer"><u>Download Submission Guideline</u></a>
                    </p>
                    <div className="form-group">
                      <label>Email ID</label>
                      <input
                        type="email"
                        name="emailid"
                        className="text-input"
                        id="abstract-emailid"
                        placeholder="Email ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <br />
                    <label>Abstract Upload</label>
                    <input
                      type="file"
                      id="abstractAttachment"
                      name="file"
                      onChange={(e) => handleFileChange(e, setAbstractFile)}
                    />
                    <br /><br />
                    <div className="text-center">
                      <button
                        type="button"
                        id="abstract-submit"
                        className="btn"
                        onClick={(e) => handleSubmit(e, "Abstract")}
                      >
                        Submit
                      </button>
                    </div>
                  </td>

                  <td className="paper" style={{ verticalAlign: "top" }}>
                    <h3 className="dark-black-text"><b>Full-Length Paper</b></h3>
                    <p>
                      <a href="https://docs.google.com/document/d/1q9rT7fRW2cJ_2LbxbmFRg1XQUGJXAouU/edit?usp=sharing&ouid=104714808109637915499&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer"><u>Download template</u></a>
                      <br />
                      <a href="https://docs.google.com/document/d/1mzCue_s_ClAt0EVG_EHL-GVgocd0exWL/edit?usp=sharing&ouid=104714808109637915499&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer"><u>Download Submission Guideline</u></a>
                      <br />
                      <a href="https://shorturl.at/oxJPQ" target="_blank" rel="noopener noreferrer"><u>Plagiarism website</u></a>
                    </p>
                    <div className="form-group">
                      <label>Email ID</label>
                      <input
                        type="email"
                        name="emailid"
                        className="text-input"
                        id="fullpaper-emailid"
                        placeholder="Email ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <br />
                    <label>Plagiarism Upload</label>
                    <input
                      type="file"
                      id="plagiarismAttachment"
                      name="plagiarismAttachment"
                      onChange={(e) => handleFileChange(e, setPlagiarismFile)}
                    />
                    <br /><br />
                    <label>Manuscript Upload</label>
                    <input
                      type="file"
                      id="manuscriptAttachment"
                      name="manuscriptAttachment"
                      onChange={(e) => handleFileChange(e, setManuscriptFile)}
                    />
                    <div className="text-center">
                      <button
                        type="button"
                        id="fullpaper-submit"
                        className="btn"
                        onClick={(e) => handleSubmit(e, "Full-Length Paper")}
                      >
                        Submit
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>





        {/* Payment Section */}
        <div className="section-header">
          <h2>Payment</h2>
        </div>
        <div className="paper-container">
          <table className="paper-table">
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top" }}>
                  <h5><b>Transaction Details</b></h5>
                  <form method="POST" action="#" id="payment-form">
                    <div className="form-group">
                      Email ID<br />
                      <input
                        type="text"
                        name="emailid"
                        className="text-input"
                        placeholder="Email ID"
                        value={paymentEmail}
                        onChange={(e) => setPaymentEmail(e.target.value)}
                      />
                    </div><br />

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
                    </div><br />

                    <div className="form-group">
                      <label>Attachment</label>
                      <input type="file" name="file" />
                    </div><br />

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
                  <p>
                    <b>Name:</b> Karnataka Bank Ltd<br />
                    <b>Event:</b> National Conference On CBR<br />
                    <b>A/C Number:</b> 6832000100002901<br />
                    <b>IFSC Code:</b> KARB0000683<br />
                    <b>Branch:</b> Ramanuja Road
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Upload;
