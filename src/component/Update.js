import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Update(props) {
  const {g_code} = useParams();
  const [form, setForm] = useState({
    g_code:'', g_name:'', g_cost:''
  });

  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`https://port-0-db-react-back-mbeer0yi973d87dd.sel4.cloudtype.app/goods/${g_code}`)
    .then(res=>{
      // console.log('서버 응답값 : ', res.data);
      setForm(res.data);
    })
    .catch(err => console.log('조회 오류 : ', err));
  },[g_code]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`https://port-0-db-react-back-mbeer0yi973d87dd.sel4.cloudtype.app/goods/update/${g_code}`,{
      g_name:form.g_name, g_cost:form.g_cost
    })
    .then(()=>{
      alert('상품 정보를 수정하였습니다.');
      navigate('/goods');
    })
    .catch(err => console.log('수정 오류 : ', err));
  }

  return (
    <div>
      <h3>goods 상품수정 페이지</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label>코드번호 : </label>
          <input type="text" name="g_code" value={form.g_code} readOnly />
        </p>
        <p>
          <label htmlFor="g_name">상품명 : </label>
          <input type="text" id="g_name" name="g_name" onChange={handleChange} value={form.g_name} required />
        </p>
        <p>
          <label htmlFor="g_cost">가격 : </label>
          <input type="number" id="g_cost" name="g_cost" onChange={handleChange} value={form.g_cost} required />
        </p>
        <button type='submit'>수정하기</button>
      </form>
    </div>
  );
}

export default Update;
