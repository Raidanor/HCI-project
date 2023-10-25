import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./BadgePage.css";
import badge1 from '../assets/Picture1.png';
import badge2 from '../assets/Picture2.png';
import badge3 from '../assets/Picture3.png';

export default function BadgePage() {
    const nav = useNavigate();
    const [cookies, removeCookie] = useCookies([]); 
    const logOut = () => {
        removeCookie("jwt"); 
        nav("/Login"); 
    };

    useEffect(() =>
    {
        const verifyUser = async () =>
        {
            if (!cookies.jwt)
            {
                nav("/Login");
            } else
            {
                try
                {
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
            <div className="img">
                <img src={badge1} alt=""/>
                <img src={badge2} alt=""/>
                <img src={badge3} alt=""/>
            </div>
        </div>
    );
}
