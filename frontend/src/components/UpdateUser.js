import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {

    const { id } = useParams("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState();
    const [age, setAge] = useState("");
    const [ageError, setAgeError] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const URL = "https://merncrudbackend-1zpv.onrender.com";

    useEffect(() => {
        axios.get(`${URL}/getUser/${id}`)
            .then(result => {
                // console.log("User data fetched:", result.data);
                setName(result.data.name || "");
                setEmail(result.data.email || "");
                setAge(result.data.age || "");
            })
            .catch(err => console.error("Error fetching user:", err));
    },[id]);

    const isValidName = (name) => {
        // contains at least one space between two words, and no leading space.
        return /^[A-Za-z]+(\s[A-Za-z]+)*$/.test(name.trim()) && name.trim().length > 0;
    };
    

    const isValidEmail = (email) => {
        const trimmedEmail = email.trim();
        // Regex to allow only emails ending with gmail.com or email.com
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        // console.log("Validating email:", trimmedEmail); 
        return emailPattern.test(trimmedEmail);
      };

    
    const isValidAge = (age) => {
        return !isNaN(age) && age >= 1 && age <= 150;
    };

    const handleAgeChange = (e) => {
        const value = e.target.value;
        // Check if the value is a number and at least 1
        const isValidAge = /^(1[0-9]{0,2}|[1-9][0-9]{0,2})$/.test(value);
        if ((isValidAge >= 1 && isValidAge <= 150) || value === "") {
            setAge(value);
            setAgeError(""); // Clear error message if input is valid
        } else {
            setAgeError("Age must be between 1 and 150.");
        }
    };

    const Update = (e) => {
        e.preventDefault();
        // console.log("Submitting with values:", { name, email, age });
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
     
         if (!isValidName(trimmedName)) {
            setError("Name must consist character cannot be a blank.");
            // console.log("Validation failed.");
            return;
        }
        
        if (!isValidEmail(trimmedEmail)) {
            setError("Please enter a valid email.");
            // console.log("Invalid email:", trimmedEmail);
            return;
          }
        // console.log("the email validation:",isValidEmail);

        if (!isValidAge(age)) {
            setAgeError("Age must be between 1 and 150.");
            // console.log("Validation failed: Age");
            return;
        }
        
        setError("");

        axios.put(`${URL}/updateUser/${id}`,{ 
            name: trimmedName,
            email: trimmedEmail,
            age: parseInt(age),
        })
        .then(result => {
            console.log(result);
            // console.log("Update successful:", result.data);
            navigate('/')
        })
        .catch(err => console.log(err));
        // console.error("Error updating user:",err);
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>
                    <h2>Update User</h2>
                    {error && <p className="text-danger">{error}</p>} {/* Display error if any */}
                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age">Age</label>
                        <input
                            type="text"
                            className={`form-control ${ageError ? 'is-invalid' : ''}`}
                            placeholder="Enter Your Age"
                            value={age}
                            onChange={handleAgeChange}
                            required
                        />
                        {ageError && <div className="invalid-feedback">{ageError}</div>} {/* Display age error message */}

                    </div>
                    <button className="btn btn-success" >Update</button>
                </form>
            </div>
        </div>
    );
};
export default UpdateUser;