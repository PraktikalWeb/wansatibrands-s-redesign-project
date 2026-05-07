import { BLOG_POSTS } from './blogData';
import {
  COLLECTION_DEFINITIONS,
  COLLECTION_PRODUCTS,
  CollectionImageFit,
  collectionPath,
  productListingPath,
} from './collectionData';

export type SearchResultKind = 'product' | 'collection' | 'article' | 'page';

export type SearchResultItem = {
  id: string;
  kind: SearchResultKind;
  title: string;
  description: string;
  path: string;
  image?: string;
  imageFit?: CollectionImageFit;
  priceLabel?: string;
  metaLabel: string;
  isExternal?: boolean;
  keywords: string[];
};

const STATIC_PAGE_RESULTS: SearchResultItem[] = [
  {
    id: 'page-shop',
    kind: 'page',
    title: 'Shop',
    description: 'Browse the full Wansati storefront across fashion, fragrance, and body care.',
    path: productListingPath(),
    metaLabel: 'Page',
    keywords: ['shop', 'store', 'products', 'browse', 'catalog'],
  },
  {
    id: 'page-blog',
    kind: 'page',
    title: 'Blog',
    description: 'Read journal entries, fragrance guides, and beauty stories from Wansati.',
    path: '/blog',
    metaLabel: 'Page',
    keywords: ['blog', 'journal', 'articles', 'stories'],
  },
  {
    id: 'page-about',
    kind: 'page',
    title: 'About Us',
    description: 'Learn more about the Wansati brand, vision, and story.',
    path: '/about',
    metaLabel: 'Page',
    keywords: ['about', 'brand', 'story', 'company'],
  },
  {
    id: 'page-contact',
    kind: 'page',
    title: 'Contact Us',
    description: 'Get in touch with the Wansati team for questions, support, and store information.',
    path: '/contact',
    metaLabel: 'Page',
    keywords: ['contact', 'support', 'help', 'phone', 'email'],
  },
  {
    id: 'page-account',
    kind: 'page',
    title: 'My Account',
    description: 'Sign in, register, and manage your Wansati account.',
    path: '/my-account',
    metaLabel: 'Page',
    keywords: ['account', 'sign in', 'login', 'register'],
  },
  {
    id: 'page-privacy',
    kind: 'page',
    title: 'Privacy Policy',
    description: 'Read how Wansati handles personal information, cookies, and data protection.',
    path: '/privacy-policy',
    metaLabel: 'Legal',
    keywords: ['privacy', 'policy', 'data', 'cookies'],
  },
  {
    id: 'page-terms',
    kind: 'page',
    title: 'Terms and Conditions',
    description: 'Review the terms that govern use of the Wansati website and purchases.',
    path: '/terms-and-conditions',
    metaLabel: 'Legal',
    keywords: ['terms', 'conditions', 'legal'],
  },
  {
    id: 'page-returns',
    kind: 'page',
    title: 'Returns Policy',
    description: 'Find information about returns, exchanges, and refunds for Wansati orders.',
    path: '/returns-policy',
    metaLabel: 'Legal',
    keywords: ['returns', 'refunds', 'exchanges', 'policy'],
  },
];

const SEARCH_INDEX: SearchResultItem[] = [
  ...COLLECTION_PRODUCTS.map((product) => ({
    id: `product-${product.id}`,
    kind: 'product' as const,
    title: product.title,
    description: `${product.collectionSlugs.join(' ')} ${product.inStock ? 'In stock' : 'Sold out'}`,
    path: product.path,
    image: product.image,
    imageFit: product.imageFit,
    priceLabel: product.priceLabel,
    metaLabel: 'Product',
    keywords: product.collectionSlugs,
  })),
  ...COLLECTION_DEFINITIONS.map((collection) => ({
    id: `collection-${collection.slug}`,
    kind: 'collection' as const,
    title: collection.title,
    description: collection.description,
    path: collectionPath(collection.slug),
    image: collection.heroImage,
    imageFit: collection.heroImageFit,
    metaLabel: collection.family,
    keywords: [collection.family, collection.eyebrow, ...collection.relatedSlugs],
  })),
  ...BLOG_POSTS.map((post) => ({
    id: `article-${post.slug}`,
    kind: 'article' as const,
    title: post.title,
    description: post.excerpt,
    path: post.href,
    image: post.image,
    metaLabel: 'Journal',
    isExternal: post.isExternal,
    keywords: [...post.categories, post.author],
  })),
  ...STATIC_PAGE_RESULTS,
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (value: string) => normalize(value).split(' ').filter(Boolean);

const kindPriority: Record<SearchResultKind, number> = {
  product: 24,
  collection: 18,
  article: 14,
  page: 10,
};

const getScore = (item: SearchResultItem, query: string) => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const title = normalize(item.title);
  const description = normalize(item.description);
  const keywordBlob = normalize(item.keywords.join(' '));
  const queryTokens = tokenize(query);

  let score = kindPriority[item.kind];

  if (title === normalizedQuery) score += 140;
  if (title.startsWith(normalizedQuery)) score += 100;
  if (title.includes(normalizedQuery)) score += 70;
  if (keywordBlob.includes(normalizedQuery)) score += 45;
  if (description.includes(normalizedQuery)) score += 24;

  queryTokens.forEach((token) => {
    if (title.includes(token)) score += 18;
    if (keywordBlob.includes(token)) score += 10;
    if (description.includes(token)) score += 6;
  });

  return score;
};

export const searchSite = (query: string, limit = 24) => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  return SEARCH_INDEX
    .map((item) => ({ item, score: getScore(item, trimmedQuery) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return left.item.title.localeCompare(right.item.title);
    })
    .slice(0, limit)
    .map((entry) => entry.item);
};

export const getSearchSuggestions = (query: string, limit = 8) => searchSite(query, limit);
