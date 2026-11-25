import { Download } from 'lucide-react';

export const blackFridayEmailPath = '/email/black-friday';

const templateUrl = `${import.meta.env.BASE_URL}emails/wansati-black-friday.html`;

export default function BlackFridayEmailPage() {
  return (
    <section className="bg-[#f6f2e9] px-4 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="font-serif text-3xl text-[#191611] sm:text-4xl">Black Friday email preview</h1>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              <span className="font-semibold">Subject</span>{' '}
              Black Friday is here at Wansati! | Up to 15% off
            </p>
          </div>
          <a
            href={templateUrl}
            download="wansati-black-friday.html"
            className="inline-flex items-center gap-2 rounded-full bg-[#151311] px-5 py-3 text-sm font-semibold text-[#f4dc93] transition-colors hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-800"
          >
            <Download size={17} aria-hidden="true" />
            Download HTML
          </a>
        </div>
        <iframe
          title="Wansati Black Friday customer email"
          src={templateUrl}
          sandbox="allow-popups allow-popups-to-escape-sandbox"
          className="block h-[min(80vh,64rem)] min-h-96 w-full rounded-xl border border-stone-300 bg-[#f6f2e9]"
        />
        <p className="mt-4 text-xs leading-relaxed text-stone-600">
          The unsubscribe link opens the WordPress.com subscription manager for Wansati’s Jetpack subscribers.
        </p>
      </div>
    </section>
  );
}
