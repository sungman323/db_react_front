import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AlertContext, AlertProvider } from './AlertContext';
import './App.css';
import Main from './component/Main';
import Goods from './component/Goods';
import Update from './component/Update';
import Create from './component/Create';
import Qna from './component/Qna';
import LogIn from './component/LogIn';
import Books from './component/Books';
import BooksCreate from './component/BooksCreate';
import BooksUpdate from './component/BooksUpdate';
import Fruits from './component/Fruits';
import FruitsCreate from './component/FruitsCreate';
import FruitsUpdate from './component/FruitsUpdate';
import LoginRegister from './component/LoginRegister';
import Login2 from './component/Login2';
import Register2 from './component/Register2';


function AppContent() {
  const {questionCount, goodsCount, booksCount, fruitsCount} = React.useContext(AlertContext);
  return (
    <BrowserRouter> {/* 브라우저의 라우터 범위를 설정 */}
      <header>
        <h1>Frontend 세팅 - React + MySQL(메인페이지)</h1>
        <nav>
          <Link to='/'>Home</Link>&nbsp;&nbsp;
          <Link to='/goods/'>Goods{
            goodsCount>0 &&(
              <span style={{
                display:'inline-block',
                marginLeft:'6px',
                background:'red',
                color:'white',
                borderRadius:'50%',
                width:'22px',
                height:'22px',
                fontSize:'14px',
                textAlign:'center',
                lineHeight:'22px',
                fontWeight:'bold'
              }}>{goodsCount}</span>
            )
          }</Link>
          <Link to='/books/'>Books{
            booksCount>0 &&(
              <span style={{
                display:'inline-block',
                marginLeft:'6px',
                background:'red',
                color:'white',
                borderRadius:'50%',
                width:'22px',
                height:'22px',
                fontSize:'14px',
                textAlign:'center',
                lineHeight:'22px',
                fontWeight:'bold'
              }}>{booksCount}</span>
            )
          }</Link>
          <Link to='/fruits/'>Fruits{
            fruitsCount>0 &&(
              <span style={{
                display:'inline-block',
                marginLeft:'6px',
                background:'red',
                color:'white',
                borderRadius:'50%',
                width:'22px',
                height:'22px',
                fontSize:'14px',
                textAlign:'center',
                lineHeight:'22px',
                fontWeight:'bold'
              }}>{fruitsCount}</span>
            )
          }</Link>
          
          <Link to='/question/'>Question{
            questionCount>0 &&(
              <span style={{
                display:'inline-block',
                marginLeft:'6px',
                background:'red',
                color:'white',
                borderRadius:'50%',
                width:'22px',
                height:'22px',
                fontSize:'14px',
                textAlign:'center',
                lineHeight:'22px',
                fontWeight:'bold'
              }}>{questionCount}</span>
            )
          }</Link>
          <Link to='/login/'>Log-in</Link>
          <Link to='/login2/'>Log-in2</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/goods/' element={<Goods />} />
          <Route path="/goods/update/:g_code" element={<Update />} />
          <Route path="/goods/create" element={<Create />} />
          
          <Route path='/books' element={<Books />} />
          <Route path='/books/update/:num' element={<BooksUpdate />} />
          <Route path='/books/create' element={<BooksCreate />} />

          <Route path='/fruits' element={<Fruits />} />
          <Route path='/fruits/update/:num' element={<FruitsUpdate />} />
          <Route path='/fruits/create' element={<FruitsCreate />} />

          <Route path='/question/' element={<Qna />} />
          <Route path='/login/' element={<LogIn />} />
          <Route path='/loginregister/' element={<LoginRegister />} />
          <Route path='/login2/' element={<Login2 />} />
          <Route path='/register2/' element={<Register2 />} />
        </Routes>
      </main>

      <footer>
        <address>Copyright&copy;2025 Backend&Frontend allrights reserved.</address>
      </footer>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AlertProvider>
      <AppContent />
    </AlertProvider>
  );
}

export default App;
