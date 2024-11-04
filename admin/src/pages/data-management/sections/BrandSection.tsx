import { ImSad } from "react-icons/im";
import ButtonIcon from "../../../components/button/button_icon"
import BrandCard from "../../../components/card/BrandCard";
import { IconAddCircle } from "../../../components/icons/icon"
import { Brand } from "../../../model/brand"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BRAND_CONTROLLER_deleteBrand, BRAND_CONTROLLER_getBrands } from "../../../controller/brand";
import { showFailed, showPrompt, showSuccess } from "../../../util/alert";

function BrandSection() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const navigate = useNavigate();
    const handleDeleteBrand = async (brand_id: number, setBrands: React.Dispatch<React.SetStateAction<Brand[]>>) => {
        try {
            const confirm = await showPrompt('Hapus', 'Anda yakin? data tidak bisa dikembalikan.');
            if (confirm) {
                const response: any = await BRAND_CONTROLLER_deleteBrand(brand_id);
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
    const fetchBrand = async () => {
        try {
            const brandData = await BRAND_CONTROLLER_getBrands();
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
                        onEdit={(x) => { }}
                        onDelete={(id) => {
                            handleDeleteBrand(id, setBrands);
                        }}
                    />
                ))}
            </div>
        );
    };
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Merek</h2>
            <div className="flex justify-between items-center mb-4">
                <ButtonIcon icon={<IconAddCircle size={'1.5rem'} />} text={"Tambah Merek"} onClick={() => navigate('add-brand')} />
            </div>
            {/* Menggunakan fungsi renderBrands */}
            {renderBrands(brands)}
        </div>

    )
}

export default BrandSection