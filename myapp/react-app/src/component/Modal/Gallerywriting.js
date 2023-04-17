import React, { useState, useEffect, useRef } from "react";
import './css/Gallerywriting.css';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';

const Gallerywriting = ({ show, onHide }) => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const imageInput = useRef();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const handleReset = () => {
    setTitle("");
    setContent("");
    setFiles([]);
    setPreviewImages([]);
  };


  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);


    // 미리보기 이미지 생성
    const imageFiles = selectedFiles.filter((file) => file.type.startsWith("image/"));
    const previewImages = imageFiles.map((imageFile) => URL.createObjectURL(imageFile));
    setPreviewImages(previewImages);
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
          // window.location.reload();
          // window.location.href = "Gallery";
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
                  id="gallwrite-title" required
                  value={title}
                  onChange={handleTitleChange} />
              </div>

              <div className="Gallerywriting-content-div">
                <textarea
                  name="content"
                  type="text"
                  placeholder="content"
                  className="Gallerywriting-input-box"
                  id="gallwrite-content" required
                  value={content}
                  onChange={handleContentChange} />
              </div>

              <div className="Gallerywriting-file-div">
                <input
                  name="files"
                  type="file"
                  placeholder="file"
                  className="file-input"
                  id="gallwrite-file" required
                  onChange={handleFileChange}
                  ref={imageInput}
                  multiple />
               <div className="Gallerywriting-preview-image-box" onClick={onCickImageUpload}>
                  <span className="">사진 추가하기</span>
                </div>
                {previewImages.map((previewImage, index) => (
                  <img
                    key={index}
                    src={previewImage}
                    alt={`preview-${index}`}
                    className="Gallerywriting-preview-image"
                    width="260px"
                    height="260px"
                    onClick={onCickImageUpload}
                  />
                ))}
              </div>


              <div className="Gallerywriting-btn-regist-box">
                <button id="Gallerywriting-btn-regist" type="submit">등록</button>
              </div>

              <div className="Gallerywriting-btn-cancel-box">
              <button id="Gallerywriting-btn-cancel" type="reset" onClick={() => { onHide(); handleReset(); }} >취소</button>
              </div>
              <div className="Gallerywriting-signup-box"></div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default Gallerywriting;