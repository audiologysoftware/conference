import React, { useState } from "react";
import {
  uploadAbstract,
  getAuthorNames,
  uploadManuscript,  
  getEmailMismatches,
  getAbstractsWithoutManuscripts,
} from "../api/manuscripts";

import {listAllManuscripts} from '../api/management'
import { ErrorDisplay } from "./ErrorDisplay";

const Manuscripts = () => {
  const [form, setForm] = useState({
    title: "",
    author_names: "",
    email_id: "",
    abstract: null,
    manuscript: null,
    plagiarism: null,
  });
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [manuscripts, setManuscripts] = useState([]);

  const handleUploadAbstract = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await uploadAbstract({
        title: form.title,
        author_names: form.author_names,
        email_id: form.email_id,
        abstract: form.abstract,
      });
      console.log("Upload Abstract Response:", res);
      setResponse("Abstract uploaded successfully!");
    } catch (err) {
      console.error("Error uploading abstract:", err);
      setError(err.message);
    }
  };

  const handleListManuscripts = async () => {
    setError(null);
    try {
      const res = await listAllManuscripts();
      console.log("All Manuscripts:", res);
      setManuscripts(res);
    } catch (err) {
      console.error("Error fetching manuscripts:", err);
      setError(err.message);
    }
  };

  // Add similar methods for other API calls (e.g., getEmailMismatches, getAbstractsWithoutManuscripts)

  return (
    <div>
      <h2>Manuscripts</h2>

      <section>
        <h3>Upload Abstract</h3>
        <form onSubmit={handleUploadAbstract}>
          <input type="text" name="title" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input type="text" name="author_names" placeholder="Author Names" value={form.author_names} onChange={(e) => setForm({ ...form, author_names: e.target.value })} required />
          <input type="email" name="email_id" placeholder="Email ID" value={form.email_id} onChange={(e) => setForm({ ...form, email_id: e.target.value })} required />
          <input type="file" name="abstract" onChange={(e) => setForm({ ...form, abstract: e.target.files[0] })} required />
          <button type="submit">Upload Abstract</button>
        </form>
      </section>

      <section>
        <h3>List Manuscripts</h3>
        <button onClick={handleListManuscripts}>Load Manuscripts</button>
      </section>

      <ErrorDisplay error={error} />
      {response && <div style={{ color: "green" }}>{response}</div>}

      {manuscripts.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author Names</th>
              <th>Email ID</th>
            </tr>
          </thead>
          <tbody>
            {manuscripts.map((manuscript) => (
              <tr key={manuscript.id}>
                <td>{manuscript.title}</td>
                <td>{manuscript.author_names}</td>
                <td>{manuscript.email_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Manuscripts;
