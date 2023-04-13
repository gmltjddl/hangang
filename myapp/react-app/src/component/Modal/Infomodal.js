import React, { useEffect, useState } from "react";
import './css/Infomodal.css';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';

const Introleftside = ({ show, onHide }) => {
    const [name, setName] = useState([]);
    const [nickName, setNickName] = useState([]);
    const [email, setEmail] = useState([]);
    const [tel, setTel] = useState([]);
    
    useEffect(() => {
        // 서버에서 유저 정보를 가져오는 함수
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/web/auth/user");
                const result = response.data;
                if (result.status === "success") {
                    setName(result.data.name);
                    setNickName(result.data.nickName);
                    setEmail(result.data.email);
                    setTel(result.data.tel);
                console.log(result.data);
                } else {
                    // 에러 처리
                }
            } catch (error) {
                // 에러 처리
            }
        };

        fetchUserData();
    }, []);



    const handleUpdate = () => {
        // 유저 정보를 업데이트하는 함수
        const updateUserData = async () => {
            try {
                const data = {

                    name: name,
                    nickName: nickName,
                    email: email,
                    tel: tel
                };
        
                const response = await axios.put("http://localhost:8080/web/members/24", data);
                console.log(response.data);
                const result = response.data;
                console.log(result.data);
                if (result.status === "success") {
   
                    alert("수정되었습니다");
                } else {
                    alert("수정실패");
                }
            } catch (error) {
                alert("연결실패");
            }
        };

        updateUserData();
    };

    

    return (

        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
            <form id="info-form">
                <div className="profilemodify">
         
                    <div className="profile"> </div>
                    <p className="profilepick">프로필 사진</p>
                    <div className="profilename">
                        <h1 className="modifyname">이름</h1>

                        <input value={name} onChange={(event) => setName(event.target.value)} className="nameinputbox">

                        </input>
                    </div>
                    <div className="profilenickename">
                        <h1 className="modifynickname">닉네임</h1>
                        <input value={nickName} onChange={(event) => setNickName(event.target.value)} className="nicknameinputbox"></input>
                    </div>
                    <div className="profileemail">
                        <h1 className="modifyemail">이메일</h1>
                        <input value={email} onChange={(event) => setEmail(event.target.value)} className="emailinputbox"></input>
                    </div>
                    <div className="profiletel">
                        <h1 className="modifytel">연락처</h1>
                        <input value={tel} onChange={(event) => setTel(event.target.value)} className="telinputbox"></input>
                    </div>
                    <div className="okno">
                        <button className="modify" onClick={handleUpdate}>수정</button>
                        <button className="cancel">취소</button>
                    </div>
                </div>
                    </form>
                {/* <Button onClick={onHide}>Close</Button> */}
            </Modal.Body>
            {/* <Modal.Footer>
            </Modal.Footer> */}
        </Modal>

    )
}

export default Introleftside;