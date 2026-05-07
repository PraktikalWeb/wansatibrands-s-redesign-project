export type CollectionImageFit = 'cover' | 'contain';

export type CollectionProduct = {
  id: string;
  title: string;
  priceLabel: string;
  numericPrice: number;
  image: string;
  imageFit?: CollectionImageFit;
  path: string;
  inStock: boolean;
  onSale?: boolean;
  compareAtPriceLabel?: string;
  collectionSlugs: string[];
};

export type CollectionDefinition = {
  slug: string;
  title: string;
  family: 'Fashion' | 'Fragrance' | 'Body Care' | 'Kids' | 'Sale';
  eyebrow: string;
  description: string;
  longDescription: string;
  count?: number;
  heroImage: string;
  heroImageFit?: CollectionImageFit;
  relatedSlugs: string[];
  featuredProductIds: string[];
};

export const collectionPath = (slug?: string) => (slug ? `/collections/${slug}` : '/collections');

export const collectionLabelToSlug: Record<string, string> = {
  Women: 'women',
  Men: 'men',
  Kids: 'kids',
  'Body Care': 'body-care',
  Fragrance: 'fragrances',
  Fragrances: 'fragrances',
  Sale: 'sale',
  'New Arrivals': 'new-arrivals',
  Dresses: 'dresses',
  'African Print': 'african-print',
  'Everyday Wear': 'everyday-wear',
  'Exclusive Range': 'exclusive-range',
  'Two-piece Sets': 'two-piece-set',
  'Two-piece set': 'two-piece-set',
  'Three-piece set': 'three-piece-set',
  'Men Wear': 'men-wear',
  Kimono: 'kimono',
  'Women Fragrance': 'women-fragrance',
  'Men Fragrance': 'men-fragrance',
  Unisex: 'unisex-fragrance',
  'Unisex Fragrance': 'unisex-fragrance',
  Home: 'home-fragrance',
  'Home Fragrance': 'home-fragrance',
  'Home Fragrances': 'home-fragrance',
  'Facial Care': 'facial-care',
  Bathing: 'bathing',
  'Foot Care': 'foot-care',
  Boys: 'boys',
  Girls: 'girls',
};

export const getCollectionPathByLabel = (label: string) => {
  const slug = collectionLabelToSlug[label];
  return slug ? collectionPath(slug) : collectionPath();
};

export const productListingPath = (...slugs: Array<string | undefined>) => {
  const normalizedSlugs = slugs.filter(Boolean) as string[];
  return normalizedSlugs.length > 0 ? `/shop/${normalizedSlugs.join('/')}` : '/shop';
};

export const getProductListingPathByLabel = (label: string) => {
  const slug = collectionLabelToSlug[label];
  return slug ? productListingPath(slug) : productListingPath();
};

const nestedProductListingPathOverrides: Record<string, Record<string, string[]>> = {
  Women: {
    Fragrance: ['fragrances', 'women-fragrance'],
  },
  Men: {
    Fragrance: ['fragrances', 'men-fragrance'],
  },
  Fragrance: {
    Women: ['fragrances', 'women-fragrance'],
    Men: ['fragrances', 'men-fragrance'],
    Unisex: ['fragrances', 'unisex-fragrance'],
    Home: ['fragrances', 'home-fragrance'],
  },
};

export const getNestedProductListingPathByLabels = (parentLabel: string, childLabel?: string) => {
  if (!childLabel) {
    return getProductListingPathByLabel(parentLabel);
  }

  const overrideSegments = nestedProductListingPathOverrides[parentLabel]?.[childLabel];
  if (overrideSegments) {
    return productListingPath(...overrideSegments);
  }

  const parentSlug = collectionLabelToSlug[parentLabel];
  const childSlug = collectionLabelToSlug[childLabel];

  if (!parentSlug) {
    return getProductListingPathByLabel(childLabel);
  }

  return childSlug ? productListingPath(parentSlug, childSlug) : productListingPath(parentSlug);
};

