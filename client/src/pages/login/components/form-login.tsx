import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function FormLogin() {
    const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
    const minPasswordLength = 10;

    // React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data:FieldValues) => {
        ///TODO: handle submit
        console.log(data);
    };

    // Function untuk toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mb-10'>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
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
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'} // Toggle input type
                        id="password"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                        placeholder="Masukan password"
                        {...register("password", { 
                            required: "Password wajib diisi", 
                            minLength: { value: minPasswordLength, message: `Password minimal ${minPasswordLength} karakter` } 
                        })}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    >
                        {showPassword ? (
                            // Icon jika password terlihat (mata terbuka)
                            <FaEye/>
                        ) : (
                            // Icon jika password disembunyikan (mata tertutup)
                            <FaEyeSlash/>
                        )}
                    </button>
                </div>
                {errors.password && typeof errors.password.message === 'string' && (
                    <p className="text-red-500 text-xs italic mt-2">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Forgot Password and Register Links */}
            <div className="flex items-center justify-between mb-6">
                <a href="/forgot-password" className="text-sm underline">
                    Lupa password
                </a>
                <a href="/register" className="font-bold text-sm">
                    Daftar Akun
                </a>
            </div>

            {/* Login Button */}
            <div className="text-center">
                <button
                    type="submit"
                    className="transition duration-300 bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
                >
                    Login
                </button>
            </div>
        </form>
    );
}
