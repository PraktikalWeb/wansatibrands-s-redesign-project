import React from 'react';
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
import { BLOG_POSTS, SPRING_FRAGRANCE_POST_SLUG, type BlogPost } from './blogData';

type BlogArticlePageProps = {
  navigateTo: (path: string) => void;
  post: BlogPost;
};

const FOR_HER_FRAGRANCES = [
  {
    name: 'Fantasy by Britney Spears',
    description:
      "Playful and sweet, Dream Delight mirrors the joy of spring in every spritz. With light floral notes, it's the scent for those who embrace the bright, carefree spirit of the season.",
  },
  {
    name: 'Lady Million by Paco Rabanne',
    description:
      "There's an undeniable elegance to spring, and Luxe Essence embodies that luxury in a subtle, timeless way. It's the perfect companion for moments when you want to feel radiant and confident.",
  },
  {
    name: 'Si by Giorgio Armani',
    description:
      'Spring is not just about change, but also about calm and serenity. This fragrance brings out your natural grace and poise, offering a gentle yet lasting embrace of softness.',
  },
  {
    name: 'Flowerbomb by Viktor & Rolf',
    description:
      "Just like a garden in full bloom, Blossom Burst captures the energy of spring with a vibrant floral explosion. It's for those who want to feel uplifted and energized by nature's beauty.",
  },
  {
    name: 'Light Blue by Dolce & Gabbana',
    description:
      'Crisp, refreshing, and light as a spring breeze. This fragrance is perfect for a day in the sun, bringing a citrusy twist that revitalizes you.',
  },
  {
    name: 'DKNY Be Delicious by Donna Karan',
    description:
      "Bursting with fresh, juicy apple notes, this fragrance is about celebrating spring's vibrant energy. It's fun, playful, and perfect for the woman who loves adventure.",
  },
] as const;

const FOR_HIM_FRAGRANCES = [
  {
    name: 'One Million by Paco Rabanne',
    description:
      "Crisp, bold, and invigorating, Platinum Essence channels that fresh, clear air of spring mornings. It's the ideal choice for those who love to embrace their confident side.",
  },
  {
    name: 'Aventus Creed by Creed',
    description:
      "There's something about spring that invites adventure, and Aventus Aura is perfect for those ready to take on new challenges with strength and clarity.",
  },
  {
    name: 'Legend by Mont Blanc',
    description:
      "Subtle yet distinct, Legendary Hero offers a quiet strength that fits perfectly with the season. It's fresh, light, and just the right balance of boldness and calm.",
  },
  {
    name: 'Dunhill Desire Blue by Alfred Dunhill',
    description:
      "Spring's clear blue skies and open horizons are captured in this refreshing, aquatic fragrance. Perfect for those who feel most alive when surrounded by nature.",
  },
  {
    name: 'Invictus by Paco Rabanne',
    description:
      'Strong, fresh, and full of energy. Invincible Spirit is the embodiment of masculine power with a hint of freshness, perfect for the man who thrives on challenges.',
  },
  {
    name: 'Le Male by Jean Paul Gaultier',
    description:
      "A modern twist on classic masculinity. This fragrance is bold, warm, and daring - ideal for a man who wants to stand out with confidence.",
  },
] as const;

const ARTICLE_TAGS = ['Perfum for him', 'Perfume for her', 'Spring Fragrances'] as const;

function RelatedArticleLink({
  post,
  navigateTo,
}: {
  post: BlogPost;
  navigateTo: (path: string) => void;
}) {
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
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
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-900">
          Read Article
          {post.isExternal ? (
            <ExternalLink className="h-4 w-4" strokeWidth={1.7} />
          ) : (
            <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
          )}
        </span>
      </div>
    </>
  );

  if (post.isExternal) {
    return (
      <a
        href={post.href}
        target="_blank"
        rel="noopener noreferrer"
        className="luxury-card group flex h-full flex-col overflow-hidden border border-stone-200 bg-white shadow-sm"
      >
        {body}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => navigateTo(post.href)}
      className="luxury-card group flex h-full flex-col overflow-hidden border border-stone-200 bg-white text-left shadow-sm"
    >
      {body}
    </button>
  );
}

