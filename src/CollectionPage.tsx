import React, { useMemo } from 'react';
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
  productListingPath,
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
    path?: string;
  }) => void;
};

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

function dedupeProducts(products: Array<CollectionProduct | undefined | null>) {
  const seen = new Set<string>();

  return products.filter((product): product is CollectionProduct => {
    if (!product || seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
}

function getFeaturedProducts(collection: CollectionDefinition) {
  return dedupeProducts(
    collection.featuredProductIds.map((id) => COLLECTION_PRODUCTS.find((product) => product.id === id)),
  );
}

type CollectionHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  count?: number;
  crumbs: Array<{ label: string; path?: string }>;
  navigateTo: (path: string) => void;
};

function CollectionHero({
  eyebrow,
  title,
  description,
  count,
  crumbs,
  navigateTo,
}: CollectionHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-[#f4ecdf]">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(194, 164, 83, 0.18), transparent 38%), linear-gradient(135deg, rgba(255, 255, 255, 0.52), rgba(244, 236, 223, 0.9))',
        }}
      />
      <div className="relative mx-auto max-w-[1280px] px-4 py-14 sm:px-8 md:py-18">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b765e]">{eyebrow}</p>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">{title}</h1>
                {count ? (
                  <span className="border border-stone-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">
                    {count} items
                  </span>
                ) : null}
              </div>
              {description ? (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">{description}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
              {crumbs.map((crumb, index) => (
                <React.Fragment key={`${crumb.label}-${index}`}>
                  {crumb.path ? (
                    <button
                      type="button"
                      onClick={() => navigateTo(crumb.path!)}
                      className="transition-colors hover:text-stone-900"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="text-stone-900">{crumb.label}</span>
                  )}
                  {index < crumbs.length - 1 ? <ArrowRight size={14} strokeWidth={1.5} /> : null}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function getRelatedCollectionGridClassName(count: number) {
  if (count <= 1) {
    return 'grid grid-cols-1 auto-rows-[300px] gap-4 md:auto-rows-[350px] md:gap-6';
  }

  if (count === 2) {
    return 'grid grid-cols-1 auto-rows-[300px] gap-4 md:grid-cols-2 md:auto-rows-[350px] md:gap-6';
  }

  return 'grid grid-cols-1 auto-rows-[300px] gap-4 md:grid-cols-3 md:auto-rows-[350px] md:gap-6';
}

function getRelatedCollectionTileCols(index: number, count: number) {
  if (count >= 3 && index === 0) {
    return 'md:col-span-2 md:row-span-2';
  }

  return 'md:col-span-1 md:row-span-1';
}

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
              path: product.path,
            });
          }}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-stone-400 opacity-0 shadow-sm ring-1 ring-stone-200/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:text-red-500 group-hover:opacity-100"
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
  const relatedCollectionGridItems = useMemo(
    () => siblingCollections.slice(0, 6).map((collection, index) => ({
      collection,
      subtitle: collection.eyebrow,
      cols: getRelatedCollectionTileCols(index, siblingCollections.length),
    })),
    [siblingCollections],
  );

  const directCollectionProducts = useMemo(
    () => currentCollection ? getProductsForCollection(currentCollection.slug) : [],
    [currentCollection],
  );
  const editorialProducts = useMemo(() => {
    if (!currentCollection) return [];

    const featuredProducts = getFeaturedProducts(currentCollection);
    return (featuredProducts.length > 0 ? featuredProducts : directCollectionProducts).slice(0, 4);
  }, [currentCollection, directCollectionProducts]);
  const shopPreviewProducts = useMemo(() => {
    if (!currentCollection) return [];

    const previewBase = directCollectionProducts.length > 0 ? directCollectionProducts : editorialProducts;
    const editorialIds = new Set(editorialProducts.map((product) => product.id));

    return dedupeProducts([
      ...previewBase.filter((product) => !editorialIds.has(product.id)),
      ...previewBase,
    ]).slice(0, 8);
  }, [currentCollection, directCollectionProducts, editorialProducts]);

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
        <CollectionHero
          eyebrow="Shop Wansati"
          title="Wansati Collections"
          crumbs={[
            { label: 'Home', path: '/' },
            { label: 'Collections' },
          ]}
          navigateTo={navigateTo}
        />

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
                <motion.div
                  key={group.title}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="group relative overflow-hidden border border-stone-200 bg-white px-5 py-5 transition-[border-color,box-shadow] duration-300 hover:border-stone-300 hover:shadow-[0_14px_35px_rgba(28,26,23,0.08)]"
                >
                  <h3 className="mb-4 border-b border-stone-100 pb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-900">
                    {group.title}
                  </h3>
                  <div className="relative space-y-2.5">
                    {group.collections.map((collection) => (
                      <button
                        type="button"
                        key={collection.slug}
                        onClick={() => navigateTo(collectionPath(collection.slug))}
                        className="group/category flex w-full items-center justify-between gap-4 border border-transparent px-2 py-2 text-left text-sm text-stone-600 transition-all duration-200 hover:translate-x-1 hover:border-stone-100 hover:bg-[#fcfaf5] hover:text-stone-900"
                      >
                        <span className="flex items-center gap-2">
                          <span>{collection.title}</span>
                          <ChevronRight className="h-3.5 w-3.5 -translate-x-1 text-stone-400 opacity-0 transition-all duration-200 group-hover/category:translate-x-0 group-hover/category:opacity-100" />
                        </span>
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400 transition-colors duration-200 group-hover/category:text-stone-500">
                          {typeof collection.count === 'number' ? collection.count : ''}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
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
  const collectionItemCount = activeCollection.count ?? (directCollectionProducts.length || editorialProducts.length);
  const collectionPreviewCount = shopPreviewProducts.length;

  return (
    <>
      <CollectionHero
        eyebrow={activeCollection.eyebrow}
        title={`${activeCollection.title} Collection`}
        crumbs={[
          { label: 'Home', path: '/' },
          { label: 'Collections', path: '/collections' },
          { label: activeCollection.title },
        ]}
        navigateTo={navigateTo}
      />

      {relatedCollectionGridItems.length > 0 ? (
        <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8 md:py-16">
          <div className="mb-8 md:mb-10 text-center">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Collection Directory</p>
            <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">Explore the Collection</h2>
          </div>
          <div className={getRelatedCollectionGridClassName(relatedCollectionGridItems.length)}>
            {relatedCollectionGridItems.map((item) => (
              <CollectionGridTile
                key={item.collection.slug}
                collection={item.collection}
                subtitle={item.subtitle}
                cols={item.cols}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        </section>
      ) : null}

      {editorialProducts.length > 0 ? (
        <section className="border-t border-stone-200 bg-[#fcfaf5] py-14 md:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
            <div className="mb-8 md:mb-10">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Curated Edit</p>
              <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">Featured in {activeCollection.title}</h2>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
              {editorialProducts.map((product) => (
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
      ) : null}

      {shopPreviewProducts.length > 0 ? (
        <section className="border-t border-stone-200 bg-white py-14 md:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
            <div className="mb-8 border-b border-stone-200 pb-8 md:mb-10 md:flex md:items-end md:justify-between md:gap-8">
              <div className="max-w-2xl">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Shop All</p>
                <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">{activeCollection.title} Collection</h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{activeCollection.description}</p>
              </div>
              <div className="mt-5 flex flex-col gap-2 md:mt-0 md:items-start">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
                  <span className="h-px w-8 bg-[#c2a453]" />
                  <span>{collectionPreviewCount} Previewed</span>
                </div>
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
                  <span className="h-px w-8 bg-[#c2a453]" />
                  <span>{collectionItemCount} Total Items</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
              {shopPreviewProducts.map((product) => (
                <CollectionProductCard
                  key={product.id}
                  product={product}
                  navigateTo={navigateTo}
                  onAddToWishlist={onAddToWishlist}
                />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => navigateTo(productListingPath(activeCollection.slug))}
                className="inline-flex items-center justify-center gap-2 border border-stone-900 px-8 py-3 text-center text-xs font-bold uppercase tracking-widest transition-colors hover:bg-stone-900 hover:text-white"
              >
                <span>Shop All {activeCollection.title}</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {shopPreviewProducts.length === 0 && editorialProducts.length === 0 ? (
        <section className="border-t border-stone-200 bg-white py-14 md:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
            <div className="border border-stone-300 bg-[#fcfaf5] px-6 py-12 text-center">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8b765e]">Collection Preview</p>
              <h2 className="mb-3 font-serif text-2xl text-stone-900">This collection is being refined.</h2>
              <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-stone-600">
                Explore the full product listing to see the latest items already mapped to this collection.
              </p>
              <button
                type="button"
                onClick={() => navigateTo(productListingPath(activeCollection.slug))}
                className="inline-flex items-center justify-center gap-2 border border-stone-900 px-8 py-3 text-center text-xs font-bold uppercase tracking-widest transition-colors hover:bg-stone-900 hover:text-white"
              >
                  <span>Shop All {activeCollection.title}</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </section>
      ) : null}

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
                <p className="text-xs text-stone-600">Crafted with Care and<br className="hidden md:block" /> Lasting Elegance</p>
              </div>
            </div>
            <div className="flex items-start md:items-center space-x-3 md:justify-center">
              <Crown className="w-8 h-8 md:w-6 md:h-6 shrink-0 mt-1 md:mt-0" strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-sm tracking-wide mb-0.5">Exclusive Designs</h4>
                <p className="text-xs text-stone-600">Exclusive Styles, Always<br className="hidden md:block" /> Wansati.</p>
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
