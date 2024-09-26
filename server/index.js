import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser'; // Opsional, digunakan jika menggunakan cookies
import dotenv from 'dotenv';
import authRoute from './API/route/user/auth.route.js';
import securityRoute from './API/route/security/token-verification.route.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use(express.static(path.join(__dirname, 'admin', 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'dist', 'index.html'));
});

app.use('/auth', authRoute);
app.use('/security', securityRoute);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
});
