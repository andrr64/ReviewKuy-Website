// handlers/productHandlers.ts
import { PRODUCT_CONTROLLER_deleteProduct, PRODUCT_CONTROLLER_getProducts } from "../../controller/product";
import { BRAND_CONTROLLER_deleteBrand } from "../../controller/brand"; // Import controller untuk brand
import { showFailed, showPrompt, showSuccess } from "../../util/alert";
import { ProductModel } from "../../model/product";
import { Brand } from "../../model/brand";

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
      await showSuccess('Success', 'Data berhasil dihapus');
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    }
  } catch (error: any) {
    showFailed("Gagal", error.response.data.message);
  }
};

// Fungsi untuk menghapus brand
export const handleDeleteBrand = async (brand_id: number, setBrands: React.Dispatch<React.SetStateAction<Brand[]>>) => {
  try {
    const confirm = await showPrompt('Hapus', 'Anda yakin? data tidak bisa dikembalikan.');
    if (confirm) {
      const response: any = await BRAND_CONTROLLER_deleteBrand(brand_id);
      if (response.status === 200) {
        await showSuccess('Success', 'Data berhasil dihapus');
        // Menghapus brand dari state
        setBrands(prevBrands => prevBrands.filter(brand => brand.id !== brand_id));
      }
    }
  } catch (error: any) {
    showFailed("Gagal", error.response.data.message);
  }
};
