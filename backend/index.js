const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

app.get('/book_previews/:id', (req, res) => {
  const { id } = req.params;
  const q = 'SELECT id, book_id, book_title, author, LEFT(book_content, 100) AS book_preview FROM book_preview WHERE id = ?';
  db.query(q, [id], (err, rows) => {
      if (err) {
          console.log(err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
      }
      if (rows.length === 0) {
          res.status(404).json({ message: 'Book preview not found' });
          return;
      }
      res.status(200).json(rows[0]);
  });
});

app.get('/books',(req,res)=>{
    const q = 'select * from books';
    db.query(q,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({message:"failed to retrieve books"});
        }
        res.json(result)
    })
})

app.post('/books',(req,res)=>{
    const data = req.body;
    console.log(data);
    const q = 'insert into books (title, author, subject, publish_date, count, rating) values (?,?,?,?,?,?)';
    db.query(q,[data.title, data.author, data.subject, data.publish_date, data.count, data.rating], (err,result)=>{
        if(err){
            console.log(err);
            res.status(400).json("failed");
            return;
        }
        res.status(201).json({message:"added"})
    })
})


app.put('/books/visits/:book_id', (req, res) => {
  const bookId = req.params.book_id;
  console.log(bookId);
  // Check if the book_id exists
  const selectQuery = 'SELECT * FROM books_visits WHERE book_id = ?';
  db.query(selectQuery, [bookId], (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      // Book_id exists, increment vis_cnt by one
      console.log("incrementing");
      const updateQuery = 'UPDATE books_visits SET vis_cnt = vis_cnt + 1 WHERE book_id = ?';
      db.query(updateQuery, [bookId], (error, results) => {
        if (error) {
          console.error('Error updating visit count:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
        res.send('Visit count incremented successfully');
      });
    } else {
      // Book_id does not exist, insert with vis_cnt as 1
      console.log("adding");

      const insertQuery = 'INSERT INTO books_visits (book_id, vis_cnt) VALUES (?, 1)';
      db.query(insertQuery, [bookId], (error, results) => {
        if (error) {
          console.error('Error inserting new record:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
        res.send('New book_id inserted with visit count 1');
      });
    }
  });
});


app.get('/books/top', (req, res) => {
  const query = 'SELECT book_id, vis_cnt FROM books_visits ORDER BY vis_cnt DESC LIMIT 5';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
