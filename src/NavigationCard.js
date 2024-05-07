import React from 'react';

const NavigationCard = ({ title, image, text, onCardClick, bgColor = 'bg-white' }) => {
    return (
        <div 
            className={`${bgColor} max-w-sm rounded overflow-hidden shadow-lg cursor-pointer`}
            onClick={onCardClick}
        >
            <img className="w-full" src={image} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default NavigationCard;
