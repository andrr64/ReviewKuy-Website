import express from 'express';
import cookieParser from 'cookie-parser'; // Opsional, digunakan jika menggunakan cookies
import dotenv from 'dotenv';
import cors from 'cors';
import user_route from './routes/user.route.js';
import sequelize from './db.js';
import brand_route from './routes/brand.route.js';
import admin_route from './routes/admin.route.js';
import category_route from './routes/category.route.js';
import product_route from './routes/product.route.js';
import product_spec_opt_route from './routes/product.specification.option.route.js';

dotenv.config();

const app = express();

const startServer = async () => {
  try {
    await sequelize.authenticate();
    const paksa = false;
    console.log('Database connected successfully');
    await sequelize.sync({force: paksa}); // Sinkronisasi model ke database
    console.log('Database synchronized');

    // Middleware
    app.use(cors({
      origin: 'http://localhost:5173', // URL frontend Anda
      credentials: true, // Mengizinkan pengiriman kredensial (cookie)
    })); // Ini mengizinkan semua origin
    app.use(express.json());
    app.use(cookieParser());

    // Rute
    app.use('/api/user', user_route);
    app.use('/api/admin', admin_route);

    app.use('/api/brand', brand_route);
    app.use('/api/category', category_route);
    app.use('/api/product', product_route);

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