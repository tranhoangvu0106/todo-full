const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB, connection } = require('./db');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Tạo kết nối tới MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Tạo Todo
app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    const query = 'INSERT INTO todos (text, completed) VALUES (?, ?)';
    
    db.query(query, [text, false], (err, result) => {
        if (err) {
            console.error('Failed to create Todo:', err);
            return res.status(400).json({ error: 'Failed to create Todo' });
        }
        res.status(201).json({ id: result.insertId, text, completed: false });
    });
});

// Lấy danh sách Todo
app.get('/api/todos', (req, res) => {
    const query = 'SELECT * FROM todos';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Failed to retrieve Todos:', err);
            return res.status(500).json({ error: 'Failed to retrieve Todos' });
        }
        res.json(results);
    });
});

// Cập nhật Todo
/*app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;
    const query = 'UPDATE todos SET text = ?, completed = ? WHERE id = ?';
    
    db.query(query, [text, completed, id], (err, result) => {
        if (err) {
            console.error('Failed to update Todo:', err);
            return res.status(400).json({ error: 'Failed to update Todo' });
        }
        res.json({ id, text, completed });
    });
});
*/
app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body; // Lấy thông tin từ request body

    const query = 'UPDATE todos SET text = ?, completed = ? WHERE id = ?';
    db.query(query, [text, completed, id], (err, result) => {
        if (err) {
            console.error('Lỗi khi cập nhật Todo:', err);
            return res.status(500).json({ error: 'Failed to update Todo' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json({ id, text, completed });
    });
});

// Xóa Todo
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM todos WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Failed to delete Todo:', err);
            return res.status(400).json({ error: 'Failed to delete Todo' });
        }
        res.status(204).send();
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});