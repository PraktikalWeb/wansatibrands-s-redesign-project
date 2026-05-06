import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MoveRight,
  PhoneCall,
  Send,
  Store,
} from 'lucide-react';

type ContactPageProps = {
  navigateTo: (path: string) => void;
};

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const CONTACT_EMAIL = 'info@wansatibrands.co.za';
const CONTACT_PHONE_DISPLAY = '+27 67 625 3986';
const CONTACT_PHONE_LINK = '+27676253986';
const CONTACT_ADDRESS = '94 Helen Joseph Street, Room 914 Ottawa Mall, Johannesburg, 2001';
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_ADDRESS)}`;
const BUSINESS_HOURS = [
  { label: 'Weekdays', value: '09:00 - 17:00' },
  { label: 'Saturday', value: '09:00 - 14:00' },
  { label: 'Sunday & Public Holidays', value: 'Closed' },
] as const;
const ENQUIRY_TYPES = [
  'General enquiry',
  'Product question',
  'Order support',
  'Store visit',
] as const;
const INITIAL_FORM_STATE: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  subject: ENQUIRY_TYPES[0],
  message: '',
};

function buildMailtoHref(formState: ContactFormState) {
  const subject = `${formState.subject} - ${formState.name || 'Website visitor'}`;
  const body = [
    `Name: ${formState.name}`,
    `Email: ${formState.email}`,
    `Phone: ${formState.phone || 'Not provided'}`,
    '',
    formState.message,
  ].join('\n');

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactPage({ navigateTo }: ContactPageProps) {
  const [formState, setFormState] = useState<ContactFormState>(INITIAL_FORM_STATE);
  const [mailDraftPrepared, setMailDraftPrepared] = useState(false);

  const handleFieldChange = (
    field: keyof ContactFormState,
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = event.target;

    setFormState((prev) => ({ ...prev, [field]: value }));
    if (mailDraftPrepared) {
      setMailDraftPrepared(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = buildMailtoHref(formState);
    setMailDraftPrepared(true);
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200 bg-[#f4ecdf]">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(circle at top right, rgba(194, 164, 83, 0.22), transparent 36%), linear-gradient(135deg, rgba(255, 255, 255, 0.54), rgba(244, 236, 223, 0.92))',
          }}
        />
        <div className="relative mx-auto max-w-[1280px] px-4 py-14 sm:px-8 md:py-18">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
              <button type="button" onClick={() => navigateTo('/')} className="transition-colors hover:text-stone-900">
                Home
              </button>
              <ArrowRight size={14} strokeWidth={1.5} />
              <span className="text-stone-900">Contact</span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_360px] lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b765e]">
                  Contact Wansati Brands
                </p>
                <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">
                  Your voice matters, and we&apos;re here to listen.
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
                  Reach out for product questions, order support, or store visits. This page keeps every important
                  contact detail visible and puts a simple contact form first, so getting help feels immediate.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`tel:${CONTACT_PHONE_LINK}`}
                    className="btn-gold-textured inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-widest"
                  >
                    Call Us
                    <PhoneCall className="h-4 w-4" strokeWidth={1.6} />
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center justify-center gap-2 border border-stone-900 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
                  >
                    Email Directly
                    <Mail className="h-4 w-4" strokeWidth={1.6} />
                  </a>
                </div>
              </div>

              <div className="border border-stone-200 bg-white/85 p-6 shadow-[0_24px_60px_rgba(42,38,32,0.08)] backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Best Time To Reach Us</p>
                <p className="mt-3 font-serif text-2xl text-stone-900">Phone support during trading hours.</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Email anytime, or call during business hours for the fastest response from the Johannesburg team.
                </p>
                <div className="mt-6 space-y-4">
                  {BUSINESS_HOURS.map((entry) => (
                    <div key={entry.label} className="flex items-start justify-between gap-4 border-t border-stone-200 pt-4 text-sm">
                      <span className="font-medium text-stone-700">{entry.label}</span>
                      <span className="text-right text-stone-500">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_390px]">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
            <div className="border border-stone-200 bg-[#fcfaf5] p-6 shadow-sm md:p-8">
              <div className="mb-8 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone-300 text-[#8b765e]">
                  <Send className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Send A Message</p>
                  <h2 className="mt-2 font-serif text-2xl text-stone-900 md:text-3xl">Start with a quick note.</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
                    Fill this in and we&apos;ll prepare an email draft addressed to our team. It keeps the page usable now
                    without pretending there&apos;s a backend contact system already wired up.
                  </p>
                </div>
              </div>

              <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Name</span>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={handleFieldChange('name')}
                    placeholder="Your full name"
                    className="premium-input w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Email</span>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={handleFieldChange('email')}
                    placeholder="you@example.com"
                    className="premium-input w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Phone</span>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={handleFieldChange('phone')}
                    placeholder="+27"
                    className="premium-input w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Subject</span>
                  <select
                    value={formState.subject}
                    onChange={handleFieldChange('subject')}
                    className="premium-input w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-stone-500"
                  >
                    {ENQUIRY_TYPES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Message</span>
                  <textarea
                    value={formState.message}
                    onChange={handleFieldChange('message')}
                    placeholder="Tell us how we can help."
                    className="premium-input min-h-[180px] w-full resize-y border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                    required
                  />
                </label>

                <div className="md:col-span-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <p className="max-w-xl text-xs leading-relaxed text-stone-500">
                    The button below opens your device&apos;s mail app and fills in the message for
                    <a href={`mailto:${CONTACT_EMAIL}`} className="ml-1 font-semibold text-stone-800 hover:text-stone-950">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                  <button
                    type="submit"
                    className="btn-gold-textured inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-widest"
                  >
                    Open Email Draft
                    <MoveRight className="h-4 w-4" strokeWidth={1.7} />
                  </button>
                </div>

                {mailDraftPrepared ? (
                  <div className="md:col-span-2 border border-[#d9c79b] bg-[#f7f0dc] px-4 py-3 text-sm text-stone-700">
                    Your draft should be ready in your email app. If nothing opened, email us directly or call during
                    trading hours.
                  </div>
                ) : null}
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="space-y-6"
          >
            <div className="border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#8b765e]" strokeWidth={1.7} />
                <h3 className="font-serif text-xl text-stone-900">Direct Contact</h3>
              </div>
              <div className="space-y-5 text-sm text-stone-600">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Email</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-base font-medium text-stone-900 hover:text-[#8b765e]">
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <div className="border-t border-stone-200 pt-5">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Phone</p>
                  <a href={`tel:${CONTACT_PHONE_LINK}`} className="text-base font-medium text-stone-900 hover:text-[#8b765e]">
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>

            <div className="border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-[#8b765e]" strokeWidth={1.7} />
                <h3 className="font-serif text-xl text-stone-900">Trading Hours</h3>
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

            <div className="border border-stone-200 bg-[#f7f2ea] p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#8b765e]" strokeWidth={1.7} />
                <h3 className="font-serif text-xl text-stone-900">Visit Us</h3>
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
                <MoveRight className="h-4 w-4" strokeWidth={1.7} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-8 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mx-auto max-w-[1280px] overflow-hidden border border-stone-200 bg-[#1b1814] text-white"
        >
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="relative overflow-hidden p-8 md:p-10 lg:p-12">
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    'radial-gradient(circle at top left, rgba(194, 164, 83, 0.28), transparent 34%), linear-gradient(140deg, rgba(255,255,255,0.04), rgba(27,24,20,0.02))',
                }}
              />
              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#c7ae6e]">Johannesburg Store</p>
                <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight text-white md:text-4xl">
                  Find us in the heart of the city and plan your visit with confidence.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-300 md:text-base">
                  The page keeps the essentials visible: address, opening hours, direct phone contact, and a quick route
                  into email. That gives customers multiple ways to connect without hunting through the site.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-textured inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-widest"
                  >
                    Plan Your Visit
                    <MapPin className="h-4 w-4" strokeWidth={1.6} />
                  </a>
                  <a
                    href={`tel:${CONTACT_PHONE_LINK}`}
                    className="inline-flex items-center justify-center gap-2 border border-white/30 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-stone-900"
                  >
                    Speak To The Team
                    <PhoneCall className="h-4 w-4" strokeWidth={1.6} />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-8 lg:border-l lg:border-t-0 md:p-10">
              <div className="mb-8 flex items-center gap-3">
                <Store className="h-5 w-5 text-[#c7ae6e]" strokeWidth={1.7} />
                <h3 className="font-serif text-2xl text-white">At A Glance</h3>
              </div>
              <div className="space-y-6 text-sm text-stone-300">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#c7ae6e]">Address</p>
                  <p className="leading-relaxed">
                    Room 914, Ottawa Mall
                    <br />
                    94 Helen Joseph Street
                    <br />
                    Johannesburg, 2001
                  </p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#c7ae6e]">Phone</p>
                  <a href={`tel:${CONTACT_PHONE_LINK}`} className="text-base text-white hover:text-[#e2c985]">
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#c7ae6e]">Email</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-base text-white hover:text-[#e2c985]">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
