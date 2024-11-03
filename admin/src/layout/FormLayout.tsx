import BackButton from "../components/button/back_button";

interface FormLayoutProps {
    title: string;
    desc: string;
    children: React.ReactNode; // Menambahkan children
}

function FormLayout({ title, desc, children }: FormLayoutProps) {
    return (
        <div className="p-6 bg-white rounded-xl">
            <div className="mb-4">
                <BackButton onClick={() => { window.history.back(); }} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-600 mt-1">{desc}</p>
            {children} {/* Menampilkan children di sini */}
        </div>
    );
}

export default FormLayout;
