import { useEffect, useState } from "react";
import RenderProducts from "../render";
import { ProductModel } from "../../../model/product";
import { useNavigate } from "react-router-dom";
import { showFailed, showPrompt, showSuccess } from "../../../util/alert";
import SearchBar from "../../../components/search-bar/SearchBar";
import { Button } from "antd";
import { ProductAPI } from "../../../api/product";

export default function ProductSection() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductModel[]>([]);

    const handleDeleteProduct = async (id: number, setProducts: React.Dispatch<React.SetStateAction<ProductModel[]>>) => {
        try {
            const confirm = await showPrompt(
                "Hapus Produk",
                "Anda yakin ingin menghapus produk? data yang dihapus tidak bisa dikembalikan."
            );
            if (confirm) {
                await ProductAPI.deleteProduct(id);

                // Jika berhasil, tampilkan info dan hapus produk dari state
                await showSuccess('Success', 'Data berhasil dihapus');
                setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            }

        } catch (error: any) {
            showFailed("Gagal", error.response.data.message);
        }
    };

    useEffect(() => {
        fetchProducts(setProducts);
    }, []);
    const fetchProducts = async (setProducts: React.Dispatch<React.SetStateAction<ProductModel[]>>) => {
        try {
            const productData = await ProductAPI.getProducts();
            setProducts(productData); // Update state dengan data produk
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Produk</h2>
            <div className="mb-4 space-y-4">
                <SearchBar onSearch={(query) => {}} />
                <Button type="primary" onClick={() => navigate('add-product')}>Tambah Produk</Button>
            </div>
            <RenderProducts products={products} onDelete={(id) => handleDeleteProduct(id, setProducts)} />
        </div>
    )
}