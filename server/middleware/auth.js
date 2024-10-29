import jwt from 'jsonwebtoken';
import { serverUnauthorized } from '../utility/response_helper.js';

// Middleware untuk memverifikasi akses admin
export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.adminToken;
    
    if (!token) {
        res.clearCookie('adminToken');
        return serverUnauthorized(res, 'Unauthorized.');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.clearCookie('adminToken');
            return serverUnauthorized(res, 'Unauthorized access.');
        }
        req.admin = { id: decoded.id };
        next();
    });
};

// Middleware untuk memverifikasi accessToken dan mengecek refreshToken jika accessToken tidak valid
export const verifyAccessToken = (req, res, next) => {
    let accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return serverUnauthorized(res, 'Unauthorized.');
    }

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                return serverUnauthorized(res, 'Invalid or expired token.');
            }

            // Verifikasi refreshToken untuk mendapatkan accessToken baru
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (refreshErr, refreshDecoded) => {
                if (refreshErr) {
                    res.clearCookie('refreshToken');
                    return serverUnauthorized(res, 'Invalid or expired token.');
                }

                // Buat accessToken baru jika refreshToken valid
                accessToken = jwt.sign({ id: refreshDecoded.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

                // Simpan accessToken baru di cookie
                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    maxAge: 15 * 60 * 1000,
                });

                req.user = refreshDecoded;
                next();
            });
        } else {
            req.user = decoded;
            next();
        }
    });
};
