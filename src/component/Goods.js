import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Goods(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {setGoodsCount} = useContext(AlertContext);

  // 페이지 번호 저장을 위한 상태변수 선언
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지 보여지는 게시물 개수

  // 페이지 계산 공식
  const indexOfLast = currentPage * itemsPerPage; // 페이지 마지막 번호
  const indexOfFirst = indexOfLast - itemsPerPage; // 페이지 시작 번호

  const currentItems = data.slice(indexOfFirst, indexOfLast); // 페이지 시작 번호부터 마지막 번호까지 데이터 나눔

  const totalPage = Math.ceil(data.length/itemsPerPage); // 페이지 수 계산(올림)

  // 페이지 번호 배열(5개 동적 배열)
  let startPage = totalPage>=5?(Math.max(1, currentPage-2)>totalPage-4?totalPage-4:Math.max(1, currentPage-2)):1;
  let LastPage = totalPage>=5?(Math.min(totalPage, currentPage+2)<5?5:Math.min(totalPage, currentPage+2)):totalPage;
  
  const pageNumbers = Array.from({length:LastPage - startPage + 1}, (_,i) => startPage+i);

  const loadData=()=>{
    // 비동기 방식을 이용해 데이터를 불러온다.
    axios.get('http://localhost:9070/goods/')
    .then(res=>{
      setData(res.data);
      setGoodsCount(res.data.length);
    }) // 성공 시 데이터를 저장
    .catch(err=>console.log(err)) // 실패 시 에러 출력
  }

  useEffect(()=>{
    loadData();
  })

  const delData = (g_code) => {
    if(window.confirm('정말 삭제하시겠습니까?')){
      axios.delete(`http://localhost:9070/goods/${g_code}`)
      .then(() => {
        alert('삭제되었습니다.');
        loadData();
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <section>
      <h2>Goods 페이지</h2>
      <table>
        <caption>Goods Data</caption>
        <thead>
          <tr>
            <th>g_code</th>
            <th>g_name</th>
            <th>g_cost</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(data => (
            <tr key={data.g_code}>
              <td>{data.g_code}</td>
              <td>{data.g_name}</td>
              <td>{Number(data.g_cost).toLocaleString()}</td>
              <td>
                <button onClick={()=>{navigate(`/goods/update/${data.g_code}`)}}>수정</button>&nbsp;
                <button onClick={()=>{delData(data.g_code)}}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      
      </table>
      <p style={{marginTop:'20px', textAlign:'center', width:'600px', margin:'20px auto'}}>
        {/* 이전 버튼 */}
        {currentPage > 1 &&(
          <button onClick={()=>setCurrentPage(currentPage-1)}>이전</button>
        )}
      {/* 페이지 번호 출력 */}
        {pageNumbers.map(number => (
          <button style={{
            backgroundColor: currentPage === number ? '#4caf50' : '#f0f0f0',
            color: currentPage === number ? '#fff':'#000',
            margin:'0px 3px',
            padding: '5px 10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }} key={number} onClick={()=>setCurrentPage(number)}>
            {number}
          </button>
        ))}
        {/* 다음 버튼 */}
        {currentPage < totalPage &&(
          <button onClick={()=>setCurrentPage(currentPage+1)}>다음</button>
        )}
      </p>
      {/* 상품 등록 버튼 */}
      <p style={{marginTop:'20px', textAlign:'right', width:'600px', margin:'20px auto'}}>
        <button onClick={()=>navigate('/goods/create/')}>상품 등록</button>
      </p>
    </section>
  );
}

export default Goods;