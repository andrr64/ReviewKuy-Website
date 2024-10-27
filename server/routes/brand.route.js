import express from "express";
import { createBrand, deleteBrandById, getBrandById, getBrands, updateBrand } from "../controllers/brand.controller.js";
import { verifyAdmin } from '../middleware/auth.js'; // Sesuaikan dengan path yang benar

const brand_route = express.Router();

brand_route.post('/', verifyAdmin, createBrand); // Menggunakan middleware untuk createBrand
brand_route.put('/:brandId', verifyAdmin, updateBrand); // Menggunakan middleware untuk updateBrand
brand_route.delete('/:brandId', verifyAdmin, deleteBrandById); // Menggunakan middleware untuk deleteBrand
brand_route.get('/', getBrands); // Tidak perlu middleware untuk get
brand_route.get('/:brandId', getBrandById); // Tidak perlu middleware untuk get

export default brand_route;