export const COLLECTION_PRODUCTS: CollectionProduct[] = [
  {
    id: 'rhulani-dress',
    title: 'Rhulani Dress',
    priceLabel: 'R1,850.00',
    numericPrice: 1850,
    image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/12/DSC_6043-1.jpg?fit=864%2C1080&ssl=1',
    path: '/product/melania-dress',
    inStock: true,
    collectionSlugs: ['women', 'dresses', 'exclusive-range', 'new-arrivals'],
  },
  {
    id: 'prisha-sets',
    title: 'Prisha Sets',
    priceLabel: 'R1,499.00',
    numericPrice: 1499,
    image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_6105.jpg?fit=864%2C1080&ssl=1',
    path: '/product/wansati-signature-set',
    inStock: true,
    collectionSlugs: ['women', 'african-print', 'two-piece-set', 'new-arrivals'],
  },
  {
    id: 'rhandzu-dress',
    title: 'Rhandzu Dress',
    priceLabel: 'R1,600.00',
    numericPrice: 1600,
    image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5890.jpg?fit=864%2C1080&ssl=1',
    path: '/product/melania-dress',
    inStock: true,
    collectionSlugs: ['women', 'dresses', 'african-print', 'new-arrivals'],
  },
  {
    id: 'pfukani-dress',
    title: 'Pfukani Tsonga Dress',
    priceLabel: 'R2,080.00',
    numericPrice: 2080,
    image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5876.jpg?fit=864%2C1080&ssl=1',
    path: '/product/melania-dress',
    inStock: true,
    collectionSlugs: ['women', 'dresses', 'african-print'],
  },
  {
    id: 'luna-kimono',
    title: 'Luna Kimono',
    priceLabel: 'R799.00',
    numericPrice: 799,
    image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?w=864&ssl=1',
    path: '/product/wansati-signature-set',
    inStock: true,
    collectionSlugs: ['women', 'kimono', 'everyday-wear'],
  },
  {
    id: 'amogelang-mens-shirt',
    title: "Amogelang Men's Shirt",
    priceLabel: 'R650.00',
    numericPrice: 650,
    image: 'https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5751.jpg',
    path: '/product/amogelang-mens-shirt',
    inStock: true,
    collectionSlugs: ['men', 'men-wear', 'african-print', 'new-arrivals'],
  },
  {
    id: 'botshelo-mens-shirt',
    title: "Botshelo Men's Shirt",
    priceLabel: 'R650.00',
    numericPrice: 650,
    image: 'https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5751.jpg',
    path: '/product/amogelang-mens-shirt',
    inStock: true,
    collectionSlugs: ['men', 'men-wear', 'african-print'],
  },
  {
    id: 'bontle-mens-shirt',
    title: "Bontle Men's Shirt",
    priceLabel: 'R599.00',
    numericPrice: 599,
    image: 'https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-2.jpg',
    path: '/product/amogelang-mens-shirt',
    inStock: true,
    collectionSlugs: ['men', 'men-wear', 'african-print'],
  },
  {
    id: 'beatrice-three-piece',
    title: "Beatrice Men's Three-piece",
    priceLabel: 'R1,498.00',
    numericPrice: 1498,
    image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?w=864&ssl=1',
    path: '/product/amogelang-mens-shirt',
    inStock: true,
    collectionSlugs: ['men', 'three-piece-set'],
  },
  {
    id: 'oud-fleur',
    title: 'Inspired by Oud Fleur - Tom Ford',
    priceLabel: 'R150.00 - R200.00',
    numericPrice: 150,
    image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-Oud-Fleur-Photoroom.png?fit=800%2C800&ssl=1',
    imageFit: 'contain',
    path: '/product/oud-fleur-inspired',
    inStock: true,
    onSale: true,
    compareAtPriceLabel: 'R200.00 - R250.00',
    collectionSlugs: ['fragrances', 'women-fragrance', 'men-fragrance', 'unisex-fragrance', 'sale', 'new-arrivals'],
  },
  {
    id: 'white-aoud',
    title: 'Inspired by White Aoud - Montale',
    priceLabel: 'R180.00 - R250.00',
    numericPrice: 180,
    image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-White-Aoud-Photoroom.png?fit=800%2C800&ssl=1',
    imageFit: 'contain',
    path: '/product/oud-fleur-inspired',
    inStock: true,
    collectionSlugs: ['fragrances', 'men-fragrance', 'unisex-fragrance'],
  },
  {
    id: 'baccarat-rouge',
    title: 'Inspired by Baccarat Rouge 540',
    priceLabel: 'R220.00 - R280.00',
    numericPrice: 220,
    image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-Baccarat-Rouge-540-Photoroom.png?fit=800%2C800&ssl=1',
    imageFit: 'contain',
    path: '/product/oud-fleur-inspired',
    inStock: true,
    collectionSlugs: ['fragrances', 'women-fragrance', 'unisex-fragrance'],
  },
  {
    id: 'gucci-oud',
    title: 'Inspired by Gucci Oud Gucci',
    priceLabel: 'R190.00 - R260.00',
    numericPrice: 190,
    image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-Gucci-Oud-Photoroom.png?fit=800%2C800&ssl=1',
    imageFit: 'contain',
    path: '/product/oud-fleur-inspired',
    inStock: true,
    onSale: true,
    compareAtPriceLabel: 'R240.00 - R300.00',
    collectionSlugs: ['fragrances', 'women-fragrance', 'men-fragrance', 'unisex-fragrance', 'sale'],
  },
  {
    id: 'golden-shea',
    title: 'Golden Shea Body Butter',
    priceLabel: 'R280.00',
    numericPrice: 280,
    image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?w=1181&ssl=1',
    path: '/product/golden-shea-body-butter',
    inStock: true,
    collectionSlugs: ['body-care', 'bathing'],
  },
  {
    id: 'turmeric-serum',
    title: 'Turmeric Face Serum - Sadoer',
    priceLabel: 'R80.00',
    numericPrice: 80,
    image: 'https://www.wansatibrands.co.za/wp-content/uploads/2023/12/759859884_max.jpeg',
    path: '/product/golden-shea-body-butter',
    inStock: true,
    collectionSlugs: ['body-care', 'facial-care'],
  },
  {
    id: 'tsonga-home-diffuser',
    title: 'Tsonga Home Diffuser',
    priceLabel: 'R320.00',
    numericPrice: 320,
    image: 'https://www.wansatibrands.co.za/wp-content/uploads/2023/09/Diffuser-1.jpg',
    path: '/product/tsonga-home-diffuser',
    inStock: false,
    onSale: true,
    compareAtPriceLabel: 'R420.00',
    collectionSlugs: ['fragrances', 'home-fragrance', 'sale'],
  },
  {
    id: 'kids-occasion-set',
    title: 'Kids Occasion Set',
    priceLabel: 'R890.00',
    numericPrice: 890,
    image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?w=864&ssl=1',
    path: '/product/kids-occasion-set',
    inStock: true,
    collectionSlugs: ['kids', 'boys', 'girls'],
  },
];

