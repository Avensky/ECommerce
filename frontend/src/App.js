import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import Navbar from './components/Navigation/Navbar/Navbar';
import './App.css';

const  App = (props) => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* pages */}
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
