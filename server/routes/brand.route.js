import express from "express";
import { createBrand, deleteBrandById, getBrandById, getBrands, updateBrand } from "../controllers/brand.controller.js";

const brand_route = express.Router();

brand_route.post('/',createBrand);
brand_route.put('/:brandId', updateBrand);
brand_route.delete('/:brandId', deleteBrandById);
brand_route.get('/',getBrands);
brand_route.get('/:brandId', getBrandById);

export default brand_route;