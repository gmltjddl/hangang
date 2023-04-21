import React, { useState, useRef, useEffect, useContext } from "react";
import './css/Gallerywriting.css';
import { Modal } from "react-bootstrap";
import axios from 'axios';
import Usercontext from '../../Usercontext';

const Gallerymodify = ({ show, onHide, boardNo, userId }) => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const imageInput = useRef();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedImageUrl = previewImages[selectedImageIndex];
  const user = useContext(Usercontext);
  const [images, setImages] = useState([]);


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
    const newPreviewImages = imageFiles.map((imageFile) => URL.createObjectURL(imageFile));
    setPreviewImages([...images, ...newPreviewImages]);
  };
  // console.log(userId, "게시판 멤버 번호");
  // console.log(boardNo, "보드 넘버");

  useEffect(() => {
    handleSubmit();
  }, []);
  const handleSubmit = () => {
    try {
      const response = axios.get(`http://localhost:8080/web/boards/${boardNo}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
    })
    .then((result) => {
      if (result.status === "success") {
          // console.log(result.data);
          // console.log(result.data.title)
          // console.log(result.data.content);
          console.log(result.data.attachedFiles.map((file) => file.filepath));
          // setFilepath(result.data.data.attachedFiles[0].filepath);
          setTitle(result.data.title)
          setContent(result.data.content);
          setImages(result.data.attachedFiles.map((file) => file.filepath));
      }
  })
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

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
                  onChange={handleTitleChange}/>
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
              <div className="Gallerywriting-file-container">
                <div className="Gallerywriting-file-div">
                  <input
                    name="files"
                    type="file"
                    placeholder="file"
                    className="file-input"
                    id="gallwrite-file" required
                    onChange={handleFileChange} // 이벤트 핸들러를 handleFileChange로 변경했습니다.
                    accept="image/*"
                    // style={{ display: "none" }}
                    ref={imageInput}
                    multiple />
                  {previewImages.length > 0 && (
                    <div className="Gallerywriting-preview-image-container" style={{ display: "flex", overflowX: "scroll", whiteSpace: "nowrap" }}>
                      {previewImages.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`preview-${index}`}
                          className="ImagePreview-preview-image"
                          onClick={() => handleImageClick(index)}
                          style={{ display: "inline-block", marginRight: "5px" }}
                        />
                      ))}
                    </div>
                  )}
                  <div className="Gallerywriting-preview-image-box" onClick={onCickImageUpload}>
                    <span className="">사진 추가하기</span>
                  </div>
                </div>
                <div className="Gallerywriting-btn-regist-box">
                  <button id="Gallerywriting-btn-regist" type="submit">등록</button>
                </div>
                <div className="Gallerywriting-btn-cancel-box">
                  <button id="Gallerywriting-btn-cancel" type="reset" onClick={() => { onHide(); handleReset(); }} >취소</button>
                </div>
                <div className="Gallerywriting-signup-box"></div>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Gallerymodify;
