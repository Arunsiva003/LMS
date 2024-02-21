import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddBookForm from './AddBook';
import DisplayPage from './DisplayPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<DisplayPage/>}/>
        <Route path='/books' element={<AddBookForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
