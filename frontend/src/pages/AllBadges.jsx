import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./hoverStyles.css"; //new
import "./myCSS.css";

import Picture1 from "../assets/Picture1.png";
import Picture2 from "../assets/Picture2.png";
import Picture3 from "../assets/Picture3.png";


export default function AllBadges() {
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
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <img src = {Picture1} alt="Badge1" className="grey badge-grey" /> 
                </div>
                <div className="col-4">
                    <img src = {Picture1} alt="Badge1" className="badge-colored"/> 
                </div>
                <div className="col-4">
                    <img src = {Picture1} alt="Badge1" className="badge-rounded rounded-circle border-glowing" />
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-4">
                    <img src = {Picture2} alt="Badge2" className="grey badge-grey" />
                </div>
                <div className="col-4">
                    <img src = {Picture2} alt="Badge2" className="badge-colored" /> 
                </div>
                <div className="col-4">
                    <img src = {Picture2} alt="Badge2" className="badge-rounded rounded-circle border-glowing" />
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-4">
                    <img src = {Picture3} alt="Badge3" className="grey badge-grey" /> 
                </div>
                <div className="col-4">
                    <img src = {Picture3} alt="Badge3" className="badge-colored"/> 
                </div>
                <div className="col-4">
                    <img src = {Picture3} alt="Badge3" className="badge-rounded rounded-circle border-glowing" />
                </div>
            </div>
            
            <button onClick={logOut}>Log Out</button>
        </div>
    );
}
