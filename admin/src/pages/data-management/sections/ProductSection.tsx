import { useEffect, useState } from "react";
import ButtonIcon from "../../../components/button/button_icon";
import RenderProducts from "../render";
import { ProductModel } from "../../../model/product";
import { IconAddCircle } from "../../../components/icons/icon";
import { useNavigate } from "react-router-dom";
import { showFailed, showPrompt, showSuccess } from "../../../util/alert";
import { PRODUCT_CONTROLLER_deleteProduct, PRODUCT_CONTROLLER_getProducts } from "../../../controller/product";

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
            <div className="flex justify-between items-center mb-4">
                <ButtonIcon icon={<IconAddCircle size={'1.5rem'} />} text={"Tambah Produk"} onClick={() => navigate('add-product')} />
            </div>
            <RenderProducts products={products} onDelete={(id) => handleDeleteProduct(id, setProducts)} />
        </div>
    )
}
