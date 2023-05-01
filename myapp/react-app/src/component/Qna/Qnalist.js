import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./css/Qnalist.css";
import Usercontext from '../../Usercontext';
import Qnaedit from "./Qnaedit";

const Qnalist = () => {
  const [qnas, setQnas] = useState([]);
  const [showContent, setShowContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [qnasPerPage] = useState(20);
  const user = useContext(Usercontext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQna, setSelectedQna] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReplying, setIsReplying] = useState(false); // 답글 작성 중인지 여부를 추적하는 상태

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
        setQnas(result.data);
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

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleReplyModalClose = () => {
    setIsReplying(false);
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
      onClick={() => handleToggleContent(index)}
      className={showContent === index ? "open" : ""}
      >
      <div className="qna-header">
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
      <button className="qreply-btn" onClick={handleReplyClick}>답글</button>
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
      <Qnaedit
             isReply={true}
             onModalClose={handleReplyModalClose}
             onSave={fetchqnas}
           />
      )}

      </>
      );
      };
      export default Qnalist;
