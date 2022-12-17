import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Shop, Product } from './pages';
//import Navbar from './components/Navigation/Navbar/Navbar';
import './App.css';
import Navigation from './components/Navigation/Navigation';

const  App = (props) => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          {/* pages */}
          <Route path="/"                   element={<Home/>}/>
          <Route path="/home"               element={<Home/>}/>
          <Route path="/shop"               element={<Shop />}/>
          <Route path="/product/:id" exact  element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
