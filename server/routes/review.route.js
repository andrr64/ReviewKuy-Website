import express from "express";
import { getReviews, reviewSummary } from "../controllers/review.controller.js";

const review_route = express.Router();

review_route.get('/get/:product_id/:index/:amount', getReviews);
review_route.get('/get/summary/:product_id', reviewSummary);

export default review_route;