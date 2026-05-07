import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Heart,
  Instagram,
  Link2,
  MessageCircle,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  X,
} from 'lucide-react';
import payfastLogo from './assets/payment/payfast-logo.svg';
import amexLogo from './assets/payment/amex-logo.svg';
import yocoLogo from './assets/payment/yoco-logo.svg';
import yocoVisaLogo from './assets/payment/yoco-visa.svg';
import yocoMastercardLogo from './assets/payment/yoco-mastercard.svg';
import yocoMasterpassLogo from './assets/payment/yoco-masterpass.svg';

type ImageFit = 'cover' | 'contain';

type BreadcrumbItem = {
  label: string;
  href?: string;
  internalPath?: string;
};

type ProductGalleryImage = {
  src: string;
  alt: string;
  fit?: ImageFit;
};

type ProductAttributeValue = {
  value: string;
  label: string;
  swatch?: string;
};

type ProductAttribute = {
  id: string;
  label: string;
  display: 'pill' | 'swatch';
  required?: boolean;
  values: ProductAttributeValue[];
};

type ProductVariation = {
  id: string;
  options: Record<string, string>;
  price: number;
  salePrice?: number;
  sku?: string;
  inStock: boolean;
  stockLabel: string;
  imageIndex?: number;
};

type ProductReview = {
  id?: number;
  author: string;
  date: string;
  rating: number;
  title?: string;
  content: string;
  verified?: boolean;
};

type CatalogProduct = {
  slug: string;
  type: 'fashion' | 'fragrance' | 'body-care' | 'kidswear' | 'home-fragrance';
  title: string;
  badge?: string;
  breadcrumbs: BreadcrumbItem[];
  shortDescription: string;
  story: string[];
  highlights: string[];
  detailPairs: Array<{ label: string; value: string }>;
  gallery: ProductGalleryImage[];
  price: number;
  salePrice?: number;
  rating?: number;
  reviewCount?: number;
  reviews?: ProductReview[];
  sku?: string;
  categories: string[];
  tags?: string[];
  inStock: boolean;
  stockLabel: string;
  attributes?: ProductAttribute[];
  variations?: ProductVariation[];
  sizeGuide?: {
    headers: string[];
    rows: string[][];
  };
  ingredients?: string[];
  notes?: string[];
  deliveryReturns: string[];
  careInstructions?: string[];
  usageNotes?: string[];
  collectionInfo?: string;
  relatedSlugs: string[];
  shareLabel?: string;
};

type SingleProductPageProps = {
  currentPath: string;
  navigateTo: (path: string) => void;
  onAddToCart: (item: {
    id: string;
    title: string;
    priceLabel: string;
    image: string;
    unitPrice: number;
    imageFit?: ImageFit;
  }) => void;
  onAddToWishlist: (item: {
    id: string;
    title: string;
    priceLabel: string;
    numericPrice: number;
    image: string;
    imageFit?: ImageFit;
    path?: string;
  }) => void;
};

