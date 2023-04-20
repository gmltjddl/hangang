import React, { useState, useEffect, useContext } from 'react';
import "./css/Gallerycomment.css";
import axios from 'axios';
import Usercontext from '../../Usercontext';


const Gallerycomment = ({ boardNo }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const user = useContext(Usercontext);

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
      if (content.length <= 30) {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("boardNo", boardNo);

      axios
        .post("http://localhost:8080/web/comments", formData)
        .then((response) => {
          console.log(response.data.data);
          e.target.reset();
          fetchComments(); // 새 댓글이 추가된 후 댓글 목록을 업데이트
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("댓글은 30자 이하여야 합니다.");
    }
  } else {
    alert("댓글 내용을 입력해주세요.");
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
                <div className="gprofile-img">
                <img src="https://images-ext-2.discordapp.net/external/k496ijrcjYv-XqebZOS9HnfW1-QjyF5m21FrsUKIL2s/%3Ftype%3Df%26w%3D260%26h%3D260%26faceopt%3Dtrue%26ttype%3Djpg/http/tbxctpxzerdz16840769.cdn.ntruss.com/defaultprofile.jpg?width=30&height=30"></img>
                </div>
                <div className='gcooment-content'>
                {comment.content}
                </div>
                {user && user.no === comment.writer.no && (
                  <>
                    <button className="comment-update-btn" onClick={() => handleEditComment(comment.no, comment.content)}>수정</button>
                    <button className="comment-delete-btn" onClick={() => handleDeleteComment(comment.no)}>삭제</button>
                  </>

              )}
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
            onChange={handleContentChange}
          />
          <button type="submit">게시</button>
        </form>
      </div>
    </>
  );
};

export default Gallerycomment;
