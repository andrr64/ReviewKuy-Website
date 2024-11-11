import SearchBar from '../../../components/search-bar/SearchBar'

function UserReport() {
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Laporan</h2>
            <div className="mb-4 space-y-4">
                <SearchBar onSearch={(query) => {}} />
            </div>
        </div>
    )
}

export default UserReport