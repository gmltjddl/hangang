import React, { useState, useContext, useEffect, useRef } from 'react';
import './css/Taximap.css';

const Cruisemap = () => {

    const mapRef = useRef(null);
    useEffect(() => {
      if (mapRef.current) {
        const mapOptions = {
          center: new naver.maps.LatLng(37.5281, 126.9349),
          zoom: 14
        };
        const map = new naver.maps.Map(mapRef.current, mapOptions);
  
        // 마커 생성 및 위치 설정
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(37.5281, 126.9349),
          // position: new naver.maps.LatLng(37.5299, 126.9399),
          title: "Marker"
        });
        
  
        // 마커를 지도에 추가
        marker.setMap(map);
      }
    }, []);

    return (
        <div className='taxi-map-box'>
            <div className="taxi-map" ref={mapRef} ></div>
        </div>
    );
};

export default Cruisemap;