import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser'; // Opsional, digunakan jika menggunakan cookies
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

// Untuk menggantikan __dirname
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
