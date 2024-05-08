import React from 'react';
import Navigation from './Navigation'; // Import the Navigation component


const Header = () => {
    return (
        <header className="bg-zinc-950 text-white flex justify-between items-center p-4">
            <div className="flex items-center">
                <img src={process.env.PUBLIC_URL + "/DataforAction_Logo_offwhite_orange.png"} alt="Logo" className="h-8 mr-10" />
                <h1 className="text-xl font-bold">Insight Infrastructure - prototypes</h1>
            </div>
            <Navigation />
        </header>
    );
};

export default Header;
