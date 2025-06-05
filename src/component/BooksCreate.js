import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function BooksCreate() {
  const [form, setForm] = useState({
    name: '',
    area1: '',
    area2: '',
    area3: '',
    book_cnt: 0,
    owner_nm: '',
    tel_num: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'book_cnt' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://port-0-db-react-back-mbeer0yi973d87dd.sel4.cloudtype.app/books', form)
      .then(() => {
        alert('상품이 등록 완료되었습니다.');
        navigate('/books');
      })
      .catch((err) => {
        console.error(err);
        alert('등록 중 오류가 발생했습니다.');
      });
  };

  return (
    <section className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">상품 등록하기</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">서점명 :</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="area1" className="block mb-1">지역1 :</label>
          <select
            id="area1" name="area1"
            value={form.area1}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">지역을 선택하세요</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
            <option value="경남">경남</option>
            <option value="광주">광주</option>
            <option value="강원">강원</option>
            <option value="대전">대전</option>
            <option value="대구">대구</option>
            <option value="부산">부산</option>
            <option value="제주도">제주도</option>
          </select>
        </div>

        <div>
          <label htmlFor="area2" className="block mb-1">지역2 :</label>
          <select
            id="area2" name="area2"
            value={form.area2}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">지역2를 선택하세요</option>
            <option value="서초">서초</option>
            <option value="성남">성남</option>
            <option value="남구">남구</option>
            <option value="창원">창원</option>
            <option value="서귀포">서귀포</option>
            <option value="수영">수영</option>
            <option value="경기">경기</option>
          </select>
        </div>

        <div>
          <label htmlFor="area3" className="block mb-1">지역3 :</label>
          <select
            id="area3" name="area3"
            value={form.area3}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">지역3를 선택하세요</option>
            <option value="방배">방배</option>
            <option value="분당">분당</option>
            <option value="심곡">심곡</option>
            <option value="광안">광안</option>
            <option value="구기">구기</option>
          </select>
        </div>

        <div>
          <label htmlFor="book_cnt" className="block mb-1">상품개수 :</label>
          <input
            id="book_cnt" type="number" name="book_cnt"
            value={form.book_cnt}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="owner_nm" className="block mb-1">대표자명 :</label>
          <input
            id="owner_nm" name="owner_nm"
            value={form.owner_nm}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="tel_num" className="block mb-1">전화번호 :</label>
          <input
            id="tel_num" name="tel_num"
            value={form.tel_num}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
        >
          신규 상품 등록하기
        </button>
      </form>
    </section>
  );
}
