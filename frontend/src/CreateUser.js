import { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const CreateUser = () => {

    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [age,setAge] = useState();
    const navigate = useNavigate();

    console.log(age);

    const Submit = (e) => {
        e.preventDefault();
        axios.post("https://merncrudbackend-1zpv.onrender.com/createUser",{name,email,age})
        .then(result => {
            console.log(result);
            navigate('/')
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="col-10 col-md-6 col-lg-4 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" placeholder="Enter Your Name"
                        onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" placeholder="Enter Your Email" 
                            onChange={(e) => setEmail(e.target.value)} required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age">Age</label>
                        <input type="text" className="form-control" placeholder="Enter Your Age"
                        onChange={(e) => setAge(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
};
export default CreateUser;