import React, { useState } from 'react';
import Form from './Form';
import Charts from './Charts';
import { parse, format, isValid } from 'date-fns';

function App() {
  const [parsedData, setParsedData] = useState({ activity: {}, ageRange: {}, gender: {}, location: {} });

  const processDataForCharts = (data) => {
    console.log("Raw data:", data); // Debugging raw data
  
    const chartsData = {
      activity: {},
      location: {},
      date: {}, // This will now aggregate by month
      activityByLocation: {}, // New structure for activity by location
      dateByYear: {},
      dateByMonth: {},
    };

    const dateFormats = ["dd-MM-yyyy", "yyyy-MM-dd", "MM/dd/yyyy"]; // Add more formats as necessary
  
    data.forEach((item) => {
      const { Activity: activity, 'Local authority Name': location, 'Number of people': count, Date: dateStr } = item;
      console.log("Date string:", dateStr);

      let parsedDate;
      let isValidDate = false;
      for (const dateFormat of dateFormats) {
        parsedDate = parse(dateStr, dateFormat, new Date());
        if (isValid(parsedDate)) {
          isValidDate = true;
          break; // Break the loop if a valid date is found
        }
      }

      if (!isValidDate) {
        console.error('Invalid date format for:', dateStr);
        return; // Skip this item or handle invalid date as necessary
      }

      console.log(parsedDate);
      
  
      // Aggregate data for activity
      chartsData.activity[activity] = (chartsData.activity[activity] || 0) + parseInt(count, 10);
  
      // Aggregate data for location
      chartsData.location[location] = (chartsData.location[location] || 0) + parseInt(count, 10);
  
     // For month aggregation
    const yearMonth = format(parsedDate, "yyyy-MM"); // Extracts YYYY-MM for aggregation
    chartsData.dateByMonth[yearMonth] = (chartsData.dateByMonth[yearMonth] || 0) + parseInt(count, 10);

    // For year aggregation
    const year = format(parsedDate, "yyyy");
    chartsData.dateByYear[year] = (chartsData.dateByYear[year] || 0) + parseInt(count, 10);
  
      // Aggregate data for activity by location (no change needed here)
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
