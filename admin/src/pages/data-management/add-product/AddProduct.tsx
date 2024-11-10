import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Brand } from "../../../model/brand";
import { BRAND_CONTROLLER_getBrands } from "../../../controller/brand";
import { CATEGORY_CONTROLLER_getCategories } from "../../../controller/category"; // Import CATEGORY_CONTROLLER
import {
    handleThumbnailUpload,
    handleImageUpload,
    handleDeleteImage,
    handleClearAllImages,
    handleDeleteThumbnail
} from "./handler"; // Impor semua fungsi handler
import { PRODUCT_SPEC_OPT_CONTROLLER_getOptions } from "../../../controller/product.specification.option";
import { ProductSpecificationOption } from "../../../model/product.specification.option";
import { showFailed, showSuccess } from "../../../util/alert";
import axios from "axios";
import { Button } from "antd";

// Fungsi untuk form registrasi produk
export default function ProductRegistrationForm() {
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);

    const [brandData, setBrandData] = useState<Brand[]>([]);
    const [specOptions, setSpecOptions] = useState<ProductSpecificationOption[]>([]);
    const [categoryData, setCategoryData] = useState<{ id: number; name: string }[]>([]);

    const [specifications, setSpecifications] = useState([{ type: "", value: "" }]);
    const [name, setName] = useState(""); // State untuk nama produk
    const [description, setDescription] = useState(""); // State untuk deskripsi produk
    const [selectedBrand, setSelectedBrand] = useState<number | null>(null); // State untuk merek yang dipilih
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // State untuk kategori yang dipilih

    // Fungsi untuk menambah baris spesifikasi baru
    const handleAddSpecification = () => {
        setSpecifications([...specifications, { type: "", value: "" }]);
    };

    // Fungsi untuk mengubah nilai spesifikasi tertentu
    const handleSpecificationChange = (index: number, field: any, newValue: any) => {
        const updatedSpecs = specifications.map((spec, i) =>
            i === index ? { ...spec, [field]: newValue } : spec
        );
        setSpecifications(updatedSpecs);
    };

    // Fungsi untuk menghapus baris spesifikasi tertentu
    const handleDeleteSpecification = (index: number) => {
        const updatedSpecs = specifications.filter((_, i) => i !== index);
        setSpecifications(updatedSpecs);
    };

    useEffect(() => {
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
                const categories = await CATEGORY_CONTROLLER_getCategories();
                setCategoryData(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchSpecOption = async () => {
            try {
                const specOptionData: ProductSpecificationOption[] = await PRODUCT_SPEC_OPT_CONTROLLER_getOptions();
                setSpecOptions(specOptionData); // Simpan data spesifikasi yang diambil ke dalam state
            } catch (error) {
                console.error('Error fetching specification options:', error);
            }
        };

        fetchBrands();
        fetchCategories();
        fetchSpecOption(); // Panggil fungsi untuk mengambil spesifikasi opsi
    }, []);

    const resetForm = () => {
        setName('');
        setDescription('');
        setSelectedBrand(null);
        setSelectedCategory(null);
        setThumbnail(null);
        setImages([]);
        setSpecifications([{ type: "", value: "" }]);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Fungsi untuk mengubah file menjadi Base64
            const toBase64 = (file: File) => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = (error) => reject(error);
                });
            };

            // Konversi thumbnail dan galeri ke Base64
            const thumbnailBase64 = thumbnail ? await toBase64(thumbnail) : null;
            const galleryBase64 = await Promise.all(images.map((image) => toBase64(image)));

            // Bentuk `specification_data` sesuai format yang baru
            const specification_data = specifications.map((spec, index) => ({
                spec_opt_id: specOptions.find(option => option.name === spec.type)?.id,
                value: spec.value,
                index
            }));

            // Bentuk `picture_data` dengan thumbnail sebagai `index: 0` dan sisanya untuk galeri
            const pictures = [
                { index: 0, base64: thumbnailBase64 },
                ...galleryBase64.map((base64, idx) => ({
                    index: idx + 1, // indeks dimulai dari 1 untuk galeri
                    base64
                }))
            ];

            // Bentuk data form sesuai dengan format yang diinginkan
            const productData = {
                name,
                description,
                brand_id: selectedBrand,
                category_id: selectedCategory,
                specification_data,
                pictures
            };

            console.log(productData);

            const response = await axios.post('/api/admin/feature/product/create', productData);
            if (response.status === 201) {
                await showSuccess('Ok', 'Data berhasil disimpan');
                resetForm();
            }
        } catch (error: any) {
            console.log(error);

            await showFailed('Error', error.response.data.message);
            return;
        }
    };

    return (
        <form className="mt-6 flex gap-6 text-sm" onSubmit={handleSubmit}>
            {/* Kolom Detail Produk */}
            <div className="space-y-4 flex-1">
                <div>
                    <label className="block text-gray-800 font-medium">Nama</label>
                    <input
                        type="text"
                        placeholder="Masukkan nama produk"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-slate-600 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-800 font-medium">Deskripsi</label>
                    <textarea
                        placeholder="Masukkan deskripsi produk"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32 focus:ring-2 focus:ring-slate-600 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-800 font-medium">Merek</label>
                    <select
                        value={selectedBrand ?? ""}
                        onChange={(e) => setSelectedBrand(Number(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-slate-600 focus:outline-none transition-all duration-300 ease-in-out"
                    >
                        <option value="" disabled>Pilih Merek</option>
                        {brandData.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-800 font-medium">Kategori</label>
                    <select
                        value={selectedCategory ?? ""}
                        onChange={(e) => setSelectedCategory(Number(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-slate-600 focus:outline-none transition-all duration-300 ease-in-out"
                    >
                        <option value="" disabled>Pilih Kategori</option>
                        {categoryData.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div id="kolom-spesifikasi" className="flex flex-col space-y-2">
                    <label className="block text-gray-800 font-medium">Spesifikasi</label>

                    {/* Render setiap baris spesifikasi */}
                    {specifications.map((spec, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            {/* Dropdown untuk jenis spesifikasi */}
                            <select
                                value={spec.type}
                                onChange={(e) => handleSpecificationChange(index, "type", e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-1/3 focus:ring-2 focus:ring-slate-600"
                            >
                                <option value="" disabled>Pilih Spesifikasi</option>
                                {specOptions.map((option) => (
                                    <option key={option.id} value={option.name}>{option.name}</option>
                                ))}
                            </select>

                            {/* Input untuk nilai spesifikasi */}
                            <input
                                type="text"
                                placeholder="Masukkan nilai (contoh: RTX 3080)"
                                value={spec.value}
                                onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                                className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-slate-600"
                            />

                            {/* Tombol hapus untuk menghapus baris spesifikasi */}
                            <button
                                type="button"
                                onClick={() => handleDeleteSpecification(index)}
                                className="bg-red-500 hover:bg-red-600 text-white rounded-md p-2"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}

                    {/* Tombol untuk menambah spesifikasi baru */}
                    <div className="flex justify-center w-full">
                        <Button color="primary" variant="outlined" onClick={handleAddSpecification} className="w-1/2">
                            Tambah Spesifikasi
                        </Button>
                    </div>
                </div>

                <Button className="w-full" htmlType="submit" type="primary" >
                    Tambahkan Produk
                </Button>
            </div>

            {/* Kolom Upload Gambar */}
            <div className="flex flex-col flex-1">
                <label className="block text-gray-800 font-medium">Thumbnail</label>
                <div className="flex items-center mt-1">
                    <input
                        type="file"
                        id="thumbnail-upload"
                        onChange={(e) => handleThumbnailUpload(e, (file) => {
                            setUploadingThumbnail(true);
                            setThumbnail(file);
                            setTimeout(() => setUploadingThumbnail(false), 500);
                        })}
                        className="hidden"
                    />
                    <label htmlFor="thumbnail-upload" className="cursor-pointer font-medium w-full border border-gray-300 rounded-md p-2 text-center hover:bg-slate-200 bg-slate-100 transition-all duration-300">
                        {uploadingThumbnail ? "Mengunggah..." : "Pilih Thumbnail"}
                    </label>
                    {thumbnail && (
                        <button
                            type="button"
                            className="ml-2 bg-red-500 text-white rounded-md p-1 hover:bg-red-600 transition duration-300"
                            onClick={() => handleDeleteThumbnail(setThumbnail)}
                        >
                            Hapus
                        </button>
                    )}
                </div>
                {thumbnail && (
                    <div className="mt-2 flex items-center">
                        <div className="relative">
                            <img
                                src={URL.createObjectURL(thumbnail)}
                                alt="Thumbnail"
                                className="w-48 h-32 object-cover border border-gray-300 rounded-md" // Diubah ke w-48
                            />
                            <button
                                type="button"
                                className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-md p-3 hover:bg-red-600 transition duration-300"
                                onClick={() => handleDeleteThumbnail(setThumbnail)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                )}

                <label className="block text-gray-800 font-medium mt-4">Galeri</label>
                <div className="flex items-center mt-1">
                    <input
                        type="file"
                        id="gallery-upload"
                        multiple
                        onChange={(e) => handleImageUpload(e, setImages, setUploadingGallery)}
                        className="hidden"
                    />
                    <label htmlFor="gallery-upload" className="text-slate cursor-pointer font-medium w-full border border-gray-300 rounded-md p-2 text-center hover:bg-slate-200 bg-slate-100 transition-all duration-300">
                        {uploadingGallery ? "Mengunggah..." : "Pilih Gambar Galeri"}
                    </label>
                    {images.length !== 0 && (
                        <button
                            type="button"
                            className="ml-2 bg-red-500 text-white rounded-md p-1 hover:bg-red-600 transition duration-300"
                            onClick={() => handleClearAllImages(setImages)}
                        >
                            Hapus Semua
                        </button>
                    )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                    {images.map((image, index) => (
                        <div key={index} className="relative w-48"> {/* Tetapkan lebar untuk setiap gambar */}
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Image ${index + 1}`}
                                className="w-full h-32 object-cover border border-gray-300 rounded-md"
                            />
                            <button
                                type="button"
                                className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition duration-300"
                                onClick={() => handleDeleteImage(index, setImages)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </form>
    );
}