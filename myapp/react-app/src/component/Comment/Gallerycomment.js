import React, { useState } from "react";
import axios from "axios";

const Gallerycomment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();

    if (newComment.trim() !== "") {
      axios
        .post("http://localhost:8080/web/comments", {
          content: newComment
        })
        .then((response) => {
          console.log(response.data);
          // 댓글이 성공적으로 저장된 경우, 댓글 목록을 업데이트하고 댓글 입력 창 초기화
          const updatedComments = [...comments, response.data]; // 새로운 댓글을 댓글 목록에 추가
          setComments(updatedComments);
          setNewComment(""); // 댓글 입력 창 초기화
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className="gcomment">
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            placeholder="댓글 작성..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">게시</button>
        </form>
      </div>
      <div className="comments-list">
        {comments?.map((comment, index) => (
          <p key={index}>{comment.content}</p>
        ))}
      </div>
    </>
  );
};

export default Gallerycomment;
