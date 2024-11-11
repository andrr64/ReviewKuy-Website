import { useEffect, useState } from 'react'
import ProfileCard from '../../../components/card/UserCard'
import SearchBar from '../../../components/search-bar/SearchBar'
import { Button } from 'antd';
import { UserAPI } from '../../../api/user';
import { UserModel } from '../../../model/user';
import MemberTotalCard from '../../../components/card/MemberCard';

function UserData() {
    const [search, setSearch] = useState<string>('');
    const [searchResult, setSearchResult] = useState<UserModel[]>([]);
    const [totalUser, setTotaluser] = useState<any>(0);

    const handleSearch = async (query: string) => {
        setSearch(query);
        try {
            const response = await UserAPI.search(query);
            const data = response.map((e: any) => {
                return new UserModel(e);
            });
            setSearchResult(data);
        } catch (error) {

        }
    }
    const handleClearSearch = () => {
        setSearch('');
        setSearchResult([]);
    }

    const fetchTotalUser = async () => {
        try {
            setTotaluser((await UserAPI.getTotalUser()));
        } catch (error) {
            setTotaluser('Something Wrong');
        }
    }

    useEffect(() => {
        fetchTotalUser();
    }, [])

    return (
        <div className="bg-white shadow rounded-lg space-y-4 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Data Pengguna</h2>
            <div className='flex'>
                <MemberTotalCard total={totalUser} />
            </div>
            <SearchBar onSearch={handleSearch} placeholder='Cari Pengguna...' />

            {search.length !== 0 && (
                <div className='flex items-center gap-2'>
                    <p>Hasil Pencarian <b>{`${search}`}</b> {`(${searchResult.length} hasil)`}</p>
                    <Button color='danger' variant='filled' onClick={handleClearSearch}>Clear</Button>
                </div>
            )}

            <div>
                <h2 className='text-1xl font-semibold'>Anggota Baru (Hari Ini)</h2>
            </div>

            {searchResult.length !== 0 && (
                <div className='flex'>
                    {searchResult.map((val) => (
                        <ProfileCard name={val.name} avatar={'https://cdn-icons-png.flaticon.com/512/9203/9203764.png'} email={val.email} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserData