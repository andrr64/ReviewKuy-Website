import express from "express";
import { updateUser } from '../controllers/user.controller.js';

const router =  express.Router();

router.put('/update-account', updateUser);

export default router;