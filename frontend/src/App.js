import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import './App.css';

const  App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* pages */}
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
