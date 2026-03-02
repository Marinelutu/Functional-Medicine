import ImagePlaceholder from "./ImagePlaceholder";

const posts = [
  { title: "The Hidden Connection Between Gut Health and Anxiety", category: "Gut Health", excerpt: "New research reveals how your microbiome directly influences your mental health — and what to do about it.", readTime: "6 min" },
  { title: "Why Your Thyroid Labs Are 'Normal' But You Still Feel Terrible", category: "Hormones", excerpt: "Conventional ranges miss up to 60% of thyroid dysfunction. Here's what functional medicine looks for instead.", readTime: "8 min" },
  { title: "5 Biomarkers Your Doctor Isn't Testing (But Should Be)", category: "Longevity", excerpt: "These overlooked markers could be the key to understanding your fatigue, weight gain, and brain fog.", readTime: "5 min" },
];

const BlogPreview = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
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
          <div className="group">
            <ImagePlaceholder
              label="[IMAGE: Blog — Article cover photo]"
              aspectRatio="landscape"
              className="w-full rounded-2xl mb-4 group-hover:shadow-lg transition-shadow"
            />
            <span className="inline-block font-mono text-xs tracking-wider uppercase text-accent mb-2">
              {posts[0].category}
            </span>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {posts[0].title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{posts[0].excerpt}</p>
            <span className="font-mono text-xs text-muted-foreground">{posts[0].readTime} read</span>
          </div>

          {/* Secondary */}
          <div className="space-y-6">
            {posts.slice(1).map((p) => (
              <div key={p.title} className="flex gap-4 group">
                <ImagePlaceholder
                  label="[IMAGE: Blog — Article cover]"
                  aspectRatio="square"
                  className="w-32 h-32 flex-shrink-0 rounded-xl text-[10px]"
                />
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
    </section>
  );
};

export default BlogPreview;
