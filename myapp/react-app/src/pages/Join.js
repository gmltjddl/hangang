import React, { useState } from 'react';
import './css/Join.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";



function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [nickName, setNickName] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [interest, setInterest] = useState("");
  const [hobby, setHobby] = useState("");
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(null);
  const [emailStatusMessage, setEmailStatusMessage] = useState("");
  const [isNickNameDuplicated, setIsNickNameDuplicated] = useState(null);
  const [nickNameStatusMessage, setNickNameStatusMessage] = useState("");
  const [passwordStatusMessage, setPasswordStatusMessage] = useState("");
  const checkEmailDuplicated = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/web/members/checkEmail?email=${email}`);
      const result = response.data;
      // console.log(result);
      return result.isDuplicated;
    } catch (error) {
      console.error(error);
    }
  };

  const checkNicknameDuplicated = async (nickName) => {
    try {
      const response = await axios.get(`http://localhost:8080/web/members/checkNickname?nickName=${nickName}`);
      const result = response.data;
      // console.log(response);
      return result.isDuplicated;
    } catch (error) {
      console.error(error);
    }
  };

  const handleNickNameChange = async (event) => {
    setNickName(event.target.value);
  
    if (event.target.value.length > 0) {
      const duplicated = await checkNicknameDuplicated(event.target.value);
      setIsNickNameDuplicated(duplicated);
  
      if (duplicated) {
        setNickNameStatusMessage("중복된 닉네임입니다.");
      } else {
        setNickNameStatusMessage("사용 가능한 닉네임입니다.");
      }
    } else {
      setNickNameStatusMessage("");
    }
  };


  const handleEmailChange = async (event) => {
    setEmail(event.target.value);

    var email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email_regex.test(event.target.value)) {
      setEmailStatusMessage("올바른 이메일 주소를 입력해주세요.");
      setIsEmailDuplicated(null);
    } else {
      const duplicated = await checkEmailDuplicated(event.target.value);
      setIsEmailDuplicated(duplicated);

      if (duplicated) {
        setEmailStatusMessage("중복된 이메일입니다.");
      } else {
        setEmailStatusMessage("사용 가능한 이메일입니다.");
      }
    }
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepasswordChange = (event) => {
    setRepassword(event.target.value);

    if (event.target.value !== password) {
      setPasswordStatusMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordStatusMessage("비밀번호가 일치합니다.");
    }
  };

  const handleTelChange = (event) => {
    const rawValue = event.target.value;
    const formattedValue = formatTel(rawValue);
    setTel(formattedValue);
  };

  const formatTel = (value) => {
    // 한국 휴대전화 형식이라고 가정
    const rawNumbers = value.replace(/\D/g, "");
    const maxLength = 11;

    const formattedArray = [];
    formattedArray.push(rawNumbers.slice(0, 3));

    if (rawNumbers.length > 3 && rawNumbers.length <= maxLength) {
      formattedArray.push(rawNumbers.slice(3, 7));
    }

    if (rawNumbers.length > 7 && rawNumbers.length <= maxLength) {
      formattedArray.push(rawNumbers.slice(7));
    }

    return formattedArray.join("-");
  };



  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleIntroduceChange = (event) => {
    setIntroduce(event.target.value);
  };
  const handleInterestChange = (event) => {
    setInterest(event.target.value);
  };

  const handleHobbyChange = (event) => {
    setHobby(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await validateForm()) {
      const formData = {
        email: email,
        password: password,
        name: name,
        tel: tel,
        nickName: nickName,
        introduce: introduce,
        interest: interest,
        hobby: hobby,

      };
      axios
        .post("http://localhost:8080/web/members", formData)
        .then((response) => {
          const result = response.data;
          if (result.status === "success") {
            if (result.status === "success") {
              Swal.fire({
                title: `${name}님`,
                text: '환영합니다!',
                imageUrl: 'https://mblogthumb-phinf.pstatic.net/20140223_123/ideag_13931495603994NTPg_JPEG/%BA%EA%B6%F3%BF%EE_%BD%BA%C6%BC%C4%BF_%B0%F5_%B6%F3%C0%CE_%BD%BA%C6%BC%C4%BF_04.jpg?type=w2',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
              }).then(() => {
                // window.location.reload();
                window.location.href = "Login";
              });
            }
          } else {
            alert("입력 실패!");
            // console.log(result.data);
          }
        })
        .catch((exception) => {
          alert("입력 중 오류가 발생했습니다.");
          // console.log(exception);
        });
    }
  };



  const validateForm = async () => {
    // 이메일 유효성 검사
    var email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email_regex.test(email)) {
      Swal.fire(
        '회원가입 실패!',
        '올바른 이메일 주소를 입력해주세요.',
        'warning'
      );
      return false;
    }

    // 이메일 중복 검사
    const isDuplicated = await checkEmailDuplicated(email);
    if (isDuplicated) {
      Swal.fire(
        '회원가입 실패!',
        '이미 사용 중인 이메일입니다.',
        'warning'
      );
      return false;
    }


    // 비밀번호 유효성 검사
    if (password.length < 8) {
      Swal.fire(
        '회원가입 실패!',
        '비밀번호는 최소 8자 이상이어야 합니다.',
        'warning'
      );
      return false;
    }

    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*()_+])[\d!@#$%^&*()_+]{8,20}$/;
    if (!passwordPattern.test(password)) {
      Swal.fire(
        '회원가입 실패!',
        '비밀번호는 8~20자의 영문  숫자, 특수문자 조합이어야 합니다.',
        'warning'
      );
      return false;
    }

    // 비밀번호와 재입력한 비밀번호가 일치하는지 검사
    if (password !== repassword) {
      Swal.fire(
        '회원가입 실패!',
        '비밀번호와 재입력한 비밀번호가 일치하지 않습니다.',
        'warning'
      );
      return false;
    }

    // 이름이 입력되었는지 검사
    if (name === "") {
      Swal.fire(
        '회원가입 실패!',
        '이름을 입력해주세요.',
        'warning'
      );
      return false;
    }

    // 닉네임 중복 검사
    const isNicknameDuplicated = await checkNicknameDuplicated(nickName);
    if (isNicknameDuplicated) {
      Swal.fire(
        '회원가입 실패!',
        '이미 사용 중인 닉네임입니다.',
        'warning'
      );
      return false;
    }


    // 모든 유효성 검사가 통과되면 true를 반환
    return true;
  };

  return (
    <div className="join-container">
      <div className="join-box">
        <h1>HANGANG</h1>
        <form id="join-form" onSubmit={handleSubmit}>

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="join-input-box"
            id="email" required
            value={email}
            onChange={handleEmailChange} />
          {isEmailDuplicated !== null && (
            <div
              className="email-status-message"
              style={{
                color: isEmailDuplicated ? "red" : "green",
              }}
            >
              {emailStatusMessage}
            </div>
          )}

<input
          name="password"
          type="password"
          placeholder="password"
          className="join-input-box"
          id="pwd"
          required
          value={password}
          onChange={handlePasswordChange}
        />

        <input
          name="repassword"
          type="password"
          placeholder="repassword"
          className="join-input-box"
          id="repwd"
          required
          value={repassword}
          onChange={handleRepasswordChange}
        />

        <div
          className="password-status-message"
          style={{
            color: password !== repassword ? "red" : "green",
          }}
        >
          {passwordStatusMessage}
        </div>

          <input
            name="name"
            type="text"
            placeholder="Name"
            className="join-input-box"
            id="name" required
            value={name}
            onChange={handleNameChange} />

          <input name="tel"
            type="tel"
            placeholder="Tell"
            className="join-input-box"
            id="tel" required
            value={tel}
            onChange={handleTelChange} />

          <input
            name="nickName"
            type="text"
            placeholder="Nickname"
            className="join-input-box"
            id="nickName" required
            value={nickName}
            onChange={handleNickNameChange}
          />
          {isNickNameDuplicated !== null && (
            <div
              className="nickname-status-message"
              style={{
                color: isNickNameDuplicated ? "red" : "green",
              }}
            >
              {nickNameStatusMessage}
            </div>
          )}




          <input name="introduce"
            type="text"
            placeholder="Introduce"
            className="join-input-box"
            id="introduce" required
            value={introduce}
            onChange={handleIntroduceChange} />

          <input name="interest"
            type="text"
            placeholder="Interest"
            className="join-input-box"
            id="interest" required
            value={interest}
            onChange={handleInterestChange} />

          <input name="hobby"
            type="text"
            placeholder="Hobby"
            className="join-input-box"
            id="hobby" required
            value={hobby}
            onChange={handleHobbyChange} />

          <button id="btn-regist" type="submit">가입하기</button>
          <Link to="/">
          <button id="btn-cancel" type="button">
            가입취소
          </button>
        </Link>

          <div className="join-signup-box"></div>
        </form>
      </div>
    </div>
  );
}
export default Join;