import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [filters, setFilters] = useState({
    author: '',
    title: '',
    subject: '',
    publishDate: ''
  });

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get('/api/books'); // Replace '/api/books' with your backend endpoint
      setBooks(res.data);
    };

    fetchBooks();
  }, []);

  // Filter books based on filters state
  useEffect(() => {
    const filtered = books.filter(book => {
      return (
        book.author.toLowerCase().includes(filters.author.toLowerCase()) &&
        book.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        book.subject.toLowerCase().includes(filters.subject.toLowerCase()) &&
        book.publish_date.toLowerCase().includes(filters.publishDate.toLowerCase())
      );
    });
    setFilteredBooks(filtered);
  }, [books, filters]);

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Books</h1>
      <div>
        <input
          type="text"
          name="author"
          placeholder="Filter by Author"
          value={filters.author}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Filter by Title"
          value={filters.title}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Filter by Subject"
          value={filters.subject}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="publishDate"
          placeholder="Filter by Publish Date"
          value={filters.publishDate}
          onChange={handleFilterChange}
        />
      </div>
      <ul>
        {currentBooks.map(book => (
          <li key={book.id}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={filteredBooks.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ booksPerPage, totalBooks, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map(number => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DisplayPage;
