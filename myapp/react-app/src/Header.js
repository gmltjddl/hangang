import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import axios from "axios";
import Cookies from 'js-cookie';
 axios.defaults.withCredentials = true;

 function Header() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/web/auth/user");
      const result = response.data;
      if (result.status === "success") {
        setData(result.data.nickName);
        console.log(result.data);

        // let login = document.getElementById("login");
        // login.style.display = "none";
        // let logout = document.getElementById("logout");
        // logout.style.display = "";
        // let mypage = document.getElementById("mypage");
        // mypage.style.display = "";
      } else {
        // let login = document.getElementById("login");
        // login.style.display = "";
        // let logout = document.getElementById("logout");
        // logout.style.display = "none";
        // let mypage = document.getElementById("mypage");
        // mypage.style.display = "none";
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchData();

    // Start polling every 5 seconds
    const intervalId = setInterval(fetchData, 150000);

    // Clean up interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  
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
  // console.log(data);
  
  
  return (
    <div>
    <header>
      <nav>
        <ul>
          <li><Link to="/" >HANGANG</Link></li>
          <li>
            <a href="#" id="festival-dropdown" className="fes">FESTIVAL</a>
            <ul id="festival-menu">
              <li><a href="#">벚꽃축제</a></li>
              <li><a href="#">마라톤</a></li>
              <li><a href="#">야시장</a></li>
              <li><a href="#">불꽃축제</a></li>
            </ul>
          </li>
          <li><Link to="/Gallery" className="gallerymain">GALLERY</Link></li>
          <li><a href="#" id="hotplace-dropdown" className="hot">HOTPLACE</a>
            <ul id="hotplace-menu">
              <li><a href="#">Restaurant</a></li>
              <li><a href="#">Sights</a></li>
              <li><a href="#">Parking</a></li>
            </ul>
          </li>
          <li><a href="#" className="qa">Q&amp;A</a></li>
          <li><Link to="/Login" className="login" id="login">LOGIN</Link></li>
          <li><Link to="/Mypage" className="mypage" id="mypage">MY PAGE</Link></li>
          <li className="logout" id="logout" onClick={() => { logout(); return false; }}><span className="logout-span">로그아웃({data})</span></li>
 
        </ul>
      </nav>
    </header>
  </div>
)
}


export default Header