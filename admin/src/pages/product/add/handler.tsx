import { Dispatch, SetStateAction } from "react";

// Fungsi untuk mengunggah thumbnail
export const handleThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setterFn: (file: File | null) => void
) => {
    const file = event.target.files?.[0];
    if (file) {
        setterFn(file);
    } else {
        setterFn(null);
    }
}

// Fungsi untuk mengunggah gambar galeri
export const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImages: Dispatch<SetStateAction<File[]>>,
    setUploadingGallery: Dispatch<SetStateAction<boolean>>
) => {
    const files = event.target.files;
    if (files) {
        setUploadingGallery(true);
        setImages((prevImages) => [...prevImages, ...Array.from(files)]);
        setTimeout(() => setUploadingGallery(false), 500);
    }
};

// Fungsi untuk menghapus gambar
export const handleDeleteImage = (
    index: number,
    setImages: Dispatch<SetStateAction<File[]>>
) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
};

// Fungsi untuk menghapus semua gambar
export const handleClearAllImages = (
    setImages: Dispatch<SetStateAction<File[]>>
) => {
    setImages([]);
};

// Fungsi untuk menghapus thumbnail
export const handleDeleteThumbnail = (
    setThumbnail: Dispatch<SetStateAction<File | null>>
) => {
    setThumbnail(null);
};
