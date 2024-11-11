import express from "express";
import { getBrandById, getBrands, searchBrand} from "../controllers/brand.controller.js";

const brand_route = express.Router();

brand_route.get('/', getBrands); // Tidak perlu middleware untuk get
brand_route.get('/:id', getBrandById); // Tidak perlu middleware untuk get
brand_route.post('/search', searchBrand);

export default brand_route;
