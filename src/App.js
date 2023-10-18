import './App.css';

import {Profile} from './components/Profile.jsx'
import BadgeDisplayer from './components/BadgeDisplayer.js';

function App() {
  return (
    <div>
        <Profile />

        <div class="container-fluid bg-custom">
            
        </div>
        
        <div className="App">
            <BadgeDisplayer src="Picture1.png" alt="Description" />
        </div>

    </div>
  );
}

export default App;
