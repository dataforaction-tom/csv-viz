import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
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

const standardColors = Object.values(activityColors);

const generateBorderColor = (backgroundColor) => {
  let parts = backgroundColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d?.\d+)\)/);
  if (parts) {
    return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, 1)`;
  }
  return backgroundColor; // In case the regex match fails, return the original colour
};

const Charts = ({ data }) => {
  if (!data || Object.keys(data).length === 0 || !data.activity || !data.location || !data.date || !data.activityByLocation) {
    return <div></div>;
  }

  const hasActivityData = data.activity && Object.keys(data.activity).length > 0;
  const hasLocationData = data.location && Object.keys(data.location).length > 0;
  const hasDateData = data.date && Object.keys(data.date).length > 0;
  const hasActivityByLocationData = data.activityByLocation && Object.keys(data.activityByLocation).length > 0;
  const hasDateByMonthData = data.dateByMonth && Object.keys(data.dateByMonth).length > 0;
  const hasDateByYearData = data.dateByYear && Object.keys(data.dateByYear).length > 0;
  const hasTypeOfInsightData = data.typeOfInsight && Object.keys(data.typeOfInsight).length > 0;
  const hasAgeRangeData = data.ageRange && Object.keys(data.ageRange).length > 0;

  const generateChartData = (labels, datasetLabel, dataPoints, isActivityChart = false) => {
    let backgroundColors;
    if (isActivityChart) {
      backgroundColors = labels.map(label => activityColors[label] || 'rgba(128, 128, 128, 0.5)');
    } else {
      backgroundColors = standardColors.slice(0, labels.length);
    }

    const borderColors = backgroundColors.map(color => generateBorderColor(color));

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
    const datasets = Object.keys(data.activityByLocation).map((activity, index) => {
      const locationsData = data.activityByLocation[activity];
      return {
        label: activity,
        data: Object.keys(locationsData).map(location => locationsData[location]),
        backgroundColor: activityColors[activity] || standardColors[index % standardColors.length],
        borderColor: generateBorderColor(activityColors[activity] || standardColors[index % standardColors.length]),
        borderWidth: 1,
      };
    });

    return {
      labels: Object.keys(data.location),
      datasets,
    };
  };

  const generateChartDataForDate = () => {
    const labels = Object.keys(data.date).sort();
    const dataPoints = labels.map(label => data.date[label]);

    return {
      labels,
      datasets: [{
        label: 'Number of People by Month',
        data: dataPoints,
        backgroundColor: activityColors.CustomBlue,
        borderColor: generateBorderColor(activityColors.CustomBlue),
        borderWidth: 1,
      }],
    };
  };

  const generatePieChartData = () => {
    const activities = Object.keys(data.activity);
    const counts = Object.values(data.activity);
    const total = counts.reduce((acc, curr) => acc + curr, 0);
    const backgroundColors = activities.map((activity, index) => activityColors[activity] || standardColors[index % standardColors.length]);

    return {
      labels: activities,
      datasets: [{
        data: counts.map(count => (count / total) * 100),
        backgroundColor: backgroundColors,
        hoverOffset: 4,
      }],
    };
  };

  const generateChartDataForDateByMonth = () => {
    const labels = Object.keys(data.dateByMonth).sort();
    const dataPoints = labels.map(label => data.dateByMonth[label]);

    return {
      labels,
      datasets: [{
        label: 'Number of People by Month',
        data: dataPoints,
        backgroundColor: activityColors.CustomBlue,
        borderColor: generateBorderColor(activityColors.CustomBlue),
        borderWidth: 1,
      }],
    };
  };

  const generateChartDataForDateByYear = () => {
    const labels = Object.keys(data.dateByYear).sort();
    const dataPoints = labels.map(label => data.dateByYear[label]);

    return {
      labels,
      datasets: [{
        label: 'Number of People by Year',
        data: dataPoints,
        backgroundColor: activityColors.CustomRed,
        borderColor: generateBorderColor(activityColors.CustomRed),
        borderWidth: 1,
      }],
    };
  };

  const generateChartDataForTypeOfInsight = () => {
    const labels = Object.keys(data.typeOfInsight).sort();
    const dataPoints = labels.map(label => data.typeOfInsight[label]);
    const backgroundColors = labels.map((_, index) => standardColors[index % standardColors.length]);

    return {
      labels,
      datasets: [{
        label: 'Type of Insight',
        data: dataPoints,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace(/0.5\)$/, "1)")),
        borderWidth: 1,
      }],
    };
  };

  const generateChartDataForAgeRange = () => {
    const labels = Object.keys(data.ageRange).sort();
    const dataPoints = labels.map(label => data.ageRange[label]);
    const backgroundColors = labels.map((_, index) => standardColors[index % standardColors.length]);

    return {
      labels,
      datasets: [{
        label: 'Age Range',
        data: dataPoints,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace(/0.5\)$/, "1)")),
        borderWidth: 1,
      }],
    };
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center pb-8 pt-8 bg-gray-800 text-white">Visualising only your data</h1>
      <div className="flex flex-wrap justify-center -mx-2">
        {hasActivityData && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Activity Participation Share</h1>
            <div className="max-w-sm mx-auto">
              <Pie data={generatePieChartData()} />
            </div>
          </div>
        )}
        {hasDateByMonthData && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Number of People by Month</h1>
            <Bar data={generateChartDataForDateByMonth()} options={{ scales: { y: { beginAtZero: true } } }} />
          </div>
        )}
        {hasDateByYearData && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Number of People by Year</h1>
            <Bar data={generateChartDataForDateByYear()} options={{ scales: { y: { beginAtZero: true } } }} />
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
        {hasTypeOfInsightData && (
          <div className="w-full md:w-1/2 p-2">
            <h2>Type of Insight</h2>
            <Bar data={generateChartDataForTypeOfInsight()} options={{ scales: { y: { beginAtZero: true } } }} />
          </div>
        )}
        {hasAgeRangeData && (
          <div className="w-full md:w-1/2 p-2">
            <h2>Age Range</h2>
            <Bar data={generateChartDataForAgeRange()} options={{ scales: { y: { beginAtZero: true } } }} />
          </div>
        )}
        {hasDateData && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Number of People by Month</h1>
            <Bar data={generateChartDataForDate()} options={{
              scales: {
                y: { beginAtZero: true },
                x: {
                  type: 'category',
                  title: { display: true, text: 'Month' }
                }
              }
            }} />
          </div>
        )}
        {hasActivityByLocationData && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Number of People by Activity by Location</h1>
            <Bar data={generateChartDataForActivityByLocation()} options={{ scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } } }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
