import express from 'express';
import { createBrand, deleteBrandById, updateBrand } from '../controllers/brand.controller.js';
import { createCategory, deleteCategory, updateCategory } from '../controllers/category.controller.js';
import { createAdmin, updateAdmin } from '../controllers/admin.controller.js';
import { createProduct, deleteProduct, updateProduct } from '../controllers/product.controller.js';
import { createSpecOption } from '../controllers/product.specification.option.controller.js';
const router = express.Router();

router.post('/brand/post', createBrand);
router.delete('/brand/delete/:id', deleteBrandById);
router.put('/brand/update/:id', updateBrand);

router.post('/create-account', createAdmin);
router.put('/update-account/:id', updateAdmin);

router.post('/category/post', createCategory);
router.put('/category/update/:id', updateCategory);
router.delete('/category/delete/:id', deleteCategory);

router.post('/product/post', createProduct)
router.put('/product/update/:id', updateProduct);
router.delete('/product/delete/:id', deleteProduct);

router.post('/product/specification/option', createSpecOption);
router.put('/product/specification/option/update/:id', updateProduct);
router.delete('/product/specification/option/delete/:id', deleteProduct);

export default router;