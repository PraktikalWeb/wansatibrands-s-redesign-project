import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

type TermsAndConditionsPageProps = {
  navigateTo: (path: string) => void;
};

type TermsSection = {
  title: string;
  paragraphs?: string[];
  items?: Array<{
    title?: string;
    text: string;
  }>;
};

const termsSections: TermsSection[] = [
  {
    title: 'Welcome',
    paragraphs: [
      'Welcome to Wansaty Beauty (“we,” “our,” or “us”). These Terms and Conditions (“Terms”) govern your use of our website (the “Site”) and the purchase of products and services from us.',
      'By accessing or using the Site and making purchases, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use our Site or purchase our products and services.',
    ],
  },
  {
    title: '1. Use of the Site',
    items: [
      {
        title: '1.1. Eligibility',
        text: 'You must be at least 18 years old to use our Site and make purchases.',
      },
      {
        title: '1.2. Account Registration',
        text: 'To make a purchase, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and agree to accept responsibility for all activities that occur under your account.',
      },
      {
        title: '1.3. Accuracy of Information',
        text: 'You agree to provide accurate, current, and complete information during the registration and purchase process.',
      },
    ],
  },
  {
    title: '2. Product Orders',
    items: [
      {
        title: '2.1. Pricing',
        text: 'Product prices are subject to change without notice. Prices displayed on our Site are in South African Rand (ZAR) and include applicable taxes.',
      },
      {
        title: '2.2. Payment',
        text: 'We accept payment via the methods specified on our Site. By providing your payment information, you represent and warrant that you have the legal right to use the payment method you choose.',
      },
      {
        title: '2.3. Order Acceptance',
        text: 'Your order is an offer to purchase our products, which we may accept or reject at our discretion. We reserve the right to cancel or limit quantities of any order.',
      },
      {
        title: '2.4. Shipping and Delivery',
        text: 'Shipping and delivery details are provided on our Site. Please review our shipping and delivery policy for additional information.',
      },
    ],
  },
  {
    title: '3. Returns and Refunds',
    items: [
      {
        title: '3.1. Return Policy',
        text: 'Please refer to our Return Policy, available on our Site, for information on returning products and requesting refunds.',
      },
    ],
  },
  {
    title: '4. Intellectual Property',
    items: [
      {
        title: '4.1. Ownership',
        text: 'All content on our Site, including text, graphics, logos, images, and software, is our property or the property of our licensors and is protected by copyright and other intellectual property laws.',
      },
      {
        title: '4.2. Use Restrictions',
        text: 'You may not copy, reproduce, modify, distribute, display, perform, or create derivative works from any content on our Site without our prior written consent.',
      },
    ],
  },
  {
    title: '5. Privacy',
    items: [
      {
        title: '5.1. Data Protection',
        text: 'We collect and process your personal information in accordance with our Privacy Policy, available on our Site. By using our Site, you consent to such data processing.',
      },
    ],
  },
  {
    title: '6. Disclaimers',
    items: [
      {
        title: '6.1. No Warranties',
        text: 'We provide our Site and products on an “as is” and “as available” basis without warranties of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.',
      },
    ],
  },
  {
    title: '7. Limitation of Liability',
    items: [
      {
        title: '7.1. Exclusion of Damages',
        text: 'In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use our Site or products; (b) any unauthorized access to or use of our servers and/or any personal information stored therein; (c) any interruption or cessation of transmission to or from our Site; (d) any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Site; or (e) any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available via the Site.',
      },
    ],
  },
  {
    title: '8. Governing Law',
    items: [
      {
        title: '8.1. Jurisdiction',
        text: 'These Terms shall be governed by and construed in accordance with the laws of South Africa, without regard to its conflict of law principles.',
      },
    ],
  },
  {
    title: '9. Changes to Terms',
    items: [
      {
        title: '9.1. Modification',
        text: 'We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting on our Site. Your continued use of the Site and purchase of our products after any changes to these Terms will signify your agreement to the revised Terms.',
      },
    ],
  },
  {
    title: '10. Contact Us',
    paragraphs: ['If you have any questions or concerns regarding these Terms, please contact us at:'],
    items: [
      {
        text: 'Wansaty Beauty',
      },
      {
        text: 'info@wansatibrands.co.za',
      },
    ],
  },
];

export default function TermsAndConditionsPage({ navigateTo }: TermsAndConditionsPageProps) {
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
              <span className="text-stone-900">Terms And Conditions</span>
            </div>

            <div className="max-w-3xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Legal Information</p>
              <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">Terms and Conditions</h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
                These terms set the rules for using the Wansati website and purchasing products through the store.
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
          {termsSections.map((section, index) => (
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
            By using the site and purchasing products, you agree to these Terms and Conditions. If you need more detail, please contact the Wansati team.
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
              onClick={() => navigateTo('/privacy-policy')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-stone-900 transition-colors hover:text-[#8b765e]"
            >
              View Privacy Policy
              <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
