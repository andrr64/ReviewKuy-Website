import jwt from 'jsonwebtoken';

export const checkToken = (token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true; // Token valid
    } catch (error) {
        return false; // Token tidak valid
    }
};
