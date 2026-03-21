import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

const categories = ["All", "Energy", "Hormones", "Gut", "Clarity", "Longevity", "Bundles"];

const products = [
  { name: "Neuro-Clarity Complex", benefit: "Sharpen focus & mental stamina", price: "$64", rating: 4.8, reviews: 142, category: "Clarity", image: "/images/product_individual_01_1772542326626.png" },
  { name: "Gut Restore Probiotic", benefit: "Heal your microbiome from the inside out", price: "$52", rating: 4.9, reviews: 218, category: "Gut", image: "/images/product_individual_02_1772542342077.png" },
  { name: "Adrenal Support Formula", benefit: "Rebuild resilience to stress naturally", price: "$48", rating: 4.7, reviews: 96, category: "Energy", image: "/images/product_individual_03_1772542356241.png" },
  { name: "Hormone Balance Blend", benefit: "Estrogen, progesterone & thyroid support", price: "$58", rating: 4.8, reviews: 173, category: "Hormones", image: "/images/product_individual_04.png" },
  { name: "Mitochondrial Energy Complex", benefit: "Fuel your cells for all-day energy", price: "$72", rating: 4.9, reviews: 164, category: "Energy", image: "/images/product_individual_05.png" },
  { name: "Thyroid Optimizer", benefit: "Comprehensive thyroid nutrient support", price: "$54", rating: 4.8, reviews: 131, category: "Hormones", image: "/images/product_individual_06.png" },
  { name: "Deep Sleep Formula", benefit: "Fall asleep faster, wake refreshed", price: "$44", rating: 4.7, reviews: 203, category: "Clarity", image: "/images/product_individual_07.png" },
  { name: "Omega-3 Ultra", benefit: "High-potency EPA/DHA for brain & heart", price: "$56", rating: 4.9, reviews: 189, category: "Longevity", image: "/images/product_individual_08.png" },
  { name: "Inflammation Defense", benefit: "Curcumin + boswellia for systemic relief", price: "$46", rating: 4.8, reviews: 112, category: "Longevity", image: "/images/product_individual_09.png" },
  { name: "Digestive Enzyme Complex", benefit: "Optimize nutrient absorption & reduce bloating", price: "$38", rating: 4.7, reviews: 157, category: "Gut", image: "/images/product_individual_10.png" },
  { name: "Vitamin D3 + K2", benefit: "Bone, immune & cardiovascular support", price: "$32", rating: 4.9, reviews: 241, category: "Longevity", image: "/images/product_individual_11.png" },
  { name: "Magnesium Glycinate", benefit: "Calm your nervous system & improve sleep", price: "$36", rating: 4.8, reviews: 198, category: "Energy", image: "/images/product_individual_12.png" },
];

const bundles = [
  { name: "The Energy Protocol Bundle", items: "Mitochondrial Energy + Adrenal Support + Magnesium", price: "$144", savings: "$12", rating: 4.9, image: "/images/product_bundle_01_1772542278762.png" },
  { name: "The Hormone Reset Bundle", items: "Hormone Balance + Thyroid Optimizer + Vitamin D3+K2", price: "$132", savings: "$12", rating: 4.8, image: "/images/product_bundle_02_1772542293329.png" },
  { name: "The Gut Health Bundle", items: "Gut Restore + Digestive Enzymes + Omega-3 Ultra", price: "$134", savings: "$12", rating: 4.9, image: "/images/product_bundle_03_1772542310069.png" },
];

type SortOption = "bestselling" | "price-asc" | "price-desc";

const parsePrice = (p: string) => parseFloat(p.replace("$", ""));

// ── Inline Add-to-Cart button for product cards (full-width, flat bottom) ──
type BtnState = "idle" | "loading" | "confirmed";
interface ShopAtcProps {
  productName: string;
  productPrice: string;
  productBenefit?: string;
  variant?: "product" | "bundle";
}

const ShopAtcButton = ({ productName, productPrice, productBenefit, variant = "product" }: ShopAtcProps) => {
  const [state, setState] = useState<BtnState>("idle");
  const { addToCart } = useCart();

  const handleClick = useCallback(() => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      addToCart(productName, productPrice, productBenefit);
      setState("confirmed");
      setTimeout(() => setState("idle"), 2000);
    }, 400);
  }, [state, addToCart, productName, productPrice, productBenefit]);

  const isBundle = variant === "bundle";

  const label =
    state === "confirmed" ? "✓ Added" :
      state === "loading" ? "" :
        isBundle ? "Add Protocol Bundle" : "Add to Protocol";

  return (
    <button
      onClick={handleClick}
      disabled={state !== "idle"}
      aria-label={`Add ${productName} to cart`}
      className={
        isBundle
          ? `shop-bundle-atc-btn${state === "confirmed" ? " shop-atc-confirmed" : state === "loading" ? " shop-atc-loading" : ""}`
          : `shop-product-atc-btn${state === "confirmed" ? " shop-atc-confirmed" : state === "loading" ? " shop-atc-loading" : ""}`
      }
    >
      {state === "loading" ? <span className="atc-spinner" aria-label="Adding to cart" /> : label}
    </button>
  );
};

