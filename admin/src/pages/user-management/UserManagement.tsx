import UserData from "./sections/UserData";
function UserManagement() {
    return (
        <div className="p-8 space-y-8 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Manajemen Pengguna</h1>
            <UserData/>
        </div>
    )
}

export default UserManagement