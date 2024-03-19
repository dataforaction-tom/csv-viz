import React, { useState } from 'react';
import Form from './Form';
import Charts from './Charts';
import { parse, format, isValid } from 'date-fns';
import AllData from './AllData';


function App() {
  const [parsedData, setParsedData] = useState({ activity: {}, ageRange: {}, gender: {}, location: {}, typeOfInsight: {}, postcode: {}});
  const [showSupabaseData, setShowSupabaseData] = useState(false);

  const processDataForCharts = (data) => {
    console.log("Raw data:", data); // Debugging raw data
  
    const chartsData = {
      activity: {},
      location: {},
      date: {}, 
      activityByLocation: {}, 
      dateByYear: {},
      dateByMonth: {},
      typeOfInsight: {},
      postcode: {},
      ageRange: {}
    };

    const dateFormats = ["dd/MM/yyyy", "dd-MM-yyyy", "d/M/yyyy",
    "MM/dd/yyyy", "MM-dd-yyyy", "M/d/yyyy",
    "yyyy/MM/dd", "yyyy-MM-dd", "yyyy/M/d",
    "dd/MM/yyyy HH:mm:ss", "MM/dd/yyyy hh:mm:ss a", "yyyy-MM-dd'T'HH:mm:ss",]; 
  
    data.forEach((item) => {
      const { activity, 'local_authority': location, 'number_of_people': count, date: dateStr, 'type_of_insight': typeOfInsight, 'age_range': ageRange,  } = item;
      console.log("Date string:", dateStr);
      console.log('ACtivity', activity);

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
        return; 
      }

      console.log(parsedDate);
      
  
      // Aggregate data for activity
      chartsData.activity[activity] = (chartsData.activity[activity] || 0) + parseInt(count, 10);
  
      // Aggregate data for location
      chartsData.location[location] = (chartsData.location[location] || 0) + parseInt(count, 10);

      // Aggregate data for Type of Insight
      chartsData.typeOfInsight[typeOfInsight] = (chartsData.typeOfInsight[typeOfInsight] || 0) + parseInt(count, 10);

      // Aggregate data for Age Range
      chartsData.ageRange[ageRange] = (chartsData.ageRange[ageRange] || 0) + parseInt(count, 10);
  
     // For month aggregation
    const yearMonth = format(parsedDate, "yyyy-MM"); // Extracts YYYY-MM for aggregation
    chartsData.dateByMonth[yearMonth] = (chartsData.dateByMonth[yearMonth] || 0) + parseInt(count, 10);

    // For year aggregation
    const year = format(parsedDate, "yyyy");
    chartsData.dateByYear[year] = (chartsData.dateByYear[year] || 0) + parseInt(count, 10);
  
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
      setParsedData(processedData); 
    } else {
      console.log("No data to process.");
    }
  };

  const handleContributeClicked = () => {
    setShowSupabaseData(true); // Change state to show charts from AllData
  };

  return (
     <div className="App">
        <header className="bg-gray-800 text-white text-center p-4">
          <h1 className="text-xl font-semibold">CSV Chart App</h1>
        </header>

      <Form onDataParsed={handleDataParsed} onContributionComplete={handleContributeClicked} />
      {!showSupabaseData ? <Charts data={parsedData} /> : <AllData />}
    </div>
  );
}

export default App;