
import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import AddBookForm from './AddBook';
import DisplayPage from './DisplayPage';
import Home from './Home';
import Login from './Login';
import axios from 'axios';
import BookPreview from './BookPreview';
import AdminBookList from './AdminDisplayPage';
// import { useNavigate } from 'react-router-dom';

function App() {
  // const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('https://flightbooking-5g0z.onrender.com/login', {
        username,
        password,
      });
      console.log(response.data);
      setLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error.response.data);
      if(error.response.data==="Invalid credentials") alert("Invalid Credentials! Please register");
    }
  };

  // const handleRegister = async (username, password) =>{
  //   try{
  //     await axios.post('https://flightbooking-5g0z.onrender.com/register', {
  //       username,
  //       password,
  //     })
  //     setRegistered(true);
  //   }catch(err){
  //     console.error("Register failed",err.response.data)
  //   }
  // }


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={loggedIn ? <Navigate to='/books' /> : <Login handleLogin={handleLogin}/>}/>
        <Route path='/books' element={loggedIn? <AddBookForm/> : <Navigate to='/'/>}/>
        <Route path='/adminbooks' element={loggedIn ? <AdminBookList/> : <Navigate to='/'/>}/>
        <Route path='/booklist' element={<DisplayPage/>}/>
        <Route path='/bookpreview/:bookId' element = {<BookPreview/>}/>



      
      </Routes>
    </Router>
  );
}

export default App;
