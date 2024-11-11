import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toBase64 } from "../../../util/fileConverter";
import { showFailed, showSuccess } from "../../../util/alert";
import { Brand } from "../../../model/brand";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../state/loading/loadingSlicer";
import { BrandAPI } from "../../../api/brand";

function EditBrandForm() {
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        logo_url: ""
    });
    const [oldLogo, setOldLogoUrl] = useState<string>('');
    const { id } = useParams();
    const dispatch = useDispatch();

    const fetchData = async () => {
        const response: any = await BrandAPI.getBrandById(id);
        const oldBrandData = new Brand(response.data);
        setOldLogoUrl(oldBrandData.logo_url);
        setFormData(oldBrandData.toForm());
    }

    useEffect(() => {
        fetchData();
    }, []); // Hanya panggil fetchData sekali saat komponen dimuat

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true));
        const data = {
            name: formData.name,
            description: formData.description,
            logo_url: formData.logo_url,
            new_logo: logoFile ? await toBase64(logoFile) : null,
        };
        
        try {
            const response: any = await BrandAPI.updateBrand(id, data);
            if (response) {
                await showSuccess('Success', 'Merek berhasil disimpan!');
                setLogoFile(null);
                fetchData(); // Memperbarui state setelah submit
            }
        } catch (error: any) {
            console.log(error);
            showFailed('Error', error.response.data.message);
        }
        dispatch(setLoading(false));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.id]: e.target.value,
        }));
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setLogoFile(file);
        }
    };

    const handleRemoveLogo = () => {
        setLogoFile(null);
        console.log("Logo telah dihapus.");
    };

    return (
        <form onSubmit={handleSubmit} className="w-1/2 mt-6 gap-6 text-sm">
            <div className="space-y-4 flex-1">
                <div>
                    <label htmlFor="name" className="block text-gray-800 font-medium">Nama</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Masukkan nama produk"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-slate-600 focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-800 font-medium">Deskripsi</label>
                    <textarea
                        id="description"
                        placeholder="Masukkan deskripsi produk"
                        value={formData.description}
                        onChange={handleChange}
                        maxLength={255}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32 focus:ring-2 focus:ring-slate-600 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-800 font-medium">Logo</label>
                    <div className="relative inline-block mt-2 mb-4">
                        <img
                            src={logoFile === null ? oldLogo : URL.createObjectURL(logoFile)}
                            alt="Logo Preview"
                            className="w-128 h-64 object-contain border border-gray-300 rounded-md"
                        />
                        {logoFile != null && (
                            <button
                                type="button"
                                onClick={handleRemoveLogo}
                                className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-md p-3 hover:bg-red-600 transition duration-300"
                            >
                                <FaTrash size={18} />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center mt-1">
                        <input
                            type="file"
                            id="logo-upload"
                            onChange={handleLogoUpload}
                            className="hidden"
                        />
                        <label
                            htmlFor="logo-upload"
                            className="text-slate cursor-pointer font-medium w-full border border-gray-300 rounded-md p-2 text-center hover:bg-slate-200 bg-slate-100 transition-all duration-300"
                        >
                            {logoFile === null ? "Ganti Logo" : "Upload logo"}
                        </label>
                    </div>
                    {logoFile && (
                        <p className="mt-2 text-sm text-green-600">Logo "{logoFile.name}" berhasil diunggah!</p>
                    )}
                </div>
            </div>
            <button type="submit" className="mt-6 w-full btn-dark">
                Submit
            </button>
        </form>
    );
}

export default EditBrandForm;
