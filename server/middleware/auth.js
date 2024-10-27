import jwt from 'jsonwebtoken';
import { serverUnauthorized } from '../utility/response_helper.js';

// middleware/auth.js
export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.adminToken; // Ambil token dari cookie
    
    if (!token) {
        return serverUnauthorized(res, 'No token provided.');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return serverUnauthorized(res, 'Failed to authenticate token.');
        }
        req.admin = { id: decoded.id }; // Simpan informasi admin ke req
        next();
    });
};

export const verifyAccessToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return serverUnauthorized(res, 'Unauthorized.');
    }   

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Menyimpan data decoded ke request
        next(); // Melanjutkan ke route handler berikutnya
    } catch (error) {
        return serverUnauthorized(res, 'Invalid or expired access token.');
    }
};