import React from 'react';
import Picture1 from '../assets/Picture1.png';
import Picture2 from '../assets/Picture2.png';
import Picture3 from '../assets/Picture3.png';

function BadgeDisplayer() {
    return (
        <div className="image-container">
            <img src={Picture1} />
            <img src={Picture2} />
            <img src={Picture3} />
        </div>
    );
}

export default BadgeDisplayer;