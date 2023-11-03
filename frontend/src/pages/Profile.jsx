import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
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
                        logOut();
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
            <div className='body2'>
                <div className='upc'>
                    <div className='gradiant'></div>
                    <div className='profile-down'>
                        <img src={profile_icon} alt="" className="center"/>
                        <div className='block-display'>
                            <Link to="/profile/badgepage">
                                <button className="button2">Badge Page</button>
                            </Link>
                            <Link to="/Profile/Calendar">
                                <button className="button2">Calendar</button>
                            </Link>
                            <button onClick={logOut} className="button2">Log Out</button>
                        </div>
                    </div>   
                </div>
            </div>            
        </div>
    );
}