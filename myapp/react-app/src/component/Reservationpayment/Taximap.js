import React, { useState, useContext, useEffect, useRef } from 'react';
import './css/Taximap.css';

const Cruisemap = () => {

    const mapRef = useRef(null);
    useEffect(() => {
      if (mapRef.current) {
        const mapOptions = {
          center: new naver.maps.LatLng(37.51191, 126.98289),
          zoom: 14
        };
        const map = new naver.maps.Map(mapRef.current, mapOptions);

        // 여러 개의 위치를 포함하는 배열 생성
        const markerPositions = [
          { lat: 37.51696, lng: 126.96869, info: '이촌나루터 수상택시 승강장' },
          { lat: 37.51930, lng: 126.99583, info: '서빙고 수상택시 승강장' },
          { lat: 37.50640, lng: 126.97939, info: '동작역 수상택시 승강장' },
          { lat: 37.50981, lng: 126.99302, info: '서래나루 수상택시 승강장' },
          { lat: 37.51309, lng: 126.99907, info: '반포 수상택시 승강장' },
        ];

        // 각 위치에 마커 생성 및 클릭 이벤트 추가
        markerPositions.forEach((position, index) => {
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(position.lat, position.lng),
            title: "Marker"
          });

          // 마커를 지도에 추가
          marker.setMap(map);

          // 클릭 이벤트 리스너 추가
          naver.maps.Event.addListener(marker, 'click', () => {
            const infoWindow = new naver.maps.InfoWindow({
              content: `<div style="padding:3px; font-size: 11px;">${position.info}</div>`
            });

            // 기존에 열린 정보 창이 있다면 닫기
            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              infoWindow.open(map, marker);
            }
          });
        });
      }
    }, []);

    return (
        <div className='taxi-map-box'>
            <div className="taxi-map" ref={mapRef} ></div>
        </div>
    );
};

export default Cruisemap;