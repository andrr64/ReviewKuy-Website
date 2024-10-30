import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Login from "./Login";
import Error500 from "./Error500";
import Loading from "../components/Loading";

function LoginController() {
    const [isLogin, setIsLogin] = useState<boolean | null>(null); // null untuk loading
    const [isOffline, setIsOffline] = useState<boolean>(false);

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
                setTimeout(() => setIsLogin(result.data), 500); // Tambahkan jeda 500ms sebelum meng-update isLogin
            } else if (response.status === 500) {
                setTimeout(() => setIsOffline(true), 500); // Jeda 500ms untuk error 500
            } else {
                setTimeout(() => setIsLogin(false), 500); // Jeda 500ms untuk login gagal
            }
        } catch (error) {
            console.error("Error during token verification:", error);
            setTimeout(() => setIsLogin(false), 500); // Jeda 500ms untuk error lainnya
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);
    if (isOffline) {
        return <Error500 />
    }
    else if (isLogin === null) {
        return <Loading />;
    }
    return isLogin ? <Navigate to="/" /> : <Login />;
}

export default LoginController