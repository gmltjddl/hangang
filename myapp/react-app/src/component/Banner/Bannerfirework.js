import './css/Bannerfirework.css';
import React, { useEffect, useState } from 'react';

function Bannerfirework() {
  const [bgImageIndex, setBgImageIndex] = useState(0); // State to keep track of current background image index
  const bgImages = ['https://media.discordapp.net/attachments/1080021402117226547/1100358858058252390/peak-banner.jpg?width=729&height=729',
  ];

  useEffect(() => {
    // Function to change the background image index every 1 second
    const changeBgImage = () => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    };

    const intervalId = setInterval(changeBgImage, 2000); // Call changeBgImage every 1 second

    return () => {
      clearInterval(intervalId); // Cleanup the interval on unmount
    };
  }, []); // Empty dependency array to run the effect only once on mount

  useEffect(() => {
    const handleScroll = () => {
      let value = window.scrollY;

      const BannerfireworkText = document.querySelector("h1");
      const BannerfireworkText2 = document.querySelector("p");
      const BannerfireworkText3 = document.querySelector(".a");
      if (value > 150) {
        BannerfireworkText.style.animation = "disappear 1s ease-out forwards";
        BannerfireworkText2.style.animation = "disappear 1.2s ease-out forwards";
        BannerfireworkText3.style.animation = "disappear 1.5s ease-out forwards";
      } else {
        BannerfireworkText.style.animation = "slide 1s ease-out";
        BannerfireworkText2.style.animation = "slide 1.2s ease-out";
        BannerfireworkText3.style.animation = "slide 1.5s ease-out";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <section
        className="Bannerfirework"
        style={{
          backgroundImage: `url(${bgImages[bgImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-out',
         }}
      >
        <div className="Bannerfirework-text">
          <h1>새로운 경험, 기억<br />HANGANG</h1>
          <p>HANGANG으로 간편하게 경험하세요.</p>
          <a href="#" className="a">자세히 알아보기</a>
        </div>
      </section>
    </div>
  );
}

export default Bannerfirework;