import ImagePlaceholder from "./ImagePlaceholder";
import AddToCartButton from "./AddToCartButton";

const products = [
  { name: "Neuro-Clarity Complex", benefit: "Sharpen focus & mental stamina", price: "$64", image: "/images/product_individual_01_1772542326626.png" },
  { name: "Gut Restore Probiotic", benefit: "Heal your microbiome from the inside out", price: "$52", image: "/images/product_individual_02_1772542342077.png" },
  { name: "Adrenal Support Formula", benefit: "Rebuild resilience to stress naturally", price: "$48", image: "/images/product_individual_03_1772542356241.png" },
  { name: "Hormone Balance Blend", benefit: "Estrogen, progesterone & thyroid support", price: "$58", image: "/images/product_individual_04.png" },
];

const ShopPreview = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              The Velara Dispensary
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
              Practitioner-Grade Supplements
            </h2>
          </div>
          <a href="/shop" className="hidden sm:inline-flex text-sm font-semibold text-primary hover:text-accent transition-colors">
            View All →
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.name} className="group">
              <ImagePlaceholder
                label="[IMAGE: Product — Front label shot]"
                aspectRatio="square"
                className="rounded-2xl mb-4 group-hover:shadow-lg transition-shadow"
                src={p.image}
              />
              <h3 className="font-display text-lg font-semibold text-foreground">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">{p.benefit}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-foreground">{p.price}</span>
                <AddToCartButton
                  productName={p.name}
                  productPrice={p.price}
                  productBenefit={p.benefit}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopPreview;
