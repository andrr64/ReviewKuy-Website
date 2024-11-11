import express from 'express';
import { createBrand, deleteBrandById, updateBrand } from '../controllers/brand.controller.js';
import { createCategory, deleteCategory, updateCategory } from '../controllers/category.controller.js';
import { createAdmin, updateAdmin } from '../controllers/admin.controller.js';
import { createProduct, deleteProduct, updateProduct } from '../controllers/product.controller.js';
import { createSpecOption, deleteSpecOption, updateSpecOption } from '../controllers/product.specification.option.controller.js';
const router = express.Router();

router.post('/brand/create', createBrand);
router.delete('/brand/delete/:id', deleteBrandById);
router.put('/brand/update/:id', updateBrand);

router.post('/create-account', createAdmin);
router.put('/update-account/:id', updateAdmin);

router.post('/category/create', createCategory);
router.put('/category/update/:id', updateCategory);
router.delete('/category/delete/:id', deleteCategory);

router.post('/product/create', createProduct)
router.put('/product/update/:id', updateProduct);
router.delete('/product/delete/:id', deleteProduct);

router.post('/product/specification/option/create', createSpecOption);
router.post('/product/specification/option/update', updateSpecOption);
router.delete('/product/specification/option/delete/:id', deleteSpecOption);

export default router;