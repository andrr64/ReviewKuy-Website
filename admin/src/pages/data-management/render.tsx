// renders/productRenders.tsx
import React from "react";
import { ProductModel } from "../../model/product";
import ProductCard from "../../components/card/ProductCard";
import { ImSad } from "react-icons/im";

interface RenderProductsProps {
  products: ProductModel[];
  onDelete: (id: number) => void;
}

const RenderProducts: React.FC<RenderProductsProps> = ({ products, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="space-y-2 flex text-base flex-col my-10 justify-center items-center">
        <ImSad className="text-6xl"/>
        <h1 className="text-xl">Empty :(</h1>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard onEdit={() => {}} onDelete={() => onDelete(product.id)} product={product} />
        </li>
      ))}
    </ul>
  );
};

export default RenderProducts;
