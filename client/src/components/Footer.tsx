'use client';
import { TropiqkLogo } from './Logo';
import Link from 'next/link';
import { links } from '@/helper/mock';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Linkedin, X } from 'lucide-react';

const socials = [
  {
    href: 'https://www.linkedin.com/in/nelson-adegbasa-858b88365',
    icon: <Linkedin className="size-6" />,
    label: 'LinkedIn',
  },
  {
    href: 'https://x.com/manlike_favour',
    icon: <X className="size-6" />,
    label: 'X (Twitter)',
  },
];

export default function FooterSection() {
  const pathname = usePathname();

  const NavLink = ({ item }: { item: { name: string; href: string } }) => (
    <Link
      href={item.href}
      className={clsx(
        'text-lg font-poppins font-semibold transition-colors duration-300',
        {
          'text-white relative after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-[#FF6B35]':
            pathname === item.href,
          'text-neutral-400 hover:text-white': pathname !== item.href,
        }
      )}
    >
      {item.name}
    </Link>
  );

  return (
    <footer className="bg-muted py-16 mt-[5rem]">
      <div className="mx-auto max-w-5xl px-6 text-center">
        {/* Logo */}
        <Link href="/" aria-label="go home" className="mx-auto block size-fit">
          <TropiqkLogo />
        </Link>

        {/* Tagline */}
        {/* <p className="mt-4 max-w-md mx-auto text-neutral-400 text-sm md:text-base font-poppins">
          Tropiqk empowers artists and fans through share-to-earn links,
          boosting streams while rewarding engagement.
        </p> */}

        {/* Get Started Button */}
        {/* <div className="mt-6">
            <Button
              className="cursor-pointer font-poppins bg-[#FF6B35] text-white font-semibold px-5 py-2.5 rounded-lg shadow-md shadow-[#FF6B35]/40 transition-all duration-300 ease-in-out hover:bg-[#e85f2d] hover:shadow-xl hover:shadow-[#FF6B35]/50 hover:-translate-y-0.5 active:scale-95 active:shadow-md"
            >
              Get Started
        
            <Link href="/">Get Started</Link>
          </Button>
        </div> */}

        {/* Navigation */}
        <div className="my-8 flex flex-wrap justify-center gap-6">
          {links.map((link, index) => (
            <NavLink key={index} item={link} />
          ))}
        </div>

        {/* Social Links */}
        <div className="my-8 flex justify-center gap-6">
          {socials.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors duration-300"
              aria-label={social.label}
            >
              {social.icon}
            </Link>
          ))}
        </div>

        {/* Privacy + Terms */}
        <div className="mt-4 flex font-poppins justify-center gap-6 text-base text-neutral-400">
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms & Conditions
          </Link>
        </div>

        {/* Copyright */}
        {/* <span className="text-white font-poppins block text-center text-base mt-6">
          © {new Date().getFullYear()} Tropiqk, All rights reserved
        </span> */}
      </div>
    </footer>
  );
}
