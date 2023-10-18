import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.js'
import CalendarComponent from './components/CalendarComponent.js'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'


function App() {
  return (
    <div>
    <Router>
        <Navbar />
        <div>
            <Routes>
                <Route exact path = "/" element = {<CalendarComponent />} />
                <Route path = "/login" element = {<Login />} />
                <Route path = "/register" element = {<Register />} />
                
                
            </Routes>
            
        </div>

    </Router>
    </div>
  );
}

export default App;
