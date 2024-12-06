import React, { useState, useEffect } from 'react';
import './JobBoard.css'; // Import the CSS file for this component

const JobBoard = () => {
  // Define message translations for both languages (English and French)
  const messagesI18n = {
    en: {
      pageTitle: "Welcome to the Admission Portal",
      uniqueMessage: "Your journey to success starts here!",
      description: "Apply to your dream institution or post admissions today!",
      registerBtn: "Sign Up",
      loginBtn: "Sign In",
    },
    fr: {
      pageTitle: "Bienvenue sur le portail d'admission",
      uniqueMessage: "Votre parcours vers le succès commence ici !",
      description: "Postulez à votre institution de rêve ou publiez des admissions aujourd'hui !",
      registerBtn: "S'inscrire",
      loginBtn: "Se connecter",
    },
  };

  // Define dynamic messages for both languages
  const messagesEn = [
    "Shape your future with the best institutions!",
    "Discover a wide range of academic opportunities!",
    "Join our community of ambitious learners!",
    "Your dream institution is just a step away!",
    "Empowering you to achieve academic excellence!",
  ];

  const messagesFr = [
    "Façonnez votre avenir avec les meilleures institutions !",
    "Découvrez un large éventail d'opportunités académiques !",
    "Rejoignez notre communauté d'apprenants ambitieux !",
    "Votre institution de rêve est à un pas de vous !",
    "Nous vous aidons à atteindre l'excellence académique !",
  ];

  // Set default language to English
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentMessages, setCurrentMessages] = useState(messagesEn);
  const [dynamicMessage, setDynamicMessage] = useState(messagesEn[0]);
  const [index, setIndex] = useState(0);

  // Function to toggle language between English and French
  const toggleLanguage = () => {
    if (currentLanguage === 'en') {
      switchLanguage('fr');
    } else {
      switchLanguage('en');
    }
  };

  // Function to switch language
  const switchLanguage = (language) => {
    if (messagesI18n[language]) {
      setCurrentLanguage(language);
      setCurrentMessages(language === 'fr' ? messagesFr : messagesEn);

      // Update page content based on the selected language
      document.getElementById('page-title').innerText = messagesI18n[language].pageTitle;
      document.getElementById('unique-message').innerText = messagesI18n[language].uniqueMessage;
      document.getElementById('description').innerText = messagesI18n[language].description;
      document.getElementById('register-btn').innerText = messagesI18n[language].registerBtn;
      document.getElementById('login-btn').innerText = messagesI18n[language].loginBtn;
    }
  };

  // Change dynamic message function to cycle through the dynamic messages
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicMessage(currentMessages[index]);
      setIndex((prevIndex) => (prevIndex + 1) % currentMessages.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentMessages, index]);

  return (
    <div className="container">
      <h1 id="page-title">Welcome to the Admission Portal</h1>

      {/* Dynamic Message Section */}
      <div className="dynamic-message">
        <p id="unique-message">{dynamicMessage}</p>
      </div>

      {/* Static Text Section */}
      <p id="description">Apply to your dream institution or post admissions today!</p>

      <div className="buttons">
        <a href="/register" className="btn" id="register-btn">
          Sign Up
        </a>
        <a href="/login" className="btn" id="login-btn">
          Sign In
        </a>
      </div>

      {/* Language Switcher Button */}
      <div className="language-switcher">
        <button className="btn" id="language-btn" onClick={toggleLanguage}>
          Switch to {currentLanguage === 'en' ? 'French' : 'English'}
        </button>
      </div>
    </div>
  );
};

export default JobBoard;
