import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Crown,
  Gem,
  Heart,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import {
  COLLECTION_DEFINITIONS,
  COLLECTION_PRODUCTS,
  CollectionDefinition,
  CollectionImageFit,
  CollectionProduct,
  collectionPath,
  getCollectionBySlug,
  getProductsForCollection,
} from './collectionData';

type CollectionPageProps = {
  currentPath: string;
  navigateTo: (path: string) => void;
  onAddToWishlist: (item: {
    id: string;
    title: string;
    priceLabel: string;
    numericPrice: number;
    image: string;
    imageFit?: CollectionImageFit;
  }) => void;
};

const formatCount = (count?: number) => (typeof count === 'number' ? `${count} items` : 'Collection');

const COLLECTION_GRID_CONFIG = [
  { slug: 'women', subtitle: 'Dresses & African Print', cols: 'md:col-span-2 md:row-span-2' },
  { slug: 'men', subtitle: 'Shirts & Fragrance', cols: 'md:col-span-1 md:row-span-1' },
  { slug: 'fragrances', subtitle: 'Women, Men & Unisex', cols: 'md:col-span-1 md:row-span-1' },
  { slug: 'body-care', subtitle: 'Facial & Bathing Rituals', cols: 'md:col-span-1 md:row-span-1' },
  { slug: 'kids', subtitle: 'Occasion Sets & More', cols: 'md:col-span-1 md:row-span-1' },
  { slug: 'sale', subtitle: 'Selected Wansati Pieces', cols: 'md:col-span-1 md:row-span-1' },
] as const;
const COLLECTION_DIRECTORY_GROUPS = [
  {
    title: 'Fashion',
    slugs: ['women', 'men', 'dresses', 'african-print', 'everyday-wear', 'exclusive-range', 'two-piece-set', 'three-piece-set', 'men-wear', 'kimono', 'new-arrivals'],
  },
  {
    title: 'Fragrance',
    slugs: ['fragrances', 'women-fragrance', 'men-fragrance', 'unisex-fragrance', 'home-fragrance'],
  },
  {
    title: 'Body Care',
    slugs: ['body-care', 'facial-care', 'bathing', 'foot-care'],
  },
  {
    title: 'Kids & Offers',
    slugs: ['kids', 'boys', 'girls', 'sale'],
  },
] as const;

function CollectionProductCard({
  product,
  navigateTo,
  onAddToWishlist,
}: {
  product: CollectionProduct;
  navigateTo: (path: string) => void;
  onAddToWishlist: CollectionPageProps['onAddToWishlist'];
}) {
  return (
    <div className="luxury-product-card group flex h-full flex-col">
      <div className="luxury-image-frame relative mb-4 aspect-[3/4] overflow-hidden bg-stone-100">
        {product.onSale ? (
          <div className="absolute left-3 top-3 z-10">
            <span className="bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
              Sale
            </span>
          </div>
        ) : null}
        {!product.inStock ? (
          <div className="absolute left-3 top-3 z-10">
            <span className="bg-stone-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
              Sold Out
            </span>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => navigateTo(product.path)}
          className="absolute inset-0"
          aria-label={`View ${product.title}`}
        />
        <img
          src={product.image}
          alt={product.title}
          className={`absolute inset-0 h-full w-full ${
            product.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover object-center'
          } transition-transform duration-700 group-hover:scale-105 ${!product.inStock ? 'grayscale opacity-55' : ''}`}
          referrerPolicy="no-referrer"
        />
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onAddToWishlist({
              id: product.id,
              title: product.title,
              priceLabel: product.priceLabel,
              numericPrice: product.numericPrice,
              image: product.image,
              imageFit: product.imageFit,
            });
          }}
          className="absolute right-3 top-3 z-10 bg-white/95 p-1.5 text-stone-400 opacity-0 shadow-sm transition-all duration-300 hover:text-red-500 group-hover:opacity-100"
          aria-label={`Add ${product.title} to wishlist`}
        >
          <Heart className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
      <h3 className="mb-1 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-stone-800">{product.title}</h3>
      <div className="mb-3 flex items-center gap-2">
        <p className="text-sm font-semibold text-stone-500">{product.priceLabel}</p>
        {product.onSale && product.compareAtPriceLabel ? (
          <span className="text-xs text-stone-400 line-through">{product.compareAtPriceLabel}</span>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => navigateTo(product.path)}
        className="btn-gold-textured premium-select-button mt-auto flex w-full items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-widest"
      >
        <ShoppingCart className="h-3.5 w-3.5" />
        <span>{product.inStock ? 'Select Options' : 'View Options'}</span>
      </button>
    </div>
  );
}

