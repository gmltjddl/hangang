import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Qna.css";
import "./css/QnaBoard.css";

const Qna = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [showContent, setShowContent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/web/qnas");
      const result = response.data;
      if (result.status === "success" && Array.isArray(result.data)) {
        setFaqs(result.data);
      } else {
        console.error("Error fetching FAQs: Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

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
          setFaqs([...faqs, { title, content }]);
          setTitle("");
          setContent("");
          setShowModal(false);
        } else {
          alert("입력 실패!");
        }
      })
      .catch((exception) => {
        alert("입력 중 오류가 발생했습니다.");
      });
  };

  const handleToggleContent = (index) => {
    if (showContent === index) {
      setShowContent(null);
    } else {
      setShowContent(index);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={openModal} className="open-modal-btn">FAQ 추가</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <form onSubmit={handleSubmit} className="faq-form">
              <div>
                <label htmlFor="title">제목: </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="content">내용: </label>
                <input
                  id="content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  required
                ></input>
              </div>
              <button type="submit">FAQ 추가</button>
            </form>
          </div>
        </div>
      )}
      <div className="faq-board">
        <h1>FAQ 게시판</h1>
        <ul>
          {faqs.map((faq, index) => (
            <li key={index} onClick={() => handleToggleContent(index)} className={showContent === index ? "open" : ""}>
              <h2>{faq.title}</h2>
<p>{faq.content}</p>
</li>
))}
</ul>
</div>
</>
);
};

export default Qna;