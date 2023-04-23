import React, { useEffect, useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Followersmodal.css';
import Usercontext from '../../Usercontext';
import axios from 'axios';

const dummyProfileImage = 'https://via.placeholder.com/40';

const Followersmodal = ({ show, onHide, followers }) => {
  const user = useContext(Usercontext);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(dummyProfileImage);
  const [followersProfiles, setFollowersProfiles] = useState([]);

  const fetchFollowersProfiles = async (followers) => {
    try {
      const profiles = await Promise.all(
        followers.map(async (follower) => {
          const response = await axios.get(
            `http://localhost:8080/web/members/${follower.id}`
          );
          const profileData = response.data;
          if (profileData.status === "success") {
            return {
              member_id: follower.id,
              filepath: profileData.data.attachedFiles[0].filepath,
            };
          } else {
            return {
              member_id: follower.id,
              filepath: dummyProfileImage,
            };
          }
        })
      );
      return profiles;
    } catch (error) {
      console.error("Error fetching followers profiles:", error);
      return [];
    }
  };

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

    fetchFollowersProfiles(followers).then((profiles) => {
      setFollowersProfiles(profiles);
    });
  }, [followers]);
  return (
    <Modal show={show} onHide={onHide} dialogClassName="FollowersModal-custom-modal">
      <Modal.Header closeButton className="border-0">
        <Modal.Title>팔로워 목록</Modal.Title>
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
          {followers.map((follower, index) => {
            const profile = followersProfiles.find(
              (profile) => profile.member_id === follower.id
            );
            const profileImage = profile ? profile.filepath : dummyProfileImage;
            return (
              <li key={index} className="mb-2 follower-item">
                <div className="d-flex align-items-center">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                  <span>{follower.nickName}</span> {/* 팔로워 이름 출력 */}
                </div>
              </li>
            );
          })}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default Followersmodal;
