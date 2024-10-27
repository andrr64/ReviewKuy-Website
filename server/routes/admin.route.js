import express from 'express';
import {
    createAdmin,
    updateAdmin,
    loginAdmin,
    logoutAdmin
} from '../controllers/admin.controller.js';
import { verifyAdmin } from '../middleware/auth.js';

const admin_route = express.Router();

// Route untuk admin
admin_route.post('/', verifyAdmin, createAdmin);
admin_route.put('/:adminId', verifyAdmin, updateAdmin);
admin_route.post('/login', loginAdmin);
admin_route.post('/logout', logoutAdmin);

export default admin_route;