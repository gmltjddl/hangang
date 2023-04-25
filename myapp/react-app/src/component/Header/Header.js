import React, {useState, useEffect,useContext} from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import './css/Header.css';

 axios.defaults.withCredentials = true;

  function Header({image, nickName}) {
  
    console.log(image);

  const logout = function handleLogout() {
    axios("http://localhost:8080/web/auth/logout")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        result.status = "failure";
        window.location.reload();
      })
      .catch((exception) => {
        // console.log(exception);
      });
  }

  return (
    
    <div>
    <header>
      <nav>
        <ul>
          <li><Link to="/" >HANGANG</Link></li>
          <li><Link to="/Festival" className="fes">FESTIVAL</Link></li>
          <li><Link to="/Gallery" className="gallerymain">GALLERY</Link></li>
          <li><a href="#" id="hotplace-dropdown" className="hot">HOTPLACE</a>
            <ul id="hotplace-menu">
              <li><a href="#">Restaurant</a></li>
              <li><a href="#">Sights</a></li>
              <li><a href="#">Parking</a></li>
            </ul>
          </li>
          <li><Link to="/Reservation" className="reservation">RESERVATION</Link></li>
          <li><Link to="" className="qna">Q&amp;A</Link></li>
          <li><Link to="/Login" className="login" id="login">LOGIN</Link></li>
          <li><Link to="/Mypage" className="mypage" id="mypage">MYPAGE</Link></li>
          <li> <img src={image} id="main-profile-img" className="main-profile-img"></img></li>
          <li className="logout" id="logout" onClick={() => { logout(); return false; }}>
            <span className="logout-span">{nickName}&nbsp;로그아웃</span>
          </li>
 
        </ul>
      </nav>
    </header>
  </div>
)
}


export default Header