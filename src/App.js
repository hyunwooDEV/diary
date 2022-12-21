import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Nav, InputGroup, Form, Container, ListGroup } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';



function App() {

  let [입력값, 입력값변경] = useState([]);
  let [모달값, 모달값변경] = useState([]);
  let [날짜, 날짜변경] = useState("");
  let [꺼내기, 꺼내기변경] = useState([]);

  {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    var 오늘날짜 = year+'/'+month+'/'+date;
  }

  useEffect(() => {
    if(localStorage.getItem('diarylist')===null)
     localStorage.setItem('diarylist', JSON.stringify([]))
    // 로컬스토리지에 키값으로 'diarylist' 없을때만 [] 초기화
  },[])

  useEffect(() => {
    let data = localStorage.getItem('diarylist')
    if(data) {
      모달값변경(JSON.parse(data))
    }//새로고침시에도 유지되게끔.
  }, [모달값])

  return (
    
    <div className="App">
      <h4>일기장</h4>
        <Container>
          <InputGroup>
            <Form.Control as="textarea" aria-label="With textarea" placeholder={오늘날짜} className="text"
            onChange={(e) => {
              입력값변경(e.target.value);
            }}/>
          </InputGroup>
          <button type="button" className="btn btn-primary btn-lg" onClick={()=>{

            꺼내기 = localStorage.getItem('diarylist')
            꺼내기 = JSON.parse(꺼내기)
            꺼내기.push(입력값)
            꺼내기 = Array.from(꺼내기)
            localStorage.setItem('diarylist', [JSON.stringify(꺼내기)])

            모달값변경(꺼내기);
            날짜변경(오늘날짜);
          }} >저장하기</button>
        { 
          모달값.map(function (a, i) {
            return (
                <Modal 모달값={모달값} i={i} 오늘날짜={오늘날짜}/>
            )
          })
        }
        </Container>
       
        
    </div>
  );
}

function Modal(props) {

  return (
    
  <ListGroup as="ol" className="diarylist">
    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        {props.모달값[props.i]}
      </div>
      <Badge bg="primary" pill>
      {props.오늘날짜}
      </Badge>
    </ListGroup.Item>
  </ListGroup>
  )
}



export default App;
