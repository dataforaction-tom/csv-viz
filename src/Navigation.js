import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <NavLink to="/csv-viz" className={({ isActive }) => 
                "bg-[#f3581d] hover:bg-[#9dc131] text-white font-bold py-2 px-4 rounded" + 
                (isActive ? " bg-pink-500" : "")
            }>
                Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => 
                "bg-[#f3581d] hover:bg-[#9dc131] text-white font-bold py-2 px-4 rounded ml-2" + 
                (isActive ? " bg-pink-500" : "")
            }>
                About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => 
                "bg-[#f3581d] hover:bg-[#9dc131] text-white font-bold py-2 px-4 rounded ml-2" + 
                (isActive ? " bg-pink-500" : "")
            }>
                Contact
            </NavLink>
        </nav>
    );
};

export default Navigation;
