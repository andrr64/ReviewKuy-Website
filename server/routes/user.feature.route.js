import express from "express";
import { updateUser } from '../controllers/user.controller.js';
import { createReview, updateReview } from "../controllers/review.controller.js";
import { createVote, updateVote } from "../controllers/review.vote.controller.js";

const router =  express.Router();

router.put('/update-account/:id', updateUser);

router.post('/review', createReview);
router.put('/review', updateReview);


router.post('/vote', createVote);
router.put('/vote', updateVote);

export default router;