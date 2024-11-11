import express from 'express';
import { getSpecOptionsData } from '../controllers/product.specification.option.controller.js';
const router = express.Router();

router.get('/', getSpecOptionsData);

export default router;