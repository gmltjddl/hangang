import React from 'react';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import Mypage from './pages/Mypage';
import Gallery from './pages/Gallery';
import Reservation from './pages/Reservation';



import { BrowserRouter, Route, Routes } from 'react-router-dom';


const HANGANG = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Reservation" element={<Reservation />} />
      </Routes>
    </div >
  );
};

export default HANGANG;