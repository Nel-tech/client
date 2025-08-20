import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'; 
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { PricingFeatures } from '@/helper/mock';

export default function Pricing() {
    return (
        <section className="py-12 md:py-16" id="pricing">
            <div className="mx-auto max-w-6xl px-6">
              <div className="mx-auto max-w-3xl space-y-3 text-center mb-8">
  
                <div className="inline-block font-inter rounded-full bg-orange-500/10 px-4 py-1.5">
                  <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">
                    Pricing Plans
                  </p>
                </div>
  
                <h1 
                  className="
                    font-poppins text-4xl font-black text-transparent 
                    sm:text-5xl lg:text-6xl 
                    bg-clip-text bg-gradient-to-r from-white to-gray-400
                  "
                >
                  Tools to Amplify Your Growth
                </h1>
  
                {/* The descriptive sub-headline */}
                <p className="font-inter text-base text-gray-300 max-w-2xl mx-auto">
                  Whether you&apos;re just starting out or ready to scale, our plans are designed to help you activate your fanbase and get your music heard. Choose the plan that&apos;s right for you.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
  
                {/* --- BASIC PLAN --- */}
                <Card className="flex flex-col bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-poppins text-2xl font-bold text-white">Basic</CardTitle>
                    <CardDescription className="text-gray-400 font-inter text-base">Perfect for getting started.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-inter font-black text-white">Free</span>
                      <span className="font-inter text-gray-400">Forever</span>
                    </div>
                    <ul className="space-y-2 text-white font-inter text-sm">
                      {PricingFeatures?.basic.map((item, index) => (
                        <li key={index} className={`flex font-inter items-center gap-3 ${!item.included && "text-gray-400 line-through"}`}>
                          {item.included ? <Check className="size-4 text-green-500 shrink-0" /> : <X className="size-4 text-red-500 shrink-0" />}
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button asChild variant="outline" className="w-full text-white font-inter border-gray-600 hover:bg-gray-700 hover:text-white">
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* --- ULTIMATE PLAN --- */}
                <Card className="relative flex flex-col bg-gray-800/50 border-orange-500 border-2 shadow-2xl shadow-orange-500/10">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-orange-500 px-4 py-1 text-xs font-semibold font-inter uppercase tracking-wider text-white">Most Popular</span>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="font-poppins text-2xl font-bold text-white">Ultimate</CardTitle>
                    <CardDescription className="text-gray-400 text-base font-inter">For professional artists.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4 font-inter">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white">₦7,000</span>
                      <span className="font-inter text-gray-400">/ month</span>
                    </div>
                    <ul className="space-y-2 text-sm text-white">
                      {PricingFeatures?.ultimate.map((item, index) => (
                        <li key={index} className={`flex items-center gap-3 ${!item.included && "text-gray-500 line-through"}`}>
                          {item.included ? <Check className="size-4 text-green-500 shrink-0" /> : <X className="size-4 text-red-500 shrink-0" />}
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button asChild variant="outline" className="w-full font-inter border-gray-600 hover:bg-gray-700 text-white">
                      <Link href="/register">Go Ultimate</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* --- PRO PLAN --- */}
                <Card className="flex flex-col bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-poppins text-2xl font-bold text-white">Pro</CardTitle>
                    <CardDescription className="text-gray-400 font-inter text-base">For artists ready to grow.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black font-inter text-white">₦2,500</span>
                      <span className="font-inter text-gray-400">/ month</span>
                    </div>
                    <ul className="space-y-2 text-sm text-white font-inter">
                      {PricingFeatures?.pro.map((item, index) => (
                        <li key={index} className={`flex items-center gap-3 ${!item.included && "text-gray-500 line-through"}`}>
                          {item.included ? <Check className="size-4 text-green-500 shrink-0" /> : <X className="size-4 text-red-500 shrink-0" />}
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button asChild className="w-full bg-orange-500 text-white hover:bg-orange-600 shadow-lg font-inter shadow-orange-500/20">
                      <Link href="/register">Upgrade to Pro</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
        </section>
    )
}