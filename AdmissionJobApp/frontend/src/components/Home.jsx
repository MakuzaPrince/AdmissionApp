import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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

  const messagesEn = [
    "Unlock your potential with us!",
    "Explore thousands of job opportunities!",
    "Join our community of successful professionals!",
    "Your dream job is just a click away!",
    "Empowering you to find the right job!",
  ];

  const messagesFr = [
    "Libérez votre potentiel avec nous !",
    "Explorez des milliers d'opportunités d'emploi !",
    "Rejoignez notre communauté de professionnels réussis !",
    "Votre emploi de rêve est à un clic de vous !",
    "Nous vous aidons à trouver le bon emploi !",
  ];

  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentMessages, setCurrentMessages] = useState(messagesEn);
  const [dynamicMessage, setDynamicMessage] = useState(messagesEn[0]);
  const [index, setIndex] = useState(0);

  const toggleLanguage = () => {
    setCurrentLanguage((prevLang) => (prevLang === 'en' ? 'fr' : 'en'));
  };

  useEffect(() => {
    setCurrentMessages(currentLanguage === 'fr' ? messagesFr : messagesEn);
  }, [currentLanguage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicMessage(currentMessages[index]);
      setIndex((prevIndex) => (prevIndex + 1) % currentMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentMessages, index]);

  return (
    <div className="container">
      {/* Bolded Welcome Message */}
      <h1 className="welcome-message">{messagesI18n[currentLanguage].pageTitle}</h1>

      {/* Dynamic Message Section */}
      <div className="dynamic-message">
        <p className="space-animation">{dynamicMessage}</p>
      </div>

      {/* Static Text Section */}
      <p id="description">{messagesI18n[currentLanguage].description}</p>

      {/* Login and Register Buttons */}
      <div className="buttons">
        <Link to="/register" className="btn">{messagesI18n[currentLanguage].registerBtn}</Link>
        <Link to="/login" className="btn">{messagesI18n[currentLanguage].loginBtn}</Link>
      </div>

      {/* Language Switcher Button */}
      <div className="language-switcher">
        <button className="btn" onClick={toggleLanguage}>
          Switch to {currentLanguage === 'en' ? 'French' : 'English'}
        </button>
      </div>

      {/* Inline CSS */}
      <style>
  {`
    body {
      background: linear-gradient(135deg, #1d3557, #457b9d, #a8dadc);
      font-family: 'Poppins', sans-serif;
      margin: 0;
      padding: 0;
      color: #f1faee;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 50px;
      text-align: center;
      background: rgba(0, 0, 0, 0.6); /* Semi-transparent black background */
      border-radius: 15px;
      box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(8px);
    }

    .welcome-message {
      font-size: 2.8rem;
      font-weight: 700;
      color: #f1faee;
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
      margin-bottom: 20px;
    }

    .space-animation {
      font-size: 1.3rem;
      font-weight: 500;
      color: #a8dadc;
      animation: fadeInOut 3s infinite;
    }

    #description {
      font-size: 1rem;
      color: #f1faee;
      margin-top: 10px;
      margin-bottom: 30px;
      opacity: 0.9;
      line-height: 1.6;
    }

    .buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 40px 0 20px 0;
    }

    .btn {
      padding: 12px 30px;
      border-radius: 25px;
      background: linear-gradient(45deg, #457b9d, #1d3557);
      color: #f1faee;
      text-decoration: none;
      font-size: 1rem;
      font-weight: 600;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .btn:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    }

    .language-switcher button {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 1rem;
      background: linear-gradient(45deg, #1d3557, #457b9d);
      border: none;
      border-radius: 25px;
      color: #f1faee;
      font-weight: 600;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }

    .language-switcher button:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    }

    @keyframes fadeInOut {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `}
</style>

    </div>
  );
};

export default Home;
