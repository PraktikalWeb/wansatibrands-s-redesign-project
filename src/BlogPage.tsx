import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ExternalLink,
  Sparkles,
  Tag,
  User2,
} from 'lucide-react';
import { productListingPath } from './collectionData';
import { BLOG_CATEGORIES, BLOG_POSTS, blogPath, BlogPost } from './blogData';

type BlogPageProps = {
  navigateTo: (path: string) => void;
};

function BlogArticleLink({
  post,
  navigateTo,
  className,
  children,
}: {
  post: BlogPost;
  navigateTo: (path: string) => void;
  className: string;
  children: React.ReactNode;
}) {
  if (post.article) {
    return (
      <button
        type="button"
        onClick={() => navigateTo(blogPath(post.slug))}
        className={`${className} w-full appearance-none p-0 text-left`}
      >
        {children}
      </button>
    );
  }

  return (
    <a href={post.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export default function BlogPage({ navigateTo }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof BLOG_CATEGORIES)[number]>('All');

  const featuredPosts = BLOG_POSTS.filter((post) => post.featured);
  const leadFeaturedPost = featuredPosts[0];
  const supportingFeaturedPosts = featuredPosts.slice(1);
  const visiblePosts = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.categories.includes(activeCategory));

  if (!leadFeaturedPost) {
    return null;
  }

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
              <span className="text-stone-900">Blog</span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">The Journal</p>
                <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">
                  Fragrance notes, self-care rituals, and stories that grow the brand.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
                  Explore fragrance inspiration, beauty tips, and self-care ideas designed to help you choose what
                  fits your mood, your routine, and your lifestyle.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => navigateTo(productListingPath())}
                    className="btn-gold-textured px-7 py-3.5 text-xs font-bold uppercase tracking-widest"
                  >
                    Shop Wansati
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('/contact')}
                    className="border border-stone-900 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
                  >
                    Contact The Team
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 lg:justify-self-end">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
                  <span className="h-px w-8 bg-[#c2a453]" />
                  <span>{BLOG_POSTS.length} Articles</span>
                </div>
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
                  <span className="h-px w-8 bg-[#c2a453]" />
                  <span>{BLOG_CATEGORIES.length - 1} Topics</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[#8b765e]" strokeWidth={1.7} />
            <h2 className="font-serif text-2xl text-stone-900 md:text-3xl">Feature Articles</h2>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_360px]">
            <BlogArticleLink
              post={leadFeaturedPost}
              navigateTo={navigateTo}
              className="group flex h-full flex-col self-start overflow-hidden border border-stone-200 bg-[#fcfaf5] shadow-sm"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={leadFeaturedPost.image}
                  alt={leadFeaturedPost.title}
                  className="block h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute left-4 top-4">
                  <span className="bg-[#1c1a17] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-3 flex flex-wrap gap-2">
                  {leadFeaturedPost.categories.map((category) => (
                    <span
                      key={category}
                      className="border border-stone-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif text-2xl leading-tight text-stone-900 md:text-3xl">{leadFeaturedPost.title}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600">{leadFeaturedPost.excerpt}</p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-stone-500">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" strokeWidth={1.6} />
                    {leadFeaturedPost.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <User2 className="h-4 w-4" strokeWidth={1.6} />
                    {leadFeaturedPost.author}
                  </span>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-900">
                  Read Article
                  {leadFeaturedPost.article ? (
                    <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                  ) : (
                    <ExternalLink className="h-4 w-4" strokeWidth={1.7} />
                  )}
                </span>
              </div>
            </BlogArticleLink>

            <div className="space-y-6">
              {supportingFeaturedPosts.map((post) => (
                <BlogArticleLink
                  key={post.title}
                  post={post}
                  navigateTo={navigateTo}
                  className="group block border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b765e]">Featured</span>
                    <span className="text-xs text-stone-500">{post.dateLabel}</span>
                  </div>
                  <div className="mb-4 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-serif text-2xl leading-tight text-stone-900">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{post.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-900">
                    Read More
                    {post.article ? (
                      <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                    ) : (
                      <ExternalLink className="h-4 w-4" strokeWidth={1.7} />
                    )}
                  </span>
                </BlogArticleLink>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-stone-200 bg-[#f7f2ea] py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Browse Topics</p>
                <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">Filter the journal by what matters most.</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {BLOG_CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${
                        isActive
                          ? 'bg-[#1c1a17] text-white'
                          : 'border border-stone-300 bg-white text-stone-600 hover:border-stone-900 hover:text-stone-900'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visiblePosts.map((post) => (
                <BlogArticleLink
                  key={post.title}
                  post={post}
                  navigateTo={navigateTo}
                  className="luxury-card group flex h-full flex-col overflow-hidden border border-stone-200 bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {post.featured ? (
                      <div className="absolute left-4 top-4">
                        <span className="bg-[#1c1a17] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                          Featured
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                        <span
                          key={`${post.title}-${category}`}
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500"
                        >
                          <Tag className="h-3.5 w-3.5" strokeWidth={1.6} />
                          {category}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-serif text-2xl leading-tight text-stone-900">{post.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">{post.excerpt}</p>

                    <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-stone-500">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" strokeWidth={1.6} />
                        {post.dateLabel}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <User2 className="h-4 w-4" strokeWidth={1.6} />
                        {post.author}
                      </span>
                    </div>

                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-900">
                      Read Article
                      {post.article ? (
                        <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                      ) : (
                        <ExternalLink className="h-4 w-4" strokeWidth={1.7} />
                      )}
                    </span>
                  </div>
                </BlogArticleLink>
              ))}
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
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#c7ae6e]">From The Brand</p>
                <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-white md:text-4xl">
                  We believe in beauty, wellbeing, and ideas that help women move with confidence.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-300 md:text-base">
                  Every article invites you deeper into the Wansati world through fragrance inspiration, self-care
                  rituals, and stories rooted in confidence, beauty, and intentional living.
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 p-8 md:p-10 lg:border-l lg:border-t-0">
              <div className="mb-8 flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-[#c7ae6e]" strokeWidth={1.7} />
                <h3 className="font-serif text-2xl text-white">Next Steps</h3>
              </div>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => navigateTo(productListingPath())}
                  className="btn-gold-textured w-full px-6 py-3.5 text-xs font-bold uppercase tracking-widest"
                >
                  Shop The Collection
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
