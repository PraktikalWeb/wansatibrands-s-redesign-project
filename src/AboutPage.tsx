import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BriefcaseBusiness,
  Crown,
  Gem,
  Handshake,
  Sparkles,
  Target,
} from 'lucide-react';
import { productListingPath } from './collectionData';

type AboutPageProps = {
  navigateTo: (path: string) => void;
};

const EMPOWERMENT_PILLARS = [
  {
    title: 'Entrepreneurial Access',
    description:
      'Wansati Brands was founded to create practical business opportunities for women and youth through products people can believe in and sell with confidence.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Quality & Wellbeing',
    description:
      'Personal care and home care are positioned as daily rituals that elevate confidence, beauty, and wellbeing rather than as simple commodities.',
    icon: Sparkles,
  },
  {
    title: 'Shared Growth',
    description:
      'The brand direction combines product excellence with partnership, helping motivated individuals build something meaningful for themselves and their communities.',
    icon: Handshake,
  },
] as const;

export default function AboutPage({ navigateTo }: AboutPageProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200 bg-[#f4ecdf]">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(circle at top right, rgba(194, 164, 83, 0.18), transparent 34%), linear-gradient(135deg, rgba(255, 255, 255, 0.52), rgba(244, 236, 223, 0.9))',
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-4 py-14 sm:px-8 md:py-16">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
              <button type="button" onClick={() => navigateTo('/')} className="transition-colors hover:text-stone-900">
                Home
              </button>
              <ArrowRight size={14} strokeWidth={1.5} />
              <span className="text-stone-900">About</span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_360px] lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">About Us</p>
                <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">
                  Empowering beauty, inspiring success.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
                  Elevate your essence with every scent and care ritual. Wansati Brands was founded with a vision to
                  empower individuals, especially women and youth, through high-quality personal and home care products
                  and entrepreneurial opportunity.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => navigateTo(productListingPath())}
                    className="btn-gold-textured px-7 py-3.5 text-xs font-bold uppercase tracking-widest"
                  >
                    Explore The Collection
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('/contact')}
                    className="border border-stone-900 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
                  >
                    Learn More
                  </button>
                </div>
              </div>

              <div className="border border-stone-200 bg-white/85 p-6 shadow-[0_24px_60px_rgba(42,38,32,0.08)] backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Brand Direction</p>
                <p className="mt-3 font-serif text-2xl leading-tight text-stone-900">
                  Redefining African fashion and luxury lifestyle through empowerment.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-stone-600">
                  The brand vision connects entrepreneurship, accessible beauty solutions, and quality products into one
                  growth-led story.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-8 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_360px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="overflow-hidden border border-stone-200 bg-[#fcfaf5]">
              <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_280px]">
                <div className="p-6 md:p-8">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">
                    Empowerment Through Opportunities
                  </p>
                  <h2 className="font-serif text-2xl text-stone-900 md:text-3xl">Built to open doors, not just sell products.</h2>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-stone-600">
                    <p>
                      Wansati Brands was founded to create entrepreneurial opportunities for individuals, especially
                      women and youth. The business was envisioned as a platform where empowerment sits at the center of
                      every product and every partnership.
                    </p>
                    <p>
                      From African fashion and luxury lifestyle to wellbeing-focused personal and home care, the brand
                      is designed to make quality feel accessible, aspirational, and commercially meaningful.
                    </p>
                  </div>
                </div>

                <div className="relative min-h-[280px] border-t border-stone-200 md:border-l md:border-t-0">
                  <img
                    src="https://www.wansatibrands.co.za/wp-content/uploads/2025/09/DSC_6474-scaled.jpg"
                    alt="Wansati Brands story"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-200">Wansati Story</p>
                    <p className="mt-2 max-w-[16rem] font-serif text-2xl leading-tight">
                      Beauty, business, and confidence moving together.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="space-y-6"
          >
            <div className="border border-stone-200 bg-white p-6">
              <div className="mb-5 flex items-center gap-3">
                <Target className="h-5 w-5 text-[#8b765e]" strokeWidth={1.7} />
                <h2 className="font-serif text-2xl text-stone-900">Our Mission</h2>
              </div>
              <p className="text-sm leading-relaxed text-stone-600">
                Empowering people through business opportunities while providing quality, wellbeing-focused personal
                care products.
              </p>
              <div className="mt-5 space-y-4 text-sm text-stone-600">
                <div className="border-t border-stone-200 pt-4">
                  Support our partners in growing their own business.
                </div>
                <div className="border-t border-stone-200 pt-4">
                  Inspire entrepreneurship through accessible and affordable beauty solutions.
                </div>
              </div>
            </div>

            <div className="border border-stone-200 bg-[#fcfaf5] p-6">
              <div className="mb-5 flex items-center gap-3">
                <Crown className="h-5 w-5 text-[#8b765e]" strokeWidth={1.7} />
                <h2 className="font-serif text-2xl text-stone-900">Our Vision</h2>
              </div>
              <p className="text-sm leading-relaxed text-stone-600">
                To empower inspired entrepreneurs and create opportunities for high-achieving individuals through
                quality, well-being-focused personal care products.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#f7f2ea] py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">What Drives Us</p>
              <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">A luxury lifestyle brand with an empowerment model.</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {EMPOWERMENT_PILLARS.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <div key={pillar.title} className="luxury-card border border-stone-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 text-[#8b765e]">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </div>
                    <h3 className="font-serif text-2xl text-stone-900">{pillar.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-stone-600">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 md:py-18">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto max-w-[1200px] overflow-hidden border border-stone-200 bg-[#1b1814] text-white"
        >
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="relative overflow-hidden p-8 md:p-10 lg:p-12">
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    'radial-gradient(circle at top left, rgba(194, 164, 83, 0.28), transparent 34%), linear-gradient(140deg, rgba(255,255,255,0.04), rgba(27,24,20,0.02))',
                }}
              />
              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#c7ae6e]">About Wansati</p>
                <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-white md:text-4xl">
                  Empowerment is not the side story. It is the business model.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-300 md:text-base">
                  The brand promise combines quality, confidence, and opportunity so customers and partners can engage
                  with Wansati in a way that feels personal and aspirational.
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 p-8 md:p-10 lg:border-l lg:border-t-0">
              <div className="mb-8 flex items-center gap-3">
                <Gem className="h-5 w-5 text-[#c7ae6e]" strokeWidth={1.7} />
                <h3 className="font-serif text-2xl text-white">Next Steps</h3>
              </div>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => navigateTo(productListingPath())}
                  className="btn-gold-textured w-full px-6 py-3.5 text-xs font-bold uppercase tracking-widest"
                >
                  Shop Wansati
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('/contact')}
                  className="w-full border border-white/25 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-stone-900"
                >
                  Contact The Team
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
