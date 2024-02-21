import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling

const Home = () => {
    const navigate = useNavigate();
    return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to the Library</h1>
        <div className="options">
        <button onClick={()=>navigate('/booklist')} className="home-but">
            {/* <i className="fas fa-book-open"></i> */}
            Enter Library
          </button>
          <button onClick={()=>navigate('/login')} className="home-but">
            <i className="fas fa-user-lock"></i>
            Admin
          </button>
        </div>
      </div>
      <div className="background-image"></div>
    </div>
  );
};

export default Home;
