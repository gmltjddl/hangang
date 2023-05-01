import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Qnacomment.css";

const QnaComment = ({ onModalClose, qnaNo, writer }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:8080/web/api/qnacomment/${qnaNo}`
    );
    setComments(response.data);
  };

  const addComment = async () => {
    if (editingComment) {
      updateComment(editingComment);
    } else {
      const newComment = { content, qnaNo: qnaNo, writer };
      await axios.post("http://localhost:8080/web/api/qnacomment", newComment);
      setContent("");
      fetchComments();
    }
  };

  const handleEditClick = (comment) => {
    setContent(comment.content);
    setEditingComment(comment.no);
  };

  const updateComment = async (id) => {
    const updatedComment = { content };
    await axios.put(`http://localhost:8080/web/api/qnacomment/${id}`, updatedComment);
    setEditingComment(null);
    setContent("");
    fetchComments();
  };

  const deleteComment = async (id) => {
    await axios.delete(`http://localhost:8080/web/api/qnacomment/${id}`);
    fetchComments();
  };

  return (
    <div className="QnaComment-modal">
      <div className="QnaComment-modal-content">
        <h3 className="QnaComment-modal-title">QnA Comments</h3>
        <ul className="QnaComment-modal-comments">
          {comments.map((comment) => (
            <li key={comment.no} className="QnaComment-modal-comment">
              <div className="QnaComment-modal-content-box">
                {comment.content}
              </div>
              <div className="QnaComment-modal-actions">
                <button className="QnaComment-modal-edit" onClick={() => handleEditClick(comment)}>수정</button>
                <button className="QnaComment-modal-delete" onClick={() => deleteComment(comment.no)}>삭제</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="QnaComment-modal-input-box">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
            className="QnaComment-modal-input"
          />
        </div>
        <div className="QnaComment-modal-button-box">
          <button className="QnaComment-modal-add-button" onClick={addComment}>{editingComment ? "수정" : "입력"}</button>
          <button className="QnaComment-modal-close-button" onClick={onModalClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default QnaComment;
