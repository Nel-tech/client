'use client';
import { TropiqkLogo } from '@/components/Logo';
import { motion } from 'framer-motion';
import { logoVariants } from '@/components/Variants';
import Link from 'next/link';
import { useLogin } from '@/lib/queries/auth-queries';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, TLoginSchema } from '@/lib/validators/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate: loginUser, isPending } = useLogin({
    onSuccess: (data) => {
      toast.success(`Welcome back, ${data.username}!`);
      
    
      if (data.role === 'Artist') {
        router.push('/artist/dashboard');
      }  else {
        router.push('/');
      }
    },
  });

  const onSubmit = (formData: TLoginSchema) => {
    loginUser(formData);
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
            Login to your Account
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* --- EMAIL --- */}
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

            {/* --- PASSWORD --- */}
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

            {/* --- REMEMBER ME --- */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  className="h-4 w-4 text-[#FF6B35] border-gray-600 rounded focus:ring-[#FF6B35]"
                />
                <span className="text-sm text-gray-300 font-poppins">
                  Remember me
                </span>
              </label>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer font-poppins w-full sm:w-auto bg-[#FF6B35] text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-[#e85f2d] hover:shadow-xl active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Logging In...' : 'Login'}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center font-poppins text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup-options"
              className="font-semibold text-[#ff6b35]"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;