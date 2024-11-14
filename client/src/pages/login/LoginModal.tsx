import React from 'react';
import LogoSection from './components/bagian-logo';
import FormLogin from './components/form-login';
import { IoCloseSharp } from "react-icons/io5";

interface LoginPageProps {
  callback: () => void;
  closeCallback: () => void;
  regCallback: () => void
}

const LoginModal: React.FC<LoginPageProps> = ({closeCallback, callback, regCallback }) => {
  return (
    <div className="bg-dark-purple shadow-lg p-5 laptop:p-10 w-full max-w-xl rounded-2xl desktop:w-1/3">
      <div className='w-full flex justify-end'>
        <button
          onClick={callback} // Pass the callback correctly without calling it directly
          className="text-white opacity-90 text-left text-gray-600 mb-4 flex items-center"
        >
          <IoCloseSharp className="text-2xl" />
        </button>
      </div>
      <LogoSection />
      <FormLogin closeCallback={closeCallback} regCallback={regCallback} />
    </div>
  );

};

export default LoginModal;
