
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import LandingPage from './LandingPage';
import Dataviz from './Dataviz';
import DataSharingChecklist from './DataSharingChecklist';




function App() {
  

  return (
    <Router>
     <div className="bg-stone-100">
        
        <Header />
        <Routes>
       
            <Route path="/about" element={<Dataviz />} />
            <Route path="/contact" element={<DataSharingChecklist/>} />
          </Routes>
    <div>
    <LandingPage />
    </div>
    </div>
    </Router>
  );
}

export default App;