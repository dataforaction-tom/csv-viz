import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { supabase } from './supabaseClient'; 
import { format, parseISO } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { activityColors, prepareChartData, prepareLineChartData, aggregateData, aggregateDataBySum } from './chartHelpers';
import DataTable from './DataTable';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const AllData = () => {
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [chartsData, setChartsData] = useState({
    activityPieChartData: { labels: [], datasets: [] },
    typeOfInsightChartData: { labels: [], datasets: [] },
    ageRangeChartData: { labels: [], datasets: [] },
    peoplePerMonthChartData: { labels: [], datasets: [] },
    peoplePerYearChartData: { labels: [], datasets: [] },
    localAuthorityData: { labels: [], datasets: [] },
    peopleByLocalAuthorityData: { labels: [], datasets: [] },
  });

  const processAndSetChartData = (data) => {
    const activityData = aggregateData(data, 'activity');
    const typeOfInsightData = aggregateData(data, 'type_of_insight');
    const ageRangeData = aggregateData(data, 'age_range');
    const localAuthorityAggregated = aggregateData(data, 'local_authority');
    const peopleByLocalAuthorityAggregated = aggregateDataBySum(data, 'local_authority', 'number_of_people');

    const monthData = {};
    const yearData = {};
    data.forEach(item => {
      const date = parseISO(item.date);
      const monthKey = format(date, 'MMM yyyy');
      const yearKey = format(date, 'yyyy');
      monthData[monthKey] = (monthData[monthKey] || 0) + parseInt(item.number_of_people, 10);
      yearData[yearKey] = (yearData[yearKey] || 0) + parseInt(item.number_of_people, 10);
    });

    setChartsData({
      activityPieChartData: prepareChartData(activityData, 'Activity Share', true),
      typeOfInsightChartData: prepareChartData(typeOfInsightData, 'Number of People by Type of Insight'),
      ageRangeChartData: prepareChartData(ageRangeData, 'Number of People by Age Range'),
      peoplePerMonthChartData: prepareLineChartData(monthData, 'Number of People per Month'),
      peoplePerYearChartData: prepareChartData(yearData, 'Number of People per Year'),
      localAuthorityData: prepareChartData(localAuthorityAggregated, 'Local Authority Count'),
      peopleByLocalAuthorityData: prepareChartData(peopleByLocalAuthorityAggregated, 'Number of People by Local Authority'),
    });
  };

  useEffect(() => {
    const fetchDataAndAggregate = async () => {
      let { data, error } = await supabase
        .from('main_data')
        .select('activity, number_of_people, type_of_insight, age_range, date, local_authority');

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      setRawData(data);
      setFilteredData(data);
      processAndSetChartData(data);
    };

    fetchDataAndAggregate();
  }, []);

  useEffect(() => {
    processAndSetChartData(filteredData);
  }, [filteredData]);

  return (
    <div>
      <div className='text-center bg-gray-800 text-white'>
        <p className="text-xl font-semibold">
          Please note, all data in here is currently dummy data for testing purposes. 
          <br />
          You can read the full context of our work and where this prototype came from on our notion site  
          <a href='https://dataforaction.notion.site/Prototyping-insight-infrastructure-for-the-charity-sector-b53e4b066c2440f6b91f1ad0f334fc8c' title="Data For Action Charity Data Works Project" className="text-pink-500 font-bold" rel="noreferrer" target="_blank">here.</a>
        </p>
        <h1 className="text-3xl font-semibold text-center pb-8 pt-8 bg-gray-800 text-white">Visualising data from all contributors</h1>
      </div>
      <div className="flex flex-wrap justify-center -mx-2">
        {chartsData.activityPieChartData.labels.length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Activity Participation Share</h1>
            <div className="max-w-sm mx-auto">
              <Pie data={chartsData.activityPieChartData} />
            </div>
          </div>
        )}
        {chartsData.ageRangeChartData.labels.length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Age Range</h1>
            <div className="w-full">
              <Bar data={chartsData.ageRangeChartData} options={{ scales: { y: { beginAtZero: true } } }} />
            </div>
          </div>
        )}
        {chartsData.typeOfInsightChartData.labels.length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Type of Insight</h1>
            <div className="w-full h--2">
              <Bar data={chartsData.typeOfInsightChartData} options={{ indexAxis: 'y', scales: { y: { beginAtZero: true } } }} />
            </div>
          </div>
        )}
        {chartsData.peoplePerMonthChartData.labels.length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Number of People per Month</h1>
            <div className="w-full">
              <Line data={chartsData.peoplePerMonthChartData} options={{ scales: { y: { beginAtZero: true } }}} />
            </div>
          </div>
        )}
        {chartsData.peoplePerYearChartData.labels.length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Number of People per Year</h1>
            <div className="w-full">
              <Bar data={chartsData.peoplePerYearChartData} options={{ scales: { y: { beginAtZero: true } }}} />
            </div>
          </div>
        )}
        {chartsData.localAuthorityData.labels.length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Local Authority Count</h1>
            <div className="w-full">
              <Bar data={chartsData.localAuthorityData} options={{ scales: { y: { beginAtZero: true } }}} />
            </div>
          </div>
        )}
        {chartsData.peopleByLocalAuthorityData.labels.length > 0 && (
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-center font-bold">Number of People by Local Authority</h1>
            <div className="w-full">
              <Bar data={chartsData.peopleByLocalAuthorityData} options={{ scales: { y: { beginAtZero: true } }}} />
            </div>
          </div>
        )}
      </div>
      <DataTable
        data={rawData}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        setFilteredData={setFilteredData}
      />
    </div>
  );
};

export default AllData;
