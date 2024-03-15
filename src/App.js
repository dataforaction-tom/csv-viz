import React, { useState } from 'react';
import Form from './Form';
import Charts from './Charts';

function App() {
  const [parsedData, setParsedData] = useState({ activity: {}, ageRange: {}, gender: {}, location: {} });

  const processDataForCharts = (data) => {
    console.log("Raw data:", data); // Debugging raw data
  
    const chartsData = {
      activity: {},
      location: {},
      date: {},
      activityByLocation: {}, // New structure for activity by location
    };
  
    data.forEach((item) => {
      const { Activity: activity, 'Local authority Name': location, 'Number of people': count, Date: date } = item;
  
      // Aggregate data for activity
      chartsData.activity[activity] = (chartsData.activity[activity] || 0) + parseInt(count, 10);
  
      // Aggregate data for location
      chartsData.location[location] = (chartsData.location[location] || 0) + parseInt(count, 10);
  
      // Convert date to YYYY-MM-DD format for consistency
      const formattedDate = date.split('/').reverse().join('-');
      chartsData.date[formattedDate] = (chartsData.date[formattedDate] || 0) + parseInt(count, 10);
  
      // Aggregate data for activity by location
      if (!chartsData.activityByLocation[activity]) {
        chartsData.activityByLocation[activity] = {};
      }
      chartsData.activityByLocation[activity][location] = (chartsData.activityByLocation[activity][location] || 0) + parseInt(count, 10);
    });
  
    console.log("Processed data:", chartsData); // Debugging processed data
    return chartsData;
  };
  
  

  const handleDataParsed = (data) => {
    if (data && data.length > 0) {
      const processedData = processDataForCharts(data);
      setParsedData(processedData); // This line uses the processedData
    } else {
      console.log("No data to process.");
    }
  };

  return (
     <div className="App">
        <header className="bg-gray-800 text-white text-center p-4">
          <h1 className="text-xl font-semibold">CSV Chart App</h1>
        </header>

      <Form onDataParsed={handleDataParsed} />
      <Charts data={parsedData}  />
    </div>
  );
}

export default App;
