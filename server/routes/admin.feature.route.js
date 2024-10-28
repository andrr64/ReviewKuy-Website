import express from 'express';
import { createBrand, deleteBrandById, updateBrand } from '../controllers/brand.controller.js';
import { createCategory, deleteCategory, updateCategory } from '../controllers/category.controller.js';
import { createAdmin, updateAdmin } from '../controllers/admin.controller.js';
import { createProduct, deleteProduct, updateProduct } from '../controllers/product.controller.js';
const router = express.Router();

router.post('/brand', createBrand);
router.delete('/brand/:id', deleteBrandById);
router.put('/brand/:id', updateBrand);

router.post('/create-account', createAdmin);
router.put('/update-account/:id', updateAdmin);

router.post('/category', createCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

router.post('/product', createProduct)
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

export default router;