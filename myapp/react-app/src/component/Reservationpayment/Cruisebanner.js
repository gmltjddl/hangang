import React, { useState, useEffect } from 'react';
import './css/Cruisebanner.css';

const Cruisebanner = () => {
  const [bgImageIndex, setBgImageIndex] = useState(0);
  const bgImages = [
    'https://cdn.discordapp.com/attachments/1080021402117226547/1102319144361283655/1.png?width=729&height=709',
    'https://cdn.discordapp.com/attachments/1080021402117226547/1102319144835219607/2.png?width=729&height=709',
    'https://cdn.discordapp.com/attachments/1080021402117226547/1102319145615380501/5.png?width=729&height=709',
    'https://cdn.discordapp.com/attachments/1080021402117226547/1102319145183359198/4.png?width=729&height=709'
  ];

  useEffect(() => {
    const changeBgImage = () => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    };

    const intervalId = setInterval(changeBgImage, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <section
        className="cruisebanner"
        style={{
          backgroundImage: `url(${bgImages[bgImageIndex]})`,
        }}
      ></section>
    </div>
  );
};

export default Cruisebanner;