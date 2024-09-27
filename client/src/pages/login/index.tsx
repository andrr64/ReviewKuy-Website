import React, { useEffect, useState } from 'react';
import LogoSection from './components/bagian-logo';
import { setTitle } from '../utiity';
import FormLogin from './components/form-login';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility

  // Function untuk toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => setTitle('Login'), []); // Efek dijalankan sekali ketika komponen di-mount

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-10 rounded-lg w-1/3 h-2/3">
        <button className="text-left text-gray-600 mb-4 flex items-center">
          Kembali
        </button>
        <LogoSection/>
        <FormLogin/>
      </div>
    </div>
  );
};

export default LoginPage;
