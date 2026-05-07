import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CalendarDays, CornerUpLeft, Facebook, User2, X } from 'lucide-react';
import { BlogPost } from './blogData';

type BlogArticlePageProps = {
  navigateTo: (path: string) => void;
  post: BlogPost;
};

export default function BlogArticlePage({ navigateTo, post }: BlogArticlePageProps) {
  const [commentDraft, setCommentDraft] = useState('');
  const [replyTarget, setReplyTarget] = useState<string | null>(null);
  const commentSectionRef = useRef<HTMLDivElement | null>(null);
  const commentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  if (!post.article) {
    return null;
  }

  const topicTags = post.article.tags?.length ? post.article.tags : post.categories;
  const commentExamples = post.article.commentExamples ?? [];
  const hasStartedComment = commentDraft.trim().length > 0;
  const isCommentFormExpanded = hasStartedComment || Boolean(replyTarget);

  const shareToFacebook = () => {
    if (typeof window === 'undefined') return;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer,width=640,height=520');
  };

  const shareToX = () => {
    if (typeof window === 'undefined') return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer,width=640,height=520');
  };

  useEffect(() => {
    if (!replyTarget) return;

    commentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      commentTextareaRef.current?.focus();
    }, 120);
  }, [replyTarget]);

  return (
    <>
      <section className="border-b border-stone-200 bg-[#f7f2ea]">
        <div className="mx-auto max-w-[960px] px-4 py-14 sm:px-8 md:py-16">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
              <button type="button" onClick={() => navigateTo('/')} className="transition-colors hover:text-stone-900">
                Home
              </button>
              <ArrowRight size={14} strokeWidth={1.5} />
              <button type="button" onClick={() => navigateTo('/blog')} className="transition-colors hover:text-stone-900">
                Blog
              </button>
              <ArrowRight size={14} strokeWidth={1.5} />
              <span className="text-stone-900">Article</span>
            </div>

            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Journal Entry</p>
            <h1 className="max-w-4xl font-serif text-3xl text-stone-900 md:text-5xl">{post.title}</h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-stone-500">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" strokeWidth={1.6} />
                {post.dateLabel}
              </span>
              <span className="inline-flex items-center gap-2">
                <User2 className="h-4 w-4" strokeWidth={1.6} />
                {post.author}
              </span>
            </div>

            {topicTags.length > 0 ? (
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone-600">
                <span className="font-semibold text-stone-900">Topics:</span> {topicTags.join(' • ')}
              </p>
            ) : null}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[960px] px-4 py-10 sm:px-8 md:py-12">
        <motion.figure initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="overflow-hidden border border-stone-200 bg-stone-100">
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </motion.figure>
      </section>

      <section className="pb-14 md:pb-18">
        <div className="mx-auto max-w-[860px] px-4 sm:px-8">
          <motion.article initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="space-y-5 text-base leading-8 text-stone-700">
              {post.article.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {post.article.sections.map((section) => {
              if (section.type === 'section') {
                return (
                  <section key={section.title} className="mt-12">
                    {section.eyebrow ? (
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">
                        {section.eyebrow}
                      </p>
                    ) : null}
                    <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">{section.title}</h2>
                    <div className="mt-5 space-y-5 text-base leading-8 text-stone-700">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                );
              }

              if (section.type === 'list') {
                return (
                  <section key={section.title} className="mt-12">
                    {section.eyebrow ? (
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">
                        {section.eyebrow}
                      </p>
                    ) : null}
                    <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">{section.title}</h2>
                    {section.intro ? (
                      <p className="mt-5 text-base leading-8 text-stone-700">{section.intro}</p>
                    ) : null}
                    <ul className="mt-6 space-y-4 pl-5 text-base leading-8 text-stone-700 marker:text-stone-500">
                      {section.items.map((item) => (
                        <li key={item.title}>
                          <span className="font-semibold text-stone-900">{item.title}:</span> {item.description}
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              }

              return (
                <section key={section.title} className="mt-12">
                  <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">{section.title}</h2>
                  <p className="mt-5 text-base leading-8 text-stone-700">{section.content}</p>
                </section>
              );
            })}

            <div className="mt-4 flex justify-end">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">Share</span>
                <button
                  type="button"
                  onClick={shareToFacebook}
                  aria-label="Share on Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center border border-stone-300 text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                >
                  <Facebook className="h-4 w-4" strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  onClick={shareToX}
                  aria-label="Share on X"
                  className="inline-flex h-10 w-10 items-center justify-center border border-stone-300 text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                >
                  <span className="text-sm font-semibold">X</span>
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-stone-200 pt-8">
              {commentExamples.length > 0 ? (
                <div className="mb-14">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Conversation</p>
                  <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">
                    This post has {commentExamples.length} comment{commentExamples.length === 1 ? '' : 's'}
                  </h2>

                  <div className="mt-8 space-y-8">
                    {commentExamples.map((comment) => (
                      <article
                        key={`${comment.author}-${comment.dateLabel}`}
                        className="grid gap-4 border border-[#ded2c1] bg-[#fbf8f2] p-5 shadow-[0_18px_45px_rgba(56,44,28,0.06)] md:grid-cols-[56px_minmax(0,1fr)] md:p-6"
                      >
                        <div className="flex h-14 w-14 items-center justify-center bg-[#1c1a17] text-white">
                          <User2 className="h-5 w-5" strokeWidth={1.8} />
                        </div>

                        <div>
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h3 className="text-base font-semibold text-stone-900">{comment.author}</h3>
                              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone-500">{comment.dateLabel}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setReplyTarget(comment.author)}
                              className="inline-flex items-center gap-2 self-start border border-stone-300 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-800 transition-colors hover:border-stone-900 hover:text-stone-900"
                            >
                              <CornerUpLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
                              Reply
                            </button>
                          </div>

                          <p className="mt-4 text-base leading-8 text-stone-700">{comment.content}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              <div ref={commentSectionRef} className="border-t border-stone-200 pt-8">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b765e]">Join The Conversation</p>
                <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">Leave a Comment</h2>
                <form
                  className="mt-6 border border-[#ded2c1] bg-[#f7f1e7] p-5 shadow-[0_20px_60px_rgba(56,44,28,0.08)] md:p-7"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {replyTarget ? (
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 border border-[#d8c7af] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-700">
                        <CornerUpLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
                        Reply to {replyTarget}
                      </span>
                      <button
                        type="button"
                        onClick={() => setReplyTarget(null)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-stone-500 transition-colors hover:text-stone-900"
                      >
                        <X className="h-3.5 w-3.5" strokeWidth={1.8} />
                        Clear
                      </button>
                    </div>
                  ) : null}

                  <textarea
                    ref={commentTextareaRef}
                    value={commentDraft}
                    onChange={(e) => setCommentDraft(e.target.value)}
                    placeholder="Write your comment..."
                    className="min-h-[180px] w-full resize-y border border-[#d9cebf] bg-white px-5 py-4 text-sm leading-7 text-stone-700 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-500"
                  />

                  {isCommentFormExpanded ? (
                    <div className="mt-6 space-y-6">
                      <p className="text-sm leading-relaxed text-stone-600">
                        Log in or provide your name and email to leave a comment.
                      </p>

                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-stone-600">
                            Email <span className="normal-case font-medium tracking-normal">(Address never made public)</span>
                          </span>
                          <input
                            type="email"
                            className="w-full border border-[#d9cebf] bg-white px-4 py-3 text-sm text-stone-700 outline-none transition-colors focus:border-stone-500"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-stone-600">Name</span>
                          <input
                            type="text"
                            className="w-full border border-[#d9cebf] bg-white px-4 py-3 text-sm text-stone-700 outline-none transition-colors focus:border-stone-500"
                          />
                        </label>
                      </div>

                      <label className="block">
                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-stone-600">Website <span className="normal-case font-medium tracking-normal">(Optional)</span></span>
                        <input
                          type="url"
                          className="w-full border border-[#d9cebf] bg-white px-4 py-3 text-sm text-stone-700 outline-none transition-colors focus:border-stone-500"
                        />
                      </label>

                      <fieldset className="border border-[#ddcfbc] bg-white/60 p-4">
                        <legend className="px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-600">Email me new posts</legend>
                        <div className="mt-2 space-y-3 text-sm text-stone-700">
                          <label className="flex items-center gap-3 px-2 py-1">
                            <input type="radio" name="post-frequency" value="instantly" className="h-4 w-4 border-stone-400 text-stone-900 focus:ring-stone-400" />
                            <span>Instantly</span>
                          </label>
                          <label className="flex items-center gap-3 px-2 py-1">
                            <input type="radio" name="post-frequency" value="daily" className="h-4 w-4 border-stone-400 text-stone-900 focus:ring-stone-400" />
                            <span>Daily</span>
                          </label>
                          <label className="flex items-center gap-3 px-2 py-1">
                            <input type="radio" name="post-frequency" value="weekly" className="h-4 w-4 border-stone-400 text-stone-900 focus:ring-stone-400" />
                            <span>Weekly</span>
                          </label>
                        </div>
                      </fieldset>

                      <div className="space-y-3 border border-[#ddcfbc] bg-white/60 p-4 text-sm text-stone-700">
                        <label className="flex items-start gap-3 px-2 py-1">
                          <input type="checkbox" className="mt-1 h-4 w-4 border-stone-400 text-stone-900 focus:ring-stone-400" />
                          <span>Email me new comments</span>
                        </label>
                        <label className="flex items-start gap-3 px-2 py-1">
                          <input type="checkbox" className="mt-1 h-4 w-4 border-stone-400 text-stone-900 focus:ring-stone-400" />
                          <span>Save my name, email, and website in this browser for the next time I comment.</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="inline-flex bg-[#1c1a17] px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-stone-800"
                      >
                        Post Comment
                      </button>
                    </div>
                  ) : null}
                </form>

                <div className="mt-8 flex border-t border-stone-200 pt-6">
                  <button
                    type="button"
                    onClick={() => navigateTo('/blog')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-900 transition-colors hover:text-[#8b765e]"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" strokeWidth={1.7} />
                    Back To Blog
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

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
          <form className="flex w-full flex-col sm:flex-row max-w-md mx-auto gap-4 sm:gap-0" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="premium-input flex-1 bg-transparent border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-500 placeholder:text-stone-500"
              required
            />
            <button
              type="submit"
              className="bg-[#1c1a17] text-white px-8 py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-stone-800 transition-colors sm:border-l-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white py-8">
        <div className="mx-auto flex max-w-[860px] px-4 sm:px-8">
          <button
            type="button"
            onClick={() => navigateTo('/blog')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-900 transition-colors hover:text-[#8b765e]"
          >
            <ArrowRight className="h-4 w-4 rotate-180" strokeWidth={1.7} />
            Back To Blog
          </button>
        </div>
      </section>
    </>
  );
}
