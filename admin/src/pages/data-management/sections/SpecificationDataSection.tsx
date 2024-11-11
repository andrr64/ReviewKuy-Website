import { useEffect, useState } from "react";
import { PRODUCT_SPEC_OPT_CONTROLLER_addData, PRODUCT_SPEC_OPT_CONTROLLER_deleteData, PRODUCT_SPEC_OPT_CONTROLLER_getOptions, PRODUCT_SPEC_OPT_CONTROLLER_updateData } from "../../../controller/product.specification.option";
import { ProductSpecificationOption } from "../../../model/product.specification.option";
import { Button, Input, Modal } from "antd";
import { showFailed, showPrompt, showSuccess, showWarning } from "../../../util/alert";
import { useDispatch } from "react-redux";
import { loadingEnd, loadingStart } from "../../../state/loading/loadingSlicer";

function SpecificationDataSection() {
    const [specOptData, setSpecOptData] = useState<ProductSpecificationOption[] | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newSpecOpt, setNewSpecOpt] = useState("");
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editSpecOpt, setEditSpecOpt] = useState({
        'name': "",
        'id': ""
    });
    const dispatch = useDispatch();

    const fetchSpecOptData = async () => {
        try {
            const response = await PRODUCT_SPEC_OPT_CONTROLLER_getOptions();
            setSpecOptData(response);
        } catch (error) {
            console.error("Error fetching specification options:", error);
        }
    };

    useEffect(() => {
        fetchSpecOptData();
    }, []);

    const handleAddClick = () => setIsAdding(true);
    const handleCancel = () => {
        setIsAdding(false);
        setNewSpecOpt("");
    };

    const handleSubmit = async () => {
        dispatch(loadingStart());
        try {
            if (newSpecOpt.trim()) {
                const newSpec: ProductSpecificationOption = await PRODUCT_SPEC_OPT_CONTROLLER_addData(newSpecOpt);
                setSpecOptData((prevData) => [...(prevData || []), newSpec]);
                setNewSpecOpt("");
                await showSuccess("Berhasil", "Data berhasil disimpan");
                setIsAdding(false);
            } else {
                showWarning("Gagal", "Isi data terlebih dahulu");
            }
        } catch (error: any) {
            showFailed("Error", error);
        }
        dispatch(loadingEnd());
    };

    const handleEditClick = (specOpt: ProductSpecificationOption) => {
        setEditSpecOpt({
            name: specOpt.name,
            id: specOpt.id.toString()
        });
        setIsEditModalVisible(true);
    };

    const handleEditSubmit = async () => {
        if (!editSpecOpt || !editSpecOpt.name.trim()) {
            return showWarning("Gagal", "Isi data terlebih dahulu");
        }
        dispatch(loadingStart());
        try {
            await PRODUCT_SPEC_OPT_CONTROLLER_updateData(editSpecOpt);
            await fetchSpecOptData();
            await showSuccess("Berhasil", "Data berhasil diperbarui");
            setIsEditModalVisible(false);
        } catch (error: any) {
            showFailed("Error", error);
        }
        dispatch(loadingEnd());
    };

    const handleDelete = async (data: ProductSpecificationOption) => {
        const confirmed = await showPrompt("Hapus Produk", "anda yakin? data tidak bisa dikembalikan");
        if (confirmed) {
            dispatch(loadingStart());
            try {
                const response = await PRODUCT_SPEC_OPT_CONTROLLER_deleteData(data.id);
                if (response === true) {
                    await fetchSpecOptData();
                    showSuccess("Berhasil", "Data berhasil dihapus");
                } else {
                    throw Error("Terjadi kesalahan ketika menghapus data");
                }
            } catch (error: any) {
                showFailed("Gagal", error);
            }
            dispatch(loadingEnd());
        }
    };

    return (
        <div className="bg-white shadow space-y-4 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Data Spesifikasi</h2>
            <Button type="primary" onClick={handleAddClick}>Tambah Opsi Spesifikasi</Button>

            {isAdding && (
                <div className="mt-4 space-y-2">
                    <Input
                        placeholder="Masukkan nama opsi spesifikasi"
                        value={newSpecOpt}
                        onChange={(e) => setNewSpecOpt(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <Button color="primary" variant="filled" onClick={handleSubmit}>Submit</Button>
                        <Button color="danger" variant="filled" onClick={handleCancel}>Cancel</Button>
                    </div>
                </div>
            )}

            {specOptData ? (
                <ul className="space-y-4">
                    {specOptData.length === 0 ? (
                        <p>No specification options found.</p>
                    ) : (
                        specOptData.map((specOpt) => (
                            <li key={specOpt.id} className="flex justify-between items-center px-6 py-3 border border-gray-300 rounded-lg transition duration-200">
                                <span className="text-gray-800 font-medium">{specOpt.name}</span>
                                <div className="flex items-center gap-2">
                                    <Button onClick={() => handleEditClick(specOpt)} color="primary" variant="filled">
                                        Ubah
                                    </Button>
                                    <Button onClick={() => handleDelete(specOpt)} color="danger" variant="filled">
                                        Delete
                                    </Button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            ) : (
                <p>Loading...</p>
            )}

            <Modal
                title="Edit Opsi Spesifikasi"
                open={isEditModalVisible}
                onOk={handleEditSubmit}
                onCancel={() => setIsEditModalVisible(false)}
                okText="Simpan"
                cancelText="Batal"
            >
                <Input
                    placeholder="Masukkan nama opsi spesifikasi"
                    value={editSpecOpt?.name || ""}
                    onChange={(e) => {
                        const updatedName = e.target.value;
                        setEditSpecOpt((prev) => ({ ...prev, name: updatedName }));
                    }}
                />
            </Modal>
        </div>
    );
}

export default SpecificationDataSection;
