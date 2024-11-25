import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import user_route from './routes/user.route.js';
import sequelize from './db.js';
import brand_route from './routes/brand.route.js';
import admin_route from './routes/admin.route.js';
import category_route from './routes/category.route.js';
import product_route from './routes/product.route.js';
import { initializeApp } from "firebase/app";
import path from 'path';
import review_route from './routes/review.route.js';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJ_ID,
  storageBucket: process.env.FIREBASE_STRG_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SEND_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = express();
export const firebaseApp = initializeApp(firebaseConfig);
const __dirname = path.resolve();  // Mendefinisikan __dirname untuk ES Modules

const startServer = async () => {
  try {
    await sequelize.authenticate();
    const paksa = false;
    console.log('Database connected successfully');
    await sequelize.sync({ force: paksa });
    console.log('Database synchronized');

    // Middleware
    app.use(cors({credentials: true}));
    app.use(express.json({ limit: '10mb' }));
    app.use(cookieParser());

    // Routes
    app.use('/api/user', user_route);
    app.use('/api/admin', admin_route);
    app.use('/api/brand', brand_route);
    app.use('/api/category', category_route);
    app.use('/api/product', product_route);
    app.use('/api/review', review_route); 

    app.use(express.static(path.join(__dirname, 'client', 'dist')));

    // Rute catch-all untuk React Router
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
    });
    
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
