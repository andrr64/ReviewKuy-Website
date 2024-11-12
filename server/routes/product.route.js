import express from 'express';
import { getProductByBrand, getProductByCategory, getProductById, getProducts, searchProduct } from '../controllers/product.controller.js';
import product_spec_opt_route from '../routes/product.specification.option.route.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/brand/:id', getProductByBrand);
router.get('/category/:id', getProductByCategory);
router.use('/specification/option', product_spec_opt_route)

router.post('/search', searchProduct);

export default router;