

import express, { Request, Response } from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
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
	db.query('SELECT * FROM customers', (err, results) => {
		if (err) {
			res.status(500).json({ error: 'Lỗi truy vấn database' });
		} else {
			res.json(results);
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
