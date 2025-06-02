import axios from 'axios';
import React, { useState } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';

function LogIn(props) {
  const [formData, setFormData] = useState({username:'',password:''});
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value});
  }
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{  // 성공 시 실행 내용
      const res = await axios.post('http://localhost:9070/login', formData);
      // 사용자 인증이 끝나면 토큰 발급
      localStorage.setItem('token', res.data.token);
      alert('로그인 성공');
      navigate('/');
    } catch(err) {  // 실패 시 실행 내용
      setError('로그인 실패');
    }
  }

  return (
    <section>
      <div className='Login'>
        <h2>로그인 폼</h2>
        <form onSubmit={handleSubmit}>
          <p><label htmlFor='username' style={{display:'none'}}>아이디</label><input type="text" placeholder='아이디' id='username' name='username' value={formData.username} onChange={handleChange} required /></p>
          <p><label htmlFor="password" style={{display:'none'}}>비밀번호</label><input type="password" id='password' name='password' value={formData.password} placeholder='비밀번호' onChange={handleChange} required /></p>
          <p><button type="submit">로그인</button></p>
        </form>
        {error&&<p style={{color:'red', textAlign:'center'}}>{error}</p>}
        <p><Link to='/loginregister'>회원가입</Link></p>
      </div>

      <dl>
        <dt>로그인 구현 전체 구성</dt>
        <dd>프론트엔드(React) : 로그인 폼 작성, 인증 요청</dd>
        <dd>백엔드(Node.js + Express) : 로그인 처리, JWT 토큰발급</dd>
        <dd>데이터베이스(MYSQL) : DB입/출력</dd>
        <dd>보안 : 비밀번호는 bcrypt로 암호화, JWT로 인증을 유지</dd>
      </dl>

      <pre>
        {`
        1. 데이터베이스 테이블 설계
        CREATE TABLE users(
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )

        2. 데이터베이스에 회원정보 입력하기(INSERT INTO)
        INSERT INTO TABLE users(username, password) VALUES('test1', '1234');
        
        3. UI화면 설계 - 로그인폼 구현
        `}
      </pre>
    </section>
  );
}

export default LogIn;