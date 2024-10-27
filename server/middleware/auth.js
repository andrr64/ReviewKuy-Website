import jwt from 'jsonwebtoken';
import { serverUnauthorized } from '../utility/response_helper.js';

// middleware/auth.js
export const verifyAdmin = (req, res, next) => {
    // const user = req.user; // Asumsikan Anda sudah mengautentikasi pengguna dan menyimpan informasi di req.user
    
    // if (!user || user.role !== 'admin') {
    //     return res.status(403).json({ message: 'Access denied.' }); // Forbidden
    // }
    next(); // Jika pengguna adalah admin, lanjutkan ke route berikutnya
};

export const verifyAccessToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return serverUnauthorized(res, 'Access token is missing.');
    }   

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Menyimpan data decoded ke request
        next(); // Melanjutkan ke route handler berikutnya
    } catch (error) {
        return serverUnauthorized(res, 'Invalid or expired access token.');
    }
};
