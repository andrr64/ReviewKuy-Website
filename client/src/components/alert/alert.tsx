import Swal from 'sweetalert2';

export const showAlertByResponseCode = (responseCode: number) => {
    switch (responseCode) {
        case 200:
            Swal.fire({
                icon: 'success',
                title: 'Sukses!',
                text: 'Permintaan berhasil diproses.',
            });
            break;
        case 201:
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Dibuat!',
                text: 'Data berhasil dibuat.',
            });
            break;
        case 400:
            Swal.fire({
                icon: 'error',
                title: 'Permintaan Tidak Valid!',
                text: 'Ada masalah dengan data yang dikirim.',
            });
            break;
        case 401:
            Swal.fire({
                icon: 'warning',
                title: 'Tidak Terautentikasi!',
                text: 'Anda perlu login untuk mengakses ini.',
            });
            break;
        case 403:
            Swal.fire({
                icon: 'error',
                title: 'Akses Ditolak!',
                text: 'Anda tidak memiliki izin untuk melakukan ini.',
            });
            break;
        case 404:
            Swal.fire({
                icon: 'error',
                title: 'Tidak Ditemukan!',
                text: 'Data tidak ditemukan',
            });
            break;
        case 500:
            Swal.fire({
                icon: 'error',
                title: 'Kesalahan Server!',
                text: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.',
            });
            break;
        default:
            Swal.fire({
                icon: 'info',
                title: 'Status Tidak Diketahui',
                text: `Terjadi status tidak terduga: ${responseCode}`,
            });
            break;
    }
};
