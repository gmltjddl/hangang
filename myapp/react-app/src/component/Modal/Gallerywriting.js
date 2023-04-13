import React, { useState, useEffect } from "react";
import './css/Gallerywriting.css';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';

const Gallerywriting = ({ show, onHide }) => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    axios
      .post("http://localhost:8080/web/boards", formData)
      .then((response) => {
        const result = response.data;
        if (result.status === "success") {
          window.location.reload();
          window.location.href = "Gallery";
          console.log(result.data);
        } else {
          alert("입력 실패!");
          console.log(result.data);
        }
      })
      .catch((exception) => {
        alert("입력 중 오류가 발생했습니다.");
        // console.log(exception);
      });
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="Gallerywriting-container">
          <div className="Gallerywriting-box">
            <form id="Gallerywriting-form" onSubmit={handleSubmit} encType="multipart/form-data">

              <div className="Gallerywriting-title-div">
                <input
                  name="title"
                  type="text"
                  placeholder="title"
                  className="Gallerywriting-input-box"
                  id="title" required
                  value={title}
                  onChange={handleTitleChange} />
              </div>

              <div className="Gallerywriting-content-div">
                <input
                  name="content"
                  type="text"
                  placeholder="content"
                  className="Gallerywriting-input-box"
                  id="content" required
                  value={content}
                  onChange={handleContentChange} />
              </div>

              <div className="Gallerywriting-file-div">
                <input
                  name="files"
                  type="file"
                  placeholder="file"
                  className="Gallerywriting-input-box"
                  id="file" required
                  onChange={handleFileChange}
                  multiple />
              </div>

              <button id="Gallerywriting-btn-regist" type="submit">등록</button>
              <button id="Gallerywriting-btn-cancel" type="reset">취소</button>

              <div className="Gallerywriting-signup-box"></div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default Gallerywriting;
