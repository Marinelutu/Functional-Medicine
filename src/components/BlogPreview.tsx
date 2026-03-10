import { useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";
import BlogModal from "./BlogModal";
import { homepageArticles } from "@/data/blogArticles";
import type { BlogArticle } from "@/data/blogArticles";

const BlogPreview = () => {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  const openArticle = (article: BlogArticle) => {
    setActiveArticle(article);
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        {/* Demo label */}
        <p className="blog-demo-label">
          THIS IS YOUR TEACHER PAGE — EDUCATING PATIENTS BEFORE THEY EVER REACH YOU
        </p>

        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">The Journal</p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
              Evidence-Based Insights
            </h2>
          </div>
          <a href="/blog" className="hidden sm:inline-flex text-sm font-semibold text-primary hover:text-accent transition-colors">
            View All →
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured */}
          <div
            className="blog-card-clickable group"
            onClick={() => openArticle(homepageArticles[0])}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openArticle(homepageArticles[0])}
          >
            <div className="blog-card-image-wrapper">
              <ImagePlaceholder
                label="Blog cover"
                aspectRatio="landscape"
                className="w-full rounded-2xl mb-4 blog-card-image"
                src={homepageArticles[0].image}
              />
            </div>
            <span className="inline-block font-mono text-xs tracking-wider uppercase text-accent mb-2">
              {homepageArticles[0].category}
            </span>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {homepageArticles[0].title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{homepageArticles[0].excerpt}</p>
            <span className="font-mono text-xs text-muted-foreground">{homepageArticles[0].readTime} read</span>
          </div>

          {/* Secondary */}
          <div className="space-y-6">
            {homepageArticles.slice(1).map((p) => (
              <div
                key={p.title}
                className="flex gap-4 blog-card-clickable group"
                onClick={() => openArticle(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openArticle(p)}
              >
                <div className="blog-card-image-wrapper w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  <ImagePlaceholder
                    label="Blog cover"
                    aspectRatio="square"
                    className="w-32 h-32 flex-shrink-0 rounded-xl text-[10px] blog-card-image"
                    src={p.image}
                  />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-xs tracking-wider uppercase text-accent">{p.category}</span>
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  <span className="font-mono text-xs text-muted-foreground">{p.readTime} read</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BlogModal article={activeArticle} onClose={() => setActiveArticle(null)} />
    </section>
  );
};

export default BlogPreview;
