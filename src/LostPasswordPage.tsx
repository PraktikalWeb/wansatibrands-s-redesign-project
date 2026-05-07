import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Lock, Mail, ShieldCheck, User } from 'lucide-react';
import FormFeedback, { FormFeedbackTone } from './FormFeedback';

type LostPasswordPageProps = {
  mode?: 'request' | 'reset';
  navigateTo: (path: string) => void;
};

type FormNotice = {
  tone: FormFeedbackTone;
  message: string;
} | null;

const heroImage =
  'https://www.wansatibrands.co.za/wp-content/uploads/2025/10/DSC_6563-scaled.jpg';

export default function LostPasswordPage({ mode = 'request', navigateTo }: LostPasswordPageProps) {
  const [identifier, setIdentifier] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notice, setNotice] = useState<FormNotice>(null);
  const isResetMode = mode === 'reset';

  const handleResetSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isResetMode) {
      if (!newPassword.trim() || !confirmPassword.trim()) {
        setNotice({
          tone: 'error',
          message: 'Please enter your new password in both fields before continuing.',
        });
        return;
      }

      if (newPassword.trim().length < 8) {
        setNotice({
          tone: 'error',
          message: 'Your new password should be at least 8 characters long.',
        });
        return;
      }

      if (newPassword !== confirmPassword) {
        setNotice({
          tone: 'error',
          message: 'The two password fields do not match. Please check them and try again.',
        });
        return;
      }

      setNotice({
        tone: 'success',
        message: 'Your password has been reset successfully. You can now sign in with your new password.',
      });
      return;
    }

    const trimmedIdentifier = identifier.trim();

    if (!trimmedIdentifier) {
      setNotice({
        tone: 'error',
        message: 'Please enter your username or email address before requesting a reset link.',
      });
      return;
    }

    setNotice({
      tone: 'success',
      message:
        'Password reset email sent. If an account matches that username or email address, you will receive a reset link shortly.',
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
              <button
                type="button"
                onClick={() => navigateTo('/my-account')}
                className="transition-colors hover:text-stone-900"
              >
                My Account
              </button>
              <ArrowRight size={14} strokeWidth={1.5} />
              <span className="text-stone-900">{isResetMode ? 'Set New Password' : 'Lost Password'}</span>
            </div>

            <div className="max-w-3xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Account Recovery</p>
              <h1 className="font-serif text-3xl text-stone-900 md:text-5xl">
                {isResetMode ? 'Set your new password.' : 'Reset your password.'}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
                {isResetMode
                  ? 'Choose a new password for your account and confirm it below to finish the recovery process.'
                  : 'Enter the email or username tied to your account and we&apos;ll send you a link to create a new password.'}
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
            className="border border-stone-300 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="mb-8 border-b border-stone-200 pb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">Password Assistance</p>
            </div>

            <form className="space-y-6" noValidate onSubmit={handleResetSubmit}>
              <div>
                <h2 className="font-serif text-3xl text-stone-900">
                  {isResetMode ? 'Create a new password' : 'Lost your password?'}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
                  {isResetMode
                    ? 'Enter your new password below. Once saved, you can return to your account and sign in normally.'
                    : 'Please enter your username or email address. You will receive a link to create a new password via email.'}
                </p>
              </div>

              {notice ? <FormFeedback tone={notice.tone} message={notice.message} /> : null}

              {isResetMode ? (
                <>
                  <label className="block">
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-stone-700">
                      New password <span className="text-[#8b765e]">*</span>
                    </span>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.7} />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(event) => {
                          setNewPassword(event.target.value);
                          if (notice) setNotice(null);
                        }}
                        className="w-full border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm text-stone-700 outline-none transition-colors focus:border-stone-500"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-stone-700">
                      Confirm new password <span className="text-[#8b765e]">*</span>
                    </span>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.7} />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => {
                          setConfirmPassword(event.target.value);
                          if (notice) setNotice(null);
                        }}
                        className="w-full border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm text-stone-700 outline-none transition-colors focus:border-stone-500"
                      />
                    </div>
                  </label>
                </>
              ) : (
                <label className="block">
                  <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-stone-700">
                    Username or email <span className="text-[#8b765e]">*</span>
                  </span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.7} />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(event) => {
                        setIdentifier(event.target.value);
                        if (notice) setNotice(null);
                      }}
                      className="w-full border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm text-stone-700 outline-none transition-colors focus:border-stone-500"
                    />
                  </div>
                </label>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="bg-[#1c1a17] px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-stone-800"
                >
                  {isResetMode ? 'Save new password' : 'Reset password'}
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('/my-account')}
                  className="self-start text-sm text-stone-500 transition-colors hover:text-stone-900"
                >
                  Back to sign in
                </button>
              </div>
            </form>
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
