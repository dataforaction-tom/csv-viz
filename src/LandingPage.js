import React from 'react';




const LandingPage = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center">
        {/* Image Container */}
        <div className="w-full flex justify-center">
          <img
            src={process.env.PUBLIC_URL + "/Datasharingjourneyv2.png"}
            alt="Data Sharing Movement"
            style={{ maxWidth: '90%', maxHeight: '60vh' }}
            className="object-contain"
          />
        </div>
      </div>
      
   
      
    
        
        
      </div>
    

  );
};

export default LandingPage;
