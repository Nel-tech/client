"use client";

import { Info } from "lucide-react";
import { FanOnboardingSchema, FOnboardingSchema } from "@/lib/validators/auth";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ProtectedRoute from "@/middlewares/ProtectedRoutes";
import { useRouter } from "next/navigation";
import { useFanOnboarding } from "@/lib/queries/fan-queries";
import { Input } from "@/components/ui/input";

export default function FanOnboarding() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }} =
    useForm<FOnboardingSchema>({
      resolver: zodResolver(FanOnboardingSchema),
    });

  const { mutate: onboarding, isPending } = useFanOnboarding({
    onSuccess: () => {
      toast.success("Onboarding completed!");
      router.push("/fans/dashboard");
    },
  });

  const onSubmit = (formData: FOnboardingSchema) => {
    const finalData = {
      ...formData,
      profilePic: formData.profilePic?.[0], // extract the actual file
    };

    onboarding(finalData);
  };

  return (
    <ProtectedRoute allowedRoles={["Fan"]}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900">
          Fan Onboarding
        </h2>

        {/* GENRE */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Genre</label>

          <select
            {...register("genre")}
            disabled={isPending}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="">Select your genre</option>
            <option value="Afrobeats">Afrobeats</option>
            <option value="Hip_Hop">Hip-Hop</option>
          </select>

          {errors.genre && (
            <p className="text-red-400 text-sm mt-1 font-poppins">
              {errors.genre.message}
            </p>
          )}
        </div>

        {/* PROFILE PIC */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">
            Profile Picture
          </label>

          <Input
            {...register("profilePic")}
            type="file"
            accept="image/*"
            disabled={isPending}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
          />

          {errors.profilePic && (
            <p className="text-red-400 text-sm mt-1 font-poppins">
              {errors.profilePic.message as string}
            </p>
          )}
        </div>

        {/* SOCIALS HEADER */}
        <div className="space-y-2 relative">
          <label className="block font-medium text-gray-700 flex items-center gap-2">
            Social Handles{" "}
            <span className="text-sm text-gray-500">(Optional)</span>

            <div className="relative group">
              <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
              <div className="absolute left-6 top-0 hidden group-hover:block w-64 text-sm p-3 rounded-md border bg-white shadow-lg">
                Adding your social handles helps artists recognize genuine fans
                and improves community connection.
              </div>
            </div>
          </label>
        </div>

        {/* SOCIAL INPUTS */}
        <div className="space-y-3">
          <Input
            {...register("xHandle")}
            placeholder="X (Twitter) Handle"
            disabled={isPending}
            className="w-full"
          />

          <Input
            {...register("instagram")}
            placeholder="Instagram Username"
            disabled={isPending}
          />

          <Input
            {...register("facebook")}
            placeholder="Facebook Username"
            disabled={isPending}
          />

          <Input
            {...register("tiktok")}
            placeholder="TikTok Username"
            disabled={isPending}
          />
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full py-3 rounded-xl bg-black text-white font-medium hover:opacity-90"
        >
          {isPending ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </ProtectedRoute>
  );
}
