import React from 'react';
import CustomCalendar from '../component/Reservationpayment/Calendar';
import Cruisebanner from '../component/Reservationpayment/Cruisebanner';
import Cruisemap from '../component/Reservationpayment/Cruisemap';
import Cruiseinfo from '../component/Reservationpayment/Cruiseinfo';

const Cruisepg = () => {
    return(
        <div className='cruisepg'>
            <Cruisebanner />
            <CustomCalendar />
            <Cruisemap />
            <Cruiseinfo />
        </div>
    );
};

export default Cruisepg;