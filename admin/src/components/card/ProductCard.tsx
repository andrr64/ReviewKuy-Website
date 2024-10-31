import React, { useState } from 'react';
import { ProductModel } from '../../model/product';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface ProductCardProps {
    product: ProductModel;
    onEdit: (product: ProductModel) => void; // Fungsi untuk mengedit produk
    onDelete: (productId: number) => void; // Fungsi untuk menghapus produk
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
            {/* Header Produk */}
            <div onClick={toggleDropdown} className="cursor-pointer flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.brand.name}</p>
                </div>
                {/* Ikon untuk menunjukkan status dropdown */}
                {isOpen ? (
                    <FaChevronUp className="text-gray-600" />
                ) : (
                    <FaChevronDown className="text-gray-600" />
                )}
            </div>

            {/* Tombol Edit dan Delete */}
            <div className="mt-2 flex space-x-2">
                <button
                    onClick={() => onEdit(product)} // Panggil fungsi edit
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(product.id)} // Panggil fungsi delete
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>

            {/* Dropdown Content */}
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-screen' : 'max-h-0'
                }`}
            >
                <div className="mt-2">
                    <h4 className="font-medium text-gray-700">Specifications:</h4>
                    <ul className="list-disc list-inside">
                        {product.specifications.map((spec, index) => (
                            <li key={index}>
                                {spec.name}: {spec.value}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4">
                    {product.pictures.map((data, index) => (
                        <img
                            key={index}
                            src={data.imageUrl}
                            alt={`Product Image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
