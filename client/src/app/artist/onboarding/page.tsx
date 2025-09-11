"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { OnboardingSchema, TOnboardingSchema } from "@/lib/validators/auth";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useArtistOnboarding } from "@/lib/queries/auth-queries";
import { toast } from 'sonner';
import { useSearchParams } from "next/navigation";
import ProtectedRoute from "@/middlewares/ProtectedRoutes";


export default function ArtistOnboardingForm() {
   const roleParams = useSearchParams();
  const role = roleParams.get('role');
   const validRole = role === 'Fans' || role === 'Artist' ? role : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TOnboardingSchema>({
    resolver: zodResolver(OnboardingSchema),
     defaultValues: {
      role: validRole,
    },
  });

  const {mutate: onboarding, isPending} = useArtistOnboarding({
    onSuccess:() => {
       toast.success('Onboarding completed!');
    }
  })

  const onSubmit = (formData: TOnboardingSchema) => {
    if (!validRole) {
      toast.error('Invalid or missing role in URL.');
      return;
    }

    const completeFormData = {
      ...formData,
      role: validRole as 'Fans' | 'Artist',
    };

    onboarding(completeFormData);
  };

  return (
    <ProtectedRoute allowedRoles={['Artist']}>

    <div className="min-h-screen flex text-white">
  {/* Left Side - Form */}
  <div className="w-full md:w-1/2 flex justify-center items-center p-10">
    <div className="w-full max-w-xl">
      <h1 className="text-3xl font-bold mb-2 font-poppins">Artist Onboarding</h1>
      <p className="text-gray-600 mb-6 font-poppins">
        Tell us more about yourself to get started.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">Full Name</label>
          <Input
            type="text"
            id="fullname"
            {...register("fullname")}
            placeholder="e.g.John Doe"
            className="max-w-md"
            disabled={isPending}
          />
          {errors.fullname && (
                <p className="text-red-500 text-sm font-poppins">{errors.fullname.message}</p>
              )}

        </div>

        {/* Stage Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">Stage Name</label>
          <Input
            type="text"
            id="stageName"
            {...register("stagename")}
            placeholder="e.g. Siz Icloud Otson-Legacy"
            className="max-w-md"
            disabled={isPending}
          />
          {errors.stagename && (
                <p className="text-red-500 text-sm font-poppins">{errors.stagename.message}</p>
              )}
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-2 text-sm font-medium">Bio</label>
          <Textarea
            id="bio"
            {...register("bio")}
            placeholder="Write a short bio..."
            className="max-w-md min-h-[120px]"
            disabled={isPending}
          />
          {errors.bio && (
                <p className="text-red-500 text-sm font-poppins">{errors.bio.message}</p>
              )}
        </div>

        

        {/* Genre */}
        <div>
          <label className="block mb-2 text-sm font-medium">Genre</label>
          <Input
            type="text"
            id="genre"
            {...register("genre")}
            placeholder="e.g. Afrobeats, Hip-Hop"
            className="max-w-md"
            disabled={isPending}
          />
           {errors.genre && (
                <p className="text-red-500 text-sm font-poppins">{errors.genre.message}</p>
              )}
        </div>

       
        <Button
  type="submit"
  disabled={isPending}
  className={`w-[28rem] font-semibold cursor-pointer py-2 px-4 rounded-xl transition-colors
    ${isPending 
      ? "bg-[#FF6B35] hover:bg-[#cc4e21] text-white" 
      : "bg-gray-600 cursor-not-allowed text-gray-300"
    }`}
>
  {isPending?'Creating Your Profile': "Create"}
</Button>
      </form>
    </div>
  </div>

  {/* Right Side - Banner */}
  <div className="hidden md:flex w-1/2">
    <Image
      src="/images/MusicBanner.png"
      alt="Artist Onboarding Banner"
      width={600}
      height={600}
      className="object-cover w-full h-full"
    />
  </div>
</div>
    </ProtectedRoute>

  );
}
