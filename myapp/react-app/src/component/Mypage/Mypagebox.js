import React, { useState, useContext, useEffect } from 'react';
import './css/Mypagebox.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Mypostlist from './Mypostlist';
import Header from '../Header/Header';
import Followersmodal from '../Follow/Followersmodal';
import Followingmodal from '../Follow/Followingmodal';
import Usercontext from '../../Usercontext';
import axios from "axios";
import MyReservationModal from './MyReservationModal';


const Mypagebox = () => {

  const user = useContext(Usercontext);
  const [data, setData] = useState([]);
  const [MypostlistOn, setMypostlistOn] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  const [followersResponse, setFollowersResponse] = useState({});
  const [followingResponse, setFollowingResponse] = useState({});

  const [showReservationModal, setShowReservationModal] = useState(false);
const [reservations, setReservations] = useState([]);


  useEffect(() => {
    const fetchFollowersAndFollowingCount = async () => {
      try {
        const followersResponse = await axios.get(`http://localhost:8080/web/follows/followers/${user.no}`);
        const followingResponse = await axios.get(`http://localhost:8080/web/follows/following/${user.no}`);

        setFollowersCount(followersResponse.data.data.length);
        setFollowingCount(followingResponse.data.data.length);

        setFollowersResponse(followersResponse);
        setFollowingResponse(followingResponse);

      } catch (error) {
        console.error('Error fetching followers and following counts:', error);
      }
    };

    if (user) {
      fetchFollowersAndFollowingCount();
    }
  }, [user]);
  const openFollowersModal = () => {
    setFollowersList(followersResponse.data.data.map(followerData => followerData.follower.no));

    setShowFollowersModal(true);
  };


  const openFollowingModal = () => {
    setFollowingList(followingResponse.data.data.map(followingData => followingData.followedId));
    setShowFollowingModal(true);
  };

  const fetchMyReservations = async () => {
    try {
      const cruiseReservations = axios.get(`http://localhost:8080/web/payments/${user.email}`);
      const taxiReservations = axios.get(`http://localhost:8080/web/taxipayments/${user.email}`);
  
      const [cruiseResponse, taxiResponse] = await Promise.all([cruiseReservations, taxiReservations]);
  
      const combinedReservations = cruiseResponse.data.data.map(res => ({ ...res, type: 'cruise' }))
      .concat(taxiResponse.data.data.map(res => ({ ...res, type: 'taxi' })));
      console.log(combinedReservations);
      setReservations(combinedReservations);
      setShowReservationModal(true);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };
  

  return (
    <>
      <Mypostlist user={user} show={MypostlistOn} onHide={() => setMypostlistOn(false)} />
      <div className='box-wrap'>
        <div className="follow-box-wrap">
          <div className='Mypagebox-Followers-box' onClick={openFollowersModal}>
            <h1>Followers</h1>
            <span>팔로워 수: {followersCount}</span>
          </div>
          <div className='Mypagebox-Following-box' onClick={openFollowingModal}>
            <h1>Following</h1>
            <span>팔로잉 수: {followingCount}</span>
          </div>
          <Followersmodal
            show={showFollowersModal}
            onHide={() => setShowFollowersModal(false)}
            followers={followersList}
          />
          <Followingmodal
            show={showFollowingModal}
            onHide={() => setShowFollowingModal(false)}
            following={followingList}
          />
        </div>
        <div className="mywrite-box-wrap">
          <h1>내가 쓴 글 목록</h1>
          <span>내가 쓴 GALLERY 글 목록</span>
          <button className="mypostlist-modal" onClick={() => setMypostlistOn(true)}>VIEW</button>
        </div>
        <MyReservationModal
  show={showReservationModal}
  onHide={() => setShowReservationModal(false)}
  reservations={reservations}
/>
        <div className="reservation-box-wrap">
          <h1>내 예약 목록</h1>
          <span>크루즈 예약, 수상 택시 예약 목록</span>
          <button className='myreservation-btn' onClick={fetchMyReservations}>VIEW</button>
        </div>
      </div>
    </>
  )
}

export default Mypagebox;

