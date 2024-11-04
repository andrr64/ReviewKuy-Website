import React from 'react';

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RKTextInput: React.FC<TextInputProps> = ({ label, placeholder, value, id, onChange }) => {
  return (
    <div>
      <label className="block text-gray-800 font-medium">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        id={id}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-slate-600 focus:outline-none"
      />
    </div>
  );
};

export default RKTextInput;
