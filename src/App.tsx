/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  ShoppingBag,
  Trash2,
  Menu,
  X,
  Minus,
  Plus,
  Truck,
  Crown,
  Gem,
  ShieldCheck,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  Tag,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import payfastLogo from './assets/payment/payfast-logo.svg';
import amexLogo from './assets/payment/amex-logo.svg';
import yocoLogo from './assets/payment/yoco-logo.svg';
import yocoVisaLogo from './assets/payment/yoco-visa.svg';
import yocoMastercardLogo from './assets/payment/yoco-mastercard.svg';
import yocoMasterpassLogo from './assets/payment/yoco-masterpass.svg';
import SingleProductPage from './SingleProductPage';
import CollectionPage from './CollectionPage';
import NotFoundPage from './NotFoundPage';
import ProductListingPage from './ProductListingPage';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import BlogPage from './BlogPage';
import BlogArticlePage from './BlogArticlePage';
import AuthPage from './AuthPage';
import LostPasswordPage from './LostPasswordPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import CheckoutPage from './CheckoutPage';
import TermsAndConditionsPage from './TermsAndConditionsPage';
import ReturnsPolicyPage from './ReturnsPolicyPage';
import SearchResultsPage from './SearchResultsPage';
import {
  collectionPath,
  getCollectionBySlug,
  getCollectionPathByLabel,
  getNestedProductListingPathByLabels,
  getProductListingPathByLabel,
  productListingPath,
} from './collectionData';
import { getBlogPostBySlug } from './blogData';
import { getSearchSuggestions, SearchResultItem } from './searchData';

type WishlistItem = {
  id: string;
  title: string;
  priceLabel: string;
  numericPrice: number;
  image: string;
  imageFit?: 'cover' | 'contain';
  path?: string;
};

type CartItem = {
  id: string;
  title: string;
  priceLabel: string;
  image: string;
  quantity: number;
  unitPrice: number;
  imageFit?: 'cover' | 'contain';
};

