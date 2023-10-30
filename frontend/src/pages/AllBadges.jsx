import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import "./badge-custom.css";

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
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <img src = {Picture1} alt="Badge1" class="grey" />
                </div>
                <div class="col-4">
                    <img src = {Picture1} alt="Badge1" />
                </div>
                <div class="col-4">
                    <img src = {Picture1} alt="Badge1" class="" />
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <img src = {Picture2} alt="Badge2" class="grey" />
                </div>
                <div class="col-4">
                    <img src = {Picture2} alt="Badge2" />
                </div>
                <div class="col-4">
                    <img src = {Picture2} alt="Badge2" />
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <img src = {Picture3} alt="Badge3" class="grey" />
                </div>
                <div class="col-4">
                    <img src = {Picture3} alt="Badge3" />
                </div>
                <div class="col-4">
                    <img src = {Picture3} alt="Badge3" />
                </div>
            </div>
            
            <button onClick={logOut}>Log Out</button>
        </div>
    );
}
