import React, { useState, useEffect, useContext } from "react";
import "./css/Gallerydetail.css";
import "./css/Heart.css";
import axios from "axios";
import { Modal, Button, Overlay } from "react-bootstrap";
import Galleryaddcomment from "../Comment/Galleryaddcomment";
import Gallerycommentlist from "../Comment/Gallerycommentlist";

const Gallerydetail = ({ show, onHide, boardNo, loggedInUser }) => {
    const [isHeartActive, setIsHeartActive] = useState(false);
    const [nickName, setNickName] = useState("");
    const [filepath, setFilepath] = useState("");
    const [content, setContent] = useState("");
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [no, setNo] = useState(boardNo);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [comments, setComments] = useState([]);

    // 이미지 이동 함수


     useEffect(() => {
                axios
                    .get(`http://localhost:8080/web/boards/${boardNo}`)
                    .then((response) => {
                        console.log(response.data);
                        return response.data;
                    })
                    .then((result) => {
                        if (result.status === "success") {
                            setNickName(result.data.writer.nickName);
                            setFilepath(result.data.attachedFiles[0].filepath);
                            setContent(result.data.content);
                            setLikes(result.data.likes);
                            setComments(Array.isArray(result.data.comments) ? result.data.comments : []);
                            setImages(result.data.attachedFiles.map((file) => file.filepath));
                        }
                    })
                    .catch((error) => {
                        console.error
                            (error);
                    });
            }, [no]);

            const handleHeartClick = () => {
                setIsHeartActive(!isHeartActive);
            };

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
                                                <div className="heartbtn">
                                                    <div
                                                        className={`heart-btn ${isHeartActive ? "heart-active" : ""
                                                            }`}
                                                    >
                                                        <div className="heart-content" onClick={handleHeartClick}>
                                                            <span
                                                                className={`heart ${isHeartActive ? "heart-active" : ""
                                                                    }`}
                                                            ></span>
                                                            <span
                                                                className={`heart-text ${isHeartActive ? "heart-active" : ""
                                                                    }`}
                                                            >
                                                                Like
                                                            </span>
                                                            <span
                                                                className={`numb ${isHeartActive ? "heart-active" : ""
                                                                    }`}
                                                            ></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                            <button className="gcommetbnt"></button>
                                        </div>
                                        <div className="gbecontent">
                                            {content}
                                        </div>
                                        <div className="gcomment-list">
                                            <Gallerycommentlist
                                                comments={content}
                                            />                             
                                        </div>
                                        <div>
                                            <Galleryaddcomment
                                                boardNo={boardNo}
                                                loggedInUser={loggedInUser}
                                                comments={comments}
                                                setComments={setComments}
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