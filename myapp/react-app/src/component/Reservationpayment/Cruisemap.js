import React, { useState, useContext, useEffect, useRef } from "react";
import "./css/Cruisemap.css";

const Cruisemap = () => {
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5281, 126.9349),
        zoom: 16,
      };
      const map = new naver.maps.Map(mapRef.current, mapOptions);

      // 마커 생성 및 위치 설정
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5281, 126.9349),
        title: "Marker",
        map: map,
      });

      // 승강장 이름 생성
      const pierName = "크루즈 승강장";

      // InfoWindow 생성
      const infoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding:10px">${pierName}</div>`,
      });

      // 클릭 이벤트 리스너 추가
      naver.maps.Event.addListener(marker, "click", () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });
    }
  }, []);

  return (
    <div className="cruise-map-box">
      <div className="cruise-map" ref={mapRef}></div>
    </div>
  );
};

export default Cruisemap;
