import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

type ReturnsPolicyPageProps = {
  navigateTo: (path: string) => void;
};

type ReturnsSection = {
  title: string;
  paragraphs?: string[];
  items?: Array<{
    title?: string;
    text: string;
  }>;
};

const returnsSections: ReturnsSection[] = [
  {
    title: 'Welcome',
    paragraphs: [
      'At Wansaty Beauty, we take pride in providing you with high-quality beauty products. We want you to be completely satisfied with your purchase.',
      'If for any reason you are not entirely happy with your order, we are here to help. This Returns Policy outlines our procedures for returning and exchanging products. Please read this policy carefully to understand your options and obligations.',
    ],
  },
  {
    title: '1. Eligibility for Returns',
    items: [
      {
        title: '1.1. Damaged or Defective Products',
        text: 'We accept returns and exchanges for products that arrive damaged or are defective upon receipt. If your order arrives in unsatisfactory condition, please contact us within 7 days of receiving your package to initiate a return or exchange.',
      },
      {
        title: '1.2. Incorrect Items',
        text: 'If you receive the wrong product(s) due to an error on our part, we will gladly arrange for a return or exchange. Please notify us within 7 days of receiving your order.',
      },
    ],
  },
  {
    title: '2. Returns Procedure',
    items: [
      {
        title: '2.1. Notification',
        text: 'To initiate a return or exchange, please contact our customer support team at info@wansatibrands.co.za. Provide your order number, a description of the issue, and clear photographs of any damaged or incorrect items. We will assess your request and guide you through the returns process.',
      },
      {
        title: '2.2. Return Authorization',
        text: 'Once your return request is approved, we will provide you with a return authorization number (RMA). Please include this RMA number in your return package.',
      },
      {
        title: '2.3. Return Packaging',
        text: 'Ensure that the product(s) are securely packed in their original packaging, if available, or similar protective packaging. Please include a copy of your invoice or a note with your name and order number.',
      },
      {
        title: '2.4. Shipping',
        text: 'You are responsible for the cost of shipping the returned item(s) to us. We recommend using a trackable shipping service or purchasing shipping insurance to ensure that we receive your return.',
      },
    ],
  },
  {
    title: '3. Refunds and Exchanges',
    items: [
      {
        title: '3.1. Refunds',
        text: 'Upon receiving your returned item(s) and verifying their condition, we will process a refund to your original payment method. Refunds may take several business days to appear on your account, depending on your financial institution’s processing times.',
      },
      {
        title: '3.2. Exchanges',
        text: 'If you requested an exchange, we will ship the replacement product(s) to you once we receive the returned item(s) and confirm their eligibility for exchange.',
      },
    ],
  },
  {
    title: '4. Conditions for Returns',
    items: [
      {
        title: '4.1.',
        text: 'To be eligible for a return or exchange, the product(s) must be in their original condition, unopened, unused, and with all original packaging and labels intact.',
      },
      {
        title: '4.2.',
        text: 'We reserve the right to reject returns or exchanges if the product(s) show signs of tampering, use, or damage not caused by shipping or manufacturing defects.',
      },
    ],
  },
  {
    title: '5. Contact Us',
    paragraphs: [
      'If you have any questions or need assistance with your return or exchange, please contact our customer support team at info@wansatibrands.co.za.',
    ],
  },
  {
    title: '6. Changes to Returns Policy',
    paragraphs: [
      'We reserve the right to update and modify our Returns Policy at any time. Any changes will be effective immediately upon posting on our website.',
    ],
  },
];

export default function ReturnsPolicyPage({ navigateTo }: ReturnsPolicyPageProps) {
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
              <span className="text-stone-900">Returns Policy</span>
            </div>

            <div className="max-w-3xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Legal Information</p>
              <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">Returns Policy</h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
                This page explains how returns, exchanges, and refunds are handled for Wansati orders.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[960px] px-4 py-12 sm:px-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="border border-stone-200 bg-[#fcfaf5] p-6 md:p-8">
            <div className="grid gap-4 text-sm leading-relaxed text-stone-600 md:grid-cols-2">
              <p>
                <span className="font-semibold text-stone-900">Effective date:</span> 1 September 2023
              </p>
              <p>
                <span className="font-semibold text-stone-900">Last updated:</span> 15 September 2023
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 space-y-6">
          {returnsSections.map((section, index) => (
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
                    <li key={`${item.title ?? 'item'}-${item.text}`} className="border-t border-stone-200 pt-4 first:border-t-0 first:pt-0">
                      {item.title ? <span className="font-semibold text-stone-900">{item.title} </span> : null}
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
            By making a purchase from Wansaty Beauty, you agree to abide by the terms and conditions of this Returns Policy. We appreciate your trust in our products and are committed to ensuring your satisfaction.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-stone-900 transition-colors hover:text-[#8b765e]"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/terms-and-conditions')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-stone-900 transition-colors hover:text-[#8b765e]"
            >
              View Terms
              <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
