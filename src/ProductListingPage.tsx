import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Heart, Search, SlidersHorizontal, X } from 'lucide-react';
import {
  COLLECTION_PRODUCTS,
  CollectionDefinition,
  CollectionImageFit,
  CollectionProduct,
  getCollectionBySlug,
  getProductsForCollection,
  productListingPath,
} from './collectionData';

type ProductListingPageProps = {
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

type AvailabilityFilter = 'all' | 'in-stock' | 'sale';
type PriceFilter = 'all' | 'under-500' | '500-1000' | '1000-plus';
type SortBy = 'featured' | 'price-low' | 'price-high' | 'a-z';

const SHOP_COLLECTION_SLUGS = ['women', 'men', 'kids', 'body-care', 'fragrances', 'sale'] as const;
type ShopCollectionSlug = (typeof SHOP_COLLECTION_SLUGS)[number];

const CATEGORY_FILTER_SLUGS_BY_COLLECTION: Partial<Record<string, readonly string[]>> = {
  women: ['dresses', 'african-print', 'everyday-wear', 'exclusive-range', 'two-piece-set', 'kimono'],
  men: ['men-wear', 'african-print', 'three-piece-set'],
  kids: ['boys', 'girls'],
  'body-care': ['bathing', 'foot-care', 'facial-care'],
  fragrances: ['women-fragrance', 'men-fragrance', 'unisex-fragrance', 'home-fragrance'],
  sale: ['fragrances', 'women-fragrance', 'men-fragrance', 'unisex-fragrance', 'home-fragrance'],
};

const availabilityOptions: Array<{ value: AvailabilityFilter; label: string }> = [
  { value: 'all', label: 'All Items' },
  { value: 'in-stock', label: 'In Stock' },
  { value: 'sale', label: 'On Sale' },
];

const priceOptions: Array<{ value: PriceFilter; label: string }> = [
  { value: 'all', label: 'All Prices' },
  { value: 'under-500', label: 'Under R500' },
  { value: '500-1000', label: 'R500 - R1000' },
  { value: '1000-plus', label: 'Above R1000' },
];

function matchesPriceFilter(product: CollectionProduct, priceFilter: PriceFilter) {
  if (priceFilter === 'under-500') return product.numericPrice < 500;
  if (priceFilter === '500-1000') return product.numericPrice >= 500 && product.numericPrice <= 1000;
  if (priceFilter === '1000-plus') return product.numericPrice > 1000;
  return true;
}

function isShopCollectionSlug(slug: string): slug is ShopCollectionSlug {
  return (SHOP_COLLECTION_SLUGS as readonly string[]).includes(slug);
}

function getActiveShopCollectionSlug(activeCollection?: CollectionDefinition) {
  if (!activeCollection) return undefined;
  if (isShopCollectionSlug(activeCollection.slug)) return activeCollection.slug;
  if (['dresses', 'everyday-wear', 'exclusive-range', 'two-piece-set', 'kimono'].includes(activeCollection.slug)) {
    return 'women';
  }
  if (['men-wear', 'three-piece-set'].includes(activeCollection.slug)) {
    return 'men';
  }
  if (activeCollection.family === 'Kids') {
    return 'kids';
  }
  if (activeCollection.family === 'Body Care') {
    return 'body-care';
  }
  if (activeCollection.family === 'Fragrance') {
    return 'fragrances';
  }
  return undefined;
}

function ProductListCard({
  product,
  navigateTo,
  onAddToWishlist,
}: {
  product: CollectionProduct;
  navigateTo: (path: string) => void;
  onAddToWishlist: ProductListingPageProps['onAddToWishlist'];
}) {
  return (
    <div className="luxury-product-card group flex h-full flex-col">
      <div className="luxury-image-frame relative mb-4 aspect-[3/4] overflow-hidden bg-stone-100">
        {product.onSale ? (
          <div className="absolute left-3 bottom-3 z-10">
            <span className="bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
              Sale
            </span>
          </div>
        ) : null}
        {!product.inStock ? (
          <div className="absolute left-3 bottom-3 z-10">
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
        <span>{product.inStock ? 'Select Options' : 'View Product'}</span>
      </button>
    </div>
  );
}

type FilterPanelProps = {
  showSearch?: boolean;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  categoryFilterLabel: string;
  categoryOptions: Array<{ value: string; label: string; count: number }>;
  selectedCategorySlugs: string[];
  toggleCategorySlug: (value: string) => void;
  availabilityFilter: AvailabilityFilter;
  setAvailabilityFilter: (value: AvailabilityFilter) => void;
  priceFilter: PriceFilter;
  setPriceFilter: (value: PriceFilter) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
};

function FilterPanel({
  showSearch = true,
  searchQuery,
  setSearchQuery,
  categoryFilterLabel,
  categoryOptions,
  selectedCategorySlugs,
  toggleCategorySlug,
  availabilityFilter,
  setAvailabilityFilter,
  priceFilter,
  setPriceFilter,
  clearFilters,
  hasActiveFilters,
}: FilterPanelProps) {
  return (
    <div className="space-y-8">
      {showSearch ? (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">Search</p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 underline underline-offset-4 transition-colors hover:text-stone-900"
              >
                Clear All
              </button>
            ) : null}
          </div>
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.6} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products"
              className="premium-input w-full border border-stone-300 bg-white py-3 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-500 focus:outline-none"
            />
          </label>
        </div>
      ) : hasActiveFilters ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={clearFilters}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 underline underline-offset-4 transition-colors hover:text-stone-900"
          >
            Clear All
          </button>
        </div>
      ) : null}

      {categoryOptions.length > 0 ? (
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">{categoryFilterLabel}</p>
          <div className="space-y-2">
            {categoryOptions.map((option) => {
              const isSelected = selectedCategorySlugs.includes(option.value);

              return (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center justify-between border px-4 py-3 transition-colors ${
                    isSelected
                      ? 'border-stone-900 bg-stone-50 text-stone-900'
                      : 'border-stone-300 bg-white text-stone-700 hover:border-stone-900 hover:text-stone-900'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCategorySlug(option.value)}
                      className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500"
                    />
                    <span className="text-sm">{option.label}</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">{option.count}</span>
                </label>
              );
            })}
          </div>
        </div>
      ) : null}

      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">Availability</p>
        <div className="space-y-2">
          {availabilityOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => setAvailabilityFilter(option.value)}
              className={`flex w-full items-center justify-between border px-4 py-3 text-left text-sm transition-colors ${
                availabilityFilter === option.value
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-300 bg-white text-stone-700 hover:border-stone-900 hover:text-stone-900'
              }`}
            >
              <span>{option.label}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                {availabilityFilter === option.value ? 'Active' : ''}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">Price</p>
        <div className="space-y-2">
          {priceOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => setPriceFilter(option.value)}
              className={`w-full border px-4 py-3 text-left text-sm transition-colors ${
                priceFilter === option.value
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-300 bg-white text-stone-700 hover:border-stone-900 hover:text-stone-900'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductListingPage({
  currentPath,
  navigateTo,
  onAddToWishlist,
}: ProductListingPageProps) {
  const slugFromPath = currentPath.startsWith('/shop/')
    ? currentPath.replace('/shop/', '').split('/')[0]
    : '';
  const activeCollection = slugFromPath ? getCollectionBySlug(slugFromPath) : undefined;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorySlugs, setSelectedCategorySlugs] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const baseProducts = useMemo(() => {
    if (!activeCollection) return COLLECTION_PRODUCTS;

    const directMatches = getProductsForCollection(activeCollection.slug);

    if (directMatches.length > 0) {
      return directMatches;
    }

    return activeCollection.featuredProductIds
      .map((id) => COLLECTION_PRODUCTS.find((product) => product.id === id))
      .filter(Boolean) as CollectionProduct[];
  }, [activeCollection]);

  const shopCollections = useMemo(() =>
    SHOP_COLLECTION_SLUGS
      .map((slug) => getCollectionBySlug(slug))
      .filter(Boolean) as CollectionDefinition[],
  []);

  const categoryOptions = useMemo(() => {
    const configuredSlugs = activeCollection ? CATEGORY_FILTER_SLUGS_BY_COLLECTION[activeCollection.slug] : SHOP_COLLECTION_SLUGS;
    const fallbackSlugs = Array.from(
      new Set(
        baseProducts.flatMap((product) =>
          product.collectionSlugs.filter((slug) => slug !== activeCollection?.slug && !isShopCollectionSlug(slug)),
        ),
      ),
    );
    const candidateSlugs = configuredSlugs ?? fallbackSlugs;

    return candidateSlugs
      .map((slug) => {
        const collection = getCollectionBySlug(slug);
        if (!collection) return null;

        const count = baseProducts.filter((product) => product.collectionSlugs.includes(slug)).length;
        if (count === 0) return null;

        return {
          value: slug,
          label: collection.title,
          count,
        };
      })
      .filter(Boolean) as Array<{ value: string; label: string; count: number }>;
  }, [activeCollection, baseProducts]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const results = baseProducts.filter((product) => {
      if (normalizedQuery && !product.title.toLowerCase().includes(normalizedQuery)) {
        return false;
      }
      if (selectedCategorySlugs.length > 0 && !selectedCategorySlugs.some((slug) => product.collectionSlugs.includes(slug))) {
        return false;
      }
      if (availabilityFilter === 'in-stock' && !product.inStock) {
        return false;
      }
      if (availabilityFilter === 'sale' && !product.onSale) {
        return false;
      }
      if (!matchesPriceFilter(product, priceFilter)) {
        return false;
      }
      return true;
    });

    if (sortBy === 'price-low') {
      return [...results].sort((a, b) => a.numericPrice - b.numericPrice);
    }
    if (sortBy === 'price-high') {
      return [...results].sort((a, b) => b.numericPrice - a.numericPrice);
    }
    if (sortBy === 'a-z') {
      return [...results].sort((a, b) => a.title.localeCompare(b.title));
    }
    return results;
  }, [availabilityFilter, baseProducts, priceFilter, searchQuery, selectedCategorySlugs, sortBy]);

  const appliedFilters = useMemo(() => {
    const tags: string[] = [];
    if (searchQuery.trim()) tags.push(`Search: ${searchQuery.trim()}`);
    categoryOptions
      .filter((option) => selectedCategorySlugs.includes(option.value))
      .forEach((option) => tags.push(`${activeCollection ? 'Category' : 'Collection'}: ${option.label}`));
    if (availabilityFilter === 'in-stock') tags.push('In Stock');
    if (availabilityFilter === 'sale') tags.push('On Sale');
    if (priceFilter === 'under-500') tags.push('Under R500');
    if (priceFilter === '500-1000') tags.push('R500 - R1000');
    if (priceFilter === '1000-plus') tags.push('Above R1000');
    return tags;
  }, [activeCollection, availabilityFilter, categoryOptions, priceFilter, searchQuery, selectedCategorySlugs]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategorySlugs([]);
    setAvailabilityFilter('all');
    setPriceFilter('all');
    setSortBy('featured');
  };

  const toggleCategorySlug = (value: string) => {
    setSelectedCategorySlugs((current) =>
      current.includes(value)
        ? current.filter((slug) => slug !== value)
        : [...current, value],
    );
  };

  useEffect(() => {
    setSearchQuery('');
    setSelectedCategorySlugs([]);
    setAvailabilityFilter('all');
    setPriceFilter('all');
    setSortBy('featured');
    setIsMobileFiltersOpen(false);
  }, [activeCollection?.slug]);

  const activeShopCollectionSlug = getActiveShopCollectionSlug(activeCollection);
  const eyebrow = activeCollection ? activeCollection.eyebrow : 'Shop Wansati';
  const heading = activeCollection ? `Shop ${activeCollection.title}` : 'Shop All Wansati';
  const hasActiveFilters = appliedFilters.length > 0;
  const categoryFilterLabel = activeCollection ? 'Category' : 'Collection';

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
        <div className="relative mx-auto max-w-[1280px] px-4 py-14 sm:px-8 md:py-18">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b765e]">{eyebrow}</p>
                <div className="mb-4">
                  <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">{heading}</h1>
                  <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
                    <span className="h-px w-8 bg-[#c2a453]" />
                    <span>{filteredProducts.length} Products</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
                <button type="button" onClick={() => navigateTo('/')} className="transition-colors hover:text-stone-900">
                  Home
                </button>
                <ArrowRight size={14} strokeWidth={1.5} />
                <button type="button" onClick={() => navigateTo(productListingPath())} className="transition-colors hover:text-stone-900">
                  Shop
                </button>
                {activeCollection ? (
                  <>
                    <ArrowRight size={14} strokeWidth={1.5} />
                    <span className="text-stone-900">{activeCollection.title}</span>
                  </>
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-stone-300 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-5 sm:px-8">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => navigateTo(productListingPath())}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors ${
                !activeCollection
                  ? 'bg-stone-900 text-white'
                  : 'border border-stone-300 bg-white text-stone-700 hover:border-stone-900 hover:text-stone-900'
              }`}
            >
              Shop All
            </button>
            {shopCollections.map((collection) => (
              <button
                type="button"
                key={collection.slug}
                onClick={() => navigateTo(productListingPath(collection.slug))}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors ${
                  activeShopCollectionSlug === collection.slug
                    ? 'bg-stone-900 text-white'
                    : 'border border-stone-300 bg-white text-stone-700 hover:border-stone-900 hover:text-stone-900'
                }`}
              >
                {collection.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1706px] px-4 py-8 sm:px-8 md:py-12">
        <div className="mb-6 space-y-4 lg:hidden">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.6} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products"
              className="premium-input w-full border border-stone-300 bg-white py-3 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-500 focus:outline-none"
            />
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex flex-1 items-center justify-center gap-2 border border-stone-900 bg-white px-4 py-3 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.8} />
              Filters
            </button>
            <label className="flex min-w-[10rem] flex-1 items-center gap-2 border border-stone-300 bg-white px-3 py-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
              <span className="shrink-0">Sort</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortBy)}
                className="w-full bg-transparent text-[11px] font-bold uppercase tracking-[0.12em] text-stone-900 focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low</option>
                <option value="price-high">Price: High</option>
                <option value="a-z">A - Z</option>
              </select>
            </label>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <aside className="hidden lg:block">
            <div className="plp-filter-sidebar sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto border-r border-stone-300 bg-[#fcfaf5] px-5 py-6">
              <FilterPanel
                showSearch={false}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                categoryFilterLabel={categoryFilterLabel}
                categoryOptions={categoryOptions}
                selectedCategorySlugs={selectedCategorySlugs}
                toggleCategorySlug={toggleCategorySlug}
                availabilityFilter={availabilityFilter}
                setAvailabilityFilter={setAvailabilityFilter}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </aside>

          <div>
            <div className="mb-6 border-b border-stone-300 pb-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">Product Listing</p>
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
                    <span className="h-px w-8 bg-[#c2a453]" />
                    <span>{filteredProducts.length} of {baseProducts.length} shown</span>
                  </div>
                </div>
                <label className="hidden items-center gap-3 lg:flex">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Sort By</span>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as SortBy)}
                    className="border border-stone-300 bg-white px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-900 focus:border-stone-900 focus:outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="a-z">A to Z</option>
                  </select>
                </label>
              </div>

              {hasActiveFilters ? (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {appliedFilters.map((filter) => (
                    <span
                      key={filter}
                      className="border border-stone-300 bg-[#fcfaf5] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500"
                    >
                      {filter}
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 underline underline-offset-4 transition-colors hover:text-stone-900"
                  >
                    Clear All
                  </button>
                </div>
              ) : null}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductListCard
                    key={product.id}
                    product={product}
                    navigateTo={navigateTo}
                    onAddToWishlist={onAddToWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="border border-stone-300 bg-[#fcfaf5] px-6 py-12 text-center">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8b765e]">No Matches</p>
                <h2 className="mb-3 font-serif text-2xl text-stone-900">No products match these filters.</h2>
                <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-stone-600">
                  Try broadening your search or clearing the active filters to return to the full product listing.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn-gold-textured px-8 py-3.5 text-xs font-bold uppercase tracking-widest"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isMobileFiltersOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 z-[110] bg-black/40 lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 top-0 z-[111] bg-[#fcfaf5] lg:hidden"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-stone-300 px-5 py-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">Product Listing</p>
                    <h2 className="font-serif text-2xl text-stone-900">Filters</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-2 text-stone-500 transition-colors hover:text-stone-900"
                  >
                    <X className="h-6 w-6" strokeWidth={1.6} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-6">
                  <FilterPanel
                    showSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    categoryFilterLabel={categoryFilterLabel}
                    categoryOptions={categoryOptions}
                    selectedCategorySlugs={selectedCategorySlugs}
                    toggleCategorySlug={toggleCategorySlug}
                    availabilityFilter={availabilityFilter}
                    setAvailabilityFilter={setAvailabilityFilter}
                    priceFilter={priceFilter}
                    setPriceFilter={setPriceFilter}
                    clearFilters={clearFilters}
                    hasActiveFilters={hasActiveFilters}
                  />
                </div>
                <div className="border-t border-stone-300 bg-white px-5 py-4">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="flex-1 border border-stone-300 px-4 py-3 text-xs font-bold uppercase tracking-widest text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="btn-gold-textured flex-1 px-4 py-3 text-xs font-bold uppercase tracking-widest"
                    >
                      Show {filteredProducts.length} Products
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
