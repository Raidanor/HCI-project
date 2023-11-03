import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
 
import "./myCSS.css";
 
import Picture1 from "../assets/Picture1.png";
import Picture2 from "../assets/Picture2.png";
import Picture3 from "../assets/Picture3.png";
 
function ReturnEmpty()
{
    return(
        <>
        </>
    )
}
 
function Condition1x1()
{
    return(
        <img src = {Picture1} alt="Badge1" className="grey" />
    )
}
function Condition1x2()
{
    return(
        <img src = {Picture1} alt="Badge1" />
    )
}
function Condition1x3()
{
    return(
        <img src = {Picture1} alt="Badge1" className="rounded-circle border-glowing" />
    )
}
function Condition2x1()
{
    return(
        <img src = {Picture2} alt="Badge2" className="grey" />
    )
}
function Condition2x2()
{
    return(
        <img src = {Picture2} alt="Badge2" />
    )
}
function Condition2x3()
{
    return(
        <img src = {Picture2} alt="Badge2" className="rounded-circle border-glowing" />
    )
}
function Condition3x1()
{
    return(
        <img src = {Picture3} alt="Badge3" className="grey" />
    )
}
function Condition3x2()
{
    return(
        <img src = {Picture3} alt="Badge3" />
    )
}
function Condition3x3()
{
    return(
        <img src = {Picture3} alt="Badge3" className="rounded-circle border-glowing" />
    )
}
 
export default function BadgePage() {
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
    //COUNTERS FOR CONDIIONS
    var counter1 = 1, counter2 = 1, counter3 = 1;

    return (
        <div className="container">
            {/* 1st row */}
            <div className="row">
                <div className="col-4">
                    {(counter1 > 0) ? <Condition1x1 /> : <ReturnEmpty />}
                </div>
                <div className="col-4">
                    {(counter1 > 1) ? <Condition1x2 /> : <ReturnEmpty />}
                </div>
                <div className="col-4">
                    {(counter1 > 2) ? <Condition1x3 /> : <ReturnEmpty />}   
                </div>
            </div>

            <br />
            {/* 2nd row */}
            <div className="row">
                <div className="col-4">
                    {(counter2 > 0) ? <Condition2x1 /> : <ReturnEmpty />}
                </div>

                <div className="col-4">
                    {(counter2 > 1) ? <Condition2x2 /> : <ReturnEmpty />}
                </div>
                <div className="col-4">
                    {(counter2 > 2) ? <Condition2x3 /> : <ReturnEmpty />}
                </div>
            </div>
            <br />
            {/* 3rd row */}
            <div className="row">
                <div className="col-4">
                    {(counter3 > 0) ? <Condition3x1 /> : <ReturnEmpty />}
                </div>
                <div className="col-4">
                    {(counter3 > 1) ? <Condition3x2 /> : <ReturnEmpty />}
                </div>
                <div className="col-4">
                    {(counter3 > 2) ? <Condition3x3 /> : <ReturnEmpty />}
                </div>
            </div>
        </div>
    );
}