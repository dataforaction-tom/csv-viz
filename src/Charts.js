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

const colorScheme = Object.values(activityColors);

const Charts = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const processDataForCharts = (data) => {
    const chartsData = {
      activity: {},
      location: {},
      date: {},
      activityByLocation: {},
      dateByYear: {},
      dateByMonth: {},
      typeOfInsight: {},
      ageRange: {},
    };

    data.forEach((item) => {
      const { activity, local_authority: location, number_of_people: count, date: dateStr, type_of_insight: typeOfInsight, age_range: ageRange } = item;

      chartsData.activity[activity] = (chartsData.activity[activity] || 0) + count;
      chartsData.location[location] = (chartsData.location[location] || 0) + count;

      const yearMonth = dateStr.slice(0, 7); // Extract YYYY-MM
      chartsData.dateByMonth[yearMonth] = (chartsData.dateByMonth[yearMonth] || 0) + count;

      const year = dateStr.slice(0, 4); // Extract YYYY
      chartsData.dateByYear[year] = (chartsData.dateByYear[year] || 0) + count;

      chartsData.typeOfInsight[typeOfInsight] = (chartsData.typeOfInsight[typeOfInsight] || 0) + count;
      chartsData.ageRange[ageRange] = (chartsData.ageRange[ageRange] || 0) + count;

      if (!chartsData.activityByLocation[activity]) {
        chartsData.activityByLocation[activity] = {};
      }
      chartsData.activityByLocation[activity][location] = (chartsData.activityByLocation[activity][location] || 0) + count;
    });

    return chartsData;
  };

  const chartsData = processDataForCharts(data);

  const generateChartData = (labels, datasetLabel, dataPoints, isActivityChart = false) => {
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

  const generatePieChartData = () => {
    const activities = Object.keys(chartsData.activity);
    const counts = Object.values(chartsData.activity);
    const total = counts.reduce((acc, curr) => acc + curr, 0);
    const backgroundColors = activities.map(activity => activityColors[activity] || 'rgba(128, 128, 128, 0.5)');

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
    const labels = Object.keys(chartsData.dateByMonth).sort();
    const dataPoints = labels.map(label => chartsData.dateByMonth[label]);

    return generateChartData(labels, 'Number of People by Month', dataPoints);
  };

  const generateChartDataForDateByYear = () => {
    const labels = Object.keys(chartsData.dateByYear).sort();
    const dataPoints = labels.map(label => chartsData.dateByYear[label]);

    return generateChartData(labels, 'Number of People by Year', dataPoints);
  };

  const generateChartDataForTypeOfInsight = () => {
    const labels = Object.keys(chartsData.typeOfInsight).sort();
    const dataPoints = labels.map(label => chartsData.typeOfInsight[label]);

    return generateChartData(labels, 'Type of Insight', dataPoints);
  };

  const generateChartDataForAgeRange = () => {
    const labels = Object.keys(chartsData.ageRange).sort();
    const dataPoints = labels.map(label => chartsData.ageRange[label]);

    return generateChartData(labels, 'Age Range', dataPoints);
  };

  const generateChartDataForActivityByLocation = () => {
    const datasets = Object.keys(chartsData.activityByLocation).map(activity => {
      const locationsData = chartsData.activityByLocation[activity];
      return {
        label: activity,
        data: Object.keys(locationsData).map(location => locationsData[location]),
        backgroundColor: activityColors[activity] || 'rgba(128, 128, 128, 0.5)',
      };
    });

    return {
      labels: Object.keys(chartsData.location),
      datasets,
    };
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center pb-8 pt-8 bg-gray-800 text-white">Visualising your data</h1>
      <div className="flex flex-wrap justify-center -mx-2">
        {Object.keys(chartsData.activity).length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Activity Participation Share</h1>
            <div className="max-w-sm mx-auto">
              <Pie data={generatePieChartData()} />
            </div>
          </div>
        )}
        {Object.keys(chartsData.dateByMonth).length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Number of People by Month</h1>
            <Bar data={generateChartDataForDateByMonth()} options={{ scales: { y: { beginAtZero: true } } }} />
          </div>
        )}
        {Object.keys(chartsData.dateByYear).length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Number of People by Year</h1>
            <Bar data={generateChartDataForDateByYear()} options={{ scales: { y: { beginAtZero: true } } }} />
          </div>
        )}
        {Object.keys(chartsData.activity).length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Number of People by Activity</h1>
            <Bar data={generateChartData(Object.keys(chartsData.activity), 'Number of People by Activity', Object.values(chartsData.activity), true)} options={{ scales: { y: { beginAtZero: true } } }} />
          </div>
        )}
        {Object.keys(chartsData.location).length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Number of People by Location</h1>
            <Bar data={generateChartData(Object.keys(chartsData.location), 'Number of People by Location', Object.values(chartsData.location))} options={{ scales: { y: { beginAtZero: true } } }} />
          </div>
        )}
        {Object.keys(chartsData.typeOfInsight).length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h2>Type of Insight</h2>
            <Bar data={generateChartDataForTypeOfInsight()} options={{ scales: { y: { beginAtZero: true } }}} />
          </div>
        )}
        {Object.keys(chartsData.ageRange).length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h2>Age Range</h2>
            <Bar data={generateChartDataForAgeRange()} options={{ scales: { y: { beginAtZero: true } }}} />
          </div>
        )}
        {Object.keys(chartsData.activityByLocation).length > 0 && (
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
