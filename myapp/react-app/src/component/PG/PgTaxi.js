import React, { useContext, useState } from "react";
import Usercontext from "../../Usercontext";
import axios from "axios"; // 추가
import '../Reservationpayment/css/Taxichoose.css';
import Swal from "sweetalert2";

const taxiPg = ({ startpoint, endpoint, amount }) => {
  const user = useContext(Usercontext);
  const [name, setName] = useState(user.name);
  const [tel, setTel] = useState(user.tel);
  const [email, setEmail] = useState(user.email);
  // const [imp_uid, setImp_uid] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(user.name && user.tel && user.email);
  console.log(amount);
  
  function onClickPayment() {
    if (!startpoint || !endpoint) {
      Swal.fire(
        '출발지와 목적지를 모두 선택해주세요!',
        '',
        'warning'
      )
      return;
    }

    if (!isLoggedIn) {
      Swal.fire(
        '로그인이 필요합니다!',
        '',
        'warning'
      )
      return;
    }
    var IMP = window.IMP;
    IMP.init("imp52063215");

    const data = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: `${amount}`,
      name: `택시결제:${startpoint}-${endpoint}`,
      buyer_name: `${name}`,
      buyer_tel: `${tel}`,
      buyer_email: `${email}`,
    };

    IMP.request_pay(data, callback);
  }

  async function callback(response) {
    const { success, merchant_uid, error_msg,  imp_uid, buyer_email, name, paid_amount } = response;
    console.log(response);
    if (success) {
      Swal.fire(
        '결제 성공!',
        '',
        'success'
      )
     

      const formData = {
        imp_uid,
        buyer_email,
        buyer_name: name,
        paid_amount,
        startpoint,
        endpoint
      };
      console.log(formData);
      
      try {
        const response = await axios.post(
          `http://localhost:8080/web/taxipayments/taxipayment`,
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200) {
          
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      Swal.fire(
        `결제 실패: ${error_msg}`,
        '',
        'warning'
      )
    }
    
  }
    
  

  return <button className= "taxipgpaymentbnt" onClick={onClickPayment}>결제하기</button>
      

  };

export default taxiPg;