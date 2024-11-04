// components/Button.tsx
import React from "react";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
    bgColor?: string; // Warna background default
    hoverColor?: string; // Warna background saat hover
    textColor?: string; // Warna teks default
    type?: "button" | "submit" | "reset"; // Menentukan tipe tombol dengan pilihan yang valid
    full?: boolean
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    className = "",
    type = 'button',
    full= false,
    bgColor = "bg-indigo-100", // Default color
    hoverColor = "hover:bg-indigo-200", // Default hover color
    textColor = "text-indigo-700", // Default text color
}) => {
    return (
        <button
            onClick={onClick}
            type={type} // Mengatur nilai type di sini
            className={`${full? 'w-full' : ''} transition duration-300 flex items-center justify-center px-6 py-2 border font-medium rounded-md ${bgColor} ${hoverColor} ${textColor} ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
