import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ProductModel } from "../../model/product.model";
import { ProductAPI } from "../../api/product.api";
import { httpGetOk } from "../../api/util";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { loadingEnd, loadingStart } from "../../state/uiState/uiState";
import BackPageButton from "../../components/button/BackPageButton";
import Header from "./sections/Header";
import Deskripsi from "./sections/Deskripsi";
import SpesifikasiProduk from "./sections/Spesifikasi";
import { setTitle } from "../utility";
import Ulasan from "./sections/Ulasan";

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductModel | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchProduct = async () => {
        const response = await ProductAPI.getProductById(id);
        if (httpGetOk(response)) {
            const _product = new ProductModel(response.data);
            setProduct(_product);
            setTitle(`${_product.name}`);
        } else {
            navigate('/notfound');
        }
    }
    const fetchData = async () => {
        dispatch(loadingStart());
        await fetchProduct();
        dispatch(loadingEnd());
    }

    useEffect(() => {
        fetchData();
    }, [])

    const renderProduct = () => {
        if (product !== null) {
            return (
                <div className="w-full flex flex-col items-center">
                    <div className="w-full max-w-6xl flex flex-col space-y-5">
                        <Header product={product} />
                        <div className="bg-dark-purple text-white w-full p-3">
                            asd
                        </div>
                        <section id="info-produk" className="my-10 space-y-10">
                            <Deskripsi deskripsi={product.description} />
                            <SpesifikasiProduk list_spek={product.specifications} />
                        </section>
                        <div className="bg-dark-purple text-white w-full py-5"></div>
                        <Ulasan product_id={id} />
                    </div>
                </div>
            )

        }
    }

    return (
        <Container>
            <div className="min-h-screen">
                <BackPageButton />
                {!!product && (
                    renderProduct()
                )}
            </div>
        </Container>
    )
}

export default ProductPage