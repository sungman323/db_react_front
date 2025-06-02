import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginRegister(props) {
  const [form, setForm] = useState({username:'',password:'',passwordc:''});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.password !== form.passwordc){
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try{
      await axios.post('http://localhost:9070/loginregister', {
        username:form.username, password:form.password
      });
      alert('회원가입 성공');
      navigate('/login/');
    } catch(err){
      setError('회원가입 실패 : 아이디 존재 or 서버 오류');
    }
  }

  return (
    <section>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="l_id">아이디 : </label><input type="text" id="l_id" name="username" value={form.username} onChange={handleChange} required />          
        </p>
        <p>
          <label htmlFor="l_pw">비밀번호 : </label><input type="password" id="l_pw" name="password" value={form.password} onChange={handleChange} required />
        </p>
        <p>
          <label htmlFor="l_pw_c">비밀번호확인 : </label><input type="password" id="l_pw_c" name="passwordc" value={form.passwordc} onChange={handleChange} required />
        </p>
        <button type="submit">회원가입</button>
        {error&&<p style={{color:'red'}}>{error}</p>}
      </form>
    </section>
  );
}

export default LoginRegister;