import React, { useState } from "react";
import axios from "axios";

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null); // Store single user data fetched from API
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(""); // To handle errors
  const [noResults, setNoResults] = useState(false); // To track no search results

  // Function to handle the search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset any previous errors
    setNoResults(false); // Reset no results flag
    setUser(null); // Clear previous user data

    try {
      // Send the search term to the backend to fetch user by username
      const response = await axios.get(`http://localhost:8080/admin/search/results`, {
        params: { username: searchTerm }, // Send search term as a query parameter
      });

      const filteredUser = response.data; // Assuming the backend returns a single user object

      if (!filteredUser || filteredUser.length === 0) {
        setNoResults(true); // Set noResults to true if no user is found
      } else {
        setUser(filteredUser[0]); // Update the state with the fetched user (assuming an array of users)
      }
    } catch (error) {
      setError("An error occurred while searching for the user.");
      console.error("Error searching user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="outer-wrapper">
      <div className="container mt-4 search-user-page">
        <h2>Search User</h2>
        <form onSubmit={handleSearch}>
          <div className="mb-3">
            <label htmlFor="search" className="form-label">Search by Username</label>
            <input
              type="text"
              id="search"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Show error if there was a problem during the request */}
        {error && <div className="alert alert-danger mt-4">{error}</div>}

        {/* Show no results message */}
        {noResults && <p>No user found</p>}

        {/* Display user information in a table if a user is found */}
        {user && !noResults && (
          <div className="mt-4">
            <h4>User Information:</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone Number</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.role}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>
        {`
          /* Apply even more subtle dim background color to the outer wrapper */
          .outer-wrapper {
            background-color: #e0e4e8; /* Light grayish background for dimming */
            min-height: 100vh;
            padding: 20px;
          }

          .search-user-page {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9; /* Even lighter background for content area */
            padding: 20px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.15); /* More subtle shadow */
            border-radius: 8px;
            max-width: 900px;
            margin: 0 auto; /* Center the container */
          }

          h2 {
            text-align: center;
            color: #34495e;
          }

          .form-label {
            font-weight: bold;
            color: #34495e;
          }

          .form-control {
            border: 1px solid #bdc3c7;
            background-color: #fff;
            color: #2c3e50;
            border-radius: 4px;
          }

          button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }

          button:hover {
            background-color: #2980b9;
          }

          .alert {
            font-size: 1rem;
          }

          .table {
            width: 100%;
            border-collapse: collapse;
          }

          .table th, .table td {
            padding: 10px;
            text-align: center;
            border: 1px solid #bdc3c7;
          }

          .table th {
            background-color: #34495e;
            color: white;
          }

          .table-bordered {
            border: 1px solid #bdc3c7;
          }
        `}
      </style>
    </div>
  );
};

export default SearchUser;
