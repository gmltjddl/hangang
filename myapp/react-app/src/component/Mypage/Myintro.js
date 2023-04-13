import React, { useState } from 'react';
import Intromodal from '../Modal/Intromodal';
import { Button, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './css/Myintro.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';


const Myintro = () => {
  const [IntromodalOn, setIntromodalOn] = useState(false);
  const [introduce, setIntroduce] = useState([]);
  // const [interst, setInterest] = useState([]);
  const [hobby, setHobby] = useState([]);
  const [createdDate, setCreatedDate] = useState([]);


  axios.get("http://localhost:8080/web/auth/user")
    .then((response) => {
      return response.data;
    })
    .then((result) => {
      if (result.status === "success") {
        setIntroduce(result.data.introduce);
        // setInterest(result.data.interest);
        setHobby(result.data.hobby);
        setCreatedDate(result.data.createdDate);
        // console.log(result.data);
      } else {
      }
    })
    .catch((error) => {
      // console.log(error);
      // alert("로그인 사용자 정보 조회 오류!");
    });



  return (
    <>
      <Intromodal show={IntromodalOn} onHide={() => setIntromodalOn(false)} />

      <div className="intro-wrap">

        <div className="intro-title">
          <span>내 소개</span>
        </div>
        <div className="intro-edit-btn">
          <button className="intro-modal" onClick={() => setIntromodalOn(true)}>수정</button>
        </div>
        <div className="line"></div>
        <div className="intro-img">

        </div>
        <div className="intro-write-wrap">
          <span>소개글</span>
          <div className="intro-write">
            {introduce}
          </div>
        </div>
        <div className="intro-intro-wrap">
          <span>관심분야</span>
          <div className="intro-intro">
            런닝,불꽃축제
          </div>
        </div>
        <div className="intro-hobby-wrap">
          <span>취미</span>
          <div className="intro-hobby">
            {hobby}
          </div>
        </div>
        <div className="intro-date-wrap">
          <span>가입일</span>
          <div className="intro-date">
            {createdDate}
          </div>
        </div>

      </div>
    </>
  )
}


export default Myintro;