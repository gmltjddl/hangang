import React, { useEffect, useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Followingmodal.css';
import Usercontext from '../../Usercontext';
import axios from 'axios';

const dummyProfileImage = 'https://via.placeholder.com/40';

const Followingmodal = ({ show, onHide, following }) => {
  const user = useContext(Usercontext);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(dummyProfileImage);
  const [followingProfiles, setFollowingProfiles] = useState([]);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/web/members/${user.no}`)
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        if (result.status === "success") {
          setName(result.data.nickName);
          setProfileImage(result.data.attachedFiles[0].filepath);
        }
      })
      .catch((error) => {
        // 에러 처리
      });
  }, []);

  return (
    <Modal show={show} onHide={onHide} dialogClassName="FollowingModal-custom-modal">
      <Modal.Header closeButton className="border-0">
        <Modal.Title>팔로잉 목록</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center mb-3">
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-circle me-2"
            width="40"
            height="40"
          />
          <span>{name}</span>
        </div>
        <ul className="list-unstyled">
          {following.map((following, index) => (
            <li key={index} className="mb-2 following-item">
              <div className="d-flex align-items-center">
                <img
                  src={dummyProfileImage}
                  alt="Profile"
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                />
                <span>{following}</span>
              </div>
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default Followingmodal;