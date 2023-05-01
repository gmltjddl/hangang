import React from 'react';
import { Modal, Table } from 'react-bootstrap';

const MyReservationModal = ({ show, onHide, reservations }) => {

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          내 예약 목록
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Buyer Email</th>
              <th>Buyer Name</th>
              {/* 다른 필요한 열들을 추가하세요 */}
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.payment_id}</td>
                <td>{reservation.buyer_email}</td>
                <td>{reservation.buyer_name}</td>
                {/* 다른 필요한 열들을 추가하세요 */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default MyReservationModal;
