import { FeatureProps } from '@/helper/helper';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
const Feature = ({
  title,
  subtitle,
  description,
  points,
  buttonText,
  buttonHref,
  imageSrc,
  imageAlt,
  media,
  reverse = false,
  buttonVariant = 'solid',
}: FeatureProps) => (
  <div
    className={`mx-auto mt-24 grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center ${
      reverse ? 'lg:flex-row-reverse' : ''
    }`}
  >
    <div className="relative p-8 sm:p-12">
      {media ? (
        media
      ) : (
        <Image
          src={imageSrc as string}
          alt={imageAlt || ''}
          width={3000}
          height={2400}
          className="rounded-lg"
        />
      )}
    </div>

    {/* Text Column */}
    <div className="lg:pt-4">
      <div className="lg:max-w-lg">
        <p
          className={`text-base font-semibold font-poppins leading-7 ${
            subtitle === 'For Artists' ? 'text-orange-500' : 'text-orange-500'
          }`}
        >
          {subtitle}
        </p>
        <h2 className="mt-2 font-poppins text-2xl font-bold font-display tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-6 font-poppins text-base leading-8 text-gray-300">
          {description}
        </p>
        <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
          {points.map((point, idx) => (
            <div
              key={idx}
              className="relative  flex items-center justify-center gap-3"
            >
              <div>
                <CheckCircle />
              </div>

              <div>
                <dt className="inline font-base font-semibold text-white font-poppins">
                  {point.label}
                </dt>{' '}
                <dd className="inline font-poppins ">{point.text}</dd>
              </div>
            </div>
          ))}
        </dl>
        <div className="mt-8">
          <Link href={buttonHref}>
            <Button
              size="lg"
              variant={buttonVariant === 'outline' ? 'outline' : undefined}
              className={`font-poppins relative cursor-pointer rounded-lg px-6 py-3 text-base font-semibold transition-all duration-300 ease-in-out active:scale-95
      ${
        buttonVariant === 'outline'
          ? 'border-2 border-sunset-orange text-sunset-orange bg-transparent hover:bg-sunset-orange/10 hover:text-sunset-orange hover:shadow-[0_0_15px_rgba(255,107,0,0.5)]'
          : 'bg-sunset-orange text-white border-2 border-sunset-orange hover:bg-orange-600 hover:border-orange-600 hover:shadow-[0_0_20px_rgba(255,107,0,0.6)]'
      }`}
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Feature;
