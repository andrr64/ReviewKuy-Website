import React from 'react';
import { ProductModel } from '../../model/product';
import { Button } from 'antd';
interface ProductCardProps {
    product: ProductModel;
    onEdit: (product: ProductModel) => void; // Fungsi untuk mengedit produk
    onDelete: (productId: number) => void; // Fungsi untuk menghapus produk
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    return (
        <div className="flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-300 bg-white ">
            <div onClick={() => onEdit(product)} className="cursor-pointer relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                <img className="object-cover  h-60 mx-auto" src={product.pictures[0]?.imageUrl} alt={product.name} />
            </div>
            <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-slate-900">{product.name}</h5>
                <p className='mt-1'>{product.formattedPrice()}</p>
                <p className="mt-2 text-sm text-slate-900">{product.brand.name}</p> {/* Menampilkan merek */}
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <div className="flex items-center">
                        {/* Menampilkan rating */}
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                aria-hidden="true"
                                className={`h-5 w-5 ${index < 5 ? 'text-yellow-300' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                        ))}
                        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{5}</span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <Button color="primary" variant="filled" onClick={() => onEdit(product)}>Ubah</Button>
                    <Button color="danger" variant="filled" onClick={() => onDelete(product.id)}>Hapus</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
