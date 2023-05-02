import React, { useState, useEffect } from 'react';
import './css/Taxibanner.css';

const Cruisebanner = () => {
  const [bgImageIndex, setBgImageIndex] = useState(0);
  const bgImages = [
    'https://cdn.discordapp.com/attachments/1080021402117226547/1102772694719672340/taxi5.png?width=729&height=709',
    'https://cdn.discordapp.com/attachments/1080021402117226547/1102772693725610014/taxi2.png?width=729&height=709',
    'https://cdn.discordapp.com/attachments/1080021402117226547/1102772694056976535/taxi3.png?width=729&height=709',
    'https://cdn.discordapp.com/attachments/1080021402117226547/1102772694447030383/taxi4.png?width=729&height=709'
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
        className="taxibanner"
        style={{
          backgroundImage: `url(${bgImages[bgImageIndex]})`,
        }}
      ></section>
    </div>
  );
};

export default Cruisebanner;