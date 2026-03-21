import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";

const team = [
  { name: "Dr. Elena Vasquez", role: "Founder & Lead Practitioner", credentials: "MD, IFMCP — Board-certified in Integrative Medicine", bio: "After a decade in conventional medicine, Elena founded Velara when she realized lab 'normals' were failing patients. She's helped over 2,000 patients uncover root causes conventional medicine missed.", image: "/images/team_dr_elena_1772491726653.png" },
  { name: "Dr. Marcus Chen", role: "Hormones & Longevity Specialist", credentials: "DO, ABAARM — Anti-Aging & Regenerative Medicine", bio: "Marcus blends cutting-edge longevity science with traditional Chinese medicine principles. His hormone optimization protocols have become the backbone of Velara's most transformative programs.", image: "/images/team_dr_marcus_1772491740108.png" },
  { name: "Dr. Amara Okafor", role: "Gut Health & Immunology", credentials: "PhD, CNS — Clinical Nutrition & Gastroenterology", bio: "Amara's research on the gut-brain axis has been published in 12 peer-reviewed journals. She designs Velara's gut restoration protocols and oversees all microbiome-related testing.", image: "/images/team_dr_amara_1772491753632.png" },
];

const protocolSteps = [
  { num: "01", title: "Assess", desc: "An in-depth health assessment covering 80+ biomarkers — a complete picture conventional medicine rarely sees.", image: "/images/about_panel_assess_1773774546827.png" },
  { num: "02", title: "Diagnose", desc: "We analyze your results using functional ranges — catching imbalances long before they become diagnosable disease.", image: "/images/about_panel_diagnose_1773774568262.png" },
  { num: "03", title: "Protocol", desc: "A personalized plan combining targeted supplementation, nutrition strategy, and ongoing practitioner guidance.", image: "/images/about_panel_protocol_1773774584765.png" },
  { num: "04", title: "Transform", desc: "Within 90 days, most members experience measurable improvements. Your protocol evolves with you.", image: "/images/about_panel_transform_1773774597976.png" },
];

const pressQuotes = [
  { quote: "A precision approach to wellness that actually delivers measurable results.", source: "HEALTHLINE" },
  { quote: "VELARA is redefining what personalized medicine looks like in practice.", source: "MINDBODYGREEN" },
  { quote: "The protocol-first model is something the functional medicine space has needed for years.", source: "WELL+GOOD" },
];

// ── Number Ticker for Stats ──
const NumberTicker = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const target = parseInt(value.replace(/[,+]/g, ""), 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = 0;
          const duration = 1200;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * target));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={nodeRef} className="stats-number">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// ── Bio Toggle Component for Practitioners ──
