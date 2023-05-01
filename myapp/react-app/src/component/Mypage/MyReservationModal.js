import React from 'react';
import { Modal, Table } from 'react-bootstrap';
import './css/MyReservationModal.css';
const MyReservationModal = ({ show, onHide, reservations }) => {
  return (
    <Modal show={show} onHide={onHide} className="my-reservation-modal">

      <Modal.Body>
        <ul className="reservation-list">
        {reservations.map((reservation, index) => (
  <li key={index} className={`reservation-item ${reservation.type}`}>
    {/* 예약 정보를 출력할 때 reservation.type에 따라 다른 렌더링을 수행하세요 */}
  </li>
))}

        </ul>
      </Modal.Body>
      <Modal.Footer>
        <button className="close-btn" onClick={onHide}>
          닫기
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyReservationModal;
