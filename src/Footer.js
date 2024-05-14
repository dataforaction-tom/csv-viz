import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaQuestionCircle, FaChartBar } from 'react-icons/fa';
import { GiJourney } from 'react-icons/gi';
import { TbEyeShare } from "react-icons/tb";

const Circle = ({ icon, color, text, aboveText, navigateTo }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center space-y-1 cursor-pointer mx-2 text-center"
      onClick={() => navigate(navigateTo)}
    >
      <p className="text-xs sm:text-sm md:text-base font-semibold mb-2">{aboveText}</p>
      <div className={`flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-black rounded-full border-4 sm:border-6 md:border-8 ${color}`}>
        {React.cloneElement(icon, { size: 20, className: 'sm:w-6 sm:h-6 md:w-8 md:h-8' })}
      </div>
      <p className="text-center font-bold text-xs sm:text-sm md:text-base">{text}</p>
    </div>
  );
};

const Footer = () => {
  return (
    <div className='pt-10 sticky bottom-0'>
      <hr className="border-t-2 border-dotted border-[#f860b1] w-4/5 mx-auto my-4" />
      <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-center items-center pb-10 mx-auto">
        <Circle aboveText="Check your knowledge?" icon={<FaCheckCircle />} color="border-[#f860b1]" text="Checklist" navigateTo="/checklist" />
        <Circle aboveText="See all data?" icon={<TbEyeShare />} color="border-[#f3581d]" text="All Data" navigateTo="/alldata" />
        <Circle aboveText="Need help?" icon={<FaQuestionCircle />} color="border-[#eca900]" text="Data Squad" navigateTo="/datasquad" />
        <Circle aboveText="Share data?" icon={<FaChartBar />} color="border-[#9dc131]" text="Visualise" navigateTo="/visualise" />
        <Circle aboveText="Understand the journey?" icon={<GiJourney />} color="border-red-500" text="Journey" navigateTo="/journey" />
      </div>
     
      <div className="flex justify-between items-center gap-10 p-10 bg-slate-200 border-2 border-pink-500 border-dotted">
      <p className="text-xl font-semibold">
        Developed by Data For Action with the Insight Infrastructure team at Joseph Rowntree Foundation
      </p>
      <div className="flex items-center space-x-4 sm:space-x-10">
        <img src={process.env.PUBLIC_URL + "/DataforAction_Logo_offblack_pink.png"} alt="DFALogo" className="h-20" />
        <img src={process.env.PUBLIC_URL + "/InsightInfrastructurePackage_Logo.svg"} alt="IILogo" className="h-20" />
        <img src={process.env.PUBLIC_URL + "/JRF_Lock-up_3Line.svg"} alt="JRFLogo" className="h-20" />
      </div>
    </div>
    </div>
  );
};

export default Footer;