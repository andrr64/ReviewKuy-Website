import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function BackPageButton() {
    const navigate = useNavigate();
    return (
        <button
            className="flex items-center text-white text-sm bg-dark-purple py-2 px-6 rounded-l w-auto"
            onClick={() => navigate(-1)}
        >
            <IoChevronBack />
            Kembali
        </button>
    );
}

export default BackPageButton;