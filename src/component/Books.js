import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Books(props) {
  //1. 상태 변수 선언
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {setBooksCount} = useContext(AlertContext);

  //페이지 번호 저장을 위한 상태 변수 선언
    const [currentPage, setCurrentPage] = useState(1); //초기값
    const itemsPerPage = 5; //한 페이지에 보여지는 게시물 개수
  
    //페이지 계산공식 현재 게시물 수 56개 / 5 = 11페이지
    const indexOfLast = currentPage * itemsPerPage;
  
    //현재 페이지의 첫 인덱스 번호를 계산 10 - 5 = 5,
    const indexOfFirst = indexOfLast - itemsPerPage;
  
    //data 배열 중 현재 페이지에 해당하는 부분만 잘라냅니다. 
    //예: data.slice(5, 10) → data[5], data[6], data[7], data[8], data[9]만 화면에 표시.
    const currentItems = data.slice(indexOfFirst, indexOfLast);
  
    //전체 페이지 수 totalpage = Math.ceil(13 / 5) = 3, 무조건 올림
    //페이지 번호는 게시물이 13개 있는 경우 1, 2, 3까지 나오도록 한다.
    const totalPage = Math.ceil(data.length/itemsPerPage);
  
    //시작번호와 끝번호를 계산 해야 한다.
    let startPage = Math.max(1, currentPage-2);
    let lastPage = Math.min(totalPage, startPage + 4);
  
    //페이지 번호 배열 (1~5를 동적으로 변환되도록 변경해야, 또는 totalPages까지 제한 가능)
    // const pageNumbers = Array.from({length:Math.min(totalPage, 5)},(_,i) => i+1);
    const pageNumbers = Array.from({length:lastPage - startPage + 1}, (_,i)=> startPage+i);
  
  //2. 상품 리스트 조회(출력)
  const loadData=()=>{
    //React비동기 통신
    axios
    //DB에서 json데이터를 불러온다.
    .get('http://localhost:9070/books')
    //성공시 데이터를 변수에 저장
    .then(res=>{
      setData(res.data);
      setBooksCount(res.data.length);
    })
    //실패시 에러 출력
    .catch(err=>console.log(err))
  }

  useEffect(()=>{
      loadData();
  });

  //2. 상품삭제 하기
  const deleteData = (num)=>{
    if(window.confirm('정말 삭제하시겠습니까?')){axios //서버에 del요청 전송하기
      .delete(`http://localhost:9070/books/${num}`)
      //성공일때 아래 내용 실행
        .then(() => {
          alert('삭제되었습니다.');
          loadData(); // 데이터 삭제 후 목록을 다시 갱신해야 한다.

          // 삭제 후 페이지 조정
          //마지막 페이지에 1개만 남아있고 삭제하면, currentPage가 totalPage보다 커질 수 있습니다.
          //이럴 때, 삭제 후 아래와 같이 페이지를 조정하는 것이 UX에 좋습니다.
          
          if ((currentPage - 1) * itemsPerPage >= data.length - 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        })
        //실패일때 에러 출력
        .catch(err => console.log(err));
    }
  };

  return (
    <section>
      <h3>교보문고 DB입력/출력/삭제/수정</h3>
      <p>MYSQL DB에 있는 자료를 출력하고, 자료입력, 삭제, 수정하기를 실습 응용한다.</p>

      <div style={{'height':'360px'}}>
        <table>
          <caption>Book_Store Data</caption>
          <thead>
            <tr>
              <th>No</th>
              <th>서점명</th>
              <th>지역1</th>
              <th>지역2</th>
              <th>지역3</th>
              <th>주문수량</th>
              <th>주문자</th>
              <th>연락처</th>
              <th>메뉴</th>
            </tr>
          </thead>
          <tbody>
            {
            currentItems.map(item=>(
            // data.map(item=>(
              <tr key={item.num}>
                <td>{item.num}</td>
                <td>{item.name}</td>
                <td>{item.area1}</td>
                <td>{item.area2}</td>
                <td>{item.area3}</td>
                <td>{Number(item.BOOK_CNT).toLocaleString()}</td>
                <td>{item.owner_nm}</td>
                <td>{item.tel_num}</td>
                <td>
                  <button onClick={()=>navigate(`/books/update/${item.num}`)}  >수정</button>&nbsp;
                  <button onClick={()=>{
                    deleteData(item.num)}}>삭제</button>
                </td>
              </tr>
            ))           
          }
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
      </div>
    </section>
  );
}

export default Books;