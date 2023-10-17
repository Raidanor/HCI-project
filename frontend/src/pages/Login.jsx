import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./pages.css";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

export const Login = (props) => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
                
        } catch(err){

        }
    };


    return(
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="email">Email</label>
                <input name="email" type="email" placeholder="email" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                <label htmlFor="password">Password</label>
                <input name="password" value={values.password} type="password" placeholder="*******" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
            <button className="button" type="submit">Login</button>
            <Link to="/Register">Don't have an account? Register here. </Link>
        </form>
        <ToastContainer/>
        </div>
    )
}