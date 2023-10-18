import React from "react";
import { useNavigate } from "react-router-dom";

export default function Secert(){
    const nav = useNavigate();
    const logOut = () => {
        nav('/Register')
    };
    return (
        <div className="private">
            <h1>Logged in</h1>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}