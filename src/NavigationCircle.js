import React from 'react';

const NavigationCircle = ({ stage, onSelect }) => {
    return (
      <div
        className="flex flex-col items-center justify-center m-4 w-48 h-48 bg-gray-200 hover:bg-gray-400 rounded-full text-center cursor-pointer transition duration-300 ease-in-out"
        onClick={() => onSelect(stage.component)}
      >
        <h2 className="text-xl font-bold">{stage.title}</h2>
        <p className="text-sm">{stage.description}</p>
      </div>
    );
  };
  
  
  

  export default NavigationCircle