const PRODUCT_CATALOG: CatalogProduct[] = [
  {
    slug: 'wansati-signature-set',
    type: 'fashion',
    title: 'Wansati Signature Set',
    badge: 'New Arrival',
    breadcrumbs: [
      { label: 'Home', internalPath: '/' },
      { label: 'Women', href: 'https://www.wansatibrands.co.za/shop/fashion/women/' },
      { label: 'Dresses', href: 'https://www.wansatibrands.co.za/shop/fashion/dresses/' },
      { label: 'Wansati Signature Set' },
    ],
    shortDescription:
      'A statement two-piece set cut for special moments, with polished structure, soft movement, and the signature Wansati finish.',
    story: [
      'The Wansati Signature Set is designed for women who want occasion dressing to feel effortless. It pairs sculpted tailoring with an elegant drape so the look feels elevated from day events through to evening celebrations.',
      'Every detail is considered for shape, comfort, and presence. The silhouette is refined, the fabric has enough body to hold structure, and the styling works beautifully with both heels and statement flats.',
    ],
    highlights: [
      'Structured two-piece silhouette',
      'Soft lined interior for comfort',
      'Designed for occasion and elevated daywear',
      'Easy to style with metallic or neutral accessories',
    ],
    detailPairs: [
      { label: 'Material', value: 'Structured cotton blend with soft inner lining' },
      { label: 'Fit', value: 'Tailored fit with defined waist and easy movement through the skirt' },
      { label: 'Closure', value: 'Hidden back zip with neat internal finishing' },
      { label: 'Occasion', value: 'Events, celebrations, occasion dressing, polished daytime wear' },
    ],
    gallery: [
      {
        src: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/12/DSC_6043-1.jpg?fit=864%2C1080&ssl=1',
        alt: 'Wansati Signature Set front view in Marula Gold',
      },
      {
        src: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_6105.jpg?fit=864%2C1080&ssl=1',
        alt: 'Wansati Signature Set full look',
      },
      {
        src: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?w=864&ssl=1',
        alt: 'Wansati Signature Set in alternative colour',
      },
      {
        src: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?w=864&ssl=1',
        alt: 'Wansati Signature Set detail and drape',
      },
    ],
    price: 2199,
    salePrice: 1899,
    rating: 4.8,
    reviewCount: 12,
    reviews: [
      {
        author: 'Zanele M.',
        date: 'March 2026',
        rating: 5,
        content: 'The fit is beautiful and the set feels premium. It photographed so well for my event.',
      },
      {
        author: 'Lerato K.',
        date: 'February 2026',
        rating: 5,
        content: 'Loved the structure and the colour depth. The sizing guidance was accurate.',
      },
      {
        author: 'Refilwe T.',
        date: 'January 2026',
        rating: 4,
        content: 'Very elegant and comfortable. I would buy another variation in a second colour.',
      },
    ],
    sku: 'WB-WSS-01',
    categories: ['Women', 'Dresses'],
    tags: ['New Arrival', 'Occasion Wear', 'African Print'],
    inStock: true,
    stockLabel: 'Select your size and colour to confirm availability',
    attributes: [
      {
        id: 'size',
        label: 'Size',
        display: 'pill',
        required: true,
        values: [
          { value: 's', label: 'S' },
          { value: 'm', label: 'M' },
          { value: 'l', label: 'L' },
          { value: 'xl', label: 'XL' },
        ],
      },
      {
        id: 'colour',
        label: 'Colour',
        display: 'swatch',
        required: true,
        values: [
          { value: 'marula-gold', label: 'Marula Gold', swatch: '#c2a453' },
          { value: 'midnight-indigo', label: 'Midnight Indigo', swatch: '#283245' },
        ],
      },
    ],
    variations: [
      { id: 'wss-s-gold', options: { size: 's', colour: 'marula-gold' }, price: 2199, salePrice: 1899, sku: 'WB-WSS-MG-S', inStock: true, stockLabel: 'In stock', imageIndex: 0 },
      { id: 'wss-m-gold', options: { size: 'm', colour: 'marula-gold' }, price: 2199, salePrice: 1899, sku: 'WB-WSS-MG-M', inStock: true, stockLabel: 'In stock', imageIndex: 0 },
      { id: 'wss-l-gold', options: { size: 'l', colour: 'marula-gold' }, price: 2199, salePrice: 1899, sku: 'WB-WSS-MG-L', inStock: true, stockLabel: 'Low stock', imageIndex: 1 },
      { id: 'wss-xl-gold', options: { size: 'xl', colour: 'marula-gold' }, price: 2199, salePrice: 1899, sku: 'WB-WSS-MG-XL', inStock: false, stockLabel: 'Out of stock', imageIndex: 1 },
      { id: 'wss-s-indigo', options: { size: 's', colour: 'midnight-indigo' }, price: 2299, sku: 'WB-WSS-MI-S', inStock: true, stockLabel: 'In stock', imageIndex: 2 },
      { id: 'wss-m-indigo', options: { size: 'm', colour: 'midnight-indigo' }, price: 2299, sku: 'WB-WSS-MI-M', inStock: true, stockLabel: 'In stock', imageIndex: 2 },
      { id: 'wss-l-indigo', options: { size: 'l', colour: 'midnight-indigo' }, price: 2299, sku: 'WB-WSS-MI-L', inStock: true, stockLabel: 'Made to order: dispatch in 4 - 6 days', imageIndex: 3 },
      { id: 'wss-xl-indigo', options: { size: 'xl', colour: 'midnight-indigo' }, price: 2299, sku: 'WB-WSS-MI-XL', inStock: true, stockLabel: 'Low stock', imageIndex: 3 },
    ],
    sizeGuide: {
      headers: ['Size', 'Bust', 'Waist', 'Hips'],
      rows: [
        ['S', '88 cm', '70 cm', '96 cm'],
        ['M', '94 cm', '76 cm', '102 cm'],
        ['L', '100 cm', '82 cm', '108 cm'],
        ['XL', '108 cm', '90 cm', '116 cm'],
      ],
    },
    deliveryReturns: [
      'Nationwide delivery is available across South Africa.',
      'Shipping charges and applicable taxes are calculated at checkout.',
      'Orders are processed after payment confirmation.',
      'Returns and exchanges are handled in line with the Wansati Brands returns policy.',
    ],
    careInstructions: [
      'Cold hand wash or gentle machine wash.',
      'Do not tumble dry.',
      'Steam or cool iron on the reverse side.',
      'Store on a hanger to keep the silhouette crisp.',
    ],
    usageNotes: ['Style with sculptural earrings, a metallic heel, or a neutral sandal for a polished finish.'],
    collectionInfo: 'Store collection from Johannesburg can be arranged after order confirmation.',
    relatedSlugs: ['melania-dress', 'amogelang-mens-shirt', 'tsonga-home-diffuser', 'oud-fleur-inspired'],
  },
  {
    slug: 'melania-dress',
    type: 'fashion',
    title: 'Rhulani Dress',
    badge: 'Exclusive Range',
    breadcrumbs: [
      { label: 'Home', internalPath: '/' },
      { label: 'Women', href: 'https://www.wansatibrands.co.za/shop/fashion/women/' },
      { label: 'Dresses', href: 'https://www.wansatibrands.co.za/shop/fashion/dresses/' },
      { label: 'Rhulani Dress' },
    ],
    shortDescription: 'The Rhulani Dress is a two-tone gown in vibrant pink and aqua duchess satin, detailed with fringe accents. Elegant, bold, and designed for special occasions.',
    story: [
      'Embrace your confidence with the Rhulani Dress, a standout piece from Wansati Brands’ Exclusive Collection.',
      'Designed from premium duchess satin, this gown pairs a vibrant pink top with an aqua skirt and delicate fringe accents for movement and flair.',
      'Its loose, flowing silhouette with wide sleeves and a V-neckline blends comfort and sophistication for weddings, galas, cultural celebrations, and evening events.',
      'Locally made in South Africa with attention to quality, the Rhulani Dress is crafted for durability, comfort, and confident occasion dressing.',
    ],
    highlights: [
      'Premium duchess satin fabric',
      'Two-tone pink and aqua color design',
      'Fringe detailing on hem and sleeves',
      'Loose, flowing fit with wide sleeves',
      'Ethically made in South Africa',
    ],
    detailPairs: [
      { label: 'Design & Fabric', value: 'A two-tone design featuring a rich pink satin top and aqua satin skirt, accented with delicate fringe trims for movement and flair.' },
      { label: 'Fit & Style', value: 'Loose, flowing silhouette with wide sleeves and a V-neckline, blending comfort and sophistication.' },
      { label: 'Occasions', value: 'Perfect for weddings, galas, cultural celebrations, and evening events where you want to stand out.' },
      { label: 'Craftsmanship', value: 'Locally made in South Africa with attention to quality, ensuring durability and comfort in every wear.' },
    ],
    gallery: [
      {
        src: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/12/DSC_6043-1.jpg?fit=864%2C1080&ssl=1',
        alt: 'Rhulani Dress product image',
      },
    ],
    price: 1850,
    rating: 4.7,
    reviewCount: 3,
    reviews: [
      {
        author: 'Nokuthula S.',
        date: 'April 2026',
        rating: 5,
        title: 'Beautiful for special occasions',
        content: 'The colours are even more striking in person and the dress moves beautifully. I wore it to a wedding and felt elegant the whole day.',
      },
      {
        author: 'Boitumelo K.',
        date: 'March 2026',
        rating: 4,
        title: 'Statement piece',
        content: 'The fit is loose and comfortable, and the satin gives it a very polished finish. I would absolutely wear it again for an evening event.',
      },
      {
        author: 'Refilwe M.',
        date: 'February 2026',
        rating: 5,
        title: 'Confident and feminine',
        content: 'I love the fringe detailing and how premium the fabric feels. It is bold without being too much.',
      },
    ],
    sku: 'WB-RHU-01',
    categories: ['Women', 'Dresses', 'Exclusive Range'],
    tags: ['Exclusive Range', 'Occasion Wear', 'Duchess Satin'],
    inStock: true,
    stockLabel: 'Select your size to confirm availability',
    attributes: [
      {
        id: 'size',
        label: 'Size',
        display: 'pill',
        required: true,
        values: [
          { value: 'xs', label: 'XS' },
          { value: 's', label: 'S' },
          { value: 'm', label: 'M' },
          { value: 'l', label: 'L' },
          { value: 'xl', label: 'XL' },
          { value: 'xxl', label: 'XXL' },
          { value: '3xl', label: '3XL' },
        ],
      },
    ],
    variations: [
      { id: 'rhulani-xs', options: { size: 'xs' }, price: 1850, inStock: true, stockLabel: 'In stock', sku: 'WB-RHU-XS', imageIndex: 0 },
      { id: 'rhulani-s', options: { size: 's' }, price: 1850, inStock: true, stockLabel: 'In stock', sku: 'WB-RHU-S', imageIndex: 0 },
      { id: 'rhulani-m', options: { size: 'm' }, price: 1850, inStock: true, stockLabel: 'In stock', sku: 'WB-RHU-M', imageIndex: 0 },
      { id: 'rhulani-l', options: { size: 'l' }, price: 1850, inStock: true, stockLabel: 'Low stock', sku: 'WB-RHU-L', imageIndex: 0 },
      { id: 'rhulani-xl', options: { size: 'xl' }, price: 1850, inStock: true, stockLabel: 'In stock', sku: 'WB-RHU-XL', imageIndex: 0 },
      { id: 'rhulani-xxl', options: { size: 'xxl' }, price: 1850, inStock: true, stockLabel: 'In stock', sku: 'WB-RHU-XXL', imageIndex: 0 },
      { id: 'rhulani-3xl', options: { size: '3xl' }, price: 1850, inStock: true, stockLabel: 'Made to order: dispatch in 4 - 6 days', sku: 'WB-RHU-3XL', imageIndex: 0 },
    ],
    deliveryReturns: [
      'Nationwide delivery available across South Africa.',
      'Shipping charges and applicable taxes are calculated at checkout.',
      'Return requests are handled according to the Wansati Brands returns policy.',
    ],
    careInstructions: ['Hand wash or dry clean.', 'Hang to dry.', 'Store on a hanger to preserve shape.'],
    collectionInfo: 'Store collection is available by prior arrangement.',
    relatedSlugs: ['wansati-signature-set', 'kids-occasion-set', 'oud-fleur-inspired'],
  },
  {
    slug: 'oud-fleur-inspired',
    type: 'fragrance',
    title: 'Inspired by Oud Fleur - Tom Ford',
    badge: 'Sale',
    breadcrumbs: [
      { label: 'Home', internalPath: '/' },
      { label: 'Fragrance', href: 'https://www.wansatibrands.co.za/shop/fragrances/' },
      { label: 'Unisex', href: 'https://www.wansatibrands.co.za/shop/fragrances/unisex/' },
      { label: 'Inspired by Oud Fleur - Tom Ford' },
    ],
    shortDescription: 'Oud Fleur by Tom Ford is a woody chypre fragrance for women and men.',
    story: [
      'Oud Fleur by Tom Ford is a woody chypre fragrance for women and men.',
      'This inspired fragrance is available in two easy size options, making it simple to choose the right bottle for everyday wear or gifting.',
    ],
    highlights: ['Woody chypre fragrance profile', 'Unisex wear', 'Available in 30 ml and 50 ml', 'Sale pricing on selected sizes'],
    detailPairs: [
      { label: 'Fragrance Family', value: 'Woody chypre' },
      { label: 'Wear', value: 'Designed for women and men' },
      { label: 'Size Options', value: '30 ml and 50 ml' },
      { label: 'Format', value: 'Inspired fragrance' },
    ],
    gallery: [
      {
        src: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-Oud-Fleur-Photoroom.png?fit=800%2C800&ssl=1',
        alt: 'Inspired by Oud Fleur fragrance bottle',
        fit: 'contain',
      },
    ],
    price: 200,
    salePrice: 150,
    rating: 4.5,
    reviewCount: 2,
    reviews: [
      {
        author: 'Lethabo P.',
        date: 'April 2026',
        rating: 5,
        title: 'Warm and sophisticated',
        content: 'This has a rich scent profile and lasts well on my skin. It feels like an easy evening fragrance.',
      },
      {
        author: 'Ayanda T.',
        date: 'March 2026',
        rating: 4,
        title: 'Great unisex option',
        content: 'Balanced and smooth with a woody finish. I like that it still feels soft and wearable during the day.',
      },
    ],
    sku: 'WB-OF-01',
    categories: ['Fragrance', 'Unisex'],
    tags: ['Fragrance', 'Unisex', 'Woody Chypre'],
    inStock: true,
    stockLabel: 'Select your size to confirm availability',
    attributes: [
      {
        id: 'size',
        label: 'Size',
        display: 'pill',
        required: true,
        values: [
          { value: '30ml', label: '30 ml' },
          { value: '50ml', label: '50 ml' },
        ],
      },
    ],
    variations: [
      { id: 'of-30', options: { size: '30ml' }, price: 200, salePrice: 150, sku: 'WB-OF-30', inStock: true, stockLabel: 'In stock', imageIndex: 0 },
      { id: 'of-50', options: { size: '50ml' }, price: 250, salePrice: 200, sku: 'WB-OF-50', inStock: true, stockLabel: 'In stock', imageIndex: 0 },
    ],
    deliveryReturns: [
      'Nationwide delivery available across South Africa.',
      'Shipping charges and applicable taxes are calculated at checkout.',
      'For hygiene reasons, returns are reviewed in line with product condition and store policy.',
    ],
    usageNotes: ['Apply to pulse points and layer with unscented body products for longer wear.'],
    relatedSlugs: ['golden-shea-body-butter', 'tsonga-home-diffuser', 'wansati-signature-set'],
  },
  {
    slug: 'golden-shea-body-butter',
    type: 'body-care',
    title: 'Golden Shea Body Butter',
    breadcrumbs: [
      { label: 'Home', internalPath: '/' },
      { label: 'Body Care', href: 'https://www.wansatibrands.co.za/product-category/body-care/' },
      { label: 'Golden Shea Body Butter' },
    ],
    shortDescription: 'A rich everyday body butter made to soften, nourish, and leave the skin comforted without feeling greasy.',
    story: [
      'Golden Shea Body Butter is designed as a daily ritual product. It seals in moisture and leaves the skin with a soft, healthy finish.',
      'The texture melts into the skin, making it ideal for dry areas, colder weather, and a richer nighttime body routine.',
    ],
    highlights: ['Rich moisture support', 'Soft finish on skin', 'Suitable for daily use', 'Pairs well with fragrance layering'],
    detailPairs: [
      { label: 'Texture', value: 'Rich whipped butter' },
      { label: 'Use', value: 'Daily body moisture ritual' },
      { label: 'Best For', value: 'Dry skin and evening moisture routines' },
      { label: 'Finish', value: 'Soft, nourished, lightly conditioned' },
    ],
    gallery: [
      {
        src: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?w=1181&ssl=1',
        alt: 'Golden Shea Body Butter product image',
      },
    ],
    price: 280,
    categories: ['Body Care'],
    tags: ['Moisture', 'Body Ritual'],
    inStock: true,
    stockLabel: 'In stock',
    ingredients: ['Shea butter', 'Cocoa butter', 'Sweet almond oil', 'Vitamin E', 'Fragrance'],
    deliveryReturns: [
      'Nationwide delivery is available across South Africa.',
      'Shipping charges and applicable taxes are calculated at checkout.',
      'Unopened body care products are handled according to the Wansati Brands returns policy.',
    ],
    usageNotes: ['Massage onto damp skin after bathing for the best moisture retention.'],
    relatedSlugs: ['oud-fleur-inspired', 'tsonga-home-diffuser', 'wansati-signature-set'],
  },
  {
    slug: 'kids-occasion-set',
    type: 'kidswear',
    title: 'Kids Occasion Set',
    breadcrumbs: [
      { label: 'Home', internalPath: '/' },
      { label: 'Kids', href: 'https://www.wansatibrands.co.za/product-category/kids/' },
      { label: 'Kids Occasion Set' },
    ],
    shortDescription: 'A polished kidswear set designed for celebrations, family photos, and special days out.',
    story: [
      'Kids Occasion Set brings the same Wansati attention to colour and finish into childrenswear.',
      'It balances a dressed-up look with comfortable wear, so little ones can move freely while still looking event ready.',
    ],
    highlights: ['Celebration-ready styling', 'Comfortable kidswear fit', 'Coordinated set', 'Easy for family occasion dressing'],
    detailPairs: [
      { label: 'Set Includes', value: 'Top and coordinating bottom' },
      { label: 'Fit', value: 'Comfort-led fit for movement and play' },
      { label: 'Age Range', value: 'Available in selected kids sizes' },
      { label: 'Occasion', value: 'Birthdays, celebrations, family gatherings' },
    ],
    gallery: [
      {
        src: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?w=864&ssl=1',
        alt: 'Kids Occasion Set product image',
      },
    ],
    price: 890,
    rating: 4.6,
    reviewCount: 3,
    reviews: [{ author: 'Tshegofatso R.', date: 'March 2026', rating: 5, content: 'Comfortable and beautiful for a family function.' }],
    categories: ['Kids'],
    tags: ['Celebration Wear', 'Kidswear'],
    inStock: true,
    stockLabel: 'Select size to confirm availability',
    attributes: [
      {
        id: 'size',
        label: 'Size',
        display: 'pill',
        required: true,
        values: [
          { value: '3-4', label: '3 - 4 yrs' },
          { value: '5-6', label: '5 - 6 yrs' },
          { value: '7-8', label: '7 - 8 yrs' },
        ],
      },
    ],
    variations: [
      { id: 'kids-34', options: { size: '3-4' }, price: 890, inStock: true, stockLabel: 'In stock', sku: 'WB-KOS-34', imageIndex: 0 },
      { id: 'kids-56', options: { size: '5-6' }, price: 890, inStock: true, stockLabel: 'In stock', sku: 'WB-KOS-56', imageIndex: 0 },
      { id: 'kids-78', options: { size: '7-8' }, price: 890, inStock: false, stockLabel: 'Out of stock', sku: 'WB-KOS-78', imageIndex: 0 },
    ],
    sizeGuide: {
      headers: ['Size', 'Chest', 'Waist', 'Height'],
      rows: [
        ['3 - 4 yrs', '58 cm', '55 cm', '104 cm'],
        ['5 - 6 yrs', '62 cm', '58 cm', '116 cm'],
        ['7 - 8 yrs', '66 cm', '60 cm', '128 cm'],
      ],
    },
    deliveryReturns: [
      'Nationwide delivery is available across South Africa.',
      'Shipping charges and applicable taxes are calculated at checkout.',
      'Returns are handled according to the Wansati Brands returns policy.',
    ],
    careInstructions: ['Cold wash only.', 'Wash with similar colours.', 'Warm iron inside out if needed.'],
    relatedSlugs: ['melania-dress', 'wansati-signature-set', 'amogelang-mens-shirt'],
  },
  {
    slug: 'tsonga-home-diffuser',
    type: 'home-fragrance',
    title: 'Tsonga Home Diffuser',
    breadcrumbs: [
      { label: 'Home', internalPath: '/' },
      { label: 'Home Fragrance', href: 'https://www.wansatibrands.co.za/shop/fragrances/home/' },
      { label: 'Tsonga Home Diffuser' },
    ],
    shortDescription: 'A soft atmospheric diffuser for calm, layered home scent and a refined finishing touch to your space.',
    story: [
      'Tsonga Home Diffuser is created for customers who want their home to feel considered, warm, and quietly luxurious.',
      'The fragrance profile is smooth and welcoming, ideal for lounges, bedrooms, and gifting.',
    ],
    highlights: ['Soft home atmosphere', 'Elegant gifting option', 'Designed for bedrooms and living spaces', 'Refined reed diffuser finish'],
    detailPairs: [
      { label: 'Format', value: 'Reed diffuser' },
      { label: 'Use', value: 'Home fragrance for lounge, bedroom, or office' },
      { label: 'Mood', value: 'Soft, warm, calm' },
      { label: 'Giftability', value: 'Ideal for housewarming and hostess gifts' },
    ],
    gallery: [
      {
        src: 'https://www.wansatibrands.co.za/wp-content/uploads/2023/09/Diffuser-1.jpg',
        alt: 'Tsonga Home Diffuser product image',
      },
    ],
    price: 420,
    categories: ['Home Fragrance'],
    tags: ['Home', 'Diffuser', 'Gift'],
    inStock: false,
    stockLabel: 'Out of stock',
    notes: ['Warm woods', 'Soft floral touch', 'Clean ambient finish'],
    deliveryReturns: [
      'Nationwide delivery is available across South Africa.',
      'Shipping charges and applicable taxes are calculated at checkout.',
      'Returns are reviewed according to the Wansati Brands returns policy.',
    ],
    relatedSlugs: ['oud-fleur-inspired', 'golden-shea-body-butter', 'wansati-signature-set'],
  },
  {
    slug: 'amogelang-mens-shirt',
    type: 'fashion',
    title: "Amogelang Men's Shirt",
    breadcrumbs: [
      { label: 'Home', internalPath: '/' },
      { label: 'Men', href: 'https://www.wansatibrands.co.za/shop/fashion/men/' },
      { label: 'African Print', href: 'https://www.wansatibrands.co.za/shop/fashion/african-print/' },
      { label: "Amogelang Men's Shirt" },
    ],
    shortDescription: 'The Amogelang Men’s Shirt is a modern African-inspired cotton shirt featuring refined stitched detailing. Designed for comfort and effortless style, it’s ideal for smart-casual and special occasions.',
    story: [
      'The Amogelang Men’s Shirt is crafted from 100% premium cotton, offering breathability, durability, and all-day comfort.',
      'This short-sleeve shirt features a structured collar with a clean zip-front finish, enhanced by elegant African-inspired stitched detailing on the chest for a contemporary heritage look.',
      'Its tailored yet comfortable regular fit makes it suitable for church, cultural events, business-casual settings, family gatherings, and celebrations.',
      'Designed for the modern man who values style, identity, and comfort, the Amogelang shirt pairs effortlessly with trousers, chinos, or jeans.',
    ],
    highlights: [
      'Made from 100% high-quality cotton',
      'Soft, breathable, and comfortable fabric',
      'Short sleeves for versatile wear',
      'Structured collar with zip-front detail',
      'African-inspired stitched design',
      'Regular fit for ease of movement',
      'Durable construction for long-lasting use',
      'Suitable for smart-casual, cultural, and formal occasions',
    ],
    detailPairs: [
      { label: 'Material', value: '100% premium cotton' },
      { label: 'Design', value: 'Short-sleeve shirt with a structured collar, a clean zip-front finish, and African-inspired stitched chest detailing.' },
      { label: 'Fit', value: 'Tailored yet comfortable regular fit for everyday movement and polished styling.' },
      { label: 'Occasions', value: 'Ideal for church, cultural events, business-casual settings, family gatherings, and celebrations.' },
    ],
    gallery: [
      {
        src: 'https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5751.jpg',
        alt: "Amogelang Men's Shirt front view",
      },
      {
        src: 'https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-2.jpg',
        alt: "Amogelang Men's Shirt styled detail",
      },
    ],
    price: 650,
    rating: 4.7,
    reviewCount: 3,
    reviews: [
      {
        author: 'Kagiso N.',
        date: 'April 2026',
        rating: 5,
        title: 'Clean finish and great fit',
        content: 'The stitching detail gives it character without making it too loud. It looks sharp with chinos and feels comfortable all day.',
      },
      {
        author: 'Sibusiso M.',
        date: 'March 2026',
        rating: 4,
        title: 'Easy to dress up',
        content: 'I bought it for a family event and ended up wearing it again for work. The fabric feels breathable and the zip-front detail is neat.',
      },
      {
        author: 'Thabo R.',
        date: 'February 2026',
        rating: 5,
        title: 'Strong quality',
        content: 'Very good cotton quality and the fit sits well through the shoulders. It has that polished look without feeling stiff.',
      },
    ],
    categories: ['Men', 'African Print'],
    tags: ['Menswear', 'African Print', 'Cotton Shirt'],
    inStock: true,
    stockLabel: 'Select your size to confirm availability',
    attributes: [
      {
        id: 'size',
        label: 'Size',
        display: 'pill',
        required: true,
        values: [
          { value: 's', label: 'S' },
          { value: 'm', label: 'M' },
          { value: 'l', label: 'L' },
          { value: 'xl', label: 'XL' },
          { value: '2xl', label: '2XL' },
          { value: '3xl', label: '3XL' },
          { value: '4xl', label: '4XL' },
        ],
      },
    ],
    variations: [
      { id: 'amog-s', options: { size: 's' }, price: 650, inStock: true, stockLabel: 'In stock', sku: 'WB-AMG-S', imageIndex: 0 },
      { id: 'amog-m', options: { size: 'm' }, price: 650, inStock: true, stockLabel: 'In stock', sku: 'WB-AMG-M', imageIndex: 0 },
      { id: 'amog-l', options: { size: 'l' }, price: 650, inStock: true, stockLabel: 'In stock', sku: 'WB-AMG-L', imageIndex: 1 },
      { id: 'amog-xl', options: { size: 'xl' }, price: 650, inStock: true, stockLabel: 'Low stock', sku: 'WB-AMG-XL', imageIndex: 1 },
      { id: 'amog-2xl', options: { size: '2xl' }, price: 650, inStock: true, stockLabel: 'In stock', sku: 'WB-AMG-2XL', imageIndex: 1 },
      { id: 'amog-3xl', options: { size: '3xl' }, price: 650, inStock: true, stockLabel: 'In stock', sku: 'WB-AMG-3XL', imageIndex: 1 },
      { id: 'amog-4xl', options: { size: '4xl' }, price: 650, inStock: true, stockLabel: 'Low stock', sku: 'WB-AMG-4XL', imageIndex: 1 },
    ],
    deliveryReturns: [
      'Nationwide delivery is available across South Africa.',
      'Shipping charges and applicable taxes are calculated at checkout.',
      'Returns are handled according to the Wansati Brands returns policy.',
    ],
    careInstructions: [
      'Machine wash cold (30°C).',
      'Wash with similar colours.',
      'Do not bleach.',
      'Iron on medium heat.',
      'Do not tumble dry.',
      'Hang or dry flat to maintain shape and detailing.',
    ],
    relatedSlugs: ['wansati-signature-set', 'melania-dress', 'kids-occasion-set'],
  },
];

