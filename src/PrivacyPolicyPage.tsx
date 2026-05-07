import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';

type PrivacyPolicyPageProps = {
  navigateTo: (path: string) => void;
};

type PolicySection = {
  title: string;
  paragraphs?: string[];
  items?: Array<{
    title?: string;
    text: string;
  }>;
};

const policySections: PolicySection[] = [
  {
    title: 'Who we are',
    paragraphs: ['Our website address is: https://www.wansatibrands.co.za.'],
  },
  {
    title: 'Comments',
    paragraphs: [
      'When visitors leave comments on the site, we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help with spam detection.',
      'An anonymized string created from your email address, also called a hash, may be provided to the Gravatar service to see if you are using it. After approval of your comment, your profile picture is visible to the public in the context of your comment.',
    ],
  },
  {
    title: 'Media',
    paragraphs: [
      'If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.',
    ],
  },
  {
    title: 'Cookies',
    items: [
      {
        text: 'If you leave a comment on our site, you may opt in to saving your name, email address, and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies last for one year.',
      },
      {
        text: 'If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.',
      },
      {
        text: 'When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.',
      },
      {
        text: 'If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after one day.',
      },
    ],
  },
  {
    title: 'Embedded content from other websites',
    paragraphs: [
      'Articles on this site may include embedded content such as videos, images, and articles. Embedded content from other websites behaves in the exact same way as if you had visited the other website directly.',
      'These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction if you have an account and are logged in to that website.',
    ],
  },
  {
    title: 'Who we share your data with',
    paragraphs: ['If you request a password reset, your IP address will be included in the reset email.'],
  },
  {
    title: 'How long we retain your data',
    paragraphs: [
      'If you leave a comment, the comment and its metadata are retained indefinitely. This helps us recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.',
      'For users that register on our website, we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time, except they cannot change their username. Website administrators can also see and edit that information.',
    ],
  },
  {
    title: 'What rights you have over your data',
    paragraphs: [
      'If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us.',
      'You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.',
    ],
  },
  {
    title: 'Where your data is sent',
    paragraphs: ['Visitor comments may be checked through an automated spam detection service.'],
  },
];

export default function PrivacyPolicyPage({ navigateTo }: PrivacyPolicyPageProps) {
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
              <span className="text-stone-900">Privacy Policy</span>
            </div>

            <div className="max-w-3xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Legal Information</p>
              <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">Privacy Policy</h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
                This page explains how Wansati Brands collects, uses, stores, and protects personal information when
                you browse the site, leave comments, or create an account.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[960px] px-4 py-12 sm:px-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="border border-stone-200 bg-[#fcfaf5] p-6 md:p-8">
            <p className="text-sm leading-relaxed text-stone-600">
              This privacy policy reflects the information currently provided on the Wansati Brands website.
            </p>

            <div className="mt-6">
              <a
                href="https://automattic.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-stone-900 transition-colors hover:text-[#8b765e]"
              >
                Gravatar privacy policy
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 space-y-6">
          {policySections.map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.04 * index }}
              className="border border-stone-200 bg-white p-6 md:p-8"
            >
              <h2 className="font-serif text-2xl text-stone-900 md:text-3xl">{section.title}</h2>

              {section.paragraphs ? (
                <div className="mt-5 space-y-4 text-sm leading-8 text-stone-700 md:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : null}

              {section.items ? (
                <ul className="mt-5 space-y-4 text-sm leading-8 text-stone-700 md:text-base">
                  {section.items.map((item) => (
                    <li key={item.text} className="border-t border-stone-200 pt-4 first:border-t-0 first:pt-0">
                      {item.title ? <span className="font-semibold text-stone-900">{item.title}: </span> : null}
                      {item.text}
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mt-8 border border-stone-200 bg-[#fcfaf5] p-6 md:p-8"
        >
          <p className="text-sm leading-relaxed text-stone-600">
            If you have any questions about this policy or about how your information is handled, you can reach us via
            the contact page.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('/contact')}
            className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-stone-900 transition-colors hover:text-[#8b765e]"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
          </button>
        </motion.div>
      </section>
    </>
  );
}
