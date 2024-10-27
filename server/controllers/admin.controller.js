import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import {
    serverBadRequest,
    serverConflict,
    serverError,
    serverCreated,
    serverNotFound,
    serverSuccess,
    serverUnauthorized
} from '../utility/response_helper.js';

const saltRounds = 12;

// Fungsi untuk verifikasi input
const verifyInput = (username, password) => {
    if (!username || !password) {
        return { valid: false, message: 'All fields are required.' };
    }
    if (username.length < 3) {
        return { valid: false, message: 'Username must be at least 3 characters.' };
    }
    return { valid: true };
};

// Fungsi untuk membuat admin baru
export const createAdmin = async (req, res) => {
    const { username, password } = req.body;

    const validation = verifyInput(username, password);
    if (!validation.valid) {
        return serverBadRequest(res, validation.message);
    }

    try {
        const existingAdmin = await Admin.findOne({ where: { username } });
        if (existingAdmin) {
            return serverConflict(res, 'Username is already registered.');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newAdmin = await Admin.create({
            username,
            password: hashedPassword,
        });

        return serverCreated(res, 'Admin created successfully', {
            id: newAdmin.admin_id,
            username: newAdmin.username,
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        return serverError(res, 'Something went wrong, please try again later.');
    }
};

// Fungsi untuk memperbarui informasi admin
export const updateAdmin = async (req, res) => {
    const { adminId } = req.params;
    const { username, password } = req.body;

    const validation = verifyInput(username, password);
    if (!validation.valid) {
        return serverBadRequest(res, validation.message);
    }

    // Pastikan admin yang ingin di-update sesuai dengan ID di token
    if (req.admin.id !== parseInt(adminId)) {
        return serverUnauthorized(res, 'You can only update your own account.');
    }

    try {
        const admin = await Admin.findOne({ where: { admin_id: adminId } });
        if (!admin) {
            return serverNotFound(res, 'Admin not found.');
        }

        const existingAdmin = await Admin.findOne({ where: { username } });
        if (existingAdmin && existingAdmin.admin_id !== adminId) {
            return serverConflict(res, 'Username is already registered.');
        }

        const updatedData = {
            username,
        };

        // Hash password jika ada perubahan
        if (password) {
            updatedData.password = await bcrypt.hash(password, saltRounds);
        }

        await Admin.update(updatedData, { where: { admin_id: adminId } });

        return serverSuccess(res, 'Admin updated successfully', {
            id: admin.admin_id,
            username: updatedData.username,
        });
    } catch (error) {
        console.error('Error updating admin:', error);
        return serverError(res, 'Something went wrong, please try again later.');
    }
};

// Fungsi untuk login admin
export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return serverBadRequest(res, 'Username and password are required.');
    }

    try {
        const admin = await Admin.findOne({ where: { username } });

        if (!admin) {
            return serverNotFound(res, 'Admin not found.');
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return serverBadRequest(res, 'Invalid credentials.');
        }

        // Create JWT token
        const token = jwt.sign({ id: admin.admin_id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        
        // Set token in HttpOnly cookie
        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000 // 15 minutes in milliseconds
        });

        return serverSuccess(res, 'Login successful');
    } catch (error) {
        console.error('Error during login:', error);
        return serverError(res, 'Something went wrong, please try again later.');
    }
};

// Fungsi untuk logout admin
export const logoutAdmin = (req, res) => {
    // Hapus cookie adminToken
    res.clearCookie('adminToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set ke true dalam produksi
        sameSite: 'Strict',
    });

    return serverSuccess(res, 'Logout successful');
};