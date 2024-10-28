import Review from '../models/review.model.js';
import Product from '../models/product.model.js'; // Pastikan Anda memiliki model Product
import { serverBadRequest, serverError, serverCreated, serverNotFound, serverUnauthorized } from '../utility/response_helper.js';

// Fungsi untuk membuat ulasan baru
export const createReview = async (req, res) => {
    try {
        const { productId, title, review } = req.body;
        const decodedUserId = req.user.id; // Mengambil userId dari token yang sudah diverifikasi

        // Validasi input
        if (!productId || !title || !review) {
            return serverBadRequest(res, "Product ID, title, and review are required");
        }

        // Cek apakah produk ada
        const product = await Product.findByPk(productId);
        if (!product) {
            return serverNotFound(res, "Product not found");
        }

        // Cek apakah pengguna sudah memberikan ulasan untuk produk ini
        const existingReview = await Review.findOne({
            where: {
                user_id: decodedUserId,
                product_id: productId
            }
        });

        if (existingReview) {
            return serverBadRequest(res, "You have already reviewed this product.");
        }

        // Buat ulasan baru
        const newReview = await Review.create({
            user_id: decodedUserId, // Menggunakan userId dari token
            title,
            review,
            product_id: productId, // Menyimpan productId di sini
        });

        return serverCreated(res, "Review created successfully", newReview);
    } catch (error) {
        console.error('Error creating review:', error); // Pesan lebih spesifik
        return serverError(res, "Failed to create review");
    }
};
