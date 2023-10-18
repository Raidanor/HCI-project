import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.js'
import CalendarComponent from './components/CalendarComponent.js'


function App() {
  return (
    <div>
        <Navbar />

        <div>
            <Route path = "/" element = {<CalendarComponent />} />
            <Route path = "/login" element = {<Login />} />
            
        </div>

        
    </div>
  );
}

export default App;
