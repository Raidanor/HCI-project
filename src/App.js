import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar.js'
import CalendarComponent from './components/CalendarComponent.js'


function App() {
  return (
    <div>
        <Navbar />
        <CalendarComponent />
        
        <div class="container-fluid bg-custom">
            
        </div>
    </div>
  );
}

export default App;
