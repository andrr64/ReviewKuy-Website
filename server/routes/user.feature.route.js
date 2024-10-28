import express from "express";
import { updateUser } from '../controllers/user.controller.js';
import { createReview } from "../controllers/review.controller.js";

const router =  express.Router();

router.put('/update-account/:id', updateUser);
router.post('/review/post', createReview);
export default router;