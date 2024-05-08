
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import LandingPage from './LandingPage';
import Dataviz from './Dataviz';
import DataSharingChecklist from './DataSharingChecklist';
import AllData from './AllData';
import Journey from './Journey'; // Ensure this component exists
import DataSquad from './DataSquad'; // Ensure this component exists

function App() {
  return (
    <Router>
      <div className="bg-stone-100">
        <Header />
        
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path="/csv-viz/checklist" element={<DataSharingChecklist />} />
          <Route path="/csv-viz/alldata" element={<AllData />} />
          <Route path="/csv-viz/visualise" element={<Dataviz />} />
          <Route path="/csv-viz/journey" element={<Journey />} />
          <Route path="/csv-viz/datasquad" element={<DataSquad />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
