import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import { GoogleLogo } from '../../../assets/import';
import UserAPI from '../../../api/user.api';
import { showAlertByResponseCode } from '../../../util/alert/alert';

interface FormRegisterProps {
    loginCallback: () => void;
}

function ErrorMessage({ message }: { message: string }) {
    return (
        <p className='text-red-500  mt-2'>
            {message}
        </p>
    );
}

export default function FormRegister({ loginCallback }: FormRegisterProps) {
    const [showPassword, setShowPassword] = useState(false);
    const minPasswordLength = 10;
    const minNameLength = 3;

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data: FieldValues) => {
        // Hapus field confirmPassword dari data
        delete data.confirmPassword;
        showAlertByResponseCode((await UserAPI.createUser(data)).status);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Mengambil nilai password untuk digunakan di validasi confirm password
    const passwordValue = watch("password");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='text-sm text-white'>
            {/* Name Field */}
            <div className="mb-4">
                <label className="block opacity-90 mb-2" htmlFor="name">
                    Nama Pengguna
                </label>
                <input
                    type="text"
                    id="name"
                    className={`rounded-xl focus:bg-active-field bg-field transition duration-300 shadow appearance-none text-white border-none w-full py-3 px-3 leading-tight focus:outline-none focus:border-none ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Masukan nama"
                    {...register("name", {
                        required: "Nama wajib diisi",
                        minLength: { value: minNameLength, message: `Nama minimal ${minNameLength} karakter` }
                    })}
                />
                {errors.name && <ErrorMessage message={errors.name.message as string} />}
            </div>

            {/* Email Field */}
            <div className="mb-4">
                <label className="block opacity-90 mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className={`rounded-xl focus:bg-active-field bg-field transition duration-300 shadow appearance-none text-white border-none w-full py-3 px-3 leading-tight focus:outline-none focus:border-none ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Masukan email"
                    {...register("email", {
                        required: "Email wajib diisi",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Format email tidak valid"
                        }
                    })}
                />
                {errors.email && <ErrorMessage message={errors.email.message as string} />}
            </div>

            {/* Password Field */}
            <div className="mb-6">
                <label className="block opacity-90 mb-2" htmlFor="password">
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className={`rounded-xl focus:bg-active-field bg-field transition duration-300 shadow appearance-none text-white border-none w-full py-3 px-3 leading-tight focus:outline-none focus:border-none ${errors.password ? 'border-red-500' : ''}`}
                        placeholder="Masukan password"
                        {...register("password", {
                            required: "Password wajib diisi",
                            minLength: { value: minPasswordLength, message: `Password minimal ${minPasswordLength} karakter` }
                        })}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute focus:outline-none focus:border-none inset-y-0 right-0 pr-3 flex items-center text-white opacity-90"
                    >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
                {errors.password && <ErrorMessage message={errors.password.message as string} />}
            </div>

            {/* Verify Password Field */}
            <div className="mb-6">
                <label className="block opacity-90 mb-2" htmlFor="confirmPassword">
                    Konfirmasi Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        className={`rounded-xl focus:bg-active-field bg-field transition duration-300 shadow appearance-none text-white border-none w-full py-3 px-3 leading-tight focus:outline-none focus:border-none ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        placeholder="Konfirmasi password"
                        {...register("confirmPassword", {
                            required: "Konfirmasi password wajib diisi",
                            validate: (value) =>
                                value === passwordValue || "Password tidak sama",
                        })}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute focus:outline-none focus:border-none inset-y-0 right-0 pr-3 flex items-center text-white opacity-90"
                    >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
                {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message as string} />}
            </div>

            {/* Forgot Password and Register Links */}
            <div className="flex mt-2 flex-col space-y-2 tablet:flex-row tablet:space-y-0 items-center justify-between mb-6">
                <a href="/forgot-password">
                    Lupa password
                </a>
                <p className='cursor-pointer' onClick={loginCallback}>
                    Sudah memiliki akun? <b>Login</b>
                </p>
            </div>

            {/* Reg Button */}
            <div className="text-white text-center">
                <button
                    type="submit"
                    className="rounded-full transition duration-300 bg-button-purple py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full hover:shadow-lg"
                >
                    Daftar
                </button>
                <p className='opacity-90 my-2'>atau</p>
                <button
                    type="button"
                    className="rounded-full transition duration-300 bg-field hover:bg-active-field py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full hover:shadow-lg"
                >
                    <div className='flex justify-center space-x-2 items-center'>
                        <img className='h-5' src={GoogleLogo} alt="Google Logo" />
                        <p>Daftar dengan Google</p>
                    </div>
                </button>
            </div>
        </form>
    );
}
