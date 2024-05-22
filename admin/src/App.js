import React from 'react';
import { HashRouter as Router, Route, Routes  } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
import Aside from './layout/Aside';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Aside />} />
      </Routes>
    </Router>
  );
};

export default App;
