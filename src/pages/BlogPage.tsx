import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import BlogModal from "@/components/BlogModal";
import { featuredArticle, blogPageArticles, allArticles } from "@/data/blogArticles";
import type { BlogArticle } from "@/data/blogArticles";

const categories = ["All", "Hormones", "Weight Loss", "Gut Health", "Longevity", "Mental Clarity", "Functional Medicine"];

const mostRead = [
  "5 Lab Tests Your Doctor Never Orders But Should",
  "Why Your Thyroid Labs Are 'Normal' But You Still Feel Terrible",
  "Brain Fog Is Not Normal — Here's What's Causing It",
  "The Gut-Brain Axis Explained",
  "Why Your Cortisol Is Sabotaging Your Weight Loss",
];

const BlogPage = () => {
  const [filter, setFilter] = useState("All");
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterError, setNewsletterError] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const filtered = filter === "All" ? blogPageArticles : blogPageArticles.filter((a) => a.category === filter);

  const openArticle = (article: BlogArticle) => {
    setActiveArticle(article);
  };

  const openArticleByTitle = (title: string) => {
    const article = allArticles.find(a => a.title === title);
    if (article) setActiveArticle(article);
  };

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail.trim() || !emailRegex.test(newsletterEmail.trim())) {
      setNewsletterError("Please enter a valid email address.");
      return;
    }
    setNewsletterError("");
    setNewsletterSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Featured Article */}
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-6">
          <div
            className="grid lg:grid-cols-2 gap-10 items-center blog-card-clickable group"
            onClick={() => openArticle(featuredArticle)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openArticle(featuredArticle)}
          >
            <div className="blog-card-image-wrapper rounded-2xl overflow-hidden">
              <ImagePlaceholder
                label="Blog featured cover"
                aspectRatio="landscape"
                className="rounded-2xl blog-card-image"
                src={featuredArticle.image}
              />
            </div>
            <div>
              <span className="blog-card-category">{featuredArticle.category}</span>
              <h1 className="blog-card-headline text-3xl md:text-4xl mt-2 mb-4 group-hover:text-primary transition-colors">
                {featuredArticle.title}
              </h1>
              <p className="blog-card-excerpt text-base mb-4">{featuredArticle.excerpt}</p>
              <div className="flex items-center gap-4 mb-6">
                <span className="blog-card-readtime">{featuredArticle.author}</span>
                <span className="blog-card-readtime">·</span>
                <span className="blog-card-readtime">{featuredArticle.date}</span>
                <span className="blog-card-readtime">·</span>
                <span className="blog-card-readtime">{featuredArticle.readTime} read</span>
              </div>
              <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                Read Article
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === c ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-border"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-4 gap-10">
            {/* Articles Grid */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a) => (
                <div
                  key={a.slug}
                  className="blog-card-clickable group"
                  onClick={() => openArticle(a)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openArticle(a)}
                >
                  <div className="blog-card-image-wrapper rounded-xl overflow-hidden mb-3">
                    <ImagePlaceholder
                      label={`Blog — ${a.title}`}
                      aspectRatio="landscape"
                      className="rounded-xl blog-card-image"
                      src={a.image}
                    />
                  </div>
                  <div className="blog-card-text-area">
                    <span className="blog-card-category">{a.category}</span>
                    <h3 className="blog-card-headline">{a.title}</h3>
                    <p className="blog-card-excerpt">{a.excerpt}</p>
                    <span className="blog-card-readtime">{a.readTime} read</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-10">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">Get Weekly Insights</h3>
                <p className="text-sm text-muted-foreground mb-4">Join 4,200+ readers getting evidence-based health content.</p>
                <input
                  type="email"
                  placeholder="Your email"
                  value={newsletterEmail}
                  onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterError(""); }}
                  disabled={newsletterSubscribed}
                  className="w-full px-4 py-2.5 rounded-lg bg-background text-sm mb-3 focus:outline-none focus:border-primary"
                  style={{
                    border: newsletterError ? '1px solid #E53E3E' : '1px solid var(--border)',
                  }}
                />
                {newsletterError && (
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#E53E3E', margin: '0 0 8px 0' }}>
                    {newsletterError}
                  </p>
                )}
                <button
                  onClick={handleSubscribe}
                  disabled={newsletterSubscribed}
                  className="w-full px-4 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold"
                  style={{ cursor: newsletterSubscribed ? 'default' : 'pointer' }}
                >
                  {newsletterSubscribed ? "✓ You're in!" : "Subscribe"}
                </button>
                {newsletterSubscribed && (
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#2D4A3E', marginTop: '8px' }}>
                    Check your inbox for your first issue.
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-4">Most Read</h3>
                <ol className="space-y-3">
                  {mostRead.map((title, i) => (
                    <li key={title} className="flex gap-3">
                      <span className="font-mono text-sm text-accent font-semibold">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className="text-sm text-foreground hover:text-primary cursor-pointer transition-colors"
                        onClick={() => openArticleByTitle(title)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && openArticleByTitle(title)}
                      >
                        {title}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
      <BlogModal article={activeArticle} onClose={() => setActiveArticle(null)} />
    </div>
  );
};

export default BlogPage;
