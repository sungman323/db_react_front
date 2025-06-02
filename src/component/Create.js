import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create(props) {
  const [form, setForm] = useState({g_name:'',g_cost:''});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:9070/goods', form)
      .then(()=>{
        alert('상품이 등록되었습니다.');
        navigate('/goods/');
      })
      .catch(err=>console.log(err));
  }

  return (
    <section>
      <h2>상품 등록하기</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="g_name">상품명 : </label>
          <input type="text" id='g_name' name='g_name' value={form.g_name} onChange={handleChange} required />
        </p>
        <p>
          <label htmlFor="g_cost">가격 : </label>
          <input type="number" id='g_cost' name='g_cost' value={form.g_cost} onChange={handleChange} required />
        </p>
        <button type='submit'>등록하기</button>
      </form>
    </section>
  );
}

export default Create;