export const COLLECTION_DEFINITIONS: CollectionDefinition[] = [
  {
    slug: 'women',
    title: 'Women',
    family: 'Fashion',
    eyebrow: 'Fashion Collection',
    description: 'Bold occasionwear, expressive prints, and refined silhouettes designed to feel unmistakably Wansati.',
    longDescription: 'The Women collection brings together statement dresses, African print styling, exclusive pieces, and effortless coordinates. The layout prioritizes quick orientation into the right subcollection first, then gives shoppers a clean product grid to browse from there.',
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?w=864&ssl=1',
    relatedSlugs: ['dresses', 'african-print', 'everyday-wear', 'exclusive-range', 'two-piece-set', 'kimono'],
    featuredProductIds: ['rhulani-dress', 'prisha-sets', 'rhandzu-dress', 'luna-kimono'],
  },
  {
    slug: 'men',
    title: 'Men',
    family: 'Fashion',
    eyebrow: 'Fashion Collection',
    description: 'Polished African-inspired menswear with clean lines, strong finishing, and easy occasion styling.',
    longDescription: 'The Men collection balances structured shirts, print-led pieces, and formal set styling. This page keeps the hierarchy clear with subcollections first, product browsing second, and supportive category copy at the bottom.',
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?w=2048&ssl=1',
    relatedSlugs: ['men-wear', 'african-print', 'three-piece-set', 'men-fragrance'],
    featuredProductIds: ['amogelang-mens-shirt', 'botshelo-mens-shirt', 'bontle-mens-shirt', 'beatrice-three-piece'],
  },
  {
    slug: 'kids',
    title: 'Kids',
    family: 'Kids',
    eyebrow: 'Kids Collection',
    description: 'Celebration-ready kidswear with the same Wansati attention to colour, finish, and comfort.',
    longDescription: 'The Kids collection is designed to help shoppers land quickly in the right age or style area, then move into a smaller set of featured items without friction.',
    count: 37,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?w=864&ssl=1',
    relatedSlugs: ['boys', 'girls'],
    featuredProductIds: ['kids-occasion-set'],
  },
  {
    slug: 'body-care',
    title: 'Body Care',
    family: 'Body Care',
    eyebrow: 'Body Care Collection',
    description: 'Nourishing essentials for daily rituals, from rich moisture to targeted care and skin preparation.',
    longDescription: 'The Body Care collection uses a lighter editorial layer and a practical product list underneath, helping shoppers move between care categories like bathing, facial care, and foot care without losing context.',
    count: 20,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?w=1181&ssl=1',
    relatedSlugs: ['facial-care', 'bathing', 'foot-care'],
    featuredProductIds: ['golden-shea', 'turmeric-serum'],
  },
  {
    slug: 'fragrances',
    title: 'Fragrances',
    family: 'Fragrance',
    eyebrow: 'Fragrance Collection',
    description: 'Signature-inspired scents across women, men, unisex, and home fragrance with a clean, shoppable structure.',
    longDescription: 'The Fragrances collection is built as both a navigation hub and a listing page: top-level scent families and home fragrance paths are shown first, while the product grid gives faster access for shoppers who already know the style of scent they want.',
    count: 64,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?w=2047&ssl=1',
    relatedSlugs: ['women-fragrance', 'men-fragrance', 'unisex-fragrance', 'home-fragrance'],
    featuredProductIds: ['oud-fleur', 'white-aoud', 'baccarat-rouge', 'gucci-oud', 'tsonga-home-diffuser'],
  },
  {
    slug: 'sale',
    title: 'Sale',
    family: 'Sale',
    eyebrow: 'Limited Offer',
    description: 'Selected pieces and scents with quieter pricing, while keeping the same premium presentation.',
    longDescription: 'The Sale collection surfaces discounted products early, keeps badges obvious, and still preserves the same clean product-card hierarchy used elsewhere on the site.',
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?w=864&ssl=1',
    relatedSlugs: ['fragrances', 'exclusive-range', 'men-fragrance'],
    featuredProductIds: ['oud-fleur', 'gucci-oud', 'tsonga-home-diffuser', 'rhulani-dress'],
  },
  {
    slug: 'new-arrivals',
    title: 'New Arrivals',
    family: 'Fashion',
    eyebrow: 'Fresh Edit',
    description: 'The latest fashion and fragrance arrivals presented in a clean first-look collection.',
    longDescription: 'New Arrivals keeps product discovery fast with a tight hero, direct access to the grid, and a mix of fashion and scent products that represent what is newest in the collection.',
    count: 20,
    heroImage: 'https://www.wansatibrands.co.za/wp-content/uploads/2025/12/DSC_6029.jpg',
    relatedSlugs: ['women', 'men', 'fragrances'],
    featuredProductIds: ['rhulani-dress', 'prisha-sets', 'amogelang-mens-shirt', 'oud-fleur'],
  },
  {
    slug: 'dresses',
    title: 'Dresses',
    family: 'Fashion',
    eyebrow: 'Women Collection',
    description: 'Occasion-forward dresses with presence, movement, and strong cultural detail.',
    longDescription: 'The Dresses collection puts product browsing early, but still gives just enough context so shoppers understand the tone of the edit before scrolling deeper.',
    count: 42,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5890.jpg?fit=864%2C1080&ssl=1',
    relatedSlugs: ['women', 'exclusive-range', 'african-print'],
    featuredProductIds: ['rhulani-dress', 'rhandzu-dress', 'pfukani-dress'],
  },
  {
    slug: 'african-print',
    title: 'African Print',
    family: 'Fashion',
    eyebrow: 'Signature Print',
    description: 'Print-led fashion across women and men, styled with strong structure and confident colour.',
    longDescription: 'African Print is a cross-category collection, so the page is built to help shoppers move between women and menswear without losing the product grid.',
    count: 18,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?w=864&ssl=1',
    relatedSlugs: ['women', 'men', 'two-piece-set', 'men-wear'],
    featuredProductIds: ['prisha-sets', 'pfukani-dress', 'amogelang-mens-shirt', 'bontle-mens-shirt'],
  },
  {
    slug: 'everyday-wear',
    title: 'Everyday Wear',
    family: 'Fashion',
    eyebrow: 'Easy Dressing',
    description: 'Lighter styling for repeat wear, softer structure, and comfortable day-to-evening looks.',
    longDescription: 'Everyday Wear is merchandised as a calmer, more practical edit, with a leaner product grid and fewer competing promotional elements.',
    count: 16,
    heroImage: 'https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5502-scaled.jpg',
    relatedSlugs: ['women', 'kimono', 'dresses'],
    featuredProductIds: ['luna-kimono', 'rhulani-dress', 'prisha-sets'],
  },
  {
    slug: 'exclusive-range',
    title: 'Exclusive Range',
    family: 'Fashion',
    eyebrow: 'Premium Edit',
    description: 'Elevated Wansati pieces designed for standout moments and occasion-led dressing.',
    longDescription: 'Exclusive Range uses a more editorial lead image and concise support copy, then moves straight into the most important products for fast selection.',
    count: 12,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/12/DSC_6043-1.jpg?fit=864%2C1080&ssl=1',
    relatedSlugs: ['women', 'dresses', 'two-piece-set'],
    featuredProductIds: ['rhulani-dress', 'prisha-sets'],
  },
  {
    slug: 'two-piece-set',
    title: 'Two-piece Set',
    family: 'Fashion',
    eyebrow: 'Set Dressing',
    description: 'Coordinated looks that make styling easier while keeping the Wansati statement intact.',
    longDescription: 'Two-piece Set is organized as a direct listing page because shoppers in this category often know the product format they want before they arrive.',
    count: 16,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_6105.jpg?fit=864%2C1080&ssl=1',
    relatedSlugs: ['women', 'exclusive-range', 'african-print'],
    featuredProductIds: ['prisha-sets'],
  },
  {
    slug: 'three-piece-set',
    title: 'Three-piece Set',
    family: 'Fashion',
    eyebrow: 'Formal Set',
    description: 'Structured multi-piece styling for more dressed-up fashion moments.',
    longDescription: 'This collection is intentionally direct and narrow, keeping the layout simple so the limited range still feels premium rather than sparse.',
    count: 1,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?w=864&ssl=1',
    relatedSlugs: ['men', 'men-wear'],
    featuredProductIds: ['beatrice-three-piece'],
  },
  {
    slug: 'men-wear',
    title: 'Men Wear',
    family: 'Fashion',
    eyebrow: 'Menswear Edit',
    description: 'Tailored menswear with African-inspired detailing, easy layering, and event-ready polish.',
    longDescription: 'Men Wear keeps the filter and sort bar close to the product list so shoppers can move quickly through a smaller, more intentional catalogue.',
    count: 6,
    heroImage: 'https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5751.jpg',
    relatedSlugs: ['men', 'african-print', 'three-piece-set'],
    featuredProductIds: ['amogelang-mens-shirt', 'botshelo-mens-shirt', 'bontle-mens-shirt'],
  },
  {
    slug: 'kimono',
    title: 'Kimono',
    family: 'Fashion',
    eyebrow: 'Layered Styling',
    description: 'Soft outer layers with movement, light structure, and statement drape.',
    longDescription: 'Kimono works best as an editorial mini-collection, so the page uses a stronger image lead and fewer interface elements before the product grid begins.',
    count: 2,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?w=864&ssl=1',
    relatedSlugs: ['women', 'everyday-wear'],
    featuredProductIds: ['luna-kimono'],
  },
  {
    slug: 'women-fragrance',
    title: 'Women Fragrance',
    family: 'Fragrance',
    eyebrow: 'Scent Collection',
    description: 'Feminine-led fragrance interpretations with warmth, softness, and statement character.',
    longDescription: 'Women Fragrance starts with the product list quickly, but still includes cross-links to related scent families for easier exploration.',
    count: 29,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-Baccarat-Rouge-540-Photoroom.png?fit=800%2C800&ssl=1',
    heroImageFit: 'contain',
    relatedSlugs: ['fragrances', 'unisex-fragrance', 'men-fragrance'],
    featuredProductIds: ['oud-fleur', 'baccarat-rouge', 'gucci-oud'],
  },
  {
    slug: 'men-fragrance',
    title: 'Men Fragrance',
    family: 'Fragrance',
    eyebrow: 'Scent Collection',
    description: 'Bold woody and warm scent profiles curated for presence, depth, and easy gifting.',
    longDescription: 'Men Fragrance uses a straightforward browsing structure: a clear hero, quick links to adjacent scent families, then a strong product grid.',
    count: 29,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-Oud-Fleur-Photoroom.png?fit=800%2C800&ssl=1',
    heroImageFit: 'contain',
    relatedSlugs: ['fragrances', 'unisex-fragrance', 'women-fragrance'],
    featuredProductIds: ['oud-fleur', 'white-aoud', 'gucci-oud'],
  },
  {
    slug: 'unisex-fragrance',
    title: 'Unisex Fragrance',
    family: 'Fragrance',
    eyebrow: 'Scent Collection',
    description: 'Balanced scent profiles that move easily between day and evening and across wearers.',
    longDescription: 'Unisex Fragrance is a tighter category, so the page keeps its focus on the product grid and a clean set of supporting sibling links.',
    count: 4,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-White-Aoud-Photoroom.png?fit=800%2C800&ssl=1',
    heroImageFit: 'contain',
    relatedSlugs: ['fragrances', 'women-fragrance', 'men-fragrance'],
    featuredProductIds: ['oud-fleur', 'white-aoud', 'baccarat-rouge', 'gucci-oud'],
  },
  {
    slug: 'home-fragrance',
    title: 'Home Fragrance',
    family: 'Fragrance',
    eyebrow: 'Atmosphere Collection',
    description: 'Diffusers and room scent moments that bring calm, warmth, and a premium finish to the home.',
    longDescription: 'Home Fragrance uses a narrow focused listing to help shoppers move quickly through a smaller assortment without losing the Wansati editorial tone.',
    count: 2,
    heroImage: 'https://www.wansatibrands.co.za/wp-content/uploads/2023/09/Diffuser-1.jpg',
    relatedSlugs: ['fragrances', 'body-care'],
    featuredProductIds: ['tsonga-home-diffuser'],
  },
  {
    slug: 'facial-care',
    title: 'Facial Care',
    family: 'Body Care',
    eyebrow: 'Targeted Care',
    description: 'Focused skincare products for glow, hydration, and daily skin support.',
    longDescription: 'Facial Care is presented with direct product access and minimal decoration so shoppers can evaluate the products without unnecessary friction.',
    count: 8,
    heroImage: 'https://www.wansatibrands.co.za/wp-content/uploads/2023/12/759859884_max.jpeg',
    relatedSlugs: ['body-care', 'bathing', 'foot-care'],
    featuredProductIds: ['turmeric-serum'],
  },
  {
    slug: 'bathing',
    title: 'Bathing',
    family: 'Body Care',
    eyebrow: 'Daily Ritual',
    description: 'Body products made for soft, moisturising, feel-good rituals.',
    longDescription: 'Bathing uses a simple listing structure because the category intent is usually direct: shoppers want to browse products quickly and compare finish, format, and price.',
    count: 24,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?w=1181&ssl=1',
    relatedSlugs: ['body-care', 'facial-care'],
    featuredProductIds: ['golden-shea'],
  },
  {
    slug: 'foot-care',
    title: 'Foot Care',
    family: 'Body Care',
    eyebrow: 'Targeted Care',
    description: 'Treatment-led essentials for softer, smoother, more comfortable feet.',
    longDescription: 'Foot Care keeps the interface very lean, making the category feel considered even when the assortment is smaller than broader care collections.',
    count: 14,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?w=1181&ssl=1',
    relatedSlugs: ['body-care', 'facial-care'],
    featuredProductIds: ['golden-shea'],
  },
  {
    slug: 'boys',
    title: 'Boys',
    family: 'Kids',
    eyebrow: 'Kids Collection',
    description: 'Celebration and occasion-ready boyswear with comfort built in.',
    longDescription: 'Boys is styled as a simple child collection page, keeping the path to products direct while still giving enough context and imagery for browsing confidence.',
    count: 28,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?w=864&ssl=1',
    relatedSlugs: ['kids', 'girls'],
    featuredProductIds: ['kids-occasion-set'],
  },
  {
    slug: 'girls',
    title: 'Girls',
    family: 'Kids',
    eyebrow: 'Kids Collection',
    description: 'Special-occasion girlswear with expressive styling and event-ready finish.',
    longDescription: 'Girls balances a smaller product assortment with clear navigation back into the wider Kids collection and nearby categories.',
    count: 35,
    heroImage: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?w=864&ssl=1',
    relatedSlugs: ['kids', 'boys'],
    featuredProductIds: ['kids-occasion-set'],
  },
];

export const getCollectionBySlug = (slug: string) =>
  COLLECTION_DEFINITIONS.find((collection) => collection.slug === slug);

export const getProductsForCollection = (slug: string) =>
  COLLECTION_PRODUCTS.filter((product) => product.collectionSlugs.includes(slug));
