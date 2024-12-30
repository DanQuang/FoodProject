import React, { useState } from "react";
import "./App.css";

const ImageConverter = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store the file for API upload
  const [description, setDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for API call

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file); // Save the file for API upload
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      setImageFile(file); // Save the file for API upload
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleConvert = async () => {
    if (imageFile) {
      setLoading(true);
      setDescription(""); // Clear previous description

      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await fetch(
          "http://localhost:8000/api/process-image/",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to process the image");
        }

        const result = await response.json();
        setDescription(result.ingredients || "No ingredients found.");
      } catch (error) {
        console.error("Error:", error);
        setDescription("Error occurred while processing the image.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReload = () => {
    setImage(null);
    setImageFile(null);
    setDescription("");
  };

  return (
    <div className="container">
      <div className="converter-card">
        {/* Header */}
        <div className="header">
          <h1>Ingredients Tracking</h1>
        </div>

        {/* Content */}
        <div className="content">
          <div className="grid">
            {/* Upload Section */}
            <div
              className={`upload-area ${isDragging ? "dragging" : ""} ${
                image ? "has-image" : ""
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {image ? (
                <img src={image} alt="Uploaded" className="uploaded-image" />
              ) : (
                <label className="upload-label">
                  <div className="upload-content">
                    <svg className="upload-icon" viewBox="0 0 24 24">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="upload-text">
                      <span>Click to upload</span> or drag and drop
                    </p>
                    <p className="upload-hint">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    className="file-input"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            {/* Description Section */}
            <div className="description-area">
              {loading ? (
                <p className="loading-text">Processing the image...</p>
              ) : description ? (
                <p className="description-text">
                  {description.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              ) : (
                <p className="placeholder-text">
                  Ingredients will appear here...
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="button-group">
            <button
              onClick={handleConvert}
              disabled={!image || loading}
              className={`button convert-button ${
                !image || loading ? "disabled" : ""
              }`}
            >
              <svg className="button-icon" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              {loading ? "Tracking..." : "Tracking"}
            </button>

            <button
              onClick={handleReload}
              className="button reset-button"
              disabled={loading}
            >
              <svg className="button-icon" viewBox="0 0 24 24">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;
