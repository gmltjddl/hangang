import React, { useState, useEffect } from "react";
import "./css/Gallerydetail.css";
import "./css/Heart.css";
import axios from "axios";
import { Modal, Button, Overlay } from "react-bootstrap";

const Gallerydetail = ({ show, onHide, galleryNo }) => {
    const [isHeartActive, setIsHeartActive] = useState(false);
    const [nickName, setNickName] = useState("");
    const [filepath, setFilepath] = useState("");
    const [content, setContent] = useState("");
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [no, setNo] = useState(galleryNo);

    // 댓글 상태
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:8080/web/boards/${no}`)
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .then((result) => {
                if (result.status === "success") {
                    console.log(result.data);
                    setNickName(result.data.writer.nickName);
                    setFilepath(result.data.attachedFiles[0].filepath);
                    setContent(result.data.content);
                    setLikes(result.data.likes);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [no]);

    const handleHeartClick = () => {
        setIsHeartActive(!isHeartActive);
    };

    const handleAddComment = (e) => {
        e.preventDefault();

        setComments([...comments, newComment]);
        setNewComment("");
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
                  <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                {/* Title or any other content */}
              </Modal.Title>
              <button className="gmodal-close" onClick={onHide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
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
                                    <img src={filepath} width="400px" height="400px" alt="" />
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
                                <div className="gbecontent">{content}</div>
                                <div className="gcomment">
                                    <form onSubmit={handleAddComment}>
                                        <input
                                            type="text"
                                            placeholder="댓글 작성..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        />
                                        <button type="submit">전송</button>
                                    </form>
                                </div>
                                <div className="comments-list">
                                    {comments.map((comment, index) => (
                                        <p key={index}>{comment}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Gallerydetail;