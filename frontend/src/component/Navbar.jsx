// Navbar.js
import React, { useState } from 'react';
import '../style/Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='navbar'>
            <div className="logo">
                <span style={{fontWeight:'bold'}}>Movies </span>
                <span style={{ color: 'black', fontWeight:'bold', background: 'yellow', paddingLeft: '3px', paddingRight: '3px', borderRadius: '2px' }}>
                    Hub
                </span>
            </div>


            <div className="search-box">
                <input type="text" placeholder="Search..." />
                <img src='/images/search-icon.png' alt='search-image' className='search-image' />
            </div>




            <div className="menu">
                <ul>
                    <li><NavLink to="/" style={{fontSize:'18px',fontWeight:'bold'}}>Home</NavLink></li>
                    <li><NavLink to="/recommendation" style={{fontSize:'18px',fontWeight:'bold'}}>Recommendation</NavLink></li>
                </ul>
            </div>

        </nav>
    );
};

export default Navbar;
