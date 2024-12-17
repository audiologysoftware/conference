
import React, { useState } from "react";
import "./Upload.css";


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
    <section className="upload-card-container">
      <div className="upload-card">
        <div className="upload-card-header">
          <h3>Manuscript Upload</h3>
        </div>

        <div className="upload-card-content">
          {/* Contact Info Section - Text Boxes */}
          <div className="contact-info-container">
            <label htmlFor="correspondingEmail" className="input-label">
              <strong>Corresponding Author's Email ID:</strong>
            </label>
            <input
              type="text"
              id="correspondingEmail"
              value={correspondingEmail}
              onChange={(e) => setCorrespondingEmail(e.target.value)}
              className="contact-input"
              placeholder="Enter corresponding author's email"
            />

            <label htmlFor="paperTitle" className="input-label">
              <strong>Paper Title:</strong>
            </label>
            <input
              type="text"
              id="paperTitle"
              value={paperTitle}
              onChange={(e) => setPaperTitle(e.target.value)}
              className="contact-input"
              placeholder="Enter the title of your paper"
            />

            <label htmlFor="authorNames" className="input-label">
              <strong>Author Names:</strong>
            </label>
            <input
              type="text"
              id="authorNames"
              value={authorNames}
              onChange={(e) => setAuthorNames(e.target.value)}
              className="contact-input"
              placeholder="Example: Hemanth N,Varun S,Prashanth S S"
            />
          </div>

          {/* Paper Upload Section */}
          <div className="upload-files-container">
            <form method="POST" action="#" id="paper-upload-form">
              <table className="upload-table">
                <tbody>
                  <tr>
                    <td className="abstract-container">
                      <h3 className="file-title">
                        <b>Abstract</b>
                      </h3>
                      <p>
                        <a
                          href="https://docs.google.com/document/d/1uf_wllM4xaO1sz856e943OizSHsQztgW/edit?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <u>Download template</u>
                        </a>
                        <br />
                        <a
                          href="https://docs.google.com/document/d/1eosrShnBkmhTXX1LqphqTcR15PJgxNCp/edit?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <u>Download Submission Guideline</u>
                        </a>
                      </p>
                      <label className="file-upload-label">Abstract Upload</label>
                      <input
                        type="file"
                        id="abstractAttachment"
                        name="file"
                        onChange={(e) => handleFileChange(e, setAbstractFile)}
                      />
                      <br />
                      <div className="text-center">
                        <button
                          type="button"
                          id="abstract-submit"
                          className="submit-btn"
                          onClick={(e) => handleSubmit(e, "Abstract")}
                        >
                          Submit
                        </button>
                      </div>
                    </td>

                    <td className="full-paper-container">
                      <h3 className="file-title">
                        <b>Full-Length Paper</b>
                      </h3>
                      <p>
                        <a
                          href="https://docs.google.com/document/d/1q9rT7fRW2cJ_2LbxbmFRg1XQUGJXAouU/edit?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <u>Download template</u>
                        </a>
                        <br />
                        <a
                          href="https://docs.google.com/document/d/1mzCue_s_ClAt0EVG_EHL-GVgocd0exWL/edit?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <u>Download Submission Guideline</u>
                        </a>
                        <br />
                        <a
                          href="https://shorturl.at/oxJPQ"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <u>Plagiarism website</u>
                        </a>
                      </p>
                      <label className="file-upload-label">Plagiarism Upload</label>
                      <input
                        type="file"
                        id="plagiarismAttachment"
                        name="plagiarismAttachment"
                        onChange={(e) => handleFileChange(e, setPlagiarismFile)}
                      />
                      <br />
                      <label className="file-upload-label">Manuscript Upload</label>
                      <input
                        type="file"
                        id="manuscriptAttachment"
                        name="manuscriptAttachment"
                        onChange={(e) => handleFileChange(e, setManuscriptFile)}
                      />
                      <br />
                      <div className="text-center">
                        <button
                          type="button"
                          id="fullpaper-submit"
                          className="submit-btn"
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
      </div>
    </section>
  );
};

export default Upload;
