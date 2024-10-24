import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser'; // Opsional, digunakan jika menggunakan cookies
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import API_User from './routes/user.route.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use(express.static(path.join(__dirname, 'admin', 'dist')));

// WEB
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// app.get('/admin', (req, res) => {
//   res.sendFile(path.join(__dirname, 'admin', 'dist', 'index.html'));
// });

// RUTE API
// app.use('/auth', authRoute);
// app.use('/security', securityRoute);
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
