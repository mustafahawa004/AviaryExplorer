import React, { useState } from 'react';
import './App.css';
import './components/FileUpload.css';
import Results from './components/Results.js';

function App() {
  const [isTranslated, setIsTranslated] = useState(false);
  const [direction, setDirection] = useState('left');
  const [showAboutText, setShowAboutText] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showUploadButton, setShowUploadButton] = useState(true);
  const [showFileUploadBox, setShowFileUploadBox] = useState(true);
  const [resultData, setResultData] = useState(null); // State to hold result data

  const handleTranslate = () => {
    setIsTranslated(true);
    setDirection('left');
  };

  const handleGoHome = () => {
    setIsTranslated(true);
    setDirection('right');
  };

  const handleShowAboutText = () => {
    setShowAboutText(true);
    setShowUploadButton(false);
    setShowFileUploadBox(false);
  };

  const handleHideAboutText = () => {
    setShowAboutText(false);
    setShowUploadButton(true);
    setShowFileUploadBox(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType.startsWith('image/')) {
        setSelectedFile(file);
        setErrorMessage('');
      } else {
        setSelectedFile(null);
        setErrorMessage('Please upload an image file (PNG, JPG, etc.).');
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Convert the uploaded file to a data URL
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        const imageUrl = reader.result;
        setResultData(imageUrl); // Pass the data URL to Results.js
      };
      reader.onerror = (error) => {
        console.error('Error converting file to data URL:', error);
        setErrorMessage('Failed to convert file to data URL.');
      };
    } else {
      setErrorMessage('Please select a file to upload.');
    }
  };

  return (
    <div className="App">
      {/* Violet horizontal bar at the top */}
      <div className="violet-horizontal-bar">
        {/* Buttons */}
        <button
          className="how-to-use-button"
          onClick={() => {
            handleGoHome();
            handleHideAboutText();
          }}
        >
          Home Page
        </button>
        <button
          className="about-button"
          onClick={() => {
            handleTranslate();
            handleShowAboutText();
          }}
        >
          About
        </button>
        <button
          className="contact-us-button"
          onClick={() => {
            handleTranslate();
            handleHideAboutText();
          }}
        >
          Contact Us
        </button>
      </div>

      {/* Main content */}
      <header className="App-header">
        {/* Logo */}
        <img
          src="/bird-explorer.png"
          alt="Bird Explorer Logo"
          className={`App-logo ${
            isTranslated ? `translate-${direction}` : ''
          }`}
        />

        {/* File Upload */}
        {showFileUploadBox && (
          <div className="file-upload-container">
            <label htmlFor="file-upload" className="file-upload-label">
              <div className="file-upload-box">
                <span className="file-upload-text">Upload Image</span>
                <input
                  type="file"
                  id="file-upload"
                  className="file-upload-input"
                  onChange={handleFileChange}
                />
              </div>
            </label>
            {showUploadButton && (
              <button className="nice-button" onClick={handleUpload}>
                Upload
              </button>
            )}
            {errorMessage && (
              <p className="error-message">{errorMessage}</p>
            )}
          </div>
        )}
        {/* About text */}
        {showAboutText && (
          <div className="about-text">
            <h2>About Us:</h2>
            <p>
              "We are computer science students who want to facilitate the
              identification of different animals for anyone who needs to
              identify a certain animal! Our goal is to empower those who may
              otherwise not be able to identify different species of animals."
            </p>
          </div>
        )}
      </header>

      {/* Render the Results component if resultData is available */}
      {resultData && <Results resultData={resultData} />}

      {/* Violet horizontal bar at the bottom */}
      <div className="violet-horizontal-bar"></div>
    </div>
  );
}

export default App;