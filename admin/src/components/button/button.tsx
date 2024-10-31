// components/Button.tsx
import React from "react";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
    bgColor?: string; // Warna background default
    hoverColor?: string; // Warna background saat hover
    textColor?: string; // Warna teks default
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    className = "",
    bgColor = "bg-indigo-100", // Default color
    hoverColor = "hover:bg-indigo-200", // Default hover color
    textColor = "text-indigo-700", // Default text color
}) => {
    return (
        <button
            onClick={onClick}
            className={`transition duration-300 flex items-center justify-center px-4 py-2 border font-medium rounded-md ${bgColor} ${hoverColor} ${textColor} ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
