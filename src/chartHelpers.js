// chartHelpers.js

export const activityColors = {
    Housing: 'rgba(248, 96, 177, 1)', // #f860b1
    Energy: 'rgba(157, 193, 49, 1)',  // #9dc131
    Transport: 'rgba(243, 88, 29, 1)', // #f3581d
    Finance: 'rgba(236, 169, 0, 1)', // #eca900
    Education: 'rgba(243, 88, 29, 1)', // #f3581d
    Health: 'rgba(54, 162, 235, 1)', // Custom blue
    Democracy: 'rgba(255, 99, 132, 1)', // Custom red
    CustomBlue: 'rgba(54, 162, 235, 1)', // Custom blue
    CustomRed: 'rgba(255, 99, 132, 1)', // Custom red
  };
  
  const colorScheme = Object.values(activityColors);
  
  export const generateChartData = (labels, datasetLabel, dataPoints, isActivityChart = false) => {
    let backgroundColors;
  
    if (isActivityChart) {
      backgroundColors = labels.map(label => activityColors[label] || 'rgba(128, 128, 128, 0.5)');
    } else {
      backgroundColors = labels.map((_, index) => colorScheme[index % colorScheme.length]);
    }
  
    let borderColors = backgroundColors.map(color => {
      let parts = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d?.\d+)\)/);
      if (parts) {
        return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, 1)`;
      }
      return color;
    });
  
    return {
      labels,
      datasets: [{
        label: datasetLabel,
        data: dataPoints,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      }],
    };
  };
  
  export const aggregateData = (data, field) => {
    return data.reduce((acc, curr) => {
      const key = curr[field];
      const value = parseInt(curr.number_of_people, 10);
      acc[key] = (acc[key] || 0) + value;
      return acc;
    }, {});
  };
  
  export const prepareChartData = (aggregatedData, chartLabel, isActivityChart = false) => {
    const labels = Object.keys(aggregatedData);
    const dataPoints = Object.values(aggregatedData);
  
    return generateChartData(labels, chartLabel, dataPoints, isActivityChart);
  };
  
  export const prepareLineChartData = (aggregatedData, chartLabel) => {
    const labels = Object.keys(aggregatedData).sort();
    const dataPoints = labels.map(label => aggregatedData[label]);
    return {
      labels,
      datasets: [{
        label: chartLabel,
        data: dataPoints,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
  };
  
  export const aggregateDataBySum = (data, categoryField, sumField) => {
    return data.reduce((acc, curr) => {
      const key = curr[categoryField];
      const value = parseInt(curr[sumField], 10);
      acc[key] = (acc[key] || 0) + value;
      return acc;
    }, {});
  };
  