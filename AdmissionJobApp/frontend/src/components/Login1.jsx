import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/login", formData);

      if (response.data) {
        const { role } = response.data;

        // Save user info in local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Redirect based on role
        switch (role) {
          case "ROLE_ADMIN":
            navigate("/admin");
            break;
          case "ROLE_Employee":
            navigate("/employer/dashboard");
            break;
          case "ROLE_USER":
            navigate("/employee");
            break;
          default:
            navigate("/");
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <style>
  {`
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #3a3a4d; /* Brighter dim background */
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      color: #f0f0f0;
    }

    h2 {
      text-align: center;
      font-size: 3rem;
      margin-bottom: 30px;
      color: #ffdd8e; /* Lighter golden color */
      letter-spacing: 2px;
      font-weight: bold;
      text-transform: uppercase;
    }

    .login-container {
      background: linear-gradient(145deg, #4a4a65, #43435e); /* Brighter gradient for more subtle tones */
      border-radius: 20px;
      padding: 60px 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); /* Softer shadow with a brighter effect */
      width: 100%;
      max-width: 600px;
      transition: transform 0.3s ease, background 0.3s ease;
    }

    .login-container:hover {
      transform: scale(1.05);
      background: linear-gradient(145deg, #43435e, #4a4a65); /* Slight hover effect */
    }

    .login-container input {
      width: 100%;
      padding: 16px;
      margin: 15px 0;
      border: none;
      border-radius: 10px;
      background-color: #555675; /* Lighter input background */
      color: #f0f0f0;
      font-size: 18px;
      box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.15); /* Softer inner shadow */
      transition: background-color 0.3s, box-shadow 0.2s ease;
    }

    .login-container input:focus {
      background-color: #5b5b78;
      outline: none;
      box-shadow: 0 0 8px rgba(255, 221, 142, 0.8); /* Brighter glowing effect */
    }

    .login-container button {
      width: 100%;
      padding: 16px;
      background-color: #ffdd8e; /* Softer golden button */
      color: #3a3a4d; /* Darker text color for contrast */
      border: none;
      border-radius: 10px;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.2s ease;
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    }

    .login-container button:hover {
      background-color: #ffcc75; /* Slightly brighter button hover effect */
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
    }

    .error {
      text-align: center;
      color: #ff6b6b;
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: bold;
    }

    p {
      text-align: center;
      font-size: 16px;
      color: #c7c7c7; /* Softer gray text for readability */
    }

    a {
      color: #ffdd8e;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    a:hover {
      color: #ffcc75;
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      h2 {
        font-size: 2.5rem;
      }

      .login-container {
        padding: 40px 20px;
      }
    }
  `}
</style>



      <h2>Login</h2>

      <div className="login-container">
        {error && <div className="error">{error}</div>}

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
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p>
          <a href="/register">Don't have an account? Register</a>
        </p>

        {/* Forgot Password Link */}
        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
