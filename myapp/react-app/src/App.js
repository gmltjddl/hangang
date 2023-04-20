import React, { useState, useEffect } from 'react';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import Mypage from './pages/Mypage';
import Gallery from './pages/Gallery';
import Reservation from './pages/Reservation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Usercontext, { initialUser } from './Usercontext';
import axios from "axios";

const HANGANG = () => {
  const [user, setUser] = useState(initialUser);

  // fetchData 함수에서 전역 상태를 업데이트하세요
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/web/auth/user");
      const result = response.data;
      // console.log(response.data.data);
      if (result.status === "success") {
        
        setUser({
          no:result.data.no,
          name:result.data.name,
          email:result.data.email,
          nickName: result.data.nickName,
          tel:result.data.tel,
          hobby:result.data.hobby,
          introduce:result.data.introduce,
          interest:result.data.interest,
          createdDate:result.data.createdDate,
          loggedIn: true
        });
      } else {
        setUser(initialUser);
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Usercontext.Provider value={user}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Gallery" element={<Gallery /> } />
        <Route path="/Reservation" element={<Reservation />} />
      </Routes>
    </Usercontext.Provider>
  );
};

export default HANGANG;