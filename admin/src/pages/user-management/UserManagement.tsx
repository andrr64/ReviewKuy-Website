import { useNavigate } from "react-router-dom"
import UserData from "./sections/UserData";
import UserReport from "./sections/UserReport";

function UserManagement() {
    const navigate = useNavigate();

    return (
        <div className="p-8 space-y-8 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Manajemen Pengguna</h1>
            <UserData/>
            <UserReport/>
        </div>
    )
}

export default UserManagement