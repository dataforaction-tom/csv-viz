import React from 'react';

const DataSquad = () => {
  return (
    <div className="flex flex-col items-center p-4 md:p-10 bg-white ">
      <div className="w-full md:w-4/5 lg:w-3/5">
       
        <div className="text-left my-6">
          <h1 className='text-3xl font-bold mb-4 text-pink-500'>Data Squad Concept</h1>
          <h2 className="text-2xl font-bold mb-4">For many real and valid reasons - technical, cultural, resourcing and risk - charities and civil society organisations find it hard to share their data publicly in a way that works for them.</h2>
          <p className="text-xl text-justify mb-4">
            Given the societal value of their work (and, therefore, their data) in identifying and responding to opportunities or challenges ‘on the ground’, this represents a missed opportunity.
          </p>
          <p className="text-xl text-justify mb-4">
            Now imagine you could connect into a <a href="https://docs.google.com/document/d/1imQo0q4PIWww7LmvBv3nhVM2nnLmxSsOhgNnWAyoaQc/edit" className="text-pink-500 font-bold" target="_blank" rel="noopener noreferrer">Data Squad</a>
          </p>
          <p className="text-xl text-justify mb-4">
            There are several specific functions and infrastructure the ‘data squad’ could enable. We think the ‘data squad’ of this form should:
          </p>
          <ul className="list-disc list-inside text-left mb-6 text-xl">
            <li>Bring together support capacity from across the ecosystem in relation to data sharing</li>
            <li>Offer a fundable, fluid vehicle for delivering targeted support to enable data sharing</li>
            <li>Collate and refine tried and tested tools/approaches for the commons that support people to go on a data sharing journey</li>
            <li>Support a diagnostic function for organisations to establish where they are on their data sharing journey at any given time</li>
            <li>Connect identified, specific needs to relevant - and available - expertise in an accessible way that moves or nudges people along their data sharing journey</li>
            <li>Connect expertise and the organisation to other people or approaches that have worked on this need in the past</li>
            <li>Provide a platform for paid work to those providing support</li>
          </ul>
          <p className="text-xl text-justify mb-4">
            And imagine that all this was tailored through checklists and as part of a wider shared movement.
          </p>
          <p className="font-base text-xl text-left mb-6">
          You can read the full context of our work and where this concept came from on our Notion site <a href="https://dataforaction.notion.site/Prototyping-insight-infrastructure-for-the-charity-sector-b53e4b066c2440f6b91f1ad0f334fc8c" title="Data For Action Charity Data Works Project" className="text-pink-500 font-bold" rel="noreferrer" target="_blank">here.</a></p>
        </div>
      </div>
    </div>
  );
};

export default DataSquad;
