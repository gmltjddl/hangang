import React from 'react';
import Taxibanner from '../component/Reservationpayment/Taxibanner';
import Taximap from '../component/Reservationpayment/Taximap';
import Taxiinfo from '../component/Reservationpayment/Taxiinfo';

import './css/Cruisepg.css';
import Taxichoose from '../component/Reservationpayment/Taxichoose';

const Taxipg = () => {
    return(
        <div className='cruisepg'>
            <Taxibanner />
            <Taxichoose />
            <Taximap />
            <Taxiinfo />
        </div>
    );
};

export default Taxipg;