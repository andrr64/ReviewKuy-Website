import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { 
    serverBadRequest, 
    serverConflict, 
    serverError, 
    serverCreated, 
    serverNotFound
} from '../utility/response_helper.js'; // Sesuaikan dengan path yang benar

// Regex untuk validasi format email
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

    // Validasi input
    const validation = verifyInput(name, email, password);
    if (!validation.valid) {
        return serverBadRequest(res, validation.message);
    }

    try {
        // Cek apakah email sudah ada di database
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return serverConflict(res, 'Email is already registered.');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat pengguna baru
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Kirim response
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

// Fungsi untuk memperbarui pengguna
export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    // Validasi input
    const validation = verifyInput(name, email, password);
    if (!validation.valid) {
        return serverBadRequest(res, validation.message);
    }

    try {
        // Cek apakah pengguna ada di database
        const user = await User.findOne({ where: { user_id: userId } });
        if (!user) {
            return serverNotFound(res, 'User not found.');
        }
        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return serverConflict(res, 'Email is already registered.');
        }

        // Update pengguna
        const updatedData = {
            name,
            email,
        };

        // Update password jika ada perubahan
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        await User.update(updatedData, { where: { user_id: userId } });

        // Kirim response
        return serverCreated(res, 'User updated successfully', {
            id: user.user_id,
            name: updatedData.name,
            email: updatedData.email,
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return serverError(res, 'Something went wrong, please try again later.');
    }
};
