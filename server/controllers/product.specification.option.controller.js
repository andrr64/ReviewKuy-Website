import ProductSpecificationOption from "../models/product.specification.option.model.js";
import { serverError } from "../utility/response_helper.js";

export const getSpecOptionsData = async (req, res) => {
    try {
        // Mengambil semua brand dari database
        const options = await ProductSpecificationOption.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        
        // Mengembalikan response dengan daftar brand
        return res.status(200).send(options);

    } catch (error) {
        return serverError(res, error.message);
    }
};

// Fungsi untuk menambahkan ProductSpecificationOption baru
export const createSpecOption = async (req, res) => {
    const { name } = req.body;
    try {
        const newOption = await ProductSpecificationOption.create({ name });
        return res.status(201).send(newOption); // Mengembalikan data yang berhasil dibuat
    } catch (error) {
        return serverError(res, error.message);
    }
};

// Fungsi untuk memperbarui ProductSpecificationOption berdasarkan ID
export const updateSpecOption = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const option = await ProductSpecificationOption.findByPk(id);
        if (!option) return res.status(404).send({ message: "Option not found" });

        option.name = name;
        await option.save();

        return res.status(200).send(option); // Mengembalikan data yang telah diperbarui
    } catch (error) {
        return serverError(res, error.message);
    }
};

// Fungsi untuk menghapus ProductSpecificationOption berdasarkan ID
export const deleteSpecOption = async (req, res) => {
    const { id } = req.params;
    try {
        const option = await ProductSpecificationOption.findByPk(id);
        if (!option) return res.status(404).send({ message: "Option not found" });

        await option.destroy();
        return res.status(200).send({ message: "Option deleted successfully" });
    } catch (error) {
        return serverError(res, error.message);
    }
};
