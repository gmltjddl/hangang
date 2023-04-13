import React, { useState,useEffect } from 'react';
import './css/Mypagebox.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Introleftside from '../Modal/Infomodal';
import axios from "axios";

const Mypagebox = () => {

  const [data, setData] = useState([]);
  const [IntroleftsideOn, setIntroleftsideOn] = useState(false);

 

  return (
    <>
      <Introleftside show={IntroleftsideOn} onHide={() => setIntroleftsideOn(false)} />

      <div className='box-wrap'>
        <div className="info-box-wrap">
          <h1>기본 정보</h1>
          <span>프로필 사진,이름,이메일,연락처 정보를 수정합니다.</span>
          <button className="intro-modal" onClick={() => setIntroleftsideOn(true)}>수정</button>
        </div>
        <div className="mywrite-box-wrap">
          <h1>내가 쓴 글 목록</h1>
          <span>내가 쓴 GALLERY 글,댓글,문의사항등 목록</span>
          <button>수정</button>
        </div>
        <div className="reservation-box-wrap">
          <h1>내 예약 목록</h1>
          <span>크루즈 예약,수상 택시 예약 목록</span>
          <button>수정</button>
        </div>
      </div>
    </>
  )
}

export default Mypagebox;