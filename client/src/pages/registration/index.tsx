import React, { useEffect } from 'react';
import LogoSection from './components/bagian-logo';
import { setTitle } from '../utility';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import FormRegister from './components/form-register';
import PeopleIllustration from './assets/people.svg';

const RegisterPage: React.FC = () => {
  useEffect(() => setTitle('Register'), []); // Efek dijalankan sekali ketika komponen di-mount
  const navigate = useNavigate();

  return (
    <div className="bg-light-purple flex items-center justify-center min-h-screen">
      <div className="flex laptop:space-x-10 bg-primary px-8 laptop:px-14 py-10 rounded-2xl w-2/3 laptop:w-2/3"> 
        {/* Section pertama hanya muncul di tablet dan di atasnya */}
        <section className='hidden desktop:flex text-white flex-col items-center justify-center'>
          <h1 className='h-0 laptop:h-auto mb-1 text-2xl font-bold'>Ingettttt...</h1>
          <p className='mb-5 font-light text-xs'>Mau beli gadget? liat review dulu!</p>
          <img src={PeopleIllustration} alt="" />
        </section>
        <section>
          <button onClick={() => navigate(-1)} className="text-xs transition duration-300 hover:-translate-x-2 text-left text-white opacity-90 mb-4 flex items-center">
            <FaArrowLeft className='mr-2' />
            Kembali
          </button>
          <LogoSection />
          <FormRegister />
        </section>
      </div>
    </div>
  );
};

export default RegisterPage;
