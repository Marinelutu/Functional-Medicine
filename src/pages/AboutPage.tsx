import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";

const team = [
  { name: "Dr. Elena Vasquez", role: "Founder & Lead Practitioner", credentials: "MD, IFMCP — Board-certified in Integrative Medicine", bio: "After a decade in conventional medicine, Elena founded Velara when she realized lab 'normals' were failing patients. She's helped over 2,000 patients uncover root causes conventional medicine missed.", image: "/images/team_dr_elena_1772491726653.png" },
  { name: "Dr. Marcus Chen", role: "Hormones & Longevity Specialist", credentials: "DO, ABAARM — Anti-Aging & Regenerative Medicine", bio: "Marcus blends cutting-edge longevity science with traditional Chinese medicine principles. His hormone optimization protocols have become the backbone of Velara's most transformative programs.", image: "/images/team_dr_marcus_1772491740108.png" },
  { name: "Dr. Amara Okafor", role: "Gut Health & Immunology", credentials: "PhD, CNS — Clinical Nutrition & Gastroenterology", bio: "Amara's research on the gut-brain axis has been published in 12 peer-reviewed journals. She designs Velara's gut restoration protocols and oversees all microbiome-related testing.", image: "/images/team_dr_amara_1772491753632.png" },
  { name: "Dr. Sarah Mitchell", role: "Neuro-Cognitive Specialist", credentials: "PsyD, ABIHM — Integrative & Holistic Medicine", bio: "Sarah specializes in the intersection of brain health and metabolic function. Her Neuro-Clarity Program has helped hundreds of professionals regain peak cognitive performance.", image: "/images/dr_4_latino_1772572310653.png" },
  { name: "Dr. James Rivera", role: "Metabolic & Weight Optimization", credentials: "MD, ABOM — Board-certified in Obesity Medicine", bio: "James brings a metabolic-first approach to weight management, focusing on insulin signaling, thyroid optimization, and inflammatory pathways rather than calorie restriction.", image: "/images/dr_5_south_asian_1772572324802.png" },
  { name: "Dr. Priya Sharma", role: "Thyroid & Autoimmune Specialist", credentials: "MD, ECNU — Endocrinology & Clinical Nutrition", bio: "Priya's deep expertise in thyroid dysfunction goes far beyond TSH. She's developed Velara's comprehensive thyroid panel protocol that catches what standard testing misses.", image: "/images/dr_6_white_male_1772572337828.png" },
];

const protocolSteps = [
  { num: "01", title: "Assess", desc: "We begin with an in-depth health assessment that goes far beyond a standard intake form. Combined with our advanced lab panel covering 80+ biomarkers, we build a complete picture of your unique biology — one that conventional medicine rarely sees.", image: "/images/protocol_step_01_assess_1772491828260.png" },
  { num: "02", title: "Diagnose", desc: "Our clinical team analyzes your results using functional ranges, not just conventional ones. This means we catch imbalances long before they become diagnosable diseases. We look at how your systems interact, not just individual markers in isolation.", image: "/images/protocol_step_02_diagnose_1772491844275.png" },
  { num: "03", title: "Protocol", desc: "Your personalized Velara Protocol™ is a comprehensive plan combining targeted supplementation, nutrition strategies, lifestyle modifications, and ongoing practitioner guidance. Every recommendation is evidence-based and tailored to your specific root causes.", image: "/images/protocol_step_03_protocol_1772491856872.png" },
  { num: "04", title: "Transform", desc: "Within 90 days, most members experience measurable improvements. But we don't stop there — your protocol evolves with you through regular check-ins, retesting, and adjustments. Transformation isn't a destination; it's a sustainable way of living.", image: "/images/protocol_step_04_transform_1772491876304.png" },
];

const pressQuotes = [
  { quote: "Velara is redefining what functional medicine looks like in the modern age.", source: "Forbes" },
  { quote: "A precision approach to wellness that actually delivers measurable results.", source: "Healthline" },
  { quote: "The gold standard for root-cause medicine — personalized, evidence-based, and deeply human.", source: "Mindbodygreen" },
];

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="gradient-sage pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">Our Story</p>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-primary-foreground mb-6">
              We built Velara because the system failed us too.
            </h1>
            <p className="text-lg text-primary-foreground/70 leading-relaxed">
              We were the patients told "your labs are normal" while we struggled with fatigue, brain fog, and unexplained symptoms. We were the doctors frustrated by a system that treated symptoms instead of seeking root causes. So we built something better — a practice where advanced diagnostics meet compassionate, personalized care.
            </p>
          </div>
          <ImagePlaceholder src="/images/about_page_hero_1772572296572.png" label="About hero — founding team" aspectRatio="landscape" className="rounded-2xl object-cover" />
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <blockquote className="text-3xl md:text-4xl lg:text-5xl font-display italic text-primary leading-snug">
          "Root causes. Not band-aids. Never shortcuts."
        </blockquote>
        <p className="mt-6 text-muted-foreground">— The Velara Mission</p>
      </div>
    </section>

    {/* Protocol Expanded */}
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">Our Method</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">The Velara Protocol™</h2>
        </div>
        <div className="space-y-16">
          {protocolSteps.map((step, i) => (
            <div key={step.num} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span className="font-mono text-xs tracking-wider text-accent">{step.num}</span>
                <h3 className="text-2xl font-display font-semibold text-foreground mt-2 mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <ImagePlaceholder src={step.image} label={`Protocol illustration — step ${step.num}`} aspectRatio="landscape" className="rounded-2xl object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">The Team</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">Meet Your Practitioners</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl p-6 border border-border">
              <ImagePlaceholder src={t.image} label={`Team — ${t.name} portrait`} aspectRatio="portrait" className="rounded-xl mb-4 object-cover" />
              <h3 className="font-display text-xl font-semibold text-foreground">{t.name}</h3>
              <p className="text-sm text-accent font-mono mt-1">{t.role}</p>
              <p className="text-xs text-muted-foreground mt-1 mb-3">{t.credentials}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Press */}
    <section className="py-16 lg:py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">In the Press</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40 text-lg font-display">
            {["Healthline", "Forbes", "Mindbodygreen", "Well+Good", "Vogue", "Entrepreneur"].map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {pressQuotes.map((pq) => (
            <blockquote key={pq.source} className="text-center">
              <p className="font-display text-lg italic text-foreground mb-3">"{pq.quote}"</p>
              <cite className="text-sm text-accent font-mono not-italic">— {pq.source}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 gradient-sage">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "4,200+", label: "Members" },
            { val: "15+", label: "Years Experience" },
            { val: "80+", label: "Biomarkers Tested" },
            { val: "94%", label: "Improvement Rate" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-display font-semibold text-accent">{s.val}</p>
              <p className="text-sm text-primary-foreground/60 mt-1 font-mono">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 gradient-assessment">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">Join the mission.</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Experience what healthcare should feel like — personal, precise, and transformative.
        </p>
        <Link to="/book" className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold text-lg hover:opacity-90 transition-opacity">
          Start Your Journey
        </Link>
      </div>
    </section>

    <Footer />
  </div>
);

export default AboutPage;
