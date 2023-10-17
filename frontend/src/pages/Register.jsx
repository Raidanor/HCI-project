import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

export const Register = (props) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:3500/register", Object.entries(values));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name">Full Name</label>
                <input name="name" id="name" placeholder="Full Name" />
                <label htmlFor="email">Email</label>
                <input name="email" type="email" placeholder="email" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                <label htmlFor="password">Password</label>
                <input name="password" value={values.password} type="password" placeholder="*******" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                <button className="button" type="submit">Register and Login</button>
                <Link to="/Login">Already have an account? Login here.</Link>
            </form>
            <ToastContainer/>
        </div>
    )
}
