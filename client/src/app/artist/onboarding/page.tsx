'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { OnboardingSchema, TOnboardingSchema } from '@/lib/validators/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useArtistOnboarding } from '@/lib/queries/artist-queries';
import { toast } from 'sonner';
import ProtectedRoute from '@/middlewares/ProtectedRoutes';
import { useRouter } from 'next/navigation';

export default function ArtistOnboardingForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TOnboardingSchema>({
    resolver: zodResolver(OnboardingSchema),
  });

  const { mutate: onboarding, isPending } = useArtistOnboarding({
    onSuccess: () => {
      toast.success('Onboarding completed!');
      router.push('/artist/dashboard');
    },
  });

  const onSubmit = (formData: TOnboardingSchema) => {
    onboarding(formData);
  };

  return (
    <ProtectedRoute allowedRoles={['Artist']}>
      <div className="min-h-screen flex bg-black text-white">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-10">
          <div className="w-full max-w-lg">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 font-poppins text-white">
                Artist Onboarding
              </h1>
              <p className="text-gray-300 text-base font-poppins">
                Tell us more about yourself to get started.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Full Name
                </label>
                <Input
                  type="text"
                  {...register('fullName')}
                  placeholder="e.g. John Doe"
                  className="w-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none"
                  disabled={isPending}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1 font-poppins">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Stage Name
                </label>
                <Input
                  type="text"
                  {...register('stageName')}
                  placeholder="e.g. DJ Phoenix"
                  className="w-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none"
                  disabled={isPending}
                />
                {errors.stageName && (
                  <p className="text-red-400 text-sm mt-1 font-poppins">
                    {errors.stageName.message}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Bio
                </label>
                <Textarea
                  {...register('bio')}
                  placeholder="Write a short bio about yourself..."
                  className="w-full min-h-[120px] bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none resize-none"
                  disabled={isPending}
                />
                {errors.bio && (
                  <p className="text-red-400 text-sm mt-1 font-poppins">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              {/* Genre */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Genre
                </label>
                <select
                  {...register('genre')}
                  className="w-full bg-white/5 border border-white/20 text-white focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none rounded-md px-3 py-2"
                  disabled={isPending}
                >
                  <option value="" className="bg-gray-800 text-gray-400">
                    Select your genre
                  </option>
                  <option value="Afrobeats" className="bg-gray-800 text-white">
                    Afrobeats
                  </option>
                  <option value="Hip-Hop" className="bg-gray-800 text-white">
                    Hip-Hop
                  </option>
                </select>
                {errors.genre && (
                  <p className="text-red-400 text-sm mt-1 font-poppins">
                    {errors.genre.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending}
                className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-200 font-poppins ${
                  isPending
                    ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                    : 'bg-[#FF6B35] hover:bg-[#e55a2b] text-white cursor-pointer'
                }`}
              >
                {isPending ? 'Creating Your Profile...' : 'Create Profile'}
              </Button>
            </form>
          </div>
        </div>

        {/* Right Side - Banner */}
        <div className="hidden md:flex w-1/2 relative">
          <Image
            src="/images/MusicBanner.png"
            alt="Artist Onboarding Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20"></div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
