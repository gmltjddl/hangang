import React, { useState, useEffect } from 'react';
import "./css/Gallerycommentlist.css";
import axios from 'axios';

const Gallerycommentlist = ({boardNo}) => {
  const [comments, setComments] = useState([]);
  console.log(boardNo);
  useEffect(() => {
    // 서버로부터 댓글 목록을 받아와 comments 상태를 업데이트
    axios
      .get("http://localhost:8080/web/comments")
      .then((response) => {
        console.log(response.data.data);
        
        setComments(response.data.data);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // 컴포넌트가 처음 렌더링 될 때에만 실행

  return (
    <>
      <div className="gcomment-list">
        {comments.map((comment) => (
          <div key={comment.id}>
            {comment.content}
          </div>
        ))}
      </div>
    </>
  );
}

export default Gallerycommentlist;