const RECENTLY_VIEWED_KEY = 'wansati_recently_viewed_products';
const YOCO_ACCEPTED_CARDS = [
  { name: 'Visa', logo: yocoVisaLogo, className: 'h-4' },
  { name: 'Mastercard', logo: yocoMastercardLogo, className: 'h-4' },
  { name: 'MasterPass', logo: yocoMasterpassLogo, className: 'h-4' },
  { name: 'American Express', logo: amexLogo, className: 'h-4' },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.54 2 2.07 6.42 2.07 11.87c0 1.74.46 3.45 1.33 4.95L2 22l5.35-1.4a10.07 10.07 0 0 0 4.69 1.19h.01c5.49 0 9.96-4.43 9.97-9.88A9.83 9.83 0 0 0 19.11 4.94 9.92 9.92 0 0 0 12.04 2Zm0 18.13h-.01a8.42 8.42 0 0 1-4.27-1.17l-.31-.18-3.18.83.85-3.1-.2-.32a8.2 8.2 0 0 1-1.28-4.33c0-4.54 3.74-8.23 8.34-8.23 2.23 0 4.32.86 5.89 2.42a8.1 8.1 0 0 1 2.44 5.79c0 4.54-3.74 8.24-8.27 8.24Zm4.52-6.14c-.25-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.57.12-.17.24-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.15-.24-.02-.38.11-.51.12-.12.25-.29.38-.43.13-.14.17-.24.25-.4.08-.16.04-.31-.02-.43-.06-.12-.57-1.37-.78-1.88-.21-.49-.42-.43-.57-.44h-.48c-.17 0-.44.06-.67.31-.23.24-.88.86-.88 2.09 0 1.23.9 2.43 1.02 2.6.13.16 1.77 2.71 4.29 3.8.6.26 1.07.41 1.43.53.6.19 1.14.16 1.57.1.48-.07 1.48-.61 1.69-1.2.21-.58.21-1.08.15-1.19-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

const formatRand = (amount: number) => `R${amount.toLocaleString('en-ZA', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`;

const productPath = (slug: string) => `/product/${slug}`;

function ProductCard({
  product,
  navigateTo,
  onAddToWishlist,
}: {
  product: CatalogProduct;
  navigateTo: (path: string) => void;
  onAddToWishlist: (item: {
    id: string;
    title: string;
    priceLabel: string;
    numericPrice: number;
    image: string;
    imageFit?: ImageFit;
    path?: string;
  }) => void;
}) {
  const showSale = typeof product.salePrice === 'number' && product.salePrice < product.price;
  const resolvedPrice = product.salePrice ?? product.price;

  return (
    <div className="group flex h-full flex-col">
      <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-stone-100">
        {showSale ? (
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
          onClick={() => navigateTo(productPath(product.slug))}
          className="absolute inset-0"
          aria-label={`View ${product.title}`}
        />
        <img
          src={product.gallery[0]?.src}
          alt={product.gallery[0]?.alt ?? product.title}
          className={`absolute inset-0 h-full w-full ${
            product.gallery[0]?.fit === 'contain' ? 'object-contain p-4' : 'object-cover object-center'
          } transition-transform duration-700 group-hover:scale-105 ${!product.inStock ? 'grayscale opacity-50' : ''}`}
          referrerPolicy="no-referrer"
        />
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onAddToWishlist({
              id: product.slug,
              title: product.title,
              priceLabel: formatRand(resolvedPrice),
              numericPrice: resolvedPrice,
              image: product.gallery[0]?.src ?? '',
              imageFit: product.gallery[0]?.fit,
              path: productPath(product.slug),
            });
          }}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/95 text-stone-400 opacity-0 shadow-sm ring-1 ring-stone-200/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:text-red-500 group-hover:translate-y-0 group-hover:opacity-100"
          aria-label={`Add ${product.title} to wishlist`}
        >
          <Heart className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex flex-grow flex-col">
        <h4 className="mb-1 line-clamp-1 text-sm font-medium text-stone-800">{product.title}</h4>
        <div className="mb-3 flex items-center gap-2">
          <p className="text-sm font-semibold text-stone-500">{formatRand(resolvedPrice)}</p>
          {showSale ? (
            <span className="text-xs text-stone-400 line-through">{formatRand(product.price)}</span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => navigateTo(productPath(product.slug))}
          className="mt-auto btn-gold-textured w-full py-2.5 text-[10px] font-bold uppercase tracking-widest"
        >
          <span className="flex items-center justify-center gap-2">
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>{product.inStock ? 'Select Options' : 'View Options'}</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default function SingleProductPage({
  currentPath,
  navigateTo,
  onAddToCart,
  onAddToWishlist,
}: SingleProductPageProps) {
  const slugFromPath = currentPath.startsWith('/product/')
    ? currentPath.replace('/product/', '').split('/')[0]
    : '';
  const currentProduct = PRODUCT_CATALOG.find((product) => product.slug === slugFromPath) ?? PRODUCT_CATALOG[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [activeSectionId, setActiveSectionId] = useState('description');
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [recentlyViewedSlugs, setRecentlyViewedSlugs] = useState<string[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>(currentProduct.reviews ?? []);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    author: '',
    title: '',
    content: '',
  });

  const detailSections = useMemo(() => {
    const sections: Array<{ id: string; title: string; content: React.ReactNode }> = [
      {
        id: 'description',
        title: 'Description',
        content: (
          <div className="space-y-4 text-sm leading-relaxed text-stone-600">
            {currentProduct.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ),
      },
      {
        id: 'details',
        title: 'Product Details',
        content: (
          <dl className="grid gap-4 sm:grid-cols-2">
            {currentProduct.detailPairs.map((item) => (
              <div key={item.label} className="border border-stone-200 bg-white px-4 py-3">
                <dt className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">{item.label}</dt>
                <dd className="text-sm leading-relaxed text-stone-700">{item.value}</dd>
              </div>
            ))}
          </dl>
        ),
      },
    ];

    if (currentProduct.sizeGuide) {
      sections.push({
        id: 'size-guide',
        title: 'Size Guide',
        content: (
          <div className="overflow-hidden border border-stone-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-stone-50 text-stone-500">
                  <tr>
                    {currentProduct.sizeGuide.headers.map((header) => (
                      <th key={header} className="px-4 py-3 font-medium">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentProduct.sizeGuide.rows.map((row) => (
                    <tr key={row.join('-')} className="border-t border-stone-100">
                      {row.map((cell) => (
                        <td key={cell} className="px-4 py-3 text-stone-700">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ),
      });
    }

    if (currentProduct.ingredients?.length || currentProduct.notes?.length) {
      sections.push({
        id: 'ingredients-notes',
        title: currentProduct.type === 'fragrance' ? 'Ingredients / Notes' : 'Ingredients',
        content: (
          <div className="grid gap-4 sm:grid-cols-2">
            {currentProduct.ingredients?.length ? (
              <div className="border border-stone-200 bg-white px-4 py-4">
                <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">Ingredients</h4>
                <ul className="space-y-2 text-sm text-stone-700">
                  {currentProduct.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {currentProduct.notes?.length ? (
              <div className="border border-stone-200 bg-white px-4 py-4">
                <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">Notes</h4>
                <ul className="space-y-2 text-sm text-stone-700">
                  {currentProduct.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ),
      });
    }

    sections.push({
      id: 'delivery-returns',
      title: 'Delivery & Returns',
      content: (
        <ul className="space-y-3 text-sm leading-relaxed text-stone-600">
          {currentProduct.deliveryReturns.map((item) => (
            <li key={item} className="flex gap-3">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#8b765e]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    });

    if (currentProduct.careInstructions?.length) {
      sections.push({
        id: 'care-instructions',
        title: 'Care Instructions',
        content: (
          <ul className="space-y-3 text-sm leading-relaxed text-stone-600">
            {currentProduct.careInstructions.map((item) => (
              <li key={item} className="flex gap-3">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#8b765e]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ),
      });
    }

    sections.push({
      id: 'reviews',
      title: `Reviews${currentProduct.reviewCount ? ` (${currentProduct.reviewCount})` : ''}`,
      content: currentProduct.reviews?.length ? (
        <div className="space-y-4">
          {currentProduct.reviews.map((review) => (
            <div key={`${review.author}-${review.date}`} className="border border-stone-200 bg-white px-4 py-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-stone-900">{review.author}</p>
                  <p className="text-xs text-stone-400">{review.date}</p>
                </div>
                <div className="flex items-center gap-1 text-[#c2a453]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className={`h-4 w-4 ${index < review.rating ? 'fill-current' : ''}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-stone-600">{review.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-stone-200 bg-white px-4 py-5 text-sm text-stone-500">
          No reviews yet. Be the first to share your experience with this product.
        </div>
      ),
    });

    return sections;
  }, [currentProduct]);
  const accordionSections = useMemo(
    () => detailSections.filter((section) => section.id !== 'reviews'),
    [detailSections],
  );

  useEffect(() => {
    setActiveImageIndex(0);
    setIsLightboxOpen(false);
    setQuantity(1);
    setSelectedOptions({});
    setFeedbackMessage(null);
    setCopyState('idle');
    setActiveSectionId(accordionSections[0]?.id ?? 'description');
    setReviews(currentProduct.reviews ?? []);
    setIsWritingReview(false);
    setIsAdding(false);
    setNewReview({ rating: 5, author: '', title: '', content: '' });
  }, [accordionSections, currentProduct.reviews, currentProduct.slug]);

  useEffect(() => {
    const stored = typeof window !== 'undefined'
      ? JSON.parse(window.localStorage.getItem(RECENTLY_VIEWED_KEY) ?? '[]')
      : [];
    const next = [currentProduct.slug, ...stored.filter((slug: string) => slug !== currentProduct.slug)].slice(0, 6);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
    }
    setRecentlyViewedSlugs(next);
  }, [currentProduct.slug]);

  const isVariableProduct = Boolean(currentProduct.attributes?.length && currentProduct.variations?.length);
  const requiredAttributes = currentProduct.attributes?.filter((attribute) => attribute.required !== false) ?? [];
  const hasSelectedAllRequired = requiredAttributes.every((attribute) => selectedOptions[attribute.id]);
  const selectedVariation = useMemo(() => {
    if (!isVariableProduct || !hasSelectedAllRequired) return undefined;

    return currentProduct.variations?.find((variation) =>
      requiredAttributes.every((attribute) => variation.options[attribute.id] === selectedOptions[attribute.id]),
    );
  }, [currentProduct.variations, hasSelectedAllRequired, isVariableProduct, requiredAttributes, selectedOptions]);

  useEffect(() => {
    if (typeof selectedVariation?.imageIndex === 'number') {
      setActiveImageIndex(selectedVariation.imageIndex);
    }
  }, [selectedVariation?.id]);

  const resolvedPrice = selectedVariation?.salePrice ?? selectedVariation?.price ?? currentProduct.salePrice ?? currentProduct.price;
  const compareAtPrice = selectedVariation?.salePrice
    ? selectedVariation.price
    : currentProduct.salePrice
      ? currentProduct.price
      : undefined;
  const resolvedInStock = selectedVariation ? selectedVariation.inStock : currentProduct.inStock;
  const resolvedStockLabel = selectedVariation?.stockLabel ?? currentProduct.stockLabel;
  const resolvedSku = selectedVariation?.sku ?? currentProduct.sku;
  const galleryBaseImage = currentProduct.gallery[0] ?? {
    src: '',
    alt: currentProduct.title,
    fit: 'cover' as ImageFit,
  };
  const displayGallery = useMemo(
    () => Array.from({ length: 4 }, (_, index) => ({
      ...galleryBaseImage,
      alt: `${currentProduct.title} view ${index + 1}`,
    })),
    [currentProduct.title, galleryBaseImage],
  );
  const currentImage = displayGallery[activeImageIndex] ?? displayGallery[0];
  const productUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${productPath(currentProduct.slug)}`
    : productPath(currentProduct.slug);
  const whatsAppShareUrl = `https://wa.me/?text=${encodeURIComponent(`${currentProduct.title} ${productUrl}`)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;

  const selectionPrompt = useMemo(() => {
    if (!isVariableProduct) return null;
    if (!hasSelectedAllRequired) {
      const missing = requiredAttributes
        .filter((attribute) => !selectedOptions[attribute.id])
        .map((attribute) => attribute.label.toLowerCase());
      return `Select ${missing.join(' and ')} to continue.`;
    }
    if (!selectedVariation) {
      return 'This combination is currently unavailable.';
    }
    if (!selectedVariation.inStock) {
      return 'The selected variation is currently out of stock.';
    }
    return null;
  }, [hasSelectedAllRequired, isVariableProduct, requiredAttributes, selectedOptions, selectedVariation]);
  const canPurchase = resolvedInStock && (!isVariableProduct || (hasSelectedAllRequired && Boolean(selectedVariation)));

  const relatedProducts = useMemo(() => {
    const explicit = currentProduct.relatedSlugs
      .map((slug) => PRODUCT_CATALOG.find((product) => product.slug === slug))
      .filter(Boolean) as CatalogProduct[];

    if (explicit.length >= 4) return explicit.slice(0, 4);

    const supplemental = PRODUCT_CATALOG.filter((product) =>
      product.slug !== currentProduct.slug &&
      currentProduct.categories.some((category) => product.categories.includes(category)) &&
      !explicit.some((item) => item.slug === product.slug),
    );

    return [...explicit, ...supplemental].slice(0, 4);
  }, [currentProduct]);

  const recentlyViewedProducts = useMemo(() => {
    const baseProducts = recentlyViewedSlugs
      .filter((slug) => slug !== currentProduct.slug)
      .map((slug) => PRODUCT_CATALOG.find((product) => product.slug === slug))
      .filter(Boolean) as CatalogProduct[];

    const soldOutProduct = PRODUCT_CATALOG.find((product) => product.slug === 'tsonga-home-diffuser');

    if (!baseProducts.length || !soldOutProduct || soldOutProduct.slug === currentProduct.slug) {
      return baseProducts;
    }

    if (baseProducts.some((product) => !product.inStock)) {
      return baseProducts;
    }

    return [...baseProducts.filter((product) => product.slug !== soldOutProduct.slug), soldOutProduct];
  }, [currentProduct.slug, recentlyViewedSlugs]);
  const averageRating = reviews.length > 0
    ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: currentProduct.title,
    image: galleryBaseImage.src ? [galleryBaseImage.src] : [],
    description: currentProduct.shortDescription,
    sku: resolvedSku,
    brand: {
      '@type': 'Brand',
      name: 'Wansati Brands',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ZAR',
      price: resolvedPrice,
      availability: resolvedInStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: productUrl,
    },
    ...(currentProduct.rating && currentProduct.reviewCount
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: currentProduct.rating,
            reviewCount: currentProduct.reviewCount,
          },
        }
      : {}),
  }), [currentProduct, galleryBaseImage.src, productUrl, resolvedInStock, resolvedPrice, resolvedSku]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const addToCart = () => {
    if (!canPurchase || selectionPrompt) return;
    setIsAdding(true);

    const titleSuffix = currentProduct.attributes?.length
      ? currentProduct.attributes
          .map((attribute) => selectedOptions[attribute.id] ? `${attribute.label}: ${attribute.values.find((value) => value.value === selectedOptions[attribute.id])?.label}` : null)
          .filter(Boolean)
          .join(' / ')
      : '';

    window.setTimeout(() => {
      onAddToCart({
        id: selectedVariation?.id ?? currentProduct.slug,
        title: titleSuffix ? `${currentProduct.title} (${titleSuffix})` : currentProduct.title,
        priceLabel: formatRand(resolvedPrice),
        image: currentImage.src,
        unitPrice: resolvedPrice,
        imageFit: currentImage.fit,
      });

      setIsAdding(false);
      setFeedbackMessage(`${currentProduct.title} added to cart.`);
      window.setTimeout(() => setFeedbackMessage(null), 2500);
    }, 450);
  };

  const buyNow = () => {
    if (!canPurchase || selectionPrompt) return;
    setIsAdding(true);

    const titleSuffix = currentProduct.attributes?.length
      ? currentProduct.attributes
          .map((attribute) => selectedOptions[attribute.id] ? `${attribute.label}: ${attribute.values.find((value) => value.value === selectedOptions[attribute.id])?.label}` : null)
          .filter(Boolean)
          .join(' / ')
      : '';

    window.setTimeout(() => {
      onAddToCart({
        id: selectedVariation?.id ?? currentProduct.slug,
        title: titleSuffix ? `${currentProduct.title} (${titleSuffix})` : currentProduct.title,
        priceLabel: formatRand(resolvedPrice),
        image: currentImage.src,
        unitPrice: resolvedPrice,
        imageFit: currentImage.fit,
      });
      setIsAdding(false);
      navigateTo('/cart');
    }, 450);
  };

  const addToWishlist = () => {
    onAddToWishlist({
      id: currentProduct.slug,
      title: currentProduct.title,
      priceLabel: compareAtPrice ? `${formatRand(resolvedPrice)} Sale` : formatRand(resolvedPrice),
      numericPrice: resolvedPrice,
      image: currentImage.src,
      imageFit: currentImage.fit,
      path: productPath(currentProduct.slug),
    });
    setFeedbackMessage(`${currentProduct.title} saved to wishlist.`);
    window.setTimeout(() => setFeedbackMessage(null), 2500);
  };

  const copyProductLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      setCopyState('idle');
    }
  };

  const scrollToReviews = () => {
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        document.getElementById('product-reviews')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  };

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newReview.author || !newReview.title || !newReview.content) return;

    const review: ProductReview = {
      id: Date.now(),
      author: newReview.author,
      rating: newReview.rating,
      date: new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }),
      title: newReview.title,
      content: newReview.content,
      verified: true,
    };

    setReviews((prev) => [review, ...prev]);
    setIsWritingReview(false);
    setNewReview({ rating: 5, author: '', title: '', content: '' });
  };

  const isSaleBadge = currentProduct.badge?.toLowerCase() === 'sale';

  const outOfStockWhatsapp = `https://wa.me/27676253986?text=${encodeURIComponent(`Hi Wansati, please let me know when ${currentProduct.title} is available again.`)}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="border-b border-stone-200 bg-[#fcfaf5]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-6 text-xs font-bold uppercase tracking-widest text-stone-500 sm:px-8">
          {currentProduct.breadcrumbs.map((crumb, index) => (
            <React.Fragment key={`${crumb.label}-${index}`}>
              {index > 0 && <ChevronRight className="h-4 w-4 text-stone-300" />}
              {crumb.internalPath ? (
                <button type="button" onClick={() => navigateTo(crumb.internalPath!)} className="transition-colors hover:text-stone-900">
                  {crumb.label}
                </button>
              ) : crumb.href ? (
                <a href={crumb.href} className="transition-colors hover:text-stone-900">
                  {crumb.label}
                </a>
              ) : (
                <span className="truncate text-stone-900">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 gap-12 pt-10 md:grid-cols-2 lg:gap-20"
        >
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="relative aspect-[3/4] w-full overflow-hidden"
              aria-label="Open product gallery"
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className={`absolute inset-0 h-full w-full ${currentImage.fit === 'contain' ? 'object-contain p-6' : 'object-cover object-top'}`}
                referrerPolicy="no-referrer"
              />
            </button>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {displayGallery.map((image, index) => (
                <button
                  type="button"
                  key={`${image.src}-${index}`}
                  onClick={() => {
                    setActiveImageIndex(index);
                    setIsLightboxOpen(true);
                  }}
                  className={`aspect-[3/4] border-2 transition-colors ${
                    activeImageIndex === index ? 'border-stone-900' : 'border-transparent hover:border-stone-300'
                  }`}
                  aria-label={`View thumbnail ${index + 1}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`h-full w-full ${image.fit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                {currentProduct.badge ? (
                  <span
                    className={`mb-4 inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white ${
                      isSaleBadge ? 'bg-red-600' : 'bg-stone-900'
                    }`}
                  >
                    {currentProduct.badge}
                  </span>
                ) : null}
                <h1 className="font-serif text-3xl leading-tight text-stone-900 md:text-5xl">
                  {currentProduct.title}
                </h1>
              </div>
              <button
                type="button"
                onClick={addToWishlist}
                className="pt-2 text-stone-400 transition-colors hover:text-red-500"
                aria-label="Add to wishlist"
              >
                <Heart size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="text-xl font-medium text-stone-900 md:text-2xl">{formatRand(resolvedPrice)}</div>
              {compareAtPrice ? (
                <span className="text-sm text-stone-400 line-through md:text-base">{formatRand(compareAtPrice)}</span>
              ) : null}
              <button type="button" onClick={scrollToReviews} className="flex items-center text-sm text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={14}
                    fill={reviews.length > 0 && index < Math.round(Number(averageRating)) ? 'currentColor' : 'none'}
                    className={reviews.length === 0 || index >= Math.round(Number(averageRating)) ? 'text-stone-300' : ''}
                  />
                ))}
                <span className="ml-2 text-xs text-stone-500">
                  {reviews.length > 0 ? `(${reviews.length} Reviews)` : '(No reviews yet)'}
                </span>
              </button>
            </div>

            <p className="mb-8 text-sm leading-relaxed text-stone-600">{currentProduct.shortDescription}</p>

            {currentProduct.attributes?.length ? (
              <div className="mb-8 space-y-6">
                {currentProduct.attributes.map((attribute) => (
                  <div key={attribute.id}>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-stone-900">Select {attribute.label}</span>
                      {attribute.id === 'size' ? (
                        <button type="button" className="text-xs text-stone-500 underline underline-offset-4 transition-colors hover:text-stone-900">
                          Size Guide
                        </button>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {attribute.values.map((value) => {
                        const isSelected = selectedOptions[attribute.id] === value.value;
                        return (
                          <button
                            key={value.value}
                            type="button"
                            onClick={() => {
                              setSelectedOptions((prev) => ({
                                ...prev,
                                [attribute.id]: prev[attribute.id] === value.value ? '' : value.value,
                              }));
                            }}
                            className={`flex min-w-12 items-center justify-center border px-4 py-3 text-xs font-medium transition-colors ${
                              isSelected
                                ? 'border-stone-900 bg-stone-900 text-white'
                                : 'border-stone-300 text-stone-700 hover:border-stone-900'
                            }`}
                          >
                            {attribute.display === 'swatch' ? (
                              <span className="flex items-center gap-2">
                                <span className="h-4 w-4 border border-black/10" style={{ backgroundColor: value.swatch }} />
                                <span>{value.label}</span>
                              </span>
                            ) : (
                              value.label
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mb-8">
              <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-stone-900">Quantity</span>
              <div className="inline-flex h-12 w-32 items-center border border-stone-300">
                <button type="button" onClick={decrementQuantity} className="flex h-full flex-1 items-center justify-center text-stone-500 transition-colors hover:text-stone-900">-</button>
                <div className="w-10 text-center text-sm font-medium">{quantity}</div>
                <button type="button" onClick={incrementQuantity} className="flex h-full flex-1 items-center justify-center text-stone-500 transition-colors hover:text-stone-900">+</button>
              </div>
            </div>

            {selectionPrompt ? (
              <div className="mb-4 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700" aria-live="polite">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{selectionPrompt}</span>
                </div>
              </div>
            ) : null}

            {feedbackMessage ? (
              <div className="mb-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" aria-live="polite">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              </div>
            ) : null}

            <div className="mb-10 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={addToCart}
                disabled={!canPurchase || Boolean(selectionPrompt) || isAdding}
                className="relative flex-1 overflow-hidden py-4 text-xs font-bold uppercase tracking-widest btn-gold-textured disabled:cursor-not-allowed disabled:opacity-50"
              >
                <AnimatePresence mode="wait">
                  {isAdding ? (
                    <motion.div
                      key="adding"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>{resolvedInStock ? 'Add to Cart' : 'View Options'}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {!resolvedInStock ? (
              <a
                href={outOfStockWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="mb-8 inline-flex items-center gap-2 border border-stone-900 px-5 py-3 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Us on WhatsApp
              </a>
            ) : (
              <button
                type="button"
                onClick={buyNow}
                disabled={!canPurchase || Boolean(selectionPrompt) || isAdding}
                className="mb-8 w-full border border-stone-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white disabled:cursor-not-allowed disabled:border-stone-200 disabled:text-stone-300"
              >
                Buy Now
              </button>
            )}

            <div className="mb-8 space-y-4 border-y border-stone-100 py-6">
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <div className={`h-2 w-2 ${resolvedInStock ? 'bg-green-500' : 'bg-red-600'}`} />
                <span>{resolvedInStock ? resolvedStockLabel : 'Currently out of stock'}</span>
              </div>
              <div className="text-sm text-stone-600">Nationwide delivery available across South Africa. Shipping is calculated at checkout.</div>
              <div className="space-y-3 border-t border-stone-100 pt-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">Payment Options</p>
                  <p className="mt-1 text-sm text-stone-600">Secure checkout with Payfast and Yoco.</p>
                </div>
                <div className="flex items-center">
                  <img
                    src={payfastLogo}
                    alt="Payfast"
                    className="h-5 w-auto opacity-80"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <img
                    src={yocoLogo}
                    alt="Yoco"
                    className="h-4 w-auto opacity-85"
                  />
                  <div className="flex flex-wrap items-center justify-end gap-x-1.5 gap-y-2">
                    {YOCO_ACCEPTED_CARDS.map((card) => (
                      <img
                        key={card.name}
                        src={card.logo}
                        alt={card.name}
                        title={card.name}
                        className={`${card.className} block w-auto shrink-0 object-contain opacity-90`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <Share2 size={16} />
                  <span>{copyState === 'copied' ? 'Link copied' : 'Share this product'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyProductLink}
                    className="flex h-9 w-9 items-center justify-center border border-stone-200 text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900"
                    aria-label="Copy link for Instagram sharing"
                    title="Copy link for Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </button>
                  <a
                    href={facebookShareUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center border border-stone-200 text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href={whatsAppShareUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center border border-stone-200 text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900"
                    aria-label="Share on WhatsApp"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={copyProductLink}
                    className="flex h-9 w-9 items-center justify-center border border-stone-200 text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900"
                    aria-label="Copy product link"
                  >
                    <Link2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        <div className="mt-8 border-t border-stone-100 pt-6">
          <div className="space-y-1">
            {accordionSections.map((section) => {
              const open = activeSectionId === section.id;
              return (
                <div key={section.id} className="border border-stone-100">
                  <button
                    type="button"
                    onClick={() => setActiveSectionId(open ? '' : section.id)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-50"
                  >
                    <span>{section.title}</span>
                    <ChevronRight size={16} className={`transform transition-transform ${open ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-stone-100 px-6 py-4 text-sm leading-relaxed text-stone-600"
                      >
                        {section.content}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="product-reviews" className="mx-auto mt-16 max-w-7xl border-t border-stone-100 px-4 pt-12 sm:px-8">
        <h2 className="mb-10 text-center font-serif text-2xl text-stone-900 md:text-3xl">Customer Reviews</h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="col-span-1 border-b border-stone-100 pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
            <div className="mb-6 flex items-center gap-4">
              <h3 className="font-serif text-5xl text-stone-900">{reviews.length > 0 ? averageRating : '0.0'}</h3>
              <div className="flex flex-col">
                <div className="mb-1 flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill={reviews.length > 0 && index < Math.round(Number(averageRating)) ? 'currentColor' : 'none'}
                      className={reviews.length === 0 || index >= Math.round(Number(averageRating)) ? 'text-stone-300' : ''}
                    />
                  ))}
                </div>
                <span className="text-xs uppercase tracking-widest text-stone-500">
                  {reviews.length > 0 ? `Based on ${reviews.length} Reviews` : 'No reviews yet'}
                </span>
              </div>
            </div>

            <div className="mb-8 space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter((review) => review.rating === rating).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-3 text-sm">
                    <span className="w-16 text-stone-500">{rating} Stars</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-100">
                      <div className="h-full rounded-full bg-stone-900" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="w-8 text-right text-stone-500">{count}</span>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsWritingReview(true)}
              className="w-full border border-stone-900 py-3 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
            >
              Write a Review
            </button>
          </div>

          <div className="col-span-1 space-y-10 lg:col-span-2">
            {isWritingReview ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-stone-100 bg-stone-50 p-6 md:p-8"
              >
                <h3 className="mb-6 border-b border-stone-200 pb-4 font-serif text-2xl text-stone-900">Write a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-6 text-sm">
                  <div className="mb-4 space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-900">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                          className="text-amber-500 focus:outline-none"
                        >
                          <Star size={24} fill={star <= newReview.rating ? 'currentColor' : 'none'} className={star > newReview.rating ? 'text-stone-300' : ''} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-900">Name</label>
                      <input
                        type="text"
                        required
                        className="w-full border border-stone-300 bg-white p-3 focus:border-stone-900 focus:outline-none"
                        value={newReview.author}
                        onChange={(event) => setNewReview((prev) => ({ ...prev, author: event.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-900">Review Title</label>
                      <input
                        type="text"
                        required
                        className="w-full border border-stone-300 bg-white p-3 focus:border-stone-900 focus:outline-none"
                        value={newReview.title}
                        onChange={(event) => setNewReview((prev) => ({ ...prev, title: event.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-900">Review Content</label>
                      <textarea
                        required
                        rows={4}
                        className="w-full resize-none border border-stone-300 bg-white p-3 focus:border-stone-900 focus:outline-none"
                        value={newReview.content}
                        onChange={(event) => setNewReview((prev) => ({ ...prev, content: event.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsWritingReview(false)}
                      className="flex-1 border border-stone-900 py-3 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="flex-1 btn-gold-textured py-3 text-xs font-bold uppercase tracking-widest">
                      Submit Review
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={review.id ?? `${review.author}-${review.date}-${index}`} className="border-b border-stone-100 pb-8 last:border-0 last:pb-0">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-2 flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            size={12}
                            fill={starIndex < review.rating ? 'currentColor' : 'none'}
                            className={starIndex >= review.rating ? 'text-stone-300' : ''}
                          />
                        ))}
                      </div>
                      <h4 className="font-bold text-stone-900">{review.title ?? 'Customer Review'}</h4>
                    </div>
                    <span className="text-xs text-stone-400">{review.date}</span>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-stone-600">{review.content}</p>
                  <div className="text-xs font-medium text-stone-500">
                    {review.author}
                    <span className="mx-1 text-stone-300">•</span>
                    <span className="text-emerald-600">{review.verified === false ? 'Customer' : 'Verified Buyer'}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center border border-dashed border-stone-100 bg-stone-50 px-4 py-12 text-center">
                <Star className="mb-4 h-8 w-8 text-stone-300" />
                <h4 className="mb-2 font-serif text-xl text-stone-900">No reviews yet</h4>
                <p className="mx-auto mb-6 max-w-sm text-sm text-stone-500">
                  Be the first to share your experience with this product. We&apos;d love to hear your thoughts!
                </p>
                <button type="button" onClick={() => setIsWritingReview(true)} className="btn-gold-textured px-8 py-3 text-xs font-bold uppercase tracking-widest">
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl border-t border-stone-100 px-4 pt-16 sm:px-8">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-stone-900 md:text-3xl">You May Also Like</h2>
          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="group hidden items-center text-xs font-bold uppercase tracking-widest text-stone-900 md:flex"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              navigateTo={navigateTo}
              onAddToWishlist={onAddToWishlist}
            />
          ))}
        </div>
      </section>

      {recentlyViewedProducts.length > 0 ? (
        <section className="mx-auto mt-20 max-w-7xl border-t border-stone-100 px-4 pt-16 sm:px-8">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-serif text-2xl text-stone-900 md:text-3xl">Recently Viewed</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {recentlyViewedProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                navigateTo={navigateTo}
                onAddToWishlist={onAddToWishlist}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-24 border-t border-stone-200 bg-[#fcfaf5] py-16 md:py-24">
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
              className="flex-1 border border-stone-300 bg-transparent px-4 py-3 text-sm placeholder:text-stone-500 focus:border-stone-500 focus:outline-none"
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

      <AnimatePresence>
        {isLightboxOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/85 px-4 py-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="mx-auto flex h-full max-w-6xl items-center justify-center">
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close gallery"
              >
                <X className="h-5 w-5" />
              </button>
              {displayGallery.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveImageIndex((prev) => (prev === 0 ? displayGallery.length - 1 : prev - 1));
                    }}
                    className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 md:flex"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveImageIndex((prev) => (prev + 1) % displayGallery.length);
                    }}
                    className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 md:flex"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              ) : null}
              <button
                type="button"
                onClick={(event) => event.stopPropagation()}
                className="relative max-h-full w-full max-w-4xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden border border-white/20 bg-white">
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className={`absolute inset-0 h-full w-full ${currentImage.fit === 'contain' ? 'object-contain p-8' : 'object-cover'}`}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
