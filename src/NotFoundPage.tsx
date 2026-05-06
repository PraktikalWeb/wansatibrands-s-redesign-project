import React from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { collectionPath, productListingPath } from './collectionData';

type NotFoundPageProps = {
  navigateTo: (path: string) => void;
};

export default function NotFoundPage({ navigateTo }: NotFoundPageProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-300 bg-[#f4ecdf]">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(circle at top right, rgba(194, 164, 83, 0.18), transparent 38%), linear-gradient(135deg, rgba(255, 255, 255, 0.52), rgba(244, 236, 223, 0.9))',
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-4 py-14 sm:px-8 md:py-18">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b765e]">Page Not Found</p>
              <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">We couldn&apos;t find that page.</h1>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
              <button type="button" onClick={() => navigateTo('/')} className="transition-colors hover:text-stone-900">
                Home
              </button>
              <ArrowRight size={14} strokeWidth={1.5} />
              <span className="text-stone-900">404</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-8 md:py-18">
        <div className="border border-stone-200 bg-[#fcfaf5] px-6 py-12 text-center md:px-10 md:py-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-stone-300 text-stone-500">
            <Search className="h-6 w-6" strokeWidth={1.6} />
          </div>
          <h2 className="mb-3 font-serif text-2xl text-stone-900 md:text-3xl">Try one of these instead</h2>
          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-stone-600">
            The page may have moved, the link may be outdated, or it may never have existed in this rebuilt version of the site.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => navigateTo('/')}
              className="btn-gold-textured px-8 py-3.5 text-xs font-bold uppercase tracking-widest"
            >
              Return Home
            </button>
            <button
              type="button"
              onClick={() => navigateTo(productListingPath())}
              className="border border-stone-900 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
            >
              Shop All Products
            </button>
            <button
              type="button"
              onClick={() => navigateTo(collectionPath())}
              className="border border-stone-300 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
            >
              Browse Collections
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
