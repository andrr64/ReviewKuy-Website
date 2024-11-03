import React, { useEffect, useState } from "react";
import { ProductModel } from "../../model/product";
import { fetchProducts, handleDeleteProduct } from "./handler";
import RenderProducts from "./render";
import { useNavigate } from "react-router-dom";
import { Brand } from "../../model/brand";
import { BRAND_CONTROLLER_getBrands } from "../../controller/brand";
import ButtonIcon from "../../components/button/button_icon";
import { IconAddCircle } from "../../components/icons/icon";

const ProductPage: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const navigate = useNavigate();

  const fetchBrand = async () => {
    try {
      const brandData = await BRAND_CONTROLLER_getBrands();
      setBrands(brandData);
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProducts(setProducts);
    fetchBrand();
  }, []);

  return (
    <div className="p-8 space-y-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Data Management</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Brand List</h2>
        <div className="flex justify-between items-center mb-4">
          <ButtonIcon icon={<IconAddCircle size={'1.5rem'} />} text={"Tambah Merek"} onClick={() => navigate('add-brand')} />
        </div>
        <ul className="space-y-4">
          {brands.map((brand) => (
            <li key={brand.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition-all">
              <span className="text-lg font-medium text-gray-800">{brand.name}</span>
              <div className="space-x-2">
                <button className="px-3 py-1 text-sm font-semibold text-white bg-gray-600 rounded hover:bg-gray-700 transition">Ubah</button>
                <button className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Product List</h2>
        <div className="flex justify-between items-center mb-4">
          <ButtonIcon icon={<IconAddCircle size={'1.5rem'} />} text={"Tambah Produk"} onClick={() => navigate('add-product')} />
        </div>
        <RenderProducts products={products} onDelete={(id) => handleDeleteProduct(id, setProducts)} />
      </div>
    </div>
  );
};

export default ProductPage;
