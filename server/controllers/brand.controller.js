import Brand from "../models/brand.model.js";
import { serverBadRequest, serverCreated, serverError, serverSuccess } from "../utility/response_helper.js";

export const createBrand = async (req, res) => {
    const { name, description, logo_url } = req.body;

    // Validasi input
    if (!name || !description || !logo_url) {
        return serverBadRequest(res, 'All fields are required.');
    }

    // Buat brand baru
    try {
        const newBrand = await Brand.create({
            name,
            description,
            logo_url,
        });
        // Kirim response
        return serverCreated(res, 'Brand created successfully', newBrand);
    } catch (error) {
        return serverError(res, error.message );
    }
};

export const updateBrand = async (req, res) => {
    const { brandId } = req.params; // Mengambil ID brand dari parameter URL
    const { name, description, logo_url } = req.body;

    // Validasi input
    if (!name && !description && !logo_url) {
        return serverBadRequest(res, 'At least one field is required to update.');
    }

    try {
        // Mencari brand berdasarkan ID
        const brand = await Brand.findByPk(brandId);

        if (!brand) {
            return serverBadRequest(res, 'Brand not found.');
        }

        // Memperbarui brand
        const updatedBrand = await brand.update({
            name: name || brand.name, // Hanya memperbarui jika field tidak kosong
            description: description || brand.description,
            logo_url: logo_url || brand.logo_url,
        });

        return serverSuccess(res, 'Brand updated successfully', updatedBrand);
    } catch (error) {
        return serverError(res, error.message);
    }
};

export const deleteBrandById = async (req, res) => {
    const { brandId } = req.params; // Mengambil ID brand dari parameter URL

    try {
        // Mencari brand berdasarkan ID
        const brand = await Brand.findByPk(brandId);

        if (!brand) {
            return serverBadRequest(res, 'Brand not found.');
        }

        // Menghapus brand
        await brand.destroy();

        return serverSuccess(res, 'Brand deleted successfully', {});
    } catch (error) {
        return serverError(res, error.message);
    }
};

export const getBrands = async (req, res) => {
    try {
        // Mengambil semua brand dari database
        const brands = await Brand.findAll();
        
        // Mengembalikan response dengan daftar brand
        return serverSuccess(res, 'Brands retrieved successfully', brands);
    } catch (error) {
        return serverError(res, error.message);
    }
};

export const getBrandById = async (req, res) => {
    const { brandId } = req.params; // Mengambil ID brand dari parameter URL

    try {
        // Mencari brand berdasarkan ID
        const brand = await Brand.findByPk(brandId);

        if (!brand) {
            return serverBadRequest(res, 'Brand not found.');
        }

        // Mengembalikan response dengan detail brand
        return serverSuccess(res, 'Brand retrieved successfully', brand);
    } catch (error) {
        return serverError(res, error.message);
    }
};
