import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Admin Page Component
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [file, setFile] = useState(null);

  const navigate = useNavigate(); // Get the navigate function

  // Fetch users and notifications (mocked for now)
  useEffect(() => {
    // Replace with actual API calls
    setUsers([
      { id: 1, username: 'prince', firstName: 'ikirezi', lastName: '', email: 'prince@example.com', phoneNumber: '123-456-7890', profilePicture: 'path/to/profile.jpg', role: 'Admin' },
      { id: 2, username: 'makuza', firstName: 'honore', lastName: '', email: 'makuza@example.com', phoneNumber: '098-765-4321', profilePicture: 'path/to/profile.jpg', role: 'User' },
    ]);
    setNotifications([
      { message: 'New user registered', timestamp: new Date(), read: false },
      { message: 'Password updated', timestamp: new Date(), read: true },
    ]);
  }, []);

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'User Registrations',
        data: [30, 45, 60, 20, 75],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly User Registrations',
      },
    },
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Username,First Name,Last Name,Email,Phone Number,Role\n" +
      users.map(user => 
        `${user.username},${user.firstName},${user.lastName},${user.email},${user.phoneNumber},${user.role}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    // Add logout logic if needed (e.g., clearing session, tokens)
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-navbar">
          <Link to="/admin/add" className="btn btn-primary">Add New User</Link>
          <Link to="/admin/search" className="btn btn-primary">Search User</Link>
          <Link to="/admin/upload" className="btn btn-primary">Upload File</Link>
        </div>
        <div className="user-profile">
          <a href="/user/profile" className="d-flex align-items-center">
            <img src="https://via.placeholder.com/150" alt="Profile" className="profile-icon" />
          </a>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
      </header>

      <div className="container mt-4">
        <h3 className="dashboard-title">Admin Dashboard</h3>

        {/* Registered Users Table Section */}
        <div className="users-table mb-4">
          <h5>Registered Users</h5>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Profile Picture</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td><img src={user.profilePicture || 'https://via.placeholder.com/40'} alt="Profile" width="40" height="40" /></td>
                  <td>{user.role}</td>
                  <td>
                    <Link to={`/admin/users/edit/${user.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleDownloadCSV} className="btn btn-success">Download Users List</button>
        </div>

        {/* Chart Section */}
        <div className="chart-container mb-4">
          <h5>Monthly User Registrations</h5>
          <div style={{ width: '60%', margin: '0 auto' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Notifications Section */}
        <div className="notifications-section mb-4">
          <h5>Notifications</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Message</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification, index) => (
                <tr key={index}>
                  <td>{notification.message}</td>
                  <td>{new Date(notification.timestamp).toLocaleString()}</td>
                  <td>{notification.read ? 'Read' : 'Unread'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleClearNotifications} className="btn btn-secondary">Clear All Notifications</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

// CSS styles within the component
const styles = `
  .admin-page {
    background-color: #f5f5f5;
    font-family: 'Arial', sans-serif;
  }

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: white;
  }

  .admin-navbar a {
    margin-right: 15px;
    padding: 10px 20px;
    color: white;
    text-decoration: none;
    background-color: #00796b;
    border-radius: 5px;
  }

  .admin-navbar a:hover {
    background-color: #004d40;
  }

  .user-profile {
    display: flex;
    align-items: center;
  }

  .profile-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .dashboard-title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .chart-container, .users-table, .notifications-section {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  table {
    width: 100%;
    margin-top: 20px;
  }

  .table-dark th {
    background-color: #00796b;
    color: white;
  }

  .table-striped tbody tr:nth-of-type(odd) {
    background-color: #f9f9f9;
  }

  button {
    padding: 8px 16px;
    border-radius: 5px;
    font-size: 14px;
  }

  .btn-danger {
    background-color: #e57373;
  }

  .btn-danger:hover {
    background-color: #f44336;
  }

  .btn-warning {
    background-color: #ff9800;
  }

  .btn-warning:hover {
    background-color: #fb8c00;
  }

  .btn-secondary {
    background-color: #bdbdbd;
  }

  .btn-secondary:hover {
    background-color: #757575;
  }

  .btn-success {
    background-color: #388e3c;
  }

  .btn-success:hover {
    background-color: #2e7d32;
  }
`;

// Append styles to the head
const styleTag = document.createElement("style");
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);
