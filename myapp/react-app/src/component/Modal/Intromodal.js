import React, {useState}from "react";
import './css/Intromodal.css';
import axios from 'axios';

function Intromodal() {

    const [name, setName] = useState([]);
    const [introduce, setIntroduce] = useState([]);
    const [hobby, setHobby] = useState([]);
    const [createdDate, setCreatedDate] = useState([]);


  axios.get("http://localhost:8080/web/auth/user")
  .then((response) => {

    return response.data;
    })
    .then((result) => {

    if (result.status === "success") {
        setName(result.data.name);
        setIntroduce(result.data.introduce);
        setHobby(result.data.hobby);
        setCreatedDate(result.data.createdDate);

    } else {

    }
  })
  .catch((error) => {

  });

    return(
        <div className="profilemodify">
            <div className="profile"> </div>
            <p className="profilepick"></p>
            <div className="profilename">
                <h1 className="modifyname">이름</h1>
                <input value={name} className="nameinputbox">
                </input>
            </div>
            <div className="profilenickename">
                <h1 className="modifynickname">소개글</h1>
                <input value={introduce} className="nicknameinputbox"></input>
            </div>
            <div className="profileemail">
                <h1 className="modifyemail">취미</h1>
                <input value={hobby} className="emailinputbox"></input>
            </div>
            <div className="profiletel">
                <h1 className="modifytel">가입일</h1>
                <input value={createdDate} className="telinputbox"></input>
            </div>
            <div className="okno">
                <button className="modify">수정</button>
                <button className="cancel">삭제</button>
            </div>
        </div>

    )
}

export default Intromodal;