import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
  User,
} from 'lucide-react';
import FormFeedback, { FormFeedbackTone } from './FormFeedback';
import amexLogo from './assets/payment/amex-logo.svg';
import payfastLogo from './assets/payment/payfast-logo.svg';
import yocoLogo from './assets/payment/yoco-logo.svg';
import yocoMastercardLogo from './assets/payment/yoco-mastercard.svg';
import yocoMasterpassLogo from './assets/payment/yoco-masterpass.svg';
import yocoVisaLogo from './assets/payment/yoco-visa.svg';

type CartItem = {
  id: string;
  title: string;
  priceLabel: string;
  image: string;
  quantity: number;
  unitPrice: number;
  imageFit?: 'cover' | 'contain';
};

type CheckoutPageProps = {
  navigateTo: (path: string) => void;
  cartItems: CartItem[];
  cartSubtotal: number;
  deliveryFee: number;
  formatRand: (amount: number) => string;
  returnPolicyUrl: string;
};

type DeliveryMethod = 'ship' | 'pickup';
type PickupLocation = 'johannesburg' | 'benoni';
type PaymentMethod = 'payfast' | 'yoco';

type FormNotice = {
  tone: FormFeedbackTone;
  message: string;
} | null;

const provinces = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape',
];

const pickupLocations = [
  {
    id: 'johannesburg' as const,
    title: 'Johannesburg Factory',
    address: 'Ottawa Mall, 9th Floor, 94 Helen Joseph Street, Johannesburg, 2001',
  },
  {
    id: 'benoni' as const,
    title: 'Benoni Store',
    address: 'CCMA Place, Shop 5, 60 Woburn Avenue, Benoni, 1500',
  },
];

const yocoAcceptedCards = [
  { name: 'Visa', logo: yocoVisaLogo, className: 'h-4 sm:h-5' },
  { name: 'Mastercard', logo: yocoMastercardLogo, className: 'h-4 sm:h-5' },
  { name: 'MasterPass', logo: yocoMasterpassLogo, className: 'h-4 sm:h-5' },
  { name: 'American Express', logo: amexLogo, className: 'h-4 sm:h-5' },
];

const inputClassName =
  'w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 outline-none transition-colors focus:border-stone-500';

const labelClassName =
  'mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-stone-700';

