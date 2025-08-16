

import express, { Request, Response } from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/customer', (req: Request, res: Response) => {
	const { id, name, address, phone, email } = req.body;
	const sql = 'INSERT INTO customers (id, name, address, phone, email) VALUES (?, ?, ?, ?, ?)';
	db.query(sql, [id, name, address, phone, email], (err, result) => {
		if (err) {
			return res.status(500).json({ error: 'Lỗi thêm khách hàng' });
		}
		res.json({ id });
	});
});
app.put('/api/customer', (req: Request, res: Response) => {
    const { id, name, address, phone, email } = req.body;
    const sql = 'UPDATE customers SET name=?, address=?, phone=?, email=? WHERE id=?';
    db.query(sql, [name, address, phone, email, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi sửa khách hàng' });
        }
        res.json({ id, name, address, phone, email });
    });
});
app.delete('/api/customer/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = 'DELETE FROM customers WHERE id=?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi xóa khách hàng' });
        }
        res.json({ id });
    });
});

app.get('/api/category', (req: Request, res: Response) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi truy vấn database' });
        }
        res.json(results);
    });
});
app.post('/api/category', (req: Request, res: Response) => {
    const { name } = req.body;
    const sql = 'INSERT INTO categories (name) VALUES (?)';
    db.query(sql, [name], (err, result: mysql.ResultSetHeader) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi thêm danh mục' });
        }
        res.json({ id: result.insertId, name });
    });
});
app.delete('/api/category/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = 'DELETE FROM categories WHERE id=?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi xóa danh mục' });
        }
        res.json({ id });
    });
});
app.put('/api/category', (req: Request, res: Response) => {
    const { id, name } = req.body;
    const sql = 'UPDATE categories SET name=? WHERE id=?';
    db.query(sql, [name, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi sửa danh mục' });
        }
        res.json({ id, name });
    });
});

const PORT = process.env.PORT || 3000;

// Kết nối MySQL
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'buildmart_db',
});

db.connect((err) => {
	if (err) {
		console.error('Kết nối database thất bại:', err);
	} else {
		console.log('Kết nối database thành công!');
	}
});

// API lấy danh sách customer
app.get('/api/customer', (req: Request, res: Response) => {
  const search = req.query.search as string;
  let sql = 'SELECT * FROM customers';
  let params: any[] = [];
  if (search) {
    sql += ' WHERE name LIKE ? OR email LIKE ? OR address LIKE ? OR phone LIKE ?';
    params = [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`];
  }
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi truy vấn database' });
    res.json(results);
  });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
