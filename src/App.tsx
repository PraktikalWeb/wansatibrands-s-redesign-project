/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Truck,
  Crown,
  Gem,
  ShieldCheck,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';

export default function App() {
  const heroImages = [
    "https://hbdxnnuzbdbcyxrgfvtd.supabase.co/storage/v1/object/public/kasipoint/d851e4b5-2db7-4364-b117-b2fe50376a23/gallery/gallery_1776644175919_ChatGPT_Image_Apr_20__2026__02_15_37_AM.png",
    "https://hbdxnnuzbdbcyxrgfvtd.supabase.co/storage/v1/object/public/kasipoint/d851e4b5-2db7-4364-b117-b2fe50376a23/gallery/gallery_1776644207767_ChatGPT_Image_Apr_20__2026__02_13_17_AM.png",
    "https://hbdxnnuzbdbcyxrgfvtd.supabase.co/storage/v1/object/public/kasipoint/d851e4b5-2db7-4364-b117-b2fe50376a23/gallery/gallery_1776644236859_ChatGPT_Image_Apr_20__2026__02_09_49_AM.png",
    "https://hbdxnnuzbdbcyxrgfvtd.supabase.co/storage/v1/object/public/kasipoint/d851e4b5-2db7-4364-b117-b2fe50376a23/gallery/gallery_1776644288555_ChatGPT_Image_Apr_20__2026__01_20_39_AM.png"
  ];

  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = [
    {
      title: 'Women',
      subcategories: [
        { name: 'Dresses', units: 42 },
        { name: 'African Print', units: 18 },
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
        { name: 'Unisex', units: 19 },
        { name: 'Home', units: 8 },
      ]
    },
    {
      title: 'Sale',
      subcategories: [],
      highlight: true
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const handleLoad = () => {
      // Small delay after load to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback in case load takes too long
      const fallback = setTimeout(handleLoad, 10000);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[1000] bg-[#fcfcf9] flex flex-col items-center justify-center p-8 overflow-hidden"
        >
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
            className="relative w-48 md:w-64 aspect-square flex items-center justify-center mb-16"
          >
            <img 
              src="https://www.wansatibrands.co.za/wp-content/uploads/2024/11/WANSATI-LOGO-MARK-PNG@300x-1.png" 
              alt="Wansati Brands" 
              className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="flex flex-col items-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl md:text-5xl text-stone-900 tracking-wider mb-2 font-light text-center"
            >
              Elegance. Presence. Power.
            </motion.h2>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 4, repeat: Infinity }}
              className="h-[1px] bg-stone-300 mt-6"
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-sans text-stone-900 bg-[#fcfcf9] min-h-screen"
        >
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
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-stone-100">
                <img 
                  src="https://www.wansatibrands.co.za/wp-content/uploads/2024/09/Wansati-Brands-Logo-e1758822665346.png" 
                  alt="Wansati Brands Logo" 
                  className="h-6 w-auto object-contain"
                />
                <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2 text-stone-500 hover:text-stone-900 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pt-4 pb-8">
                <div className="px-6 mb-8">
                  <nav className="space-y-6">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400 mb-6">Discovery</p>
                      <ul className="space-y-6">
                        <li>
                          <a href="#" className="block font-bold text-xl text-stone-900 hover:text-stone-600 transition-colors">Women</a>
                          <ul className="mt-3 ml-4 space-y-3 border-l border-stone-100 pl-4">
                            <li><a href="#" className="block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider">Dresses</a></li>
                            <li><a href="#" className="block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider">African Print</a></li>
                            <li><a href="#" className="block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider">Fragrance</a></li>
                          </ul>
                        </li>
                        <li>
                          <a href="#" className="block font-bold text-xl text-stone-900 hover:text-stone-600 transition-colors">Men</a>
                          <ul className="mt-3 ml-4 space-y-3 border-l border-stone-100 pl-4">
                            <li><a href="#" className="block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider">African Print</a></li>
                            <li><a href="#" className="block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider">Fragrance</a></li>
                          </ul>
                        </li>
                        <li>
                          <a href="#" className="block font-bold text-xl text-stone-900 hover:text-stone-600 transition-colors">Kids</a>
                          <ul className="mt-3 ml-4 space-y-3 border-l border-stone-100 pl-4">
                            <li><a href="#" className="block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider">Boys</a></li>
                            <li><a href="#" className="block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider">Girls</a></li>
                          </ul>
                        </li>
                        <li>
                          <a href="#" className="block font-bold text-xl text-stone-900 hover:text-stone-600 transition-colors">Body Care</a>
                          <ul className="mt-3 ml-4 space-y-3 border-l border-stone-100 pl-4">
                            <li><a href="#" className="block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider">Bathing</a></li>
                            <li><a href="#" className="block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider">Foot Care</a></li>
                            <li><a href="#" className="block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider">Facial Care</a></li>
                          </ul>
                        </li>
                        <li>
                          <a href="#" className="block font-bold text-xl text-stone-900 hover:text-stone-600 transition-colors">Fragrance</a>
                          <ul className="mt-3 ml-4 space-y-3 border-l border-stone-100 pl-4">
                            <li><a href="#" className="block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider">Unisex</a></li>
                            <li><a href="#" className="block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider">Home</a></li>
                          </ul>
                        </li>
                        <li className="pt-2">
                          <a href="#" className="block font-bold text-xl text-red-600 hover:text-red-500 transition-colors">Sale</a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>

              <div className="p-6 bg-stone-50 border-t border-stone-100 space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-white border border-stone-100 rounded-lg shadow-sm">
                  <User size={20} className="text-stone-400" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900">My Account</p>
                    <button className="text-stone-500 text-xs hover:text-stone-900 underline underline-offset-2">Sign In / Register</button>
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

      {/* Top Banner */}
      <div className="bg-[#f2efe9] text-xs py-1.5 px-4 flex justify-center items-center sm:px-8">
        <div className="text-center font-medium tracking-wide text-stone-600">
          Free Delivery over R1000
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100 flex flex-col items-center shadow-sm">
        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 bg-white z-[70] flex items-center px-4"
            >
              <div className="flex-1 flex items-center relative py-2">
                <Search size={18} className="absolute left-3 text-stone-900" />
                <input
                  autoFocus
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full pl-10 pr-12 py-3 bg-white border border-stone-900 text-sm focus:outline-none placeholder:text-stone-400"
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 text-stone-900 hover:text-black"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Row: Logo, Search, Icons */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-3.5 md:py-4 flex items-center justify-between">
          {/* Mobile Hamburger (Visible on Tablet/Mobile) */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-stone-800 hover:text-stone-500 transition-colors"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 md:flex-initial">
            <img 
              src="https://www.wansatibrands.co.za/wp-content/uploads/2024/09/Wansati-Brands-Logo-e1758822665346.png" 
              alt="Wansati Brands Logo" 
              className="h-8 md:h-10 w-auto object-contain mx-auto"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Search (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 pr-10 py-1.5 border border-stone-300 text-sm focus:outline-none focus:border-stone-400 placeholder:text-stone-400"
            />
            <button className="absolute right-0 top-0 bottom-0 bg-stone-900 text-white px-3 flex items-center justify-center">
              <Search size={16} />
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Search Icon (Mobile/Tablet) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden flex flex-col items-center justify-center cursor-pointer hover:text-stone-600 transition-colors"
            >
              <Search size={22} strokeWidth={1.5} />
            </button>

            {/* Account (Desktop Only) */}
            <div className="hidden lg:flex flex-col items-center justify-center cursor-pointer hover:text-stone-600 transition-colors relative group">
              <User size={20} strokeWidth={1.5} />
              <span className="text-[10px] uppercase font-medium mt-1">Account</span>
              
              {/* Account Dropdown */}
              <div className="absolute top-full right-0 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-[60]">
                <div className="bg-white min-w-[160px] border border-stone-100 shadow-xl py-3 backdrop-blur-sm">
                  <div className="px-5 py-2 border-b border-stone-50 mb-2">
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Welcome</p>
                  </div>
                  <ul className="text-[11px] font-bold uppercase tracking-widest">
                    <li>
                      <a href="#" className="block px-5 py-2.5 hover:bg-stone-50 hover:text-stone-900 transition-colors">Sign In</a>
                    </li>
                    <li>
                      <a href="#" className="block px-5 py-2.5 hover:bg-stone-50 hover:text-stone-900 transition-colors">Register</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center cursor-pointer hover:text-stone-600 transition-colors">
              <Heart size={20} strokeWidth={1.5} />
              <span className="hidden lg:block text-[10px] uppercase font-medium mt-1">Wishlist</span>
            </div>

            <div className="flex flex-col items-center justify-center cursor-pointer hover:text-stone-600 transition-colors relative">
              <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
              <span className="hidden lg:block text-[10px] uppercase font-medium mt-1">Cart</span>
              <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="hidden w-full max-w-5xl mx-auto lg:flex items-center justify-center space-x-12 py-3 font-semibold text-sm tracking-widest text-stone-800 uppercase">
          {navigation.map((item) => (
            <div key={item.title} className="relative group py-2">
              <a 
                href="#" 
                className={`transition-colors flex items-center gap-1 ${
                  item.highlight ? 'text-red-600 hover:text-red-500' : 'hover:text-stone-500'
                }`}
              >
                {item.title}
              </a>
              
              {item.subcategories.length > 0 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-[60]">
                  <div className="bg-white min-w-[240px] border border-stone-100 shadow-xl p-5 backdrop-blur-sm">
                    <div className="text-[10px] text-stone-400 mb-4 border-b border-stone-50 pb-2 tracking-[0.2em] font-bold">
                      Explore {item.title}
                    </div>
                    <ul className="space-y-4">
                      {item.subcategories.map((sub) => (
                        <li key={sub.name}>
                          <a 
                            href="#" 
                            className="flex items-center justify-between group/sub text-stone-600 hover:text-stone-900 transition-colors"
                          >
                            <span className="text-[11px] font-bold tracking-widest group-hover/sub:translate-x-1 transition-transform">{sub.name}</span>
                            <span className="text-[10px] text-stone-300 font-mono tracking-tighter">({sub.units})</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-stone-100">
                      <a href="#" className="text-[9px] font-bold text-stone-400 hover:text-stone-900 transition-colors tracking-[0.1em] underline underline-offset-4">
                        View All {item.title}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[75vh] md:h-[90vh] bg-[#f2efe9] flex items-center justify-center overflow-hidden">
          {heroImages.map((img, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                idx === currentHeroIdx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Optional: Add a subtle vignette or gradient overlay if needed */}
              <img
                src={img}
                alt={`Wansati Hero Look ${idx + 1}`}
                className="w-full h-full object-cover object-top md:object-[center_15%]"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative z-10 flex flex-col items-center px-4 text-center mt-12 md:mt-20">
            <motion.h1 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-md"
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
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/95 text-stone-900 px-8 py-3.5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-stone-900 hover:text-white transition-all backdrop-blur-sm shadow-xl"
              >
                Shop Now
              </motion.button>
            </motion.div>
          </div>

          {/* Pagination dots */}
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

        {/* Categories Grid */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12 md:py-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
          >
            {[
              { 
                title: 'Women', 
                img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?w=864&ssl=1',
                srcSet: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?w=864&ssl=1 864w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?resize=240%2C300&ssl=1 240w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?resize=768%2C960&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?resize=819%2C1024&ssl=1 819w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?resize=1229%2C1536&ssl=1 1229w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6522-scaled.jpg?resize=1639%2C2048&ssl=1 1639w'
              },
              { 
                title: 'Girls', 
                img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?w=864&ssl=1',
                srcSet: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?w=864&ssl=1 864w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?resize=240%2C300&ssl=1 240w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?resize=768%2C960&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5880.jpg?resize=819%2C1024&ssl=1 819w'
              },
              { 
                title: 'Two-piece set', 
                img: 'https://www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5984.jpg',
              },
              { 
                title: 'Fragrances', 
                img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?w=2047&ssl=1',
                srcSet: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?w=2047&ssl=1 2047w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?resize=240%2C300&ssl=1 240w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?resize=768%2C960&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?resize=819%2C1024&ssl=1 819w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?resize=1228%2C1536&ssl=1 1228w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/09/d35246f2-017e-41eb-96c4-c7ae49a34b45.jpeg?resize=1638%2C2048&ssl=1 1638w'
              },
              { 
                title: 'Body Care', 
                img: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?w=1181&ssl=1',
                srcSet: 'https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?w=1181&ssl=1 1181w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?resize=800%2C800&ssl=1 800w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?resize=150%2C150&ssl=1 150w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?resize=300%2C300&ssl=1 300w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?resize=768%2C768&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?resize=1024%2C1024&ssl=1 1024w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2023/09/Body.jpg?resize=600%2C600&ssl=1 600w'
              },
              { 
                title: 'Home Fragrance', 
                img: 'https://www.wansatibrands.co.za/wp-content/uploads/2023/09/Diffuser-1.jpg',
              },
            ].map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group cursor-pointer w-full overflow-hidden bg-stone-50 flex flex-col items-center border border-stone-100 shadow-sm hover:shadow-md transition-shadow duration-500"
              >
                <div className="w-[90%] aspect-[4/5] mt-4 relative overflow-hidden shadow-sm">
                  <img
                    src={cat.img}
                    srcSet={cat.srcSet}
                    sizes={cat.srcSet ? "(max-width: 768px) 50vw, 25vw" : undefined}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/95 text-stone-900 px-3 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors shadow-sm whitespace-nowrap"
                    >
                      Shop Now
                    </motion.button>
                  </div>
                </div>
                <div className="py-4 w-full flex items-center justify-center">
                  <h3 className="font-sans font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#1c1a17]">
                    {cat.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Featured Collection */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pb-12">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[#2d2a26]">
              Featured Collections
            </h2>
            <p className="text-sm md:text-base text-stone-500 leading-relaxed">
              Explore bold African prints, exclusive dresses, and sophisticated menswear, all crafted by Wansati Brands for those who live with confidence, culture, and purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative w-full h-[500px] md:h-[600px] bg-stone-200 overflow-hidden group">
              <img
                src="https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?w=864&ssl=1"
                srcSet="https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?w=864&ssl=1 864w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?resize=240%2C300&ssl=1 240w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?resize=768%2C960&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?resize=819%2C1024&ssl=1 819w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?resize=1229%2C1536&ssl=1 1229w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6646-scaled.jpg?resize=1638%2C2048&ssl=1 1638w"
                sizes="(max-width: 768px) 100vw, 33vw"
                alt="African Prints"
                className="absolute inset-0 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h3 className="font-serif text-2xl mb-4 drop-shadow-sm">
                  African Prints
                </h3>
                <button className="bg-white text-stone-900 px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors self-start">
                  Explore
                </button>
              </div>
            </div>

            <div className="relative w-full h-[500px] md:h-[600px] bg-stone-200 overflow-hidden group">
              <img
                src="https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?w=864&ssl=1"
                srcSet="https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?w=864&ssl=1 864w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?resize=240%2C300&ssl=1 240w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?resize=768%2C960&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?resize=819%2C1024&ssl=1 819w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?resize=1229%2C1536&ssl=1 1229w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6494-scaled.jpg?resize=1638%2C2048&ssl=1 1638w"
                sizes="(max-width: 768px) 100vw, 33vw"
                alt="Exclusive Dress"
                className="absolute inset-0 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h3 className="font-serif text-2xl mb-4 drop-shadow-sm">
                  Exclusive Dress
                </h3>
                <button className="bg-white text-stone-900 px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors self-start">
                  Explore
                </button>
              </div>
            </div>

            <div className="relative w-full h-[500px] md:h-[600px] bg-stone-200 overflow-hidden group">
              <img
                src="https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?w=2048&ssl=1"
                srcSet="https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?w=2048&ssl=1 2048w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=240%2C300&ssl=1 240w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=819%2C1024&ssl=1 819w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=768%2C960&ssl=1 768w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=1229%2C1536&ssl=1 1229w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=1639%2C2048&ssl=1 1639w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=800%2C1000&ssl=1 800w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=1200%2C1500&ssl=1 1200w, https://i0.wp.com/www.wansatibrands.co.za/wp-content/uploads/2026/01/DSC_5487-1-1-scaled.jpg?resize=600%2C750&ssl=1 600w"
                sizes="(max-width: 768px) 100vw, 33vw"
                alt="Men Wear"
                className="absolute inset-0 w-full h-full object-cover object-[center_15%] md:object-top hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h3 className="font-serif text-2xl mb-4 drop-shadow-sm">
                  Men Wear
                </h3>
                <button className="bg-white text-stone-900 px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors self-start">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Collections */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pb-12 pt-12 space-y-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-4">
              Our Signature Collections
            </h2>
            <div className="h-1 w-20 bg-stone-300 mx-auto" />
          </div>

          {/* Category: Dresses */}
          <div>
            <div className="flex items-center justify-between mb-8 border-b border-stone-200 pb-4">
              <h3 className="font-serif text-2xl text-stone-800 tracking-tight">
                Dresses
              </h3>
              <a href="#" className="hidden sm:block text-sm font-semibold tracking-wider text-stone-600 hover:text-stone-900 transition-colors uppercase">
                Explore Dresses
              </a>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-x-8 md:gap-y-12">
              {[
                {
                  title: "Melania Dress",
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
              ].map((product, idx) => (
                <a key={idx} href={product.link} target="_blank" rel="noopener noreferrer" className="group cursor-pointer flex flex-col">
                  <div className="relative w-full aspect-[3/4] bg-stone-100 overflow-hidden mb-5">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-full bg-white/90 backdrop-blur-sm text-stone-900 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Select Options
                      </button>
                    </div>
                  </div>
                  <h4 className="font-medium text-sm text-stone-800 mb-1 line-clamp-1">
                    {product.title}
                  </h4>
                  <p className="text-sm text-stone-500 font-semibold">{product.price}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Category: Men's Shirts */}
          <div>
            <div className="flex items-center justify-between mb-8 border-b border-stone-200 pb-4">
              <h3 className="font-serif text-2xl text-stone-800 tracking-tight">
                Men
              </h3>
              <a href="#" className="hidden sm:block text-sm font-semibold tracking-wider text-stone-600 hover:text-stone-900 transition-colors uppercase">
                Explore More
              </a>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-x-6 md:gap-y-12">
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
              ].map((product, idx) => (
                <a key={idx} href={product.link} target="_blank" rel="noopener noreferrer" className="group cursor-pointer flex flex-col">
                  <div className="relative w-full aspect-[3/4] bg-stone-100 overflow-hidden mb-5">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-full bg-white/90 backdrop-blur-sm text-stone-900 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Select Options
                      </button>
                    </div>
                  </div>
                  <h4 className="font-medium text-sm text-stone-800 mb-1 line-clamp-1">
                    {product.title}
                  </h4>
                  <p className="text-sm text-stone-500 font-semibold">{product.price}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Category: Fragrances */}
          <div>
            <div className="flex items-center justify-between mb-8 border-b border-stone-200 pb-4">
              <h3 className="font-serif text-2xl text-stone-800 tracking-tight">
                Fragrances
              </h3>
              <a href="https://www.wansatibrands.co.za/shop/fragrances/" target="_blank" rel="noopener noreferrer" className="hidden sm:block text-sm font-semibold tracking-wider text-stone-600 hover:text-stone-900 transition-colors uppercase">
                Explore Fragrances
              </a>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-x-8 md:gap-y-12">
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
                }
              ].map((product, idx) => (
                <a key={idx} href={product.link} target="_blank" rel="noopener noreferrer" className="group cursor-pointer flex flex-col">
                  <div className="relative w-full aspect-square bg-stone-100 overflow-hidden mb-5">
                    {product.onSale && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-red-600 text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-sm">
                          Sale
                        </span>
                      </div>
                    )}
                    <img
                      src={product.img}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-full bg-white/90 backdrop-blur-sm text-stone-900 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Select Options
                      </button>
                    </div>
                  </div>
                  <h4 className="font-medium text-sm text-stone-800 mb-1 line-clamp-2 min-h-[2.5rem]">
                    {product.title}
                  </h4>
                  <p className="text-sm text-stone-500 font-semibold">{product.price}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Perks */}
        <section className="bg-stone-200 border-y border-stone-300 py-10 my-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-[#4a4742]">
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

        {/* Our Story / Meaning Section */}
        <section className="bg-[#f2e4d8] py-20 overflow-hidden text-[#1c1a17]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Image Block */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="md:col-span-12 lg:col-span-5 relative"
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
                {/* Floating Micro-label */}
                <div className="absolute top-8 -left-4 bg-[#1c1a17] text-white px-4 py-2 text-[10px] uppercase font-bold tracking-[0.3em] rotate-90 origin-left">
                  Our Heritage
                </div>
              </motion.div>

              {/* Text Side - Horizontal section but text blocks are stacked */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="md:col-span-12 lg:col-span-7 flex flex-col"
              >
                <div className="mb-10">
                  <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-stone-400 mb-4 block">Our Story</span>
                  <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-2 leading-[1.1] tracking-tighter">
                    The Meaning <br/>
                    <span className="italic text-stone-400">of</span> Wansati
                  </h2>
                </div>
                
                <div className="flex flex-col space-y-12 items-start">
                  {/* Definition Block */}
                  <div className="space-y-4 max-w-2xl">
                    <div className="h-px w-16 bg-stone-300" />
                    <p className="text-xl md:text-2xl text-stone-600 font-serif leading-relaxed italic">
                      "Wansati means woman in <span className="text-stone-900 font-bold not-italic">Xitsonga</span> — a name that carries confidence, culture, softness, strength, and timeless elegance."
                    </p>
                  </div>

                  {/* Mission Block */}
                  <div className="space-y-6 text-stone-500 text-sm leading-relaxed tracking-wide max-w-2xl">
                    <div className="h-px w-16 bg-stone-300" />
                    <p>
                      Wansati Brand is a lifestyle label for everyone. We create fashion, fragrance, bags, and home care that celebrate confidence, culture, and every day elegance.
                    </p>
                    <p>
                      Rooted in African heritage and designed for all bodies and ages, every Wansati made is made to help you feel seen, empowered, and comfortable in your own skin. From what you wear to the scent you leave behind. Wansati affirms that your presence matters.
                    </p>
                  </div>

                  {/* Tagline Block */}
                  <div className="flex flex-col space-y-8 items-start w-full max-w-2xl">
                    <div className="h-px w-16 bg-stone-300" />
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="relative"
                    >
                      <span className="absolute -left-8 -top-6 text-6xl text-stone-900/5 font-serif select-none pointer-events-none">“</span>
                      <blockquote className="font-serif italic tracking-tight text-2xl md:text-3xl text-stone-900 leading-relaxed relative z-10">
                        Be bold. Be soft. Be powerful. Be <span className="font-bold not-italic text-[1.1em] text-stone-950">Wansati.</span>
                      </blockquote>
                    </motion.div>
                    <div className="pt-4">
                      <button className="bg-[#1c1a17] text-white px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-stone-700 transition-colors shadow-lg">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter / Subscription Section */}
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
            <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4 sm:gap-0" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-transparent border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-500 placeholder:text-stone-500"
                required
              />
              <button
                type="submit"
                className="bg-[#1c1a17] text-white px-8 py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-stone-700 transition-colors sm:border-l-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
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
                Bold fashion, rich culture, confident living — made for African women.
              </p>
              <div className="flex space-x-4 text-stone-300">
                <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook size={18} /></a>
                <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram size={18} /></a>
                <a href="#" className="hover:text-white transition-colors font-medium text-sm flex items-center">
                  <span>TikTok</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h4 className="font-bold tracking-wider mb-6 text-sm uppercase">Quick Links</h4>
              <ul className="space-y-3 text-stone-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shop</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
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
                  <a href="tel:+27676253986" className="text-white hover:text-stone-300 transition-colors font-medium">+2767 625 3986</a>
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

          <div className="border-t border-stone-800 pt-8 flex flex-col items-center justify-center text-stone-500 text-xs space-y-2">
            <p>© 2024 Wansati Brands. All rights reserved.</p>
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
    </motion.div>
      )}
    </AnimatePresence>
  );
}
