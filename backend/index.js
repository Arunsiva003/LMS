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

app.post('/api/employees', (req, res) => {
  const { name, employeeId, department, dob, gender, designation, salary } = req.body;
  if (!name || !employeeId || !department || !dob || !gender || !designation || !salary) {
    return res.status(400).json({ message: 'Incomplete data' });
  }
  if (name.length > 30 || salary.length > 8) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  const sql =
    'INSERT INTO employees (name, employeeId, department, dob, gender, designation, salary) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(
    sql,
    [name, employeeId, department, dob, gender, designation, salary],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to add employee' });
      }
      res.status(201).json({ message: 'Employee added successfully' });
    }
  );
});


app.get('/api/employees',(req,res)=>{
  const q = 'select * from employees';
  db.query(q,(err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({message:"failed to retrieve employees"});
    }
    res.status(201).json(result);
  })

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
