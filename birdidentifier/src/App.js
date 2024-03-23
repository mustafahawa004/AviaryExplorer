import React, { useState } from 'react';
import './App.css';

function App() {
  const [isTranslated, setIsTranslated] = useState(false);
  const [direction, setDirection] = useState('left');
  const [showAboutText, setShowAboutText] = useState(false);

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
  };

  const handleHideAboutText = () => {
    setShowAboutText(false);
  };

  return (
    <div className="App">
      {/* Violet horizontal bar at the top */}
      <div className="violet-horizontal-bar">
        {/* Buttons */}
        <button className="how-to-use-button" onClick={() => { handleGoHome(); handleHideAboutText(); }}>Home Page</button>
        <button className="about-button" onClick={() => { handleTranslate(); handleShowAboutText(); }}>About</button>
        <button className="contact-us-button" onClick={() => { handleTranslate(); handleHideAboutText(); }}>Contact Us</button>
      </div>

      <header className="App-header">
        {/* Logo */}
        <img src="/bird-explorer.png" alt="Bird Explorer Logo" className={`App-logo ${isTranslated ? `translate-${direction}` : ''}`} />

        {/* About text */}
        {showAboutText && (
          <div className="about-text">
            <h2>About Us:</h2>
            <p>"We are computer science students aiming to make bird identification easier for birdwatchers, hobbyists, and anyone who is just curious about birds! Our goal is to empower people who otherwise may not be able to identify birds."</p>
          </div>
        )}
      </header>

      {/* Violet horizontal bar at the bottom */}
      <div className="violet-horizontal-bar"></div>
    </div>
  );
}

export default App;