import React from "react";

interface Brand {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
}

const ProductPage: React.FC = () => {
  const dummyBrands: Brand[] = [
    { id: 1, name: "Brand A" },
    { id: 2, name: "Brand B" },
    { id: 3, name: "Brand C" },
  ];

  const dummyProducts: Product[] = [
    { id: 1, name: "Product 1", brand: "Brand A" },
    { id: 2, name: "Product 2", brand: "Brand B" },
    { id: 3, name: "Product 3", brand: "Brand C" },
  ];

  const handleEdit = (id: number, type: string) => {
    console.log(`Edit ${type} with id: ${id}`);
  };

  const handleDelete = (id: number, type: string) => {
    console.log(`Delete ${type} with id: ${id}`);
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Product & Brand Management
      </h1>

      {/* Card Brand */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 flex items-center">
          <span className="material-icons text-3xl mr-2">local_offer</span> Brand List
        </h2>
        <ul className="space-y-3">
          {dummyBrands.map((brand) => (
            <li
              key={brand.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-all"
            >
              <span className="text-lg font-medium text-gray-700">{brand.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(brand.id, "brand")}
                  className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                >
                  Ubah
                </button>
                <button
                  onClick={() => handleDelete(brand.id, "brand")}
                  className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Product */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-600 flex items-center">
          <span className="material-icons text-3xl mr-2">shopping_bag</span> Product List
        </h2>
        <ul className="space-y-3">
          {dummyProducts.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-all"
            >
              <div>
                <div className="text-lg font-medium text-gray-800">{product.name}</div>
                <div className="text-sm text-gray-500">Brand: {product.brand}</div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(product.id, "product")}
                  className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                >
                  Ubah
                </button>
                <button
                  onClick={() => handleDelete(product.id, "product")}
                  className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductPage;
