import React, {useState} from 'react';
import './Login.css';
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handleRememberMeChange = e => setRememberMe(e.target.checked);

  const handleSubmit = e => {
    e.preventDefault();
    if (rememberMe) {
      Cookies.set('email', email, { expires: 30 }); // 쿠키에 이메일을 7일간 저장
    } else {
      Cookies.remove('email'); // 쿠키에서 이메일 삭제
    }
    const formData = new FormData(e.target);
    axios.post('http://localhost:8080/web/auth/login', formData)
      .then(response => response.data)
      .then(result => {
        if (result.status === 'success') {
          window.location.href = '../';
        } else {
          alert('로그인 실패!');
          setEmail('');
          setPassword('');
        }
      })
      .catch(error => {
        alert('로그인 오류!');
        console.error(error);
      });
  };

  return (
    <div class="login-container">
    <div class="login-box">
    <h1>HANGANG</h1>
    <form id="login-form" onSubmit={handleSubmit}>
      <input type="radio" name="usertype" value="member" checked className="admin" />
      <label htmlFor="email">이메일</label>
      <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
      <label htmlFor="password">비밀번호</label>
      <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
      <label>
        <input type="checkbox" name="remember-me" checked={rememberMe} onChange={handleRememberMeChange} />
        이메일 저장하기
      </label>
      <button type="submit" id="btn-login">로그인</button>
    </form>
    <div class="signup-box">
        <p>아직 계정이 없으신가요?</p>
        <a><Link to="/Join" className="join">회원가입</Link></a>
      </div>
    </div>
    </div>

  );
};

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleEmailChange = e => setEmail(e.target.value);
//   const handlePasswordChange = e => setPassword(e.target.value);
//   const handleRememberMeChange = e => setRememberMe(e.target.checked);

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (rememberMe) {
//       document.cookie = `email=${email}; max-age=${60 * 60 * 24 * 7}`;
//     } else {
//       document.cookie = 'email=; max-age=0';
//     }
//     const formData = new FormData(e.target);
//     axios.post('http://localhost:8080/web/auth/login', formData)
//       .then(response => response.data)
//       .then(result => {
//         if (result.status === 'success') {
//           window.location.href = '../';
//         } else {
//           alert('로그인 실패!');
//           setEmail('');
//           setPassword('');
//         }
//       })
//       .catch(error => {
//         alert('로그인 오류!');
//         console.error(error);
//       });
//   };

//   return (
//     <form id="login-form" onSubmit={handleSubmit}>
//                 <input type="radio" name="usertype" value="member" checked className="admin" />
//       <label htmlFor="email">이메일</label>
//       <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
//       <label htmlFor="password">비밀번호</label>
//       <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
//       <label>
//         <input type="checkbox" name="remember-me" checked={rememberMe} onChange={handleRememberMeChange} />
//         이메일 저장하기
//       </label>
//       <button type="submit" id="btn-login">로그인</button>
//     </form>
//   );
// };

export default Login;
