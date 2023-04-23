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
  const [newImages, setNewImages] = useState([]);
  const [imageFileNos, setImageFileNos] = useState([]);

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
    setNewImages(newPreviewImages);
    setPreviewImages([...images, ...newPreviewImages]);
  };



  const handleImageClick = (index) => {
    if (window.confirm("이미지를 삭제하시겠습니까?")) {
      removePreviewImage(index);
  
      if (index === selectedImageIndex) {
        if (previewImages.length === 1) {
          setSelectedImageIndex(-1);
        } else if (index === previewImages.length - 1) {
          setSelectedImageIndex((prevIndex) => prevIndex - 1);
        }
      } else if (selectedImageIndex > index) {
        setSelectedImageIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  // 미리보기 이미지 삭제
  const removePreviewImage = async (index) => {
    if (index < images.length) { // 기존 이미지 삭제
      const fileNo = imageFileNos[index]; // 삭제할 이미지의 URL
      try {
        const response = await axios.delete(`http://localhost:8080/web/boards/${boardNo}/files/${fileNo}`);
        console.log(response.data);
        const result = response.data;
        console.log(result.data);
  
        if (result.status === "success") {
          alert("이미지가 삭제되었습니다.");
          setImages((prevImages) => prevImages.filter((_, i) => i !== index));
          setPreviewImages((prevPreviewImages) => prevPreviewImages.filter((_, i) => i !== index));
        } else {
          alert("이미지 삭제에 실패했습니다.");
          console.log(result.data)
        }
      } catch (error) {
        alert("이미지 삭제에 실패했습니다.");
      }
    } else { // 새로 추가된 이미지 삭제
      const newIndex = index - images.length;
      setNewImages((prevNewImages) => prevNewImages.filter((_, i) => i !== newIndex));
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== newIndex));
      setPreviewImages((prevPreviewImages) => prevPreviewImages.filter((_, i) => i !== index));
    }
  };
  

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
      const response = axios.get(`http://localhost:8080/web/boards/${boardNo}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
    })
    .then((result) => {
      if (result.status === "success") {

          setTitle(result.data.title)
          setContent(result.data.content);
          const imageUrls = result.data.attachedFiles.map((file) => file.filepath);
          const imageFileNos = result.data.attachedFiles.map((file) => file.no);
          setImageFileNos(imageFileNos);
          setImages(imageUrls);
          setPreviewImages((prevPreviewImages) => [...prevPreviewImages, ...imageUrls]);
      }
  })
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };
  fetchBoardData();
}, []);

const handleUpdate = async (event) => {
  // event.preventDefault();
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("userId", userId);

  const deletedImages = images.filter((_, i) => !previewImages.includes(images[i]));
  deletedImages.forEach((_, index) => {
    formData.append(`deleteImages[${index}]`, deletedImages[index]);
  });

  if (files.length > 0) {
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
  } else {
    formData.append("files", new File([], ""));
  }

  try {
    const response = await axios.put(
      `http://localhost:8080/web/boards/${boardNo}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    const result = response.data;
    console.log(result.data);
    if (result.status === "success") {
      alert("수정되었습니다");
    } else {
      alert("수정실패");
      console.log(result.data)
    }
  } catch (error) {
    alert("연결실패");
  }
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
            <form id="Gallerywriting-form" encType="multipart/form-data">
              <div className="Gallerywriting-title-div">
                <input
                  name="title"
                  type="text"
                  placeholder="title"
                  className="Gallerywriting-input-box"
                  id="gallwrite-title"
                  value={title}
                  onChange={handleTitleChange}/>
              </div> 

              <div className="Gallerywriting-content-div">
                <textarea
                  name="content"
                  type="text"
                  placeholder="content"
                  className="Gallerywriting-input-box"
                  id="gallwrite-content" 
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
                    id="gallwrite-file" 
                    onChange={handleFileChange} // 이벤트 핸들러를 handleFileChange로 변경했습니다.
                    accept="image/*"
                    // style={{ display: "none" }}
                    ref={imageInput}
                    multiple />
                  {previewImages.length > 0 && (
                    <div className="Gallerywriting-preview-image-container" style={{ display: "flex", overflowX: "scroll", whiteSpace: "nowrap" }}>
                      {previewImages.map((url, index) => (
                           <img
                           key={`preview-${index}`} // 고유한 key 값 변경
                           src={url}
                           alt={`preview-${index}`}
                           className="ImagePreview-preview-image"
                           onClick={() => handleImageClick(index)}
                           style={{ display: "inline-block", marginRight: "5px"}}
                         />
                       ))}
                    </div>
                  )}
                  <div className="Gallerywriting-preview-image-box" onClick={onCickImageUpload}>
                    <span className="">사진 추가하기</span>
                  </div>
                  {selectedImageUrl && (
                    <img
                    key={`selected-${selectedImageIndex}`}
                    src={selectedImageUrl}
                    alt={`preview-${selectedImageIndex}`}
                    className="Gallerywriting-preview-image"
                    width="260px"
                    height="260px"
                    onClick={onCickImageUpload}
                    />
                  )}
                </div>
                <div className="Gallerywriting-btn-regist-box">
                <button id="Gallerywriting-btn-regist" onClick={handleUpdate}>등록</button>
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