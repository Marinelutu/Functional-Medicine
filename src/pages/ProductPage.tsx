import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { useCart } from "@/contexts/CartContext";

const ingredients = [
  { name: "Vitex (Chaste Tree Berry)", amount: "400 mg", purpose: "Supports progesterone production and ovulation regularity" },
  { name: "DIM (Diindolylmethane)", amount: "200 mg", purpose: "Promotes healthy estrogen metabolism and detoxification" },
  { name: "Myo-Inositol", amount: "2,000 mg", purpose: "Improves insulin sensitivity and ovarian function" },
  { name: "Ashwagandha (KSM-66®)", amount: "600 mg", purpose: "Modulates cortisol and supports thyroid hormone conversion" },
  { name: "Magnesium Bisglycinate", amount: "200 mg", purpose: "Calms the nervous system and supports 300+ enzymatic reactions" },
  { name: "Vitamin B6 (P-5-P)", amount: "50 mg", purpose: "Essential cofactor for progesterone synthesis" },
  { name: "Zinc Picolinate", amount: "30 mg", purpose: "Supports immune function and hormone receptor sensitivity" },
  { name: "Selenium (Selenomethionine)", amount: "200 mcg", purpose: "Protects thyroid tissue and supports T4-to-T3 conversion" },
];

const reviews = [
  { name: "Sarah M.", stars: 5, outcome: "My PMS symptoms are almost gone after 3 months", review: "I've tried countless hormone supplements and this is the first one that actually made a noticeable difference. My cycle is more regular, mood swings have calmed down significantly, and I have more energy during my luteal phase." },
  { name: "Jessica R.", stars: 5, outcome: "Energy levels transformed in 6 weeks", review: "My functional medicine doctor recommended this alongside my protocol. Within the first month I noticed less fatigue and by week six my afternoon energy crashes were completely gone." },
  { name: "Michelle K.", stars: 4, outcome: "Noticeably better sleep and reduced anxiety", review: "The ashwagandha and magnesium combo in this formula is perfect. I sleep deeper and wake up more refreshed. Took about 3 weeks to really kick in but worth the patience." },
  { name: "Lauren T.", stars: 5, outcome: "Finally balanced after years of trying", review: "After two pregnancies my hormones were all over the place. This blend, combined with the Velara protocol, helped me feel like myself again. My labs improved across the board." },
  { name: "Amanda C.", stars: 4, outcome: "Clearer skin and reduced bloating", review: "I started this primarily for hormonal acne and was pleasantly surprised that my digestion improved too. The DIM seems to be doing its job with estrogen metabolism." },
  { name: "Rachel W.", stars: 5, outcome: "Lab-verified progesterone improvement", review: "My progesterone went from 4.2 to 12.8 ng/mL over 4 months. My practitioner and I are both thrilled. This is the real deal — not just marketing." },
];

const relatedProducts = [
  { name: "Thyroid Optimizer", price: "$54", benefit: "Comprehensive thyroid nutrient support" },
  { name: "Adrenal Support Formula", price: "$48", benefit: "Rebuild resilience to stress naturally" },
  { name: "Magnesium Glycinate", price: "$36", benefit: "Calm your nervous system & improve sleep" },
  { name: "Vitamin D3 + K2", price: "$32", benefit: "Bone, immune & cardiovascular support" },
];

