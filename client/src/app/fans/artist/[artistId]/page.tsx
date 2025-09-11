// app/artist/[artistId]/page.tsx
"use client";

import Image from "next/image";

const artist = {
  id: 1,
  name: "Luso",
  genre: "Electronic",
  bio: "Luso is a boundary-pushing electronic artist redefining the soundscape with deep beats and soulful vibes. Known for his unique sonic identity, he blends traditional rhythms with futuristic tones.",
  image: "/images/artist-banner.jpg",
  profile: "/images/artist-profile.jpg",
  topTracks: [
    { id: 1, title: "Euphoria", thumbnail: "/images/track1.jpg" },
    { id: 2, title: "Night Drive", thumbnail: "/images/track2.jpg" },
    { id: 3, title: "Solitude", thumbnail: "/images/track3.jpg" },
    { id: 4, title: "Echoes", thumbnail: "/images/track4.jpg" },
    { id: 5, title: "Spectrum", thumbnail: "/images/track5.jpg" },
  ],
  allMusic: [
    { id: 6, title: "Horizon", thumbnail: "/images/track6.jpg" },
    { id: 7, title: "Lost", thumbnail: "/images/track7.jpg" },
    { id: 8, title: "Nebula", thumbnail: "/images/track8.jpg" },
  ],
};

export default function ArtistProfilePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero Header */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute bottom-6 left-6 flex items-center gap-4">
          <Image
            src={artist.profile}
            alt={artist.name}
            width={120}
            height={120}
            className="rounded-full"
          />
          <div>
            <h1 className="text-4xl font-bold">{artist.name}</h1>
            <span className="inline-block mt-2 px-3 py-1 text-sm font-medium bg-orange-500 rounded-full">
              {artist.genre}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-10">
        {/* About the Artist */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">About the Artist</h2>
          <p className="text-gray-300 leading-relaxed">{artist.bio}</p>
        </section>

        {/* Top Tracks */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Top Tracks</h2>
          <div className="space-y-3">
            {artist.topTracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center justify-between bg-[#1A1A1A] p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={track.thumbnail}
                    alt={track.title}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <span>{track.title}</span>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-medium">
                  Share & Earn
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* All Music */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">All Music</h2>
          <div className="space-y-3">
            {artist.allMusic.map((track) => (
              <div
                key={track.id}
                className="flex items-center justify-between bg-[#1A1A1A] p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={track.thumbnail}
                    alt={track.title}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <span>{track.title}</span>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-medium">
                  Share & Earn
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
