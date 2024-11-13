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
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<Brand[]>([]);
    const navigate = useNavigate();

    const handleDeleteBrand = async (brand_id: number) => {
        try {
            const confirm = await showPrompt('Hapus', 'Anda yakin? data tidak bisa dikembalikan.');
            if (confirm) {
                const response: any = await BrandAPI.deleteBrand(brand_id);
                if (response.status === 200) {
                    await showSuccess('Success', 'Data berhasil dihapus');
                    fetchBrand();
                }
            }
        } catch (error: any) {
            showFailed("Gagal", error.response.data.message);
        }
    };
    const handleSearch = async (query: string) => {
        setSearch(query);
        const response = await BrandAPI.searchBrand(query);
        setSearchResult(response);
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
    const handleClearSearch = () => {
        setSearch('');
        setSearchResult([]);
    }
    const renderBrands = (brands: Brand[]) => {
        if (brands.length === 0) {
            return (
                <p>Tidak ada data merek yang ditemukan.</p>
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
                            handleDeleteBrand(id);
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
            {(searchResult.length !== 0  || search.length !== 0)  && (
                <>
                    <div className='flex items-center gap-2'>
                        <p>Hasil pencarian <b>{`${search}`}</b> {`(${searchResult.length} hasil)`}</p>
                        <Button color='danger' variant='filled' onClick={handleClearSearch}>Clear</Button>
                    </div>
                    {renderBrands(searchResult)}
                </>
            )}
            {((searchResult.length === 0) && (search.length === 0)) && (renderBrands(brands))}
        </div>
    )
}

export default BrandSection