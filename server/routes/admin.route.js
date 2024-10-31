import express from 'express';
import {
    createAdmin,
    loginAdmin,
    logoutAdmin
} from '../controllers/admin.controller.js';
import { checkAdminToken, verifyAdmin } from '../middleware/auth.js';
import admin_feature_route from './admin.feature.route.js';

const admin_route = express.Router();

// Route untuk admin
admin_route.post('/login', loginAdmin);
admin_route.post('/logout', logoutAdmin);
admin_route.get('/check', checkAdminToken);
admin_route.post('/create-account', createAdmin);

admin_route.use('/feature', verifyAdmin, admin_feature_route);

export default admin_route;