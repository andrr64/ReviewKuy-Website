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
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<ProductModel[]>([]);

    const handleDeleteProduct = async (id: number) => {
        try {
            const confirm = await showPrompt(
                "Hapus Produk",
                "Anda yakin ingin menghapus produk? data yang dihapus tidak bisa dikembalikan."
            );
            if (confirm) {
                await ProductAPI.deleteProduct(id);
                await showSuccess('Success', 'Data berhasil dihapus');
                
                // Menghapus produk dari state setelah berhasil dihapus
                setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
                setSearchResult(prevResults => prevResults.filter(product => product.id !== id));
            }
        } catch (error: any) {
            showFailed("Gagal", error.response?.data?.message || "Terjadi kesalahan saat menghapus produk.");
        }
    };

    const handleSearch = async (query: string) => {
        setSearch(query);
        if (query.trim()) {
            const response = await ProductAPI.searchProduct(query);
            setSearchResult(response);
        } else {
            setSearchResult([]);
        }
    };

    const handleClearSearch = () => {
        setSearch('');
        setSearchResult([]);
    };

    const fetchProducts = async () => {
        try {
            const productData = await ProductAPI.getProducts();
            setProducts(productData);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Produk</h2>
            <div className="mb-4 space-y-4">
                <SearchBar onSearch={handleSearch} />
                <Button type="primary" onClick={() => navigate('add-product')}>Tambah Produk</Button>
            </div>
            
            {(searchResult.length !== 0 || search.length !== 0) && (
                <>
                    <div className='flex items-center gap-2'>
                        <p>Hasil pencarian <b>{`${search}`}</b> {`(${searchResult.length} hasil)`}</p>
                        <Button color='danger' onClick={handleClearSearch}>Clear</Button>
                    </div>
                    <RenderProducts products={searchResult} onDelete={(id) => handleDeleteProduct(id)} />
                </>
            )}

            {searchResult.length === 0 && search.length === 0 && (
                <RenderProducts products={products} onDelete={(id) => handleDeleteProduct(id)} />
            )}
        </div>
    );
}
