import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'ROLE_USER'
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/api/register', formData);
      if (response.status === 200) {
        setMessage('Registration successful!');
        setFormData({
          username: '',
          email: '',
          password: '',
          role: 'ROLE_USER'
        });
        
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <style>
  {`
    body {
      font-family: 'Roboto', sans-serif;
      background: linear-gradient(135deg, #4b5a60, #6a7a86);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      color: #eceff1;
    }

    h2 {
      text-align: center;
      font-size: 2.5em;
      margin-bottom: 30px;
      color: #c7d0d5;
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    }

    .register-container {
      background: #8e9aa4;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 450px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .register-container:hover {
      transform: scale(1.05);
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.3);
    }

    .register-container input,
    .register-container select {
      width: 100%;
      padding: 12px;
      margin: 15px 0;
      border: 1px solid #8e9aa4;
      border-radius: 8px;
      font-size: 16px;
      background-color: #d1dadf;
      color: #333;
      box-sizing: border-box;
      transition: border-color 0.3s ease;
    }

    .register-container input:focus,
    .register-container select:focus {
      border-color: #4a5b62;
      outline: none;
    }

    .register-container button {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #4f6779, #3e5863);
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 18px;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.3s;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .register-container button:hover {
      background: linear-gradient(135deg, #3d5062, #334754);
      transform: translateY(-3px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    .message {
      text-align: center;
      color: #66bb6a;
      font-size: 16px;
      margin-bottom: 20px;
      font-weight: 500;
    }

    .error {
      text-align: center;
      color: #f44336;
      font-size: 16px;
      margin-bottom: 20px;
      font-weight: 500;
    }

    a {
      color: #4f6779;
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    a:hover {
      color: #3d5062;
      text-decoration: underline;
    }

    p {
      text-align: center;
      font-size: 14px;
      color: #a5b2bb;
    }

    @media (max-width: 768px) {
      .register-container {
        padding: 25px;
      }

      h2 {
        font-size: 2rem;
      }

      .register-container input,
      .register-container select,
      .register-container button {
        padding: 10px;
      }
    }
  `}
</style>



      <h2>Register</h2>

      <div className="register-container">
        {message && <div className="message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="ROLE_USER">Employee</option>
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_Employee">Employer</option>
          </select>

          <button type="submit">Register</button>
        </form>

        {error && <div className="error">{error}</div>}

        <p><a href="/login">Already have an account? Log in</a></p>
      </div>
    </div>
  );
};

export default Register;
