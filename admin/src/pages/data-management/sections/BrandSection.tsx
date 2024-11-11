import { ImSad } from "react-icons/im";
import BrandCard from "../../../components/card/BrandCard";
import { Brand } from "../../../model/brand"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showFailed, showPrompt, showSuccess } from "../../../util/alert";
import { Button } from "antd";
import SearchBar from "../../../components/search-bar/SearchBar";
import { BrandAPI } from "../../../api/brand";

function BrandSection() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [searchResult, setSearchResult] = useState<Brand[]>([]);
    const navigate = useNavigate();

    const handleDeleteBrand = async (brand_id: number, setBrands: React.Dispatch<React.SetStateAction<Brand[]>>) => {
        try {
            const confirm = await showPrompt('Hapus', 'Anda yakin? data tidak bisa dikembalikan.');
            if (confirm) {
                const response: any = await BrandAPI.deleteBrand(brand_id);
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
    const handleSearch = async (query: string) => {
        const response = await BrandAPI.searchBrand(query);
        console.log(response);
    }

    const fetchBrand = async () => {
        try {
            const brandData = await BrandAPI.getBrands();
            setBrands(brandData);
        } catch (e: any) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchBrand();
    }, []);

    const renderBrands = (brands: Brand[]) => {
        if (brands.length === 0) {
            return (
                <div className="space-y-2 flex text-base flex-col my-10 justify-center items-center">
                    <ImSad className="text-6xl" />
                    <h1 className="text-xl">Empty :(</h1>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Menggunakan grid dengan 3 kolom maksimum */}
                {brands.map((brand) => (
                    <BrandCard
                        key={brand.id}
                        brand={brand}
                        onEdit={(brand) => {
                            navigate(`edit-brand/${brand.id}`)
                        }}
                        onDelete={(id) => {
                            handleDeleteBrand(id, setBrands);
                        }}
                    />
                ))}
            </div>
        );
    };
    return (
        <div className="bg-white shadow rounded-lg space-y-4 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Merek</h2>
            <SearchBar onSearch={handleSearch} />
            <Button type="primary" onClick={() => navigate('add-brand')}>Tambah Merek</Button>
            {/* Menggunakan fungsi renderBrands */}
            {renderBrands(brands)}
        </div>

    )
}

export default BrandSection