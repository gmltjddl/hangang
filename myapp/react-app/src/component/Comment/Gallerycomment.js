import React, { useState, useEffect, useContext } from 'react';
import "./css/Gallerycomment.css";
import axios from 'axios';


const Gallerycomment = ({ boardNo }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');


  const fetchComments = () => {
    axios
      .get(`http://localhost:8080/web/comments/boardNo/${boardNo}`, { withCredentials: true })
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
    fetchComments();
  }, []);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    if (content.trim() !== "") {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("boardNo", boardNo);

      axios
        .post("http://localhost:8080/web/comments", formData)
        .then((response) => {
          console.log(response.data.data);
          setContent("");
          fetchComments(); // 새 댓글이 추가된 후 댓글 목록을 업데이트
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("댓글 내용을 입력해주세요.");
    }
  };

  const handleDeleteComment = (commentNo) => {
    axios
      .delete(`http://localhost:8080/web/comments/${commentNo}`, { withCredentials: true })
      .then((response) => {
        fetchComments();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditComment = (commentNo, content) => {
    setEditingCommentId(commentNo);
    setEditedContent(content);
  };

  const handleUpdateComment = (e, commentNo) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/web/comments/${commentNo}`, { content: editedContent }, { withCredentials: true })
      .then((response) => {
        setEditingCommentId(null);
        fetchComments();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="gcomment-list">
        {comments.map((comment) => (
          <div key={comment.no}>
            {editingCommentId === comment.no ? (
              <form onSubmit={(e) => handleUpdateComment(e, comment.no)}>
                <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button type="submit">저장</button>
                <button onClick={() => setEditingCommentId(null)}>취소</button>
              </form>
            ) : (
              <>
                {comment.content}

                  <>
                    <button onClick={() => handleEditComment(comment.no, comment.content)}>수정</button>
                    <button onClick={() => handleDeleteComment(comment.no)}>삭제</button>
                  </>

              </>
            )}
          </div>
        ))}
      </div>
      <div className="gcomment-add">
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            placeholder="댓글 작성..."
            value={content}
            onChange={handleContentChange}
          />
          <button type="submit">게시</button>
        </form>
      </div>
    </>
  );
};

export default Gallerycomment;
