import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Profile from './pages/Profile';
import BadgePage from './pages/BadgePage';
import CalendarComponent from "./pages/CalendarComponent.js";
import Navbar from './pages/Navbar';
import Secert from "./pages/Secert";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import React, { useEffect, useState } from "react";



function App()
{
    const [toggle, setToggle] = useState(true);
    const toggleChecked = () => setToggle(toggle => !toggle);

    return(
        <>
            <BrowserRouter>
            <Navbar toggle={toggle} setToggle={setToggle}/>
                <ToastContainer/>
                <Routes>
                    <Route exact path="/Register" element={<Register/>}/>
                    <Route exact path="/Login" element={<Login/>}/>
                    <Route exact path='/' element={<Secert />}/>
                    <Route exact path='/Profile' element={<Profile />}/>
                    <Route exact path='/Profile/BadgePage' element={<BadgePage />}/>
                    <Route exact path='/Profile/Calendar' element={<CalendarComponent />}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
