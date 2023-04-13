import { Button } from "react-bootstrap";
import './Gallerylist.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import Gallerywriting from "../Modal/Gallerywriting";
import axios from 'axios';

const Gallerylist = () => {

  const [filepath, setFilepath] = useState([]);
  const [origin_filename, setOrigin_filename] = useState([]);
  const [mime_type, setMime_type] = useState([]);
  const [board_id, setBoard_id] = useState([]);
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [writingmodalOn, setwritingmodalOn] = useState(false);


  useEffect(() => {
    axios.get("http://localhost:8080/web/boards/1")
      .then((response) => {

        return response.data;
      })
      .then((result) => {

         console.log(result.data);
         console.log(result.data.attachedFiles[0]);
        if (result.status === "success") {
          setTitle(result.data.title);
          setContent(result.data.content);
          setFilepath(result.data.attachedFiles[0].filepath);
          setOrigin_filename(result.data.attachedFiles[0].originalFilename);
          setMime_type(result.data.attachedFiles[0].mimeType);
          setBoard_id(result.data.attachedFiles[0].boardNo);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <>
    <div className="body-color">
      <div className="profileemail">
        <h1 className="modifyemail">board_id</h1>
        <input value={board_id} className="emailinputbox"></input>
      </div>
      <div className="profileemail">
        <h1 className="modifyemail">title</h1>
        <input value={title}  className="emailinputbox"></input>
      </div>
      <div className="profileemail">
        <h1 className="modifyemail">content</h1>
        <input value={content}  className="emailinputbox"></input>
      </div>
      <div className="profilenickename">
        <h1 className="modifynickname">filepath</h1>
        <input value={filepath}  className="nicknameinputbox"></input>
      </div>
      <div className="profileemail">
        <h1 className="modifyemail">origin_filename</h1>
        <input value={origin_filename} className="emailinputbox"></input>
      </div>
      <div className="profileemail">
        <h1 className="modifyemail">mime_type</h1>
        <input value={mime_type} className="emailinputbox"></input>
      </div>
  
      <Gallerywriting show={writingmodalOn} onHide={() => setwritingmodalOn(false)} />
      <Button className="Gallerylist-Button" onClick={() => setwritingmodalOn(true)}>Writing</Button>
      </div>
    </>
  )
}

export default Gallerylist