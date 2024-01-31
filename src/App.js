import './App.css';
import Login from './Components/Login/Login';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Components/Main/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome"  element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
