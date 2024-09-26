import express from 'express';
import { userLogin } from '../../controller/user/auth.controller.js';

const router = express.Router();
router.post('/login', userLogin)

export default router;