import express from "express";
import { updateUser } from '../controllers/user.controller.js';
import { createReview, getUserReview, updateReview } from "../controllers/review.controller.js";
import { createVote, updateVote } from "../controllers/review.vote.controller.js";

const router =  express.Router();

router.put('/update-account/:id', updateUser);

router.post('/review/create/:product_id', createReview);
router.put('/review/update', updateReview); 
router.get('/review/get/:product_id', getUserReview);

router.post('/vote', createVote);
router.put('/vote', updateVote);

export default router;