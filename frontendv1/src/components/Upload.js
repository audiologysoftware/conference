import React, { useState, useRef, createRef } from "react";
import "./Upload.css";
import { uploadAbstract, uploadManuscript, getTitles, getAuthorNames } from "../api/manuscripts";

const Upload = () => {
  const [form, setForm] = useState({
    title: "",
    author_names: "",
    email_id: "",    
    abstract: null,
    manuscript: null,
    plagiarism: null,
    presentation: "",
  });

  const [error, setError] = useState(null);
  const [titles, setTitles] = useState([]);
  const [showTitleDropdown, setShowTitleDropdown] = useState(true);
  const [presentationOptions] = useState(["Oral", "Poster"]);
  const [titleId, setTitleId] = useState(0) 
  const abstractFileHandler = useRef();
  const plagFileHandler = useRef();
  const manFileHandler = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleFileChange = async (e) => {
    e.preventDefault()    
    const file = e.target.files[0];
    console.log("File selected:", file);
    if (file) {
      const base64 = await convertToBase64(file);
      console.log("File converted to base64:", base64);
      setForm({ ...form, [e.target.name]: base64 });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setForm({ ...form, email_id: email });
  };
  
  const handleEmailBlur = async (e) => {
    const email = e.target.value;
    console.log("Email on blur:", email);
    if (email) {
      try {
        const res = await getTitles(email);
        console.log("Titles fetched:", res.titles);
        if (res.titles && res.titles.length > 0) {
          console.log("titles available")
          setTitles([...res.titles]);
        } else {
          console.log("titles not available")
          setTitles([]);
        }
      } catch (err) {
        setError("Failed to fetch titles");
      }
    }
  };
  

  const handleTitleChange = async (e) => {    
    e.preventDefault();
    console.log("Selected title:", e.target.value);
    const selectedTitle = e.target.value;    
    const selectedId = e.target.options[e.target.selectedIndex].dataset.id; // Get the data-id attribute
    setTitleId(selectedId)
    if (selectedTitle === "New") {
      setShowTitleDropdown(false);
    } else {
      const author_names= await getAuthorNames(selectedId)      
      setForm({ ...form, author_names: author_names.author_names, presentation:author_names.presentation, title: selectedTitle });
      console.log(selectedTitle)      
    }
  };

  const revertToDropdown = () => {
    setForm({ ...form, title: "" });
    setShowTitleDropdown(true);
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    console.log("Form submitted:", form);         
    try {
      if (type === "Abstract") { 
        if(!form.abstract=="")       
        {
          if(!showTitleDropdown)
          {
            console.log("title-textbox:", showTitleDropdown, type)
            await uploadAbstract({
              title: form.title,
              author_names: form.author_names,
              email_id: form.email_id,
              abstract: form.abstract,
              presentation: form.presentation,
            });
            alert("Abstract uploaded successfully!");
            setShowTitleDropdown(true);
            clearForm();
            return;
          }else
          {
            alert("Abstract is already submitted, you can submit the full-length manuscript")                    
          }
        }else
          alert("Upload the abstract");
      }
      if (type === "Full-Length Paper") {
        if(!form.plagiarism=="" || !form.manuscript=="")
        {
          await uploadManuscript({
            id: parseInt(titleId),
            plagiarism: form.plagiarism,
            manuscript: form.manuscript,
          });
          alert("Manuscript and Plagiarism uploaded successfully!");
          setShowTitleDropdown(true);
          clearForm();
          return;
        }else
        {
          if(!form.plagiarism)
            alert("Upload the plagiarism report");
          else if(!form.manuscript)
            alert("Upload the full-length manuscript");
        }
      }
    } catch (err) {
      alert("Uploading failed");
    }
  };

  const clearForm = () => {
    setForm({
      title: "",
      author_names: "",
      email_id: "",
      abstract: null,
      manuscript: null,
      plagiarism: null,
      presentation: "",
    });
    setTitles([]);   
      abstractFileHandler.current.value = "";
      plagFileHandler.current.value = "";
      manFileHandler.current.value = "";
  } 

  return (
    <section className="upload-card-container">
      <div className="upload-card">
        <div className="upload-card-header">
          <h3>Manuscript Upload</h3>
        </div>

        <div className="upload-card-content">
          {/* Contact Info Section */}
          <div className="contact-info-container">
            <label htmlFor="correspondingEmail" className="input-label">
              <strong>Corresponding Author's Email ID:</strong>
            </label>
            <input
            type="text"
            id="correspondingEmail"
            name="email_id"
            value={form.email_id}
            onChange={handleEmailChange}
            onBlur={(e) => handleEmailBlur(e)}
            className="contact-input"
            placeholder="Enter corresponding author's email"            
            />

            <label htmlFor="paperTitle" className="input-label">
              <strong>Paper Title:</strong>
            </label>
            {showTitleDropdown ? (
               <div className="title-dropdown-container">
               <select
                 id="paperTitle"
                 name="title"
                 value={form.title}                 
                 onChange={(e)=>handleTitleChange(e)}                 
                 className="contact-input"
               >
                 <option value="">Select a title</option>
                 {titles.map(([id, title]) => (
                   <option key={id} value={title} data-id={id}>
                     {title}
                   </option>
                 ))}
                 <option value="New">New</option>
               </select>
             </div>
            ) : (
              <div className="new-title-container">
                <input
                  type="text"
                  id="newTitle"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="contact-input"
                  placeholder="Enter a new title"
                />
                <button type="button" onClick={revertToDropdown} className="revert-btn btn">
                  Cancel
                </button>
              </div>
            )}

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
              placeholder="Example: Hemanth N, Varun S, Prashanth S S"
            />

            <label htmlFor="presentation" className="input-label">
              <strong>Presentation Type:</strong>
            </label>
            <select
              id="presentation"
              name="presentation"
              value={form.presentation}
              onChange={handleChange}
              className="contact-input"
            >
              <option value="">Select presentation type</option>
              {presentationOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
                      <label className="file-upload-label">Abstract Upload</label>
                      <input
                        type="file"
                        name="abstract"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                        ref={abstractFileHandler}
                        required
                      />
                      <br />
                      <button
                        type="button"
                        className="submit-btn"
                        onClick={(e) => handleSubmit(e, "Abstract")}
                      >
                        Submit
                      </button>
                    </td>

                    <td className="full-paper-container">
                      <h3 className="file-title">
                        <b>Full-Length Paper</b>
                      </h3>
                      <label className="file-upload-label">Plagiarism Upload</label>
                      <input
                        type="file"
                        name="plagiarism"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                        ref={plagFileHandler}
                        required
                      />
                      <br />
                      <label className="file-upload-label">Manuscript Upload</label>
                      <input
                        type="file"
                        name="manuscript"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                        ref={manFileHandler}
                        required
                      />
                      <br />
                      <button
                        type="button"
                        className="submit-btn"
                        onClick={(e) => handleSubmit(e, "Full-Length Paper")}
                      >
                        Submit
                      </button>
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
