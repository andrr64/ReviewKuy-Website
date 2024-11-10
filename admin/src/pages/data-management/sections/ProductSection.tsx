import { useEffect, useState } from "react";
import RenderProducts from "../render";
import { ProductModel } from "../../../model/product";
import { useNavigate } from "react-router-dom";
import { showFailed, showPrompt, showSuccess } from "../../../util/alert";
import { PRODUCT_CONTROLLER_deleteProduct, PRODUCT_CONTROLLER_getProducts } from "../../../controller/product";
import ButtonIcon from "../../../components/button/button_icon";
import { IconAddCircle } from "../../../components/icons/icon";

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
                await PRODUCT_CONTROLLER_deleteProduct(id);

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
            const productData = await PRODUCT_CONTROLLER_getProducts();
            setProducts(productData); // Update state dengan data produk
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Produk</h2>
            <div className="mb-4 space-y-4">
                <form className="w-full">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Mockups, Logos..."
                            required
                        />
                        <button
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search
                        </button>
                    </div>
                </form>
                <ButtonIcon icon={<IconAddCircle size={'1.5rem'} />} text={"Tambah Produk"} onClick={() => navigate('add-product')} />
            </div>
            <RenderProducts products={products} onDelete={(id) => handleDeleteProduct(id, setProducts)} />
        </div>
    )
}
