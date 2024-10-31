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

// Fungsi untuk form registrasi produk
export function ProductRegistrationForm() {
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);
    const [brandData, setBrandData] = useState<Brand[]>([]);
    const [categoryData, setCategoryData] = useState<{ id: number; name: string }[]>([]); // State untuk kategori
    // State untuk menyimpan spesifikasi sebagai array objek
    const [specifications, setSpecifications] = useState([{ type: "", value: "" }]);
    const specOptions = ["GPU", "CPU", "RAM", "Storage", "Layar", "Battery", "OS"];

    // Fungsi untuk menambah baris spesifikasi baru
    const handleAddSpecification = () => {
        setSpecifications([...specifications, { type: "", value: "" }]);
    };

    // Fungsi untuk mengubah nilai spesifikasi tertentu
    const handleSpecificationChange = (index:number, field:any, newValue:any) => {
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

        const fetchCategories = async () => { // Fungsi untuk mengambil kategori
            try {
                const categories = await CATEGORY_CONTROLLER_getCategories();
                setCategoryData(categories); // Simpan data kategori
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchBrands();
        fetchCategories(); // Panggil fungsi untuk mengambil kategori
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Logika untuk menambahkan produk bisa ditambahkan di sini
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Tambahkan Produk</h1>
            <p className="text-gray-600 mt-1">Silakan masukkan detail produk untuk registrasi.</p>
            <form className="mt-8" onSubmit={handleSubmit}>
                <div className="flex gap-6">
                    {/* Kolom Detail Produk */}
                    <div className="space-y-4 flex-1">
                        <div>
                            <label className="block text-gray-800 font-medium">Nama</label>
                            <input
                                type="text"
                                placeholder="Masukkan nama produk"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-slate-600 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-800 font-medium">Deskripsi</label>
                            <textarea
                                placeholder="Masukkan deskripsi produk"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32 focus:ring-2 focus:ring-slate-600 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-800 font-medium">Merek</label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-slate-600 focus:outline-none transition-all duration-300 ease-in-out">
                                {brandData.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-800 font-medium">Kategori</label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-slate-600 focus:outline-none transition-all duration-300 ease-in-out">
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
                                            <option key={option} value={option}>{option}</option>
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
                                        className="text-red-500 hover:text-red-700 p-2"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}

                            {/* Tombol untuk menambah spesifikasi baru */}
                            <button
                                type="button"
                                onClick={handleAddSpecification}
                                className="mt-2 w-1/2 btn-default"
                            >
                                Tambah Spesifikasi
                            </button>
                        </div>
                        <button type="submit" className="mt-6 w-full btn-dark">
                            Tambahkan Produk
                        </button>
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
                                    className="ml-2 bg-red-500 text-white rounded-md p-1 text-xs hover:bg-red-600 transition duration-300"
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
                                        className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-md p-3 text-xs hover:bg-red-600 transition duration-300"
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
                                    className="ml-2 bg-red-500 text-white rounded-md p-1 text-xs hover:bg-red-600 transition duration-300"
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
                                        className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-md p-2 text-xs hover:bg-red-600 transition duration-300"
                                        onClick={() => handleDeleteImage(index, setImages)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
