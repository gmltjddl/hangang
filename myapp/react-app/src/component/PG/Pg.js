import React, { useContext, useState } from "react";
import Usercontext from "../../Usercontext";
import axios from "axios"; // 추가

const Pg = ({ time, adult, teen, sumprice, sumticket, date }) => {
  const user = useContext(Usercontext);
  const [name, setName] = useState(user.name);
  const [tel, setTel] = useState(user.tel);
  const [email, setEmail] = useState(user.email);
  // const [imp_uid, setImp_uid] = useState([]);
  console.log(user);
  console.log(sumprice);
  
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
    const { success, merchant_uid, error_msg,  imp_uid, buyer_email, name, paid_amount } = response;

    if (success) {
      alert("결제 성공");
     

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
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
    
  }
    
  

  return <button onClick={onClickPayment}>결제하기</button>
      

  };

export default Pg;