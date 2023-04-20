import React, { useState ,useContext} from 'react';
import Intromodal from './Intromodal';
import { Button, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './css/Myintro.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Usercontext from '../../Usercontext';


const Myintro = () => {
  const [IntromodalOn, setIntromodalOn] = useState(false);
  const [introduce, setIntroduce] = useState([]);
  const [interest, setInterest] = useState([]);
  const [hobby, setHobby] = useState([]);
  const [createdDate, setCreatedDate] = useState([]);
  const user = useContext(Usercontext);



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
          <span>이름</span>
          <div className="intro-name">
            {user.name}
          </div>
        </div>
        <div className="intro-write-wrap">
          <span>닉네임</span>
          <div className="intro-nick">
            {user.nickName}
          </div>
        </div>
        <div className="intro-write-wrap">
          <span>소개글</span>
          <div className="intro-intro">
            {user.introduce}
          </div>
        </div>
        <div className="intro-write-wrap">
          <span>관심분야</span>
          <div className="intro-inter">
          {user.interest}
          </div>
        </div>
        <div className="intro-write-wrap">
          <span>취미</span>
          <div className="intro-hobby">
            {user.hobby}
          </div>
        </div>
        <div className="intro-write-wrap">
          <span>가입일</span>
          <div className="intro-date">
            {user.createdDate}
          </div>
        </div>

      </div>
    </>
  )
}


export default Myintro;