import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toBase64 } from "../../../util/fileConverter";
import { BRAND_CONTROLLER_addBrand, BRAND_CONTROLLER_getBrandById } from "../../../controller/brand";
import { showFailed, showSuccess } from "../../../util/alert";

function BrandForm() {
  const [logoFile, setLogoFile] = useState<File | null>(null); // State untuk file logo
  const [isUploading, setIsUploading] = useState(false); // State untuk status upload
  const [logoPreview, setLogoPreview] = useState<string | null>(null); // State untuk preview logo
  const [formData, setFormData] = useState({
    name: "", // State untuk nama produk
    description: "", // State untuk deskripsi produk
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      logo: logoFile? await toBase64(logoFile) : null
    }
    try {
      const response = await BRAND_CONTROLLER_addBrand(data);
      if (response){
        showSuccess('Success', 'Merek berhasil disimpan!')
      }
    } catch (error: any) {
      console.log(error);
      showFailed('Error', error.response.data.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const file = e.target.files[0];
      setLogoFile(file);

      // Membuat URL untuk preview gambar
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl); // Set preview URL
      console.log(`File ${file.name} telah diunggah.`);
      setIsUploading(false);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    console.log("Logo telah dihapus.");
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 mt-6 gap-6 text-l">
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
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32 focus:ring-2 focus:ring-slate-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-medium">Logo</label>
          {logoPreview && (
            <div className="relative inline-block mt-2 mb-4">
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="w-128 h-64 object-contain border border-gray-300 rounded-md"
              />
              {/* Tombol Hapus Logo */}
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-md p-3 hover:bg-red-600 transition duration-300"
              >
                <FaTrash size={18} />
              </button>
            </div>
          )}
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
              {isUploading ? "Mengunggah..." : "Upload Logo"}
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

export default BrandForm;
