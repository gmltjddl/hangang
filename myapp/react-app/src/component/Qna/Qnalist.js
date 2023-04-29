import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Qnalist.css";

const Qnalist = () => {
  const [qnas, setQnas] = useState([]);
  const [showContent, setShowContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [qnasPerPage] = useState(20);

  useEffect(() => {
    fetchqnas();
  }, []);

  const fetchqnas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/web/qnas");
      const result = response.data;
      console.log("Server response:", result); // 추가: 콘솔에 서버 응답 출력
      if (result.status === "success" && Array.isArray(result.data)) {
        console.log(result.data);
        setQnas(result.data.reverse());
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

  return (
    <>
      <h1 className="qna-h1">질문 & 답변</h1>
      <div className="qna-list">
        <div className="qna-header-bar">
          <span className="qna-number-header">No</span>
          <span className="qna-title-header">제목</span>
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
                <span className="qna-date"> {qna.createdDate}</span>
              </div>
              {showContent === index && (
                <div className="qna-content">
                  <p className="qna-nickname">{qna.nickName}</p>
                  {renderSeparator()}
                  <p className="qna-text">{qna.content}</p>
                </div>
              )}
            </li>
        ))}
      </ul>
    </div>
    {renderPageNumbers()}
  </>
);
};
export default Qnalist;