const sectionCardClassName = 'border border-stone-200 bg-white p-6 md:p-8';

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function CheckoutPage({
  navigateTo,
  cartItems,
  cartSubtotal,
  deliveryFee,
  formatRand,
  returnPolicyUrl,
}: CheckoutPageProps) {
  const [email, setEmail] = useState('');
  const [subscribeToNews, setSubscribeToNews] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('ship');
  const [pickupLocation, setPickupLocation] = useState<PickupLocation>('johannesburg');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('Gauteng');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [sameBillingAddress, setSameBillingAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('payfast');
  const [addOrderNote, setAddOrderNote] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [notice, setNotice] = useState<FormNotice>(null);

  const activeDeliveryFee = deliveryMethod === 'pickup' ? 0 : deliveryFee;
  const checkoutTotal = cartSubtotal + activeDeliveryFee;
  const selectedPickupLocation = pickupLocations.find((location) => location.id === pickupLocation);

  const clearNotice = () => {
    if (notice) {
      setNotice(null);
    }
  };

  const handlePlaceOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      setNotice({
        tone: 'error',
        message: 'Your cart is empty. Add products before continuing to checkout.',
      });
      return;
    }

    if (!email.trim()) {
      setNotice({
        tone: 'error',
        message: 'Please enter your email address so we can send your order confirmation.',
      });
      return;
    }

    if (!isValidEmail(email.trim())) {
      setNotice({
        tone: 'error',
        message: 'Please enter a valid email address before placing your order.',
      });
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      setNotice({
        tone: 'error',
        message: 'Please enter your first name and last name before continuing.',
      });
      return;
    }

    if (deliveryMethod === 'ship' && (!addressLine1.trim() || !city.trim() || !province.trim() || !postalCode.trim())) {
      setNotice({
        tone: 'error',
        message: 'Please complete your shipping address so we can prepare delivery.',
      });
      return;
    }

    if (!acceptTerms) {
      setNotice({
        tone: 'error',
        message: 'Please agree to the Terms and Conditions and Privacy Policy before placing your order.',
      });
      return;
    }

    const deliveryMessage =
      deliveryMethod === 'pickup'
        ? `Your order is ready to continue with ${paymentMethod === 'payfast' ? 'Payfast' : 'Yoco'} and collect from ${selectedPickupLocation?.title}.`
        : `Your order is ready to continue with ${paymentMethod === 'payfast' ? 'Payfast' : 'Yoco'} and ship to your selected address.`;

    setNotice({
      tone: 'success',
      message: `${deliveryMessage} This checkout is currently a prototype, so payment is not processed yet.`,
    });
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200 bg-[#f4ecdf]">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(circle at top right, rgba(194, 164, 83, 0.18), transparent 38%), linear-gradient(135deg, rgba(255, 255, 255, 0.52), rgba(244, 236, 223, 0.9))',
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-4 py-14 sm:px-8 md:py-18">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b765e]">Checkout</p>
                <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">Complete your order.</h1>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
                <button type="button" onClick={() => navigateTo('/')} className="transition-colors hover:text-stone-900">
                  Home
                </button>
                <ArrowRight size={14} strokeWidth={1.5} />
                <span className="text-stone-900">Checkout</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {cartItems.length > 0 ? (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
              <form id="checkout-form" className="space-y-6" noValidate onSubmit={handlePlaceOrder}>
                <div className="border-b border-stone-200 pb-6">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8b765e]">
                    Secure checkout
                  </p>
                  <h2 className="font-serif text-3xl text-stone-900">Checkout details</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
                    The structure follows the original Wansati checkout flow, but rebuilt into the new storefront style.
                  </p>
                </div>

                {notice ? <FormFeedback tone={notice.tone} message={notice.message} /> : null}

                <section className={sectionCardClassName}>
                  <div className="mb-6 flex items-start gap-4 border-b border-stone-200 pb-5">
                    <Mail className="mt-0.5 h-5 w-5 text-[#8b765e]" strokeWidth={1.8} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">
                        Contact information
                      </p>
                      <h3 className="mt-2 font-serif text-2xl text-stone-900">Where should we reach you?</h3>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <label className="block">
                      <span className={labelClassName}>
                        Email address <span className="text-[#8b765e]">*</span>
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          clearNotice();
                        }}
                        className={inputClassName}
                      />
                    </label>

                    <label className="flex items-center gap-3 text-sm text-stone-600">
                      <input
                        type="checkbox"
                        checked={subscribeToNews}
                        onChange={(event) => setSubscribeToNews(event.target.checked)}
                        className="h-4 w-4 border-stone-400 text-stone-900 focus:ring-stone-400"
                      />
                      <span>Email me with news and offers</span>
                    </label>
                  </div>
                </section>

                <section className={sectionCardClassName}>
                  <div className="mb-6 flex items-start gap-4 border-b border-stone-200 pb-5">
                    <Truck className="mt-0.5 h-5 w-5 text-[#8b765e]" strokeWidth={1.8} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">Delivery</p>
                      <h3 className="mt-2 font-serif text-2xl text-stone-900">Choose how you want to receive your order.</h3>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryMethod('ship');
                        clearNotice();
                      }}
                      className={`border p-5 text-left transition-colors ${
                        deliveryMethod === 'ship'
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-300 bg-white text-stone-900 hover:border-stone-500'
                      }`}
                    >
                      <Truck className="h-5 w-5" strokeWidth={1.8} />
                      <h4 className="mt-4 text-sm font-semibold uppercase tracking-[0.16em]">Ship</h4>
                      <p className={`mt-2 text-sm leading-relaxed ${deliveryMethod === 'ship' ? 'text-stone-200' : 'text-stone-500'}`}>
                        Standard shipping in 5 to 7 days across South Africa.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryMethod('pickup');
                        clearNotice();
                      }}
                      className={`border p-5 text-left transition-colors ${
                        deliveryMethod === 'pickup'
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-300 bg-white text-stone-900 hover:border-stone-500'
                      }`}
                    >
                      <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
                      <h4 className="mt-4 text-sm font-semibold uppercase tracking-[0.16em]">Pickup in store</h4>
                      <p
                        className={`mt-2 text-sm leading-relaxed ${
                          deliveryMethod === 'pickup' ? 'text-stone-200' : 'text-stone-500'
                        }`}
                      >
                        Collect from one of the Wansati pickup points at no delivery charge.
                      </p>
                    </button>
                  </div>
                </section>

                <section className={sectionCardClassName}>
                  <div className="mb-6 flex items-start gap-4 border-b border-stone-200 pb-5">
                    <MapPin className="mt-0.5 h-5 w-5 text-[#8b765e]" strokeWidth={1.8} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">
                        {deliveryMethod === 'ship' ? 'Shipping address' : 'Pickup details'}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl text-stone-900">
                        {deliveryMethod === 'ship' ? 'Where should we send it?' : 'Choose your collection point.'}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="block">
                        <span className={labelClassName}>
                          First name <span className="text-[#8b765e]">*</span>
                        </span>
                        <div className="relative">
                          <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.7} />
                          <input
                            type="text"
                            value={firstName}
                            onChange={(event) => {
                              setFirstName(event.target.value);
                              clearNotice();
                            }}
                            className={`${inputClassName} pl-11`}
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className={labelClassName}>
                          Last name <span className="text-[#8b765e]">*</span>
                        </span>
                        <div className="relative">
                          <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.7} />
                          <input
                            type="text"
                            value={lastName}
                            onChange={(event) => {
                              setLastName(event.target.value);
                              clearNotice();
                            }}
                            className={`${inputClassName} pl-11`}
                          />
                        </div>
                      </label>
                    </div>

                    {deliveryMethod === 'ship' ? (
                      <>
                        <label className="block">
                          <span className={labelClassName}>
                            Country / region <span className="text-[#8b765e]">*</span>
                          </span>
                          <select className={inputClassName} value="South Africa" onChange={() => undefined}>
                            <option>South Africa</option>
                          </select>
                        </label>

                        <label className="block">
                          <span className={labelClassName}>
                            Address <span className="text-[#8b765e]">*</span>
                          </span>
                          <input
                            type="text"
                            value={addressLine1}
                            onChange={(event) => {
                              setAddressLine1(event.target.value);
                              clearNotice();
                            }}
                            className={inputClassName}
                          />
                        </label>

                        <label className="block">
                          <span className={labelClassName}>Apartment, suite, etc. (optional)</span>
                          <input
                            type="text"
                            value={addressLine2}
                            onChange={(event) => setAddressLine2(event.target.value)}
                            className={inputClassName}
                          />
                        </label>

                        <div className="grid gap-5 md:grid-cols-2">
                          <label className="block">
                            <span className={labelClassName}>
                              City <span className="text-[#8b765e]">*</span>
                            </span>
                            <input
                              type="text"
                              value={city}
                              onChange={(event) => {
                                setCity(event.target.value);
                                clearNotice();
                              }}
                              className={inputClassName}
                            />
                          </label>

                          <label className="block">
                            <span className={labelClassName}>
                              Province <span className="text-[#8b765e]">*</span>
                            </span>
                            <select
                              value={province}
                              onChange={(event) => {
                                setProvince(event.target.value);
                                clearNotice();
                              }}
                              className={inputClassName}
                            >
                              {provinces.map((provinceName) => (
                                <option key={provinceName} value={provinceName}>
                                  {provinceName}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                          <label className="block">
                            <span className={labelClassName}>
                              Postal code <span className="text-[#8b765e]">*</span>
                            </span>
                            <input
                              type="text"
                              value={postalCode}
                              onChange={(event) => {
                                setPostalCode(event.target.value);
                                clearNotice();
                              }}
                              className={inputClassName}
                            />
                          </label>

                          <label className="block">
                            <span className={labelClassName}>Phone (optional)</span>
                            <div className="relative">
                              <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.7} />
                              <input
                                type="tel"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                className={`${inputClassName} pl-11`}
                              />
                            </div>
                          </label>
                        </div>

                        <label className="flex items-center gap-3 text-sm text-stone-600">
                          <input
                            type="checkbox"
                            checked={sameBillingAddress}
                            onChange={(event) => setSameBillingAddress(event.target.checked)}
                            className="h-4 w-4 border-stone-400 text-stone-900 focus:ring-stone-400"
                          />
                          <span>Use same address for billing</span>
                        </label>
                      </>
                    ) : (
                      <div className="grid gap-4">
                        {pickupLocations.map((location) => (
                          <button
                            key={location.id}
                            type="button"
                            onClick={() => {
                              setPickupLocation(location.id);
                              clearNotice();
                            }}
                            className={`border p-5 text-left transition-colors ${
                              pickupLocation === location.id
                                ? 'border-[#8b765e] bg-[#f8f1e6]'
                                : 'border-stone-300 bg-white hover:border-stone-500'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-900">
                                  {location.title}
                                </h4>
                                <p className="mt-3 text-sm leading-relaxed text-stone-600">{location.address}</p>
                              </div>
                              <span
                                className={`mt-1 h-3 w-3 shrink-0 border ${
                                  pickupLocation === location.id ? 'border-stone-900 bg-stone-900' : 'border-stone-400'
                                }`}
                                aria-hidden="true"
                              />
                            </div>
                          </button>
                        ))}

                        <label className="block">
                          <span className={labelClassName}>Phone (optional)</span>
                          <div className="relative">
                            <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.7} />
                            <input
                              type="tel"
                              value={phone}
                              onChange={(event) => setPhone(event.target.value)}
                              className={`${inputClassName} pl-11`}
                            />
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                </section>

                {deliveryMethod === 'ship' ? (
                  <section className={sectionCardClassName}>
                    <div className="mb-6 flex items-start gap-4 border-b border-stone-200 pb-5">
                      <Truck className="mt-0.5 h-5 w-5 text-[#8b765e]" strokeWidth={1.8} />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">
                          Shipping option
                        </p>
                        <h3 className="mt-2 font-serif text-2xl text-stone-900">Delivery speed</h3>
                      </div>
                    </div>

                    <div className="border border-stone-300 bg-[#fcfaf5] p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-900">
                            Standard shipping
                          </h4>
                          <p className="mt-2 text-sm text-stone-600">5 - 7 days for South Africa</p>
                        </div>
                        <span className="text-sm font-semibold text-stone-900">{formatRand(activeDeliveryFee)}</span>
                      </div>
                    </div>
                  </section>
                ) : null}

                <section className={sectionCardClassName}>
                  <div className="mb-6 flex items-start gap-4 border-b border-stone-200 pb-5">
                    <CreditCard className="mt-0.5 h-5 w-5 text-[#8b765e]" strokeWidth={1.8} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">Payment</p>
                      <h3 className="mt-2 font-serif text-2xl text-stone-900">Select your payment option.</h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('payfast')}
                      aria-pressed={paymentMethod === 'payfast'}
                      className={`w-full border p-5 text-left transition-colors ${
                        paymentMethod === 'payfast'
                          ? 'border-stone-900 bg-stone-900 text-white shadow-[0_16px_36px_rgba(28,26,23,0.18)]'
                          : 'border-stone-300 bg-white hover:border-stone-500'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <span
                            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center border ${
                              paymentMethod === 'payfast'
                                ? 'border-white bg-white text-stone-900'
                                : 'border-stone-400 bg-white text-transparent'
                            }`}
                            aria-hidden="true"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                          </span>
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <p
                                className={`text-sm font-semibold uppercase tracking-[0.16em] ${
                                  paymentMethod === 'payfast' ? 'text-white' : 'text-stone-900'
                                }`}
                              >
                                Payfast
                              </p>
                              {paymentMethod === 'payfast' ? (
                                <span className="border border-white/40 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                                  Selected
                                </span>
                              ) : null}
                            </div>
                            <p
                              className={`mt-2 text-sm leading-relaxed ${
                                paymentMethod === 'payfast' ? 'text-stone-200' : 'text-stone-600'
                              }`}
                            >
                              Fast card and wallet checkout through Payfast.
                            </p>
                          </div>
                        </div>
                        <img src={payfastLogo} alt="Payfast" className="h-6 w-auto shrink-0 opacity-90" />
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('yoco')}
                      aria-pressed={paymentMethod === 'yoco'}
                      className={`w-full border p-5 text-left transition-colors ${
                        paymentMethod === 'yoco'
                          ? 'border-stone-900 bg-stone-900 text-white shadow-[0_16px_36px_rgba(28,26,23,0.18)]'
                          : 'border-stone-300 bg-white hover:border-stone-500'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <span
                            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center border ${
                              paymentMethod === 'yoco'
                                ? 'border-white bg-white text-stone-900'
                                : 'border-stone-400 bg-white text-transparent'
                            }`}
                            aria-hidden="true"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                          </span>
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <p
                                className={`text-sm font-semibold uppercase tracking-[0.16em] ${
                                  paymentMethod === 'yoco' ? 'text-white' : 'text-stone-900'
                                }`}
                              >
                                Yoco
                              </p>
                              {paymentMethod === 'yoco' ? (
                                <span className="border border-white/40 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                                  Selected
                                </span>
                              ) : null}
                            </div>
                            <p
                              className={`mt-2 text-sm leading-relaxed ${
                                paymentMethod === 'yoco' ? 'text-stone-200' : 'text-stone-600'
                              }`}
                            >
                              Pay securely using a card through Yoco.
                            </p>
                          </div>
                        </div>
                        <img src={yocoLogo} alt="Yoco" className="h-5 w-auto shrink-0 opacity-90" />
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {yocoAcceptedCards.map((card) => (
                          <img
                            key={card.name}
                            src={card.logo}
                            alt={card.name}
                            className={`${card.className} block w-auto max-h-8 shrink-0 object-contain opacity-90`}
                          />
                        ))}
                      </div>
                    </button>
                  </div>
                </section>

                <section className={sectionCardClassName}>
                  <div className="mb-6 flex items-start gap-4 border-b border-stone-200 pb-5">
                    <FileText className="mt-0.5 h-5 w-5 text-[#8b765e]" strokeWidth={1.8} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">Order note</p>
                      <h3 className="mt-2 font-serif text-2xl text-stone-900">Anything we should know?</h3>
                    </div>
                  </div>

                  <label className="flex items-center gap-3 text-sm text-stone-600">
                    <input
                      type="checkbox"
                      checked={addOrderNote}
                      onChange={(event) => setAddOrderNote(event.target.checked)}
                      className="h-4 w-4 border-stone-400 text-stone-900 focus:ring-stone-400"
                    />
                    <span>Add a note to your order</span>
                  </label>

                  <AnimatePresence initial={false}>
                    {addOrderNote ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <textarea
                          value={orderNote}
                          onChange={(event) => setOrderNote(event.target.value)}
                          rows={4}
                          className={`${inputClassName} mt-4 resize-none`}
                          placeholder="Special delivery notes, pickup timing, or anything else helpful."
                        />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </section>

                <section className={sectionCardClassName}>
                  <div className="flex items-start gap-3">
                    <input
                      id="checkout-terms"
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(event) => {
                        setAcceptTerms(event.target.checked);
                        clearNotice();
                      }}
                      className="mt-1 h-4 w-4 border-stone-400 text-stone-900 focus:ring-stone-400"
                    />
                    <div className="text-sm leading-relaxed text-stone-600">
                      <label htmlFor="checkout-terms" className="cursor-pointer">
                        By proceeding with your purchase you agree to our{' '}
                      </label>
                      <a
                        href="/terms-and-conditions"
                        onClick={(event) => {
                          event.preventDefault();
                          navigateTo('/terms-and-conditions');
                        }}
                        className="font-medium text-stone-900 underline underline-offset-4"
                      >
                        Terms and Conditions
                      </a>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={() => navigateTo('/privacy-policy')}
                        className="font-medium text-stone-900 underline underline-offset-4"
                      >
                        Privacy Policy
                      </button>
                      .
                    </div>
                  </div>
                </section>

                <div className="flex flex-col gap-4 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => navigateTo('/cart')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-500 transition-colors hover:text-stone-900"
                  >
                    <ArrowRight size={14} strokeWidth={1.6} className="rotate-180" />
                    Return to Cart
                  </button>

                  <button
                    type="submit"
                    className="btn-gold-textured px-8 py-4 text-xs font-bold uppercase tracking-[0.16em]"
                  >
                    Place Order
                  </button>
                </div>
              </form>

              <aside className="lg:sticky lg:top-28">
                <div className="border border-stone-200 bg-stone-100 p-6 md:p-8">
                  <div className="mb-6 border-b border-stone-200 pb-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">Order summary</p>
                    <h3 className="mt-2 font-serif text-2xl text-stone-900">Review before payment.</h3>
                  </div>

                  <div className="space-y-4 border-b border-stone-200 pb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-white">
                          <img
                            src={item.image}
                            alt={item.title}
                            className={`absolute inset-0 h-full w-full ${item.imageFit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-medium leading-relaxed text-stone-900">{item.title}</h4>
                          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone-500">Qty {item.quantity}</p>
                          <p className="mt-3 text-sm font-semibold text-stone-900">
                            {formatRand(item.unitPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-b border-stone-200 py-5">
                    <button
                      type="button"
                      onClick={() => setShowCoupon((previous) => !previous)}
                      className="flex w-full items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-600 transition-colors hover:text-stone-900"
                    >
                      <Tag size={14} />
                      Add coupons
                      {showCoupon ? <ChevronUp size={14} className="ml-auto" /> : <ChevronDown size={14} className="ml-auto" />}
                    </button>

                    <AnimatePresence initial={false}>
                      {showCoupon ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 flex flex-col gap-2">
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(event) => setCouponCode(event.target.value)}
                              placeholder="Coupon code"
                              className={inputClassName}
                            />
                            <button
                              type="button"
                              className="bg-stone-900 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-stone-800"
                            >
                              Apply
                            </button>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-4 py-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Subtotal</span>
                      <span className="font-medium text-stone-900">{formatRand(cartSubtotal)}</span>
                    </div>

                    <div className="flex justify-between gap-5 text-sm">
                      <span className="text-stone-500">
                        {deliveryMethod === 'pickup' ? 'Pickup in Store' : 'Standard Shipping'}
                      </span>
                      <span className="font-medium text-stone-900">
                        {activeDeliveryFee === 0 ? 'Free' : formatRand(activeDeliveryFee)}
                      </span>
                    </div>

                    <div className="flex items-end justify-between border-t border-stone-200 pt-4">
                      <span className="text-base font-bold text-stone-900">Total</span>
                      <span className="font-serif text-2xl text-stone-900">{formatRand(checkoutTotal)}</span>
                    </div>
                  </div>

                  <div className="border-t border-stone-200 pt-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">
                        Accepted payments
                      </span>
                      <ShieldCheck size={16} strokeWidth={1.8} className="shrink-0 text-[#8b765e]" />
                    </div>

                    <div className="mt-4 space-y-4">
                      <img src={payfastLogo} alt="Payfast" className="h-5 w-auto opacity-85" />

                      <div className="flex items-center justify-between gap-3">
                        <img src={yocoLogo} alt="Yoco" className="h-4 w-auto shrink-0 opacity-85" />
                        <div className="flex flex-wrap items-center justify-end gap-x-1.5 gap-y-2">
                          {yocoAcceptedCards.map((card) => (
                            <img
                              key={card.name}
                              src={card.logo}
                              alt={card.name}
                              className={`${card.className} block w-auto max-h-8 shrink-0 object-contain opacity-90`}
                            />
                          ))}
                        </div>
                      </div>

                      <a
                        href={returnPolicyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 border-t border-stone-200 pt-4 text-[11px] uppercase tracking-[0.22em] text-stone-500 transition-colors hover:text-stone-900"
                      >
                        return policy
                        <ArrowRight size={12} strokeWidth={1.6} />
                      </a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border border-stone-100 bg-stone-50 py-12 text-center md:py-14">
              <ShoppingBag size={64} strokeWidth={1} className="mb-6 text-stone-300" />
              <h2 className="mb-2 font-serif text-2xl text-stone-900">Your cart is empty</h2>
              <p className="mb-8 max-w-md text-stone-500">
                There is nothing to check out yet. Add a few Wansati pieces first and then return here to complete your order.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigateTo('/')}
                  className="btn-gold-textured px-8 py-3.5 text-xs font-bold uppercase tracking-widest"
                >
                  Return to Shop
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('/cart')}
                  className="border border-stone-900 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
                >
                  View Cart
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </>
  );
}
