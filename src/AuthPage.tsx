import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Lock, Mail, ShieldCheck, User } from 'lucide-react';
import FormFeedback, { FormFeedbackTone } from './FormFeedback';

type AuthMode = 'login' | 'register';

type AuthPageProps = {
  mode: AuthMode;
  navigateTo: (path: string) => void;
};

type FormNotice = {
  tone: FormFeedbackTone;
  message: string;
} | null;

const heroImage =
  'https://www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6563-scaled.jpg';

export default function AuthPage({ mode, navigateTo }: AuthPageProps) {
  const [activeMode, setActiveMode] = useState<AuthMode>(mode);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginNotice, setLoginNotice] = useState<FormNotice>(null);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerNotice, setRegisterNotice] = useState<FormNotice>(null);

  const clearFormNotices = () => {
    setLoginNotice(null);
    setRegisterNotice(null);
  };

  useEffect(() => {
    setActiveMode(mode);
    clearFormNotices();
  }, [mode]);

  const switchMode = (nextMode: AuthMode) => {
    setActiveMode(nextMode);
    clearFormNotices();
    navigateTo(nextMode === 'login' ? '/my-account' : '/my-account/register');
  };

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedIdentifier = loginIdentifier.trim();

    if (!trimmedIdentifier || !loginPassword.trim()) {
      setLoginNotice({
        tone: 'error',
        message: 'Please enter both your username or email address and your password.',
      });
      return;
    }

    if (loginPassword.trim().length < 6) {
      setLoginNotice({
        tone: 'error',
        message: 'Your password looks too short. Please check it and try again.',
      });
      return;
    }

    setLoginNotice({
      tone: 'error',
      message: 'Incorrect username, email, or password. Please try again.',
    });
  };

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = registerEmail.trim();

    if (!trimmedEmail) {
      setRegisterNotice({
        tone: 'error',
        message: 'Please enter your email address to continue with registration.',
      });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setRegisterNotice({
        tone: 'error',
        message: 'Please enter a valid email address before creating your account.',
      });
      return;
    }

    setRegisterNotice({
      tone: 'success',
      message:
        'Registration confirmation sent. Please check your inbox for the next steps to set your password and finish creating your account.',
    });
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200 bg-[#f4ecdf]">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(circle at top right, rgba(194, 164, 83, 0.18), transparent 36%), linear-gradient(135deg, rgba(255, 255, 255, 0.52), rgba(244, 236, 223, 0.9))',
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-4 py-14 sm:px-8 md:py-16">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
              <button type="button" onClick={() => navigateTo('/')} className="transition-colors hover:text-stone-900">
                Home
              </button>
              <ArrowRight size={14} strokeWidth={1.5} />
              <span className="text-stone-900">My Account</span>
            </div>

            <div className="max-w-3xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Account Access</p>
              <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">
                Sign in or create your Wansati account.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
                Manage your account, keep track of your favourites, and move through the Wansati experience with ease.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="grid grid-cols-2 items-end">
              <button
                type="button"
                onClick={() => switchMode('login')}
                aria-pressed={activeMode === 'login'}
                disabled={activeMode === 'login'}
                className={`relative min-h-[76px] border px-5 py-4 text-left transition-all ${
                  activeMode === 'login'
                    ? 'z-10 -mb-px border-stone-300 border-b-0 bg-white text-stone-900 cursor-default'
                    : 'border-stone-900 bg-stone-900 text-white hover:bg-black'
                }`}
              >
                <span className="block text-[11px] font-bold uppercase tracking-[0.18em]">Sign In</span>
                <span
                  className={`mt-2 hidden text-xs leading-relaxed sm:block ${
                    activeMode === 'login' ? 'text-stone-600' : 'text-stone-300'
                  }`}
                >
                  Return to your account
                </span>
              </button>
              <button
                type="button"
                onClick={() => switchMode('register')}
                aria-pressed={activeMode === 'register'}
                disabled={activeMode === 'register'}
                className={`relative min-h-[76px] border px-5 py-4 text-left transition-all ${
                  activeMode === 'register'
                    ? 'z-10 -mb-px border-stone-300 border-b-0 bg-white text-stone-900 cursor-default'
                    : 'border-stone-900 bg-stone-900 text-white hover:bg-black'
                }`}
              >
                <span className="block text-[11px] font-bold uppercase tracking-[0.18em]">Register</span>
                <span
                  className={`mt-2 hidden text-xs leading-relaxed sm:block ${
                    activeMode === 'register' ? 'text-stone-600' : 'text-stone-300'
                  }`}
                >
                  Create a new account
                </span>
              </button>
            </div>

            <div className="border border-stone-300 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-8 border-b border-stone-200 pb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">
                  {activeMode === 'login' ? 'Returning customer' : 'New customer'}
                </p>
              </div>

              {activeMode === 'login' ? (
                <form className="space-y-6" noValidate onSubmit={handleLoginSubmit}>
                  <div>
                    <h2 className="font-serif text-3xl text-stone-900">Sign In</h2>
                  </div>

                  {loginNotice ? <FormFeedback tone={loginNotice.tone} message={loginNotice.message} /> : null}

                  <label className="block">
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-stone-700">
                      Username or email address <span className="text-[#8b765e]">*</span>
                    </span>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.7} />
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(event) => {
                          setLoginIdentifier(event.target.value);
                          if (loginNotice) setLoginNotice(null);
                        }}
                        className="w-full border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm text-stone-700 outline-none transition-colors focus:border-stone-500"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-stone-700">
                      Password <span className="text-[#8b765e]">*</span>
                    </span>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.7} />
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(event) => {
                          setLoginPassword(event.target.value);
                          if (loginNotice) setLoginNotice(null);
                        }}
                        className="w-full border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm text-stone-700 outline-none transition-colors focus:border-stone-500"
                      />
                    </div>
                  </label>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <label className="flex items-center gap-3 text-sm text-stone-600">
                      <input type="checkbox" className="h-4 w-4 border-stone-400 text-stone-900 focus:ring-stone-400" />
                      <span>Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => navigateTo('/my-account/lost-password')}
                      className="self-start text-sm text-stone-500 transition-colors hover:text-stone-900"
                    >
                      Lost your password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#1c1a17] px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-stone-800"
                  >
                    Log in
                  </button>

                  <p className="border-t border-stone-200 pt-6 text-sm text-stone-600">
                    Don’t have account ?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('register')}
                      className="font-semibold text-stone-900 underline underline-offset-4 transition-colors hover:text-[#8b765e]"
                    >
                      Sign up now
                    </button>
                  </p>
                </form>
              ) : (
                <form className="space-y-6" noValidate onSubmit={handleRegisterSubmit}>
                  <div>
                    <h2 className="font-serif text-3xl text-stone-900">Register</h2>
                  </div>

                  {registerNotice ? <FormFeedback tone={registerNotice.tone} message={registerNotice.message} /> : null}

                  <label className="block">
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-stone-700">
                      Email address <span className="text-[#8b765e]">*</span>
                    </span>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.7} />
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(event) => {
                          setRegisterEmail(event.target.value);
                          if (registerNotice) setRegisterNotice(null);
                        }}
                        className="w-full border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm text-stone-700 outline-none transition-colors focus:border-stone-500"
                      />
                    </div>
                  </label>

                  <p className="text-sm leading-relaxed text-stone-600">
                    A link to set a new password will be sent to your email address.
                  </p>

                  <p className="text-sm leading-relaxed text-stone-600">
                    Your personal data will be used to support your experience throughout this website, to manage access
                    to your account, and for other purposes described in our{' '}
                    <button
                      type="button"
                      onClick={() => navigateTo('/privacy-policy')}
                      className="font-semibold text-stone-900 underline underline-offset-4 transition-colors hover:text-[#8b765e]"
                    >
                      privacy policy
                    </button>
                    .
                  </p>

                  <button
                    type="submit"
                    className="bg-[#1c1a17] px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-stone-800"
                  >
                    Register
                  </button>

                  <p className="border-t border-stone-200 pt-6 text-sm text-stone-600">
                    Already have an account ?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="font-semibold text-stone-900 underline underline-offset-4 transition-colors hover:text-[#8b765e]"
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="overflow-hidden border border-stone-200 bg-[#1c1a17] text-white shadow-sm"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={heroImage}
                alt="Wansati Brands editorial fashion"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120f0c] via-[#120f0c]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d3b772]">Wansati Brands</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-white">
                  Bold fashion, rich culture, confident living.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-stone-200">
                  Made for African women who want beauty, style, and self-expression to feel connected in one world.
                </p>
              </div>
            </div>

            <div className="grid gap-0 border-t border-white/10 sm:grid-cols-3">
              {[
                {
                  icon: <User className="h-5 w-5 text-[#d3b772]" strokeWidth={1.7} />,
                  title: 'Personal access',
                  text: 'Keep your account details and favourites in one place.',
                },
                {
                  icon: <ShieldCheck className="h-5 w-5 text-[#d3b772]" strokeWidth={1.7} />,
                  title: 'Secure account',
                  text: 'Move through checkout and account access with confidence.',
                },
                {
                  icon: <Mail className="h-5 w-5 text-[#d3b772]" strokeWidth={1.7} />,
                  title: 'Stay updated',
                  text: 'Be first to hear about new arrivals and brand stories.',
                },
              ].map((item) => (
                <div key={item.title} className="border-white/10 p-5 sm:border-l first:sm:border-l-0">
                  <div>{item.icon}</div>
                  <h4 className="mt-4 text-sm font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-stone-300">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>
    </>
  );
}