function CollectionCard({
  collection,
  navigateTo,
}: {
  collection: CollectionDefinition;
  navigateTo: (path: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => navigateTo(collectionPath(collection.slug))}
      className="group flex h-full cursor-pointer flex-col text-left"
    >
      <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-stone-100">
        <div className="absolute left-3 top-3 z-10">
          <span className="bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-600 shadow-sm">
            {collection.family}
          </span>
        </div>
        <img
          src={collection.heroImage}
          alt={collection.title}
          className={`absolute inset-0 h-full w-full ${
            collection.heroImageFit === 'contain' ? 'object-contain p-6' : 'object-cover object-center'
          } transition-transform duration-700 group-hover:scale-105`}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="mb-1 flex items-start justify-between gap-4">
          <h3 className="font-medium text-sm text-stone-800 md:text-base">{collection.title}</h3>
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">
            {typeof collection.count === 'number' ? collection.count : ''}
          </span>
        </div>
        <p className="mb-3 text-sm leading-relaxed text-stone-500">{collection.description}</p>
        <span className="btn-gold-textured mt-auto flex w-full items-center justify-center gap-2 py-2.5 text-[10px] font-bold uppercase tracking-widest">
          Explore Collection
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}

function CollectionGridTile({
  collection,
  subtitle,
  cols,
  navigateTo,
}: {
  collection: CollectionDefinition;
  subtitle: string;
  cols: string;
  navigateTo: (path: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden group cursor-pointer ${cols}`}
    >
      <button
        type="button"
        onClick={() => navigateTo(collectionPath(collection.slug))}
        className="absolute inset-0 block h-full w-full text-left"
        aria-label={`Open ${collection.title}`}
      >
        <img
          src={collection.heroImage}
          alt={collection.title}
          className={`h-full w-full transition-transform duration-1000 group-hover:scale-105 ${
            collection.heroImageFit === 'contain' ? 'object-contain bg-stone-100 p-8' : 'object-cover'
          }`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white md:p-10">
          <span className="mb-2 translate-y-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {subtitle}
          </span>
          <h3 className="translate-y-4 font-serif text-2xl transition-transform duration-500 group-hover:translate-y-0 md:text-3xl lg:text-4xl">
            {collection.title}
          </h3>
          <div className="mt-6 flex translate-y-4 items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
            <span>Shop Collection</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export default function CollectionPage({
  currentPath,
  navigateTo,
  onAddToWishlist,
}: CollectionPageProps) {
  const slugFromPath = currentPath.startsWith('/collections/')
    ? currentPath.replace('/collections/', '').split('/')[0]
    : '';
  const currentCollection = slugFromPath ? getCollectionBySlug(slugFromPath) : undefined;
  const isCollectionIndex = currentPath === '/collections' || !slugFromPath || !currentCollection;
  const [statusFilter, setStatusFilter] = useState<'all' | 'in-stock' | 'sale'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'a-z'>('featured');

  const collectionGridItems = useMemo(
    () => COLLECTION_GRID_CONFIG
      .map((item) => {
        const collection = getCollectionBySlug(item.slug);
        return collection ? { ...item, collection } : null;
      })
      .filter(Boolean) as Array<(typeof COLLECTION_GRID_CONFIG)[number] & { collection: CollectionDefinition }>,
    [],
  );
  const collectionDirectoryGroups = useMemo(
    () => COLLECTION_DIRECTORY_GROUPS.map((group) => ({
      title: group.title,
      collections: group.slugs
        .map((slug) => getCollectionBySlug(slug))
        .filter(Boolean) as CollectionDefinition[],
    })),
    [],
  );

  const siblingCollections = useMemo(
    () => currentCollection?.relatedSlugs
      .map((slug) => getCollectionBySlug(slug))
      .filter(Boolean) as CollectionDefinition[] ?? [],
    [currentCollection],
  );

  const collectionProducts = useMemo(() => {
    if (!currentCollection) return [];

    const directMatches = getProductsForCollection(currentCollection.slug);
    const fallbackMatches = currentCollection.featuredProductIds
      .map((id) => COLLECTION_PRODUCTS.find((product) => product.id === id))
      .filter(Boolean) as CollectionProduct[];

    const uniqueProducts = [...directMatches];
    fallbackMatches.forEach((product) => {
      if (!uniqueProducts.some((item) => item.id === product.id)) {
        uniqueProducts.push(product);
      }
    });

    const filteredProducts = uniqueProducts.filter((product) => {
      if (statusFilter === 'in-stock') return product.inStock;
      if (statusFilter === 'sale') return Boolean(product.onSale);
      return true;
    });

    const sortedProducts = [...filteredProducts];
    if (sortBy === 'price-low') {
      sortedProducts.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortBy === 'price-high') {
      sortedProducts.sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (sortBy === 'a-z') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sortedProducts.sort((a, b) => Number(Boolean(b.onSale)) - Number(Boolean(a.onSale)));
    }

    return sortedProducts;
  }, [currentCollection, sortBy, statusFilter]);

  const spotlightProducts = useMemo(
    () => COLLECTION_PRODUCTS.filter((product) => [
      'rhulani-dress',
      'prisha-sets',
      'pfukani-dress',
      'amogelang-mens-shirt',
      'bontle-mens-shirt',
      'beatrice-three-piece',
      'kids-occasion-set',
    ].includes(product.id)),
    [],
  );

  if (isCollectionIndex) {
    return (
      <>
        <section className="relative overflow-hidden border-b border-stone-200 bg-[#f4ecdf]">
          <div className="absolute inset-0 opacity-80" style={{ background: 'radial-gradient(circle at top right, rgba(194, 164, 83, 0.18), transparent 38%), linear-gradient(135deg, rgba(255, 255, 255, 0.52), rgba(244, 236, 223, 0.9))' }} />
          <div className="relative mx-auto max-w-[1280px] px-4 py-14 sm:px-8 md:py-18">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b765e]">Shop Wansati</p>
                  <h1 className="mb-3 font-serif text-3xl text-stone-900 md:text-5xl">Wansati Collections</h1>
                  <p className="max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
                    Explore fashion, fragrances, body care, kidswear, and home scent through collection pages built to help customers move from category discovery into product browsing quickly.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
                  <button type="button" onClick={() => navigateTo('/')} className="transition-colors hover:text-stone-900">
                    Home
                  </button>
                  <ArrowRight size={14} strokeWidth={1.5} />
                  <span className="text-stone-900">Collections</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8 md:py-16">
          <div className="mb-8 md:mb-10 text-center">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Primary Collections</p>
            <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">Shop by Collection</h2>
          </div>
          <div className="grid grid-cols-1 auto-rows-[300px] gap-4 md:grid-cols-3 md:auto-rows-[350px] md:gap-6">
            {collectionGridItems.map((item) => (
              <CollectionGridTile
                key={item.slug}
                collection={item.collection}
                subtitle={item.subtitle}
                cols={item.cols}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 bg-[#fcfaf5] py-14 md:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
            <div className="mb-8 md:mb-10">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Collection Directory</p>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">Browse the Full Category Map</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {collectionDirectoryGroups.map((group) => (
                <div key={group.title} className="border border-stone-200 bg-white px-5 py-5">
                  <h3 className="mb-4 border-b border-stone-100 pb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-900">
                    {group.title}
                  </h3>
                  <div className="space-y-3">
                    {group.collections.map((collection) => (
                      <button
                        type="button"
                        key={collection.slug}
                        onClick={() => navigateTo(collectionPath(collection.slug))}
                        className="flex w-full items-center justify-between gap-4 text-left text-sm text-stone-600 transition-colors hover:text-stone-900"
                      >
                        <span>{collection.title}</span>
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
                          {typeof collection.count === 'number' ? collection.count : ''}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-stone-200 border-y border-stone-300 py-12 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-[#4a4742]">
              <div className="flex items-start md:items-center space-x-3 md:justify-center">
                <Truck className="w-8 h-8 md:w-6 md:h-6 shrink-0 mt-1 md:mt-0" strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-sm tracking-wide mb-0.5">Nationwide Delivery</h4>
                  <p className="text-xs text-stone-600">We Ship Across South Africa.</p>
                </div>
              </div>
              <div className="flex items-start md:items-center space-x-3 md:justify-center">
                <Gem className="w-8 h-8 md:w-6 md:h-6 shrink-0 mt-1 md:mt-0" strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-sm tracking-wide mb-0.5">Premium Quality</h4>
                  <p className="text-xs text-stone-600">Crafted with Care and<br className="hidden md:block"/> Lasting Elegance</p>
                </div>
              </div>
              <div className="flex items-start md:items-center space-x-3 md:justify-center">
                <Crown className="w-8 h-8 md:w-6 md:h-6 shrink-0 mt-1 md:mt-0" strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-sm tracking-wide mb-0.5">Exclusive Designs</h4>
                  <p className="text-xs text-stone-600">Exclusive Styles, Always<br className="hidden md:block"/> Wansati.</p>
                </div>
              </div>
              <div className="flex items-start md:items-center space-x-3 md:justify-center">
                <ShieldCheck className="w-8 h-8 md:w-6 md:h-6 shrink-0 mt-1 md:mt-0" strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-sm tracking-wide mb-0.5">Quick Payment</h4>
                  <p className="text-xs text-stone-600">100% Secure & Seamless.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 bg-[#fcfaf5] py-14 md:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
            <div className="mb-8 md:mb-10">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Editor&apos;s Picks</p>
              <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">A First Look at Wansati</h2>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
              {spotlightProducts.map((product) => (
                <CollectionProductCard
                  key={product.id}
                  product={product}
                  navigateTo={navigateTo}
                  onAddToWishlist={onAddToWishlist}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 bg-[#fcfaf5] py-16 md:py-24">
          <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
            <img
              src="https://www.wansatibrands.co.za/wp-content/uploads/2023/09/icon.svg"
              alt="Wansati Icon"
              className="mx-auto mb-8 h-16 w-16 opacity-90 md:h-20 md:w-20"
              referrerPolicy="no-referrer"
            />
            <h2 className="mb-4 font-serif text-3xl text-[#2a2620] md:text-4xl">Join the Wansati Family</h2>
            <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-[#4a453c]">
              Subscribe to receive updates, access to exclusive deals, and more. Be the first to know about our newest arrivals.
            </p>
            <form className="mx-auto flex w-full max-w-md flex-col gap-4 sm:flex-row sm:gap-0" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="premium-input flex-1 border border-stone-300 bg-transparent px-4 py-3 text-sm placeholder:text-stone-500 focus:border-stone-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-[#1c1a17] px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-stone-800 sm:border-l-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </>
    );
  }

  const activeCollection = currentCollection as CollectionDefinition;

  return (
    <>
      <section className="border-b border-stone-200 bg-[#fcfaf5]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-2 px-4 py-6 text-xs font-bold uppercase tracking-widest text-stone-500 sm:px-8">
          <button type="button" onClick={() => navigateTo('/')} className="transition-colors hover:text-stone-900">Home</button>
          <ChevronRight className="h-4 w-4 text-stone-300" />
          <button type="button" onClick={() => navigateTo('/collections')} className="transition-colors hover:text-stone-900">Collections</button>
          <ChevronRight className="h-4 w-4 text-stone-300" />
          <span className="text-stone-900">{activeCollection.title}</span>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-stone-200 bg-[#f4ecdf]">
        <div className="absolute inset-0 opacity-80" style={{ background: 'radial-gradient(circle at top right, rgba(194, 164, 83, 0.18), transparent 38%), linear-gradient(135deg, rgba(255, 255, 255, 0.52), rgba(244, 236, 223, 0.9))' }} />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-16">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b765e]">{activeCollection.eyebrow}</p>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">{activeCollection.title}</h1>
              {activeCollection.count ? (
                <span className="border border-stone-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">
                  {activeCollection.count} items
                </span>
              ) : null}
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">{activeCollection.description}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }} className="relative mx-auto w-full max-w-md">
            <div className="aspect-[4/5] overflow-hidden border border-white/70 bg-white shadow-sm">
              <img
                src={activeCollection.heroImage}
                alt={activeCollection.title}
                className={`h-full w-full ${activeCollection.heroImageFit === 'contain' ? 'object-contain p-8' : 'object-cover object-center'}`}
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {siblingCollections.length > 0 ? (
        <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Browse This Collection</p>
              <h2 className="font-serif text-2xl text-stone-900 md:text-3xl">Related Categories</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {siblingCollections.map((collection) => (
              <button
                type="button"
                key={collection.slug}
                onClick={() => navigateTo(collectionPath(collection.slug))}
                className={`border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                  collection.slug === activeCollection.slug
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 text-stone-600 hover:border-stone-900 hover:text-stone-900'
                }`}
              >
                {collection.title}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {siblingCollections.length > 0 ? (
        <section className="mx-auto max-w-[1280px] px-4 pb-4 sm:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {siblingCollections.slice(0, 3).map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} navigateTo={navigateTo} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 border-y border-stone-200 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
              {collectionProducts.length} shown
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'in-stock', label: 'In Stock' },
                { id: 'sale', label: 'Sale' },
              ].map((filter) => (
                <button
                  type="button"
                  key={filter.id}
                  onClick={() => setStatusFilter(filter.id as 'all' | 'in-stock' | 'sale')}
                  className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                    statusFilter === filter.id
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 text-stone-600 hover:border-stone-900 hover:text-stone-900'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
            Sort By
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as 'featured' | 'price-low' | 'price-high' | 'a-z')}
              className="border border-stone-200 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-900 focus:border-stone-900 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="a-z">A to Z</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
          {collectionProducts.map((product) => (
            <CollectionProductCard
              key={product.id}
              product={product}
              navigateTo={navigateTo}
              onAddToWishlist={onAddToWishlist}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8">
        <div className="grid grid-cols-1 gap-5 border-y border-stone-200 py-8 md:grid-cols-4">
          {[
            { icon: Truck, title: 'Nationwide Delivery', copy: 'Available across South Africa.' },
            { icon: ShieldCheck, title: 'Secure Checkout', copy: 'Payfast and Yoco available.' },
            { icon: Gem, title: 'Premium Quality', copy: 'Curated products with strong finish.' },
            { icon: Crown, title: 'Collection-led Shopping', copy: 'Built to move from category to product quickly.' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <item.icon className="mt-1 h-6 w-6 shrink-0 text-[#8b765e]" strokeWidth={1.5} />
              <div>
                <h3 className="mb-1 text-sm font-bold tracking-wide text-stone-900">{item.title}</h3>
                <p className="text-xs leading-relaxed text-stone-600">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#fcfaf5] py-14 md:py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">About This Collection</p>
              <h2 className="mb-4 font-serif text-3xl text-stone-900 md:text-4xl">{activeCollection.title}</h2>
            </div>
            <p className="text-sm leading-7 text-stone-600 md:text-base">{activeCollection.longDescription}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#fcfaf5] py-16 md:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
          <img
            src="https://www.wansatibrands.co.za/wp-content/uploads/2023/09/icon.svg"
            alt="Wansati Icon"
            className="mx-auto mb-8 h-16 w-16 opacity-90 md:h-20 md:w-20"
            referrerPolicy="no-referrer"
          />
          <h2 className="mb-4 font-serif text-3xl text-[#2a2620] md:text-4xl">Join the Wansati Family</h2>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-[#4a453c]">
            Subscribe to receive updates, access to exclusive deals, and more. Be the first to know about our newest arrivals.
          </p>
          <form className="mx-auto flex w-full max-w-md flex-col gap-4 sm:flex-row sm:gap-0" onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="premium-input flex-1 border border-stone-300 bg-transparent px-4 py-3 text-sm placeholder:text-stone-500 focus:border-stone-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-[#1c1a17] px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-stone-800 sm:border-l-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
