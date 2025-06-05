import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register2(props) {
  const [form, setForm] = useState({username:'',password:'',password2:'',tel:'',email:''});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.password !== form.password2){
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try{
      await axios.post('https://port-0-db-react-back-mbeer0yi973d87dd.sel4.cloudtype.app/register2', {
        username:form.username, password:form.password, tel:form.tel, email:form.email
      });
      alert('회원가입 성공');
      navigate('/login2/');
    } catch(err){
      setError('회원가입 실패 : 아이디 존재 or 서버 오류');
    }
  }
  
  return (
    <section>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">아이디 : </label>
          <input type="text" name='username' id='username' placeholder='아이디를 입력하세요.' value={form.username} onChange={handleChange} required />
        </p>
        <p>
          <label htmlFor="password">패스워드 : </label>
          <input type="password" name='password' id='password' placeholder='비밀번호를 입력하세요.' value={form.password} onChange={handleChange} required />
        </p>
        <p>
          <label htmlFor="password2">패스워드 확인 : </label>
          <input type="password" name='password2' id='password2' placeholder='비밀번호 확인' value={form.password2} onChange={handleChange} required />
        </p>
        <p>
          <label htmlFor="tel">전화번호 : </label>
          <input type="tel" name='tel' id='tel' pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" placeholder='010-0000-0000' value={form.tel} onChange={handleChange} required />
        </p>
        <p>
          <label htmlFor="email">이메일 : </label>
          <input type="email" name='email' id='email' placeholder='email@domain.com' value={form.email} onChange={handleChange} required />
        </p>
        <button type='submit'>회원가입</button>
        {error&&<p style={{color:'red'}}>{error}</p>}
      </form>

    </section>
  );
}

export default Register2;
