import React, { useState, useEffect } from "react";

const UploadDocuments = () => {
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Fetch uploaded files from the backend
  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/uploadDocument");
      if (!response.ok) throw new Error("Failed to fetch uploaded files.");
      const data = await response.json();
      setUploadedFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
      setMessage("Error fetching uploaded files.");
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.file.files[0];

    if (!file) return;

    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("File upload failed.");

      setMessage("File uploaded successfully!");
      fetchUploadedFiles(); // Refresh the list of files after upload
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    }
  };

  const handleDeleteFile = async (fileName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/delete/${fileName}`,
        { method: "POST" }
      );

      if (!response.ok) throw new Error("File deletion failed.");

      setMessage("File deleted successfully!");
      fetchUploadedFiles(); // Refresh the list of files after deletion
    } catch (error) {
      console.error("Error deleting file:", error);
      setMessage("Error deleting file.");
    }
  };

  return (
    <div className="upload-documents-page">
      <h1>Upload a Document</h1>

      {message && <div className="alert"><p>{message}</p></div>}

      <form onSubmit={handleFileUpload} encType="multipart/form-data">
        <label htmlFor="file">Choose file to upload:</label>
        <input type="file" name="file" id="file" required />
        <button type="submit">Upload</button>
      </form>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h2>Uploaded Files</h2>
          <ul>
            {uploadedFiles.map((file) => (
              <li key={file}>
                <a
                  href={`http://localhost:8080/admin/view/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>{" "}
                |{" "}
                <a
                  href={`http://localhost:8080/admin/download/${file}`}
                  download
                >
                  Download
                </a>{" "}
                |{" "}
                <button onClick={() => handleDeleteFile(file)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>
        {`
          .upload-documents-page {
            font-family: 'Arial', sans-serif;
            padding: 20px;
            background-color: #f5f5f5; /* Soft background */
            color: #333; /* Dark text */
          }

          h1, h2 {
            color: #333;
            text-align: center;
          }

          .alert {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #e8f5e9; /* Soft green background */
            color: #388e3c; /* Green text */
            border-radius: 5px;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-width: 500px;
            margin: 0 auto;
            background-color: #ffffff; /* White background for form */
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
          }

          label {
            font-weight: bold;
            color: #333;
          }

          input[type="file"] {
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #ccc;
            background-color: #f0f0f0; /* Soft light gray for input */
            color: #333;
          }

          button {
            padding: 12px;
            font-size: 16px;
            border-radius: 8px;
            background-color: #66bb6a; /* Muted green for button */
            color: white;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          button:hover {
            background-color: #81c784; /* Slightly darker green on hover */
          }

          button:disabled {
            background-color: #b0bec5; /* Disabled button */
          }

          .uploaded-files {
            margin-top: 30px;
            background-color: #ffffff; /* White background for uploaded files */
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          ul {
            list-style-type: none;
            padding-left: 0;
          }

          li {
            margin: 10px 0;
          }

          a {
            color: #388e3c;
            text-decoration: none;
            margin-right: 10px;
          }

          a:hover {
            text-decoration: underline;
          }

          button {
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            background-color: #f44336; /* Red for delete */
            color: white;
          }

          button:hover {
            background-color: #e53935;
          }
        `}
      </style>
    </div>
  );
};

export default UploadDocuments;
