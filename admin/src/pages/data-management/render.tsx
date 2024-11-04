// renders/productRenders.tsx
import React from "react";
import { ProductModel } from "../../model/product";
import ProductCard from "../../components/card/ProductCard";
import { ImSad } from "react-icons/im";
import { useNavigate } from "react-router-dom";

interface RenderProductsProps {
  products: ProductModel[];
  onDelete: (id: number) => void;
}

const RenderProducts: React.FC<RenderProductsProps> = ({ products, onDelete }) => {
  const navigate = useNavigate();
  if (products.length === 0) {
    return (
      <div className="space-y-2 flex text-base flex-col my-10 justify-center items-center">
        <ImSad className="text-6xl" />
        <h1 className="text-xl">Empty :(</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"> {/* Menggunakan grid dengan 3 kolom maksimum */}
      {products.map((product) => (
        <ProductCard key={product.id} onEdit={(data) => {
          navigate(`/data/edit-product/${data.id}`)
        }} onDelete={() => onDelete(product.id)} product={product} />
      ))}
    </div>
  );
};

export default RenderProducts;
