import { RK_WhiteLogo } from "../assets/import";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Ubah tipe items menjadi array objek
interface MenuItem {
    title: string;
    link: string;
    onClick?: () => void; // Membuat onClick opsional
}

const createMenu = (title: string, items: MenuItem[], onClick: () => void = () => {}) => (
    <div className="flex items-center justify-center tablet:items-start">
        <ul className="text-center tablet:text-left text-white space-y-2">
            <div className="inline-block group cursor-default">
                <h1 className="text-xl font-bold">{title}</h1>
                <div className="laptop:w-9/12 group-hover:w-full h-1 bg-red-600 mt-2 transition-all duration-300"></div>
            </div>
            {items.map((item, index) => (
                <li key={index}>
                    <Link
                        to={item.link}
                        className="hover:text-red-600 hover:font-bold transition-all duration-300"
                        onClick={item.onClick || onClick} // Menambahkan onClick yang diteruskan
                    >
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default function Footer() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleAboutClick = () => {
        // Cek apakah berada di halaman utama ('/')
        if (location.pathname === '/') {
            // Jika ya, scroll ke section #about
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth', 
                });
            }
        } else {
            // Jika tidak, navigasi ke '/' dan scroll ke #about
            navigate('/');
            setTimeout(() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500); // Menunggu navigasi selesai sebelum scroll
        }
    };

    return (
        <div className='w-full space-y-10 py-10 tablet:py-20 text-1xl tablet:text-sm tablet:space-x-10 laptop:space-x-20 bg-dark-purple tablet:space-y-0 tablet:flex tablet:justify-center'>
            <div className="flex items-center justify-center tablet:items-start">
                <Link to={'/'}>
                    <img className="h-16 tablet:h-24" src={RK_WhiteLogo} alt="" />
                </Link>
            </div>
            {createMenu('Lihat Review', [
                { title: 'Smartphone', link: '/reviews/smartphone' },
                { title: 'Laptop', link: '/reviews/laptop' }
            ])}
            {createMenu('Website', [
                { title: 'Tentang Kami', link: '#about', onClick: handleAboutClick }, // Menambahkan onClick
                { title: 'Anggota Kelompok', link: '/team' }
            ])}
            {createMenu('Kontak', [
                { title: 'WhatsApp', link: '/contact/whatsapp' },
                { title: 'Instagram', link: '/contact/instagram' },
                { title: 'Email', link: '/contact/email' }
            ])}
        </div>
    );
}
