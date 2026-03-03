import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { useCart } from "@/contexts/CartContext";

const categories = ["All", "Energy", "Hormones", "Gut", "Clarity", "Longevity", "Bundles"];

const products = [
  { name: "Neuro-Clarity Complex", benefit: "Sharpen focus & mental stamina", price: "$64", rating: 4.8, reviews: 142, category: "Clarity", image: "/images/product_individual_01_1772542326626.png" },
  { name: "Gut Restore Probiotic", benefit: "Heal your microbiome from the inside out", price: "$52", rating: 4.9, reviews: 218, category: "Gut", image: "/images/product_individual_02_1772542342077.png" },
  { name: "Adrenal Support Formula", benefit: "Rebuild resilience to stress naturally", price: "$48", rating: 4.7, reviews: 96, category: "Energy", image: "/images/product_individual_03_1772542356241.png" },
  { name: "Hormone Balance Blend", benefit: "Estrogen, progesterone & thyroid support", price: "$58", rating: 4.8, reviews: 173, category: "Hormones" },
  { name: "Mitochondrial Energy Complex", benefit: "Fuel your cells for all-day energy", price: "$72", rating: 4.9, reviews: 164, category: "Energy" },
  { name: "Thyroid Optimizer", benefit: "Comprehensive thyroid nutrient support", price: "$54", rating: 4.8, reviews: 131, category: "Hormones" },
  { name: "Deep Sleep Formula", benefit: "Fall asleep faster, wake refreshed", price: "$44", rating: 4.7, reviews: 203, category: "Clarity" },
  { name: "Omega-3 Ultra", benefit: "High-potency EPA/DHA for brain & heart", price: "$56", rating: 4.9, reviews: 189, category: "Longevity" },
  { name: "Inflammation Defense", benefit: "Curcumin + boswellia for systemic relief", price: "$46", rating: 4.8, reviews: 112, category: "Longevity" },
  { name: "Digestive Enzyme Complex", benefit: "Optimize nutrient absorption & reduce bloating", price: "$38", rating: 4.7, reviews: 157, category: "Gut" },
  { name: "Vitamin D3 + K2", benefit: "Bone, immune & cardiovascular support", price: "$32", rating: 4.9, reviews: 241, category: "Longevity" },
  { name: "Magnesium Glycinate", benefit: "Calm your nervous system & improve sleep", price: "$36", rating: 4.8, reviews: 198, category: "Energy" },
];

const bundles = [
  { name: "The Energy Protocol Bundle", items: "Mitochondrial Energy + Adrenal Support + Magnesium", price: "$144", savings: "$12", rating: 4.9, image: "/images/product_bundle_01_1772542278762.png" },
  { name: "The Hormone Reset Bundle", items: "Hormone Balance + Thyroid Optimizer + Vitamin D3+K2", price: "$132", savings: "$12", rating: 4.8, image: "/images/product_bundle_02_1772542293329.png" },
  { name: "The Gut Health Bundle", items: "Gut Restore + Digestive Enzymes + Omega-3 Ultra", price: "$134", savings: "$12", rating: 4.9, image: "/images/product_bundle_03_1772542310069.png" },
];

type SortOption = "bestselling" | "price-asc" | "price-desc";

const parsePrice = (p: string) => parseFloat(p.replace("$", ""));

const ShopPage = () => {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState<SortOption>("bestselling");
  const { addToCart } = useCart();

  let filtered = filter === "All" || filter === "Bundles" ? products : products.filter((p) => p.category === filter);

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  else if (sort === "price-desc") filtered = [...filtered].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  else filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-6 text-center">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">The Velara Dispensary</p>
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
            Practitioner-Grade Supplements
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practitioner-formulated. Third-party tested. Designed for your protocol.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
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
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              aria-label="Sort products"
              className="px-4 py-2 rounded-lg bg-card border border-border text-sm text-foreground"
            >
              <option value="bestselling">Bestselling</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>

          {filter !== "Bundles" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {filtered.map((p) => (
                <div key={p.name} className="bg-card rounded-2xl p-5 border border-border hover:shadow-lg transition-shadow">
                  <ImagePlaceholder label={`[IMAGE: Product — ${p.name}]`} aspectRatio="portrait" className="rounded-xl mb-4" src={p.image} />
                  <h3 className="font-display text-lg font-semibold text-foreground">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-2">{p.benefit}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">{Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-accent text-sm">★</span>)}</div>
                    <span className="text-xs text-muted-foreground">{p.rating} ({p.reviews})</span>
                  </div>
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
          )}

          {/* Bundles */}
          {(filter === "All" || filter === "Bundles") && (
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-8">
                Protocol Bundles — Save More
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {bundles.map((b) => (
                  <div key={b.name} className="bg-card rounded-2xl p-6 border-2 border-accent/30 hover:border-accent transition-colors">
                    <ImagePlaceholder label={`[IMAGE: Bundle — ${b.name}]`} aspectRatio="landscape" className="rounded-xl mb-4" src={b.image} />
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">{b.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{b.items}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">{Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-accent text-sm">★</span>)}</div>
                      <span className="text-xs text-muted-foreground">{b.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono text-sm font-semibold text-foreground">{b.price}</span>
                        <span className="text-xs text-accent ml-2 font-semibold">Save {b.savings}</span>
                      </div>
                      <button
                        onClick={() => addToCart(b.name, b.price)}
                        className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
                      >
                        Add Bundle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShopPage;
