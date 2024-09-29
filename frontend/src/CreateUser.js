import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreateUser = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ageError, setAgeError] = useState("");
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNameChange = (e) => {
        const value = e.target.value;
        const isValidName = /^[A-Za-z\s]*$/.test(value);
        if (isValidName || value === "") {
            setName(value);
            setNameError(""); // Clear error message if input is valid
        } else {
            setNameError("Please enter a valid name (letters only).");
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        // Check if the first character is a letter and the rest can be alphanumeric
        const isValidEmail = /^[A-Za-z][A-Za-z0-9]*@([A-Za-z]+\.)+[A-Za-z]{2,}$/.test(value);
        if (isValidEmail || value === "") {
            setEmail(value);
            setEmailError(""); // show the error message if input is valid
        } else {
            setEmailError("Please enter a valid email (first character must be a letter).");
        }
    };

    const handleAgeChange = (e) => {
        const value = e.target.value;
        // Check if the value is a number and at least 1
        const isValidAge = /^(1[0-9]{0,2}|[1-9][0-9]{0,2})$/.test(value);
        if (isValidAge || value === "") {
            setAge(value);
            setAgeError(""); // Clear error message if input is valid
        } else {
            setAgeError("Please enter a valid age (1 or above).");
        }
    };


    const Submit = (e) => {
        e.preventDefault();
        if (!name.trim() || !/^[A-Za-z\s]+$/.test(name)) {
            setNameError("Name field is required.");
            return;
        }

        if (!email) {
            setEmailError("Email field is required.");
            return;
        }

        // Check if the age is valid before submission
        if (!age || age < 1 || age > 150) {
            setAgeError("Age must be between 1 and 150.");
            return;
        }

        setIsSubmitting(true);

        axios.post("https://merncrudbackend-1zpv.onrender.com/createUser", { name, email, age })
            .then(result => {
                console.log(result);
                navigate('/')
            })
            .catch(err => { console.log(err); setIsSubmitting(false); });
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="col-10 col-md-6 col-lg-4 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" className={`form-control ${nameError ? 'is-invalid' : ''}`} placeholder="Enter Your Name"
                            onChange={handleNameChange} value={name} required />
                        {nameError && <div className="invalid-feedback">{nameError}</div>} {/* Display name error message */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className={`form-control ${emailError ? 'is-invalid' : ''}`}
                            placeholder="Enter Your Email"
                            onChange={handleEmailChange}
                            value={email}
                            required
                        />
                        {emailError && <div className="invalid-feedback">{emailError}</div>} {/* Display email error message */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age">Age</label>
                        <input
                            type="text"
                            className={`form-control ${ageError ? 'is-invalid' : ''}`}
                            placeholder="Enter Your Age"
                            onChange={handleAgeChange}
                            value={age}
                            required />
                        {ageError && <div className="invalid-feedback">{ageError}</div>} {/* Display age error message */}
                    </div>
                    <button type="submit" className="btn btn-success" disabled={isSubmitting}> {isSubmitting ? 'Submitting...' : 'Submit'} {/* Show different text based on submission status */}</button>
                </form>
            </div>
        </div>
    );
};
export default CreateUser;