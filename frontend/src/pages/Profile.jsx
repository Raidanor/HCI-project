import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import profile_icon from '../assets/astronaut.png'

export default function Profile() {
    const nav = useNavigate();
    const [cookies, removeCookie] = useCookies([]); 
    const logOut = () => {
        removeCookie("jwt"); 
        nav("/Login"); 
    };

    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                nav("/Login");
            } else {
                try {
                    const response = await axios.post("http://localhost:3500", {}, {
                        withCredentials: true,
                    });

                    if (!response.data.status) {
                        logOut(); // Call the logOut function to remove the cookie and navigate to the login page
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        };

        verifyUser();
    }, [cookies.jwt, nav]);

    return (
        <div className="private">
            
            <div className='upc'>
            <div className='gradiant'></div>
            <div className='profile-down'>
                <img src={profile_icon} alt=""/>
                <div className='profile-title'>Hi, Akbar!</div>
                <div className='profile-description'>
                Descriptions
                </div>
                <button className="button">Rewards</button>
                <button className="button">Calendar</button>
                <button className="button">Logout</button>
            </div>   
        </div>
            
            <h1>Logged in on Profile page</h1>
            <Link to="/Login">Back to Login</Link>
            <br/>
            <Link to="/Profile/Calendar">To Calendar page!</Link>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
}
