import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import CSS file for styling

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = async () => {
    await handleLogin(username, password);
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form className='login-form'>
        <div className='form-group'>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='input-field'
          />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input-field'
          />
        </div>
        <button type="button" onClick={handleLoginClick} className='login-button'>
          Login
        </button>
        <p>Don't have an account? <Link to="/register" className='register-link'>Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
