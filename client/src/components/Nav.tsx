// src/components/nav.tsx

'use client';
import { Button } from './ui/button';
import { TropiqkLogo } from './Logo';
import { useState } from 'react';
import Link from 'next/link';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import {
  buttonVariants,
  navVariants,
  navItemVariants,
  logoVariants,
  mobileItemVariants,
  mobileMenuVariants,
  hamburgerVariants,
} from './Variants';

const navigation = [
  { name: 'How It Works', href: '/#how-it-works' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Faq', href: '/#faq' },
];

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const NavLink = ({ item }: { item: { name: string; href: string } }) => (
    <motion.div
      variants={navItemVariants}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={item.href}
        className={clsx(
          'text-lg font-poppins font-semibold transition-colors duration-300 relative',
          {
            'text-white after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-[#FF6B35]':
              pathname === item.href,
            'text-neutral-400 hover:text-white': pathname !== item.href,
          }
        )}
      >
        {item.name}
      </Link>
    </motion.div>
  );

  return (
    <motion.header
      className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-neutral-800"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <nav
        aria-label="Global"
        className="container mx-auto flex items-center justify-between p-6 lg:px-8"
      >
        {/* Logo */}
        <motion.div className="flex lg:flex-1" variants={logoVariants}>
          <Link href="/" className="-m-1.5 p-1.5">
            <motion.div whileHover="hover" variants={logoVariants}>
              <TropiqkLogo className="h-8 w-auto" alt="Tropiqk Logo" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Mobile menu button */}
        <motion.div className="flex lg:hidden" variants={navItemVariants}>
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-300 hover:text-white"
            variants={hamburgerVariants}
            animate={mobileMenuOpen ? 'open' : 'closed'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </motion.button>
        </motion.div>

        {/* Desktop Navigation Links */}
        <motion.div
          className="hidden font-poppins lg:flex lg:gap-x-12"
          variants={navVariants}
        >
          {navigation.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </motion.div>

        {/* Desktop CTA Buttons */}
        <motion.div
          className="hidden lg:flex lg:flex-1 lg:justify-end gap-3"
          variants={navVariants}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link href="/auth/login">
              <Button
                variant="outline"
                className="font-poppins cursor-pointer border-2 border-neutral-700 text-neutral-300 font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 ease-in-out hover:bg-neutral-800 hover:text-white hover:border-neutral-600"
              >
                Log In
              </Button>
            </Link>
          </motion.div>

           <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link href='/auth/signup-options'>
              <Button
                className="cursor-pointer font-poppins bg-[#FF6B35] text-white font-semibold px-5 py-2.5 rounded-lg shadow-md shadow-[#FF6B35]/40 transition-all duration-300 ease-in-out hover:bg-[#e85f2d] hover:shadow-xl hover:shadow-[#FF6B35]/50"
              >
                Sign Up
              </Button>
            </Link>
          </motion.div> 
        </motion.div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <motion.div
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto sm:max-w-sm">
              <motion.div
                className="h-full bg-[#111] p-6"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex items-center justify-between">
                  <motion.button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-m-2.5 rounded-md p-2.5 text-neutral-400 hover:text-white"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </motion.button>
                </div>

                <div className="mt-6 flow-root">
                  <div>
                    <motion.div
                      className="space-y-4 font-poppins py-6"
                      variants={mobileMenuVariants}
                    >
                      {/* Mobile Navigation Links */}
                      {navigation.map((item, index) => (
                        <motion.div
                          key={item.name}
                          variants={mobileItemVariants}
                          whileHover={{
                            x: 10,
                            backgroundColor: 'rgba(38, 38, 38, 0.5)',
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="-mx-3 block font-poppins rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-300 hover:bg-neutral-900 transition-colors duration-200"
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div className="py-6" variants={mobileItemVariants}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href="/auth/login"
                          onClick={() => setMobileMenuOpen(false)}
                          className="font-poppins cursor-pointer border-2 border-neutral-700 text-neutral-300 font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 ease-in-out hover:bg-neutral-800 hover:text-white hover:border-neutral-600 block text-center"
                        >
                          Log in
                        </Link>
                      </motion.div>
                    </motion.div>

                    <motion.div className="py-6" variants={mobileItemVariants}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href="/auth/register"
                          onClick={() => setMobileMenuOpen(false)}
                          className="cursor-pointer font-poppins bg-[#FF6B35] text-white font-semibold px-5 py-2.5 rounded-lg shadow-md shadow-[#FF6B35]/40 transition-all duration-300 ease-in-out hover:bg-[#e85f2d] hover:shadow-xl hover:shadow-[#FF6B35]/50 block text-center"
                        >
                          Sign up
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </DialogPanel>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
