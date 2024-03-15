// src/Form.js
import React, { useState } from 'react';
import Papa from 'papaparse';

const Form = ({ onDataParsed }) => {
  const [file, setFile] = useState(null);
  const [organisationName, setOrganisationName] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleOrganisationChange = (event) => {
    setOrganisationName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file before submitting.');
      return;
    }

    Papa.parse(file, {
      complete: function (results) {
        console.log('Organisation Name:', organisationName);
        console.log('File parsed:', results.data);
        onDataParsed(results.data);
      },
      header: true,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organisation-name">
              Organisation Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="organisation-name"
              type="text"
              placeholder="Organisation Name"
              value={organisationName}
              onChange={handleOrganisationChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="csv-upload">
              Upload CSV
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              id="csv-upload"
              type="file"
              onChange={handleFileChange}
              accept=".csv"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
