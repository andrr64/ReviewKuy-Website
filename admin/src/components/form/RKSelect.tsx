import React from 'react';

interface Option {
    id: number | string; // Tipe id bisa disesuaikan
    val: string;
}

interface RKSelectProps {
    label: string;
    value: number | string | undefined; // Tipe value sesuai dengan data yang digunakan
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    id?: string; // id opsional jika diperlukan
}

export const RKSelect: React.FC<RKSelectProps> = ({ label, value, onChange, options }) => {
    return (
        <div>
            <label className="block text-gray-800 font-medium">{label}</label>
            <select
                value={value ?? ""}
                onChange={onChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-slate-600 focus:outline-none transition-all duration-300 ease-in-out"
            >
                <option value="" disabled>Pilih Data</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.val}
                    </option>
                ))}
            </select>
        </div>
    );
};