const ratingBreakdown = [
  { stars: 5, count: 142 },
  { stars: 4, count: 28 },
  { stars: 3, count: 3 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];
const totalReviews = ratingBreakdown.reduce((s, r) => s + r.count, 0);
const avgRating = (ratingBreakdown.reduce((s, r) => s + r.stars * r.count, 0) / totalReviews).toFixed(1);

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"overview" | "ingredients" | "usage" | "reviews">("overview");
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [mainImg, setMainImg] = useState(0);
  const { addToCart } = useCart();

  const filteredReviews = starFilter ? reviews.filter((r) => r.stars === starFilter) : reviews;

  const thumbs = [
    "[IMAGE: Product main — Hormone Balance Blend front]",
    "[IMAGE: Product — Hormone Balance Blend side angle]",
    "[IMAGE: Product — Ingredient list close-up]",
    "[IMAGE: Product — Lifestyle shot with supplement]",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div>
              <ImagePlaceholder label={thumbs[mainImg]} aspectRatio="square" className="rounded-2xl mb-4" />
              <div className="grid grid-cols-4 gap-3">
                {thumbs.map((t, i) => (
                  <button key={i} onClick={() => setMainImg(i)} className={`rounded-xl overflow-hidden border-2 transition-colors ${mainImg === i ? "border-primary" : "border-transparent"}`}>
                    <ImagePlaceholder label={`[Thumb ${i + 1}]`} aspectRatio="square" className="rounded-lg text-[9px]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-2">Hormone Support Formula</p>
                <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground">Hormone Balance Blend</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex">{Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-accent text-lg">★</span>)}</div>
                <span className="text-sm text-muted-foreground">{avgRating} ({totalReviews} reviews)</span>
              </div>
              <p className="text-2xl font-mono font-semibold text-foreground">$58</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-accent mt-0.5">✓</span> Supports healthy estrogen, progesterone & thyroid balance</li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-accent mt-0.5">✓</span> Clinically-dosed adaptogens for stress resilience</li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-accent mt-0.5">✓</span> Third-party tested, GMP certified, no fillers</li>
              </ul>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-foreground hover:bg-card">−</button>
                  <span className="px-4 py-2 font-mono text-sm">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-foreground hover:bg-card">+</button>
                </div>
                <button
                  onClick={() => { for (let i = 0; i < qty; i++) addToCart("Hormone Balance Blend", "$58"); }}
                  className="flex-1 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  Add to Cart
                </button>
              </div>
              <button className="w-full px-6 py-3 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">
                Add to Protocol
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 mb-10 overflow-x-auto">
            {(["overview", "ingredients", "usage", "reviews"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-all ${
                  tab === t ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <div className="max-w-3xl space-y-5 text-muted-foreground leading-relaxed">
              <p>Hormone Balance Blend is a practitioner-formulated supplement designed to support the complex interplay between estrogen, progesterone, and thyroid hormones. Unlike generic women's health supplements, every ingredient is included at clinically effective doses backed by peer-reviewed research.</p>
              <p>This formula addresses the most common hormonal imbalances we see in our practice: estrogen dominance, low progesterone, sluggish thyroid conversion, and cortisol dysregulation. By targeting these interconnected pathways simultaneously, Hormone Balance Blend delivers the comprehensive support that single-ingredient supplements simply can't match.</p>
              <p>Designed to work synergistically with the Velara Hormone Optimization Protocol, this supplement can also be taken as a standalone daily formula. Most members report noticeable improvements in energy, mood stability, and cycle regularity within 4–6 weeks of consistent use.</p>
            </div>
          )}

          {tab === "ingredients" && (
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-sm font-mono text-accent">Ingredient</th>
                    <th className="text-left py-3 text-sm font-mono text-accent">Amount</th>
                    <th className="text-left py-3 text-sm font-mono text-accent">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredients.map((ing) => (
                    <tr key={ing.name} className="border-b border-border/50">
                      <td className="py-3 text-sm font-semibold text-foreground">{ing.name}</td>
                      <td className="py-3 text-sm font-mono text-muted-foreground">{ing.amount}</td>
                      <td className="py-3 text-sm text-muted-foreground">{ing.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "usage" && (
            <div className="max-w-3xl space-y-8">
              {[
                { step: "01", title: "Take Daily", desc: "Take 3 capsules daily with food, preferably with breakfast or lunch. Consistency is key — set a daily reminder for best results." },
                { step: "02", title: "Cycle Awareness", desc: "For menstruating women, take throughout your entire cycle. Some practitioners recommend doubling the dose during the luteal phase (days 15–28) — consult your Velara practitioner." },
                { step: "03", title: "Commit to 90 Days", desc: "Hormonal rebalancing takes time. While many members notice improvements within 4–6 weeks, the full benefits of this formula are best assessed after 90 days of consistent use." },
              ].map((s) => (
                <div key={s.step} className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-mono text-sm font-semibold flex-shrink-0">{s.step}</div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "reviews" && (
            <div className="max-w-4xl">
              {/* Rating breakdown */}
              <div className="flex flex-col sm:flex-row gap-8 mb-10">
                <div className="text-center">
                  <p className="text-5xl font-display font-semibold text-foreground">{avgRating}</p>
                  <div className="flex justify-center mt-1">{Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-accent">★</span>)}</div>
                  <p className="text-sm text-muted-foreground mt-1">{totalReviews} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {ratingBreakdown.map((r) => (
                    <button key={r.stars} onClick={() => setStarFilter(starFilter === r.stars ? null : r.stars)} className="flex items-center gap-3 w-full group">
                      <span className="text-sm text-muted-foreground w-8">{r.stars}★</span>
                      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${(r.count / totalReviews) * 100}%` }} />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">{r.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-6">
                {filteredReviews.map((r) => (
                  <div key={r.name} className="bg-card rounded-xl p-5 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-foreground">{r.name}</span>
                        <div className="flex">{Array.from({ length: r.stars }).map((_, i) => <span key={i} className="text-accent text-sm">★</span>)}</div>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-primary mb-1">{r.outcome}</p>
                    <p className="text-sm text-muted-foreground">{r.review}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-display font-semibold text-foreground mb-8">Complete the Protocol</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div key={p.name} className="bg-background rounded-2xl p-5 border border-border">
                <ImagePlaceholder label={`[IMAGE: Product — ${p.name}]`} aspectRatio="square" className="rounded-xl mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-3">{p.benefit}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-foreground">{p.price}</span>
                  <button
                    onClick={() => addToCart(p.name, p.price)}
                    className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductPage;
