import React from 'react';
import LogoSection from './components/bagian-logo';
import { IoCloseSharp } from "react-icons/io5";
import FormRegister from './components/form-register';

interface RegisterPageProps {
  callback: () => void;
  loginCallback:() => void;
}

const RegisterModal: React.FC<RegisterPageProps> = ({ callback, loginCallback }) => {
  return (
    <div className="bg-dark-purple w-1/3 shadow-lg pb-10 px-10 pt-4 rounded-2xl">
      <div className='w-full flex justify-end'>
        <button
          onClick={callback} // Pass the callback correctly without calling it directly
          className="text-white opacity-90 text-right text-gray-600 mb-4"
        >
          <IoCloseSharp className="text-2xl" />
        </button>
      </div>
      <LogoSection />
      <FormRegister loginCallback={loginCallback}/>
    </div>
  );
};

export default RegisterModal;
