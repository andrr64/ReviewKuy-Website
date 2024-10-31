import React, { useEffect, useState } from "react";
import { ProductModel } from "../../model/product";
import { fetchProducts, handleDeleteProduct } from "./handler";
import RenderProducts from "./render";
import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";

interface Brand {
  id: number;
  name: string;
}

const ProductPage: React.FC = () => {
  const dummyBrands: Brand[] = [
    { id: 1, name: "Brand A" },
    { id: 2, name: "Brand B" },
    { id: 3, name: "Brand C" },
  ];

  const [products, setProducts] = useState<ProductModel[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts(setProducts); // Panggil fetchProducts saat komponen pertama kali dimuat
  }, []);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Product & Brand Management
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 flex items-center">Brand List</h2>
        <ul className="space-y-3">
          {dummyBrands.map((brand) => (
            <li key={brand.id} className="flex justify-between items-center bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-all">
              <span className="text-lg font-medium text-blue-800">{brand.name}</span>
              <div className="space-x-2">
                <button className="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600 transition">Ubah</button>
                <button className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-600 flex items-center">Product List</h2>
        <div className="flex space-x-3">
          <Button onClick={() => {
            navigate('/product/add')
          }} text="Tambah Produk" bgColor="bg-slate-100" hoverColor="hover:bg-slate-200" textColor="text-slate" />
        </div>
        <RenderProducts products={products} onDelete={(id) => handleDeleteProduct(id, setProducts)} />
      </div>
    </div>
  );
};

export default ProductPage;
