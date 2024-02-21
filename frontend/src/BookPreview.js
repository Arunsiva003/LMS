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
          <h2 className="book-title">{book.book_title}</h2>
          <p className="book-author">Author: {book.author}</p>
          <div className="book-content">{book.book_preview}</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookPreview;
