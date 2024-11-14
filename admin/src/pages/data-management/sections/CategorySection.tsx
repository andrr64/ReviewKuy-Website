import { useEffect, useState } from 'react';
import { Category } from '../../../model/category';
import { Button, Input, Modal, Upload } from 'antd';
import { CategoryAPI } from '../../../api/category';
import { showFailed, showPrompt, showSuccess, showWarning } from '../../../util/alert';
import { useDispatch } from 'react-redux';
import { loadingStart, loadingEnd } from '../../../state/loading/loadingSlicer';
import { UploadOutlined } from '@ant-design/icons';

export default function CategorySection() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const dispatch = useDispatch();

    const fetchCategories = async () => {
        try {
            const response = await CategoryAPI.getCategories();
            setCategories(response);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddClick = () => setIsAdding(true);
    const handleCancel = () => {
        setIsAdding(false);
        setNewCategoryName("");
        setNewCategoryImage(null);
    };

    const handleSubmit = async () => {
        dispatch(loadingStart());
        try {
            if (newCategoryName.trim() && newCategoryImage != null) {
                const newCategory = await CategoryAPI.addCategory(newCategoryName, newCategoryImage);
                setCategories((prev) => [...prev, newCategory]);
                setNewCategoryName("");
                setNewCategoryImage(null);
                await showSuccess("Berhasil", "Kategori berhasil disimpan");
                setIsAdding(false);
            } else {
                showWarning("Gagal", "Isi nama dan gambar kategori terlebih dahulu");
            }
        } catch (error: any) {
            showFailed("Error", error);
        }
        dispatch(loadingEnd());
    };

    const handleEditClick = (category: Category) => {
        setEditCategory(category.copy());
        setIsEditModalVisible(true);
    };

    const handleEditSubmit = async () => {
        if (!editCategory || !editCategory.name.trim()) {
            return showWarning("Gagal", "Isi nama kategori terlebih dahulu");
        }
        try {
            await CategoryAPI.updateCategory(editCategory);
            await fetchCategories();
            await showSuccess("Berhasil", "Kategori berhasil diperbarui");
            setIsEditModalVisible(false);
        } catch (error: any) {
            showFailed("Error", error);
        }
    };

    const handleDelete = async (category: Category) => {
        const confirmed = await showPrompt("Hapus Kategori", "Anda yakin? Data tidak bisa dikembalikan.");
        if (confirmed) {
            dispatch(loadingStart());
            try {
                const response = await CategoryAPI.deleteCategory(category.id);
                if (response === true) {
                    await fetchCategories();
                    showSuccess("Berhasil", "Kategori berhasil dihapus");
                } else {
                    throw Error("Terjadi kesalahan saat menghapus kategori");
                }
            } catch (error: any) {
                showFailed("Gagal", error);
            }
            dispatch(loadingEnd());
        }
    };

    return (
        <div className="bg-white shadow space-y-4 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Kategori Produk</h2>
            <Button type="primary" onClick={handleAddClick}>Tambah Kategori</Button>

            {isAdding && (
                <div className="mt-4 flex gap-2 flex-col">
                    <Input
                        placeholder="Masukkan nama kategori"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <Upload
                        beforeUpload={(file) => {
                            setNewCategoryImage(file);  // Menyimpan file ke state tanpa mengunggah
                            return false;  // Mencegah upload otomatis
                        }}
                        showUploadList={false}  // Menyembunyikan daftar upload
                    >
                        <div className='flex gap-2 items-center'>
                            <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
                            {newCategoryImage && <p>Gambar dipilih: <b>{newCategoryImage.name}</b></p>}
                        </div>
                    </Upload>
                    <div className="flex gap-2">
                        <Button type="primary" onClick={handleSubmit}>Submit</Button>
                        <Button type="default" onClick={handleCancel}>Cancel</Button>
                    </div>
                </div>
            )}

            {categories.length !== 0 && (
                <ul className="space-y-4">
                    {categories.map((category) => (
                        <li key={category.id} className="flex justify-between items-center px-6 py-3 border border-gray-300 rounded-lg">
                            <span className="text-gray-800 font-medium">{category.name}</span>
                            <div className="flex items-center gap-2">
                                <Button onClick={() => handleEditClick(category)} type="primary">Ubah</Button>
                                <Button onClick={() => handleDelete(category)} danger>Delete</Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {categories.length === 0 && (
                <p>Tidak ada data kategori yang ditemukan.</p>
            )}

            <Modal
                title="Edit Kategori"
                open={isEditModalVisible}
                onOk={handleEditSubmit}
                onCancel={() => setIsEditModalVisible(false)}
                okText="Simpan"
                cancelText="Batal"
            >
                <Input
                    placeholder="Masukkan nama kategori"
                    value={editCategory?.name || ""}
                    onChange={(e) => {
                        const updatedName = e.target.value;
                        setEditCategory((prev) => {
                            if (prev === null) {
                                return null;
                            }
                            return new Category({ ...prev, name: updatedName });
                        });
                    }}
                />
            </Modal>
        </div>
    );
}
