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

        // Set bcrypt salt rounds (rekomendasi: minimal 12)
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return serverCreated(res, 'User created successfully', {
            id: newUser.user_id,
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
    const { userId } = req.params;
    const { name, email, password } = req.body;
    

    // Validasi input
    const validation = verifyInput(name, email, password);
    if (!validation.valid) {
        return serverBadRequest(res, validation.message);
    }

    // Pastikan user yang ingin di-update sesuai dengan ID di token
    if (req.user.id !== parseInt(userId)) {
        return serverUnauthorized(res, 'You can only update your own account.');
    }

    try {
        const user = await User.findOne({ where: { user_id: userId } });
        if (!user) {
            return serverNotFound(res, 'User not found.');
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser && existingUser.user_id !== userId) {
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

        await User.update(updatedData, { where: { user_id: userId } });

        return serverSuccess(res, 'User updated successfully', {
            id: user.user_id,
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
        const accessToken = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.user_id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        // Send accessToken and refreshToken in HttpOnly cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        });

        return serverSuccess(res, 'Login successful', { accessToken });
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
