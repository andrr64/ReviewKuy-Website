import ReviewVoteModel from '../models/review.vote.model.js';
import Review from '../models/review.model.js'; // Pastikan Anda memiliki model Review
import { 
    serverBadRequest, 
    serverError, 
    serverNotFound, 
    serverCreated, 
    serverSuccess 
} from '../utility/response_helper.js';

// Fungsi untuk membuat vote baru
export const createVote = async (req, res) => {
    try {
        const {review_id, value } = req.body; // Ambil reviewId dan value dari request body
        const user_id = req.user.id; // Mengambil userId dari token yang sudah diverifikasi

        // Validasi input
        if (!review_id || value === undefined) {
            return serverBadRequest(res, "Review ID and value are required");
        }

        // Cek review produk ada
        const review = await Review.findByPk(review_id);
        if (!review) {
            return serverNotFound(res, "Review not found");
        }

        // Cek apakah user sudah memberikan vote untuk review ini
        const existingVote = await ReviewVoteModel.findOne({
            where: {
                review_id: review_id,
                user_id: user_id,
            },
        });

        if (existingVote) {
            return serverBadRequest(res, "User has already voted on this review");
        }

        // Buat vote baru
        const newVote = await ReviewVoteModel.create({
            user_id: user_id,
            review_id: review_id,
            value,
        });

        return serverCreated(res, "Vote created successfully", newVote);
    } catch (error) {
        console.error('Error creating vote:', error);
        return serverError(res, "Failed to create vote");
    }
};

// Fungsi untuk memperbarui vote yang sudah ada
export const updateVote = async (req, res) => {
    try {
        const {review_id, value} = req.body; // Ambil reviewId dan value dari request body
        const userId = req.user.id; // Mengambil userId dari token yang sudah diverifikasi

        // Validasi input
        if (!review_id || value === undefined) {
            return serverBadRequest(res, "Review ID and value are required");
        }

        // Cek apakah vote ada
        const vote = await ReviewVoteModel.findOne({
            where: {
                review_id: review_id,
                user_id: userId,
            },
        });

        if (!vote) {
            return serverNotFound(res, "Vote not found");
        }

        // Memperbarui vote
        vote.value = value;
        await vote.save();

        return serverSuccess(res, "Vote updated successfully", vote);
    } catch (error) {
        console.error('Error updating vote:', error);
        return serverError(res, "Failed to update vote");
    }
};

// Fungsi untuk menghapus vote
export const deleteVote = async (req, res) => {
    try {
        const { reviewId } = req.body; // Ambil reviewId dari request body
        const userId = req.user.id; // Mengambil userId dari token yang sudah diverifikasi

        // Validasi input
        if (!reviewId) {
            return serverBadRequest(res, "Review ID is required");
        }

        // Cek apakah vote ada
        const vote = await ReviewVoteModel.findOne({
            where: {
                review_id: reviewId,
                user_id: userId,
            },
        });

        if (!vote) {
            return serverNotFound(res, "Vote not found");
        }

        // Hapus vote
        await vote.destroy();

        return serverSuccess(res, "Vote deleted successfully");
    } catch (error) {
        console.error('Error deleting vote:', error);
        return serverError(res, "Failed to delete vote");
    }
};
