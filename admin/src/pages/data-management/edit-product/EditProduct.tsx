import { useState, useEffect, useReducer } from "react";
import { FaTrash } from "react-icons/fa";
import { Brand } from "../../../model/brand";
import { ProductSpecificationOption } from "../../../model/product.specification.option";
import { BRAND_CONTROLLER_getBrands } from "../../../api/brand";
import { useParams } from "react-router-dom";
import { ProductModel } from "../../../model/product";
import RKTextInput from "../../../components/form/RKTextInput";
import RKTextArea from "../../../components/form/RKTextArea";
import { RKSelect } from "../../../components/form/RKSelect";
import { handleClearAllImages, handleDeleteImage, handleDeleteThumbnail, handleImageUpload, handleThumbnailUpload } from "../add-product/handler";
import { toBase64 } from "../../../util/fileConverter";
import axios from "axios";
import { showSuccess } from "../../../util/alert";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../state/loading/loadingSlicer";
import { Button } from 'antd';
import { ProductAPI } from "../../../api/product";
import { SpecificationOptAPI } from "../../../api/product.specification.option";
import { CategoryAPI } from "../../../api/category";

export default function EditProductForm() {
    const [newThumbnail, setNewThumbnail] = useState<File | null>(null);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();

    const [brandData, setBrandData] = useState<Brand[]>([]);
    const [specOptions, setSpecOptions] = useState<ProductSpecificationOption[]>([]);
    const [categoryData, setCategoryData] = useState<{ id: number; name: string }[]>([]);

    const [specifications, setSpecifications] = useState([{ spec_opt_id: "", value: "" }]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedBrandId, setSelectedBrand] = useState<number | null>(null);
    const [selectedCategoryId, setSelectedCategory] = useState<number | null>(null);
    const [product, setProduct] = useState<ProductModel | null>();
    const [oldThumbnail, setOldThumbnail] = useState<string | null>();
    const [oldGalery, setOldGalery] = useState<string[]>([]);

    const handleAddSpecification = () => {
        setSpecifications([...specifications, { spec_opt_id: "", value: "" }]);
    };

    const handleSpecificationChange = (index: number, field: any, newValue: any) => {
        const updatedSpecs = specifications.map((spec, i) =>
            i === index ? { ...spec, [field]: newValue } : spec
        );
        setSpecifications(updatedSpecs);
    };

    const handleDeleteSpecification = (index: number) => {
        const updatedSpecs = specifications.filter((_, i) => i !== index);
        setSpecifications(updatedSpecs);
    };

    const fetchBrands = async () => {
        try {
            const brands = await BRAND_CONTROLLER_getBrands();
            setBrandData(brands);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const categories = await CategoryAPI.getCategories();
            setCategoryData(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchSpecOption = async () => {
        try {
            const specOptionData: ProductSpecificationOption[] = await SpecificationOptAPI.getOptions();
            setSpecOptions(specOptionData);
        } catch (error) {
            console.error('Error fetching specification options:', error);
        }
    };

    const fetchProductData = async () => {
        try {
            const product = await ProductAPI.getProductById(id as any);
            setProduct(product);
            setName(product.name);
            setDescription(product.description);
            setSelectedBrand(product.brand.id);
            setSelectedCategory(product.category.id);
            setSpecifications(product.specifications.map((spec: any) => ({
                spec_opt_id: spec.spec_opt_id,
                value: spec.value
            })));
            setOldThumbnail(product.pictures[0].imageUrl);
            setOldGalery(product.pictures.slice(1).map((val) => val.imageUrl));
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    useEffect(() => {
        fetchBrands();
        fetchCategories();
        fetchSpecOption();
        fetchProductData();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        dispatch(setLoading(true));
        try {
            const specification_data = specifications.map((spec, index) => ({
                spec_opt_id: spec.spec_opt_id,
                value: spec.value,
                index
            }));
            const new_galery_base64 = await Promise.all(newImages.map((val) => toBase64(val)));
            const productData = {
                name,
                description,
                brand_id: selectedBrandId,
                category_id: selectedCategoryId,
                specification_data,
                new_thumbnail_base64: newThumbnail !== null ? await toBase64(newThumbnail) : null,
                new_galery_base64: newImages.length !== 0 ? new_galery_base64 : null,
                pictures: [oldThumbnail, ...oldGalery]
            };
            const response = await axios.put(`/api/admin/feature/product/update/${product?.id}`, productData)
            await delay(500);
            if (response.status === 200) {
                await fetchProductData();
                await showSuccess('Success', 'Data berhasil diperbaharui');
                setNewThumbnail(null);
                setNewImages([]);
            }
        } catch (error: any) {
            console.error('Error updating product:', error);
        }
        dispatch(setLoading(false));
    };

    return (
        <>
            <form className={`mt-6 text-sm ${false ? 'pointer-events-none' : ''}`} onSubmit={handleSubmit}>
                <div className="flex gap-6">
                    <div className="space-y-4 flex-1">
                        <RKTextInput
                            label={"Nama"}
                            placeholder={"Masukkan nama produk"}
                            value={name}
                            id={"name"}
                            onChange={(e) => setName(e.target.value)} />
                        <RKTextArea
                            label="Deskripsi"
                            id="description" // Tambahkan id untuk textarea
                            placeholder="Masukkan deskripsi produk"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <RKSelect
                            label={"Merek"}
                            value={selectedBrandId ?? ''}
                            onChange={(e: any) => setSelectedBrand(e.target.value)}
                            options={brandData.map((brand) => (
                                {
                                    id: brand.id,
                                    val: brand.name
                                }
                            ))} />
                        <RKSelect
                            label={""}
                            value={selectedCategoryId ?? ''}
                            onChange={(e: any) => setSelectedCategory(e.target.value)}
                            options={categoryData.map((category) => (
                                {
                                    id: category.id,
                                    val: category.name
                                }
                            ))} />

                        <div id="kolom-spesifikasi" className="flex flex-col space-y-2">
                            <label className="block text-gray-800 font-medium">Spesifikasi</label>
                            {specifications.map((spec, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <select
                                        value={spec.spec_opt_id}
                                        onChange={(e) => handleSpecificationChange(index, "spec_opt_id", e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 w-1/3 focus:ring-2 focus:ring-slate-600"
                                    >
                                        <option value="" disabled>Pilih Spesifikasi</option>
                                        {specOptions.map((option) => (
                                            <option key={option.id} value={option.id}>{option.name}</option>
                                        ))}
                                    </select>

                                    <input
                                        type="text"
                                        placeholder="Masukkan nilai (contoh: RTX 3080)"
                                        value={spec.value}
                                        onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-slate-600"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteSpecification(index)}
                                        className="bg-red-500 text-white p-2 rounded-md flex items-center justify-center"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                            <Button color="primary" variant="filled" onClick={handleAddSpecification}>Tambah Spesifikasi</Button>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1">
                        <label className="block text-gray-800 font-medium">Thumbnail</label>
                        <div className="flex items-center mt-1">
                            <input
                                type="file"
                                id="thumbnail-upload"
                                onChange={(e) => handleThumbnailUpload(e, (file) => {
                                    setUploadingThumbnail(true);
                                    setNewThumbnail(file);
                                    setTimeout(() => setUploadingThumbnail(false), 500);
                                })}
                                className="hidden"
                            />

                            <label htmlFor="thumbnail-upload" className="cursor-pointer font-medium w-full border border-gray-300 rounded-md p-1  text-center hover:bg-slate-200 bg-slate-100 transition-all duration-300">
                                {uploadingThumbnail ? "Mengunggah..." : (newThumbnail ? 'Upload Thumbnail' : 'Ganti Thumbnail')}
                            </label>
                            {newThumbnail && (
                                <button
                                    type="button"
                                    className="ml-2 bg-red-500 text-white rounded-md p-1 hover:bg-red-600 transition duration-300"
                                    onClick={() => handleDeleteThumbnail(setNewThumbnail)}
                                >
                                    Hapus
                                </button>
                            )}
                        </div>
                        {newThumbnail && (
                            <div className="mt-2 flex items-center">
                                <div className="relative">
                                    <img
                                        src={URL.createObjectURL(newThumbnail)}
                                        alt="Thumbnail"
                                        className="w-48 h-32 object-cover border border-gray-300 rounded-md" // Diubah ke w-48
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-md p-3 hover:bg-red-600 transition duration-300"
                                        onClick={() => handleDeleteThumbnail(setNewThumbnail)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        )}
                        {(newThumbnail === null && oldThumbnail) && (
                            <div className="mt-2 flex items-center">
                                <div className="relative">
                                    <img
                                        src={oldThumbnail}
                                        alt="Thumbnail"
                                        className="w-48 h-32 object-cover border border-gray-300 rounded-md" // Diubah ke w-48
                                    />
                                </div>
                            </div>
                        )}

                        <label className="block text-gray-800 font-medium mt-4">Galeri</label>
                        <div className="flex items-center mt-1">
                            <input
                                type="file"
                                id="gallery-upload"
                                multiple
                                onChange={(e) => handleImageUpload(e, setNewImages, setUploadingGallery)}
                                className="hidden"
                            />
                            <label htmlFor="gallery-upload" className="cursor-pointer font-medium w-full border border-gray-300 rounded-md p-1  text-center hover:bg-slate-200 bg-slate-100 transition-all duration-300">
                                {uploadingGallery ? "Mengunggah..." : newImages.length === 0 ? 'Ganti Galeri' : 'Upload Galeri'}
                            </label>
                            {newImages.length !== 0 && (
                                <button
                                    type="button"
                                    className="ml-2 bg-red-500 text-white rounded-md p-1 hover:bg-red-600 transition duration-300"
                                    onClick={() => handleClearAllImages(setNewImages)}
                                >
                                    Hapus Semua
                                </button>
                            )}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {newImages.map((image, index) => (
                                <div key={index} className="relative w-48"> {/* Tetapkan lebar untuk setiap gambar */}
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-32 object-cover border border-gray-300 rounded-md"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition duration-300"
                                        onClick={() => handleDeleteImage(index, setNewImages)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                            {(newImages.length === 0) && oldGalery.map((imageUrl, index) => (
                                <div key={index} className="relative w-48"> {/* Tetapkan lebar untuk setiap gambar */}
                                    <img
                                        src={imageUrl}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-32 object-cover border border-gray-300 rounded-md"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <Button className="w-full" type="primary" htmlType="submit">Perbaharui Produk</Button>
                </div>
            </form>
        </>
    );
}
