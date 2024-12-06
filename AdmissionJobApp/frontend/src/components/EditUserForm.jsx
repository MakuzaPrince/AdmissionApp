import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserForm = ({ userId }) => {
  const [user, setUser] = useState({
    id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
  });

  const [message, setMessage] = useState('');

  // Fetch user details when the component mounts
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/admin/users/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          setMessage('Error fetching user data');
        });
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/users/update', user);
      setMessage('User updated successfully!');
    } catch (error) {
      setMessage('Error updating user');
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div className="container mt-4" style={styles.container}>
        <h2 style={styles.heading}>Edit User</h2>
        {message && <div className="alert alert-info" style={styles.alert}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={user.id} />
          
          <div className="mb-3" style={styles.inputGroup}>
            <label htmlFor="username" className="form-label" style={styles.label}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={user.username}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div className="mb-3" style={styles.inputGroup}>
            <label htmlFor="password" className="form-label" style={styles.label}>Password</label>
            <input
              type="text"
              id="password"
              name="password"
              className="form-control"
              value={user.password}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div className="mb-3" style={styles.inputGroup}>
            <label htmlFor="firstName" className="form-label" style={styles.label}>First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              value={user.firstName}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div className="mb-3" style={styles.inputGroup}>
            <label htmlFor="lastName" className="form-label" style={styles.label}>Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              value={user.lastName}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div className="mb-3" style={styles.inputGroup}>
            <label htmlFor="email" className="form-label" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={user.email}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div className="mb-3" style={styles.inputGroup}>
            <label htmlFor="phoneNumber" className="form-label" style={styles.label}>Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="form-control"
              value={user.phoneNumber}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div className="mb-3" style={styles.inputGroup}>
            <label htmlFor="role" className="form-label" style={styles.label}>Role</label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={user.role}
              onChange={handleInputChange}
              required
              style={styles.select}
            >
              <option value="" disabled>Select a role</option>
              <option value="ROLE_USER">Customer</option>
              <option value="ROLE_SELLER">Seller</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={styles.submitButton}>Update</button>
        </form>
      </div>
    </div>
  );
};

// Inline styles with dim page background and container styling
const styles = {
  pageBackground: {
    backgroundColor: '#2c3e50',  // Dimmed dark background for the entire page
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  container: {
    backgroundColor: '#ecf0f1',  // Lighter background for the form container
    borderRadius: '8px',
    padding: '30px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  },
  heading: {
    textAlign: 'center',
    color: '#34495e', // Dark grayish text for the heading
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  alert: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#16a085', // Light teal alert for messages
    color: '#ecf0f1',
    borderRadius: '5px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: '500',
    color: '#34495e', // Slightly darker text for the labels
  },
  input: {
    backgroundColor: '#ffffff', // White input fields
    border: '1px solid #7f8c8d', // Subtle border color
    borderRadius: '4px',
    padding: '10px',
    fontSize: '16px',
    color: '#34495e',  // Darker text inside the input fields
  },
  select: {
    backgroundColor: '#ffffff',
    border: '1px solid #7f8c8d',
    borderRadius: '4px',
    padding: '10px',
    fontSize: '16px',
    color: '#34495e',
  },
  submitButton: {
    backgroundColor: '#2980b9', // Muted blue color for the button
    color: '#fff',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  },
  submitButtonHover: {
    backgroundColor: '#3498db', // Slightly lighter blue on hover
  },
};

export default EditUserForm;
