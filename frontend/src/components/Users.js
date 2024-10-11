// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);


//     useEffect(() => {
//         setLoading(true);

//         axios.get('https://merncrudbackend-1zpv.onrender.com')
//             .then(result => {
//                 setUsers(result.data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.log(err);
//                 setLoading(false);
//             })
//     }, [])

//     const handleDelete = (id) => {
//         axios.delete('https://merncrudbackend-1zpv.onrender.com/deleteUser/' + id)
//             .then(res => {
//                 // Update the users state to remove the deleted user
//                 setUsers(users.filter(user => user._id !== id));
//             })
//             .catch(err => console.log(err))
//     };

//     const handleExport = () => {
//         fetch(`${process.env.mongoURI}/exportCsv`)
//             .then(response => response.blob())
//             .then(blob => {
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = 'users.csv'; // Name of the downloaded file
//                 document.body.appendChild(a);
//                 a.click();
//                 a.remove();
//             })
//             .catch(err => {
//                 console.error('Error exporting CSV:', err);
//             });
//     };

//     const handleImport = (event) => {
//         event.preventDefault();
//         const fileInput = document.getElementById('csvFileInput');
//         const file = fileInput.files[0];
//         const formData = new FormData();
//         formData.append('file', file);

//         fetch(`${process.env.REACT_APP_API_URL}/importCsv`, {
//             method: 'POST',
//             body: formData,
//         })
//             .then(response => response.text())
//             .then(data => {
//                 alert('CSV Imported Successfully!');
//                 console.log('Success:', data);
//                 // Optionally, refresh the user list
//                 window.location.reload();
//             })
//             .catch(err => {
//                 console.error('Error importing CSV:', err);
//             });
//     };

//     return (
//         <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//             <div className="w-50 bg-white rounded p-3">
//                 <Link to="/create" className="btn btn-success">Add +</Link>
//                 {/* Add buttons for exporting and importing CSV */}
//                 <button className="btn btn-primary m-2" onClick={handleExport}>Export CSV</button>
//                 <form className="m-2" onSubmit={handleImport}>
//                     <input type="file" id="csvFileInput" accept=".csv" required />
//                     <button type="submit" className="btn btn-warning m-2">Import CSV</button>
//                 </form>
//                 {loading ? (
//                     <div className="text-center">
//                         <div className="spinner-border" role="status">
//                             <span className="visually-hidden">Loading...</span>
//                         </div>
//                     </div>
//                 ) : (
//                     users.length > 0 ? (
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Age</th>
//                                     <th style={{ textAlign: "center" }}>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     users.map((user => {
//                                         return <tr key={user._id}>
//                                             <td>{user.name}</td>
//                                             <td>{user.email}</td>
//                                             <td>{user.age}</td>
//                                             <td>
//                                                 <Link to={`/update/${user._id}`} className="btn btn-success m-2">Update</Link>
//                                                 <button
//                                                     className="btn btn-danger"
//                                                     onClick={(e) => handleDelete(user._id)}>
//                                                     Delete
//                                                 </button>

//                                             </td>
//                                         </tr>
//                                     }))
//                                 }
//                             </tbody>
//                         </table>
//                     ) : <div className="text-center">
//                         <h3>No records found</h3>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
// export default Users;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         setLoading(true);
//         axios.get('https://merncrudbackend-1zpv.onrender.com')
//             .then(result => {
//                 setUsers(result.data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.log(err);
//                 setLoading(false);
//             });
//     }, []);

//     const handleDelete = (id) => {
//         axios.delete('https://merncrudbackend-1zpv.onrender.com/deleteUser/' + id)
//             .then(res => {
//                 // Update the users state to remove the deleted user
//                 setUsers(users.filter(user => user._id !== id));
//             })
//             .catch(err => console.log(err));
//     };

//     const handleExport = async () => {
//         try {
//             const response = await axios.get('http://localhost:3001/api/exportUsers', {
//                 responseType: 'blob', // Important for downloading files
//             });

//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', 'export.csv');
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//         } catch (error) {
//             console.error('Error exporting data', error);
//         }
//     };

//     const handleImport = async (file) => {
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await fetch('http://localhost:3001/api/importCsv', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error('Error importing CSV: ' + response.statusText);
//             }

//             const data = await response.text();
//             console.log(data); // For debugging purposes
//         } catch (error) {
//             console.error(error.message);
//         }
//     };

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         handleImport(file);
//     };

//     return (
//         <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//             <div className="w-50 bg-white rounded p-3">
//                 <Link to="/create" className="btn btn-success">Add +</Link>
//                 {/* Button for exporting CSV */}
//                 <button className="btn btn-primary m-2" onClick={handleExport}>Export CSV</button>
//                 {/* Form for importing CSV */}
//                 <form className="m-2" onSubmit={(e) => { e.preventDefault(); handleFileChange(e.target.csvFileInput); }}>
//                     <input type="file" id="csvFileInput" accept=".csv" required />
//                     <button type="submit" className="btn btn-warning m-2">Import CSV</button>
//                 </form>
//                 {loading ? (
//                     <div className="text-center">
//                         <div className="spinner-border" role="status">
//                             <span className="visually-hidden">Loading...</span>
//                         </div>
//                     </div>
//                 ) : (
//                     users.length > 0 ? (
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Age</th>
//                                     <th style={{ textAlign: "center" }}>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.map(user => (
//                                     <tr key={user._id}>
//                                         <td>{user.name}</td>
//                                         <td>{user.email}</td>
//                                         <td>{user.age}</td>
//                                         <td>
//                                             <Link to={`/update/${user._id}`} className="btn btn-success m-2">Update</Link>
//                                             <button
//                                                 className="btn btn-danger"
//                                                 onClick={() => handleDelete(user._id)}>
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <div className="text-center">
//                             <h3>No records found</h3>
//                         </div>
//                     )
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Users;


import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('https://merncrudbackend-1zpv.onrender.com')
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
        axios.delete('https://merncrudbackend-1zpv.onrender.com/deleteUser/' + id)
            .then(res => {
                // Update the users state to remove the deleted user
                setUsers(users.filter(user => user._id !== id));
            })
            .catch(err => console.log(err));
    };

    const handleExport = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/exportUsers', {
                responseType: 'blob', // Important for downloading files
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'export.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting data', error);
        }
    };

    const handleImport = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3001/api/importCsv', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error importing CSV: ' + response.statusText);
            }

            const data = await response.text();
            console.log(data); // For debugging purposes
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        handleImport(file);
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success">Add +</Link>
                {/* Button for exporting CSV */}
                <button className="btn btn-primary m-2" onClick={handleExport}>Export CSV</button>
                {/* Form for importing CSV */}
                <form className="m-2" onSubmit={(e) => { e.preventDefault(); handleFileChange(e.target.csvFileInput); }}>
                    <input type="file" id="csvFileInput" accept=".csv" required />
                    <button type="submit" className="btn btn-warning m-2">Import CSV</button>
                </form>
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
                                {users.map(user => (
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
        </div>
    );
};

export default Users;
