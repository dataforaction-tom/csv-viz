import React, { useState } from 'react';
import { FaCheckCircle, FaQuestionCircle, FaChartBar } from 'react-icons/fa';
import Dataviz from './Dataviz';
import DataSharingChecklist from './DataSharingChecklist';

import { GiJourney } from 'react-icons/gi';

const Circle = ({ icon, color, text, onClick }) => (
  <div className="flex flex-col items-center space-y-2  cursor-pointer" onClick={onClick}>
    <div
      className={`flex items-center justify-center w-32 h-32 text-black rounded-full border-8 ${color}`}
    >
      {icon}
    </div>
    <p className="text-center">{text}</p>
  </div>
);

const Component3 = () => <div>Component 3 content goes here...</div>;

const LandingPage = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 1:
        return <DataSharingChecklist />;
      case 2:
        return <Component3 />;
      case 3:
        return <Dataviz />;
       
      default:
        return (
          <div
            className="relative w-full max-w-6xl justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={process.env.PUBLIC_URL + "/Datasharingjourneyv2.png"}
              alt="Data Sharing Movement"
              className={`w-full transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            />
            <div
              className={`font-bold text-xl absolute inset-0 flex justify-center items-center space-x-8 transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Circle
                icon={<FaCheckCircle size={32} />}
                color="border-pink-500"
                text="Data Sharing Checklist"
                onClick={() => setSelectedComponent(1)}
              />
              <Circle
                icon={<FaQuestionCircle size={32} />}
                color="border-orange-500"
                text="Data squad help"
                onClick={() => setSelectedComponent(2)}
              />
              <Circle
                icon={<FaChartBar size={32} />}
                color="border-green-500"
                text="Visualise and contribute"
                onClick={() => setSelectedComponent(3)}
              />
              <Circle
                icon={<GiJourney size={32} />}
                color="border-yellow-500"
                text="See the journey"
                onClick={() => setSelectedComponent(3)}
              />

            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col items-center justify-center space-y-8 p-8 w-full">
        <div className="w-full items-center">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default LandingPage;