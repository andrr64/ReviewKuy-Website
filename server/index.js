import express from 'express';
import cookieParser from 'cookie-parser'; // Opsional, digunakan jika menggunakan cookies
import dotenv from 'dotenv';
import cors from 'cors';
import user_route from './routes/user.route.js';
import sequelize from './db.js';
import brand_route from './routes/brand.route.js';

dotenv.config();

const app = express();

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    await sequelize.sync(); // Sinkronisasi model ke database
    console.log('Database synchronized');
    
    // Middleware
    app.use(cors()); // Ini mengizinkan semua origin
    app.use(express.json());
    app.use(cookieParser());

    // Rute
    app.use('/api/user', user_route);
    app.use('/api/brand', brand_route);

    // Menjalankan server
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
    });
  } catch (error) {
    console.error('SERVER ERROR: ', error);
    process.exit(1); // keluar dari aplikasi jika gagal koneksi
  }
};

startServer();