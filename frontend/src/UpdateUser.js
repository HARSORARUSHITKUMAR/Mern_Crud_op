import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {

    const { id } = useParams("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://merncrudbackend-1zpv.onrender.com/getUser/' + id)
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
        //  Must start with a letter, followed by standard email format
        const trimmedEmail = email.trim();  // Always trim leading/trailing spaces
        return /^[A-Za-z][A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmedEmail);
    };
    const isValidAge = (age) => {
        return !isNaN(age) && age > 0;
    };

    const Update = (e) => {
        e.preventDefault();
        // console.log("Submitting with values:", { name, email, age });
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
     
         if (!isValidName(trimmedName)) {
            setError("Name must consist of at least character cannot be a blank.");
            console.log("Validation failed.");
            return;
        }
        if (!isValidEmail(trimmedEmail)) {
            setError("Please enter a valid email.");
            console.log("Validation failed: Email");
            return;
        }
        if (!isValidAge(age)) {
            setError("Age must be a valid number greater than 0.");
            console.log("Validation failed: Age");
            return;
        }
        
        setError("");

        axios.put("https://merncrudbackend-1zpv.onrender.com/updateUser/" + id,{ 
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
        // console.error("Error updating user:");
    }

    // const isValidInput = (value) => {
    //     return typeof value === "string" && value.trim().length > 0;
    // };

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
                        <label htmlFor="age">Age :</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
};
export default UpdateUser;