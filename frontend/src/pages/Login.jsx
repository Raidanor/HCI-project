import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages.css";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

export const Login = (props) =>
{
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const generateError = (err) => toast.error(err, {
        position: "bottom-right",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:3500/login", values, {
                withCredentials: true,
            });

            // Check if the request was successful
            if (data.created) {
                navigate("/")
            }
        } catch (err) {
            if (err.response) {
                // AxiosError with response data
                const { data } = err.response;
                if (data.errors) {
                    for (const key in data.errors) {
                        generateError(data.errors[key]);
                    }
                }
            } else {
                // Handle other errors here
                console.log(err);
            }
        }
    };


    return(
        
        <div className="auth-form-container login-body">
            <h2>Login</h2>
            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="email">Email</label>
                <input name="email" type="email" placeholder="email" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                <label htmlFor="password">Password</label>
                <input name="password" value={values.password} type="password" placeholder="*******" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
            <button className="button" type="submit">Login</button>
            <br/>
            <Link to="/Register">Don't have an account? Register here. </Link>
        </form>
        
        </div>
        
    )
}