import clsx from 'clsx';
import { Space_Grotesk, Pacifico } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'], // bold for main part
});

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400', // script for the ending
});

interface TropiqkLogoProps {
  size?: number;
  className?: string;
  alt?: string;
  variant?: 'default' | 'white' | 'dark';
}

export function TropiqkLogo({
  size = 120,
  className = '',
  variant = 'default',
}: TropiqkLogoProps) {
  const getColors = () => {
    switch (variant) {
      case 'white':
        return { primary: '#FFFFFF', secondary: '#FFFFFF' };
      case 'dark':
        return { primary: '#1A1A1A', secondary: '#1A1A1A' };
      default:
        return { primary: '#FF6B35', secondary: '#1A1A1A' };
    }
  };

  const colors = getColors();

  return (
    <div className={clsx('flex items-center gap-3', className)}>
      {/* Logo Mark */}
      <svg
        width={size * 0.4}
        height={size * 0.4}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circle outline */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke={colors.primary}
          strokeWidth="3"
          fill="none"
        />
        {/* Play icon */}
        <path d="M19 16L19 32L33 24L19 16Z" fill={colors.primary} />
        {/* Music-style diagonal line */}
        <path
          d="M35 35L41 41"
          stroke={colors.primary}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span
          className={clsx(
            spaceGrotesk.className,
            'text-2xl font-bold tracking-tight text-white'
          )}
        >
          Tropi
          <span
            className={clsx(pacifico.className, 'text-2xl text-[#FF6B35] ml-1')}
          >
            qk
          </span>
        </span>
      </div>
    </div>
  );
}
