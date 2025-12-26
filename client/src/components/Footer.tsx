'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { Linkedin, X } from 'lucide-react';
import { TropiqkLogo } from './Logo';
import { links } from '@/helper/mock';

const socials = [
  {
    href: 'https://www.linkedin.com/in/nelson-adegbasa-858b88365',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://x.com/manlike_favour',
    icon: X,
    label: 'X (Twitter)',
  },
];

export default function FooterSection() {
  const pathname = usePathname();

  const NavLink = ({ item }: { item: { name: string; href: string } }) => (
    <Link
      href={item.href}
      className={clsx(
        'text-sm font-poppins font-medium tracking-wide transition-colors duration-300',
        pathname === item.href
          ? 'text-white'
          : 'text-neutral-500 hover:text-white'
      )}
    >
      {item.name}
    </Link>
  );

  return (
    <footer className="relative mt-32 bg-black border-t border-white/10">
      {/* Soft Glow Accent */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-[#FF6B35]/20 to-transparent blur-2xl" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Top Row */}
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:justify-between md:text-left">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" aria-label="go home" className="inline-block">
              <TropiqkLogo />
            </Link>

            <p className="mt-4 text-sm font-poppins text-neutral-400 leading-relaxed">
              Discover emerging artists. Support real music.  
              Get rewarded for listening.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:justify-end">
            {links.map((link, index) => (
              <NavLink key={index} item={link} />
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Row */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Legal */}
          <div className="flex gap-6 text-sm font-poppins text-neutral-500">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-6">
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group relative text-neutral-500 transition-colors hover:text-white"
                >
                  <Icon className="size-5" />
                  <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#FF6B35] opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-xs font-poppins text-neutral-600">
          © {new Date().getFullYear()} Tropiqk. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
