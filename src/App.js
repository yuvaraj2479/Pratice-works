import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dropdown from './Dropdown';
import CreatData from './CreatData';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Dropdown />} />
      <Route exact path="/createdata" element={<CreatData />} />
      </Routes>
    </Router>
  );
}

export default App;