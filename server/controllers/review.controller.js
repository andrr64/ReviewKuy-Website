import Review from '../models/review.model.js';
import Product from '../models/product.model.js'; // Pastikan Anda memiliki model Product
import { serverBadRequest, serverError, serverCreated, serverNotFound, serverUnauthorized, serverbadrequest } from '../utility/response_helper.js';
import User from '../models/user.model.js';
import sequelize from '../db.js';

// Fungsi untuk membuat ulasan baru
export const createReview = async (req, res) => {
    try {
        const { product_id } = req.params;
        const { title, rating, review } = req.body;
        const decodedUserId = req.user.id; // Mengambil userId dari token yang sudah diverifikasi

        if (!product_id || !title || !review || !rating) {
            return serverBadRequest(res, "Product ID, title, rating, and review are required");
        }
        if (rating <= 0 || rating > 5) {
            return serverBadRequest(res, "Invalid rating.");
        }
        // Cek apakah produk ada
        const product = await Product.findByPk(product_id);
        if (!product) {
            return serverNotFound(res, "Product not found");
        }

        // Cek apakah pengguna sudah memberikan ulasan untuk produk ini
        const existingReview = await Review.findOne({
            where: {
                user_id: decodedUserId,
                product_id: product_id
            }
        });

        if (existingReview) {
            return serverbadrequest(res, "You have already reviewed this product.");
        }

        // Buat ulasan baru
        const newReview = await Review.create({
            user_id: decodedUserId, // Menggunakan userId dari token
            title,
            review,
            rating,
            product_id: product_id, // Menyimpan product_id di sini
        });
        return res.status(201).send(newReview);
    } catch (error) {
        console.error('Error creating review:', error); // Pesan lebih spesifik
        return serverError(res, "Failed to create review");
    }
};

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, rating, review } = req.body;

        const productId = id;
        const decodedUserId = req.user.id;

        // Validasi input
        if (!productId || !title || !review || !rating) {
            return serverBadRequest(res, "Product ID, title, rating, and review are required");
        }
        if (rating <= 0 || rating > 5) {
            return serverBadRequest(res, "Invalid rating.");
        }

        // Cek apakah produk ada
        const product = await Product.findByPk(productId);
        if (!product) {
            return serverNotFound(res, "Product not found");
        }

        // Cek apakah ulasan pengguna untuk produk ini ada
        const existingReview = await Review.findOne({
            where: {
                user_id: decodedUserId,
                product_id: productId
            }
        });

        if (!existingReview) {
            return serverNotFound(res, "Review not found for this product.");
        }

        // Update review
        existingReview.title = title;
        existingReview.rating = rating;
        existingReview.review = review;
        await existingReview.save();

        return serverSuccess(res, "Review updated successfully", existingReview);
    } catch (error) {
        console.error('Error updating review:', error);
        return serverError(res, "Failed to update review");
    }
};

export const getReviews = async (req, res) => {
    try {
        const { product_id, index, amount } = req.params;

        if (!product_id || isNaN(index) || isNaN(amount)) {
            return serverBadRequest(res, "Invalid or missing parameters.");
        }

        const pageIndex = parseInt(index, 10);
        const pageAmount = parseInt(amount, 10);

        if (pageIndex < 0 || pageAmount <= 0) {
            return serverBadRequest(res, "Index must be >= 0 and amount > 0.");
        }

        const product = await Product.findByPk(product_id);
        if (!product) return serverNotFound(res, "Product not found.");

        // Ambil data ulasan saja
        const reviews = await Review.findAndCountAll({
            where: { product_id },
            offset: pageIndex * pageAmount,
            limit: pageAmount,
            order: [['createdAt', 'DESC']],
        });

        if (!reviews.rows.length) {
            return serverNotFound(res, "No reviews found for this product.");
        }

        // Ambil user berdasarkan user_id unik dari ulasan
        const userIds = [...new Set(reviews.rows.map((review) => review.user_id))];
        const users = await User.findAll({
            where: { id: userIds },
            attributes: ['id', 'name', 'avatar'], // Ambil atribut user yang diperlukan
        });

        // Gabungkan ulasan dengan data user yang sesuai
        const reviewsWithUser = reviews.rows.map((review) => ({
            ...review.dataValues,
            user: users.find((user) => user.id === review.user_id) || null,
        }));

        return res.status(200).send(reviewsWithUser);

    } catch (error) {
        console.error('Error fetching reviews:', error.message || error);
        return serverError(res, "Failed to fetch reviews.");
    }
};

export const getUserReview = async (req, res) => {
    try {
        const decodedUserId = req.user.id; // ID pengguna dari token yang sudah diverifikasi
        const { product_id } = req.params; // ID produk yang diulas

        // Validasi parameter
        if (!product_id) {
            return serverBadRequest(res, "Product ID is required.");
        }

        // Periksa apakah produk ada
        const product = await Product.findByPk(product_id);
        if (!product) {
            return serverNotFound(res, "Product not found.");
        }

        // Ambil ulasan pengguna untuk produk tertentu
        const userReview = await Review.findOne({
            where: {
                product_id,
                user_id: decodedUserId,
            },
        });

        if (!userReview) {
            return serverNotFound(res, "No review found for this product by the user.");
        }

        // Ambil data pengguna yang terkait dengan ulasan
        const user = await User.findByPk(decodedUserId, {
            attributes: ['id', 'name', 'avatar'], // Ambil atribut user yang diperlukan
        });

        // Format respons agar konsisten dengan `getReviews`
        const reviewWithUser = {
            ...userReview.dataValues,
            user: user ? user.dataValues : null,
        };

        // Kirim respons dengan format yang sama
        return res.status(200).json(reviewWithUser);

    } catch (error) {
        console.error('Error fetching user review:', error.message || error);
        return serverError(res, "Failed to fetch user review.");
    }
};


export const reviewSummary = async (req, res) => {
    try {
        const { product_id } = req.params;

        if (!product_id) {
            return serverBadRequest(res, "Product ID is required.");
        }

        // Periksa apakah produk ada
        const product = await Product.findByPk(product_id);
        if (!product) return serverNotFound(res, "Product not found.");
        const reviewData = await Review.findAll({ where: { product_id } });
        console.log(reviewData);

        // Hitung rata-rata rating
        const ratingAvg = await Review.findOne({
            where: { product_id },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('rating')), 'rating_avg'],
            ],
        });

        const avgRating = ratingAvg ? parseFloat(ratingAvg.get('rating_avg')) : 0;

        // Hitung jumlah ulasan
        const totalReviews = await Review.count({
            where: { product_id },
        });

        // Hitung jumlah ulasan per bintang (1-5)
        const star_count = await Promise.all(
            [1, 2, 3, 4, 5].map(async (star) => {
                const count = await Review.count({
                    where: { product_id, rating: star },
                });
                return count;
            })
        );

        // Gabungkan hasilnya
        const summary = {
            rating_avg: isNaN(avgRating) ? 0 : avgRating,
            review_count: totalReviews,
            star_count
        };

        return res.status(200).json(summary);
    } catch (error) {
        console.error('Error fetching review summary:', error.message || error);
        return serverError(res, "Failed to fetch review summary.");
    }
};