const PractitionerBio = ({ bio }: { bio: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="mt-4">
      <p className={`practitioner-bio ${isExpanded ? "practitioner-bio--expanded" : ""}`}>
        {bio}
      </p>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[#C9A84C] text-xs font-mono uppercase tracking-wider mt-2 hover:opacity-80 transition-opacity"
      >
        {isExpanded ? "Show Less" : "Read Bio"}
      </button>
    </div>
  );
};



const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="dark-section relative pt-32 pb-20 bg-[#2D4A3E] about-hero-section">
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-4">Our Story</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white mb-6 w-full max-w-4xl mx-auto about-hero-headline leading-tight tracking-tight">
          We built Velara because the system failed us too.
        </h1>
        <p className="text-lg text-[#F5F0E8]/80 leading-relaxed max-w-[680px] w-full mx-auto our-story-section">
          We were the patients told "your labs are normal" while we struggled with fatigue, brain fog, and unexplained symptoms. We were the doctors frustrated by a system that treated symptoms instead of seeking root causes. So we built something better — a practice where advanced diagnostics meet compassionate, personalized care.
        </p>
      </div>
    </section>

    {/* Mission */}
    <section className="py-20 lg:py-28 mission-quote-section">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <blockquote className="text-3xl md:text-4xl lg:text-5xl font-display italic text-primary leading-snug mission-quote-text">
          "Root causes. Not band-aids. Never shortcuts."
        </blockquote>
        <p className="mt-6 text-muted-foreground">— The Velara Mission</p>
      </div>
    </section>

    {/* Protocol Expanded */}
    <section className="bg-[#F5F0E8] pt-20 pb-12 about-method-section">
      <div className="container mx-auto px-6 mb-10 text-center">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-4">OUR METHOD</p>
        <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground">The Velara Protocol™</h2>
      </div>
      <div className="w-full">
        <div className="flex flex-col md:flex-row w-full h-auto md:h-[520px] method-panels-container">
          {protocolSteps.map((step) => (
            <div key={step.num} className="group relative w-full md:w-1/4 h-[380px] md:h-[520px] overflow-hidden border-r border-transparent md:hover:border-[rgba(201,168,76,0.4)] transition-all duration-300 method-panel snap-center">
              <img src={step.image} alt={step.title} className="absolute inset-0 w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,35,25,0.92)] via-[rgba(20,35,25,0.5)] to-[rgba(20,35,25,0.15)] group-hover:from-[rgba(20,35,25,0.96)] transition-all duration-300"></div>
              
              <div className="absolute inset-x-0 top-12 flex justify-center">
                <span className="text-[96px] font-display font-bold text-[rgba(201,168,76,0.9)] group-hover:text-[#C9A84C] leading-none transition-colors duration-300 method-panel-number">{step.num}</span>
              </div>
              
              <div className="absolute inset-x-0 top-[65%] flex justify-center">
                <div className="w-[40px] h-[1px] bg-[#C9A84C] group-hover:w-[60px] transition-all duration-300"></div>
              </div>
 
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-8 px-4">
                <h3 className="text-[22px] font-display italic text-[#F5F0E8] mb-4">{step.title}</h3>
                <p className="text-[14px] text-[#F5F0E8]/75 max-w-[180px] leading-[1.6] text-center mb-6 md:opacity-0 md:translate-y-[8px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 method-panel-body">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-[48px] text-center">
          <Link to="/book" className="inline-flex items-center px-8 py-4 rounded-full bg-[#C9A84C] text-[#2D4A3E] font-semibold text-lg hover:opacity-90 transition-opacity">
            Check If You Qualify →
          </Link>
          <p className="text-sm text-muted-foreground mt-4 text-center">Your assessment is the first step.</p>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="pt-16 lg:pt-24 pb-[80px]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">The Team</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">Meet Your Practitioners</h2>
        </div>
        <div className="practitioner-grid">
          {team.map((t) => (
            <div key={t.name} className="practitioner-card bg-card rounded-2xl border border-border">
              {/* Portrait — fixed 320px height, face always visible */}
              <div className="practitioner-portrait">
                <img src={t.image} alt={`Team — ${t.name} portrait`} />
              </div>
              {/* Doctor name */}
              <h3 className="practitioner-name">{t.name}</h3>
              {/* Specialty */}
              <p className="practitioner-specialty">{t.role}</p>
              {/* Credentials */}
              <p className="practitioner-credentials">{t.credentials}</p>
              {/* Bio with Toggle */}
              <PractitionerBio bio={t.bio} />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Press — In The Press */}
    <section className="pt-[80px] pb-16 lg:pb-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="inline-block font-mono text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-8">IN THE PRESS</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 press-quote-cards">
          {pressQuotes.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-[28px] border-[0.5px] border-[#C9A84C]/30">
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#C9A84C] uppercase mb-4">{item.source}</p>
              <p className="font-display italic text-lg text-foreground leading-relaxed">"{item.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 md:py-24 gradient-sage stats-section">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center stats-main-grid">
          {[
            { val: "4200", suffix: "+", label: "Members" },
            { val: "15", suffix: "+", label: "Years Experience" },
            { val: "80", suffix: "+", label: "Biomarkers Tested" },
            { val: "94", suffix: "%", label: "Improvement Rate" },
          ].map((s, i) => (
            <div key={s.label} className="stats-main-item">
              <p className="text-3xl md:text-5xl font-display font-semibold text-accent">
                <NumberTicker value={s.val} suffix={s.suffix} />
              </p>
              <p className="text-sm text-primary-foreground/60 mt-2 font-mono uppercase tracking-wider stats-main-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Mission & CTA Block */}
    <section className="relative py-20 md:py-32 gradient-assessment mission-block-section overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10 mission-block-content">
        <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6 mission-block-headline">Join the mission.</h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto mission-block-body leading-relaxed">
          Experience what healthcare should feel like — personal, precise, and transformative.
        </p>

        <div className="mission-cta-area flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-4 mission-cta-micro">No commitment required</p>
          <Link to="/book" className="inline-flex items-center px-10 py-5 rounded-full bg-accent text-accent-foreground font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-xl mission-cta-btn">
            Check If You Qualify →
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default AboutPage;
