import BrandCard from "../components/BrandCard"
import { useEffect, useState } from "react";
import { BrandAPI } from "../../../api/brand.api";
import { BrandModel } from "../../../model/brand.model";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";
import Container from "../../../components/Container";

function Brand() {
    const [brands, setBrands] = useState<BrandModel[] | null>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchBrand = async () => {
        setLoading(true);
        try {
            const response = await BrandAPI.getAllBrands();
            if (response.status === 200) {
                setBrands(response.data.map((val: any) => new BrandModel(val)));
            } else {
                setBrands(null);
            }
        } catch (error) {
            // handle error if needed
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchBrand();
    }, [])

    return (
        <section id="brand">
            <Container>
                <h1 className="text-2xl font-bold text-primary mb-10">Merek</h1>
                <div className="w-full flex items-center flex-col gap-10">
                    {loading && (
                        <div className="my-10">
                            <LoadingSpinner size="20" />
                        </div>
                    )}
                    {brands !== null && brands.length !== 0 && !loading && (
                        <div className="hv-center flex gap-3 flex-wrap">
                            {brands.map((val, index) => (
                                <BrandCard key={index} brandName={val.name} imgUrl={val.logo_url} id={val.id} />
                            ))}
                        </div>
                    )}
                    {brands?.length === 0 && !loading && (
                        <div className="my-10 text-center ">
                            <p className="text-xl">Data merek tidak ditemukan.</p>
                            <button onClick={() => fetchBrand()} className="my-2">Refresh</button>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}

export default Brand;
