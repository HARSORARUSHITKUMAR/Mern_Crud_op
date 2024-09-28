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
            })
    }, [])

    const handleDelete = (id) => {
        axios.delete('https://merncrudbackend-1zpv.onrender.com/deleteUser/' + id)
            .then(res => {
                // Update the users state to remove the deleted user
                setUsers(users.filter(user => user._id !== id)); })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success">Add +</Link>
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    users.length === 0 ? (
                        <div className="text-center">
                            <h3>No records found</h3>
                        </div>
                    ) : 
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
                            {
                                users.map((user => {
                                    return <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <Link to={`/update/${user._id}`} className="btn btn-success m-2">Update</Link>
                                            <button
                                                className="btn btn-danger"
                                                onClick={(e) => handleDelete(user._id)}>
                                                Delete
                                            </button>

                                        </td>
                                    </tr>
                                }))
                            }
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
export default Users;