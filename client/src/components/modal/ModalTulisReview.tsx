import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { ReviewAPI } from '../../api/review.api';
import { showWarning } from '../../util/alert/show_alert';
import { httpCreateOk, httpNotAuthorized } from '../../api/util';
import { logout } from '../../state/user/userState';
import { showAlertByResponseCode } from '../../util/alert/alert';
import { ReviewModel } from '../../model/review.model';
import { ProductModel } from '../../model/product.model';

interface TulisReviewModalProps {
    isOpen: boolean; // State untuk mengontrol apakah modal terbuka
    onClose: () => void; // Fungsi untuk menutup modal
    onCreated: (newData: ReviewModel) => void;
    productId: any;
}

const TulisReviewModal: React.FC<TulisReviewModalProps> = ({ productId, isOpen, onCreated, onClose }) => {
    const [title, setTitle] = useState(''); // State untuk judul
    const [review, setReview] = useState(''); // State untuk review
    const [rating, setRating] = useState(0); // State untuk rating
    const userData = useSelector((state: RootState) => state.user.data);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleRating = (rate: number) => {
        setRating(rate);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const response = await ReviewAPI.createReview(productId, title, review, rating);
        setTitle('');
        setReview('');
        setRating(0);
        setLoading(false);
        if (httpCreateOk(response)) {
            showAlertByResponseCode(response.status);
            onCreated(new ReviewModel(response.data));
            onClose();
        } else if (httpNotAuthorized(response)) {
            dispatch(logout());
            showWarning('Unauthorized', 'Silahkan login terlebih dahulu');
        }
    };

    if (!isOpen) return null; // Jangan render apa pun jika modal tidak terbuka
    if (userData === null){
        onClose();
        showAlertByResponseCode(401);
        return null;
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4 font-bold">Tulis Review</h2>
                <form onSubmit={handleSubmit}>
                    {/* Field Judul */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                            Judul
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Masukkan judul review..."
                            className="font-bold w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Field Review */}
                    <div className="mb-4">
                        <label htmlFor="review" className="block text-gray-700 font-medium mb-2">
                            Review
                        </label>
                        <textarea
                            id="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Tulis ulasan Anda di sini..."
                            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={5}
                        />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                        <span className="mr-3 text-gray-600 font-medium">Rating:</span>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleRating(star)}
                                    className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                                        } hover:text-yellow-500`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tombol Submit dan Cancel */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            disabled={!title || !review || rating === 0}
                        >
                            Post review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TulisReviewModal;