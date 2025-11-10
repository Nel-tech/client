import Link from "next/link";
import { Music, User } from "lucide-react";

export default function SignupOptions() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black text-white">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">Join Tropiqk</h1>
        <p className="text-gray-400 mb-8">Boost your music, earn rewards — choose how you want to join.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
        <Link href="/auth/register?role=Artist" aria-label="Sign up as an Artist">
          <div className="group relative overflow-hidden rounded-3xl p-6 cursor-pointer transform transition will-change-transform hover:-translate-y-1 hover:shadow-2xl" role="button" tabIndex={0}>
            <div className="absolute -inset-px bg-gradient-to-br from-[rgba(255,107,53,0.06)] to-transparent opacity-80 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-center gap-4 bg-[rgba(255,255,255,0.02)] p-6 rounded-2xl border border-[rgba(255,107,53,0.12)]">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#FF6B35] shadow-md">
                <Music className="h-7 w-7 text-white" />
              </div>

              <h2 className="text-2xl font-semibold">Artist</h2>
              <p className="text-center text-gray-400 text-sm max-w-xs">Upload tracks, build your profile, and promote your music to real listeners.</p>

              <ul className="mt-3 text-xs text-gray-400 flex flex-col gap-2">
                <li>• Unlimited track uploads (based on tier)</li>
                <li>• Analytics & promotion tools</li>
                <li>• Monetize plays and rewards</li>
              </ul>

              <div className="mt-6 w-full">
                <div className="mx-auto w-40 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#FF6B35] text-black font-semibold">
                  Continue →
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/auth/register?role=Fan" aria-label="Sign up as a Fan">
          <div className="group relative overflow-hidden rounded-3xl p-6 cursor-pointer transform transition will-change-transform hover:-translate-y-1 hover:shadow-2xl" role="button" tabIndex={0}>
            <div className="absolute -inset-px bg-gradient-to-br from-[rgba(255,107,53,0.04)] to-transparent opacity-70 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-center gap-4 bg-[rgba(255,255,255,0.01)] p-6 rounded-2xl border border-[rgba(255,107,53,0.08)]">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-transparent ring-1 ring-[#FF6B35]/30">
                <User className="h-7 w-7 text-[#FF6B35]" />
              </div>

              <h2 className="text-2xl font-semibold">Fan</h2>
              <p className="text-center text-gray-400 text-sm max-w-xs">Discover music, share tracks, and earn rewards for helping artists grow.</p>

              <ul className="mt-3 text-xs text-gray-400 flex flex-col gap-2">
                <li>• Earn coins by sharing</li>
                <li>• Exclusive early access to tracks</li>
                <li>• Leaderboards & rewards</li>
              </ul>

              <div className="mt-6 w-full">
                <div className="mx-auto w-40 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-transparent border border-[#FF6B35] text-[#FF6B35] font-semibold group-hover:bg-[#FF6B35] group-hover:text-black transition-colors">
                  Continue →
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <p className="text-sm text-gray-400 mt-10">
        Already have an account?{' '}
        <Link href="/login">
          <span className="text-[#FF6B35] cursor-pointer hover:text-white transition-colors">Login</span>
        </Link>
      </p>
    </div>
  );
}
