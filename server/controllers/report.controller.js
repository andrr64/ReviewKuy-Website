import ReportModel from "../models/report.model.js";
import User from "../models/user.model.js";
import ReportCategoryModel from "../models/report.category.js";

export const createReport = async (req, res) => {
    const { user_id, report_category_id, description } = req.body;

    try {
        // Validasi field yang wajib diisi
        if (!user_id || !report_category_id) {
            return res.status(400).json({ message: 'User ID dan Report Category ID harus diisi.' });
        }

        // Cek apakah user_id valid (ada di tabel User)
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(400).json({ message: 'User ID tidak valid.' });
        }

        // Cek apakah report_category_id valid (ada di tabel ReportCategory)
        const category = await ReportCategoryModel.findByPk(report_category_id);
        if (!category) {
            return res.status(400).json({ message: 'Report Category ID tidak valid.' });
        }

        // Jika validasi lolos, buat laporan baru
        const newReport = await ReportModel.create({
            user_id,
            report_category_id,
            description
        });

        return res.status(201).json({ data: newReport });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
