import React, { useState, useEffect, useContext } from "react";
import "./css/Gallerydetail.css";
// import "./css/Heart.css";
import axios from "axios";
import { Modal, Button, Overlay } from "react-bootstrap";
import Gallerycomment from "../Comment/Gallerycomment";
import Like from "../Like/Like";


const Gallerydetail = ({ show, onHide, boardNo, loggedInUser }) => {
    const [nickName, setNickName] = useState("");
    const [filepath, setFilepath] = useState("");
    const [content, setContent] = useState("");
    const [no, setNo] = useState(boardNo);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [comments, setComments] = useState([]);

// 이미지 이동 함수

const fetchComments = () => {
    axios.get("http://localhost:8080/web/comments/board/" + boardNo)
        .then((response) => {
            const receivedComments = response.data.data;
            if (Array.isArray(receivedComments)) {
                setComments(receivedComments);
            } else {
                setComments([]);
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

useEffect(() => {
    axios 
    .get(`http://localhost:8080/web/boards/${boardNo}`)
        .then((response) => {
            return response.data;
        })
        .then((result) => {
            if (result.status === "success") {
                setNickName(result.data.writer.nickName);
                setFilepath(result.data.attachedFiles[0].filepath);
                setContent(result.data.content);
                setComments(Array.isArray(result.data.comments) ? result.data.comments : []);
                setImages(result.data.attachedFiles.map((file) => file.filepath));
            }
        })
        .catch((error) => {
            console.error
                (error);
        });
}, [no]);


const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
};

const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
};

return (
    <div className="gdetail-modal-box">
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="true"
        >
            <Modal.Body>
                <div className="gdetail-modal-box2">
                    <div className="clickPage">
                        <div className="gclickbox">
                            <div className="gheader">
                                <div className="gheadprofile"></div>
                                <div className="gheaduser">{nickName}</div>
                                <button className="gheadfollow">follow</button>
                            </div>
                            <div className="gbody">
                                <div className="gdetail-image-container">
                                    <img
                                        src={images[currentImageIndex]}
                                        width="400px"
                                        height="400px"
                                        alt=""
                                        onClick={nextImage}

                                    />
                                    <div className="gdetail-image-navigation">
                                        <button className="gdetail-prev-button" onClick={prevImage}>&lt;</button>
                                        <div className="gdetail-image-info">
                                            {currentImageIndex + 1}/{images.length}
                                        </div>
                                        <button className="gdetail-next-button" onClick={nextImage}>&gt;</button>
                                    </div>
                                </div>
                            </div>
                            <div className="gbodybnt">
                                <button className="glikebnt">
                             
                                  <Like boardNo={boardNo}/>
                     
                                </button>
                                <button className="gcommetbnt"></button>
                            </div>
                            <div className="gbecontent">
                                {content}
                            </div>
                            <div className="gcomment-list">
                                    <Gallerycomment
                                        boardNo={boardNo}
                                        comments={comments}
                                        loggedInUser={loggedInUser}
                                        setComments={setComments}
                                        fetchComments={fetchComments}
                                    />
                                </div>
                           
                        </div>
                    </div>
                    <div className="x-container">
                    <div></div>
                    <div></div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        
    </div>
);
};

export default Gallerydetail;