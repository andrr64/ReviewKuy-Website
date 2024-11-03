import React from "react";

interface ButtonIconProps {
  icon: React.ReactNode;
  text: string;
  bgColor?: string;
  onClick: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ 
  icon, 
  text, 
  bgColor = "bg-gradient-to-tr from-slate-800 to-slate-700", 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${bgColor} flex items-center rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
    >
      <span className="mr-1.5">{icon}</span>
      {text}
    </button>
  );
};

export default ButtonIcon;
