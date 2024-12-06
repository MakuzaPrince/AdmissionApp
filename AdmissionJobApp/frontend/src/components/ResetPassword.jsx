import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token'); // Extract token from the URL.

  const [formData, setFormData] = useState({ newPassword: '', confirmNewPassword: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    // Validate the token before allowing password reset form to load
    const validateToken = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reset-password?token=${token}`);
        if (response.data.message === 'Token is valid.') {
          setIsTokenValid(true);
        } else {
          setError('Invalid or expired token.');
        }
      } catch (error) {
        setError('Token validation failed.');
      }
    };

    validateToken();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validate password fields
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!formData.newPassword || !formData.confirmNewPassword) {
      setError('Password fields cannot be empty.');
      return;
    }

    try {
      // Make API request to reset password
      const response = await axios.post('http://localhost:8080/api/reset-password', {
        token,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword,
      });
      setMessage(response.data.message || 'Password reset successful!');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Password reset failed.');
    }
  };

  return (
    <div className="reset-password-page">
      {isTokenValid ? (
        <>
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
        </>
      ) : (
        <p className="error">Invalid or expired token.</p>
      )}
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

// CSS-in-JS style
const style = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#2a2a3d', // Darker dim background
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: '#f0f0f0',
  },
  resetPasswordPage: {
    background: 'linear-gradient(145deg, #3d3d58, #38384f)', // Soft gradient
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease, background 0.3s ease',
  },
  h2: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#f5ba7d',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '15px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#4a4a64',
    color: '#f0f0f0',
    fontSize: '16px',
    boxShadow: 'inset 0 4px 6px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s, box-shadow 0.2s ease',
  },
  inputFocus: {
    backgroundColor: '#565672',
    outline: 'none',
    boxShadow: '0 0 8px rgba(245, 186, 125, 0.8)', // Glowing effect
  },
  button: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#f5ba7d',
    color: '#2a2a3d',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  buttonHover: {
    backgroundColor: '#ffcc75',
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.3)',
  },
  error: {
    textAlign: 'center',
    color: '#f44336',
    fontSize: '16px',
    marginTop: '10px',
  },
  message: {
    textAlign: 'center',
    color: '#66bb6a',
    fontSize: '16px',
    marginTop: '10px',
  },
};

export default ResetPassword;
