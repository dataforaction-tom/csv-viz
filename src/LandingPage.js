import React from 'react';






const LandingPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-4/5 my-5 py-5 text-center">
        <h1 className="font-bold text-2xl mb-4 text-left">This is a prototype journey, showcasing a series of prototypes related to the Charity Data Works project.</h1>
        <p className="font-base text-xl text-left mb-6">
          You can read the full context of our work and where this prototype came from on our Notion site <a href="https://dataforaction.notion.site/Prototyping-insight-infrastructure-for-the-charity-sector-b53e4b066c2440f6b91f1ad0f334fc8c" title="Data For Action Charity Data Works Project" className="text-pink-500 font-bold" rel="noreferrer" target="_blank">here.</a> 
          <br /><br /> JRF partnered with Data for Action to investigate what it would take for data collected by charities to become an accessible and usable asset, for the sector first and foremost, and for it to inform proactive service provision and grant-making. This is with a view to creating the conditions for data-driven, evidence-led decision making. The intention is also to shed a light on the crucial and extensive contribution charitable organisations make to the lives of those excluded and left behind, as well as society in general, which is often taken for granted or unaccounted for.
          <br /><br />
          You can explore our prototypes and concepts through the navigation buttons at the bottom of the screen or the navigation buttons at the top of the screen. 
        </p>
        <div className="flex justify-center items-center">
          <img
            src={process.env.PUBLIC_URL + "/Datasharingjourneyv2.png"}
            alt="Data Sharing Movement"
            className="object-contain max-w-full max-h-60vh"
          />
        </div>
      </div>
    </div>
   
  );
};

export default LandingPage;

