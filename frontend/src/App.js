import React, { useState } from "react";
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Secert  from "./pages/Secert";
import "react-toastify/dist/ReactToastify.css"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/Register" element={<Register/>}/>
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/" element={<Secert/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
