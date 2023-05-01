import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './css/Calendar.css';
import Time from './Time';


const CustomCalendar = () => {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  console.log(selectedDate);


  const handleDateChange = (date) => {
    if (moment(date).isBefore(moment().startOf('day'))) {
      alert('예약할 수 없는 날입니다.');
    } else {
      onChange(date);
      setSelectedDate(moment(date).format("YY-MM-DD"));
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const minDate = moment().startOf('month').toDate();
  const maxDate = moment().add(1, 'month').endOf('month').toDate();

  // 토요일 날짜에 스타일을 적용합니다.
  const saturdayStyle = ({ date }) => {
    const dayOfWeek = moment(date).day();
    return dayOfWeek === 6 ? 'saturday' : null;
  };

  return (
    <div>
      
      <Calendar
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format("DD")}
        value={value}
        minDetail="month"
        maxDetail="month"
        navigationLabel={null}
        showNeighboringMonth={false}
        className="mx-auto w-full text-sm border-b"
        minDate={minDate}
        maxDate={maxDate}
        next2Label={null}
        prev2Label={null}
        tileClassName={saturdayStyle} // 토요일 스타일을 적용하는 함수 추가
      />
      
      <Time 
      show={showModal} onHide={closeModal} 
      date={selectedDate}
      />

    </div>
    
  );
};

export default CustomCalendar;