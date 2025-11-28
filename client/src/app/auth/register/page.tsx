'use client';
import { TropiqkLogo } from '@/components/Logo';
import { motion } from 'framer-motion';
import { logoVariants } from '@/components/Variants';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
// import BaseFooter from '@/components/BaseFooter';
import { useRegister } from '@/lib/queries/auth-queries';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationSchema, TRegistrationSchema } from '@/lib/validators/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';


const Register = () => {
  const router = useRouter();
  const roleParams = useSearchParams();
  const role = roleParams.get('role');

  const validRole = role === 'Fan' || role === 'Artist' ? role : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegistrationSchema>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      role: validRole,
    },
  });

  const {
  mutate: registerUser,
  isPending,
} = useRegister({
  onSuccess: () => {
    const email = useAuthStore.getState().pendingVerificationEmail;
    if (email) {
      toast.success('Registration successful! Check your email for verification code.');
      router.push(`/auth/emailVerification?email=${encodeURIComponent(email)}`);
    }
  },
});

const onSubmit = (formData: TRegistrationSchema) => {
  if (!validRole) {
    toast.error('Invalid or missing role in URL.');
    return;
  }

  const completeFormData = {
    ...formData,
    role: validRole as 'Fan' | 'Artist',
  };

  registerUser(completeFormData);
};

  return (
    <>
      <nav
        aria-label="Global"
        className="container mx-auto flex items-center justify-between p-6 lg:px-8"
      >
        <motion.div className="flex lg:flex-1" variants={logoVariants}>
          <Link href="/" className="-m-1.5 p-1.5">
            <motion.div whileHover="hover" variants={logoVariants}>
              <TropiqkLogo className="h-8 w-auto" alt="Tropiqk Logo" />
            </motion.div>
          </Link>
        </motion.div>
      </nav>

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div>
          <h1 className="text-xl text-white text-center font-poppins tracking-wide">
            Creating a {validRole || 'New'} Account
          </h1>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block font-poppins mb-1 text-sm text-gray-300"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                {...register('username')}
                className="border border-gray-600 font-poppins bg-transparent text-white placeholder-gray-400 focus:border-blue-500 focus:ring-0"
                disabled={isPending}
              />
              {errors.username && (
                <p className="text-red-500 text-sm font-poppins">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-poppins mb-1 text-sm text-gray-300"
              >
                Email address
              </label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="border border-gray-600 font-poppins bg-transparent text-white placeholder-gray-400 focus:border-blue-500 focus:ring-0"
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-poppins">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-poppins mb-1 text-sm text-gray-300"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className="border font-poppins border-gray-600 bg-transparent text-white placeholder-gray-400 focus:border-blue-500 focus:ring-0"
                disabled={isPending}
              />
              {errors.password && (
                <p className="text-red-500 text-sm font-poppins">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer font-poppins w-full bg-[#FF6B35] text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-[#e85f2d] hover:shadow-xl active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center font-poppins text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
           <Link
  href="/auth/login"
  className="font-semibold text-[#FF6B35] hover:text-[#FF6B35] dark:text-[#FF6B35] dark:hover:text-[#FF6B35]"
>
  Sign in
</Link>

          </p>
        </div>
      </div>
{/* 
      <footer>
        <BaseFooter />
      </footer> */}
    </>
  );
};

export default Register;
