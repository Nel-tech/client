'use client';
import { GoogleProps } from '../helper/helper';
import Image from 'next/image';

const GoogleButton = ({ text }: GoogleProps) => {
  const handleGoogleLogin = () => {
    // window.location.href = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/google`
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleGoogleLogin}
        className="w-64 font-sans flex items-center cursor-pointer justify-center gap-3 bg-white border border-gray-300 px-6 py-3 rounded shadow hover:shadow-md"
      >
        <Image
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google logo"
          width={5}
          height={5}
        />
        <span className="text-sm font-sans font-medium text-gray-700">
          {text}
        </span>
      </button>
    </div>
  );
};

export default GoogleButton;
