import BrandSection from "./sections/BrandSection";
import CategorySection from "./sections/CategorySection";
import ProductSection from "./sections/ProductSection";
import SpecificationDataSection from "./sections/SpecificationDataSection";

// Fungsi untuk merender brand


const DataManagementPage = () => {
  return (
    <div className="p-8 space-y-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Manajemen Data Produk</h1>
      <BrandSection />
      <ProductSection/>
      <SpecificationDataSection/>
      <CategorySection/>
    </div>
  );
};

export default DataManagementPage;
