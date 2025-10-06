'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { sampleData } from '@/helper/mock';
import { MusicCardProps } from '@/helper/type';

const MusicCard = ({ img, song, artist }: MusicCardProps) => (
  <Card className="w-full bg-neutral-900 border-neutral-800 rounded-xl hover:scale-105 transition-transform">
    <CardContent className="p-2 flex flex-col items-start">
      <Image
        src={img}
        alt={artist}
        width={120}
        height={120}
        className="rounded-md object-cover w-full h-28"
      />
      <h4 className="mt-2 text-sm font-semibold text-white truncate w-full">
        {song}
      </h4>
      <p className="text-xs text-gray-400 truncate w-full">{artist}</p>
    </CardContent>
  </Card>
);

export default function DiscoverSection() {
  return (
    <div className="space-y-12 font-poppins">
      {Object.entries(sampleData).map(([title, items], idx) => (
        <section key={idx} className="w-full">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              See More →
            </button>
          </div>

          {/* Carousel Container - 6 visible, 4 scrollable */}
          <div className="relative group">
            <Carousel
              opts={{
                align: 'start',
                loop: false,
                skipSnaps: false,
                dragFree: true,
                slidesToScroll: 2,
              }}
              className="w-full"
            >
              <CarouselContent className="ml-0">
                {items.map((item, i) => (
                  <CarouselItem key={i} className="basis-1/6 pl-4 min-w-0">
                    <MusicCard {...item} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Always Visible Arrows */}
              <CarouselPrevious
                className="
                absolute 
                -left-4 
                top-1/2 
                -translate-y-1/2 
                h-10 
                w-10 
                rounded-full 
                bg-black/90 
                hover:bg-black 
                border-gray-500 
                text-white 
                transition-all 
                duration-200 
                z-10
                shadow-xl
                opacity-100
              "
              />

              <CarouselNext
                className="
                absolute 
                -right-4 
                top-1/2 
                -translate-y-1/2 
                h-10 
                w-10 
                rounded-full 
                bg-black/90 
                hover:bg-black 
                border-gray-500 
                text-white 
                transition-all 
                duration-200 
                z-10
                shadow-xl
                opacity-100
              "
              />
            </Carousel>
          </div>
        </section>
      ))}
    </div>
  );
}
