import ReportCategoryModel from "../models/report.category.js";

// Fungsi untuk membuat kategori laporan baru
export const createReportCategory = async (req, res) => {
    const { name } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ message: 'Nama kategori harus diisi.' });
        }

        const existingCategory = await ReportCategoryModel.findOne({ where: { name } });
        if (existingCategory) {
            return res.status(400).json({ message: 'Nama kategori sudah ada. Gunakan nama yang berbeda.' });
        }

        const newCategory = await ReportCategoryModel.create({ name });
        return res.status(201).send(newCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Gagal membuat kategori laporan.' });
    }
};

// Fungsi untuk mengambil semua kategori laporan
export const getReportCategory = async (req, res) => {
    try {
        const categories = await ReportCategoryModel.findAll();
        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Gagal mengambil kategori laporan.' });
    }
};

// Fungsi untuk menghapus kategori laporan berdasarkan ID
export const deleteReportCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Menghapus kategori dari database
        const deletedCount = await ReportCategoryModel.destroy({ where: { id } });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Kategori laporan tidak ditemukan.' });
        }

        return res.status(200).json({ message: 'Kategori laporan berhasil dihapus.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Gagal menghapus kategori laporan.' });
    }
};

// Fungsi untuk memperbarui kategori laporan berdasarkan ID
export const updateReportCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Nama kategori harus diisi.' });
        }

        const category = await ReportCategoryModel.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Kategori laporan tidak ditemukan.' });
        }

        // Memperbarui nama kategori
        category.name = name;
        await category.save();

        return res.status(200).json(category);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Gagal memperbarui kategori laporan.' });
    }
};
