import { Button } from 'antd';
import React from 'react';

interface ProfileCardProps {
  name: string;
  avatar: string;
  email: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, avatar, email }) => {
  return (
    <div className="py-6 w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={avatar} alt={`${name} image`} />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
        <div className="flex flex-wrap mt-3 px-2 justify-center gap-2">
          <Button color='primary' variant='solid'>Lihat Profil</Button>
          <Button color='danger' variant='solid'>Banned</Button>
          <Button color='danger' variant='solid'>Hapus Akun</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
