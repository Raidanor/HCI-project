import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import Navbar from './components/Navbar.js'
import { Register } from "./pages/Register";
import Profile from './pages/Profile';
import BadgePage from './pages/BadgePage';
import CalendarComponent from "./components/CalendarComponent.js";
import Navbar from "./components/Navbar.jsx";
import Secert from "./pages/Secert";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import React, { useEffect, useState } from "react";



function App()
{
  return (
    <>
        <BrowserRouter>
        <Navbar />
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
