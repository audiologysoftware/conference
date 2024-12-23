
import React, { useState } from "react";
import "./Upload.css";
import { uploadAbstract, uploadManuscript } from "../api/manuscripts";


const Upload = () => {
  const [form, setForm] = useState({
    title: "",
    author_names: "",
    email_id: "",
    abstract: null,
    manuscript: null,
    plagiarism: null,
  });

  const [error, setError] = useState(null);


  const [correspondingEmail, setCorrespondingEmail] = useState();
  const [paperTitle, setPaperTitle] = useState();
  const [authorNames, setAuthorNames] = useState();
  const [abstractFile, setAbstractFile] = useState(null);
  const [plagiarismFile, setPlagiarismFile] = useState(null);
  const [manuscriptFile, setManuscriptFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(1)
    if (file) {
      console.log(3)
      const base64 = await convertToBase64(file);    
      setForm({ ...form, [e.target.name]: base64 });      
      console.log([e.target.name], base64 )
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

    const clearForm = () =>{
      setForm({
        title: "",
        author_names: "",
        email_id: "",
        abstract: null,
        manuscript: null,
        plagiarism: null,
      });
    }


  const handleSubmit = async (e, type) => {
    e.preventDefault();

    try {
      if (type === "Abstract" && !abstractFile) {
        const res = await uploadAbstract({
          title: form.title,
          author_names: form.author_names,
          email_id: form.email_id,
          abstract: form.abstract,
        });
        alert("Abstract uploaded successfully!")
        clearForm();
        return;
      }
      if (type === "Full-Length Paper" && (!plagiarismFile || !manuscriptFile)) {
        const res = await uploadManuscript({
          email_id: form.email_id,
          plagiarism: form.plagiarism,
          manuscript: form.manuscript,          
        });       
        alert("Manuscript and Plagiarism uploaded successfully!")
        clearForm();
        return;
      }
    } catch (err) {      
      alert(err.message)
    }
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
              name="email_id"
              value={form.email_id}
              onChange={handleChange}
              className="contact-input"
              placeholder="Enter corresponding author's email"
            />

            <label htmlFor="paperTitle" className="input-label">
              <strong>Paper Title:</strong>
            </label>
            <input
              type="text"
              id="paperTitle"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="contact-input"
              placeholder="Enter the title of your paper"
            />

            <label htmlFor="authorNames" className="input-label">
              <strong>Author Names:</strong>
            </label>
            <input
              type="text"
              id="authorNames"
              name="author_names"
              value={form.author_names}
              onChange={handleChange}
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
                      <input type="file" name="abstract" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" required />

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
                      <input type="file" name="manuscript" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" required />
                      <br />
                      <label className="file-upload-label">Manuscript Upload</label>
                      <input type="file" name="plagiarism" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" required />
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
