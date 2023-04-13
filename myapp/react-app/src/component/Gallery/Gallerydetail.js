import React, {useState, useEffect}  from "react";
import './css/Gallerydetail.css';
import './css/Heart.css';
import axios from "axios";



const Gallerydetail = () => {
    const [isHeartActive, setIsHeartActive] = useState(false);
    const [nickName, setNickName] = useState([]);
    const [filepath, setFilepath] = useState([]);
    const [content, setContent] = useState([]);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false); // 토글 버튼 상태를 관리하는 state

    useEffect(() => {
        axios.get("http://localhost:8080/web/boards/26")
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
    }, []);

    // const handleLike = () => {
    //     // if (liked) {
    //     //     setLikes(likes - 1);
    //     // } else {
    //     //     setLikes(likes + 1);
    //     // }
    //     // setLiked(!liked); // 토글 버튼 상태 업데이트
    //     setLikes(likes +1);
    //     setLiked(!liked);
    // };
    const handleHeartClick = () => {
        setIsHeartActive(!isHeartActive);
      }

    return(
        <div className="clickPage">
            <div className="gclickbox">
                <div className="gheader">
                    <div className="gheadprofile"></div>
                    <div className="gheaduser">{nickName}</div>
                    <button className="gheadfollow">follow</button>
                </div>
                <div className="gbody"><img src={filepath} width="400px" height="400px"></img></div>
                <div className="gbodybnt">
                <button className="glikebnt">
                    <div className="heartbtn">
                    <div className={`heart-btn ${isHeartActive ? 'heart-active' : ''}`}>
                    <div className="heart-content" onClick={handleHeartClick}>
                    <span className={`heart ${isHeartActive ? 'heart-active' : ''}`}></span>
                    <span className={`heart-text ${isHeartActive ? 'heart-active' : ''}`}>Like</span>
                    <span className={`numb ${isHeartActive ? 'heart-active' : ''}`}></span>
                    </div>
                    </div>
                    </div>
                </button>

                    <button className="gcommetbnt"></button>

                </div>
                <div className="gbecontent">{content}</div>
                <div className="gcomment">댓글 </div>
            </div>
        </div>
    );
};

export default Gallerydetail;