import Swal from 'sweetalert2';

// Fungsi untuk menampilkan pesan info
export const showInfo = (title: string, text: string) => {
    return Swal.fire({
        icon: 'info',
        title: title,
        text: text,
        confirmButtonText: 'OK'
    });
};

export const showSuccess = (title: string, text: string) => {
    return Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        confirmButtonText: 'OK'
    });
};

// Fungsi untuk menampilkan pesan warning
export const showWarning = (title: string, text: string) => {
    return Swal.fire({
        icon: 'warning',
        title: title,
        text: text,
        confirmButtonText: 'OK'
    });
};

// Fungsi untuk menampilkan pesan gagal
export const showFailed = (title: string, text: string) => {
    return Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        confirmButtonText: 'OK'
    });
};

// Fungsi prompt dengan return boolean
export const showPrompt = async (title: string, text: string): Promise<boolean> => {
    const result = await Swal.fire({
        icon: 'question',
        title: title,
        text: text,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    });
    return result.isConfirmed;
};
