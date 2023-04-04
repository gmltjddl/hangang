import React from 'react';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


const HANGANG = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
      </Routes>
    </div >
  );
};

export default HANGANG;
