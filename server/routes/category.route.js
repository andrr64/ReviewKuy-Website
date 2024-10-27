import express from 'express';
import { getCategory, getCategoryById} from '../controllers/category.controller.js';

const category_route = express.Router();

category_route.get('/', getCategory);
category_route.get('/:id', getCategoryById);

export default category_route;