export default function BlogArticlePage({ navigateTo, post }: BlogArticlePageProps) {
  if (post.slug !== SPRING_FRAGRANCE_POST_SLUG) {
    return null;
  }

  const relatedPosts = BLOG_POSTS.filter((article) => article.title !== post.title).slice(0, 3);

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
              <button
                type="button"
                onClick={() => navigateTo('/blog')}
                className="transition-colors hover:text-stone-900"
              >
                Blog
              </button>
              <ArrowRight size={14} strokeWidth={1.5} />
              <span className="text-stone-900">Spring Fragrance Guide</span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_360px] lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Journal Entry</p>
                <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">{post.title}</h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
                  There's something undeniably magical about spring. This article reframes fragrance as part of that
                  seasonal renewal, with scent ideas for women and men who want something lighter, fresher, and more
                  expressive.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-stone-500">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" strokeWidth={1.6} />
                    {post.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <User2 className="h-4 w-4" strokeWidth={1.6} />
                    {post.author}
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => navigateTo('/blog')}
                    className="border border-stone-900 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
                  >
                    Back To The Journal
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo(productListingPath())}
                    className="btn-gold-textured px-7 py-3.5 text-xs font-bold uppercase tracking-widest"
                  >
                    Shop Wansati
                  </button>
                </div>
              </div>

              <div className="border border-stone-200 bg-white/85 p-6 shadow-[0_24px_60px_rgba(42,38,32,0.08)] backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Article Focus</p>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-stone-600">
                  <div className="border-l-2 border-[#c2a453] pl-4">
                    Why spring naturally changes the way fragrance feels and performs.
                  </div>
                  <div className="border-l-2 border-[#c2a453] pl-4">
                    Fragrance directions for women who want floral, citrus, and playful scent profiles.
                  </div>
                  <div className="border-l-2 border-[#c2a453] pl-4">
                    Fresh and bold scent suggestions for men stepping into the new season.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_320px]">
            <div className="overflow-hidden border border-stone-200 bg-[#fcfaf5]">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-200">Spring Mood</p>
                  <p className="mt-2 max-w-xl font-serif text-2xl leading-tight md:text-3xl">
                    Your fragrance can mirror the lighter, brighter energy of the season.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-stone-200 bg-white p-6">
                <div className="mb-5 flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-[#8b765e]" strokeWidth={1.7} />
                  <h2 className="font-serif text-2xl text-stone-900">At A Glance</h2>
                </div>
                <div className="space-y-4 text-sm text-stone-600">
                  <div className="border-t border-stone-200 pt-4">
                    Spring invites renewal, lighter moods, and a fresh approach to personal style.
                  </div>
                  <div className="border-t border-stone-200 pt-4">
                    The article pairs that seasonal shift with perfume choices that feel bright, calm, or confident.
                  </div>
                  <div className="border-t border-stone-200 pt-4">
                    Recommendations are split between women's and men's fragrance directions.
                  </div>
                </div>
              </div>

              <div className="border border-stone-200 bg-[#f7f2ea] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <Tag className="h-5 w-5 text-[#8b765e]" strokeWidth={1.7} />
                  <h2 className="font-serif text-2xl text-stone-900">Tagged</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ARTICLE_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="border border-stone-300 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-stone-200 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
          <motion.article initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mx-auto max-w-[860px]">
              <div className="space-y-5 text-base leading-8 text-stone-700">
                <p>
                  There's something undeniably magical about the arrival of spring. The days get longer, flowers
                  bloom, and the world seems to wake up from the winter slumber. It's a time for renewal, fresh
                  beginnings, and reconnecting with the vibrant energy around us. This shift in the season brings a
                  natural desire for change - whether it is the clothes we wear, how we feel, or the scents we
                  surround ourselves with.
                </p>
                <p>
                  Your fragrance should reflect this renewal, capturing the essence of spring's lightness and beauty.
                  Your scent is an extension of who you are, and as the seasons change, it offers a unique
                  opportunity to express your individuality in a fresh, new way.
                </p>
              </div>

              <section className="mt-12">
                <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">The Power of Fragrance in Spring</h2>
                <p className="mt-5 text-base leading-8 text-stone-700">
                  Spring is a time for reinvention - both outside and within. As flowers bloom and nature awakens, it's
                  only natural we feel inspired to align with the season's freshness. Fragrance plays a powerful role
                  in this, subtly enhancing the way we experience the world around us. Much like the burst of colors
                  that come with spring, your fragrance can create an invisible presence that leaves a lasting
                  impression. It's about capturing that feeling of stepping out on a sunny day with a scent that makes
                  you feel alive, radiant, and completely in tune with the season.
                </p>
              </section>

              <section className="mt-14">
                <div className="mb-8 max-w-3xl">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">For Her</p>
                  <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">Embrace Your Spring Spirit</h2>
                  <p className="mt-4 text-base leading-8 text-stone-700">
                    Spring is a reminder of the beauty and strength within every woman. Whether you feel drawn to
                    delicate florals or vibrant, fruity scents, the season is your playground to explore new aromas
                    that speak to your essence.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {FOR_HER_FRAGRANCES.map((fragrance) => (
                    <div key={fragrance.name} className="border border-stone-200 bg-[#fcfaf5] p-6">
                      <h3 className="font-serif text-2xl text-stone-900">{fragrance.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-stone-600">{fragrance.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-14">
                <div className="mb-8 max-w-3xl">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">For Him</p>
                  <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">Fresh and Bold for Spring</h2>
                  <p className="mt-4 text-base leading-8 text-stone-700">
                    Spring isn't just about renewal; it's about stepping into your power. For men, this season brings
                    a fresh boldness, whether through a crisp, citrus scent or a woody, aromatic fragrance that feels
                    just right for those longer days.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {FOR_HIM_FRAGRANCES.map((fragrance) => (
                    <div key={fragrance.name} className="border border-stone-200 bg-white p-6">
                      <h3 className="font-serif text-2xl text-stone-900">{fragrance.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-stone-600">{fragrance.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-14 border border-stone-200 bg-[#f7f2ea] p-6 md:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-[#8b765e]" strokeWidth={1.7} />
                  <h2 className="font-serif text-3xl text-stone-900">Embrace the Change</h2>
                </div>
                <p className="text-base leading-8 text-stone-700">
                  Spring is a reminder that change can be beautiful. Whether it's trying a new fragrance or simply
                  taking a moment to breathe in the fresh air, the season invites us all to embrace transformation in
                  our own way. At Wansati, we're inspired by that change, and we hope this season brings you a sense of
                  renewal, confidence, and joy. This spring, take a moment to reflect on what makes you feel most alive
                  and radiant. Whether it's through a new fragrance or a fresh routine, embrace the beauty of the
                  season and let it inspire you from within.
                </p>
              </section>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-8 md:py-18">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Keep Reading</p>
              <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">More from the journal.</h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('/blog')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-900"
            >
              View All Articles
              <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <RelatedArticleLink key={relatedPost.title} post={relatedPost} navigateTo={navigateTo} />
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
