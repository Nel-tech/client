'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Tab from '@/components/Tab';
import { FAQ } from '@/helper/mock';
import { RolesTypes } from '@/helper/type';

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<RolesTypes>('Artist');

  const filteredFaqs = FAQ.filter((item) => item.category === activeCategory);

  return (
    <section className="bg-background mt-[5rem]  py-12 md:py-20" id="faq">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          {/* --- LEFT COLUMN: Header and Tabs --- */}
          <div className="md:w-1/3">
            <div className="sticky top-28">
              <h2 className="font-poppins text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 mt-4 font-poppins">
                Can&apos;t find the answer you&apos;re looking for? Feel free to{' '}
                <Link
                  href="/contact"
                  className="text-orange-500 font-medium hover:underline"
                >
                  contact our support team
                </Link>
                .
              </p>

              {/* --- The Category Filter Tabs --- */}
              <div>
                <Tab
                  activeTab={activeCategory}
                  setActiveTab={setActiveCategory}
                />
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Accordion List --- */}
          <div className="md:w-2/3">
            {/* The Accordion now maps over the *filtered* array */}
            <Accordion type="single" collapsible className="w-full space-y-3">
              {filteredFaqs.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="bg-gray-800/50 border border-gray-700 shadow-sm rounded-lg px-4 last:border-b-0"
                >
                  <AccordionTrigger className="cursor-pointer text-left items-center py-5 text-white hover:no-underline">
                    <div className="flex items-center gap-4">
                      <span className="text-base font-poppins  font-semibold">
                        {item?.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-gray-300 transition-all duration-300 ease-in-out">
                    <div className="">
                      <p className="text-sm font-poppins leading-relaxed">
                        {item?.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
