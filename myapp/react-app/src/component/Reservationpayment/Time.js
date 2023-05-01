import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./css/Time.css";
import Pg from "../PG/Pg";

const ADULT_TICKET_PRICE = 200;
const TEEN_TICKET_PRICE = 100;

const initialSeatsRemaining = {
  "12:00": 150,
  "13:00": 150,
  "14:00": 150,
  "15:00": 150,
  "16:00": 150,
  "17:00": 150,
};

const calculateTotalTickets = (adult, teen) => {
  return adult + teen;
};

const calculateTotalPrice = (adult, teen) => {
  return adult * ADULT_TICKET_PRICE + teen * TEEN_TICKET_PRICE;
};

const onPaymentComplete = (success) => {
  if (success) {
    updateSeatsRemaining(time, sumticket);
  }
};

const Time = ({ show, onHide, date, customModalStyle }) => {
  const [time, setTime] = useState("");
  const [adult, setAdult] = useState(0);
  const [teen, setTeen] = useState(0);
  const [sumticket, setSumticket] = useState(0);
  const [sumprice, setSumprice] = useState(0);
  const [seatsRemaining, setSeatsRemaining] = useState(initialSeatsRemaining);


  const defaultModalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };


  const updateSeatsRemaining = (time, ticketsBooked) => {
    setSeatsRemaining((prevSeatsRemaining) => ({
      ...prevSeatsRemaining,
      [time]: prevSeatsRemaining[time] - ticketsBooked,
    }));
  };

  const modalStyle = customModalStyle ? customModalStyle : defaultModalStyle;

  return (
    <div className="gdetail-modal-box">
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="true"
        className="Gallerydetail-modal-box"
        style={modalStyle}
      >
        <Modal.Body>
          <div className="timemodalclick">
            <div className="timemodal">
              <h2 className="ticket-booking-title">티켓 예매</h2>
              <form className="timereservation-form">
                <div className="timeform-group">
                  <label htmlFor="date">날짜:</label>
                  <input className="timeform-control" value={date} readOnly />
                </div>
                <div className="timeform-group">
                  <label htmlFor="time">시간:</label>
                  <select
                    className="timeform-control"
                    id="time"
                    name="time"
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option defaultChecked>시간을 선택하세요</option>
                    {Object.entries(seatsRemaining).map(([time, seats]) => (
                      <option key={time} value={time}>
                        {time} (잔여석: {seats})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="timeform-group">
                  <label htmlFor="adult">어른:</label>
                  <input
                    className="timeform-control"
                    type="number"
                    id="adult"
                    name="adult"
                    min="0"
                    value={adult}
                    onChange={(e) => {
                  const updatedAdult = parseInt(e.target.value) || 0;
                  setAdult(updatedAdult);
                  setSumticket(calculateTotalTickets(updatedAdult, teen));
                  setSumprice(calculateTotalPrice(updatedAdult, teen));
                }}
                />
              </div>
              <div className="timeform-group">
                <label htmlFor="teen">청소년:</label>
                <input
                  className="timeform-control"
                  type="number"
                  id="teen"
                  name="teen"
                  min="0"
                  value={teen}
                  onChange={(e) => {
                  const updatedTeen = parseInt(e.target.value) || 0;
                  setTeen(updatedTeen);
                  setSumticket(calculateTotalTickets(adult, updatedTeen));
                  setSumprice(calculateTotalPrice(adult, updatedTeen));
                }}
                />
              </div>
              <div className="timeform-group">
                <label htmlFor="total-tickets">
                  티켓 총 개수: {sumticket}
                </label>
              </div>
              <div className="timeform-group">
                <label htmlFor="total-price">총 가격: {sumprice}</label>
              </div>
              </form>
              <Pg
                date={date}
                time={time}
                adult={adult}
                teen={teen}
                sumprice={sumprice}
                sumticket={sumticket}
                onPaymentComplete={onPaymentComplete}
              />

              <div className="pgcancelbnt" onClick={onHide}>
              취소
            </div>
            </div>
            </div>
            </Modal.Body>
            </Modal>
            </div>
            );
            };

            export default Time;