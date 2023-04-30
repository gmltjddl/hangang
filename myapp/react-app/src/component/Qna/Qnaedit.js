import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Qnawrite.css";

const Qnaedit = ({ selectedQna, onModalClose, onSave }) => {
  const [title, setTitle] = useState(selectedQna.title);
  const [content, setContent] = useState(selectedQna.content);


  useEffect(() => {
    if (selectedQna) {
      setTitle(selectedQna.title);
      setContent(selectedQna.content);
    }
  }, [selectedQna]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    try {
      let response;
      if (selectedQna) {
        response = await axios.put(
          `http://localhost:8080/web/qnas/${selectedQna.no}`,
          formData,
          {}
        );
      } else {
        response = await axios.post(
          "http://localhost:8080/web/qnas",
          formData,
          {}
        );
      }
      const result = response.data;
      if (result.status === "success") {
        onModalClose();
        onSave(); // Qnalist의 fetchqnas 함수를 호출하여 목록을 업데이트
      } else {
        alert("입력 실패!");
      }
    } catch (exception) {
      alert("입력 중 오류가 발생했습니다.");
    }
  };

  const closeModal = (event) => {
    event.stopPropagation(); // 이벤트 전파 중지
    onModalClose();
  };

  return (
    <>
      <div className="qmodal">
        <span className="qclose" onClick={(event) => closeModal(event)}>
          &times;
        </span>
        <div className="qmodal-content">
          <form onSubmit={handleSubmit} className="qna-form">
            <div>
              <label htmlFor="title" className="qtitle">
                제목:{" "}
              </label>
              <input
                type="text"
                id="title"
                value={title}
                className="qtitle-input"
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="qcontent">
                내용:{" "}
              </label>
              <textarea
                id="content"
                value={content}
                className="qcontent-input"
                onChange={(event) => setContent(event.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="qadd-btn">
              수정
            </button>
          </form>
        </div>
      </div>
    </>
  );

};

export default Qnaedit;
