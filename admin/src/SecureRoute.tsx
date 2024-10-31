// RuteAman.tsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Error500 from "./pages/error-505";
import Loading from "./components/Loading";

const SecureRoute: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null untuk loading
    const [isOffline, setIsOffline] = useState<boolean>(false);

    // Fungsi untuk verifikasi token
    const verifyToken = async () => {
        try {
            const response = await fetch("/api/admin/check", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const result = await response.json();
                setTimeout(() => setIsAuthenticated(result.data), 500); // Tambahkan jeda 500ms sebelum meng-update isLogin
            } else if (response.status === 500) {
                setTimeout(() => setIsOffline(true), 500); // Jeda 500ms untuk error 500
            } else {
                setTimeout(() => setIsAuthenticated(false), 500); // Jeda 500ms untuk login gagal
            }
        } catch (error) {
            console.error("Error during token verification:", error);
            setTimeout(() => setIsAuthenticated(false), 500); // Jeda 500ms untuk error lainnya
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    // Sambil menunggu proses verifikasi selesai
    if (isOffline) {
        return <Error500 />
    }
    else if (isAuthenticated === null) {
        return <Loading />; 
    }

    // Jika terautentikasi, tampilkan outlet; jika tidak, arahkan ke login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default SecureRoute;
