import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FruitsCreate=()=> {
  //1. 상태 변수를 선언하여 사용자가 입력한 값을 저장한다. 
  const [form, setForm] = useState({
    name:'',
    price:'',
    color:'',
    country:''
  });

  //url주소를 입력하여 요청을 했을 경우 실행.
  const navigate = useNavigate();

  //사용자가 입력을 하면 함수가 호출되어 기존 데이터에 추가 저장
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //상품 등록버튼 클릭시 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();//새로고침 방지

    //택배를 포장하여 편의점에 맡긴다.
    axios.post('https://port-0-db-react-back-mbeer0yi973d87dd.sel4.cloudtype.app/fruits', form) //서버측에 form데이터 전송
    //전송 성공시 실행할 내용
    .then(()=>{
      alert('상품등록이 완료되었습니다.');
      navigate('/fruits'); //데이터 전송이 끝나고 연결되는 페이지 주소임.
    })
    //실패시 실행할 내용
    .catch(err => console.log(err))
  };

  return (
    <div>
      <h3>상품등록</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label for="name">상품명(name)</label> : 
          <input type="text" 
            id="name" 
            name="name" 
            value={form.name}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label for="price">가격(price)</label> : 
          <input type="text" 
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label for="color">컬러(color)</label> : 
          <input type="text" 
            id="color"
            name="color"
            value={form.color}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label for="country">원산지 : </label>
          <select
            id="country" name="country"
            value={form.country}
            onChange={handleChange}
            required
          >
            <option value="">원산지를 선택하세요</option>
            <option value="대한민국">대한민국</option>
            <option value="필리핀">필리핀</option>
            <option value="중국">중국</option>
            <option value="미국">미국</option>
            <option value="일본">일본</option>
            <option value="말레이시아">말레이시아</option>
          </select>
          </p>
          <button type="submit">상품 등록</button>
      </form>
    </div>
  );
}

export default FruitsCreate;
