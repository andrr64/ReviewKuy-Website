import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BrandModel } from "../../model/brand.model";
import { BrandAPI } from "../../api/brand.api";
import { showAlertByResponseCode } from "../../util/alert/alert";
import { ProductAPI } from "../../api/product.api";
import { ProductModel } from "../../model/product.model";
import { httpGetOk } from "../../api/util";
import Container from "../../components/Container";
import ProductCard from "../../components/cards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { loadingEnd, loadingStart } from "../../state/uiState/uiState";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import BackPageButton from "../../components/button/BackPageButton";
import MinimalSearchBar from "../../components/search-bar/MinimalSearchBar";
import { setTitle } from "../utility";

function ProductByBrandPage() {
  const { id } = useParams();
  const [brand, setBrand] = useState<BrandModel | null>(null);
  const [products, setProducts] = useState<ProductModel[] | null>(null);
  const { loading } = useSelector((state: RootState) => state.uiState);
  const dispatch = useDispatch();
  const [querySearch, setQuerySearch] = useState<string>('');

  const fetchProducts = async () => {
    const response = await ProductAPI.getProductByBrand(id);
    if (httpGetOk(response)) {
      setProducts(response.data.map((val: any) => new ProductModel(val)));
    } else {
      showAlertByResponseCode(response.status);
    }
  };
  const fetchData = async () => {
    try {
      dispatch(loadingStart());
      const response = await BrandAPI.getBrandById(id);
      if (!httpGetOk(response)) {
        showAlertByResponseCode(response.status);
        return;
      }
      const brandData = new BrandModel(response.data);
      setBrand(brandData);
      setTitle(brandData.name);
      await fetchProducts();
    } finally {
      dispatch(loadingEnd());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderBrandInfo = () =>
    brand && (
      <div className="mb-10 flex gap-6 text-primary items-center">
        <img className="h-24" src={brand.logo_url} alt={`${brand.name} logo`} />
        <div className="flex flex-col justify-around gap-2">
          <h1 className="text-4xl font-bold">{brand.name}</h1>
          <p className="text-gray-600">{brand.description}</p>
        </div>
      </div>
    );
  const renderProducts = () =>
    products && products.length > 0 ? (
      products.map((val) => <ProductCard key={val.id} product={val} />)
    ) : (
      <p className="text-gray-500">No products available for this brand.</p>
    );
  const handleSearch = async () => {

  }
  return (
    <Container>
      <div className="space-y-10">
        <BackPageButton />
        <div className="min-h-screen">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <LoadingSpinner size='20' />
            </div>
          ) : (
            <div className="space-y-8">
              {renderBrandInfo()}
              <MinimalSearchBar value={querySearch} onChange={(val) => setQuerySearch(val)} onSubmit={(query) => { handleSearch() }}></MinimalSearchBar>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {renderProducts()}
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ProductByBrandPage;
