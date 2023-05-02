import React, { useState,useEffect } from "react";
import axios from "axios";
import "./css/Qnawrite.css";
import Swal from "sweetalert2";
const Qnawrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [qnas, setQnas] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
 

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    axios
      .post("http://localhost:8080/web/qnas", formData, {})
      .then((response) => {
        const result = response.data;
        if (result.status === "success") {
          setQnas([...qnas, { title, content }]);
          setTitle("");
          setContent("");
          setShowModal(false);
        } else {
          Swal.fire(
            '입력 실패!',
            '입력 중 오류가 발생했습니다.',
            'warning'
          )
        }
      })
      .catch((exception) => {
        Swal.fire(
          '입력 실패!',
          '입력 중 오류가 발생했습니다.',
          'warning'
        )
      });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = (event) => {
    event.stopPropagation(); // 이벤트 전파 중지
    setShowModal(false);
  };

  return (
    <>

      <button onClick={openModal} className="write-btn">글쓰기</button>
      {showModal && (
        
        <div className="qmodal">
         <span className="qclose" onClick={(event) => closeModal(event)}>&times;</span>
          <div className="qmodal-content">
            <form onSubmit={handleSubmit} className="qna-form">
              <div>
                <label htmlFor="title" className="qtitle">제목: </label>
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
                <label htmlFor="content" className="qcontent">내용: </label>
                <textarea
                  id="content"
                  value={content}
                  className="qcontent-input"
                  onChange={(event) => setContent(event.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="qadd-btn">등록</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Qnawrite;
