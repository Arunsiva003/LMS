import React, { useState, useEffect } from 'react';
import './DisplayPage.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const AdminBookList = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);
    const [filters, setFilters] = useState({
      title: '',
      author: '',
      subject: '',
      publish_date: ''
    });
  
    useEffect(() => {
      // Fetch books from the backend
      fetchBooks();
    }, []);
  
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://lmsbackend-hgnr.onrender.com/books');
        const data = response.data;
        setBooks(data);
        console.log(books);
        console.log("resp:",books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filtering
  const filteredBooks = currentBooks.filter((book) =>
  Object.entries(filters).every(([key, value]) => {
    if (key === 'publish_date') {
      // Handle date filtering separately
      const bookDate = new Date(book[key]);
      const filterDate = new Date(value);
      return isNaN(bookDate) || isNaN(filterDate) || bookDate.toDateString() === filterDate.toDateString();
    } else {
      return value === '' ? true : book[key].toLowerCase().includes(value.toLowerCase());
    }
  })
);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: name === 'publish_date' ? new Date(value).toISOString() : value
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };
  const pageNumbers = [];
  const totalBooks = books.length;
  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const formatDate = (dateString) => {
      console.log("date:",dateString)
    if (!dateString) return ''; // Handle undefined case
    const date = new Date(dateString.replace('Z', ''));
    return date.toLocaleDateString('en-US');
  };
  
  return (
    <div className="book-list">
      <h2>Book List</h2>
      <div className="filters">
        <input
          type="text"
          name="title"
          placeholder="Filter by Title"
          value={filters.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Filter by Author"
          value={filters.author}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Filter by Subject"
          value={filters.subject}
          onChange={handleChange}
        />
        <input
          type="date"
          name="publish_date"
          placeholder="Filter by Publish Date"
          value={filters.publish_date}
          onChange={handleChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Subject</th>
            <th>Publish Date</th>
            <th>Count</th>
            <th>Rating</th>
          </tr>
        </thead>

    {filteredBooks.length>0 ? (
    
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.subject}</td>
              <td>{formatDate(book.publish_date)}</td>
              <td>{book.count}</td>
              <td>{book.rating}</td>
              <button onClick={()=>navigate(`/bookpreview/${index+1}`)}className='button'>View Summary</button>
            </tr>
          ))}
        </tbody>
    ) :
    <p>No Data</p>
    }
      </table>
      <div className="pagination">
      {pageNumbers.map(number => (
          <div key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </div>
        ))}
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(books.length / booksPerPage)}>Next</button>
      </div>

      <button onClick={()=>navigate("/adminbooks")} className="submit-button">Add Book</button>
    </div>
  );
};

export default AdminBookList;