// ── Star row renderer ──
const StarRow = ({ rating, reviews }: { rating: number; reviews: number }) => (
  <div className="shop-card-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className="shop-star">★</span>
    ))}
    <span className="shop-card-rating">{rating} ({reviews})</span>
  </div>
);

const ShopPage = () => {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState<SortOption>("bestselling");

  let filtered = filter === "All" || filter === "Bundles" ? products : products.filter((p) => p.category === filter);

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  else if (sort === "price-desc") filtered = [...filtered].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  else filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero Header ── */}
      <section className="dark-section pt-32 pb-8 relative bg-[#2D4A3E] page-hero-section">
        <div className="container mx-auto px-6 text-center">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">The Velara Dispensary</p>
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-white mb-4 page-hero-headline">
            Practitioner-Grade Supplements
          </h1>
          <p className="text-[#F5F0E8]/80 max-w-2xl mx-auto">
            Practitioner-formulated. Third-party tested. Designed for your protocol.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 relative">
        <div className="container mx-auto px-6">

          {/* ── Filter Tabs + Sort ── */}
          <div className="shop-controls">
            <div className="shop-filter-tabs">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`shop-filter-tab${filter === c ? " shop-filter-tab--active" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="shop-sort-wrapper">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                aria-label="Sort products"
                className="shop-sort-select"
              >
                <option value="bestselling">Bestselling</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
              <ChevronDown className="shop-sort-chevron" size={14} />
            </div>
          </div>

          {/* ── Product Grid ── */}
          {filter !== "Bundles" && (
            <div className="shop-product-grid">
              {filtered.map((p) => (
                <div key={p.name} className="shop-product-card">
                  {/* 1. Image area */}
                  <div className="shop-card-image-area">
                    {p.name === "Vitamin D3 + K2" || p.name === "Gut Restore Probiotic" || p.name === "Deep Sleep Formula" ? (
                      <span className="shop-product-badge shop-product-badge-bestseller">Bestseller</span>
                    ) : p.name === "Mitochondrial Energy Complex" ? (
                      <span className="shop-product-badge shop-product-badge-popular">Most Popular</span>
                    ) : p.name === "Magnesium Glycinate" ? (
                      <span className="shop-product-badge shop-product-badge-new">New</span>
                    ) : null}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="shop-card-img"
                    />
                  </div>

                  {/* 2. Card body */}
                  <div className="shop-card-body">
                    {/* 2a. Product name */}
                    <h3 className="shop-card-name">{p.name}</h3>

                    {/* 2b. One-line benefit */}
                    <p className="shop-card-benefit">{p.benefit}</p>

                    {/* 2c. Star rating row */}
                    <StarRow rating={p.rating} reviews={p.reviews} />

                    {/* 2d. Price */}
                    <p className="shop-card-price">{p.price}</p>
                  </div>

                  {/* 3. Add to Cart — full-width, flat bottom */}
                  <ShopAtcButton
                    productName={p.name}
                    productPrice={p.price}
                    productBenefit={p.benefit}
                    variant="product"
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── Bundle Section ── */}
          {(filter === "All" || filter === "Bundles") && (
            <div className="shop-bundle-section">
              <h2 className="shop-bundle-heading">Protocol Bundles — Save More</h2>
              <div className="shop-bundle-grid">
                {bundles.map((b) => (
                  <div key={b.name} className="shop-bundle-card">
                    {/* Bundle image */}
                    <div className="shop-bundle-image-area">
                      <img
                        src={b.image}
                        alt={b.name}
                        className="shop-bundle-img"
                      />
                    </div>

                    {/* Bundle body */}
                    <div className="shop-card-body">
                      <h3 className="shop-bundle-name">{b.name}</h3>
                      <p className="shop-bundle-contents">{b.items}</p>
                      <div className="shop-card-stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="shop-star">★</span>
                        ))}
                        <span className="shop-card-rating">{b.rating}</span>
                      </div>
                      <div className="shop-bundle-price-row">
                        <span className="shop-bundle-price">{b.price}</span>
                        <span className="shop-bundle-save">Save {b.savings}</span>
                      </div>
                    </div>

                    {/* Add Bundle button */}
                    <ShopAtcButton
                      productName={b.name}
                      productPrice={b.price}
                      productBenefit={b.items}
                      variant="bundle"
                    />
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
