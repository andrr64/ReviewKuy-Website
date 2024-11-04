// components/ButtonComponents.tsx
import React from "react";
import Button from "./button";

type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    full?: boolean;
};

// Button Update (Biru Gelap)
export const UpdateButton: React.FC<ButtonProps> = ({ onClick, children, type = "button", full = false }) => {
    return (
        <Button
            onClick={onClick}
            type={type}
            full={full}
            bgColor="bg-blue-800"
            hoverColor="hover:bg-blue-900"
            textColor="text-white"
        >
            {children}
        </Button>
    );
};

// Button Delete (Merah Gelap)
export const DeleteButton: React.FC<ButtonProps> = ({ onClick, children, type = "button", full = false }) => {
    return (
        <Button
            onClick={onClick}
            type={type}
            full={full}
            bgColor="bg-red-600"
            hoverColor="hover:bg-red-900"
            textColor="text-white"
        >
            {children}
        </Button>
    );
};

// Button Save (Hijau Gelap)
export const SaveButton: React.FC<ButtonProps> = ({ onClick, children, type = "button", full = false }) => {
    return (
        <Button
            onClick={onClick}
            type={type}
            full={full}
            bgColor="bg-green-800"
            hoverColor="hover:bg-green-900"
            textColor="text-white"
        >
            {children}
        </Button>
    );
};

// Button Upload (Ungu Gelap)
export const UploadButton: React.FC<ButtonProps> = ({ onClick, children, type = "button", full = false }) => {
    return (
        <Button
            onClick={onClick}
            type={type}
            full={full}
            bgColor="bg-purple-800"
            hoverColor="hover:bg-purple-900"
            textColor="text-white"
        >
            {children}
        </Button>
    );
};

// Button Edit (Kuning Gelap)
export const EditButton: React.FC<ButtonProps> = ({ onClick, children, type = "button", full = false }) => {
    return (
        <Button
            onClick={onClick}
            type={type}
            full={full}
            bgColor="bg-sky-600"
            hoverColor="hover:bg-sky-800"
            textColor="text-white"
        >
            {children}
        </Button>
    );
};

// Button Add (Hijau Terang)
export const AddButton: React.FC<ButtonProps> = ({ onClick, children, type = "button", full = false }) => {
    return (
        <Button
            onClick={onClick}
            type={type}
            full={full}
            bgColor="bg-stone-600"
            hoverColor="hover:bg-stone-700"
            textColor="text-white"
        >
            {children}
        </Button>
    );
};
