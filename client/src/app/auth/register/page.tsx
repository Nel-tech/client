import { TropiqkLogo } from '@/components/Logo';
import { motion } from 'framer-motion';
import { logoVariants } from '@/components/Variants';
import Link from 'next/link';
import GoogleButton from '@/components/GoogleButtons';
import { useSearchParams, useRouter } from 'next/navigation'; // FIX: Import useRouter
import BaseFooter from '@/components/BaseFooter';
import { useRegister } from '@/lib/queries/auth-queries';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationSchema, TRegistrationSchema } from '@/lib/validators/auth';
import { Input } from '@/components/ui/input'; // Assuming you have these
import { Button } from '@/components/ui/button';

const Register = () => {
  const router = useRouter(); // FIX: Initialize useRouter

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegistrationSchema>({
    resolver: zodResolver(RegistrationSchema),
  });

  const roleParams = useSearchParams();
  const role = roleParams.get('role');

  // Make sure role is one of the valid values before using
  const validRole = role === 'Fan' || role === 'Artist' ? role : undefined;

  const { mutate: registerUser } = useRegister({
    onSuccess: (data) => {
      if (data.user.role === 'Artist') {
        router.push('/onboarding');
      } else {
        router.push('/dashboard');
      }
    },
  });

  // This function now receives the validated form data
  const onSubmit = (formData: TRegistrationSchema) => {
    // CRITICAL FIX: Add the role to the data object before sending.
    // Ensure we have a valid role before proceeding.
    if (!validRole) {
      // Handle the error, maybe show a toast
      console.error('Invalid or missing role in URL.');
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
        {/* Logo */}
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
          {/* Add a fallback for the title if the role is missing */}
          <h1 className="text-xl text-white text-center font-poppins tracking-wide">
            Creating a {validRole || 'New'} Account
          </h1>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Pass the correct onSubmit to handleSubmit */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* --- USERNAME --- */}
            <div>
              <label htmlFor="username">Username</label>
              <Input id="username" type="text" {...register('username')} />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            {/* --- EMAIL --- */}
            <div>
              <label htmlFor="email">Email address</label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            {/* --- PASSWORD --- */}
            <div>
              <label htmlFor="password">Password</label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>

          <GoogleButton text="Sign up with Google" />

          <p className="mt-6 text-center font-poppins text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <footer>
        <BaseFooter />
      </footer>
    </>
  );
};

export default Register;
