import React, { useState, useEffect, useContext } from "react";
import "./css/Gallerydetail.css";
import axios from "axios";
import { Modal, Button, Overlay } from "react-bootstrap";
import Gallerycomment from "../Comment/Gallerycomment";
import LikeButton from "../Like/Like";
import FollowButton from "../Follow/Follow";
import Usercontext from '../../Usercontext';
import Gallerymodify from './Gallerymodify';


const Gallerydetail = ({ show, onHide, boardNo, loggedInUser, userId, customModalStyle ,getData}) => {
    const [isHeartActive, setIsHeartActive] = useState(false);
    const [nickName, setNickName] = useState("");
    const [filepath, setFilepath] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [viewCount, setViewCount] = useState("");
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [no, setNo] = useState(boardNo);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [comments, setComments] = useState([]);
    const [isCommentAddVisible, setIsCommentAddVisible] = useState(false);
    const user = useContext(Usercontext);
    const [modifymodalOn, setmodifymodalOn] = useState(false);
    const [boarduserfilepath,setBoardUserFilepath] = useState("")
    getData(boarduserfilepath);

    useEffect(() => {
        if (boarduserfilepath) {
          getData(boarduserfilepath);
        }
      }, [boarduserfilepath]);

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
    const toggleCommentAddVisibility = () => {
        setIsCommentAddVisible(!isCommentAddVisible);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8080/web/boards/${boardNo}`)
            .then((response) => {
                return response.data;
            })
            .then((result) => {
                if (result.status === "success") {

                    setTitle(result.data.title);
                    setNickName(result.data.writer.nickName);
                    setFilepath(result.data.attachedFiles[0].filepath);
                    setContent(result.data.content);
                    setLikes(result.data.likes);
                    setComments(Array.isArray(result.data.comments) ? result.data.comments : []);
                    setImages(result.data.attachedFiles.map((file) => file.filepath));
                    setViewCount(result.data.viewCount);
                }
            })
            .catch((error) => {
                console.error
                    (error);
            });
  

            axios.get(`http://localhost:8080/web/members/${userId}`)
            .then((response) => {
                return response.data;
            })
            .then((result) => {
                if(result.status === "success") {
                    console.log(result,"디테일 유저아이디");
                    console.log(result.data.attachedFiles[0]);
                    setBoardUserFilepath(result.data.attachedFiles[0]);
        
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


    const handledelete = async () => {
        if (user.loggedIn === false) {
            alert("로그인을 해주세요");

            return;
        } else if (userId != user.no) {
            alert("내 게시글이 아니에요")
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8080/web/boards/${boardNo}`);
            if (response.status === 200) {
                console.log(response.data, 'delete요청');
                //window.location.href="./Gallery";

            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleClose = () => {
        onHide();
    }


    const defaultModalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    const modalStyle = customModalStyle ? customModalStyle : defaultModalStyle;
console.log(nickName);
    return (

        <div className="gdetail-modal-box">
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="true"
                className="Gallerydetail-modal-box"
                style={customModalStyle}
            >
                <Modal.Body>
                    <div className="gdetail-modal-box2">
                        <div className="clickPage">
                            <div className="gclickbox">
                                <div className="gheader">
                                    <div className="gheadprofile"></div>

                                    <div className="gheaduser">{nickName}</div>

                                    <Gallerymodify show={modifymodalOn}
                                        onHide={() => setmodifymodalOn(false)}
                                        boardNo={boardNo}
                                        userId={userId} />
                                    {userId === user.no && (
                                        <Button
                                            className="Gallerymodify-Button"
                                            onClick={() => setmodifymodalOn(true)}
                                        >
                                            수정
                                        </Button>
                                    )}
                                    {userId === user.no && (
                                        <div className="gdelete">
                                            <button
                                                id="gdeletebtn"
                                                className="gdeletebnt"
                                                onClick={handledelete}
                                            >
                                                삭제
                                            </button>

                                        </div>
                                    )}
                                    {(userId !== user.no) && (
                                        <FollowButton boardNo={boardNo} userId={userId} />
                                    )}

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

            
                                    <button className="glikebnt">
                                        <LikeButton boardNo={boardNo} />
                                    </button>
                                    <button className="gcommentbnt" onClick={toggleCommentAddVisibility}></button>
                                    <div className="viewcnt-img"></div>
                                    <div className="gview-cnt">
                                        {viewCount}
                                    </div>
                               
                                <div className="gbecontent">
                                    {content}
                                </div>
                                <div className="gtag-list">
                                    {title}
                                </div>
                                <div className="gcomment-list">
                                    {isCommentAddVisible && (
                                        <Gallerycomment
                                            boardNo={boardNo}
                                            comments={comments}
                                            loggedInUser={loggedInUser}
                                            setComments={setComments}
                                            fetchComments={fetchComments}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="x-container" onClick={handleClose}>
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