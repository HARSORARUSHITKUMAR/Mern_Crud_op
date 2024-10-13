import axios from "axios";
import { useEffect, useState } from "react";
import Papa from 'papaparse';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file

    useEffect(() => {
        setLoading(true);
        axios.get('https://merncrudbackend-dymi.onrender.com')
            .then(result => {
                setUsers(result.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://merncrudbackend-dymi.onrender.com/deleteUser/${id}`)
            .then(res => {
                // Update state after deletion
                setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
                toast.success("User deleted successfully!", {
                    autoClose: 1000, // Set to 1000 ms (1 second)
                });
            })
            .catch(err => {
                toast.error("Failed to delete user.");
                // console.error('Error deleting user:', err);
            });
    };

    const handleExport = async () => {
        try {
            const response = await axios.get('https://merncrudbackend-dymi.onrender.com/api/exportUsers', {
                responseType: 'blob', // Important for downloading files
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'export.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success("Data exported successfully!", { autoClose: 1000, });
        } catch (error) {
            toast.error("Failed to export data.");
            // console.error('Error exporting data', error);
        }
    };

    const handleImport = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://merncrudbackend-dymi.onrender.com/api/importCsv', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error importing CSV: ' + response.statusText);
            }

            const data = await response.text();
            toast.success("Data imported successfully!", { autoClose: 1000, });
            // console.log('Import success:', data); // Log response for debugging
            return data; // Return a success message or the data
        } catch (error) {
            toast.error("Failed to import data.");
            // console.error('Import error:', error.message);
            throw error; // Re-throw for handling
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase(); // Get file extension

            if (fileExtension === 'csv') {
                setSelectedFile(file);
            } else {
                setSelectedFile(null); // Reset the selected file
                toast.error("Invalid file type! Please select a valid CSV file.", {
                    autoClose: 1000, // Auto close after 2 seconds
                });
            }
        }
    };

    const handleFileUpload = (event) => {
        event.preventDefault();
    
        if (selectedFile) {
            Papa.parse(selectedFile, {
                header: true,
                skipEmptyLines: true, // This option will skip empty lines in the CSV
                complete: function (results) {
                    const rows = results.data;
    
                    // Check if CSV has no rows or only one row which is empty
                    if (rows.length === 0 || rows.every(row => Object.values(row).every(value => value === ""))) {
                        toast.error("Please enter the correct file, not empty.", {
                            autoClose: 2000, // Auto close after 2 seconds
                        });
                        return; // Stop the import process
                    }
    
                    // If valid, proceed with the import
                    handleImport(selectedFile).then(() => {
                        // Fetch updated users after import
                        axios.get('https://merncrudbackend-dymi.onrender.com')
                            .then(response => {
                                setUsers(response.data); // Update state with the latest users
                            })
                            .catch(err => {
                                console.error('Error fetching updated user list:', err);
                            });
                    }).catch(error => {
                        console.error('Import error:', error);
                    });
                },
                error: function (error) {
                    console.error('Error parsing CSV:', error);
                }
            });
        } else {
            toast.error("No file selected. Please select a valid file.", {
                autoClose: 2000,
            });
        }
    };
    

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success">Add +</Link>
                <button className="btn btn-primary m-2" onClick={handleExport}>Export CSV</button>
                <div className="m-2">
                    <input
                        type="file"
                        id="csvFileInput"
                        accept=".csv"
                        className="m-2"
                        onChange={handleFileChange}
                    />
                    <button className="btn btn-warning" onClick={handleFileUpload}>Import CSV</button>
                </div>
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    users.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Age</th>
                                    <th style={{ textAlign: "center" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <Link to={`/update/${user._id}`} className="btn btn-success m-2">Update</Link>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(user._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center">
                            <h3>No records found</h3>
                        </div>
                    )
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Users;
