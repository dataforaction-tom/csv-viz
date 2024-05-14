import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
      <NavLink
        to="/"
        className={({ isActive }) =>
          "bg-[#f860b1] hover:bg-[#9dc131] text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 w-4/5 sm:w-auto text-center" +
          (isActive ? " bg-pink-500" : "")
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/checklist"
        className={({ isActive }) =>
          "bg-[#f860b1] hover:bg-[#9dc131] text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 w-4/5 sm:w-auto text-center" +
          (isActive ? " bg-pink-500" : "")
        }
      >
        Checklist
      </NavLink>
      <NavLink
        to="/dataviz"
        className={({ isActive }) =>
          "bg-[#f860b1] hover:bg-[#9dc131] text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 w-4/5 sm:w-auto text-center" +
          (isActive ? " bg-pink-500" : "")
        }
      >
        Visualise
      </NavLink>
      <NavLink
        to="/alldata"
        className={({ isActive }) =>
          "bg-[#f860b1] hover:bg-[#9dc131] text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 w-4/5 sm:w-auto text-center" +
          (isActive ? " bg-pink-500" : "")
        }
      >
        View Data
      </NavLink>
      
      <NavLink
        to="/journey"
        className={({ isActive }) =>
          "bg-[#f860b1] hover:bg-[#9dc131] text-white font-bold py-2 px-4 rounded w-4/5 sm:w-auto text-center" +
          (isActive ? " bg-pink-500" : "")
        }
      >
        Journey
      </NavLink>
    </nav>
  );
};

export default Navigation;