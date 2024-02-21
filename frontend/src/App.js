
import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddBookForm from './AddBook';
import DisplayPage from './DisplayPage';
import Home from './Home';
import Login from './Login';
import axios from 'axios';
import BookPreview from './BookPreview';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
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

  const handleRegister = async (username, password) =>{
    try{
      await axios.post('http://localhost:3001/register', {
        username,
        password,
      })
      setRegistered(true);
    }catch(err){
      console.error("Register failed",err.response.data)
    }
  }


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/books' element={<AddBookForm/>}/>
        <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>
        <Route path='/booklist' element={<DisplayPage/>}/>
        <Route path='/bookpreview/:bookId' element = {<BookPreview/>}/>



      
      </Routes>
    </Router>
  );
}

export default App;
