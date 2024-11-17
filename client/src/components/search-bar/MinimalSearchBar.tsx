interface SearchBarProps {
    value: string;
    onChange: (query: string) => void;
    onSubmit: (query: string) => void; // Fungsi callback untuk meng-handle pencarian
}

function MinimalSearchBar({ onSubmit, onChange, value}: SearchBarProps) {

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Mencegah reload halaman
        if (value.trim()) {
            onSubmit(value); // Panggil callback dengan query pencarian
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex border-2 border-blue-500 overflow-hidden w-full"
        >
            <input
                type="text"
                placeholder="Cari disini ..."
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
            />
            <button
                type="submit"
                className="flex items-center justify-center bg-[#007bff] px-5 text-sm text-white"
            >
                Search
            </button>
        </form>
    );
}

export default MinimalSearchBar;