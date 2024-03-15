import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ArcElement
);

const activityColors = {
    Housing: 'rgba(255, 99, 132, 0.5)',
    Energy: 'rgba(54, 162, 235, 0.5)',
    Transport: 'rgba(255, 206, 86, 0.5)',
    Finance: 'rgba(75, 192, 192, 0.5)',
    // Add more activities and their corresponding colors as needed
  };
  

  const Charts = ({ data }) => {
    // Ensure data and its sub-properties are defined
    if (!data || Object.keys(data).length === 0 || !data.activity || !data.location || !data.date || !data.activityByLocation) {
      return <div>No data to display</div>;
    }
  
    // Check for each specific dataset's existence and length
    const hasActivityData = data.activity && Object.keys(data.activity).length > 0;
    const hasLocationData = data.location && Object.keys(data.location).length > 0;
    const hasDateData = data.date && Object.keys(data.date).length > 0;
    const hasActivityByLocationData = data.activityByLocation && Object.keys(data.activityByLocation).length > 0;
  
    // Function to generate a random color
    const generateRandomColor = () => {
      return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`;
    };
  
    const generateChartData = (labels, datasetLabel, dataPoints, isActivityChart = false) => {
      let backgroundColors;
  
      if (isActivityChart) {
        // Map each label to a specific color, defaulting to grey if the activity is not found
        backgroundColors = labels.map(label => activityColors[label] || 'rgba(128, 128, 128, 0.5)');
      } else {
        // For other charts, use a single color for all items by creating an array filled with the same color
        backgroundColors = Array(labels.length).fill('rgba(54, 162, 235, 0.5)');
      }
  
      // Ensure borderColor is also handled correctly as an array
      let borderColors = backgroundColors.map(color => {
        // Assuming the colors are in 'rgba(r, g, b, alpha)' format, increase alpha for border
        let parts = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d?.\d+)\)/);
        if (parts) {
          // Increase the alpha for border color
          return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, 1)`;
        }
        return color; // In case the regex match fails, return the original color
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
  
    const generateChartDataForActivityByLocation = () => {
      const datasets = Object.keys(data.activityByLocation).map(activity => {
        const locationsData = data.activityByLocation[activity];
        return {
          label: activity,
          data: Object.keys(locationsData).map(location => locationsData[location]),
          backgroundColor: activityColors[activity] || generateRandomColor(), // Use predefined or random color
                };
             });
  
      return {
        labels: Object.keys(data.location), // Assuming location names are consistent across activities
        datasets,
      };
    };

    const generatePieChartData = () => {
        const activities = Object.keys(data.activity);
        const counts = Object.values(data.activity);
        const total = counts.reduce((acc, curr) => acc + curr, 0); // Calculate total people involved in all activities
        const backgroundColors = activities.map(activity => activityColors[activity] || generateRandomColor());
    
        return {
          labels: activities,
          datasets: [{
            data: counts.map(count => (count / total) * 100), // Convert counts to percentage of total
            backgroundColor: backgroundColors,
            hoverOffset: 4,
          }],
        };
      };
  
      return (
        <div className="flex flex-wrap justify-center -mx-2">
          {hasActivityData && (
            <div className="w-full md:w-1/2 p-2">
              <h1 className="text-center font-bold">Activity Participation Share</h1>
              <div className="max-w-sm mx-auto">
                <Pie data={generatePieChartData()} />
              </div>
            </div>
          )}
          {hasActivityData && (
            <div className="w-full md:w-1/2 p-2">
              <h1 className="text-center font-bold">Number of People by Activity</h1>
              <Bar data={generateChartData(Object.keys(data.activity), 'Number of People by Activity', Object.values(data.activity), true)} options={{ scales: { y: { beginAtZero: true } } }} />
            </div>
          )}
          {hasLocationData && (
            <div className="w-full md:w-1/2 p-2">
              <h1 className="text-center font-bold">Number of People by Location</h1>
              <Bar data={generateChartData(Object.keys(data.location), 'Number of People by Location', Object.values(data.location))} options={{ scales: { y: { beginAtZero: true } } }} />
            </div>
          )}
          {hasDateData && (
            <div className="w-full md:w-1/2 p-2">
              <h1 className="text-center font-bold">Number of People by Date</h1>
              <Bar data={generateChartData(Object.keys(data.date).sort(), 'Number of People by Date', Object.values(data.date))} options={{ scales: { y: { beginAtZero: true }, x: { type: 'time', time: { unit: 'day' }, title: { display: true, text: 'Date' }, ticks: { source: 'labels' } } } }} />
            </div>
          )}
          {hasActivityByLocationData && (
            <div className="w-full md:w-1/2 p-2">
              <h1 className="text-center font-bold">Number of People by Activity by Location</h1>
              <Bar data={generateChartDataForActivityByLocation()} options={{ scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } } }} />
            </div>
          )}
        </div>
      );
      
    };
  
  export default Charts;