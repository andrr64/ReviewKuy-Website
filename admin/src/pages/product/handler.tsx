// handlers/productHandlers.ts
import { PRODUCT_CONTROLLER_deleteProduct, PRODUCT_CONTROLLER_getProducts } from "../../controller/product";
import { showFailed, showInfo, showPrompt } from "../../util/alert";
import { ProductModel } from "../../model/product";

// Fungsi untuk memuat produk dari API
export const fetchProducts = async (setProducts: React.Dispatch<React.SetStateAction<ProductModel[]>>) => {
  try {
    const productData = await PRODUCT_CONTROLLER_getProducts();
    setProducts(productData); // Update state dengan data produk
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Fungsi untuk menghapus produk
export const handleDeleteProduct = async (id: number, setProducts: React.Dispatch<React.SetStateAction<ProductModel[]>>) => {
  try {
    const confirm = await showPrompt(
      "Hapus Produk",
      "Anda yakin ingin menghapus produk? data yang dihapus tidak bisa dikembalikan."
    );
    if (confirm) {
      await PRODUCT_CONTROLLER_deleteProduct(id);

      // Jika berhasil, tampilkan info dan hapus produk dari state
      showInfo("Berhasil", "Data berhasil dihapus.");
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    }
  } catch (error) {
    showFailed("Gagal", error.message);
  }
};
