import React, { useState } from 'react';
import './AddBook.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const AddBook = () => {
    const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [publish_date, setpublish_date] = useState('');
  const [count, setCount] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      subject,
      publish_date,
      count: parseInt(count),
      rating: parseInt(rating)
    };

    axios.post('https://lmsbackend-hgnr.onrender.com/books',newBook)
    .then((res)=>console.log("added"))
    .catch((err)=>console.log(err));
    // Clear input fields after submission
    setTitle('');
    setAuthor('');
    setSubject('');
    setpublish_date('');
    setCount('');
    setRating('');
    navigate('/');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Publish Date:</label>
        <input
          type="date"
          value={publish_date}
          onChange={(e) => setpublish_date(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Count:</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">Add Book</button>
    </form>
  );
};

export default AddBook;
