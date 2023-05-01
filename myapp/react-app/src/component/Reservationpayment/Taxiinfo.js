import React from 'react';
import './css/Taxiinfo.css';

const Cruiseinfo = () => {
  return (
    <div className="taxiinfo-poster">
      <h1>이용안내 및 선착장 위치</h1>
      <h5>30분전 예약은 필수!</h5>
      <h6>*원활하게 이용하실려면 30분전에 예약해주세요.</h6>
      <p></p>
      <h5>최대인원은 4명입니다!</h5>
      <p>현재 수상택시 최대인원은 4명입니다.</p>
      <h2>선착장 위치</h2>
      <p>이촌나루터 수상택시 승강장[서울 용산구 이촌동 302-183]</p>
      <p>서빙고 수상택시 승강장[서울 용산구 서빙고동 286]</p>
      <p>동작역 수상택시 승강장[서울 동작구 동작대로 335-1]</p>
      <p>서래나루 수상택시 승강장[서초구 반포동 115-1]</p>
      <p>반포 수상택시 승강장[서울 서초구 반포동 649-1]</p>
    </div>
  );
};

export default Cruiseinfo;