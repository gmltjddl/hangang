import React, { useState, useEffect } from 'react';
import "./css/Gallerycommentlist.css";
import axios from 'axios';


const Gallerycommentlist = ({ boardNo }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    // 서버로부터 댓글 목록을 받아와 comments 상태를 업데이트
    axios
      .get(`http://localhost:8080/web/comments/boardNo/${boardNo}`)
      .then((response) => {
        // console.log(response.data.data);
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
    // 초기에 댓글 목록을 불러오고, 5초마다 댓글 목록을 다시 가져옴
    fetchComments();
    const intervalId = setInterval(fetchComments,100);

    // 컴포넌트가 언마운트될 때 인터벌 해제
    return () => {
      clearInterval(intervalId);
    };
  }, [boardNo]);

  return (
    <>
      <div className="gcomment-list">
        {comments.map((comment) => (
          <div key={comment.id}>{comment.content}</div>
        ))}
      </div>
    </>
  );
}

export default Gallerycommentlist;