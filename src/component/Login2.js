import React, { useState, useEffect } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login2(props) {
  const [form, setForm] = useState({username:'', password:''});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("5d61147810dcd313508dd231e704f618"); // 카카오 JavaScript 키
    }
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        console.log("카카오 로그인 성공:", authObj);

        // 사용자 정보 가져오기
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            console.log("사용자 정보:", res);
          },
          fail: function (error) {
            console.error("사용자 정보 요청 실패:", error);
          },
        });
      },
      fail: function (err) {
        console.error("카카오 로그인 실패:", err);
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('https://port-0-db-react-back-mbeer0yi973d87dd.sel4.cloudtype.app/login2', form);
      localStorage.setItem('token', res.data.token);
      alert('로그인 성공');
      navigate('/');
    } catch(err) {
      setError('로그인 실패');
    }
    
  }

  return (
    
    <section>
      <div className='Login'>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="username">아이디 : </label>
            <input type="text" name='username' id='username' onChange={handleChange} value={form.username} placeholder='아이디를 입력하세요.' />
          </p>
          <p>
            <label htmlFor="password">패스워드 : </label>
            <input type="password" name='password' id='password' onChange={handleChange} value={form.password} placeholder='비밀번호를 입력하세요.' />
          </p>
          <button type='submit'>로그인</button>
        </form>
        {error&&<p style={{color:'red', textAlign:'center'}}>{error}</p>}
        <p><Link to='/register2'>회원가입</Link></p>

        <h3>간편로그인</h3>
        <ul className='sns_login'>
          <li><button onClick={handleKakaoLogin}><img src={`${process.env.PUBLIC_URL}/images/Kakao.png`} alt="" /></button></li>
          <li><img src={`${process.env.PUBLIC_URL}/images/Naver.png`} alt="" /></li>
          <li><img src={`${process.env.PUBLIC_URL}/images/Google.png`} alt="" /></li>
        </ul>
      </div>

      <h3>프론트엔드(React)에서 처리</h3>
      <ul>
        <li>로그인 폼을 작성하고 '회원가입' 클릭 하면 회원가입 페이지로 이동하기</li>
        <li>회원가입 시 '아이디(username)', '비밀번호(password)', '전화번호(tel)', '이메일(email)'을 입력하여 회원가입을 할 수 있도록 한다.</li>
        <li>사용자가 '아이디', '패스워드'를 입력하여 '로그인' 버튼 클릭 시 서버 측에 '인증요청'</li>
      </ul>

      <h3>백엔드(Node.js + Express)에서 처리</h3>
      <ul>
        <li>사용자가 입력한 id, pw를 post방식으로 받아 db조회하여 일치하는지 여부에 따라 로그인 처리를 하고 JWT 토큰을 발급함</li>
        <li>데이터베이스(MYSQL) : 사용자 정보를 저장</li>
        <li>보안 : 비밀번호는 bcrypt로 암호화, JWT로 인증을 유지함</li>
      </ul>

      <h3>용어 설명</h3>
      <ul>
        <li>express : 웹 서버 프레임워크</li>
        <li>cors : 크로스 도메인 요청을 허용</li>
        <li>mysql : MySQL 데이터베이스 연결을 위한 라이브러리(npm i mysql)</li>
        <li>bcrypt : 사용자가 입력한 패스워드를 해시 처리(npm i bcrypt)</li>
        <li>jsonwebtoken : JWT 토큰 생성 및 검증(npm i jsonwebtoken)</li>
        <li>app : Express 앱 객체 생성</li>
        <li>port : 서버가 열릴 포트 번호</li>
        <li>SECRET_KEY : JWT 서명 시 사용할 비밀 키</li>
        <li>express.json() : JSON 형식의 요청 본문을 파싱</li>
        <li>bcrypt.compare : 해시 된 비밀번호를 입력한 비밀번호와 비교</li>
      </ul>

      <h3>DB에 입력할 SQL쿼리문</h3>
      <pre>
        {`
        CREATE TABLE users2(
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        tel VARCHAR(255) NOT NULL,
        datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP());
        `}
      </pre>
    </section>
  );
}

export default Login2;
