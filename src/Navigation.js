import React from 'react';

const Navigation = () => {
    return (
        <nav>
            <button className="bg-orange-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</button>
            <button className="bg-orange-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">About</button>
            <button className="bg-orange-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Contact</button>
        </nav>
    );
};

export default Navigation;
