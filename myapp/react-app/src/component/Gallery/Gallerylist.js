import { Button } from "react-bootstrap";
import './Gallerylist.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import Gallerywriting from "../Modal/Gallerywriting";
import axios from 'axios';


const Gallerylist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [writingmodalOn, setwritingmodalOn] = useState(false);

  const fetchData = () => {
    setLoading(true);
    // 데이터를 가져오는 비동기 API 호출 (예: 서버 API)
    axios
      .get("http://localhost:8080/web/boards")
      .then((response) => {
        setData([...data, ...response.data.data]);
        setLoading(false);
        console.log(response.data.data);
       console.log(response.data.data[0].attachedFiles[0].filepath);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []); // 컴포넌트가 마운트될 때만 초기 데이터 로딩

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
    <div className="body-back">
      <div className="gall-list-wrap">
        <Gallerywriting
          show={writingmodalOn}
          onHide={() => setwritingmodalOn(false)}
        />
        <Button
          className="Gallerylist-Button"
          onClick={() => setwritingmodalOn(true)}
        >
          Writing
        </Button>
      </div>
      <div className="gall-list-table-wrap">
      {data.map((item) => (
        <div key={item.no}>
          <table class="gall-list-table" id={`board-table-${item.no}`} border="1">
            <tbody>
              <tr>
                <td><img className="gall-img" src={item.attachedFiles[0].filepath} ></img></td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
    </div>
  );
};


export default Gallerylist;

// const Gallerylist = () => {
//   const [writingmodalOn, setwritingmodalOn] = useState(false);
//   return (
//     <>
//     <div className="body-back">
    
//     </div>
//     <div className="hi"></div>
//       <Gallerywriting show={writingmodalOn} onHide={() => setwritingmodalOn(false)} />
//       <Button className="Gallerylist-Button" onClick={() => setwritingmodalOn(true)}>Writing</Button>
//     </>
//   )
// }

// export default Gallerylist