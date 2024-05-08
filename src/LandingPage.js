import React, { useState, useRef } from 'react';
import { FaCheckCircle, FaQuestionCircle, FaChartBar } from 'react-icons/fa';
import { GiJourney } from 'react-icons/gi';
import Dataviz from './Dataviz';
import DataSharingChecklist from './DataSharingChecklist';

const Circle = ({ icon, color, text, onClick }) => (
  <div className="flex flex-col items-center space-y-2 cursor-pointer mx-20" onClick={onClick}>
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
  const imageRef = useRef(null);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Define the hover active area (e.g., 20% of the image size)
    const hoverActiveWidth = width * 0.8;
    const hoverActiveHeight = height * 0.6;

    if (
      clientX > centerX - hoverActiveWidth / 2 &&
      clientX < centerX + hoverActiveWidth / 2 &&
      clientY > centerY - hoverActiveHeight / 2 &&
      clientY < centerY + hoverActiveHeight / 2
    ) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  };

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
            className="flex justify-center items-center w-3/5 h-3/4"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsHovered(false)}
            ref={imageRef}
          >
            <img
              src={process.env.PUBLIC_URL + "/Datasharingjourneyv2.png"}
              alt="Data Sharing Movement"
              className={`object-contain transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            />
            <div
              className={`font-bold text-xl absolute inset-0 flex justify-center items-center transition-opacity duration-500 ${
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
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center space-y-8 p-8 w-full">
        {renderComponent()}
      </div>
    </div>
  );
};

export default LandingPage;
