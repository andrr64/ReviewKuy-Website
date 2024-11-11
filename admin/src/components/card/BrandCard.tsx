import { Brand } from "../../model/brand";
import { Button } from 'antd';

interface BrandCardProps {
    brand: Brand;
    onEdit: (brand: Brand) => void; // Fungsi untuk mengedit produk
    onDelete: (brandId: any) => void; // Fungsi untuk menghapus produk
}

const BrandCard: React.FC<BrandCardProps> = ({ brand, onEdit, onDelete }) => {
    return (
        <div className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-all p-4">
            <div className="flex justify-center mb-4">
                <img
                    src={brand.logo_url}
                    alt={`${brand.name} logo`}
                    className="w-24 h-24 object-contain"
                />
            </div>
            <span className="block text-xl font-bold text-gray-800 mb-2">{brand.name}</span>
            <p className="text-gray-600 text-sm mb-4">{brand.description}</p>
            <div className="flex justify-between mt-auto">
                <Button color="primary" variant="filled" onClick={() => onEdit(brand)}>Ubah</Button>
                <Button color="danger" variant="filled" onClick={() => onDelete(brand.id)}>Hapus</Button>
            </div>
        </div>
    );
};

export default BrandCard;
