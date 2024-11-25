export function setTitle(title: string) {
    document.title = title + ' - ReviewKuy'; // Ganti sesuai dengan judul yang diinginkan
}

export function setPlainTitle(title: string) {
    document.title = title;
}

export const formatToIDR = (value: number): string => {
    return `IDR ${value.toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
};