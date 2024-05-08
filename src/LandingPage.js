import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaQuestionCircle, FaChartBar } from 'react-icons/fa';
import { GiJourney } from 'react-icons/gi';
import { FaAnglesDown } from "react-icons/fa6";
import { TbEyeShare } from "react-icons/tb";

const Circle = ({ icon, color, text, aboveText, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center space-y-1 cursor-pointer mx-2" onClick={() => navigate(navigateTo)}>
      <p className="text-base font-semibold mb-15 pb-20 text-justify text-wrap">{aboveText}</p>
      <div className="pb-10"><FaAnglesDown size={32}/> </div>
      <div className={`flex items-center justify-center w-28 h-28 text-black rounded-full border-8 ${color}`}>
        {icon}
      </div>
      <p className="text-center">{text}</p>
    </div>
  );
};

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const hoverActiveWidth = width * 1;
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

  return (
    <div className="flex justify-center items-center h-4/5">
      <div className="flex flex-col items-center justify-center space-y-8 p-8 w-full">
        <div
          className="flex justify-center items-center w-4/5 h-3/4"
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
            <div className='grid grid-cols-5'>
              <Circle
                aboveText="Want to check your data sharing knowledge?"
                icon={<FaCheckCircle size={32} />}
                color="border-[#f860b1]"
                text="Data Sharing Checklist"
                navigateTo="/csv-viz/checklist"
              />
              <Circle
                aboveText="See all data sets?"
                icon={<TbEyeShare size={32}/>  }
                color="border-[#f3581d]"
                text="All Data"
                navigateTo="/csv-viz/alldata"
              />
              
              <Circle
                aboveText="Want to share data but feeling you need help?"
                icon={<FaQuestionCircle size={32} />}
                color="border-[#eca900]"
                text="Data Squad"
                navigateTo="/csv-viz/datasquad"
              />
              <Circle
                aboveText="Just want to get on with sharing data?"
                icon={<FaChartBar size={32} />}
                color="border-[#9dc131]"
                text="Visualise and contribute"
                navigateTo="/csv-viz/visualise"
              />

              <Circle
                aboveText="What to understand the journey we're on?"
                icon={<GiJourney size={32} />}
                color="border-red-500"
                text="See the Journey"
                navigateTo="/csv-viz/journey"
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
