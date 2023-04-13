import React, { useEffect } from "react";
import './css/Banner.css';

  function Banner() {
    useEffect(() => {
      const handleScroll = () => {
        let value = window.scrollY;
  
        const bannerText = document.querySelector("h1");
        const bannerText2 = document.querySelector("p");
        const bannerText3 = document.querySelector(".a");
        if (value > 150) {
          bannerText.style.animation = "disappear 1s ease-out forwards";
          bannerText2.style.animation = "disappear 1.2s ease-out forwards";
          bannerText3.style.animation = "disappear 1.5s ease-out forwards";
        } else {
          bannerText.style.animation = "slide 1s ease-out";
          bannerText2.style.animation = "slide 1.2s ease-out";
          bannerText3.style.animation = "slide 1.5s ease-out";

        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
  return (
    <div>
      <section className="banner">
        <div className="banner-text">
          <h1>새로운 경험,기억<br />HANGANG</h1>
          <p>HANGANG으로 간편하게 경험하세요.</p>
          <a href="#" className="a">자세히 알아보기</a>
        </div>
      </section>
    </div>
  )
}

export default Banner