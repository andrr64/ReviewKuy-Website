import React, { useEffect } from 'react';
import LogoSection from './components/bagian-logo';
import { setTitle } from '../utility';
import FormLogin from './components/form-login';
import { FaArrowLeft } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  useEffect(() => setTitle('Login'), []); // Efek dijalankan sekali ketika komponen di-mount
  const navigate = useNavigate();

  return (
    <div className="bg-semilight-purple flex items-center justify-center min-h-screen">
      <div className="bg-primary shadow-lg p-5 laptop:p-10 w-9/12 rounded-2xl desktop:w-1/3">
        <button onClick={() => navigate(-1)} className="text-white opacity-90 transition duration-300 hover:-translate-x-2 text-left text-gray-600 mb-4 flex items-center">
          <FaArrowLeft className='mr-2' />
          <span> Kembali </span>
        </button>
        <LogoSection />
        <FormLogin />
      </div>
    </div>
  );
};

export default LoginPage;
