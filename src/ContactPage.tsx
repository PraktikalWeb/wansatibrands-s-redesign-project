import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Clock3,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
} from 'lucide-react';

type ContactPageProps = {
  navigateTo: (path: string) => void;
};

const CONTACT_EMAIL = 'info@wansatibrands.co.za';
const CONTACT_PHONE_DISPLAY = '+27 67 625 3986';
const CONTACT_PHONE_LINK = '27676253986';
const CONTACT_ADDRESS = '94 Helen Joseph Street, Room 914 Ottawa Mall, Johannesburg, 2001';
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_ADDRESS)}`;
const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE_LINK}?text=${encodeURIComponent('Hi Wansati, I would like to get in touch.')}`;
const BUSINESS_HOURS = [
  { label: 'Weekdays', value: '09:00 - 17:00' },
  { label: 'Saturday', value: '09:00 - 14:00' },
  { label: 'Sunday & Public Holidays', value: 'Closed' },
] as const;
const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', icon: Facebook },
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'TikTok', href: '#', icon: TikTokIcon },
] as const;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M19.05 4.94A9.9 9.9 0 0 0 12 2a9.93 9.93 0 0 0-8.63 14.83L2 22l5.31-1.39A9.93 9.93 0 0 0 22 11.95a9.84 9.84 0 0 0-2.95-7.01ZM12 20.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.15.82.84-3.07-.2-.31A8.22 8.22 0 1 1 12 20.2Zm4.51-6.15c-.25-.13-1.47-.73-1.7-.81-.23-.09-.4-.13-.57.12-.17.25-.65.81-.8.97-.15.17-.29.19-.54.07-.25-.13-1.04-.38-1.99-1.22-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.07-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.45 1.03 2.62.13.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.52.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.35V2h-3.2v13.01a2.89 2.89 0 1 1-2.89-2.89c.23 0 .45.03.66.08V8.94a6.1 6.1 0 0 0-.66-.04A6.11 6.11 0 1 0 15.82 15V8.36a8.04 8.04 0 0 0 4.77 1.57V6.75c-.35 0-.69-.02-1-.06Z" />
    </svg>
  );
}

export default function ContactPage({ navigateTo }: ContactPageProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200 bg-[#f4ecdf]">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(circle at top right, rgba(194, 164, 83, 0.18), transparent 34%), linear-gradient(135deg, rgba(255, 255, 255, 0.52), rgba(244, 236, 223, 0.9))',
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-4 py-14 sm:px-8 md:py-16">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
              <button type="button" onClick={() => navigateTo('/')} className="transition-colors hover:text-stone-900">
                Home
              </button>
              <ArrowRight size={14} strokeWidth={1.5} />
              <span className="text-stone-900">Contact</span>
            </div>

            <div className="max-w-3xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Contact Us</p>
              <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">Get in touch.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
                Reach us by phone, email, WhatsApp, or visit our Johannesburg location.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#1ebe5b]"
                >
                  WhatsApp Us
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-stone-900 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
                >
                  Get Directions
                  <MapPin className="h-4 w-4" strokeWidth={1.7} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-8 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_360px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="border border-stone-200 bg-[#fcfaf5] p-6 md:p-8">
              <div className="mb-8 grid gap-6 md:grid-cols-2">
                <div className="border border-stone-200 bg-white p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-[#8b765e]">
                    <PhoneCall className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">Call</p>
                  <a href={`tel:+${CONTACT_PHONE_LINK}`} className="text-base font-medium text-stone-900 transition-colors hover:text-[#8b765e]">
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </div>

                <div className="border border-stone-200 bg-white p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-[#8b765e]">
                    <Mail className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">Email</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="break-all text-base font-medium text-stone-900 transition-colors hover:text-[#8b765e]">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="border border-stone-200 bg-white p-6">
                <div className="mb-5 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#8b765e]" strokeWidth={1.7} />
                  <h2 className="font-serif text-2xl text-stone-900">Visit Us</h2>
                </div>
                <p className="text-sm leading-relaxed text-stone-600">
                  Room 914, Ottawa Mall
                  <br />
                  94 Helen Joseph Street
                  <br />
                  Johannesburg, 2001
                </p>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-900 transition-colors hover:text-[#8b765e]"
                >
                  Get Directions
                  <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="space-y-6"
          >
            <div className="border border-stone-200 bg-white p-6">
              <div className="mb-5 flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-[#8b765e]" strokeWidth={1.7} />
                <h2 className="font-serif text-2xl text-stone-900">Hours</h2>
              </div>
              <div className="space-y-4 text-sm text-stone-600">
                {BUSINESS_HOURS.map((entry) => (
                  <div key={entry.label} className="flex items-start justify-between gap-4 border-t border-stone-200 pt-4 first:border-t-0 first:pt-0">
                    <span className="font-medium text-stone-700">{entry.label}</span>
                    <span className="text-right">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-stone-200 bg-[#fcfaf5] p-6">
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">Social</p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
