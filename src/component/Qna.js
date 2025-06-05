import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AlertContext } from '../AlertContext';
import '../css/Qna.css';

function Qna(props) {
  const [formData, setFormData] = useState({q_name:'',q_tel:'',q_email:'',q_text:''});
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value});
  }
  const {setQuestionCount} = useContext(AlertContext);

  const textLen = 1000-formData.q_text.length;

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{ // 데이터 전송 성공 시
      await axios.post('https://port-0-db-react-back-mbeer0yi973d87dd.sel4.cloudtype.app/question', formData);
      alert('질문이 등록되었습니다.');
      setFormData({q_name:'',q_tel:'',q_email:'',q_text:''});
      setQuestionCount(count => count+1);
      document.getElementById('q_agree').checked = false;
    }
    catch{ // 데이터 전송 실패 시
      alert('오류가 발생되었습니다.')
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className='qnaarea'>
          <h2>정성을 다해 답변을 해드리겠습니다.</h2>
          <div className='qnaform'>
            <div className='left_side'>
              <p>
                <label htmlFor="q_name">성함</label>
                <input type="text" id="q_name" name="q_name" value={formData.q_name} onChange={handleChange} placeholder='성함을 입력해주세요.' required />
              </p>
              <p>
                <label htmlFor="q_tel">전화번호</label>
                <input type="text" id="q_tel" name="q_tel" value={formData.q_tel} onChange={handleChange} placeholder='전화번호를 입력해주세요.' required />
              </p>
              <p>
                <label htmlFor="q_email">이메일</label>
                <input type="email" id="q_email" name="q_email" value={formData.q_email} onChange={handleChange} placeholder='이메일을 입력해주세요.' required />
              </p>
              <p>
                <input type="checkbox" id="q_agree" name="q_agree" required />
                <label htmlFor="q_agree">개인정보 처리방침에 동의합니다.</label>
              </p>
              <button type='submit'>보내기</button>
            </div>
            <div className='right_side'>
              <label htmlFor="q_text">내용</label>
              <p>{textLen.toLocaleString()} / 1,000</p>
              <textarea name="q_text" id="q_text" rows='20' maxLength="1000" value={formData.q_text} placeholder='내용을 입력해주세요.' onChange={handleChange} required></textarea>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Qna;
