import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton = ({ postId, loggedInUser }) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const userId = loggedInUser;


  useEffect(() => {
    fetchLikes();
  }, []);
  const fetchLikes = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/web/likes/${postId}`);
      console.log(response.data)
    //   console.log(loggedInUser)
      console.log(response.data.data.length);
      setLikes(response.data.data.length);
      const isLiked = response.data.some((like) => like.user.no === `${userId}`);
      setLiked(isLiked);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

    const handleLike = async () => {
        // if (loggedInUser === null) {
        //  console.log("User not logged in.");
        // return;
        // }
    try {
      if (liked) {
        await axios.delete(`http://localhost:8080/web/likes/${postId}`);
      } else {
        await axios.post(`http://localhost:8080/web/likes/${postId}`);
      }
      setLiked(!liked);
      fetchLikes();
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  return (
    <button onClick={handleLike}>
      {liked ? 'Unlike' : 'Like'} ({likes})
    </button>
  );
};

export default LikeButton;
