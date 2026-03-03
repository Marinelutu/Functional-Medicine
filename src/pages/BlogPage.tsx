import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";

const categories = ["All", "Hormones", "Weight Loss", "Gut Health", "Longevity", "Mental Clarity", "Functional Medicine"];

const featuredArticle = {
  slug: "thyroid-labs-normal-feel-terrible",
  title: "Why Your Thyroid Labs Are 'Normal' But You Still Feel Terrible",
  excerpt: "The standard TSH test catches less than half of thyroid dysfunction. Here's what your doctor isn't testing — and why it matters for your energy, weight, and mood.",
  category: "Hormones",
  author: "Dr. Elena Vasquez",
  date: "Feb 18, 2026",
  readTime: "8 min read",
  image: "/images/blog_cover_01_1772491909451.png"
};

const articles = [
  { slug: "cortisol-sabotaging-weight-loss", title: "Why Your Cortisol Is Sabotaging Your Weight Loss", category: "Weight Loss", readTime: "6 min", excerpt: "Chronic stress doesn't just make you tired — it actively prevents fat loss.", image: "/images/blog_cover_05_1772542025796.png" },
  { slug: "gut-brain-axis-explained", title: "The Gut-Brain Axis Explained", category: "Gut Health", readTime: "7 min", excerpt: "Your gut produces 90% of your serotonin. Here's why that matters.", image: "/images/blog_cover_06_1772542042730.png" },
  { slug: "5-lab-tests-doctor-never-orders", title: "5 Lab Tests Your Doctor Never Orders But Should", category: "Functional Medicine", readTime: "5 min", excerpt: "These overlooked markers reveal root causes that standard panels miss.", image: "/images/blog_cover_07_1772542060468.png" },
  { slug: "seed-cycling-hormone-balance", title: "Seed Cycling for Hormone Balance: Does It Actually Work?", category: "Hormones", readTime: "6 min", excerpt: "The science behind this trending protocol — and how to do it right.", image: "/images/blog_cover_08_1772542077073.png" },
  { slug: "metabolic-flexibility", title: "What Is Metabolic Flexibility and Why Should You Care?", category: "Weight Loss", readTime: "7 min", excerpt: "The ability to switch between fuel sources is the key to sustainable energy.", image: "/images/blog_cover_09_1772542092085.png" },
  { slug: "leaky-gut-real", title: "Is Leaky Gut Real? What the Science Actually Says", category: "Gut Health", readTime: "8 min", excerpt: "Intestinal permeability is well-documented — here's what causes it and how to heal.", image: "/images/blog_cover_02_1772491921932.png" },
  { slug: "nad-longevity", title: "NAD+ and the Future of Longevity Medicine", category: "Longevity", readTime: "9 min", excerpt: "This coenzyme declines with age. Restoring it may be the key to healthspan.", image: "/images/blog_cover_03_1772491935444.png" },
  { slug: "brain-fog-not-normal", title: "Brain Fog Is Not Normal — Here's What's Causing It", category: "Mental Clarity", readTime: "6 min", excerpt: "From neuroinflammation to blood sugar crashes, the real reasons you can't think clearly.", image: "/images/blog_cover_04_1772491948035.png" },
  { slug: "functional-medicine-vs-conventional", title: "Functional Medicine vs. Conventional: What's the Difference?", category: "Functional Medicine", readTime: "5 min", excerpt: "One treats symptoms. The other asks why. Here's how to choose.", image: "/images/blog_cover_01_1772491909451.png" },
];

const mostRead = [
  "5 Lab Tests Your Doctor Never Orders But Should",
  "Why Your Thyroid Labs Are 'Normal' But You Still Feel Terrible",
  "Brain Fog Is Not Normal — Here's What's Causing It",
  "The Gut-Brain Axis Explained",
  "Why Your Cortisol Is Sabotaging Your Weight Loss",
];

const BlogPage = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? articles : articles.filter((a) => a.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Featured Article */}
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-6">
          <Link to={`/blog/${featuredArticle.slug}`} className="grid lg:grid-cols-2 gap-10 items-center group">
            <ImagePlaceholder label="[IMAGE: Blog featured — Thyroid article cover]" aspectRatio="landscape" className="rounded-2xl" src={featuredArticle.image} />
            <div>
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{featuredArticle.category}</span>
              <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mt-2 mb-4 group-hover:text-primary transition-colors">
                {featuredArticle.title}
              </h1>
              <p className="text-muted-foreground mb-4">{featuredArticle.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span>{featuredArticle.author}</span>
                <span>·</span>
                <span>{featuredArticle.date}</span>
                <span>·</span>
                <span>{featuredArticle.readTime}</span>
              </div>
              <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                Read Article
              </span>
            </div>
          </Link>
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
                <Link key={a.slug} to={`/blog/${a.slug}`} className="group">
                  <ImagePlaceholder label={`[IMAGE: Blog — ${a.title}]`} aspectRatio="landscape" className="rounded-xl mb-3" src={a.image} />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">{a.category}</span>
                  <h3 className="font-display text-lg font-semibold text-foreground mt-1 mb-1 group-hover:text-primary transition-colors">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{a.excerpt}</p>
                  <span className="text-xs text-muted-foreground font-mono">{a.readTime}</span>
                </Link>
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
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-sm mb-3 focus:outline-none focus:border-primary"
                />
                <button className="w-full px-4 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                  Subscribe
                </button>
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-4">Most Read</h3>
                <ol className="space-y-3">
                  {mostRead.map((title, i) => (
                    <li key={title} className="flex gap-3">
                      <span className="font-mono text-sm text-accent font-semibold">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm text-foreground hover:text-primary cursor-pointer transition-colors">{title}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
