import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import axios from "axios";


function logout() {
  // logout 함수 구현
}


function Header() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/web/auth/hello')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  console.log(data);


  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="#" key={data}>{data}</a></li>
            <li>
              <a href="#" id="festival-dropdown" className="fes">FESTIVAL</a>
              <ul id="festival-menu">
                <li><a href="#">벚꽃축제</a></li>
                <li><a href="#">마라톤</a></li>
                <li><a href="#">야시장</a></li>
                <li><a href="#">불꽃축제</a></li>
              </ul>
            </li>
            <li><a href="#" className="gall">GALLERY</a></li>
            <li><a href="#" id="hotplace-dropdown" className="hot">HOTPLACE</a>
              <ul id="hotplace-menu">
                <li><a href="#">Restaurant</a></li>
                <li><a href="#">Sights</a></li>
                <li><a href="#">Parking</a></li>
              </ul>
            </li>
            <li><a href="#" className="qa">Q&amp;A</a></li>
            <ul>

              <li className="logout"><Link to="app/auth/logout" onClick={() => { logout(); return false; }}>로그아웃(<span id="username"></span>)</Link></li>
              <li><Link to="/Login" className="login">LOGIN</Link></li>
            </ul>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header