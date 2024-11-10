import React from "react";
import { Button } from 'antd'
import { FaArrowLeft } from "react-icons/fa";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <Button icon={<FaArrowLeft />} onClick={() => {
      onClick();
    }}>
      Kembali
    </Button>
  )
};

export default BackButton;
