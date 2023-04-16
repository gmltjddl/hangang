import React, { useState } from "react";
import Gallerycomment from "./Gallerycomment";

const Gallerycomment = () => {
  const [no, setNo] = useState(galleryNo);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();

    if (newComment.trim() !== "") {
        axios
            .post("http://localhost:8080/web/comments", {
              galleryNo: no,
              content: newComment
                

                
            })
            .then((response) => {
                console.log(response.data);
                // 댓글이 성공적으로 저장된 경우, 댓글 목록을 업데이트하고 댓글 입력 창 초기화
                setComments([...comments, response.data]);
                setNewComment("");
            })
            .catch((error) => {
                console.error(error);
            });
    }
};

  return (
  <div className="gcomment" >
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
  );
};

export default Gallerycomment;
