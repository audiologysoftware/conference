import React, { useState } from "react";
import "./Upload.css";
import qr from "../assets/img/speakers/QR code.jpg";

const Upload = () => {
  const [correspondingEmail, setCorrespondingEmail] = useState();
  const [paperTitle, setPaperTitle] = useState();
  const [authorNames, setAuthorNames] = useState();
  const [abstractFile, setAbstractFile] = useState(null);
  const [plagiarismFile, setPlagiarismFile] = useState(null);
  const [manuscriptFile, setManuscriptFile] = useState(null);

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (type === "Abstract" && !abstractFile) {
      alert("Please upload an abstract file before submitting.");
      return;
    }
    if (type === "Full-Length Paper" && (!plagiarismFile || !manuscriptFile)) {
      alert("Please upload both plagiarism and manuscript files before submitting.");
      return;
    }
    alert(`Submitted ${type} successfully!`);
  };

  return (
    <section id="buy-tickets" className="section-with-bg text-center">
      <div className="container" data-aos="fade-up">

        <div className="section-header">
          <h2>Manuscript Upload</h2>
        </div>

        {/* Contact Info Section - Text Boxes */}
        <div className="contact-info text-center">
          <label htmlFor="correspondingEmail"><strong>Corresponding Author's Email ID:</strong></label>
          <input
            type="text"
            id="correspondingEmail"
            value={correspondingEmail}
            onChange={(e) => setCorrespondingEmail(e.target.value)}
            className="form-input"
          />

          <label htmlFor="paperTitle"><strong>Paper Title:</strong></label>
          <input
            type="text"
            id="paperTitle"
            value={paperTitle}
            onChange={(e) => setPaperTitle(e.target.value)}
            className="form-input"
          />

          <label htmlFor="authorNames"><strong>Author Names:</strong></label>
          <input
            type="text"
            id="authorNames"
            value={authorNames}
            onChange={(e) => setAuthorNames(e.target.value)}
            className="form-input"
          />
        </div>

        {/* Paper Upload Section */}
        <div className="section-header">
          <h2>Upload Files</h2>
        </div>

        <div className="paper-container">
          <form method="POST" action="#" id="paper-upload-form">
            <table className="paper-table">
              <tbody>
                <tr>
                  <td className="abstract" style={{ verticalAlign: "top" }}>
                    <h2 className="dark-black-text"><b>Abstract</b></h2>
                    <p>
                      <a href="https://docs.google.com/document/d/1uf_wllM4xaO1sz856e943OizSHsQztgW/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <u>Download template</u>
                      </a>
                      <br />
                      <a href="https://docs.google.com/document/d/1eosrShnBkmhTXX1LqphqTcR15PJgxNCp/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <u>Download Submission Guideline</u>
                      </a>
                    </p>
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
                      <a href="https://docs.google.com/document/d/1q9rT7fRW2cJ_2LbxbmFRg1XQUGJXAouU/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <u>Download template</u>
                      </a>
                      <br />
                      <a href="https://docs.google.com/document/d/1mzCue_s_ClAt0EVG_EHL-GVgocd0exWL/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <u>Download Submission Guideline</u>
                      </a>
                      <br />
                      <a href="https://shorturl.at/oxJPQ" target="_blank" rel="noopener noreferrer">
                        <u>Plagiarism website</u>
                      </a>
                    </p>
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
      </div>
    </section>
  );
};

export default Upload;
