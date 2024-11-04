import BrandSection from "./sections/BrandSection";
import ProductSection from "./sections/ProductSection";

// Fungsi untuk merender brand


const DataManagementPage = () => {
  return (
    <div className="p-8 space-y-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Manajemen Data</h1>
      <BrandSection />
      <ProductSection/>
    </div>
  );
};

export default DataManagementPage;
