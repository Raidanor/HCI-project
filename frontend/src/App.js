import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar"
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Profile from './pages/Profile';
import BadgePage from './pages/BadgePage';
import AllBadges from './pages/AllBadges';
import CalendarComponent from "./pages/CalendarComponent";
import Secret from "./pages/Secert"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <ToastContainer />
            <Routes>
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/" element={<Secret />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/profile/badgepage" element={<BadgePage />} />
                <Route exact path="/profile/allbadges" element={<AllBadges />} />
                <Route exact path="/profile/calendar" element={<CalendarComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
