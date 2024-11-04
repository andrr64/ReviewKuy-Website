import React from "react";

interface RKTextAreaProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    id: string; // Tambahkan id sebagai parameter
}

const RKTextArea: React.FC<RKTextAreaProps> = ({label, placeholder, value, onChange, id }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-gray-800 font-medium">
                {label}
            </label>
            <textarea
                id={id} // Gunakan id di textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32 focus:ring-2 focus:ring-slate-600 focus:outline-none"
            />
        </div>
    );
};

export default RKTextArea;
