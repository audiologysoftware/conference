import React, { useState, useEffect } from "react";
import { uploadAbstract, getAuthorNames, uploadManuscript } from "../api/manuscripts";
import { listAllManuscripts } from "../api/management"; // New API
import { ErrorDisplay } from "./ErrorDisplay";
import { logInfo, logError } from "../utils/logger";
import { DataGrid } from "@mui/x-data-grid";

const Manuscript = () => {
  const [form, setForm] = useState({
    title: "",
    author_names: "",
    email_id: "",
    abstract: null,
    manuscript: null,
    plagiarism: null,
  });
  const [authors, setAuthors] = useState(null);
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [manuscripts, setManuscripts] = useState([]); // State for datagrid data

  useEffect(() => {
    const loadManuscripts = async () => {
      try {
        const data = await listAllManuscripts();
        console.log(data);
        setManuscripts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadManuscripts();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: null });
    }
  };

  // Upload Abstract
  const handleUploadAbstract = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse("");
    try {
      if (!form.abstract) {
        throw new Error("Please select a file for the abstract.");
      }

      const reader = new FileReader();
      reader.onload = async () => {
        const base64Abstract = reader.result.split(",")[1];
        const res = await uploadAbstract({
          title: form.title,
          author_names: form.author_names,
          email_id: form.email_id,
          abstract: base64Abstract,
        });
        setResponse("Abstract uploaded successfully!");
      };
      reader.onerror = () => {
        setError("Failed to read the file. Please try again.");
      };

      reader.readAsDataURL(form.abstract);
    } catch (err) {
      setError(err.message);
    }
  };

  // Read Authors
  const handleReadAuthors = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse("");
    try {
      const res = await getAuthorNames(form.email_id);
      setAuthors(res.author_names);
    } catch (err) {
      setError(err.message);
    }
  };

  // Upload Manuscript
  const handleUploadManuscript = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse("");
    try {
      if (!form.manuscript || !form.plagiarism) {
        throw new Error("Please select both the manuscript and plagiarism files.");
      }

      const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = () => reject("Failed to read the file. Please try again.");
          reader.readAsDataURL(file);
        });
      };

      const [base64Manuscript, base64Plagiarism] = await Promise.all([
        convertFileToBase64(form.manuscript),
        convertFileToBase64(form.plagiarism),
      ]);

      const res = await uploadManuscript({
        email_id: form.email_id,
        plagiarism: base64Plagiarism,
        manuscript: base64Manuscript,
      });

      setResponse("Manuscript uploaded successfully!");
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  // Handle file download
  const handleDownload = (fileData, fileName) => {
    const blob = new Blob([fileData], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  // DataGrid Columns
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "author_names", headerName: "Author Names", width: 250 },
    { field: "email_id", headerName: "Email ID", width: 250 },
    {
      field: "abstract",
      headerName: "Abstract",
      width: 150,
      renderCell: (params) =>
        params.row.abstract ? (
          <button onClick={() => handleDownload(params.row.abstract, `abstract_${params.row.id}.pdf`)}>
            Download Abstract
          </button>
        ) : (
          "N/A"
        ),
    },
    {
      field: "plagiarism",
      headerName: "Plagiarism",
      width: 150,
      renderCell: (params) =>
        params.row.plagiarism ? (
          <button onClick={() => handleDownload(params.row.plagiarism, `plagiarism_${params.row.id}.pdf`)}>
            Download Plagiarism
          </button>
        ) : (
          "N/A"
        ),
    },
    {
      field: "manuscript",
      headerName: "Manuscript",
      width: 150,
      renderCell: (params) =>
        params.row.manuscript ? (
          <button onClick={() => handleDownload(params.row.manuscript, `manuscript_${params.row.id}.pdf`)}>
            Download Manuscript
          </button>
        ) : (
          "N/A"
        ),
    },
  ];

  return (
    <div>
      <h1>Manuscript Management</h1>

      <ErrorDisplay error={error} />

      {/* Abstract Upload Form */}
      <form onSubmit={handleUploadAbstract}>
        <h3>Upload Abstract</h3>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input type="text" name="author_names" placeholder="Author Names" value={form.author_names} onChange={handleChange} required />
        <input type="email" name="email_id" placeholder="Email ID" value={form.email_id} onChange={handleChange} required />
        <input type="file" name="abstract" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" required />
        <button type="submit">Upload Abstract</button>
      </form>

      {/* Read Authors */}
      <form onSubmit={handleReadAuthors}>
        <h3>Read Authors</h3>
        <input type="email" name="email_id" placeholder="Email ID" value={form.email_id} onChange={handleChange} required />
        <button type="submit">Get Authors</button>
        {authors && <p>Authors: {authors}</p>}
      </form>

      {/* Manuscript Upload Form */}
      <form onSubmit={handleUploadManuscript}>
        <h3>Upload Manuscript</h3>
        <input type="email" name="email_id" placeholder="Email ID" value={form.email_id} onChange={handleChange} required />
        <input type="file" name="plagiarism" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" required />
        <input type="file" name="manuscript" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" required />
        <button type="submit">Upload Manuscript</button>
      </form>

      {/* Manuscripts DataGrid */}
      <h3>Manuscript List</h3>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={manuscripts} columns={columns} getRowId={(row) => row.id} />
      </div>

      {response && <p>{response}</p>}
    </div>
  );
};

export default Manuscript;