export default function App() {
  const heroImages = [
    "https://www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6563-scaled.jpg",
    "https://www.wansatibrands.co.za/wp-content/uploads/2025/09/DSC_6469-scaled.jpg",
    "https://www.wansatibrands.co.za/wp-content/uploads/2025/09/DSC_6315-scaled.jpg",
    "https://www.wansatibrands.co.za/wp-content/uploads/2025/09/DSC_6391-scaled.jpg"
  ];
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/');
  const [currentSearch, setCurrentSearch] = useState(() => window.location.search || '');
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDesktopSearchActive, setIsDesktopSearchActive] = useState(false);
  const [siteSearchQuery, setSiteSearchQuery] = useState(() => new URLSearchParams(window.location.search).get('q') ?? '');
  const [activeSearchIndex, setActiveSearchIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(() => (window.location.pathname || '/') !== '/');
  const [currentScrollY, setCurrentScrollY] = useState(() => window.scrollY);
  const [activeSidePanel, setActiveSidePanel] = useState<'wishlist' | 'cart' | null>(null);
  const [showCoupon, setShowCoupon] = useState(false);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<string[]>([]);
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null);
  const [desktopDropdownScrollOrigin, setDesktopDropdownScrollOrigin] = useState<number | null>(null);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 'wish-1',
      title: 'Rhulani Dress',
      priceLabel: 'R2,200.00',
      numericPrice: 2200,
      image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/12/DSC_6043-1.jpg?fit=864%2C1080&ssl=1',
      path: '/product/melania-dress',
    },
    {
      id: 'wish-2',
      title: 'Inspired by Oud Fleur- Tom Ford',
      priceLabel: 'R150.00 – R200.00',
      numericPrice: 150,
      image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-Oud-Fleur-Photoroom.png?fit=800%2C800&ssl=1',
      imageFit: 'contain',
      path: '/product/oud-fleur-inspired',
    },
  ]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      title: 'Prisha Sets',
      priceLabel: 'R1,499.00',
      image: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_6105.jpg?fit=864%2C1080&ssl=1',
      quantity: 1,
      unitPrice: 1499,
    },
    {
      id: 'cart-2',
      title: "Botshelo men's shirt",
      priceLabel: 'R650.00',
      image: 'https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5751.jpg',
      quantity: 1,
      unitPrice: 650,
    },
  ]);
  const [revealedCategoryIdx, setRevealedCategoryIdx] = useState<number | null>(null);
  const scrollStateRef = useRef({
    isDown: (window.location.pathname || '/') !== '/',
    lastToggleTime: 0,
  });
  const desktopSearchRef = useRef<HTMLDivElement | null>(null);

  const syncNavVisibilityForPath = (path: string) => {
    const shouldHideDesktopNav = path !== '/';
    scrollStateRef.current.isDown = shouldHideDesktopNav;
    scrollStateRef.current.lastToggleTime = Date.now();
    setIsScrollingDown(shouldHideDesktopNav);
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextPath = window.location.pathname || '/';
      const nextSearch = window.location.search || '';
      setCurrentPath(nextPath);
      setCurrentSearch(nextSearch);
      setActiveSidePanel(null);
      setIsMenuOpen(false);
      setIsSearchOpen(false);
      setIsDesktopSearchActive(false);
      setActiveSearchIndex(-1);
      setActiveDesktopDropdown(null);
      setDesktopDropdownScrollOrigin(null);
      syncNavVisibilityForPath(nextPath);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollUpDistance = 0;
    let scrollDownDistance = 0;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = Math.max(0, window.scrollY);
          setCurrentScrollY(currentScrollY);
          setIsScrolled(currentScrollY > 20);
          
          const now = Date.now();
          // Provide a 450ms cooldown after the menu toggles to ignore browser layout-shift scroll events
          if (activeDesktopDropdown) {
            scrollStateRef.current.isDown = false;
            setIsScrollingDown(false);
          } else if (now - scrollStateRef.current.lastToggleTime > 450) {
            
            if (currentScrollY > lastScrollY) {
              // Scrolling down
              scrollUpDistance = 0; // Reset upward scroll tracking
              scrollDownDistance += (currentScrollY - lastScrollY);
              
              // Require 40px of intentional downward scroll so that a trackpad "recoil" doesn't close it instantly
              if (scrollDownDistance > 40 && currentScrollY > 80 && !scrollStateRef.current.isDown) {
                scrollStateRef.current.isDown = true;
                scrollStateRef.current.lastToggleTime = now;
                setIsScrollingDown(true);
              }
            } else if (currentScrollY < lastScrollY) {
              // Scrolling up
              scrollDownDistance = 0; // Reset downward scroll tracking
              scrollUpDistance += (lastScrollY - currentScrollY);
              
              if ((scrollUpDistance > 60 || currentScrollY < 20) && scrollStateRef.current.isDown) {
                scrollStateRef.current.isDown = false;
                scrollStateRef.current.lastToggleTime = now;
                setIsScrollingDown(false);
              }
            }
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeDesktopDropdown]);

  const navigation = [
    {
      title: 'Women',
      subcategories: [
        { name: 'New Arrivals', units: 20 },
        { name: 'Dresses', units: 42 },
        { name: 'African Print', units: 18 },
        { name: 'Everyday Wear', units: 16 },
        { name: 'Exclusive Range', units: 12 },
        { name: 'Two-piece Sets', units: 10 },
        { name: 'Kimono', units: 8 },
        { name: 'Fragrance', units: 12 },
      ]
    },
    {
      title: 'Men',
      subcategories: [
        { name: 'African Print', units: 15 },
        { name: 'Fragrance', units: 10 },
      ]
    },
    {
      title: 'Kids',
      subcategories: [
        { name: 'Boys', units: 28 },
        { name: 'Girls', units: 35 },
      ]
    },
    {
      title: 'Body Care',
      subcategories: [
        { name: 'Bathing', units: 24 },
        { name: 'Foot Care', units: 14 },
        { name: 'Facial Care', units: 31 },
      ]
    },
    {
      title: 'Fragrance',
      subcategories: [
        { name: 'Women' },
        { name: 'Men' },
        { name: 'Unisex', units: 19 },
        { name: 'Home', units: 8 },
      ]
    },
    {
      title: 'Home & Living',
      path: '/404',
      subcategories: [],
    },
    {
      title: 'Sale',
      subcategories: [],
      highlight: true
    },
  ];
  const shopAllLabelByTitle: Record<string, string> = {
    Women: 'Shop All Women',
    Men: 'Shop All Men',
    Kids: 'Shop All Kids',
    Fragrance: 'Shop All Fragrances',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const startTime = Date.now();
    const MINIMUM_LOAD_TIME = 3000;

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MINIMUM_LOAD_TIME - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const isCartPanel = activeSidePanel === 'cart';
  const isCartPage = currentPath === '/cart';
  const isCheckoutPage = currentPath === '/checkout' || currentPath === '/checkout/';
  const isWishlistPage = currentPath === '/wishlist';
  const isProductPage = currentPath === '/product' || currentPath.startsWith('/product/');
  const isCollectionPage = currentPath === '/collections' || currentPath.startsWith('/collections/');
  const isAboutPage = currentPath === '/about' || currentPath === '/about/';
  const isAuthPage =
    currentPath === '/my-account' ||
    currentPath === '/my-account/' ||
    currentPath === '/my-account/register' ||
    currentPath === '/my-account/register/' ||
    currentPath === '/sign-in' ||
    currentPath === '/sign-in/' ||
    currentPath === '/register' ||
    currentPath === '/register/';
  const isLostPasswordPage = currentPath === '/my-account/lost-password' || currentPath === '/my-account/lost-password/';
  const isResetPasswordPage = currentPath === '/my-account/reset-password' || currentPath === '/my-account/reset-password/';
  const isSearchResultsPage = currentPath === '/search' || currentPath === '/search/';
  const authMode = currentPath.includes('register') ? 'register' : 'login';
  const blogArticleSlug = currentPath.startsWith('/blog/')
    ? currentPath.replace('/blog/', '').replace(/\/$/, '')
    : '';
  const activeBlogPost = blogArticleSlug ? getBlogPostBySlug(blogArticleSlug) : undefined;
  const isBlogArticlePage = Boolean(activeBlogPost?.article);
  const isBlogPage = currentPath === '/blog' || currentPath === '/blog/';
  const isContactPage = currentPath === '/contact' || currentPath === '/contact/';
  const isPrivacyPage = currentPath === '/privacy-policy' || currentPath === '/privacy-policy/';
  const isTermsPage = currentPath === '/terms-and-conditions' || currentPath === '/terms-and-conditions/';
  const isReturnsPage = currentPath === '/returns-policy' || currentPath === '/returns-policy/';
  const shopSlugFromPath = currentPath.startsWith('/shop/')
    ? currentPath.replace('/shop/', '').split('/')[0]
    : '';
  const currentShopCollection = shopSlugFromPath ? getCollectionBySlug(shopSlugFromPath) : undefined;
  const isShopPage = currentPath === '/shop' || currentPath === '/shop/' || Boolean(currentShopCollection);
  const isHomePage = currentPath === '/';
  const isNotFoundPage =
    currentPath === '/404' ||
    (!isHomePage &&
      !isProductPage &&
      !isCollectionPage &&
      !isAboutPage &&
      !isAuthPage &&
      !isBlogArticlePage &&
      !isBlogPage &&
      !isContactPage &&
      !isPrivacyPage &&
      !isTermsPage &&
      !isReturnsPage &&
      !isSearchResultsPage &&
      !isLostPasswordPage &&
      !isResetPasswordPage &&
      !isShopPage &&
      !isCheckoutPage &&
      !isWishlistPage &&
      !isCartPage);
  const displayedItems = isCartPanel ? cartItems : wishlistItems;
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  const cartDeliveryFee = cartItems.length === 0 ? 0 : (cartSubtotal >= 1000 ? 0 : 99);
  const cartTotal = cartSubtotal + cartDeliveryFee;
  const wishlistEstimatedValue = wishlistItems.reduce((total, item) => total + item.numericPrice, 0);
  const returnPolicyUrl = '/returns-policy';
  const currentSearchQuery = new URLSearchParams(currentSearch).get('q') ?? '';
  const searchSuggestions = siteSearchQuery.trim().length > 0
    ? getSearchSuggestions(siteSearchQuery, isSearchOpen ? 6 : 8)
    : [];
  const yocoAcceptedCards = [
    { name: 'Visa', logo: yocoVisaLogo, className: 'h-4 sm:h-5' },
    { name: 'Mastercard', logo: yocoMastercardLogo, className: 'h-4 sm:h-5' },
    { name: 'MasterPass', logo: yocoMasterpassLogo, className: 'h-4 sm:h-5' },
    { name: 'American Express', logo: amexLogo, className: 'h-4 sm:h-5' },
  ];
  const newArrivalProducts = [
    {
      title: 'Rhulani Dress',
      price: 'R2,200.00',
      img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/12/DSC_6043-1.jpg?fit=864%2C1080&ssl=1',
      link: 'https://www.wansatibrands.co.za/shop/fashion/dresses/melania-dress/?v=eacb463a8002',
    },
    {
      title: 'Prisha Sets',
      price: 'R1,499.00',
      img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_6105.jpg?fit=864%2C1080&ssl=1',
      link: 'https://www.wansatibrands.co.za/shop/fashion/african-print/prisha-sets/?v=eacb463a8002',
    },
    {
      title: 'Rhandzu Dress',
      price: 'R1,600.00',
      img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5890.jpg?fit=864%2C1080&ssl=1',
      link: 'https://www.wansatibrands.co.za/shop/fashion/african-print/rhandzu-dress/?v=eacb463a8002',
    },
    {
      title: 'Pfukani Tsonga dress',
      price: 'R2,080.00',
      img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5876.jpg?fit=864%2C1080&ssl=1',
      link: 'https://www.wansatibrands.co.za/shop/fashion/african-print/pfukani-dress/?v=eacb463a8002',
    },
    {
      title: "Botshelo men's shirt",
      price: 'R650.00',
      img: 'https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5751.jpg',
      link: 'https://www.wansatibrands.co.za/shop/fashion/african-print/botshelo-mens-shirt/?v=eacb463a8002',
    },
    {
      title: "Amogelang men's shirt",
      price: 'R650.00',
      img: 'https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5751.jpg',
      link: 'https://www.wansatibrands.co.za/shop/fashion/african-print/amogelang-mens-shirt/?v=eacb463a8002',
    },
    {
      title: 'Bontle men’s shirt',
      price: 'R599.00',
      img: 'https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-2.jpg',
      link: 'https://www.wansatibrands.co.za/shop/fashion/african-print/bontle-mens-shirt/?v=eacb463a8002',
    },
    {
      title: 'Inspired by Oud Fleur- Tom Ford',
      price: 'R150.00 - R200.00',
      img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-Oud-Fleur-Photoroom.png?fit=800%2C800&ssl=1',
      link: 'https://www.wansatibrands.co.za/shop/fragrances/unisex/inspired-by-oud-fleur-tom-ford/?v=eacb463a8002',
      imageFit: 'contain' as const,
    },
  ];
  const cartRecommendations = newArrivalProducts;
  const productPagePathByTitle: Record<string, string> = {
    'Rhulani Dress': '/product/melania-dress',
    'Prisha Sets': '/product/wansati-signature-set',
    'Rhandzu Dress': '/product/melania-dress',
    'Pfukani Tsonga dress': '/product/melania-dress',
    "Botshelo men's shirt": '/product/amogelang-mens-shirt',
    "Amogelang men's shirt": '/product/amogelang-mens-shirt',
    'Bontle men’s shirt': '/product/amogelang-mens-shirt',
    'Inspired by Oud Fleur- Tom Ford': '/product/oud-fleur-inspired',
    'Inspired by White Aoud- Montale': '/product/oud-fleur-inspired',
    'Inspired by Baccarat Rouge 540- Maison Francis Kurkdjian': '/product/oud-fleur-inspired',
    'Inspired by Gucci Oud Gucci': '/product/oud-fleur-inspired',
  };

  const formatRand = (amount: number) => `R${amount.toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  const parseProductCardPrice = (priceLabel: string) => {
    const match = priceLabel.match(/\d[\d,]*(?:\.\d{2})?/);
    return match ? Number(match[0].replace(/,/g, '')) : 0;
  };
  const openWishlistItem = (item: WishlistItem) => {
    if (item.path) {
      navigateTo(item.path);
    }
  };

  const isDesktopDropdownOpen = activeDesktopDropdown !== null;
  const desktopHeaderOffset = isDesktopDropdownOpen && desktopDropdownScrollOrigin !== null
    ? Math.min(0, desktopDropdownScrollOrigin - currentScrollY)
    : 0;

  const openDesktopDropdown = (title: string) => {
    setActiveDesktopDropdown(title);
    setDesktopDropdownScrollOrigin((prev) => prev ?? window.scrollY);
    scrollStateRef.current.isDown = false;
    scrollStateRef.current.lastToggleTime = Date.now();
    setIsScrollingDown(false);
  };

  const closeDesktopDropdown = () => {
    setActiveDesktopDropdown(null);
    setDesktopDropdownScrollOrigin(null);
    scrollStateRef.current.isDown = false;
    scrollStateRef.current.lastToggleTime = Date.now();
    setIsScrollingDown(false);
  };

  const navigateTo = (path: string) => {
    const resolvedPath = path || '/';
    const url = new URL(resolvedPath, window.location.origin);
    const nextPath = url.pathname || '/';
    const nextSearch = url.search || '';

    if (window.location.pathname !== nextPath || window.location.search !== nextSearch) {
      window.history.pushState({}, '', `${nextPath}${nextSearch}`);
      setCurrentPath(nextPath);
      setCurrentSearch(nextSearch);
    }

    setActiveSidePanel(null);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsDesktopSearchActive(false);
    setActiveSearchIndex(-1);
    closeDesktopDropdown();
    syncNavVisibilityForPath(nextPath);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isSearchResultsPage) {
      setSiteSearchQuery(currentSearchQuery);
      setActiveSearchIndex(-1);
    }
  }, [currentSearchQuery, isSearchResultsPage]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!desktopSearchRef.current?.contains(event.target as Node)) {
        setIsDesktopSearchActive(false);
        setActiveSearchIndex(-1);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  useEffect(() => {
    setActiveSearchIndex(-1);
  }, [siteSearchQuery]);

  useEffect(() => {
    if (!isSearchOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isSearchOpen]);

  const handleSearchSubmit = (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setSiteSearchQuery(trimmedQuery);
    navigateTo(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleSearchResultSelect = (result: SearchResultItem) => {
    setIsSearchOpen(false);
    setIsDesktopSearchActive(false);
    setActiveSearchIndex(-1);

    if (result.isExternal) {
      window.location.assign(result.path);
      return;
    }

    navigateTo(result.path);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchSuggestions.length) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSearchSubmit(siteSearchQuery);
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveSearchIndex((previous) => (previous + 1) % searchSuggestions.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveSearchIndex((previous) => (previous <= 0 ? searchSuggestions.length - 1 : previous - 1));
      return;
    }

    if (event.key === 'Escape') {
      setIsDesktopSearchActive(false);
      setIsSearchOpen(false);
      setActiveSearchIndex(-1);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      if (activeSearchIndex >= 0) {
        handleSearchResultSelect(searchSuggestions[activeSearchIndex]);
        return;
      }

      handleSearchSubmit(siteSearchQuery);
    }
  };

  const renderSearchHighlight = (text: string, query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return text;

    const escapedQuery = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = text.match(new RegExp(escapedQuery, 'i'));

    if (!match || match.index === undefined) return text;

    const start = match.index;
    const end = start + match[0].length;

    return (
      <>
        {text.slice(0, start)}
        <span className="font-semibold text-stone-900">{text.slice(start, end)}</span>
        {text.slice(end)}
      </>
    );
  };

  const toggleMobileCategory = (title: string) => {
    setExpandedMobileCategories((prev) => (
      prev.includes(title)
        ? prev.filter((itemTitle) => itemTitle !== title)
        : [...prev, title]
    ));
  };

  const getProductCardPath = (title: string) => productPagePathByTitle[title] ?? '/product/wansati-signature-set';

  const handleRemoveFromPanel = (itemId: string) => {
    if (!isCartPanel) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
      return;
    }
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleCartQuantityChange = (itemId: string, delta: number) => {
    setCartItems((prev) => prev.map((item) => (
      item.id === itemId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    )));
  };

  const handleMoveWishlistToCart = (item: WishlistItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.title === item.title);

      if (existingItem) {
        return prev.map((cartItem) => (
          cartItem.title === item.title
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ));
      }

      return [
        ...prev,
        {
          id: `cart-${item.id}`,
          title: item.title,
          priceLabel: item.priceLabel,
          image: item.image,
          quantity: 1,
          unitPrice: item.numericPrice,
          imageFit: item.imageFit,
        },
      ];
    });
  };

  const handleAddAllWishlistToCart = () => {
    if (wishlistItems.length === 0) return;

    setCartItems((prev) => {
      const nextItems = [...prev];

      wishlistItems.forEach((item) => {
        const existingIndex = nextItems.findIndex((cartItem) => cartItem.title === item.title);

        if (existingIndex >= 0) {
          nextItems[existingIndex] = {
            ...nextItems[existingIndex],
            quantity: nextItems[existingIndex].quantity + 1,
          };
          return;
        }

        nextItems.push({
          id: `cart-${item.id}`,
          title: item.title,
          priceLabel: item.priceLabel,
          image: item.image,
          quantity: 1,
          unitPrice: item.numericPrice,
          imageFit: item.imageFit,
        });
      });

      return nextItems;
    });
  };

  const handleAddProductToCart = (item: {
    id: string;
    title: string;
    priceLabel: string;
    image: string;
    unitPrice: number;
    imageFit?: 'cover' | 'contain';
  }) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prev.map((cartItem) => (
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ));
      }

      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          priceLabel: item.priceLabel,
          image: item.image,
          quantity: 1,
          unitPrice: item.unitPrice,
          imageFit: item.imageFit,
        },
      ];
    });

    setActiveSidePanel('cart');
  };

  const handleAddProductToWishlist = (item: {
    id: string;
    title: string;
    priceLabel: string;
    numericPrice: number;
    image: string;
    imageFit?: 'cover' | 'contain';
    path?: string;
  }) => {
    setWishlistItems((prev) => {
      const exists = prev.some((wishlistItem) => wishlistItem.id === item.id);
      if (exists) {
        return prev;
      }

      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          priceLabel: item.priceLabel,
          numericPrice: item.numericPrice,
          image: item.image,
          imageFit: item.imageFit,
          path: item.path,
        },
      ];
    });

    setActiveSidePanel('wishlist');
  };

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] bg-[#c2a453] flex flex-col items-center justify-center p-8 overflow-hidden"
        >
          {/* Subtle Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px'
            }}
          />
          
          {/* Logo container with heartbeat pulse */}
          <motion.div
            animate={{ 
              scale: [1, 1.08, 1, 1.05, 1],
            }}
            transition={{ 
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.1, 0.2, 0.3, 1]
            }}
            className="relative w-40 md:w-56 aspect-square flex items-center justify-center mb-16"
          >
            <img 
              src="https://www.wansatibrands.co.za/wp-content/uploads/2024/11/WANSATI-LOGO-MARK-PNG@300x-1.png" 
              alt="Wansati Brands" 
              className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="flex items-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.2,
                }}
                className="w-1 h-1 bg-black"
              />
            ))}
          </div>
        </motion.div>
      ) : (
        <div
          key="main-content"
          className="font-sans text-stone-900 bg-[#fcfcf9] min-h-screen"
        >
          {/* Side Wishlist / Cart Drawer */}
          <AnimatePresence>
            {activeSidePanel && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveSidePanel(null)}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="fixed inset-0 bg-black/40 z-[100]"
                />
                <motion.aside
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] sm:max-w-[400px] lg:w-[440px] lg:max-w-[440px] xl:w-[460px] xl:max-w-[460px] bg-white z-[101] shadow-2xl flex flex-col"
                >
                  <div className="px-5 py-3 flex items-center justify-between border-b border-stone-100">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center text-stone-700">
                        {isCartPanel ? <ShoppingCart size={17} strokeWidth={1.6} /> : <Heart size={17} strokeWidth={1.6} />}
                      </span>
                      <div>
                        <h2 className="font-serif text-xl text-stone-900">
                          {isCartPanel ? 'Your Cart' : 'Wishlist'}
                        </h2>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
                          {isCartPanel
                            ? `${cartItemCount} item${cartItemCount === 1 ? '' : 's'}`
                            : `${wishlistItems.length} item${wishlistItems.length === 1 ? '' : 's'}`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveSidePanel(null)}
                      className="p-2 -mr-2 text-stone-500 hover:text-stone-900 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {isCartPanel ? (
                    cartItems.length > 0 ? (
                      <>
                        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b border-stone-100 pb-4 mb-4">
                              <div className="w-20 h-24 relative bg-white">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className={`absolute inset-0 w-full h-full ${item.imageFit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-1 gap-3">
                                  <h3 className="font-medium text-sm text-stone-900 leading-tight">{item.title}</h3>
                                  <button
                                    onClick={() => handleRemoveFromPanel(item.id)}
                                    className="shrink-0 text-red-600 transition-colors hover:text-red-800"
                                    aria-label={`Remove ${item.title}`}
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                                <p className="text-xs text-stone-500 mb-2">{item.priceLabel}</p>
                                <div className="mt-auto flex justify-between items-center gap-3">
                                  <div className="flex items-center border border-stone-200 text-sm">
                                    <button
                                      onClick={() => handleCartQuantityChange(item.id, -1)}
                                      className="px-2 py-1 text-stone-500 hover:text-black transition-colors"
                                    >
                                      -
                                    </button>
                                    <span className="px-2 py-1 text-xs font-medium min-w-[2rem] text-center">{item.quantity}</span>
                                    <button
                                      onClick={() => handleCartQuantityChange(item.id, 1)}
                                      className="px-2 py-1 text-stone-500 hover:text-black transition-colors"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <p className="font-medium text-sm text-stone-900 whitespace-nowrap">
                                    {formatRand(item.unitPrice * item.quantity)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="px-5 py-3 border-t border-stone-100 bg-stone-50">
                          <div className="flex justify-between items-center font-serif text-lg text-stone-900 mb-3">
                            <span>Subtotal</span>
                            <span>{formatRand(cartSubtotal)}</span>
                          </div>
                          <p className="mb-3 text-[10px] leading-relaxed text-stone-400">
                            Shipping and applicable taxes are calculated at checkout.
                          </p>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => navigateTo('/cart')}
                              className="flex-1 flex items-center justify-center text-center py-2.5 text-xs font-bold tracking-widest uppercase border border-stone-900 hover:bg-stone-900 hover:text-white transition-colors"
                            >
                              View Cart
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveSidePanel(null);
                                navigateTo('/checkout');
                              }}
                              className="btn-gold-textured flex-1 py-2.5 text-center text-xs font-bold tracking-widest uppercase"
                            >
                              Checkout
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
                        <ShoppingCart size={48} strokeWidth={1} className="text-stone-300 mb-4" />
                        <p className="text-stone-500 uppercase tracking-widest text-xs font-bold mb-6">Your cart is currently empty</p>
                        <button
                          onClick={() => setActiveSidePanel(null)}
                          className="btn-gold-textured w-full py-3.5 text-xs font-bold tracking-widest uppercase"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    )
                  ) : wishlistItems.length > 0 ? (
                    <div className="flex flex-1 flex-col min-h-0">
                      <div className="flex-1 overflow-y-auto px-5 py-4">
                        {wishlistItems.map((item) => (
                          <div key={item.id} className="flex gap-4 border-b border-stone-100 pb-4 mb-4">
                            <button
                              type="button"
                              onClick={() => openWishlistItem(item)}
                              disabled={!item.path}
                              className="w-20 h-24 relative group cursor-pointer bg-white disabled:cursor-default"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className={`absolute inset-0 w-full h-full ${item.imageFit === 'contain' ? 'object-contain p-2' : 'object-cover'} transition-transform duration-700 group-hover:scale-105`}
                                referrerPolicy="no-referrer"
                              />
                            </button>
                            <div className="flex-1 flex flex-col">
                              <div className="flex justify-between items-start mb-1 gap-3">
                                <button
                                  type="button"
                                  onClick={() => openWishlistItem(item)}
                                  disabled={!item.path}
                                  className="text-left font-medium text-sm text-stone-900 leading-tight transition-colors hover:text-stone-600 disabled:cursor-default disabled:hover:text-stone-900"
                                >
                                  {item.title}
                                </button>
                                <button
                                  onClick={() => handleRemoveFromPanel(item.id)}
                                  className="shrink-0 text-red-600 transition-colors hover:text-red-800"
                                  aria-label={`Remove ${item.title}`}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <p className="font-medium text-sm text-stone-900 mb-2 mt-auto">{item.priceLabel}</p>
                              <button
                                onClick={() => handleMoveWishlistToCart(item)}
                                className="btn-gold-textured w-full py-2 text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2"
                              >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-stone-100 bg-white px-5 py-4">
                        <button
                          type="button"
                          onClick={() => navigateTo('/wishlist')}
                          className="w-full border border-stone-900 py-3 text-center text-xs font-bold tracking-widest uppercase transition-colors hover:bg-stone-900 hover:text-white"
                        >
                          View Full Wishlist
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
                      <Heart size={48} strokeWidth={1} className="text-stone-300 mb-4" />
                      <p className="text-stone-500 uppercase tracking-widest text-xs font-bold mb-6">No items in your wishlist</p>
                      <button
                        type="button"
                        onClick={() => navigateTo('/wishlist')}
                        className="block text-center btn-gold-textured w-full py-3.5 text-xs font-bold tracking-widest uppercase"
                      >
                        View Full Wishlist
                      </button>
                    </div>
                  )}
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Side Navigation for Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[88%] max-w-[380px] bg-[#fcfcf9] z-[101] shadow-2xl flex flex-col"
            >
              <div className="px-5 py-5 sm:px-6 flex items-center justify-between border-b border-stone-100 bg-white">
                <button type="button" onClick={() => navigateTo('/')} className="transition-opacity hover:opacity-80">
                  <img 
                    src="https://www.wansatibrands.co.za/wp-content/uploads/2024/09/Wansati-Brands-Logo-e1758822665346.png" 
                    alt="Wansati Brands Logo" 
                    className="h-7 w-auto object-contain"
                  />
                </button>
                <button onClick={() => setIsMenuOpen(false)} className="flex h-11 w-11 items-center justify-center -mr-2 text-stone-500 hover:text-stone-900 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pt-5 pb-8">
                <div className="px-5 sm:px-6 mb-8">
                  <nav className="space-y-6">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-[0.22em] text-stone-400 mb-5">Discovery</p>
                      <ul className="space-y-5">
                        {navigation.map((item) => {
                          const hasSubcategories = item.subcategories.length > 0;
                          const isExpanded = expandedMobileCategories.includes(item.title);

                          return (
                            <li key={item.title} className={item.highlight ? 'pt-2' : undefined}>
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => navigateTo(item.path ?? getNestedProductListingPathByLabels(item.title))}
                                  className={`flex-1 py-1 text-left font-bold text-lg transition-colors ${
                                    item.highlight ? 'text-red-600 hover:text-red-500' : 'text-stone-900 hover:text-stone-600'
                                  }`}
                                >
                                  {item.title}
                                </button>
                                {hasSubcategories && (
                                  <button
                                    type="button"
                                    onClick={() => toggleMobileCategory(item.title)}
                                    aria-expanded={isExpanded}
                                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.title}`}
                                    className="flex h-10 w-10 shrink-0 items-center justify-center text-stone-500 transition-colors hover:text-stone-900"
                                  >
                                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                  </button>
                                )}
                              </div>
                              <AnimatePresence initial={false}>
                                {hasSubcategories && isExpanded && (
                                  <motion.ul
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.24, ease: 'easeInOut' }}
                                    className="mt-2 ml-3 space-y-1 overflow-hidden border-l border-stone-200 pl-4"
                                  >
                                    {item.subcategories.map((sub) => (
                                      <li key={sub.name}>
                                        <button
                                          type="button"
                                          onClick={() => navigateTo(getNestedProductListingPathByLabels(item.title, sub.name))}
                                          className="block py-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider"
                                        >
                                          {sub.name}
                                        </button>
                                      </li>
                                    ))}
                                    <li>
                                      <button
                                        type="button"
                                        onClick={() => navigateTo(getProductListingPathByLabel(item.title))}
                                        className="block py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-stone-400 underline underline-offset-4 transition-colors hover:text-stone-900"
                                      >
                                        {shopAllLabelByTitle[item.title] ?? `Shop All ${item.title}`}
                                      </button>
                                    </li>
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>

              <div className="p-5 sm:p-6 bg-white border-t border-stone-100 space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-[#fcfcf9] border border-stone-100 rounded-lg shadow-sm">
                  <User size={20} className="text-stone-400" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900">My Account</p>
                    <button
                      type="button"
                      onClick={() => navigateTo('/my-account')}
                      className="text-stone-500 text-xs hover:text-stone-900 underline underline-offset-2"
                    >
                      Sign In / Register
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-6 justify-center text-stone-400">
                  <a href="#" className="hover:text-stone-900 transition-colors"><Facebook size={20} /></a>
                  <a href="#" className="hover:text-stone-900 transition-colors"><Instagram size={20} /></a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[120] overflow-hidden bg-[rgba(252,252,249,0.98)] px-4 pt-4 pb-6 backdrop-blur-md"
          >
            <div className="mx-auto w-full max-w-2xl">
              <div className="sticky top-0 z-10 bg-[rgba(252,252,249,0.98)] py-2">
                <div>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleSearchSubmit(siteSearchQuery);
                    }}
                    className="relative"
                  >
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-900" />
                    <input
                      autoFocus
                      type="text"
                      value={siteSearchQuery}
                      onChange={(event) => setSiteSearchQuery(event.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      placeholder="What are you looking for?"
                      className="w-full border border-stone-900 bg-white py-3 pl-10 pr-12 text-sm focus:outline-none placeholder:text-stone-400"
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-900 hover:text-black"
                    >
                      <X size={20} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="pointer-events-none fixed inset-x-4 top-24 bottom-6 z-[130] sm:inset-x-6 sm:top-28">
              <div className="mx-auto h-full max-w-2xl">
                {siteSearchQuery.trim().length > 0 ? (
                  searchSuggestions.length > 0 ? (
                    <div className="pointer-events-auto flex h-full flex-col overflow-hidden border border-stone-200 bg-white shadow-[0_24px_64px_rgba(28,26,23,0.16)]">
                      <div className="flex items-center justify-between gap-4 border-b border-stone-100 px-4 py-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">Suggested Matches</p>
                          <p className="mt-1 text-xs text-stone-500">Tap a result or open the full search page.</p>
                        </div>
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b765e]">
                          {searchSuggestions.length} found
                        </span>
                      </div>
                      <ul className="flex-1 divide-y divide-stone-100 overflow-y-auto overscroll-contain">
                        {searchSuggestions.map((result, index) => (
                          <li key={result.id}>
                            <button
                              type="button"
                              onClick={() => handleSearchResultSelect(result)}
                              className={`grid w-full grid-cols-[76px_minmax(0,1fr)] items-start gap-4 px-4 py-4 text-left transition-colors ${
                                index === activeSearchIndex ? 'bg-[#f7f2ea]' : 'hover:bg-stone-50'
                              }`}
                            >
                              <div className="relative flex h-24 items-center justify-center overflow-hidden bg-stone-100">
                                {result.image ? (
                                  <img
                                    src={result.image}
                                    alt={result.title}
                                    className={`absolute inset-0 h-full w-full ${
                                      result.kind === 'product'
                                        ? result.imageFit === 'contain'
                                          ? 'object-contain p-3'
                                          : 'object-cover object-center'
                                        : result.imageFit === 'contain'
                                          ? 'object-contain p-2'
                                          : 'object-cover'
                                    }`}
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-stone-400">
                                    <Search className="h-4 w-4" strokeWidth={1.6} />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b765e]">
                                    {result.metaLabel}
                                  </span>
                                  {result.priceLabel ? (
                                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-stone-500">
                                      {result.priceLabel}
                                    </span>
                                  ) : null}
                                </div>
                                <p className="mt-2 text-sm font-medium leading-relaxed text-stone-800">
                                  {renderSearchHighlight(result.title, siteSearchQuery)}
                                </p>
                                <p className="mt-1 line-clamp-2 text-xs leading-6 text-stone-500">{result.description}</p>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-stone-200 bg-[#fcfaf5] px-4 py-4">
                        <button
                          type="button"
                          onClick={() => handleSearchSubmit(siteSearchQuery)}
                          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-700 transition-colors hover:text-stone-900"
                        >
                          View all results
                          <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pointer-events-auto border border-stone-200 bg-[#fcfaf5] px-4 py-5 shadow-[0_24px_64px_rgba(28,26,23,0.12)]">
                      <p className="text-sm text-stone-600">No quick matches found yet. Keep typing or press search to view the full results page.</p>
                    </div>
                  )
                ) : (
                  <div className="pointer-events-auto border border-stone-200 bg-[#fcfaf5] px-4 py-5 shadow-[0_24px_64px_rgba(28,26,23,0.12)]">
                    <p className="text-sm text-stone-600">Start typing a product name, collection, article topic, or page title.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center transition-all duration-300 ${isScrolled ? 'shadow-md border-b border-stone-200' : 'shadow-sm border-b border-stone-100'}`}
        style={{
          transform: desktopHeaderOffset === 0 ? undefined : `translateY(${desktopHeaderOffset}px)`,
          transition: 'transform 180ms cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: isDesktopDropdownOpen ? 'transform' : undefined,
        }}
      >
        {/* Top Row: Logo, Search, Icons */}
        <div className={`w-full max-w-[1440px] mx-auto px-4 sm:px-8 flex lg:grid lg:grid-cols-[220px_minmax(320px,560px)_220px] items-center justify-between gap-4 lg:gap-8 transition-all duration-300 ${isScrolled ? 'py-2 md:py-2.5' : 'py-3.5 md:py-4'}`}>
          {/* Mobile Hamburger (Visible on Tablet/Mobile) */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-stone-800 hover:text-stone-500 transition-colors"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="flex-shrink-0 md:flex-initial lg:justify-self-start transition-transform duration-300"
          >
            <img 
              src="https://www.wansatibrands.co.za/wp-content/uploads/2024/09/Wansati-Brands-Logo-e1758822665346.png" 
              alt="Wansati Brands Logo" 
              className={`w-auto object-contain mx-auto transition-all duration-300 ${isScrolled ? 'h-6 md:h-8' : 'h-8 md:h-10'}`}
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Search (Desktop) */}
          <div ref={desktopSearchRef} className="relative hidden w-full max-w-xl mx-auto lg:block">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSearchSubmit(siteSearchQuery);
              }}
              className="relative"
            >
              <input
                type="text"
                value={siteSearchQuery}
                onChange={(event) => setSiteSearchQuery(event.target.value)}
                onFocus={() => setIsDesktopSearchActive(true)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search products, collections, articles..."
                className="premium-input h-11 w-full border border-stone-300 pl-4 pr-14 text-sm placeholder:text-stone-400 focus:border-stone-400 focus:outline-none"
              />
              <button type="submit" className="absolute right-0 top-0 bottom-0 flex w-14 items-center justify-center bg-stone-900 text-white transition-colors hover:bg-black">
                <Search size={16} />
              </button>
            </form>

            <AnimatePresence>
              {isDesktopSearchActive && siteSearchQuery.trim().length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 right-0 top-full z-[95] mt-4 overflow-hidden border border-stone-200 bg-white shadow-[0_24px_64px_rgba(28,26,23,0.12)]"
                >
                  {searchSuggestions.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between gap-4 border-b border-stone-100 px-4 py-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">Suggested Matches</p>
                          <p className="mt-1 text-xs text-stone-500">Use the dropdown for a quick jump or open the full results page.</p>
                        </div>
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b765e]">
                          {searchSuggestions.length} found
                        </span>
                      </div>
                      <ul className="max-h-[26rem] divide-y divide-stone-100 overflow-y-auto">
                        {searchSuggestions.map((result, index) => (
                          <li key={result.id}>
                            <button
                              type="button"
                              onClick={() => handleSearchResultSelect(result)}
                              className={`grid w-full grid-cols-[76px_minmax(0,1fr)_auto] items-start gap-4 px-4 py-4 text-left transition-colors ${
                                index === activeSearchIndex ? 'bg-[#f7f2ea]' : 'hover:bg-stone-50'
                              }`}
                            >
                              <div className="relative flex h-20 items-center justify-center overflow-hidden bg-stone-100">
                                {result.image ? (
                                  <img
                                    src={result.image}
                                    alt={result.title}
                                    className={`absolute inset-0 h-full w-full ${
                                      result.kind === 'product'
                                        ? result.imageFit === 'contain'
                                          ? 'object-contain p-3'
                                          : 'object-cover object-center'
                                        : result.imageFit === 'contain'
                                          ? 'object-contain p-2'
                                          : 'object-cover'
                                    }`}
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-stone-400">
                                    <Search className="h-4 w-4" strokeWidth={1.6} />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b765e]">
                                    {result.metaLabel}
                                  </span>
                                  {result.priceLabel ? (
                                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-stone-500">
                                      {result.priceLabel}
                                    </span>
                                  ) : null}
                                </div>
                                <p className="mt-2 text-sm font-medium leading-relaxed text-stone-800">
                                  {renderSearchHighlight(result.title, siteSearchQuery)}
                                </p>
                                <p className="mt-1 line-clamp-2 text-xs leading-6 text-stone-500">{result.description}</p>
                              </div>
                              <span className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">
                                View
                                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-stone-200 bg-[#fcfaf5] px-4 py-4">
                        <button
                          type="button"
                          onClick={() => handleSearchSubmit(siteSearchQuery)}
                          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-700 transition-colors hover:text-stone-900"
                        >
                          View all results
                          <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="px-4 py-5">
                      <p className="text-sm text-stone-600">No quick matches found. Press enter to view full search results.</p>
                    </div>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Icons */}
          <div className="flex items-center justify-end space-x-4 md:space-x-6 lg:justify-self-end">
            {/* Search Icon (Mobile/Tablet) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="luxury-icon-control lg:hidden flex flex-col items-center justify-center cursor-pointer hover:text-stone-600"
            >
              <Search size={22} strokeWidth={1.5} />
            </button>

            {/* Account (Desktop Only) */}
            <div className="luxury-icon-control hidden lg:flex flex-col items-center justify-center cursor-pointer hover:text-stone-600 relative group z-[80] hover:z-[80] focus-within:z-[80]">
              <User size={20} strokeWidth={1.5} />
              <span className="text-[10px] uppercase font-medium mt-1">Account</span>
              
              {/* Account Dropdown */}
              <div className="absolute top-full right-0 pt-5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-[90]">
                <div className="max-w-[calc(100vw-2rem)] min-w-[220px] w-[min(30vw,320px)] border border-stone-100 bg-white py-4 shadow-xl backdrop-blur-sm">
                  <div className="mb-2 border-b border-stone-50 px-6 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-400">Welcome</p>
                  </div>
                  <ul className="text-[13px] font-bold uppercase tracking-[0.14em] text-stone-700">
                    <li>
                      <button
                        type="button"
                        onClick={() => navigateTo('/my-account')}
                        className="block w-full px-6 py-3 text-left hover:bg-stone-50 hover:text-stone-900 transition-colors"
                      >
                        Sign In
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => navigateTo('/my-account/register')}
                        className="block w-full px-6 py-3 text-left hover:bg-stone-50 hover:text-stone-900 transition-colors"
                      >
                        Register
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveSidePanel('wishlist')}
              className="luxury-icon-control relative flex flex-col items-center justify-center cursor-pointer hover:text-stone-600"
              aria-label="Open wishlist"
            >
              <Heart size={20} strokeWidth={1.5} />
              <span className="hidden lg:block text-[10px] uppercase font-medium mt-1">Wishlist</span>
              <span className="absolute -top-1 -right-1 bg-[#c2a453] text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
                {wishlistItems.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSidePanel('cart')}
              className="luxury-icon-control flex flex-col items-center justify-center cursor-pointer hover:text-stone-600 relative"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
              <span className="hidden lg:block text-[10px] uppercase font-medium mt-1">Cart</span>
              <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            </button>
          </div>
        </div>

        {/* Main Nav */}
        <div
          className={`w-full justify-center ${isScrollingDown && !isDesktopDropdownOpen ? 'hidden' : 'flex'}`}
          aria-hidden={isScrollingDown && !isDesktopDropdownOpen}
        >
          <nav className={`relative hidden w-full max-w-[1240px] mx-auto px-4 xl:px-0 lg:flex items-center justify-center gap-6 xl:gap-8 font-semibold text-[0.92rem] xl:text-[1rem] tracking-[0.15em] uppercase transition-all duration-300 ${isScrolled ? 'py-1 text-stone-700' : 'py-2 text-stone-800'}`}>
            {navigation.map((item) => (
              <div
                key={item.title}
                className="group py-1.5"
                onMouseEnter={() => {
                  if (item.subcategories.length > 0) {
                    openDesktopDropdown(item.title);
                  }
                }}
                onMouseLeave={() => {
                  if (item.subcategories.length > 0) {
                    closeDesktopDropdown();
                  }
                }}
                onFocusCapture={() => {
                  if (item.subcategories.length > 0) {
                    openDesktopDropdown(item.title);
                  }
                }}
                onBlurCapture={(event) => {
                  if (
                    item.subcategories.length > 0 &&
                    !event.currentTarget.contains(event.relatedTarget as Node | null)
                  ) {
                    closeDesktopDropdown();
                  }
                }}
              >
                <button
                  type="button"
                  onClick={() => navigateTo(item.path ?? getNestedProductListingPathByLabels(item.title))}
                  className={`premium-nav-link transition-colors flex items-center gap-1 ${
                    item.highlight ? 'text-red-600 hover:text-red-500' : 'hover:text-stone-500'
                  }`}
                >
                  {item.title}
                </button>
                
                {item.subcategories.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-[60]">
                    <div className="max-w-[calc(100vw-2rem)] w-[min(88vw,860px)] border border-stone-100 bg-white px-7 py-7 shadow-2xl backdrop-blur-sm lg:px-8 xl:px-10 xl:py-8">
                      <div className="mb-6 border-b border-stone-50 pb-3 text-xs font-bold tracking-[0.24em] text-stone-400">
                        Explore {item.title}
                      </div>
                      <ul className="space-y-5">
                        {item.subcategories.map((sub) => (
                          <li key={sub.name}>
                            <button
                              type="button"
                              onClick={() => navigateTo(getNestedProductListingPathByLabels(item.title, sub.name))}
                              className="group/sub flex w-full items-center justify-between gap-8 text-left text-stone-600 transition-colors hover:text-stone-900"
                            >
                              <span className="pr-6 text-[15px] font-bold tracking-[0.14em] group-hover/sub:translate-x-1 transition-transform">{sub.name}</span>
                              {'units' in sub && (
                                <span className="ml-auto min-w-[3rem] text-right text-[13px] font-mono tracking-[0.08em] text-stone-300">({sub.units})</span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8 border-t border-stone-100 pt-5">
                        <button
                          type="button"
                          onClick={() => navigateTo(getProductListingPathByLabel(item.title))}
                          className="text-xs font-bold text-stone-400 transition-colors tracking-[0.14em] underline underline-offset-4 hover:text-stone-900"
                        >
                          {shopAllLabelByTitle[item.title] ?? `Shop All ${item.title}`}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {isProductPage ? (
          <SingleProductPage
            currentPath={currentPath}
            navigateTo={navigateTo}
            onAddToCart={handleAddProductToCart}
            onAddToWishlist={handleAddProductToWishlist}
          />
        ) : isShopPage ? (
          <ProductListingPage
            currentPath={currentPath}
            navigateTo={navigateTo}
            onAddToWishlist={handleAddProductToWishlist}
          />
        ) : isCollectionPage ? (
          <CollectionPage
            currentPath={currentPath}
            navigateTo={navigateTo}
            onAddToWishlist={handleAddProductToWishlist}
          />
        ) : isAboutPage ? (
          <AboutPage navigateTo={navigateTo} />
        ) : isLostPasswordPage ? (
          <LostPasswordPage navigateTo={navigateTo} mode="request" />
        ) : isResetPasswordPage ? (
          <LostPasswordPage navigateTo={navigateTo} mode="reset" />
        ) : isAuthPage ? (
          <AuthPage navigateTo={navigateTo} mode={authMode} />
        ) : isBlogArticlePage ? (
          <BlogArticlePage navigateTo={navigateTo} post={activeBlogPost!} />
        ) : isBlogPage ? (
          <BlogPage navigateTo={navigateTo} />
        ) : isContactPage ? (
          <ContactPage navigateTo={navigateTo} />
        ) : isPrivacyPage ? (
          <PrivacyPolicyPage navigateTo={navigateTo} />
        ) : isTermsPage ? (
          <TermsAndConditionsPage navigateTo={navigateTo} />
        ) : isReturnsPage ? (
          <ReturnsPolicyPage navigateTo={navigateTo} />
        ) : isSearchResultsPage ? (
          <SearchResultsPage
            query={currentSearchQuery}
            navigateTo={navigateTo}
            onSearchSubmit={handleSearchSubmit}
            onSelectResult={handleSearchResultSelect}
          />
        ) : isCheckoutPage ? (
          <CheckoutPage
            navigateTo={navigateTo}
            cartItems={cartItems}
            cartSubtotal={cartSubtotal}
            deliveryFee={cartDeliveryFee}
            formatRand={formatRand}
            returnPolicyUrl={returnPolicyUrl}
          />
        ) : isWishlistPage ? (
          <>
            <section className="relative overflow-hidden border-b border-stone-200 bg-[#f4ecdf]">
              <div className="absolute inset-0 opacity-80" style={{ background: 'radial-gradient(circle at top right, rgba(194, 164, 83, 0.18), transparent 38%), linear-gradient(135deg, rgba(255, 255, 255, 0.52), rgba(244, 236, 223, 0.9))' }} />
              <div className="relative max-w-[1200px] mx-auto px-4 sm:px-8 py-14 md:py-18">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                  <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b765e]">Wishlist</p>
                      <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">Your saved favourites.</h1>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
                      <button type="button" onClick={() => navigateTo('/')} className="transition-colors hover:text-stone-900">
                        Home
                      </button>
                      <ArrowRight size={14} strokeWidth={1.5} />
                      <span className="text-stone-900">Wishlist</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="max-w-[1200px] mx-auto px-4 py-12 sm:px-8 md:py-16">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {wishlistItems.length > 0 ? (
                  <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1">
                      <div className="hidden md:grid grid-cols-12 gap-4 border-b border-stone-200 pb-4 mb-6 text-xs font-bold tracking-widest uppercase text-stone-400">
                        <div className="col-span-7">Product</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-3 text-right">Actions</div>
                      </div>

                      {wishlistItems.map((item) => (
                        <div key={item.id} className="group relative flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center py-6 border-b border-stone-200 mb-4 md:mb-0">
                          <div className="col-span-7 flex gap-6 w-full">
                            <button
                              type="button"
                              onClick={() => handleRemoveFromPanel(item.id)}
                              className="absolute top-0 right-0 p-2 text-red-600 transition-colors hover:text-red-800 md:relative md:top-auto md:right-auto md:p-0"
                              aria-label={`Remove ${item.title}`}
                            >
                              <Trash2 size={18} />
                            </button>
                            <button
                              type="button"
                              onClick={() => openWishlistItem(item)}
                              disabled={!item.path}
                              className="w-24 h-32 md:w-32 md:h-40 relative shrink-0 disabled:cursor-default"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className={`absolute inset-0 w-full h-full ${item.imageFit === 'contain' ? 'object-contain p-3' : 'object-cover'}`}
                                referrerPolicy="no-referrer"
                              />
                            </button>
                            <div className="flex flex-col justify-center">
                              <button
                                type="button"
                                onClick={() => openWishlistItem(item)}
                                disabled={!item.path}
                                className="text-left font-medium text-sm md:text-base text-stone-900 mb-1 transition-colors hover:text-stone-600 disabled:cursor-default disabled:hover:text-stone-900"
                              >
                                {item.title}
                              </button>
                            </div>
                          </div>

                          <div className="col-span-2 text-sm text-stone-900 text-left md:text-center font-medium w-full md:w-auto mt-4 md:mt-0 flex justify-between md:block">
                            <span className="md:hidden text-stone-400 text-xs">Price:</span>
                            {item.priceLabel}
                          </div>

                          <div className="col-span-3 w-full md:w-auto mt-2 md:mt-0 flex flex-col gap-2 md:justify-end">
                            {item.path ? (
                              <button
                                type="button"
                                onClick={() => openWishlistItem(item)}
                                className="border border-stone-300 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                              >
                                View Product
                              </button>
                            ) : null}
                            <button
                              type="button"
                              onClick={() => handleMoveWishlistToCart(item)}
                              className="btn-gold-textured px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className="mt-8">
                        <button
                          type="button"
                          onClick={() => navigateTo('/')}
                          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          <ArrowRight size={16} strokeWidth={1.6} className="rotate-180" />
                          Continue Shopping
                        </button>
                      </div>
                    </div>

                    <div className="w-full lg:w-[380px] shrink-0">
                      <div className="bg-stone-100 p-6 md:p-8 border border-stone-200">
                        <h2 className="font-serif text-2xl text-stone-900 mb-6 border-b border-stone-200 pb-4">Wishlist Summary</h2>

                        <div className="space-y-4 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-stone-500">Saved items</span>
                            <span className="font-medium">{wishlistItems.length}</span>
                          </div>
                          <div className="flex justify-between text-sm border-b border-stone-200 pb-4">
                            <span className="text-stone-500">Estimated value</span>
                            <span className="font-medium">{formatRand(wishlistEstimatedValue)}</span>
                          </div>

                          <div className="flex justify-between items-end pt-2">
                            <span className="text-base font-bold">Total value</span>
                            <span className="font-serif text-2xl">{formatRand(wishlistEstimatedValue)}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            handleAddAllWishlistToCart();
                            navigateTo('/cart');
                          }}
                          className="btn-gold-textured w-full py-4 text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all mb-4"
                        >
                          Add All to Cart & Review
                        </button>

                        <div className="border-t border-stone-200 pt-5 space-y-4">
                          <button
                            type="button"
                            onClick={() => navigateTo('/collections')}
                            className="flex w-full items-center justify-between gap-3 text-[11px] uppercase tracking-[0.24em] text-stone-500 transition-colors hover:text-stone-900"
                          >
                            <span>Continue Shopping</span>
                            <ArrowRight size={14} strokeWidth={1.6} />
                          </button>
                          <button
                            type="button"
                            onClick={() => navigateTo('/cart')}
                            className="flex w-full items-center justify-between gap-3 text-[11px] uppercase tracking-[0.24em] text-stone-500 transition-colors hover:text-stone-900"
                          >
                            <span>View Cart</span>
                            <ArrowRight size={14} strokeWidth={1.6} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-12 md:py-14 bg-stone-50 border border-stone-100 rounded-sm">
                    <Heart size={64} strokeWidth={1} className="text-stone-300 mb-6" />
                    <h2 className="font-serif text-2xl text-stone-900 mb-2">Your wishlist is empty</h2>
                    <p className="text-stone-500 mb-8 max-w-md">
                      Looks like you have not saved any items yet. Discover our exclusive collections.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigateTo('/collections')}
                      className="btn-gold-textured px-8 py-3.5 text-xs font-bold tracking-widest uppercase"
                    >
                      Browse Collections
                    </button>
                  </div>
                )}
              </motion.div>
            </section>

            <section className="border-t border-stone-200 bg-[#fcfaf5] py-14 md:py-16">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
                <div className="mb-8 md:mb-10 text-center">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Discover More</p>
                  <h2 className="font-serif text-3xl md:text-4xl text-stone-900">
                    {wishlistItems.length > 0 ? 'You May Also Like' : 'New Arrivals'}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
                  {newArrivalProducts.slice(0, 4).map((product) => {
                    const internalPath = getProductCardPath(product.title);

                    return (
                      <a
                        key={product.title}
                        href={internalPath ?? product.link}
                        target={internalPath ? undefined : '_blank'}
                        rel={internalPath ? undefined : 'noopener noreferrer'}
                        onClick={internalPath ? (event) => {
                          event.preventDefault();
                          navigateTo(internalPath);
                        } : undefined}
                        className="luxury-product-card group flex h-full flex-col"
                      >
                        <div className="luxury-image-frame relative mb-4 aspect-[3/4] overflow-hidden bg-stone-100 md:mb-5">
                          <img
                            src={product.img}
                            alt={product.title}
                            className={`absolute inset-0 h-full w-full ${product.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'} transition-transform duration-700 group-hover:scale-105`}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <h3 className="mb-1 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-stone-800">
                          {product.title}
                        </h3>
                        <p className="mb-3 text-sm font-semibold text-stone-500">{product.price}</p>
                        <span className="btn-gold-textured premium-select-button mt-auto flex w-full items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-widest">
                          <ShoppingCart className="h-3.5 w-3.5" />
                          <span>Select Options</span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        ) : isCartPage ? (
          <>
            <section className="relative overflow-hidden border-b border-stone-200 bg-[#f4ecdf]">
              <div className="absolute inset-0 opacity-80" style={{ background: 'radial-gradient(circle at top right, rgba(194, 164, 83, 0.18), transparent 38%), linear-gradient(135deg, rgba(255, 255, 255, 0.52), rgba(244, 236, 223, 0.9))' }} />
              <div className="relative max-w-[1200px] mx-auto px-4 sm:px-8 py-14 md:py-18">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                  <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b765e]">Shopping Cart</p>
                      <h1 className="font-serif text-3xl md:text-5xl text-stone-900">Review your cart.</h1>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
                      <button type="button" onClick={() => navigateTo('/')} className="transition-colors hover:text-stone-900">
                        Home
                      </button>
                      <ArrowRight size={14} strokeWidth={1.5} />
                      <span className="text-stone-900">Cart</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <section className={`max-w-[1200px] mx-auto px-4 sm:px-8 py-12 md:py-16 ${cartItems.length > 0 ? 'min-h-[60vh]' : ''}`}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {cartItems.length > 0 ? (
                  <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1">
                      <div className="hidden md:grid grid-cols-12 gap-4 border-b border-stone-200 pb-4 mb-6 text-xs font-bold tracking-widest uppercase text-stone-400">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-right">Total</div>
                      </div>

                      {cartItems.map((item) => (
                        <div key={item.id} className="group relative flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center py-6 border-b border-stone-200 mb-4 md:mb-0">
                          <div className="col-span-6 flex gap-6 w-full">
                            <button
                              type="button"
                              onClick={() => setCartItems((prev) => prev.filter((cartItem) => cartItem.id !== item.id))}
                              className="absolute top-0 right-0 p-2 text-red-600 transition-colors hover:text-red-800 md:relative md:top-auto md:right-auto md:p-0"
                              aria-label={`Remove ${item.title}`}
                            >
                              <Trash2 size={18} />
                            </button>
                            <div className="w-24 h-32 md:w-32 md:h-40 relative shrink-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                className={`absolute inset-0 w-full h-full ${item.imageFit === 'contain' ? 'object-contain p-3' : 'object-cover'}`}
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex flex-col justify-center">
                              <h3 className="font-medium text-sm md:text-base text-stone-900 mb-1">{item.title}</h3>
                            </div>
                          </div>

                          <div className="col-span-2 text-sm text-stone-900 text-left md:text-center font-medium w-full md:w-auto mt-4 md:mt-0 flex justify-between md:block">
                            <span className="md:hidden text-stone-400 text-xs">Price:</span>
                            {formatRand(item.unitPrice)}
                          </div>

                          <div className="col-span-2 flex justify-start md:justify-center w-full md:w-auto mt-2 md:mt-0">
                            <div className="flex items-center border border-stone-200 text-sm w-fit">
                              <button
                                type="button"
                                onClick={() => handleCartQuantityChange(item.id, -1)}
                                className="px-3 py-1.5 text-stone-400 hover:text-stone-900 transition-colors"
                                aria-label={`Decrease quantity of ${item.title}`}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-4 py-1.5 font-medium">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => handleCartQuantityChange(item.id, 1)}
                                className="px-3 py-1.5 text-stone-400 hover:text-stone-900 transition-colors"
                                aria-label={`Increase quantity of ${item.title}`}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>

                          <div className="col-span-2 mt-2 w-full md:mt-0 md:w-auto">
                            <div className="flex items-center justify-between border border-stone-200 bg-stone-100 px-3 py-2 text-sm font-bold text-stone-900 lg:hidden">
                              <span className="text-xs text-stone-500">Total:</span>
                              <span>{formatRand(item.unitPrice * item.quantity)}</span>
                            </div>
                            <div className="hidden text-right text-sm font-bold text-stone-900 lg:block">
                              {formatRand(item.unitPrice * item.quantity)}
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="mt-8">
                        <button
                          type="button"
                          onClick={() => navigateTo('/')}
                          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          <ArrowRight size={16} strokeWidth={1.6} className="rotate-180" />
                          Continue Shopping
                        </button>
                      </div>
                    </div>

                    <div className="w-full lg:w-[380px] shrink-0">
                      <div className="bg-stone-100 p-6 md:p-8 border border-stone-200">
                        <h2 className="font-serif text-2xl text-stone-900 mb-6 border-b border-stone-200 pb-4">Order Summary</h2>

                        <div className="space-y-4 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-stone-500">Subtotal</span>
                            <span className="font-medium">{formatRand(cartSubtotal)}</span>
                          </div>
                          <div className="flex justify-between text-sm border-b border-stone-200 pb-4">
                            <span className="text-stone-500">
                              Standard Shipping
                              <br />
                              <span className="text-[10px] uppercase tracking-widest text-stone-400">5 - 7 Days for South Africa</span>
                            </span>
                            <span className="font-medium">{cartDeliveryFee === 0 ? 'Free' : formatRand(cartDeliveryFee)}</span>
                          </div>

                          <div className="py-2 border-b border-stone-200">
                            <button
                              type="button"
                              onClick={() => setShowCoupon(!showCoupon)}
                              className="flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 uppercase tracking-widest transition-colors w-full"
                            >
                              <Tag size={14} />
                              Add a Coupon
                              {showCoupon ? <ChevronUp size={14} className="ml-auto" /> : <ChevronDown size={14} className="ml-auto" />}
                            </button>
                            <AnimatePresence initial={false}>
                              {showCoupon && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden mt-3"
                                >
                                  <div className="flex flex-col gap-2 sm:flex-row">
                                    <input
                                      type="text"
                                      placeholder="Coupon Code"
                                      className="min-w-0 flex-1 bg-white border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-400"
                                    />
                                    <button className="shrink-0 bg-stone-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">
                                      Apply
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className="flex justify-between items-end pt-2">
                            <span className="text-base font-bold">Total</span>
                            <span className="font-serif text-2xl">{formatRand(cartTotal)}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => navigateTo('/checkout')}
                          className="btn-gold-textured w-full py-4 text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all mb-4"
                        >
                          Proceed to Checkout
                        </button>

                        <div className="border-t border-stone-200 pt-5 space-y-4">
                          <button
                            type="button"
                            onClick={() => navigateTo(returnPolicyUrl)}
                            className="flex w-full items-center justify-between gap-3 text-[11px] uppercase tracking-[0.24em] text-stone-500 transition-colors hover:text-stone-900"
                          >
                            return policy
                            <ArrowRight size={12} strokeWidth={1.6} />
                          </button>

                          <div className="h-px bg-stone-200" />

                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">Accepted Payments</span>
                              <ShieldCheck size={16} strokeWidth={1.8} className="text-[#8b765e] shrink-0" />
                            </div>

                            <div className="flex items-center text-xs text-stone-500">
                              <img
                                src={payfastLogo}
                                alt="Payfast"
                                className="h-5 w-auto shrink-0 opacity-80"
                              />
                            </div>

                            <div className="flex items-center justify-between gap-3">
                              <img
                                src={yocoLogo}
                                alt="Yoco"
                                className="h-4 w-auto shrink-0 opacity-85"
                              />
                              <div className="flex w-full flex-wrap items-center justify-end gap-x-1.5 gap-y-2">
                                {yocoAcceptedCards.map((card) => (
                                  <img
                                    key={card.name}
                                    src={card.logo}
                                    alt={card.name}
                                    title={card.name}
                                    className={`${card.className} block w-auto max-h-8 shrink-0 object-contain opacity-90`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-12 md:py-14 bg-stone-50 border border-stone-100 rounded-sm">
                    <ShoppingBag size={64} strokeWidth={1} className="text-stone-300 mb-6" />
                    <h2 className="font-serif text-2xl text-stone-900 mb-2">Your cart is empty</h2>
                    <p className="text-stone-500 mb-8 max-w-md">
                      Looks like you haven't added any items to your cart yet. Discover our exclusive collections.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigateTo('/')}
                      className="btn-gold-textured px-8 py-3.5 text-xs font-bold tracking-widest uppercase"
                    >
                      Return to Shop
                    </button>
                  </div>
                )}
              </motion.div>
            </section>

            {cartItems.length > 0 ? (
              <section className="border-t border-stone-200 bg-[#fcfaf5] py-14 md:py-16">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
                  <div className="mb-8 md:mb-10 text-center">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Discover More</p>
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-900">You May Also Like</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
                    {cartRecommendations.map((product) => {
                      const internalPath = getProductCardPath(product.title);

                      return (
                        <a
                          key={product.title}
                          href={internalPath ?? product.link}
                          target={internalPath ? undefined : '_blank'}
                          rel={internalPath ? undefined : 'noopener noreferrer'}
                          onClick={internalPath ? (event) => {
                            event.preventDefault();
                            navigateTo(internalPath);
                          } : undefined}
                          className="luxury-product-card group flex h-full flex-col"
                        >
                        <div className="luxury-image-frame relative mb-4 aspect-[3/4] overflow-hidden bg-stone-100 md:mb-5">
                          <img
                            src={product.img}
                            alt={product.title}
                            className={`absolute inset-0 h-full w-full ${product.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'} transition-transform duration-700 group-hover:scale-105`}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <h3 className="mb-1 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-stone-800">
                          {product.title}
                        </h3>
                        <p className="mb-3 text-sm font-semibold text-stone-500">{product.price}</p>
                        <span className="btn-gold-textured premium-select-button mt-auto flex w-full items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-widest">
                          <ShoppingCart className="h-3.5 w-3.5" />
                          <span>Select Options</span>
                        </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </section>
            ) : (
              <section className="border-t border-stone-200 bg-[#fcfaf5] py-14 md:py-16">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
                  <div className="mb-8 md:mb-10 text-center">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Discover More</p>
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-900">New Arrivals</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
                    {newArrivalProducts.slice(0, 4).map((product) => {
                      const internalPath = getProductCardPath(product.title);

                      return (
                        <a
                          key={product.title}
                          href={internalPath ?? product.link}
                          target={internalPath ? undefined : '_blank'}
                          rel={internalPath ? undefined : 'noopener noreferrer'}
                          onClick={internalPath ? (event) => {
                            event.preventDefault();
                            navigateTo(internalPath);
                          } : undefined}
                          className="luxury-product-card group flex h-full flex-col"
                        >
                        <div className="luxury-image-frame relative mb-4 aspect-[3/4] overflow-hidden bg-stone-100 md:mb-5">
                          <img
                            src={product.img}
                            alt={product.title}
                            className={`absolute inset-0 h-full w-full ${product.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'} transition-transform duration-700 group-hover:scale-105`}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <h3 className="mb-1 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-stone-800">
                          {product.title}
                        </h3>
                        <p className="mb-3 text-sm font-semibold text-stone-500">{product.price}</p>
                        <span className="btn-gold-textured premium-select-button mt-auto flex w-full items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-widest">
                          <ShoppingCart className="h-3.5 w-3.5" />
                          <span>Select Options</span>
                        </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            <section className="bg-[#fcfaf5] py-16 md:py-24 border-t border-stone-200">
              <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
                <img
                  src="https://www.wansatibrands.co.za/wp-content/uploads/2023/09/icon.svg"
                  alt="Wansati Icon"
                  className="w-16 h-16 md:w-20 md:h-20 mb-8 mx-auto opacity-90"
                  referrerPolicy="no-referrer"
                />
                <h2 className="font-serif text-3xl md:text-4xl text-[#2a2620] mb-4">
                  Join the Wansati Family
                </h2>
                <p className="text-[#4a453c] text-sm mb-8 max-w-lg mx-auto leading-relaxed">
                  Subscribe to receive updates, access to exclusive deals, and more. Be the first to know about our newest arrivals.
                </p>
                <form className="flex w-full flex-col sm:flex-row max-w-md mx-auto gap-4 sm:gap-0" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="premium-input flex-1 bg-transparent border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-500 placeholder:text-stone-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#1c1a17] text-white px-8 py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-stone-800 transition-colors sm:border-l-0"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </section>
          </>
        ) : isHomePage ? (
          <>
        {/* 1. Hero */}
        <section className="relative w-full h-[76vh] min-h-[600px] md:h-[88vh] md:min-h-[760px] bg-[#f2efe9] flex items-center justify-center overflow-hidden">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                idx === currentHeroIdx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Wansati Hero Look ${idx + 1}`}
                className="w-full h-full object-cover object-top md:object-[center_15%]"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-5 text-center mt-12 md:mt-20">
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="premium-title font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.04] drop-shadow-md"
            >
              Elegance. Presence. Power.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="text-white/95 max-w-2xl text-sm md:text-base lg:text-lg mb-10 drop-shadow leading-relaxed"
            >
              Shop exclusive African-inspired fashion, signature scents, luxury bodycare, and refined handbags, all crafted by Wansati Brands with precision, presence, and timeless elegance.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a
                href={productListingPath()}
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo(productListingPath());
                }}
                className="btn-gold-textured px-8 py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-xl"
              >
                Shop All Products
              </a>
              <a
                href={collectionPath()}
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo(collectionPath());
                }}
                className="px-8 py-3.5 text-xs font-bold tracking-[0.2em] uppercase border border-white text-white hover:bg-white hover:text-stone-900 transition-colors"
              >
                Explore Collections
              </a>
            </motion.div>
          </div>

          <div className="absolute bottom-6 flex space-x-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentHeroIdx(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentHeroIdx ? 'bg-white w-6' : 'bg-white/50 w-2 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* 2. Shop by Category */}
        <section id="shop-by-category" className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12 md:py-16 lg:py-20">
          <div className="text-center mb-9 md:mb-11">
            <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26]">Shop by Category</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6"
          >
            {[
              {
                title: 'Women',
                cta: 'Shop Now',
                img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?w=864&ssl=1',
                srcSet: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?w=864&ssl=1 864w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?resize=240%2C300&ssl=1 240w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?resize=768%2C960&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?resize=819%2C1024&ssl=1 819w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?resize=1229%2C1536&ssl=1 1229w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?resize=1639%2C2048&ssl=1 1639w',
              },
              {
                title: 'Men',
                cta: 'Shop Now',
                img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?w=2048&ssl=1',
                srcSet: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?w=2048&ssl=1 2048w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=240%2C300&ssl=1 240w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=819%2C1024&ssl=1 819w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=768%2C960&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=1229%2C1536&ssl=1 1229w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=1639%2C2048&ssl=1 1639w',
              },
              {
                title: 'Kids',
                cta: 'Shop Now',
                img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?w=864&ssl=1',
                srcSet: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?w=864&ssl=1 864w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?resize=240%2C300&ssl=1 240w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?resize=768%2C960&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?resize=819%2C1024&ssl=1 819w',
              },
              {
                title: 'Fragrance',
                cta: 'Shop Now',
                img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?w=2047&ssl=1',
                srcSet: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?w=2047&ssl=1 2047w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?resize=240%2C300&ssl=1 240w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?resize=768%2C960&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?resize=819%2C1024&ssl=1 819w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?resize=1228%2C1536&ssl=1 1228w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?resize=1638%2C2048&ssl=1 1638w',
              },
              {
                title: 'Body Care',
                cta: 'Shop Now',
                img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?w=1181&ssl=1',
                srcSet: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?w=1181&ssl=1 1181w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?resize=800%2C800&ssl=1 800w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?resize=150%2C150&ssl=1 150w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?resize=300%2C300&ssl=1 300w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?resize=768%2C768&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?resize=1024%2C1024&ssl=1 1024w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?resize=600%2C600&ssl=1 600w',
              },
              {
                title: 'Home & Living',
                cta: 'Shop Now',
                img: 'https://assets.superbalistcdn.co.za/798x1150/filters:quality(90):format(jpg)/4795718/original.jpg',
                path: '/404',
              },
            ].map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="luxury-card relative group cursor-pointer w-full overflow-hidden bg-stone-50 flex min-h-full flex-col items-center border border-stone-100 shadow-sm hover:shadow-md"
                onClick={() => navigateTo(cat.path ?? getCollectionPathByLabel(cat.title))}
                onMouseLeave={() => setRevealedCategoryIdx(null)}
              >
                <div className="luxury-image-frame w-[90%] aspect-[4/5] mt-3 md:mt-4 relative overflow-hidden shadow-sm">
                  <img
                    src={cat.img}
                    srcSet={cat.srcSet}
                    sizes={cat.srcSet ? "(max-width: 768px) 50vw, 20vw" : undefined}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    type="button"
                    aria-label={`Reveal ${cat.title} shop action`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setRevealedCategoryIdx((currentIdx) => currentIdx === idx ? null : idx);
                    }}
                    className={`luxury-floating-cart absolute top-2 right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-black backdrop-blur-sm hover:bg-white md:h-10 md:w-10 ${
                      revealedCategoryIdx === idx ? 'opacity-0 pointer-events-none' : 'opacity-100 group-hover:opacity-0 group-hover:pointer-events-none'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <div className={`absolute inset-0 bg-black/15 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] ${
                    revealedCategoryIdx === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    <motion.button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        navigateTo(cat.path ?? getCollectionPathByLabel(cat.title));
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-gold-textured px-3 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-bold tracking-widest uppercase shadow-sm whitespace-nowrap"
                    >
                      {cat.cta}
                    </motion.button>
                  </div>
                </div>
                <div className="min-h-14 py-4 px-2 w-full flex items-center justify-center">
                  <h3 className="font-sans font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#1c1a17]">
                    {cat.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 3. New Arrivals */}
        <section id="new-arrivals" className="max-w-[1400px] mx-auto px-4 sm:px-8 pb-16 md:pb-20 pt-6 md:pt-10 space-y-16 md:space-y-20">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-4">
              New Arrivals
            </h2>
            <div className="h-1 w-20 bg-stone-300 mx-auto" />
          </div>

          {/* Category: Dresses */}
          <div>
            <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-stone-200 pb-4">
              <h3 className="font-serif text-2xl text-stone-800 tracking-tight">
                Dresses
              </h3>
              <button
                type="button"
                onClick={() => navigateTo(getProductListingPathByLabel('Dresses'))}
                className="flex items-center gap-1.5 text-[#c2a453] hover:text-[#a89279] text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors group"
              >
                <span className="sm:hidden">Explore</span>
                <span className="hidden sm:inline">Explore Dresses</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-x-8 md:gap-y-12">
              {[
                {
                  title: "Rhulani Dress",
                  price: "R2,200.00",
                  img: "https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/12/DSC_6043-1.jpg?fit=864%2C1080&ssl=1",
                  link: "https://www.wansatibrands.co.za/shop/fashion/dresses/melania-dress/?v=eacb463a8002",
                },
                {
                  title: "Prisha Sets",
                  price: "R1,499.00",
                  img: "https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_6105.jpg?fit=864%2C1080&ssl=1",
                  link: "https://www.wansatibrands.co.za/shop/fashion/african-print/prisha-sets/?v=eacb463a8002",
                },
                {
                  title: "Rhandzu Dress",
                  price: "R1,600.00",
                  img: "https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5890.jpg?fit=864%2C1080&ssl=1",
                  link: "https://www.wansatibrands.co.za/shop/fashion/african-print/rhandzu-dress/?v=eacb463a8002",
                },
                {
                  title: "Pfukani Tsonga dress",
                  price: "R2,080.00",
                  img: "https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5876.jpg?fit=864%2C1080&ssl=1",
                  link: "https://www.wansatibrands.co.za/shop/fashion/african-print/pfukani-dress/?v=eacb463a8002",
                }
              ].map((product, idx) => {
                const internalPath = getProductCardPath(product.title);

                return (
	                <a
	                  key={idx}
	                  href={internalPath ?? product.link}
                  target={internalPath ? undefined : '_blank'}
                  rel={internalPath ? undefined : 'noopener noreferrer'}
                  onClick={internalPath ? (event) => {
                    event.preventDefault();
                    navigateTo(internalPath);
                  } : undefined}
	                  className="luxury-product-card group cursor-pointer flex h-full flex-col"
	                >
	                  <div className="luxury-image-frame relative w-full aspect-[3/4] bg-stone-100 overflow-hidden mb-4 md:mb-5">
	                    <button
	                      type="button"
	                      onClick={(event) => {
	                        event.preventDefault();
	                        event.stopPropagation();
	                        handleAddProductToWishlist({
	                          id: internalPath ?? product.link,
	                          title: product.title,
	                          priceLabel: product.price,
	                          numericPrice: parseProductCardPrice(product.price),
	                          image: product.img,
	                          path: internalPath,
	                        });
	                      }}
	                      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-stone-400 opacity-0 shadow-sm ring-1 ring-stone-200/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:text-red-500 group-hover:opacity-100"
	                      aria-label={`Add ${product.title} to wishlist`}
	                    >
	                      <Heart className="h-4 w-4" strokeWidth={1.5} />
	                    </button>
	                    <img
	                      src={product.img}
	                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="font-medium text-sm text-stone-800 mb-1 line-clamp-1">
                    {product.title}
                  </h4>
                  <p className="mb-3 text-sm text-stone-500 font-semibold">{product.price}</p>
                  <span className="btn-gold-textured premium-select-button mt-auto w-full py-3 text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Select Options</span>
                  </span>
                </a>
                );
              })}
            </div>
          </div>

          {/* Category: Men's Shirts */}
          <div>
            <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-stone-200 pb-4">
              <h3 className="font-serif text-2xl text-stone-800 tracking-tight">
                Men
              </h3>
              <button
                type="button"
                onClick={() => navigateTo(getProductListingPathByLabel('Men'))}
                className="flex items-center gap-1.5 text-[#c2a453] hover:text-[#a89279] text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors group"
              >
                <span className="sm:hidden">Explore</span>
                <span className="hidden sm:inline">Explore More</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 md:gap-y-12">
              {[
                {
                  title: "Botshelo men's shirt",
                  price: "R650.00",
                  img: "https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5751.jpg",
                  link: "https://www.wansatibrands.co.za/shop/fashion/african-print/botshelo-mens-shirt/?v=eacb463a8002",
                },
                {
                  title: "Amogelang men's shirt",
                  price: "R650.00",
                  img: "https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5751.jpg",
                  link: "https://www.wansatibrands.co.za/shop/fashion/african-print/amogelang-mens-shirt/?v=eacb463a8002",
                },
                {
                  title: "Bontle men’s shirt",
                  price: "R599.00",
                  img: "https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-2.jpg",
                  link: "https://www.wansatibrands.co.za/shop/fashion/african-print/bontle-mens-shirt/?v=eacb463a8002",
                }
              ].map((product, idx) => {
                const internalPath = getProductCardPath(product.title);

                return (
	                <a
	                  key={idx}
	                  href={internalPath ?? product.link}
                  target={internalPath ? undefined : '_blank'}
                  rel={internalPath ? undefined : 'noopener noreferrer'}
                  onClick={internalPath ? (event) => {
                    event.preventDefault();
                    navigateTo(internalPath);
                  } : undefined}
	                  className="luxury-product-card group cursor-pointer flex h-full flex-col"
	                >
	                  <div className="luxury-image-frame relative w-full aspect-[3/4] bg-stone-100 overflow-hidden mb-4 md:mb-5">
	                    <button
	                      type="button"
	                      onClick={(event) => {
	                        event.preventDefault();
	                        event.stopPropagation();
	                        handleAddProductToWishlist({
	                          id: internalPath ?? product.link,
	                          title: product.title,
	                          priceLabel: product.price,
	                          numericPrice: parseProductCardPrice(product.price),
	                          image: product.img,
	                          path: internalPath,
	                        });
	                      }}
	                      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-stone-400 opacity-0 shadow-sm ring-1 ring-stone-200/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:text-red-500 group-hover:opacity-100"
	                      aria-label={`Add ${product.title} to wishlist`}
	                    >
	                      <Heart className="h-4 w-4" strokeWidth={1.5} />
	                    </button>
	                    <img
	                      src={product.img}
	                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="font-medium text-sm text-stone-800 mb-1 line-clamp-1">
                    {product.title}
                  </h4>
                  <p className="mb-3 text-sm text-stone-500 font-semibold">{product.price}</p>
                  <span className="btn-gold-textured premium-select-button mt-auto w-full py-3 text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Select Options</span>
                  </span>
                </a>
                );
              })}
            </div>
          </div>

          {/* Category: Fragrances */}
          <div>
            <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-stone-200 pb-4">
              <h3 className="font-serif text-2xl text-stone-800 tracking-tight">
                Fragrances
              </h3>
              <button
                type="button"
                onClick={() => navigateTo(getProductListingPathByLabel('Fragrances'))}
                className="flex items-center gap-1.5 text-[#c2a453] hover:text-[#a89279] text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors group"
              >
                <span className="sm:hidden">Explore</span>
                <span className="hidden sm:inline">Explore Fragrances</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-x-8 md:gap-y-12">
              {[
                {
                  title: "Inspired by Oud Fleur- Tom Ford",
                  price: "R150.00 – R200.00",
                  img: "https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-Oud-Fleur-Photoroom.png?fit=800%2C800&ssl=1",
                  link: "https://www.wansatibrands.co.za/shop/fragrances/unisex/inspired-by-oud-fleur-tom-ford/?v=eacb463a8002",
                  onSale: true,
                },
                {
                  title: "Inspired by White Aoud- Montale",
                  price: "R180.00 – R250.00",
                  img: "https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-White-Aoud-Photoroom.png?fit=800%2C800&ssl=1",
                  link: "https://www.wansatibrands.co.za/shop/fragrances/",
                },
                {
                  title: "Inspired by Baccarat Rouge 540- Maison Francis Kurkdjian",
                  price: "R220.00 – R280.00",
                  img: "https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-Baccarat-Rouge-540-Photoroom.png?fit=800%2C800&ssl=1",
                  link: "https://www.wansatibrands.co.za/shop/fragrances/",
                },
                {
                  title: "Inspired by Gucci Oud Gucci",
                  price: "R190.00 – R260.00",
                  img: "https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2024/03/Men-Gucci-Oud-Photoroom.png?fit=800%2C800&ssl=1",
                  link: "https://www.wansatibrands.co.za/shop/fragrances/",
                  onSale: true,
                  soldOut: true,
                }
              ].map((product, idx) => {
                const internalPath = getProductCardPath(product.title);

                return (
	                <a
	                  key={idx}
	                  href={internalPath ?? product.link}
                  target={internalPath ? undefined : '_blank'}
                  rel={internalPath ? undefined : 'noopener noreferrer'}
                  onClick={internalPath ? (event) => {
                    event.preventDefault();
                    navigateTo(internalPath);
                  } : undefined}
	                  className="luxury-product-card group cursor-pointer flex h-full flex-col"
	                >
	                  <div className="luxury-image-frame relative w-full aspect-square bg-stone-100 overflow-hidden mb-4 md:mb-5">
	                    {product.onSale || product.soldOut ? (
                        <div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-2">
	                      {product.onSale ? (
                          <span className="bg-red-600 text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-sm">
                            Sale
	                        </span>
	                      ) : null}
	                      {product.soldOut ? (
                          <span className="bg-stone-900 text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-sm">
                            Sold Out
	                        </span>
	                      ) : null}
                        </div>
	                    ) : null}
	                    <button
	                      type="button"
	                      onClick={(event) => {
	                        event.preventDefault();
	                        event.stopPropagation();
	                        handleAddProductToWishlist({
	                          id: internalPath ?? product.link,
	                          title: product.title,
	                          priceLabel: product.price,
	                          numericPrice: parseProductCardPrice(product.price),
	                          image: product.img,
	                          imageFit: 'contain',
	                          path: internalPath,
	                        });
	                      }}
	                      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-stone-400 opacity-0 shadow-sm ring-1 ring-stone-200/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:text-red-500 group-hover:opacity-100"
	                      aria-label={`Add ${product.title} to wishlist`}
	                    >
	                      <Heart className="h-4 w-4" strokeWidth={1.5} />
	                    </button>
	                    <img
	                      src={product.img}
	                      alt={product.title}
                      className={`absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105 ${
                        product.soldOut ? 'grayscale opacity-55' : ''
                      }`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="font-medium text-sm text-stone-800 mb-1 line-clamp-2 min-h-[2.5rem]">
                    {product.title}
                  </h4>
                  <p className="mb-3 text-sm text-stone-500 font-semibold">{product.price}</p>
                  <span className="btn-gold-textured premium-select-button mt-auto w-full py-3 text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{product.soldOut ? 'View Options' : 'Select Options'}</span>
                  </span>
                </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Popular Collections */}
        <section id="popular-collections" className="max-w-[1400px] mx-auto px-4 sm:px-8 pb-16 md:pb-20">
          <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[#2d2a26]">
              Popular Collections
            </h2>
            <p className="text-sm md:text-base text-stone-500 leading-relaxed">
              Explore bold African prints, exclusive dresses, and sophisticated menswear, all crafted by Wansati Brands for those who live with confidence, culture, and purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            <div className="luxury-feature-card luxury-image-frame relative w-full h-[460px] md:h-[580px] lg:h-[620px] bg-stone-200 overflow-hidden group">
              <img
                src="https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?w=864&ssl=1"
                srcSet="https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?w=864&ssl=1 864w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?resize=240%2C300&ssl=1 240w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?resize=768%2C960&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?resize=819%2C1024&ssl=1 819w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?resize=1229%2C1536&ssl=1 1229w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?resize=1638%2C2048&ssl=1 1638w"
                sizes="(max-width: 768px) 100vw, 33vw"
                alt="African Prints"
                className="absolute inset-0 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
                <h3 className="font-serif text-2xl mb-4 drop-shadow-sm">
                  African Prints
                </h3>
                <button
                  type="button"
                  onClick={() => navigateTo(getProductListingPathByLabel('African Print'))}
                  className="btn-gold-textured px-6 py-2 text-xs font-bold tracking-widest uppercase self-start"
                >
                  Explore
                </button>
              </div>
            </div>

            <div className="luxury-feature-card luxury-image-frame relative w-full h-[460px] md:h-[580px] lg:h-[620px] bg-stone-200 overflow-hidden group">
              <img
                src="https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?w=864&ssl=1"
                srcSet="https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?w=864&ssl=1 864w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?resize=240%2C300&ssl=1 240w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?resize=768%2C960&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?resize=819%2C1024&ssl=1 819w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?resize=1229%2C1536&ssl=1 1229w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?resize=1638%2C2048&ssl=1 1638w"
                sizes="(max-width: 768px) 100vw, 33vw"
                alt="Exclusive Dresses"
                className="absolute inset-0 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
                <h3 className="font-serif text-2xl mb-4 drop-shadow-sm">
                  Exclusive Dresses
                </h3>
                <button
                  type="button"
                  onClick={() => navigateTo(getProductListingPathByLabel('Exclusive Range'))}
                  className="btn-gold-textured px-6 py-2 text-xs font-bold tracking-widest uppercase self-start"
                >
                  Explore
                </button>
              </div>
            </div>

            <div className="luxury-feature-card luxury-image-frame relative w-full h-[460px] md:h-[580px] lg:h-[620px] bg-stone-200 overflow-hidden group">
              <img
                src="https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?w=2048&ssl=1"
                srcSet="https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?w=2048&ssl=1 2048w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=240%2C300&ssl=1 240w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=819%2C1024&ssl=1 819w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=768%2C960&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=1229%2C1536&ssl=1 1229w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=1639%2C2048&ssl=1 1639w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=800%2C1000&ssl=1 800w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=1200%2C1500&ssl=1 1200w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=600%2C750&ssl=1 600w"
                sizes="(max-width: 768px) 100vw, 33vw"
                alt="Menswear"
                className="absolute inset-0 w-full h-full object-cover object-[center_15%] md:object-top hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
                <h3 className="font-serif text-2xl mb-4 drop-shadow-sm">
                  Menswear
                </h3>
                <button
                  type="button"
                  onClick={() => navigateTo(getProductListingPathByLabel('Men'))}
                  className="btn-gold-textured px-6 py-2 text-xs font-bold tracking-widest uppercase self-start"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. The Meaning of Wansati / Brand Story */}
        <section className="bg-[#f2e4d8] py-16 md:py-20 lg:py-24 overflow-hidden text-[#1c1a17]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Image Block */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="md:col-span-12 lg:col-span-5 relative max-w-xl lg:max-w-none mx-auto lg:mx-0"
              >
                <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[3/4] overflow-hidden">
                  <img
                    src="https://www.wansatibrands.co.za/wp-content/uploads/2025/09/DSC_6474-scaled.jpg"
                    alt="The Wansati Woman"
                    className="w-full h-full object-cover object-top transition-transform duration-[2s]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-4 -right-4 w-full h-full border border-stone-200 -z-10" />
                </div>
                <div className="absolute top-8 -left-4 bg-[#1c1a17] text-white px-4 py-2 text-[10px] uppercase font-bold tracking-[0.3em] rotate-90 origin-left">
                  Our Heritage
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="md:col-span-12 lg:col-span-7 flex flex-col"
              >
                <div className="mb-10">
                  <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400">Our Story</span>
                  <h2 className="font-serif text-4xl leading-[1.1] tracking-tighter text-stone-900 md:text-5xl">
                    The Meaning <br />
                    <span className="italic text-stone-400">of</span> Wansati
                  </h2>
                </div>

                <div className="flex flex-col items-start space-y-12">
                  <div className="max-w-2xl space-y-4">
                    <div className="h-px w-16 bg-stone-300" />
                    <p className="font-serif text-xl italic leading-relaxed text-stone-600 md:text-2xl">
                      "Wansati means woman in <span className="font-bold not-italic text-stone-900">Xitsonga</span> — a name that carries confidence, culture, softness, strength, and timeless elegance."
                    </p>
                  </div>

                  <div className="max-w-2xl space-y-6 text-sm leading-relaxed tracking-wide text-stone-500">
                    <div className="h-px w-16 bg-stone-300" />
                    <p>
                      Wansati Brand is a lifestyle label for everyone. We create fashion, fragrance, bags, and home care that celebrate confidence, culture, and every day elegance.
                    </p>
                    <p>
                      Rooted in African heritage and designed for all bodies and ages, every Wansati made is made to help you feel seen, empowered, and comfortable in your own skin. From what you wear to the scent you leave behind. Wansati affirms that your presence matters.
                    </p>
                  </div>

                  <div className="flex w-full max-w-2xl flex-col items-start space-y-8">
                    <div className="h-px w-16 bg-stone-300" />
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="relative"
                    >
                      <span className="pointer-events-none absolute -left-8 -top-6 select-none font-serif text-6xl text-stone-900/5">“</span>
                      <blockquote className="relative z-10 font-serif text-2xl italic leading-relaxed tracking-tight text-stone-900 md:text-3xl">
                        Be bold. Be soft. Be powerful. Be <span className="text-[1.1em] font-bold not-italic text-stone-950">Wansati.</span>
                      </blockquote>
                    </motion.div>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => navigateTo('/about')}
                        className="btn-gold-textured px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-lg"
                      >
                        Read Our Story
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. Trust Benefits Belt */}
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

        {/* 8. Newsletter / Subscription Section */}
        <section className="bg-[#fcfaf5] py-16 md:py-24 border-t border-stone-200">
          <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
            <img 
              src="https://www.wansatibrands.co.za/wp-content/uploads/2023/09/icon.svg" 
              alt="Wansati Icon" 
              className="w-16 h-16 md:w-20 md:h-20 mb-8 mx-auto opacity-90"
              referrerPolicy="no-referrer"
            />
            <h2 className="font-serif text-3xl md:text-4xl text-[#2a2620] mb-4">
              Join the Wansati Family
            </h2>
            <p className="text-[#4a453c] text-sm mb-8 max-w-lg mx-auto leading-relaxed">
              Subscribe to receive updates, access to exclusive deals, and more. Be the first to know about our newest arrivals.
            </p>
            <form className="flex w-full flex-col sm:flex-row max-w-md mx-auto gap-4 sm:gap-0" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="premium-input flex-1 bg-transparent border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-500 placeholder:text-stone-500"
                required
              />
              <button
                type="submit"
                className="bg-[#1c1a17] text-white px-8 py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-stone-800 transition-colors sm:border-l-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
          </>
        ) : isNotFoundPage ? (
          <NotFoundPage navigateTo={navigateTo} />
        ) : (
          <NotFoundPage navigateTo={navigateTo} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0f0f0f] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            {/* Logo & Bio */}
            <div className="col-span-1 border-stone-800 pb-8 lg:pb-0 border-b lg:border-b-0">
              <img 
                src="https://www.wansatibrands.co.za/wp-content/uploads/2024/09/Wansati-Brands-Logo-e1758822665346.png" 
                alt="Wansati Brands Logo" 
                className="h-10 w-auto object-contain mb-6 invert brightness-0"
                referrerPolicy="no-referrer"
              />
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Bold fashion, rich culture, confident living made for African women.
              </p>
              <div className="flex space-x-4 text-stone-300">
                <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook size={18} /></a>
                <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram size={18} /></a>
                <a href="#" className="hover:text-white transition-colors" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.35V2h-3.2v13.01a2.89 2.89 0 1 1-2.89-2.89c.23 0 .45.03.66.08V8.94a6.1 6.1 0 0 0-.66-.04A6.11 6.11 0 1 0 15.82 15V8.36a8.04 8.04 0 0 0 4.77 1.57V6.75c-.35 0-.69-.02-1-.06Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h4 className="font-bold tracking-wider mb-6 text-sm uppercase">Quick Links</h4>
              <ul className="space-y-3 text-stone-400 text-sm">
                <li><button type="button" onClick={() => navigateTo('/')} className="hover:text-white transition-colors">Home</button></li>
                <li><button type="button" onClick={() => navigateTo('/about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button type="button" onClick={() => navigateTo(productListingPath())} className="hover:text-white transition-colors">Shop</button></li>
                <li><button type="button" onClick={() => navigateTo('/blog')} className="hover:text-white transition-colors">Blog</button></li>
                <li><button type="button" onClick={() => navigateTo('/contact')} className="hover:text-white transition-colors">Contact</button></li>
                <li><button type="button" onClick={() => navigateTo('/privacy-policy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button type="button" onClick={() => navigateTo('/terms-and-conditions')} className="hover:text-white transition-colors">Terms & Conditions</button></li>
                <li><button type="button" onClick={() => navigateTo('/returns-policy')} className="hover:text-white transition-colors">Returns Policy</button></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="col-span-1">
              <h4 className="font-bold tracking-wider mb-6 text-sm uppercase">Contact Us</h4>
              <div className="text-stone-400 text-sm space-y-5">
                <div>
                  <p className="mb-1">Have questions & suggestions?</p>
                  <a href="mailto:info@wansatibrands.co.za" className="text-white hover:text-stone-300 transition-colors font-medium">info@wansatibrands.co.za</a>
                </div>
                <div>
                  <p className="mb-1">Need assistance? Give us a call.</p>
                  <a href="tel:+27676253986" className="text-white hover:text-stone-300 transition-colors font-medium">+27 67 625 3986</a>
                </div>
              </div>
            </div>

            {/* Visit Us */}
            <div className="col-span-1">
              <h4 className="font-bold tracking-wider mb-6 text-sm uppercase">Visit Us</h4>
              <div className="text-stone-400 text-sm">
                <p className="mb-2">Shop at our store</p>
                <p className="leading-relaxed">
                  Room 914, Ottawa Mall,<br />
                  94 Helen Joseph Street,<br />
                  Johannesburg, 2001
                </p>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-800 py-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-500">Payment Options</p>
                <p className="mt-2 text-sm text-stone-400">Secure checkout with Payfast and Yoco.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center md:justify-end">
                  <img
                    src={payfastLogo}
                    alt="Payfast"
                    className="h-5 w-auto opacity-80"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 md:min-w-[19rem]">
                  <img
                    src={yocoLogo}
                    alt="Yoco"
                    className="h-4 w-auto opacity-85"
                  />
                  <div className="flex w-full flex-wrap items-center justify-end gap-x-1.5 gap-y-2">
                    {yocoAcceptedCards.map((card) => (
                      <img
                        key={card.name}
                        src={card.logo}
                        alt={card.name}
                        title={card.name}
                        className={`${card.className} block w-auto max-h-8 shrink-0 object-contain opacity-90`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 flex flex-col items-center justify-center text-stone-500 text-xs space-y-2">
            <p>© 2024 Wansati Brands. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.14em]">
              <button type="button" onClick={() => navigateTo('/privacy-policy')} className="transition-colors hover:text-white">
                Privacy Policy
              </button>
              <button type="button" onClick={() => navigateTo('/terms-and-conditions')} className="transition-colors hover:text-white">
                Terms & Conditions
              </button>
              <button type="button" onClick={() => navigateTo('/returns-policy')} className="transition-colors hover:text-white">
                Return Policy
              </button>
            </div>
            <p className="flex items-center gap-1.5">
              designed by 
              <a href="https://www.slotly.co.za/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center group">
                <span className="text-blue-500 font-bold tracking-tighter">&lt;/&gt;</span>
                <span className="text-white ml-1.5">slotly</span>
                <span className="text-blue-500">Dev</span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
      )}
    </AnimatePresence>
  );
}
