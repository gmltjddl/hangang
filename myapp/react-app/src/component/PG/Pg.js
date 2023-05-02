import React, { useContext, useState } from "react";
import Usercontext from "../../Usercontext";
import axios from "axios"; // 추가
import  './css/Pg.css';
import Swal from "sweetalert2";
const Pg = ({ time, adult, teen, sumprice, sumticket, date ,props}) => {
  const user = useContext(Usercontext);
  const [name, setName] = useState(user.name);
  const [tel, setTel] = useState(user.tel);
  const [email, setEmail] = useState(user.email);
  // const [imp_uid, setImp_uid] = useState([]);
  
  function onClickPayment() {
    var IMP = window.IMP;
    IMP.init("imp52063215");

    const data = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: `${sumprice}`,
      name: `크루즈예약시간:${date}-${time},어른:${adult},청소년:${teen},총티켓:${sumticket}`,
      buyer_name: `${name}`,
      buyer_tel: `${tel}`,
      buyer_email: `${email}`,
    };

    IMP.request_pay(data, callback);
  }

  async function callback(response) {
    const { success, merchant_uid, error_msg, imp_uid, buyer_email, name, paid_amount } = response;

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
        buyer_date: `${date}`,
        buyer_time: `${time}`,
        adult: `${adult}`,
        teen: `${teen}`,
        sumticket: `${sumticket}`
      };
      console.log(formData);
      
      try {
        const response = await axios.post(
          `http://localhost:8080/web/payments/payment`,
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200) {
          
          console.log(response.data);
          props.onPaymentComplete(true);
        }
      } catch (error) {
        props.onPaymentComplete(false);
        console.error(error);
      }
    } else {
      Swal.fire(
        '결제 실패!',
        `결제 실패: ${error_msg}`,
        'warning'
      )
    }
    
  }
    
  

  return <button className="pgpaymentbnt" onClick={onClickPayment}>결제하기</button>
      

  };

export default Pg;