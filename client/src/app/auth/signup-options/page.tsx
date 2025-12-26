'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Music, User, X } from 'lucide-react';

export default function SignupOptions() {
  const [showFanNotice, setShowFanNotice] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black text-white">
      {/* Header */}
      <div className="w-full max-w-2xl text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
          Join Tropiqk
        </h1>
        <p className="text-gray-400">
          A platform built around real listening, discovery, and growth.
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* ARTIST */}
        <Link href="/auth/register?role=Artist">
          <div className="group relative overflow-hidden rounded-3xl p-6 cursor-pointer transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="relative z-10 flex flex-col items-center gap-4 bg-white/[0.03] p-6 rounded-2xl border border-[#FF6B35]/20">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#FF6B35]">
                <Music className="h-7 w-7 text-black" />
              </div>

              <h2 className="text-2xl font-semibold">Artist</h2>
              <p className="text-center text-gray-400 text-sm max-w-xs">
                Share your music, reach real listeners, and understand how your
                sound is growing.
              </p>

              <ul className="mt-3 text-xs text-gray-400 flex flex-col gap-2 text-left">
                <li>• Add tracks from supported platforms</li>
                <li>• See listening insights and audience activity</li>
                <li>• Grow your fanbase organically</li>
              </ul>

              <div className="mt-6 w-full">
                <div className="mx-auto w-40 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#FF6B35] text-black font-semibold">
                  Continue →
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* FAN */}
        <button
          onClick={() => setShowFanNotice(true)}
          className="group relative overflow-hidden rounded-3xl p-6 cursor-pointer transition hover:-translate-y-1 hover:shadow-2xl text-left"
        >
          <div className="relative z-10 flex flex-col items-center gap-4 bg-white/[0.02] p-6 rounded-2xl border border-[#FF6B35]/10">
            <div className="flex items-center justify-center h-16 w-16 rounded-full ring-1 ring-[#FF6B35]/40">
              <User className="h-7 w-7 text-[#FF6B35]" />
            </div>

            <h2 className="text-2xl font-semibold">Fan</h2>
            <p className="text-center text-gray-400 text-sm max-w-xs">
              Discover new artists, enjoy great music, and support emerging
              talent.
            </p>

            <ul className="mt-3 text-xs text-gray-400 flex flex-col gap-2 text-left">
              <li>• Explore music from upcoming artists</li>
              <li>• Support artists through listening</li>
              <li>• Access listener rewards over time</li>
            </ul>

            <div className="mt-6 w-full">
              <div className="mx-auto w-40 inline-flex items-center justify-center px-4 py-2 rounded-lg border border-[#FF6B35] text-[#FF6B35] font-semibold group-hover:bg-[#FF6B35] group-hover:text-black transition-colors">
                Continue →
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Login */}
      <p className="text-sm text-gray-400 mt-10">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-[#FF6B35] hover:text-white transition-colors"
        >
          Login
        </Link>
      </p>

      {/* FAN NOTICE MODAL */}
      {showFanNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-sm rounded-2xl bg-neutral-900 border border-white/10 p-6 text-center">
            <button
              onClick={() => setShowFanNotice(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold mb-2">
              Mobile App Coming Soon
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              The fan experience is currently in development.  
              We’re building something solid — please be patient with us.
            </p>

            <div className="mt-6">
              <button
                onClick={() => setShowFanNotice(false)}
                className="w-full rounded-lg bg-[#FF6B35] py-2 text-black font-semibold"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
