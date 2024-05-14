import React from 'react';




const LandingPage = () => {
  return (
    <div className="">
      
      <div className="flex flex-col items-center">
      
        <div className="w-full flex justify-center">
        <div className='w-1/5 text-center my-5 py-5'><h1 className='font-bold text-2xl'>This is a prototype journey, showcasing a series of prototypes related to the Charity Data Works project. </h1>
        <p className='font-base text-xl text-justify my-2 py-2'>You can read the full context of our work and where this prototype came from on our notion site <a href='https://dataforaction.notion.site/Prototyping-insight-infrastructure-for-the-charity-sector-b53e4b066c2440f6b91f1ad0f334fc8c' title="Data For Action Charity Data Works Project" className="text-pink-500 font-bold" rel="noreferrer" target="_blank">here.</a> <br></br><br></br> JRF partnered with Data for Action to investigate what it would take for data collected by charities to become an accessible and usable asset, for the sector first and foremost, and for it to inform proactive service provision and grant-making; create the conditions for data-driven, evidence-led decision making; and shed a light on the crucial and extensive contribution, often taken for granted or unaccounted for even, charitable organisations make to the lives of those excluded, left behind, and society overall.
        <br></br> <br></br>
        You can explore our prototypes and concepts through the navigation buttons at the bottom of the screen or the navigation buttons at the top of the screen. 
        
        </p></div>
        <p className=''> </p>
        <div className='w-3/4 flex justify-center align-center'>
          <img
            src={process.env.PUBLIC_URL + "/Datasharingjourneyv2.png"}
            alt="Data Sharing Movement"
            style={{ maxWidth: '90%', maxHeight: '60vh' }}
            className="object-contain"
          />
          </div>
        </div>
        
        <p>All </p>
      </div>
      
   
      
    
        
        
      </div>
    

  );
};

export default LandingPage;
