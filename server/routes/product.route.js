import express from 'express';
import { getProductByBrand, getProductByCategory, getProductById, getProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/brand/:id', getProductByBrand);
router.get('/category/:id', getProductByCategory);

export default router;