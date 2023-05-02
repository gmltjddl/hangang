import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./css/Qnalist.css";
import Usercontext from '../../Usercontext';
import Qnaedit from "./Qnaedit";
import QnaComment from "./Qnacomment";

const Qnalist = () => {
  const [qnas, setQnas] = useState([]);
  const [showContent, setShowContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [qnasPerPage] = useState(20);
  const user = useContext(Usercontext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQna, setSelectedQna] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyQnaNo, setReplyQnaNo] = useState(null);

  useEffect(() => {
    fetchqnas();
  }, []);

  const fetchqnas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/web/qnas");
      const result = response.data;
      console.log(result);
      if (result.status === "success" && Array.isArray(result.data)) {
        console.log(result.data);
        // Fetch comments for each QnA
        const qnaWithComments = await Promise.all(result.data.map(async (qna) => {
          const commentResponse = await axios.get(`http://localhost:8080/web/api/qnacomment/${qna.no}`);
          return {
            ...qna,
            comments: commentResponse.data,
          };
        }));
        setQnas(qnaWithComments);
      } else {
        console.error("Error fetching qna: Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching qna:", error);
    }
  };

  const handleToggleContent = (index) => {
    if (showContent === index) {
      setShowContent(null);
    } else {
      setShowContent(index);
    }
  };

  const renderSeparator = () => {
    return <hr className="qna-separator" />;
  };

  const indexOfLastQna = currentPage * qnasPerPage;
  const indexOfFirstQna = indexOfLastQna - qnasPerPage;
  const currentQnas = qnas.slice(indexOfFirstQna, indexOfLastQna);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(qnas.length / qnasPerPage); i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={() => paginate(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </li>
      );
    }

    return <ul className="page-numbers">{pageNumbers}</ul>;

  };

  const handleEditClick = (event, qna) => {
    event.stopPropagation();
    setIsEditing(true);
    setSelectedQna(qna);
  };

  const handleModalClose = () => {
    setIsEditing(false);
    setSelectedQna(null);
  };

  const handleReplyClick = (event, qnaNo) => {
    event.stopPropagation();
    if (isReplying && replyQnaNo === qnaNo) {
      setIsReplying(false);
      setReplyQnaNo(null);
    } else {
      setIsReplying(true);
      setReplyQnaNo(qnaNo);
    }
  };

  const handleReplyModalClose = () => {
    setIsReplying(false);
    setReplyQnaNo(null);
    fetchqnas(); // Fetch QNAs again to update the list after a reply has been added
  };

  const handleDeleteClick = async (event, qnaNo) => {
    event.stopPropagation();
    try {
      const response = await axios.delete(`http://localhost:8080/web/qnas/${qnaNo}`);
      const result = response.data;
      console.log(result);
      console.log(qnaNo);
      if (result.status === "success") {
        const updatedQnas = qnas.filter(qna => qna.no !== qnaNo);
        setQnas(updatedQnas);
      } else {
        console.error("Error deleting qna");
      }
    } catch (error) {
      console.error("Error deleting qna:", error);
    }
  };

  useEffect(() => {
    if (user && user.no === 1) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <>
      <h1 className="qna-h1">질문 & 답변</h1>
      <div className="qna-list">
        <div className="qna-header-bar">
          <span className="qna-number-header">No</span>
          <span className="qna-title-header">제목</span>
          <span className="qna-nick-header">작성자</span>
          <span className="qna-date-header">작성일</span>
        </div>
        <ul>
          {currentQnas.map((qna, index) => (
            <li
              key={index}
              className={showContent === index ? "open" : ""}
            >
              <div className="qna-header"
                onClick={() => handleToggleContent(index)}>
                <span className="qna-number">{qna.no}. </span>
                <span className="qna-title">{qna.title}</span>
                <span className="qna-nick">{qna.writer.nickName}</span>
                <span className="qna-date"> {qna.createdDate}</span>
              </div>
              {showContent === index && (
                <div className="qna-content">
                  {renderSeparator()}
                  <p className="qna-text">{qna.content}</p>
                  {user.no === qna.writer.no && (
                    <span className="qna-actions">
                      <button className="qedit-btn" onClick={(event) => handleEditClick(event, qna)}></button>
                      <button className="qdelete-btn" onClick={(event) => handleDeleteClick(event, qna.no)}></button>
                    </span>
                  )}
                  {isAdmin && (
                    <button
                      className="qreply-btn"
                      onClick={(event) => handleReplyClick(event, qna.no)}
                    >답글</button>
                  )}
               {qna.comments && qna.comments.length > 0 && (
  <>
    <div className="qna-admin-reply-divider"></div>
    {qna.comments.map((comment, commentIndex) => (
      <div key={commentIndex} className="qna-admin-comment">
        <h3>관리자 댓글</h3>
        <p>{comment.content}</p>
      </div>
    ))}
  </>
)}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {renderPageNumbers()}
      {isEditing && (
        <Qnaedit
          selectedQna={selectedQna}
          onModalClose={handleModalClose}
          onSave={fetchqnas}
        />
      )}
     {isReplying && (
  <QnaComment
    className="QnaComment-modal"
    onModalClose={handleReplyModalClose}
    onSave={fetchqnas}
    qnaNo={replyQnaNo}
    writer={user}
  />
)}
    </>
  );
};

export default Qnalist;
