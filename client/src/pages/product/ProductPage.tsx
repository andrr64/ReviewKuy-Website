import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ProductModel } from "../../model/product";
import { ProductAPI } from "../../api/product.api";
import { httpGetOk } from "../../api/util";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { loadingEnd, loadingStart } from "../../state/uiState/uiState";
import BackPageButton from "../../components/button/BackPageButton";
import Header from "./components/Header";

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductModel | null>(null);
    const { loading } = useSelector((state: RootState) => state.uiState);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const fetchData = async () => {
        dispatch(loadingStart());
        const response = await ProductAPI.getProductById(id);
        if (httpGetOk(response)) {
            setProduct(new ProductModel(response.data));
        } else {
            navigate('/notfound');
        }
        dispatch(loadingEnd());
    }

    useEffect(() => {
        fetchData();
    }, [])

    const renderProduct = () => {
        if (product !== null) {
            return <>
                <Header product={product} />
            </>
        }
    }

    return (
        <Container>
            <div className="space-y-10">
                <BackPageButton />
                {!!product && (
                    renderProduct()
                )}
            </div>
        </Container>
    )
}

export default ProductPage