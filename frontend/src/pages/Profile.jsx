import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import profile_icon from '../assets/astronaut.png'
// import Picture1 from "../assets/Picture1.png";
// import Picture2 from "../assets/Picture2.png";
// import Picture3 from "../assets/Picture3.png";

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
            
            <div className='body2'>
            <div className='upc'>
            <div className='gradiant'></div>
            <div className='profile-down'>
                <img src={profile_icon} alt="" className="center"/>
                <div className='profile-title'>
                {/* ${response.data.user} */}
                </div>
                <div className='block-display'>
                {/* <div className='buttonProfile'> */}
                {/* <div className='btn-group'> */}
                <Link to="/profile/badgepage"><button className="button2">Badge Page</button></Link>
                {/* </div> */}
                {/* </div> */}
                {/* <button className="button">Calendar</button>
                <button className="button">Logout</button> */}
                {/* <div className='buttonProfile'> */}
                {/* <Link to="/Login"><button className="button2">Login</button></Link> */}
                {/* </div> */}
                {/* <br/> */}
                {/* <div className='buttonProfile'> */}
                <Link to="/Profile/Calendar"><button className="button2">Calendar</button></Link>
                {/* </div> */}
                {/* <div className='buttonProfile'> */}
                <button onClick={logOut} className="button2">Log Out</button>
                {/* </div> */}
                </div>
                {/* </div> */}
                {/* </div> */}
            </div>   
        </div>
        </div>
            
            {/* <h1>Logged in on Profile page</h1> */}
            {/* <Link to="/Login">Login</Link>
            <br/>
            <Link to="/Profile/Calendar">Calendar</Link>
            <button onClick={logOut}>Log Out</button> */}
        </div>
    );
}
