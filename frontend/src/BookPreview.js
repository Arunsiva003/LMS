import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookPreview.css';

const BookPreview = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookPreview = async () => {
      try {
        const response = await axios.get(`https://lmsbackend-hgnr.onrender.com/book_previews/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error('Failed to fetch book preview:', error);
      }
    };

    fetchBookPreview();
  }, [bookId]);

  return (
    <div className="book-preview-container">
      {book ? (
        <>
          <h1 className="book-title">{book.book_title}</h1>
          <p className="book-author">By {book.author}</p>
          <div className="book-content">
            <h2 className="summary-heading">Summary</h2>
            <p className="summary">{book.book_preview}</p>
          </div>
        </>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
};

export default BookPreview;
