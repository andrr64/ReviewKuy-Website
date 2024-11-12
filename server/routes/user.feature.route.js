import express from "express";
import { updateUser } from '../controllers/user.controller.js';
import { createReview, updateReview } from "../controllers/review.controller.js";
import { createVote, updateVote } from "../controllers/review.vote.controller.js";

const router =  express.Router();

router.put('/update-account/:id', updateUser);

router.post('/review/post', createReview);
router.put('/review/update', updateReview);

router.post('/vote/post', createVote);
router.put('/vote/update', updateVote);

export default router;