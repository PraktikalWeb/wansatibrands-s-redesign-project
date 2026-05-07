import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Search } from 'lucide-react';
import { SearchResultItem, searchSite } from './searchData';

type SearchResultsPageProps = {
  query: string;
  navigateTo: (path: string) => void;
  onSearchSubmit: (query: string) => void;
  onSelectResult: (result: SearchResultItem) => void;
};

const kindStyles: Record<SearchResultItem['kind'], string> = {
  product: 'bg-[#f7efe1] text-[#8b765e]',
  collection: 'bg-stone-100 text-stone-700',
  article: 'bg-[#f1f5f9] text-slate-700',
  page: 'bg-[#f4f4f5] text-zinc-700',
};

export default function SearchResultsPage({
  query,
  navigateTo,
  onSearchSubmit,
  onSelectResult,
}: SearchResultsPageProps) {
  const [draft, setDraft] = useState(query);

  useEffect(() => {
    setDraft(query);
  }, [query]);

  const trimmedQuery = query.trim();
  const results = useMemo(() => searchSite(trimmedQuery, 30), [trimmedQuery]);

  const groupedCounts = useMemo(() => {
    return {
      products: results.filter((result) => result.kind === 'product').length,
      collections: results.filter((result) => result.kind === 'collection').length,
      articles: results.filter((result) => result.kind === 'article').length,
      pages: results.filter((result) => result.kind === 'page').length,
    };
  }, [results]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchSubmit(draft);
  };

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
              <span className="text-stone-900">Search</span>
            </div>

            <div className="max-w-4xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Site Search</p>
              <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">Find what you&apos;re looking for.</h1>

              <form onSubmit={handleSubmit} className="mt-8 max-w-3xl">
                <div className="relative flex flex-col gap-3 sm:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.7} />
                    <input
                      type="text"
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      placeholder="Search products, collections, articles, and pages"
                      className="h-12 w-full border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm text-stone-700 outline-none transition-colors focus:border-stone-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-stone-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-black"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-8 md:py-16">
        {!trimmedQuery ? (
          <div className="border border-stone-200 bg-[#fcfaf5] p-8 text-center">
            <h2 className="font-serif text-2xl text-stone-900">Start with a keyword.</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Try a product name, a collection like African Print, or a topic like fragrance.
            </p>
          </div>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <div className="flex flex-col gap-5 border-b border-stone-200 pb-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">Search Results</p>
                  <h2 className="mt-2 font-serif text-3xl text-stone-900">
                    {results.length} result{results.length === 1 ? '' : 's'} for “{trimmedQuery}”
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-stone-600">
                  {groupedCounts.products > 0 ? <span className="border border-stone-200 px-3 py-2">Products {groupedCounts.products}</span> : null}
                  {groupedCounts.collections > 0 ? <span className="border border-stone-200 px-3 py-2">Collections {groupedCounts.collections}</span> : null}
                  {groupedCounts.articles > 0 ? <span className="border border-stone-200 px-3 py-2">Journal {groupedCounts.articles}</span> : null}
                  {groupedCounts.pages > 0 ? <span className="border border-stone-200 px-3 py-2">Pages {groupedCounts.pages}</span> : null}
                </div>
              </div>
            </motion.div>

            {results.length > 0 ? (
              <div className="mt-8 space-y-4">
                {results.map((result, index) => (
                  <motion.button
                    key={result.id}
                    type="button"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.02 }}
                    onClick={() => onSelectResult(result)}
                    className="grid w-full gap-5 border border-stone-200 bg-white p-4 text-left transition-colors hover:border-stone-400 hover:bg-[#fcfaf7] sm:p-5 md:grid-cols-[120px_minmax(0,1fr)_auto] md:items-center"
                  >
                    <div
                      className={`relative flex items-center justify-center overflow-hidden bg-stone-100 ${
                        result.kind === 'product'
                          ? 'aspect-[3/4] w-full md:h-24 md:w-[120px] md:aspect-auto'
                          : 'h-40 w-full md:h-24 md:w-[120px]'
                      }`}
                    >
                      {result.image ? (
                        <img
                          src={result.image}
                          alt={result.title}
                          className={`absolute inset-0 h-full w-full ${
                            result.kind === 'product'
                              ? result.imageFit === 'contain'
                                ? 'object-contain p-4'
                                : 'object-cover object-center'
                              : result.imageFit === 'contain'
                                ? 'object-contain p-2'
                                : 'object-cover'
                          }`}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-stone-400">
                          <Search className="h-5 w-5" strokeWidth={1.6} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${kindStyles[result.kind]}`}>
                          {result.metaLabel}
                        </span>
                        {result.priceLabel ? (
                          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">{result.priceLabel}</span>
                        ) : null}
                      </div>
                      <h3 className="mt-3 font-serif text-2xl text-stone-900 md:text-3xl">{result.title}</h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-7 text-stone-600 md:text-base">
                        {result.description}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-2 self-start text-[11px] font-bold uppercase tracking-[0.18em] text-stone-600 md:self-center">
                      View
                      <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                    </span>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="mt-8 border border-stone-200 bg-[#fcfaf5] p-8 text-center">
                <h3 className="font-serif text-2xl text-stone-900">No results found.</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Try a broader term, check your spelling, or browse the shop and collections instead.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => navigateTo('/shop')}
                    className="bg-stone-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-black"
                  >
                    Browse Shop
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('/collections')}
                    className="border border-stone-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                  >
                    View Collections
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
