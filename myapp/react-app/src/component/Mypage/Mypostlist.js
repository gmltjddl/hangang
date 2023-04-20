import React, { useState, useEffect, useContext } from 'react';
import '../Gallery/css/Gallerylist.css';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import Usercontext from "../../Usercontext";
import GalleryItem from "../Gallery/Galleryitem";
import 'bootstrap/dist/css/bootstrap.css';

const Mypostlist = ({ show, onHide }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [writingmodalOn, setwritingmodalOn] = useState(false);
  const user = useContext(Usercontext);

  useEffect(() => {
    fetchData();
  }, []); // 컴포넌트가 마운트될 때만 초기 데이터 로딩
  const fetchData = async () => {

    setLoading(true);
    console.log(user.no);
    // 

    const response = await axios.get(`http://localhost:8080/web/boards/user/${user.no}`)
      .then((response) => {
        setData([...data, ...response.data.data.sort((a, b) => b.no - a.no)]); // 번호를 내림차순으로 정렬하여 데이터 업데이트
        setLoading(false);
        console.log(response);
        console.log(response.data.data);

      })
      .catch((error) => {
        setLoading(false);
      });
  };


  const handleScroll = () => {
    // 스크롤 이벤트 핸들러
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 컴포넌트가 마운트/언마운트될 때만 스크롤 이벤트 리스너 추가/제거

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{

      }}
    >
      <Modal.Body>
        <div className="Mypostlist-box">
          <div className="Mypostlist-body-back">
            <div className="Mypostlist-list-wrap">
              <Button
                className="Mypostlist-Button"
                onClick={() => setwritingmodalOn(true)}
              >
                Writing
              </Button>
            </div>
            <div className="Mypostlist-list-table-wrap">
              {data.map((item) => (
                <GalleryItem item={item} />
              ))}
              {loading && <div>Loading...</div>}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>


  )
};

export default Mypostlist;