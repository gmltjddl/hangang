import React from 'react';
import './css/Cruiseinfo.css';

const Cruiseinfo = () => {
  return (
    <div className="info-poster">
      <h1>이용안내 및 선착장 위치, 주차장 안내</h1>
      <h5>신분증 지참 필수! 승선신고서 작성 필수!</h5>
      <h6>*청소년인 경우 보호자 확인이 필요합니다.</h6>
      <p><br></br></p>
      <h5>여의도 1주차장 주차시 주차 무료!</h5>
      <p>티켓팅시 승선 신고서에 차량 번호 기재해야 무료 주차가 가능합니다.</p>
      <h2>네비게이션 주소</h2>
      <p>여의도동 86-5[여의도 한강공원 제 1주차장] / 티맵, 카카오내비: 이랜드크루즈 여의도 선착장</p>
      <h2>올림픽대로 잠실방향</h2>
      <p>여의도 밑으로 진입하여 노량진 수산시장 방향으로 들어온 후 주차장 이용</p>
      <h2>올림픽대로 공항방향</h2>
      <p>한강철교를 지나 63빌딩 앞 진입로 이용</p>
    </div>
  );
};

export default Cruiseinfo;