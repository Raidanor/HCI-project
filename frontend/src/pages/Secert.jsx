import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";

export default function Secret() {
    const nav = useNavigate();
    const [cookies, , removeCookie] = useCookies([]); // Note that we're not using the cookie variable here

    const logOut = () => {
        removeCookie("jwt"); // Remove the cookie
        nav("/Login"); // Navigate to the login page
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
                    } else {
                        if (response.data && response.data.user) {
                            toast(`Hi ${response.data.user}`, { theme: 'dark' });
                        }
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
            <h1>Logged in</h1>
            <Link to="/Profile"> Go Profile page?</Link>
            <Link to=""></Link>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
}
