import React, { useState } from "react";
import './css/Infomodal.css';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';

const Introleftside = ({ show, onHide }) => {

    const [name, setName] = useState([]);
    const [nickName, setNickName] = useState([]);
    const [email, setEmail] = useState([]);
    const [tel, setTel] = useState([]);


    axios.get("http://localhost:8080/web/auth/user")
        .then((response) => {

            return response.data;
        })
        .then((result) => {

            if (result.status === "success") {
                setName(result.data.name);
                setNickName(result.data.nickName);
                setEmail(result.data.email);
                setTel(result.data.tel);

            } else {

            }
        })
        .catch((error) => {

        });

    return (

        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="profilemodify">
                    <div className="profile"> </div>
                    <p className="profilepick">프로필 사진</p>
                    <div className="profilename">
                        <h1 className="modifyname">이름</h1>
                        <input value={name} className="nameinputbox">

                        </input>
                    </div>
                    <div className="profilenickename">
                        <h1 className="modifynickname">닉네임</h1>
                        <input value={nickName} className="nicknameinputbox"></input>
                    </div>
                    <div className="profileemail">
                        <h1 className="modifyemail">이메일</h1>
                        <input value={email} className="emailinputbox"></input>
                    </div>
                    <div className="profiletel">
                        <h1 className="modifytel">연락처</h1>
                        <input value={tel} className="telinputbox"></input>
                    </div>
                    <div className="okno">
                        <button className="modify">수정</button>
                        <button className="cancel">삭제</button>
                    </div>
                </div>
                {/* <Button onClick={onHide}>Close</Button> */}
            </Modal.Body>
            {/* <Modal.Footer>
            </Modal.Footer> */}
        </Modal>

    )
}

export default Introleftside;