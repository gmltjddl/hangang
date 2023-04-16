import React, { useState } from "react";
import "./css/Galleryaddcomment.css";
import axios from "axios";

const Gallerycomment = () => {
  const [content, setContent] = useState("");

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAddComment = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("content", content);

    if (content.trim() !== "") {
      axios
        .post("http://localhost:8080/web/comments", formData) // Fix the content value here
        .then((response) => {
          console.log(response.data.data);
          setContent("");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("댓글 내용을 입력해주세요.");
    }
  };

  return (
    <>
      <div className="gcomment-add">
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            placeholder="댓글 작성..."
            value={content}
            onChange={handleContentChange}
          />
          <button type="submit">게시</button>
        </form>
      </div>
    </>
  );
};

export default Gallerycomment;
