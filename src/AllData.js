import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { parseISO, format } from 'date-fns';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { supabase } from './supabaseClient'; // Ensure this path is correct

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement, LineElement);

const AllData = () => {
  const [activityPieChartData, setActivityPieChartData] = useState({ labels: [], datasets: [] });
  const [typeOfInsightChartData, setTypeOfInsightChartData] = useState({ labels: [], datasets: [] });
  const [ageRangeChartData, setAgeRangeChartData] = useState({ labels: [], datasets: [] });
  const [peoplePerMonthChartData, setPeoplePerMonthChartData] = useState({ labels: [], datasets: [] });
  const [peoplePerYearChartData, setPeoplePerYearChartData] = useState({ labels: [], datasets: [] });


  useEffect(() => {
    const fetchDataAndAggregate = async () => {
      let { data, error } = await supabase
        .from('main_data')
        .select('activity, number_of_people, type_of_insight, age_range, date');

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      // Aggregating data for each category
      const activityData = aggregateData(data, 'activity');
      const typeOfInsightData = aggregateData(data, 'type_of_insight');
      const ageRangeData = aggregateData(data, 'age_range');
      const monthData = {};
      const yearData = {};
        data.forEach(item => {
            const date = parseISO(item.date);
            const monthKey = format(date, 'MMM yyyy');
            const yearKey = format(date, 'yyyy');
            monthData[monthKey] = (monthData[monthKey] || 0) + parseInt(item.number_of_people, 10);
            yearData[yearKey] = (yearData[yearKey] || 0) + parseInt(item.number_of_people, 10);
            });


      // Preparing and setting chart data
      setActivityPieChartData(preparePieChartData(activityData, 'Activity Share'));
      setTypeOfInsightChartData(prepareChartData(typeOfInsightData, 'Number of People by Type of Insight'));
      setAgeRangeChartData(prepareChartData(ageRangeData, 'Number of People by Age Range'));
      setPeoplePerMonthChartData(prepareLineChartData(monthData, 'Number of People per Month'));
      setPeoplePerYearChartData(prepareLineChartData(yearData, 'Number of People per Year'));
    };

    fetchDataAndAggregate();
  }, []);

  return (
    <div className="flex flex-wrap justify-center -mx-2">
      {activityPieChartData.labels.length > 0 && (
        <div className="w-full md:w-1/2 p-2">
          <h1 className="text-center font-bold">Activity Participation Share</h1>
          <div className="max-w-sm mx-auto">
            <Pie data={activityPieChartData} />
          </div>
        </div>
      )}

      

      {ageRangeChartData.labels.length > 0 && (
        <div className="w-full md:w-1/2 p-2">
          <h1 className="text-center font-bold">Age Range</h1>
          <div className="w-full">
            <Bar data={ageRangeChartData} options={{ scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>
      )}
      {typeOfInsightChartData.labels.length > 0 && (
        <div className="w-full md:w-1/2 p-2">
          <h1 className="text-center font-bold">Type of Insight</h1>
          <div className="w-full">
            <Bar data={typeOfInsightChartData} options={{responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>
      )}
      {peoplePerMonthChartData.labels.length > 0 && (
  <div className="w-full md:w-1/2 p-2">
    <h1 className="text-center font-bold">Number of People per Month</h1>
    <div className="w-full">
      <Line data={peoplePerMonthChartData} options={{ scales: { y: { beginAtZero: true } }}} />
    </div>
  </div>
)}

{peoplePerYearChartData.labels.length > 0 && (
  <div className="w-full md:w-1/2 p-2">
    <h1 className="text-center font-bold">Number of People per Year</h1>
    <div className="w-full">
      <Line data={peoplePerYearChartData} options={{ scales: { y: { beginAtZero: true } }}} />
    </div>
  </div>
)}
    </div>
  );
};

function aggregateData(data, field) {
  return data.reduce((acc, curr) => {
    const key = curr[field];
    const value = parseInt(curr.number_of_people, 10);
    acc[key] = (acc[key] || 0) + value;
    return acc;
  }, {});
}

function prepareChartData(aggregatedData, chartLabel) {
  const labels = Object.keys(aggregatedData);
  const dataPoints = Object.values(aggregatedData);
  const backgroundColors = labels.map(() => getRandomColor());
  
  return {
    labels,
    datasets: [{
      label: chartLabel,
      data: dataPoints,
      backgroundColor: backgroundColors,
      borderColor: backgroundColors.map(color => color.replace(/0.5\)$/, "1)")),
      borderWidth: 1,
    }],
  };
}

function preparePieChartData(aggregatedData, chartLabel) {
  return prepareChartData(aggregatedData, chartLabel); // Pie chart data preparation is the same
}

function prepareLineChartData(aggregatedData, chartLabel) {
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
  }

function getRandomColor() {
  return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`;
}

export default AllData;
