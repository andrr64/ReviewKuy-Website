import React, { useState } from 'react';
import { RK_FullLogo } from '../assets/import';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/admin/login', {
                username,
                password,
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Berhasil',
                    text: 'Anda berhasil masuk!',
                    confirmButtonColor: '#4CAF50'
                }).then(() => {
                    navigate('/');
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: error.response?.status === 401 ? 'Username atau password salah.' : 'Gagal terhubung ke server.',
                confirmButtonColor: '#F44336'
            });
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
            <div className="flex flex-col items-center w-full max-w-md space-y-6">
                <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 md:p-8 space-y-6 my-10">
                        <div className="flex justify-center w-full">
                            <img src={RK_FullLogo} className="h-24" alt="RK Logo" />
                        </div>
                        <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
                            Masuk
                        </h1>
                        <form className="space-y-6" onSubmit={handleSignIn}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </button>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Lupa password? <b>hubungi perusahaan</b>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
