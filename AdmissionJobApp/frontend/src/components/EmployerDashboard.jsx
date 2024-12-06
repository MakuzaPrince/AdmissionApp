import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployerDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filter, setFilter] = useState("");
    const [filterType, setFilterType] = useState("title");

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/employer/jobs");
            setJobs(response.data);
            setFilteredJobs(response.data);
        } catch (error) {
            console.error("Error in fetching:", error);
            setMessage("Failed to load. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handlePostJob = async (event) => {
        event.preventDefault();
        const newJob = {
            title: event.target.title.value,
            description: event.target.description.value,
            location: event.target.location.value,
            jobType: event.target.jobType.value,
        };

        try {
            const response = await axios.post("http://localhost:8080/employer/jobs", newJob);
            if (response.status === 201) {
                setMessage("posted successfully!");
                setJobs((prevJobs) => [...prevJobs, response.data]);
                setFilteredJobs((prevJobs) => [...prevJobs, response.data]);
                event.target.reset();
            }
        } catch (error) {
            console.error("Error in posting:", error.response ? error.response.data : error.message);
            setMessage("Failed to post. Please try again later.");
        }
    };

    const handleUpdateJob = async (event) => {
        event.preventDefault();
        const updatedJob = {
            id: editingJob.id,
            title: event.target.title.value,
            description: event.target.description.value,
            location: event.target.location.value,
            jobType: event.target.jobType.value,
        };

        try {
            const response = await axios.put(
                `http://localhost:8080/employer/jobs/${editingJob.id}`,
                updatedJob
            );
            if (response.status === 200) {
                setMessage("updated successfully!");
                fetchJobs();
                setEditingJob(null);
            }
        } catch (error) {
            console.error("Error in updating:", error.response ? error.response.data : error.message);
            setMessage("Failed to update. Please try again later.");
        }
    };

    const handleDeleteJob = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/employer/jobs/${id}`);
            if (response.status === 200) {
                setMessage("deleted successfully!");
                fetchJobs();
            }
        } catch (error) {
            console.error("Error in deleting:", error.response ? error.response.data : error.message);
            setMessage("Failed to delete. Please try again later.");
        }
    };

    const sortJobsByTitle = () => {
        const sortedJobs = [...filteredJobs].sort((a, b) =>
            sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );
        setFilteredJobs(sortedJobs);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        const filtered = jobs.filter((job) =>
            job[filterType].toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredJobs(filtered);
    };

    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
        setFilter("");
        setFilteredJobs(jobs);
    };

    return (
        <div className="dashboard">
            <header>
                <h1>Employer Dashboard</h1>
                {/* <p>Manage your job postings below.</p> */}
            </header>

            {message && <div className="message">{message}</div>}

            <div className="content">
                <div className="form-container">
                    <h2>{editingJob ? "Edit" : "Post a New data"}</h2>
                    <form onSubmit={editingJob ? handleUpdateJob : handlePostJob}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Post-Title"
                            defaultValue={editingJob?.title || ""}
                            required
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Post-Description"
                            defaultValue={editingJob?.description || ""}
                            required
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            defaultValue={editingJob?.location || ""}
                            required
                        />
                        <select name="jobType" defaultValue={editingJob?.jobType || ""} required>
                            <option value="">Select Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                        <button type="submit">{editingJob ? "Update" : "Post"}</button>
                    </form>
                </div>

                <div className="table-container">
                    <div className="filter-bar">
                        <input
                            type="text"
                            placeholder={`Search by ${filterType}`}
                            value={filter}
                            onChange={handleFilterChange}
                        />
                        <select value={filterType} onChange={handleFilterTypeChange}>
                            <option value="title">Title</option>
                            <option value="location">Location</option>
                            <option value="Type">Type</option>
                        </select>
                    </div>

                    <h2>Your Postes</h2>
                    {loading ? (
                        <p>Loading ...</p>
                    ) : (
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th onClick={sortJobsByTitle} style={{ cursor: "pointer" }}>
                                        Title <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    </th>
                                    <th>Description</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredJobs.map((job) => (
                                    <tr key={job.id}>
                                        <td>{job.title}</td>
                                        <td>{job.description}</td>
                                        <td>{job.location}</td>
                                        <td>{job.jobType}</td>
                                        <td>
                                            <button onClick={() => setEditingJob(job)}>Edit</button>
                                            <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <style jsx>{`
  .dashboard {
    padding: 20px;
    background-color: #f5f5f5; /* Light dim gray */
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  header {
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
  }

  .message {
    padding: 8px;
    background-color: #e0e4e8; /* Soft dim grayish blue */
    border-radius: 5px;
    margin-bottom: 15px;
    text-align: center;
    color: #6c757d; /* Muted gray */
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-container,
  .table-container {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
  }

  .form-container form input,
  .form-container form select,
  .form-container form button {
    display: block;
    width: 60%; /* Smaller width for input fields */
    margin: 8px auto;
    padding: 6px; /* Smaller padding */
    font-size: 12px; /* Smaller font size */
    border: 1px solid #d1d7dc; /* Light gray border */
    border-radius: 5px;
    background-color: #f8f9fa; /* Very light gray */
    transition: border-color 0.3s ease;
  }

  .form-container form input:focus,
  .form-container form select:focus {
    border-color: #6c757d; /* Muted dark gray */
    outline: none;
  }

  .form-container form button {
    width: 60%; /* Reduced button width */
    padding: 6px;
    font-size: 12px;
    background-color: #5a6268; /* Dim grayish blue */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s;
  }

  .form-container form button:hover {
    background-color: #3e4549; /* Darker muted blue */
    transform: translateY(-1px);
  }

  .table-container .filter-bar {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
  }

  .table-container .filter-bar input,
  .table-container .filter-bar select {
    padding: 8px;
    font-size: 12px;
    border: 1px solid #d1d7dc;
    border-radius: 5px;
    width: 130px;
    background-color: #f8f9fa;
  }

  .custom-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .custom-table th,
  .custom-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-size: 12px; /* Smaller font size for table */
  }

  .custom-table th {
    background-color: #6c757d; /* Dim grayish green */
    color: white;
  }

  .custom-table tr:hover {
    background-color: #f8f9fa; /* Lighter gray for hover effect */
  }

  button {
    padding: 8px 16px;
    background-color: #5a6268;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
  }

  button:hover {
    background-color: #3e4549;
  }

  /* Title styling */
  .post-title {
    text-align: center;
    font-size: 20px; /* Slightly bigger for better visibility */
    font-weight: bold;
    color: #4b5055; /* Dimmed dark gray for title */
    margin-bottom: 15px;
  }

  @media (max-width: 768px) {
    .form-container,
    .table-container {
      width: 100%;
    }

    .custom-table th,
    .custom-table td {
      font-size: 12px;
      padding: 8px;
    }
  }
`}</style>

        </div>
    );
};

export default EmployerDashboard;
