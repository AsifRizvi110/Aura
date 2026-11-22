import React, { useEffect, useMemo, useState } from 'react';
import { PageId } from '../types';
import { BLOG_CATEGORIES, BLOG_POSTS, BlogPost } from '../data/blogData';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
  Send
} from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: (preselectedProduct?: string) => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

const PostMeta: React.FC<{ post: BlogPost }> = ({ post }) => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zinc-500 font-mono uppercase tracking-wider">
    <span className="flex items-center gap-1.5">
      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
      {formatDate(post.date)}
    </span>
    <span className="flex items-center gap-1.5">
      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
      {post.readTime}
    </span>
  </div>
);

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const activePost = BLOG_POSTS.find((p) => p.id === activePostId) || null;

  const filteredPosts = useMemo(
    () =>
      activeCategory === 'All'
        ? BLOG_POSTS
        : BLOG_POSTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const featured = filteredPosts[0];
  const rest = filteredPosts.slice(1);

  // Scroll to top whenever a post is opened or closed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePostId]);

  /* ======================================================================= */
  /* SINGLE POST VIEW                                                        */
  /* ======================================================================= */
  if (activePost) {
    const related = BLOG_POSTS.filter((p) => p.id !== activePost.id).slice(0, 2);

    return (
      <div id="blog-post-root" className="pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: activePost.title,
              description: activePost.excerpt,
              datePublished: activePost.date,
              author: { '@type': 'Organization', name: 'Aura Global Industries' },
              publisher: { '@type': 'Organization', name: 'Aura Global Industries' }
            })
          }}
        />

        <section className="relative pt-28 sm:pt-36 pb-10 bg-sleek-grid border-b border-white/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <button
              onClick={() => setActivePostId(null)}
              className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Articles</span>
            </button>

            <span className="inline-block px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-sm bg-[#0F0F0F]">
              {activePost.category}
            </span>

            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white leading-[1.05] tracking-tight uppercase">
              {activePost.title}
            </h1>

            <PostMeta post={activePost} />
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed border-l-2 border-[#D4AF37] pl-4">
            {activePost.excerpt}
          </p>

          {activePost.sections.map((section) => (
            <div key={section.heading} className="space-y-3">
              <h2 className="font-heading text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
                {section.heading}
              </h2>
              {section.paragraphs.map((para, i) => (
                <p key={i} className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          ))}

          {/* Quote CTA */}
          <div className="p-6 rounded-sm bg-[#0F0F0F] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div>
              <h3 className="font-heading font-bold text-white text-base uppercase tracking-tight">
                Planning a cap line of your own?
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Share your design and quantity and our Karachi team will prepare a quote.
              </p>
            </div>
            <button
              onClick={() => onOpenQuoteModal()}
              className="sleek-btn-primary px-7 py-3 rounded-sm flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Get a Quote</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-5">
            <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight">
              Keep Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((post) => (
                <button
                  key={post.id}
                  onClick={() => setActivePostId(post.id)}
                  className="sleek-card p-6 rounded-sm text-left space-y-3 group cursor-pointer"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                    {post.category}
                  </span>
                  <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{post.excerpt}</p>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  /* ======================================================================= */
  /* BLOG LIST VIEW                                                          */
  /* ======================================================================= */
  return (
    <div id="blog-page-root" className="space-y-14 sm:space-y-20 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Aura Global Industries Blog',
            description:
              'Articles on cap fabrics, customization, manufacturing and sourcing from a cap manufacturer in Karachi, Pakistan.',
            publisher: { '@type': 'Organization', name: 'Aura Global Industries' },
            blogPost: BLOG_POSTS.map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              datePublished: p.date,
              description: p.excerpt
            }))
          })
        }}
      />

      {/* Header */}
      <section className="relative pt-28 sm:pt-36 pb-12 overflow-hidden bg-sleek-grid border-b border-white/10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-semibold w-fit rounded-sm bg-[#0F0F0F]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Blog</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white leading-[0.95] tracking-tighter uppercase">
            Headwear Insights
            <br />
            <span className="text-[#D4AF37]">From The Factory Floor</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Practical guides on fabrics, decoration and ordering, written by the team that makes the
            caps in Nazimabad, Karachi.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#D4AF37] text-white shadow-md'
                  : 'bg-[#0F0F0F] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {!featured && (
          <div className="p-10 rounded-sm bg-[#0F0F0F] border border-white/10 text-center text-sm text-zinc-400">
            No articles in this category yet. Choose another category above.
          </div>
        )}

        {/* Featured post */}
        {featured && (
          <button
            onClick={() => setActivePostId(featured.id)}
            className="w-full text-left sleek-card rounded-sm p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group cursor-pointer"
          >
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-sm bg-[#0A0A0A]">
                {featured.category}
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight leading-tight group-hover:text-[#D4AF37] transition-colors">
                {featured.title}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">{featured.excerpt}</p>
              <PostMeta post={featured} />
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <span className="sleek-btn-primary px-6 py-3 rounded-sm inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </button>
        )}

        {/* Remaining posts */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((post) => (
              <button
                key={post.id}
                onClick={() => setActivePostId(post.id)}
                className="sleek-card p-6 rounded-sm text-left flex flex-col justify-between space-y-5 group cursor-pointer"
              >
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                    {post.category}
                  </span>
                  <h3 className="font-heading text-base font-bold text-white uppercase tracking-wider leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <PostMeta post={post} />
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#D4AF37] transition-colors shrink-0" />
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-sm bg-[#0F0F0F] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="font-heading font-bold text-white text-lg uppercase tracking-tight">
              Have a question about your cap project?
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Talk to our team about fabrics, sampling and custom designs.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="sleek-btn-outline px-6 py-3 rounded-sm cursor-pointer font-bold text-xs uppercase tracking-wider"
            >
              Contact Us
            </button>
            <button
              onClick={() => onOpenQuoteModal()}
              className="sleek-btn-primary px-6 py-3 rounded-sm flex items-center gap-2 cursor-pointer font-bold text-xs uppercase tracking-wider"
            >
              <span>Get a Quote</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};