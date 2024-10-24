import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser'; // Opsional, digunakan jika menggunakan cookies
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import API_User from './routes/user.route.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Pindahkan cors di sini, sebelum rute API
app.use(cors()); // Ini mengizinkan semua origin

app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use(express.static(path.join(__dirname, 'admin', 'dist')));

// RUTE API
app.use('/api/user', API_User);

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('-----------------------------');
    console.log('DB OK');
    console.log('Successfully connected to database');
    console.log('-----------------------------');
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
});
