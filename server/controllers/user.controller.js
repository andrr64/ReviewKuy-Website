import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import {
    serverBadRequest,
    serverConflict,
    serverError,
    serverCreated,
    serverNotFound,
    serverSuccess,
    serverUnauthorized
} from '../utility/response_helper.js';
import { Op } from 'sequelize'; // Pastikan Op diimpor untuk menggunakan operator LIKE

const saltRounds = 12;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fungsi untuk verifikasi input
const verifyInput = (name, email, password) => {
    if (!name || !email || !password) {
        return { valid: false, message: 'All fields are required.' };
    }
    if (name.length < 3) {
        return { valid: false, message: 'Name must be at least 3 characters.' };
    }
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Invalid email format.' };
    }
    return { valid: true };
};

// Fungsi untuk mendapatkan pengguna berdasarkan nama mirip
export const getUserByName = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return serverBadRequest(res, 'Name is required.');
    }

    try {
        // Menggunakan operator LIKE untuk mencari nama yang mengandung nilai 'nama' dari req.body
        const users = await User.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`, // mencari nama yang mengandung substring 'nama'
                }
            }
        });

        if (users.length === 0) {
            return serverNotFound(res, 'No users found with a similar name.');
        }

        // Mengembalikan daftar pengguna yang namanya mirip dengan nama yang dicari
        return res.status(200).send(users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        })));
    } catch (error) {
        console.error('Error fetching users by similar name:', error);
        return serverError(res, 'Something went wrong, please try again later.');
    }
};

export const getUserTotal = async(req, res) => {
    try {
        // Menghitung jumlah total pengguna
        const totalUsers = await User.count();
        // Mengirimkan jumlah total pengguna menggunakan res.send()
        return res.status(200).json(totalUsers);
    } catch (error) {
        return serverError(res, error);
    }
}

// Fungsi untuk membuat pengguna baru
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const validation = verifyInput(name, email, password);
    if (!validation.valid) {
        return serverBadRequest(res, validation.message);
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return serverConflict(res, 'Email is already registered.');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return serverCreated(res, 'User created successfully', {
            id: newUser.id, // Perubahan di sini
            name: newUser.name,
            email: newUser.email,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return serverError(res, 'Something went wrong, please try again later.');
    }
};

// Tambahkan middleware verifyAccessToken sebelum updateUser
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Validasi input
    const validation = verifyInput(name, email, password);
    if (!validation.valid) {
        return serverBadRequest(res, validation.message);
    }

    // Pastikan user yang ingin di-update sesuai dengan ID di token
    if (req.user.id !== parseInt(id)) {
        return serverUnauthorized(res, 'You can only update your own account.');
    }

    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return serverNotFound(res, 'User not found.');
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser && existingUser.id !== id) { // Perubahan di sini
            return serverConflict(res, 'Email is already registered.');
        }

        const updatedData = {
            name,
            email,
        };

        // Hash password jika ada perubahan
        if (password) {
            updatedData.password = await bcrypt.hash(password, saltRounds);
        }

        await User.update(updatedData, { where: { id } }); // Perubahan di sini

        return serverSuccess(res, 'User updated successfully', {
            id: user.id, // Perubahan di sini
            name: updatedData.name,
            email: updatedData.email,
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return serverError(res, 'Something went wrong, please try again later.');
    }
};

// Fungsi untuk login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return serverBadRequest(res, 'Email and password are required.');
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return serverNotFound(res, 'User not found.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return serverBadRequest(res, 'Invalid credentials.');
        }

        // Create JWT access and refresh tokens
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' }); // Perubahan di sini
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' }); // Perubahan di sini

        // Send accessToken and refreshToken in HttpOnly cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return serverSuccess(res, 'Login successful', {
            user: {
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });

    } catch (error) {
        console.error('Error during login:', error);
        return serverError(res, 'Something went wrong, please try again later.');
    }
};

export const logoutUser = (req, res) => {
    // Hapus cookies accessToken dan refreshToken
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set ke true dalam produksi
        sameSite: 'Strict',
    });

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });

    return serverSuccess(res, 'Logout successful');
};
