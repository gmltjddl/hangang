import React from 'react';
import { Modal } from 'react-bootstrap';
import './css/MyReservationModal.css';

const MyReservationModal = ({ show, onHide, reservations }) => {
  const renderReservationInfo = (reservation) => {
    switch (reservation.type) {
      case 'cruise':
        return (
          <div className='reservation-cruise-box'>
            <div className='reservation-header'>
              <span className='reservation-createdDate'>결제 시간 - {reservation.createdDate}</span>
            </div>
            <div className="reservation-details">
              <div>
                <span><p>종류</p> - 크루즈</span>
                <span><p>출발 시간</p> - {reservation.buyer_time}</span>
                <span><p>예약 날짜</p> - {reservation.buyer_date}</span>
              </div>
              <div>
                <span><p>어른</p> - {reservation.adult}  <p>청소년</p> - {reservation.teen}</span>
                <span><p>총 티켓</p> - {reservation.sumticket}</span>
                <span><p>결제 금액</p> - {reservation.paid_amount} 원</span>
              </div>
            </div>
            <div className='reservation-footer' />
          </div>
        );
      case 'taxi':
        return (
          <div className='reservation-cruise-box'>
            <div className='reservation-header'>
              <span className='reservation-createdDate'>결제 시간 - {reservation.createdDate}</span>
            </div>
            <div className="reservation-details">
              <div>
                <span><p>종류</p> - 수상 택시</span>
                <span><p>출발지점</p> - {reservation.startpoint}</span>
              </div>
              <div>
                <span><p>결제 금액</p> - {reservation.paid_amount} 원</span>
                <span><p>도착지점</p> - {reservation.endpoint}</span>
              </div>
            </div>
            <div className='reservation-footer2' />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={onHide} className="reservation-modal" centered>
      <Modal.Header>
      </Modal.Header>
      <Modal.Body>
        <ul className="reservation-list">
          {reservations.map((reservation, index) => (
            <li key={index} className={`reservation-item ${reservation.type}`}>
              {renderReservationInfo(reservation)}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer className='reservation-modal-footer'>
        <button className="reservation-close-btn" onClick={onHide}>
          닫기
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyReservationModal;