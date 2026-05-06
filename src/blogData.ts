export type BlogPost = {
  slug?: string;
  title: string;
  href: string;
  isExternal?: boolean;
  image: string;
  dateLabel: string;
  author: string;
  categories: string[];
  excerpt: string;
  featured?: boolean;
};

export const SPRING_FRAGRANCE_POST_SLUG =
  'the-freshness-of-the-spring-season-is-here-find-your-perfect-fragrance';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: SPRING_FRAGRANCE_POST_SLUG,
    title: 'The Freshness of the Spring Season is Here, Find Your Perfect Fragrance',
    href: `/blog/${SPRING_FRAGRANCE_POST_SLUG}`,
    image:
      'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/09/Blue-white-minimal-linkedin-profile-cover-image-2500-x-1300-px.png?fit=1920%2C998&ssl=1',
    dateLabel: 'September 11, 2024',
    author: 'WansatiBeautyAdmin',
    categories: ['Fragrances', 'Self Care'],
    excerpt:
      'Spring brings renewal, lighter moods, and a chance to refresh your scent wardrobe. This feature helps readers find a fragrance that fits the season.',
    featured: true,
  },
  {
    title: 'The Perfume Note: Why Are Perfume Notes So Important?',
    href: 'https://www.wansatibrands.co.za/the-perfume-note-why-are-perfume-notes-so-important/?v=eacb463a8002',
    isExternal: true,
    image:
      'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/04/Untitled-design-scaled.jpg?fit=2560%2C1313&ssl=1',
    dateLabel: 'April 9, 2024',
    author: 'WansatiBeautyAdmin',
    categories: ['Fragrances'],
    excerpt:
      'Top, heart, and base notes shape how a perfume opens, evolves, and lasts. This article explains why understanding notes changes how you choose scent.',
    featured: true,
  },
  {
    title: 'A Journey Through Olfactory Groups: A Guideline to Choosing a Fragrance',
    href: 'https://www.wansatibrands.co.za/a-journey-through-olfactory-groups-a-guideline-to-choosing-a-fragrance/?v=eacb463a8002',
    isExternal: true,
    image:
      'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/01/fragrance-wheel_1024x1024.webp?fit=600%2C600&ssl=1',
    dateLabel: 'January 7, 2024',
    author: 'WansatiBeautyAdmin',
    categories: ['Fragrances'],
    excerpt:
      'An introduction to fragrance families and olfactory groups, designed to help readers navigate perfume with more clarity and confidence.',
    featured: true,
  },
  {
    title: 'Discovering Your Signature Scent: A Guide to Finding Your Perfect Perfume',
    href: 'https://www.wansatibrands.co.za/discovering-your-signature-scent-a-guide-to-finding-your-perfect-perfume/?v=eacb463a8002',
    isExternal: true,
    image:
      'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Kit.png?fit=1080%2C1080&ssl=1',
    dateLabel: 'September 15, 2023',
    author: 'WansatiBeautyAdmin',
    categories: ['Fragrances'],
    excerpt:
      'A signature scent is a personal statement. This guide explores how to choose a perfume that feels memorable, expressive, and uniquely yours.',
  },
  {
    title: 'Transform Your Space with Aromatherapy: The Art of Using Diffusers',
    href: 'https://www.wansatibrands.co.za/transform-your-space-with-aromatherapy-the-art-of-using-diffusers/?v=eacb463a8002',
    isExternal: true,
    image:
      'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Diffuser.jpg?fit=1181%2C1181&ssl=1',
    dateLabel: 'September 14, 2023',
    author: 'WansatiBeautyAdmin',
    categories: ['Self Care'],
    excerpt:
      'Diffusers can turn ordinary rooms into restorative spaces. The article looks at scent, atmosphere, and the quiet impact of aromatherapy at home.',
  },
  {
    title: 'Unlocking the Beauty Secrets: The Advantages of Tissue Oil',
    href: 'https://www.wansatibrands.co.za/unlocking-the-beauty-secrets-the-advantages-of-tissue-oil/?v=eacb463a8002',
    isExternal: true,
    image:
      'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Oil.jpg?fit=1181%2C1181&ssl=1',
    dateLabel: 'September 14, 2023',
    author: 'WansatiBeautyAdmin',
    categories: ['Uncategorized'],
    excerpt:
      'A closer look at why tissue oil remains a staple in beauty routines, from nourishment and softness to everyday skincare confidence.',
  },
  {
    title: 'Exploring the Enchanting World of Perfumes: A Guide to Different Types of Fragrances',
    href: 'https://www.wansatibrands.co.za/new-home-decor-from-john-doerson/?v=eacb463a8002',
    isExternal: true,
    image:
      'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2017/06/pexels-rfstudio-3059609-scaled.jpg?fit=1708%2C2560&ssl=1',
    dateLabel: 'September 5, 2023',
    author: 'WansatiBeautyAdmin',
    categories: ['Fragrances'],
    excerpt:
      'A broad introduction to fragrance types and scent families, showing how perfume can express mood, memory, and personality.',
  },
  {
    title: 'Radiant Skin: Your Ultimate Guide to Face Care',
    href: 'https://www.wansatibrands.co.za/the-big-design-wall-likes-pictures/?v=eacb463a8002',
    isExternal: true,
    image:
      'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/pexels-ron-lach-8142196-scaled.jpg?fit=1707%2C2560&ssl=1',
    dateLabel: 'September 2, 2023',
    author: 'WansatiBeautyAdmin',
    categories: ['Self Care'],
    excerpt:
      'A face-care guide centered on consistent routines, healthy skin habits, and treating skincare as part of overall wellbeing.',
  },
  {
    title: 'Finding Yourself After Kids: A Journey of Self-Rediscovery for Women',
    href: 'https://www.wansatibrands.co.za/minimalist-japanese-inspired-furniture/?v=eacb463a8002',
    isExternal: true,
    image:
      'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2017/06/pexels-photo-2661255.jpeg?fit=600%2C791&ssl=1',
    dateLabel: 'August 22, 2023',
    author: 'WansatiBeautyAdmin',
    categories: ['Self Care'],
    excerpt:
      'A reflective piece on reconnecting with identity, confidence, and personal wellbeing after motherhood reshapes daily life.',
  },
  {
    title: 'Creative Ways to Boost Your Income: Ideas for Extra Earnings',
    href: 'https://www.wansatibrands.co.za/sweet-seat-functional-seat-for-it-folks/?v=eacb463a8002',
    isExternal: true,
    image:
      'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2017/06/dark-skinned-pretty-woman-hodlng-bottle-body-lotion-hands_259150-57478.png?fit=726%2C471&ssl=1',
    dateLabel: 'June 14, 2023',
    author: 'WansatiBeautyAdmin',
    categories: ['Self Care', 'Wansati Distributor'],
    excerpt:
      'A practical article on creating extra income opportunities and approaching entrepreneurship with more intention and momentum.',
  },
];

export const BLOG_CATEGORIES = ['All', 'Fragrances', 'Self Care', 'Uncategorized', 'Wansati Distributor'] as const;

export const getBlogPostBySlug = (slug: string) => BLOG_POSTS.find((post) => post.slug === slug);
