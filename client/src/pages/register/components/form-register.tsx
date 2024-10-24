import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import { setTitle } from '../../utility';
import { GoogleLogo } from '../../../assets/import';

interface FormRegisterProps {
    loginCallback: () => void;
}

export default function FormRegister({ loginCallback }: FormRegisterProps) {
    const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
    const minPasswordLength = 10;
    const minNameLength = 4;
    useEffect(() => setTitle('Register'), []);

    // React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: FieldValues) => {
        ///TODO: handle submit
        console.log(data);
    };

    // Function untuk toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='text-sm text-white'>
            {/* Name Field */}
            <div className="mb-4">
                <label className="block opacity-90 mb-2" htmlFor="email">
                    Nama Pengguna
                </label>
                <input
                    type="email"
                    id="email"
                    className={`rounded-xl focus:bg-active-field bg-field transition duration-300 shadow appearance-none text-white border-none rounded w-full py-3 px-3 leading-tight focus:outline-none focus:border-none ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Masukan email"
                    {...register("email", {
                        required: "Email wajib diisi",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Format email tidak valid"
                        }
                    })}
                />

                {errors.email && typeof errors.email.message === 'string' && (
                    <p className="text-red-500  italic mt-2">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
                <label className="block opacity-90 mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className={`rounded-xl focus:bg-active-field bg-field transition duration-300 shadow appearance-none text-white border-none rounded w-full py-3 px-3 leading-tight focus:outline-none focus:border-none ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Masukan email"
                    {...register("email", {
                        required: "Email wajib diisi",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Format email tidak valid"
                        }
                    })}
                />

                {errors.email && typeof errors.email.message === 'string' && (
                    <p className="text-red-500   italic mt-2">
                        {errors.email.message}
                    </p>
                )}
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
                        className={`rounded-xl focus:bg-active-field bg-field transition duration-300 shadow appearance-none text-white border-none rounded w-full py-3 px-3 leading-tight focus:outline-none focus:border-none`}
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
                        {showPassword ? (
                            <FaEye />
                        ) : (
                            <FaEyeSlash />
                        )}
                    </button>
                </div>
                {errors.password && typeof errors.password.message === 'string' && (
                    <p className="text-red-500   italic mt-2">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Verify Password Field */}
            <div className="mb-6">
                <label className="block opacity-90 mb-2" htmlFor="password">
                    Konfirmasi
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className={`rounded-xl focus:bg-active-field bg-field transition duration-300 shadow appearance-none text-white border-none rounded w-full py-3 px-3 leading-tight focus:outline-none focus:border-none`}
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
                        {showPassword ? (
                            <FaEye />
                        ) : (
                            <FaEyeSlash />
                        )}
                    </button>
                </div>
                {errors.password && typeof errors.password.message === 'string' && (
                    <p className="text-red-500   italic mt-2">
                        {errors.password.message}
                    </p>
                )}
                {/* Forgot Password and Register Links */}
                <div className="flex mt-2 flex-col space-y-2 tablet:flex-row tablet:space-y-0 items-center justify-between mb-6">
                    <a href="/forgot-password" >
                        Lupa password
                    </a>
                    <p className='cursor-pointer' onClick={loginCallback}>
                        Sudah memiliki akun? <b>Login</b>
                    </p>
                </div>
            </div>


            {/* Reg Button */}
            <div className="text-white text-center">
                <button
                    type="submit"
                    className="rounded-full transition duration-300 bg-button-purple py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full hover:shadow-lg"
                >
                    Daftar
                </button>
                <p className='opacity-90 my-2  '>atau</p>
                <button
                    type="submit"
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
