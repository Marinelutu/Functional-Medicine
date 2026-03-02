import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";

const relatedArticles = [
  { slug: "5-lab-tests-doctor-never-orders", title: "5 Lab Tests Your Doctor Never Orders But Should", category: "Functional Medicine", readTime: "5 min" },
  { slug: "cortisol-sabotaging-weight-loss", title: "Why Your Cortisol Is Sabotaging Your Weight Loss", category: "Weight Loss", readTime: "6 min" },
  { slug: "seed-cycling-hormone-balance", title: "Seed Cycling for Hormone Balance: Does It Actually Work?", category: "Hormones", readTime: "6 min" },
];

const BlogPostPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <article className="pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">Hormones</span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mt-3 mb-6 leading-tight">
          Why Your Thyroid Labs Are 'Normal' But You Still Feel Terrible
        </h1>

        <div className="flex items-center gap-4 mb-8">
          <ImagePlaceholder label="[IMG: Dr. Vasquez]" aspectRatio="icon" className="rounded-full" />
          <div>
            <p className="text-sm font-semibold text-foreground">Dr. Elena Vasquez</p>
            <p className="text-xs text-muted-foreground">Feb 18, 2026 · 8 min read</p>
          </div>
        </div>

        <ImagePlaceholder label="[IMAGE: Blog hero — thyroid article cover]" aspectRatio="landscape" className="rounded-2xl mb-10" />

        <div className="prose prose-lg max-w-none space-y-6 text-foreground/90 leading-relaxed">
          <p>
            You've been to three doctors. Maybe four. You've described the fatigue that makes mornings feel like moving through wet concrete. The brain fog that turns simple conversations into word-finding exercises. The weight that clings to your midsection no matter what you eat. And every single time, you hear the same thing: <em>"Your labs look normal."</em>
          </p>
          <p>
            Here's the truth that conventional medicine doesn't want to acknowledge: "normal" thyroid labs and optimal thyroid function are two very different things. The standard TSH test — the one most doctors rely on exclusively — catches less than half of thyroid dysfunction cases. It's like checking whether your car has gas but ignoring that the engine is misfiring.
          </p>

          <h2 className="text-2xl font-body font-bold text-foreground mt-10 mb-4">The Problem With Standard Thyroid Testing</h2>
          <p>
            Most conventional doctors order a single test: TSH (Thyroid Stimulating Hormone). If it falls within the reference range of roughly 0.5–4.5 mIU/L, you're told you're fine. But functional medicine practitioners know that the reference range is based on the average of the population — a population that includes people with undiagnosed thyroid issues.
          </p>
          <p>
            The functional optimal range for TSH is much narrower: 1.0–2.0 mIU/L. A TSH of 3.5 is technically "normal" but may indicate your thyroid is already struggling. And TSH alone doesn't tell you whether your body is actually converting T4 (the inactive hormone) into T3 (the active form your cells use).
          </p>

          <blockquote className="border-l-4 border-accent pl-6 my-10">
            <p className="text-2xl font-display italic text-primary leading-snug">
              "The difference between 'normal' and optimal is the difference between surviving and thriving. Your thyroid deserves more than a single number on a lab report."
            </p>
          </blockquote>

          <h2 className="text-2xl font-body font-bold text-foreground mt-10 mb-4">The Full Thyroid Panel You Actually Need</h2>
          <p>
            At Velara, we never assess thyroid function with TSH alone. Our comprehensive thyroid panel includes six critical markers that together paint the complete picture:
          </p>
          <p>
            <strong>TSH</strong> — The pituitary signal telling your thyroid to produce more or less hormone. <strong>Free T4</strong> — The circulating inactive hormone that serves as your thyroid's "reservoir." <strong>Free T3</strong> — The active hormone your cells actually use for metabolism, energy, and brain function. <strong>Reverse T3</strong> — A metabolic brake that blocks T3 from entering cells, often elevated during chronic stress. <strong>TPO Antibodies</strong> — Markers of autoimmune thyroid disease (Hashimoto's), which accounts for 90% of hypothyroidism cases. <strong>Thyroglobulin Antibodies</strong> — Another autoimmune marker that can be elevated even when TPO is normal.
          </p>

          <ImagePlaceholder label="[IMAGE: Article inline — thyroid panel diagram illustration]" aspectRatio="landscape" className="rounded-xl my-8" />
          <p className="text-sm text-muted-foreground text-center -mt-4 mb-8 italic">A complete thyroid panel reveals what TSH alone cannot.</p>

          <h2 className="text-2xl font-body font-bold text-foreground mt-10 mb-4">Why Conventional Medicine Misses This</h2>
          <p>
            It's not that your doctor doesn't care. It's that the system they work within doesn't support the kind of thorough investigation your thyroid requires. Insurance-driven medicine optimizes for speed and standardization. A 12-minute appointment doesn't leave room for nuance. And ordering a comprehensive panel when TSH is "normal" goes against established protocols — protocols that were designed decades ago and haven't kept up with our understanding of thyroid physiology.
          </p>
          <p>
            The result? Millions of people — predominantly women — walking around with subclinical thyroid dysfunction that conventional medicine won't diagnose until it progresses to full-blown disease. By then, you may have spent years suffering unnecessarily.
          </p>

          <h2 className="text-2xl font-body font-bold text-foreground mt-10 mb-4">What You Can Do Right Now</h2>
          <p>
            If you suspect your thyroid is underperforming despite "normal" labs, here's what we recommend: First, request a complete thyroid panel — not just TSH. If your doctor won't order it, that tells you something important about whether they're the right partner for your health journey. Second, look at your results through a functional lens. Optimal Free T3 should be in the upper quarter of the reference range. Reverse T3 should be low. Any antibody elevation deserves investigation, not dismissal.
          </p>
          <p>
            Third — and this is where it gets transformative — consider that thyroid dysfunction rarely exists in isolation. It's connected to your adrenal function, your gut health, your nutrient status, and your inflammatory load. Treating the thyroid without addressing these interconnected systems is like patching one tire while the other three are slowly leaking.
          </p>
          <p>
            At Velara, we've built our Thyroid Optimization Protocol around this understanding. We don't just test your thyroid — we map the entire ecosystem that supports it. And we don't just bring your numbers into range — we help you feel like yourself again.
          </p>
        </div>

        {/* Author Bio */}
        <div className="mt-16 bg-card rounded-2xl p-6 border border-border flex gap-6 items-start">
          <ImagePlaceholder label="[IMAGE: Dr. Elena Vasquez portrait]" aspectRatio="icon" className="rounded-full flex-shrink-0 w-20 h-20" />
          <div>
            <p className="font-display text-lg font-semibold text-foreground">Dr. Elena Vasquez</p>
            <p className="text-xs text-accent font-mono mb-2">MD, IFMCP — Founder & Lead Practitioner</p>
            <p className="text-sm text-muted-foreground">
              Dr. Vasquez founded Velara after a decade in conventional medicine left her frustrated by the gap between "normal" labs and how patients actually felt. She specializes in thyroid optimization, hormonal health, and root-cause diagnostics.
            </p>
          </div>
        </div>
      </div>
    </article>

    {/* Related Articles */}
    <section className="py-16 bg-card">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-2xl font-display font-semibold text-foreground mb-8">Related Articles</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {relatedArticles.map((a) => (
            <Link key={a.slug} to={`/blog/${a.slug}`} className="group">
              <ImagePlaceholder label={`[IMAGE: Blog — ${a.title}]`} aspectRatio="landscape" className="rounded-xl mb-3" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">{a.category}</span>
              <h3 className="font-display text-sm font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">{a.title}</h3>
              <span className="text-xs text-muted-foreground font-mono">{a.readTime}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 gradient-assessment">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-display font-semibold text-foreground mb-4">Ready to test your thyroid properly?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Our comprehensive thyroid panel goes far beyond TSH. Book your consultation today.
        </p>
        <Link to="/book" className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold text-lg hover:opacity-90 transition-opacity">
          Book a Consultation
        </Link>
      </div>
    </section>

    <Footer />
  </div>
);

export default BlogPostPage;
