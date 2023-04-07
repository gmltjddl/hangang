import React from 'react';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import Mypage from './pages/Mypage';
import Infomodal from './component/Modal/Infomodal';
import Intromodal from './component/Modal/Intromodal';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


const HANGANG = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Infomodal" element={<Infomodal />} />
        <Route path="/Intromodal" element={<Intromodal />} />
      </Routes>
    </div >
  );
};

export default HANGANG;