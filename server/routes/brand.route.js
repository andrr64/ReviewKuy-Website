import express from "express";
import { getBrandById, getBrands} from "../controllers/brand.controller.js";

const brand_route = express.Router();

brand_route.get('/', getBrands); // Tidak perlu middleware untuk get
brand_route.get('/:id', getBrandById); // Tidak perlu middleware untuk get

export default brand_route;
