import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Email is required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/forgot-password', { email });
      setMessage(response.data.message || 'Password reset link sent to your email!');
      
      // Navigate to the login page after sending the reset link
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to send reset link.');
    }
  };

  return (
    <div className="forgot-password-page">
      <style>
  {`
    body {
      font-family: 'Arial', sans-serif;
      background-color: #1e293b; /* Dark blue-gray background */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      color: #e2e8f0; /* Light text for contrast */
    }

    .forgot-password-page {
      background-color: #2c3e50; /* Darker blue for the container */
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4); /* Subtle shadow for depth */
      max-width: 400px;
      width: 100%;
      text-align: center;
      border: 1px solid #34495e; /* Subtle blue border */
    }

    h2 {
      font-size: 1.4rem; /* Moderate heading size */
      color: #d1dce5; /* Muted light blue-gray */
      margin-bottom: 15px;
      font-weight: 600;
    }

    label {
      font-size: 1rem;
      color: #cdd9e5; /* Lighter muted blue for labels */
      margin-bottom: 8px;
      display: block;
      text-align: left;
    }

    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #4b6584; /* Muted blue-gray border */
      border-radius: 6px;
      background-color: #2f3e53; /* Dark blue input field */
      color: #e2e8f0; /* Light text */
      font-size: 1rem;
      box-sizing: border-box;
      transition: border-color 0.3s, background-color 0.3s;
    }

    input:focus {
      border-color: #5a91e1; /* Bright blue for focus */
      background-color: #3c4c63; /* Slightly lighter blue on focus */
      outline: none;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #365a82; /* Muted dark blue for button */
      color: #ffffff; /* White text for contrast */
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2); /* Soft shadow */
    }

    button:hover {
      background-color: #27496d; /* Darker blue on hover */
      transform: translateY(-2px); /* Lift effect */
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25); /* Enhanced shadow on hover */
    }

    .error {
      color: #e74c3c; /* Dimmed red for errors */
      font-size: 0.9rem;
      margin-top: 10px;
    }

    .message {
      color: #27ae60; /* Dimmed green for success messages */
      font-size: 0.9rem;
      margin-top: 10px;
    }

    p {
      font-size: 0.9rem;
      margin-top: 20px;
      color: #aab6c1; /* Light grayish-blue for additional text */
    }

    a {
      color: #6cb2f5; /* Softer light blue for links */
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    a:hover {
      color: #4a91e2; /* Slightly darker blue on hover */
      text-decoration: underline;
    }
  `}
</style>


      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email address:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
