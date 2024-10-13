import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setTitle } from '../../utility';
import { GoogleLogo } from '../../../assets/import';

export default function FormLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const minPasswordLength = 10;
    useEffect(() => setTitle('Login'), []);

    // React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };

    // Function untuk toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='text-white mb-10'>
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
                    <p className="text-red-500 text-xs italic mt-2">
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
                    <p className="text-red-500 text-xs italic mt-2">
                        {errors.password.message}
                    </p>
                )}
                {/* Forgot Password and Register Links */}
                <div className="mt-2 flex items-center flex-col space-y-1 tablet:flex-row tablet:space-y-0 justify-between mb-6">
                    <a href="/forgot-password" >
                        Lupa password
                    </a>
                    <a href="/register">
                        Daftar Akun
                    </a>
                </div>
            </div>




            {/* Login Button */}
            <div className="text-white text-center">
                <button
                    type="submit"
                    className="rounded-full transition duration-300 bg-button-purple font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full hover:shadow-lg"
                >
                    Login
                </button>
                <p className='opacity-90 my-2 text-xs'>atau</p>
                <button
                    type="submit"
                    className="rounded-full transition duration-300 bg-field hover:bg-active-field py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full hover:shadow-lg"
                >
                    <div className='flex justify-center space-x-2 items-center'>
                        <img className='h-5' src={GoogleLogo} alt="Google Logo" />
                        <p>Login dengan Google</p>
                    </div>
                </button>
            </div>
        </form>
    );
}
