import React, { useState, useRef } from "react";
import "./Upload.css";
import { uploadAbstract, uploadManuscript, getTitles, getAuthorNames } from "../api/manuscripts";
import { logInfo } from "../utils/logger";

const Manuscript = () => { 

  const [error, setError] = useState(null);
  const [titles, setTitles] = useState([]);
  const [showTitleDropdown, setShowTitleDropdown] = useState(true);
  const [presentationOptions] = useState(["Oral", "Poster"]);
  const [titleId, setTitleId] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [form, setForm] = useState({
    title: "",
    author_names: "",
    email_id: "",
    abstract: null,
    extension: "",
    content_type: "",
    file_size: 0,          
    manuscript: null,
    plagiarism: null,
    presentation: [],
  });

  const abstractFileHandler = useRef();
  const plagFileHandler = useRef();
  const manFileHandler = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      const extension = file.name.split(".").pop(); // Get file extension
      const content_type = file.type; // Get MIME type
      const file_size = file.size; // Get file size in bytes
      if (file.size > 5 * 1024 * 1024) { // Example: 5MB limit
        alert("File size exceeds the limit of 5MB.");
        abstractFileHandler.current.value = null;
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        alert("Unsupported file type. only pdf files are alowed");
        abstractFileHandler.current.value = null;
        return;
      }

      setForm({
        ...form,
        abstract: base64,
        extension,
        content_type,
        file_size
      });      
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
    const selectedId = e.target.options[e.target.selectedIndex].dataset.id;
    setTitleId(selectedId);
    if (selectedTitle === "New") {
      setShowTitleDropdown(false);
    } else {
      const author_names = await getAuthorNames(selectedId);
      setForm({ ...form, author_names: author_names.author_names, presentation: author_names.presentation, title: selectedTitle });
      console.log(selectedTitle);
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
        if (form.abstract) {
          if (!showTitleDropdown) {
            console.log("title-textbox:", showTitleDropdown, type);
            setLoading1(true); // Show loading spinner
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
                       
            setLoading1(false); // Show loading spinner                                    
          } else {
            alert("Abstract is already submitted, you can submit the full-length manuscript");
          }
        } else alert("Upload the abstract");
      }
      if (type === "Full-Length Paper") {
        if (form.plagiarism || form.manuscript) {
          setLoading2(true); // Show loading spinner
          await uploadManuscript({
            id: parseInt(titleId),
            plagiarism: form.plagiarism,
            manuscript: form.manuscript,
          });
          alert("Manuscript and Plagiarism uploaded successfully!");
          setShowTitleDropdown(true);
          // clearForm();
          setLoading2(false); // Show loading spinner
          return;
        } else {
          if (!form.plagiarism) alert("Upload the plagiarism report");
          else if (!form.manuscript) alert("Upload the full-length manuscript");
        }
      }
    } catch (err) {
      alert(`Uploading failed ${err}`);
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
      presentation: [],
    });
    setTitles([]);
    abstractFileHandler.current.value = "";
    // plagFileHandler.current.value = "";
    // manFileHandler.current.value = "";
  };

  return (
    <section id="upload" className="upload-card-container">
      <div className="upload-card">
        <div className="upload-card-header">
          <h3>Abstract Upload</h3>
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
                  onChange={(e) => handleTitleChange(e)}
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
              placeholder="Example: Hemanth N,Varun S,Prashanth S S"
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
            <label htmlFor="presentation" className="input-label">
              <strong>Upload Abstract:<br/>(pdf only)</strong>             
            </label>   
            <div className="upload-files-container">
              <input
                type="file"
                name="abstract"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                ref={abstractFileHandler}
                required
              />
              <a href="/img/abstract-guidelines.pdf" className="guidelines-link" target="_blank" rel="noopener noreferrer">
                          Guidelines
              </a>
            </div>
           

          </div>
          <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:"0px"}}>
            <button
                  type="button"
                  className="submit-btn"
                  onClick={(e) => handleSubmit(e, "Abstract")}
                >
                  {loading1 ? (
                        <span className="spinner" /> // Replace with a spinner element
                      ) : (
                        "Submit"
                      )}
              </button>
              <h6 style={{color:"red", fontSize:"13px", marginTop:"5px"}}>
                  Last date for submission of Abstract:{" "}
                  <span className="date">March 1st 2025</span>
              </h6>             
          </div>
          <div className="contact-info-container">
            <label htmlFor="presentation" className="input-label">
                <strong>Upload full length Manuscript:</strong>             
              </label>                
              <a href="https://review.jow.medknow.com/JSSJIR" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="colorful-sparkle-link">
              JSSJIR journal
              </a> 
          </div>                         
          <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", width:"100%"}}>
            <h6 style={{color:"red", fontSize:"13px"}}>
                Last date for submission of Full-length Manuscript:{" "}
                <span className="date">April 20th 2025</span>
            </h6>      
          </div>
          </div>
      </div>
    </section>
  );
};

export default Manuscript;

// {/* Paper Upload Section */}
// <div className="upload-files-container">
// <form method="POST" action="#" id="paper-upload-form">
//   <table className="upload-table">
//     <tbody>
//       <tr>
//         <td className="abstract-container">
//           <h3 className="file-title">
//             <b>Abstract</b>
//           </h3>                      
          
//           <br />
//           <a href="/img/abstract-guidelines.pdf" className="guidelines-link" target="_blank" rel="noopener noreferrer">
//             Abstract Guidelines
//           </a>
         
         



//         </td>

//         {/* <td className="full-paper-container">
//           <h3 className="file-title">
//             <b>Full-Length Paper</b>
//           </h3>
//           <label className="file-upload-label">Plagiarism Upload</label>
//           <input
//             type="file"
//             name="plagiarism"
//             onChange={handleFileChange}
//             accept=".pdf,.doc,.docx,.txt"
//             ref={plagFileHandler}
//             required
//           />
//           <br />
//           <label className="file-upload-label">Manuscript Upload</label>
//           <input
//             type="file"
//             name="manuscript"
//             onChange={handleFileChange}
//             accept=".pdf,.doc,.docx,.txt"
//             ref={manFileHandler}
//             required
//           />
//           <br />
//           <a href="/img/full-length-paper-guidelines.pdf" className="guidelines-link" target="_blank" rel="noopener noreferrer">
//             Full-Length Paper Guidelines
//           </a>
//           <button
//             type="button"
//             className="submit-btn"
//             onClick={(e) => handleSubmit(e, "Full-Length Paper")}
//           >
//              {loading2 ? (
//                   <span className="spinner" /> // Replace with a spinner element
//                 ) : (
//                   "Submit"
//                 )}
//           </button>

//           <h6 style={{color:"red", fontSize:"13px"}}>
//             Last date for submission of Full-length Manuscript:{" "}
//             <span className="date">March 20th 2025</span>
//           </h6>

//         </td> */}
//         <td className="full-paper-container">
//           <h3 className="file-title">
//             <b>Full-Length Paper</b>
//           </h3>

//           <div>Submit your full-length Manuscript to <a href="https://review.jow.medknow.com/JSSJIR" target="blank">JSSJIR journal</a></div>
          
//           <h6 style={{color:"red", fontSize:"13px"}}>
//             Last date for submission of Full-length Manuscript:{" "}
//             <span className="date">March 20th 2025</span>
//           </h6>
//         </td>
//       </tr>
//     </tbody>
//   </table>
// </form>
// </div>
