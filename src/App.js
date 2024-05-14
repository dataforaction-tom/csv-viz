import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import LandingPage from './LandingPage';
import Dataviz from './dataviz';
import DataSharingChecklist from './DataSharingChecklist';
import AllData from './AllData';
import Journey from './Journey';
import DataSquad from './DataSquad';
import Footer from './Footer';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="bg-stone-100  ">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/checklist" element={<DataSharingChecklist />} />
          <Route path="/alldata" element={<AllData />} />
          <Route path="/visualise" element={<Dataviz />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/datasquad" element={<DataSquad />} />
          <Route path="/dataviz" element={<Dataviz />} />
        </Routes>
        
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
