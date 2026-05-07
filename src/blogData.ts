export type BlogListItem = {
  title: string;
  description: string;
};

export type BlogCommentExample = {
  author: string;
  dateLabel: string;
  content: string;
};

export type BlogArticleSection =
  | {
      type: 'section';
      eyebrow?: string;
      title: string;
      paragraphs: string[];
    }
  | {
      type: 'list';
      eyebrow?: string;
      title: string;
      intro?: string;
      items: BlogListItem[];
    }
  | {
      type: 'callout';
      title: string;
      content: string;
    };

export type BlogArticleContent = {
  intro: string[];
  summaryPoints?: string[];
  tags?: string[];
  commentExamples?: BlogCommentExample[];
  sections: BlogArticleSection[];
};

export type BlogPost = {
  slug: string;
  title: string;
  href: string;
  isExternal?: boolean;
  image: string;
  dateLabel: string;
  author: string;
  categories: string[];
  excerpt: string;
  featured?: boolean;
  article?: BlogArticleContent;
};

export const blogPath = (slug: string) => `/blog/${slug}`;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'the-freshness-of-the-spring-season-is-here-find-your-perfect-fragrance',
    title: 'The Freshness of the Spring Season is Here, Find Your Perfect Fragrance',
    href: blogPath('the-freshness-of-the-spring-season-is-here-find-your-perfect-fragrance'),
    image:
      'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/09/Blue-white-minimal-linkedin-profile-cover-image-2500-x-1300-px.png?fit=1920%2C998&ssl=1',
    dateLabel: 'September 11, 2024',
    author: 'WansatiBeautyAdmin',
    categories: ['Fragrances', 'Self Care'],
    excerpt:
      'Spring brings renewal, lighter moods, and a chance to refresh your scent wardrobe. This feature helps readers find a fragrance that fits the season.',
    featured: true,
    article: {
      intro: [
        "There's something undeniably magical about the arrival of spring. The days get longer, flowers bloom, and the world seems to wake up from the winter slumber. It's a time for renewal, fresh beginnings, and reconnecting with the vibrant energy around us. This shift in the season brings a natural desire for change, whether it is the clothes we wear, how we feel, or the scents we surround ourselves with.",
        "Your fragrance should reflect this renewal, capturing the essence of spring's lightness and beauty. Your scent is an extension of who you are, and as the seasons change, it offers a unique opportunity to express your individuality in a fresh, new way.",
      ],
      summaryPoints: [
        'Why spring naturally changes the way fragrance feels and performs.',
        'Fragrance directions for women who want floral, citrus, and playful scent profiles.',
        'Fresh and bold scent suggestions for men stepping into the new season.',
      ],
      tags: ['Perfume for him', 'Perfume for her', 'Spring Fragrances'],
      commentExamples: [
        {
          author: 'Kagiso',
          dateLabel: '13 Oct 2023',
          content:
            'Thank you for sharing these spring fragrance ideas. I like how the article makes it easier to choose a scent for the season, especially when you want something fresh, light, and still memorable.',
        },
        {
          author: 'Naledi',
          dateLabel: '18 Oct 2023',
          content:
            'This was such a helpful roundup. Light Blue and Flowerbomb are two of my favourites, and now I want to try more of the fragrances mentioned here for daytime wear.',
        },
      ],
      sections: [
        {
          type: 'section',
          title: 'The Power of Fragrance in Spring',
          paragraphs: [
            "Spring is a time for reinvention, both outside and within. As flowers bloom and nature awakens, it's only natural we feel inspired to align with the season's freshness. Fragrance plays a powerful role in this, subtly enhancing the way we experience the world around us.",
            "Much like the burst of colors that comes with spring, your fragrance can create an invisible presence that leaves a lasting impression. It's about stepping out on a sunny day with a scent that makes you feel alive, radiant, and completely in tune with the season.",
          ],
        },
        {
          type: 'list',
          eyebrow: 'For Her',
          title: 'Embrace Your Spring Spirit',
          intro:
            "Spring is a reminder of the beauty and strength within every woman. Whether you feel drawn to delicate florals or vibrant, fruity scents, the season is your playground to explore new aromas that speak to your essence.",
          items: [
            {
              title: 'Fantasy by Britney Spears',
              description:
                "Playful and sweet, this fragrance mirrors the joy of spring in every spritz. With light floral notes, it's ideal for anyone who embraces the bright, carefree spirit of the season.",
            },
            {
              title: 'Lady Million by Paco Rabanne',
              description:
                "There is an undeniable elegance to spring, and this scent reflects that luxury in a subtle, timeless way. It's the perfect companion for moments when you want to feel radiant and confident.",
            },
            {
              title: 'Si by Giorgio Armani',
              description:
                'Spring is not just about change, but also about calm and serenity. This fragrance brings out natural grace and poise with a gentle yet lasting softness.',
            },
            {
              title: 'Flowerbomb by Viktor & Rolf',
              description:
                "Like a garden in full bloom, this fragrance captures the energy of spring with a vibrant floral explosion. It's for those who want to feel uplifted and energized by nature's beauty.",
            },
            {
              title: 'Light Blue by Dolce & Gabbana',
              description:
                'Crisp, refreshing, and light as a spring breeze, this fragrance is perfect for a day in the sun and brings a citrusy twist that revitalizes you.',
            },
            {
              title: 'DKNY Be Delicious by Donna Karan',
              description:
                "Bursting with fresh, juicy apple notes, this scent celebrates spring's vibrant energy. It's fun, playful, and perfect for the woman who loves adventure.",
            },
          ],
        },
        {
          type: 'list',
          eyebrow: 'For Him',
          title: 'Fresh and Bold for Spring',
          intro:
            "Spring isn't just about renewal; it's about stepping into your power. For men, this season brings a fresh boldness, whether through a crisp citrus scent or a woody aromatic fragrance that feels right for longer days.",
          items: [
            {
              title: 'One Million by Paco Rabanne',
              description:
                "Crisp, bold, and invigorating, this fragrance channels the fresh air of spring mornings. It's a strong choice for those who like to lead with confidence.",
            },
            {
              title: 'Aventus Creed by Creed',
              description:
                'Spring invites adventure, and this fragrance suits anyone ready to take on new challenges with strength and clarity.',
            },
            {
              title: 'Legend by Mont Blanc',
              description:
                "Subtle yet distinct, this fragrance offers a quiet strength that fits the season perfectly. It's fresh, light, and balanced.",
            },
            {
              title: 'Dunhill Desire Blue by Alfred Dunhill',
              description:
                "Spring's clear blue skies and open horizons are reflected in this refreshing aquatic fragrance. It's perfect for those who feel most alive in nature.",
            },
            {
              title: 'Invictus by Paco Rabanne',
              description:
                'Strong, fresh, and full of energy, this fragrance combines masculine power with freshness for the man who thrives on challenge.',
            },
            {
              title: 'Le Male by Jean Paul Gaultier',
              description:
                'A modern twist on classic masculinity, this scent is bold, warm, and daring for anyone who wants to stand out with confidence.',
            },
          ],
        },
        {
          type: 'callout',
          title: 'Embrace the Change',
          content:
            "Spring is a reminder that change can be beautiful. Whether it's trying a new fragrance or simply taking a moment to breathe in the fresh air, the season invites us all to embrace transformation in our own way. At Wansati, we're inspired by that change, and we hope this season brings you a sense of renewal, confidence, and joy.",
        },
      ],
    },
  },
  {
    slug: 'the-perfume-note-why-are-perfume-notes-so-important',
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
    slug: 'a-journey-through-olfactory-groups-a-guideline-to-choosing-a-fragrance',
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
    slug: 'discovering-your-signature-scent-a-guide-to-finding-your-perfect-perfume',
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
    slug: 'transform-your-space-with-aromatherapy-the-art-of-using-diffusers',
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
    slug: 'unlocking-the-beauty-secrets-the-advantages-of-tissue-oil',
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
    slug: 'exploring-the-enchanting-world-of-perfumes-a-guide-to-different-types-of-fragrances',
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
    slug: 'radiant-skin-your-ultimate-guide-to-face-care',
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
    slug: 'finding-yourself-after-kids-a-journey-of-self-rediscovery-for-women',
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
    slug: 'creative-ways-to-boost-your-income-ideas-for-extra-earnings',
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
