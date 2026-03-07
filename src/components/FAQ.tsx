import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    category: "Getting Started",
    questions: [
      { q: "What is functional medicine and how is it different?", a: "Functional medicine focuses on identifying and addressing the root cause of disease rather than just treating symptoms. We use advanced diagnostics, lifestyle interventions, and personalized protocols — not just prescriptions." },
      { q: "Do I need a referral to work with VELARA?", a: "No referral is needed. You can book directly through our website. We recommend starting with our free health assessment to determine the best program for you." },
      { q: "Is VELARA right for me if I'm already seeing a doctor?", a: "Absolutely. We complement conventional care by providing deeper diagnostics and personalized protocols your primary care doctor may not have time to explore." },
    ],
  },
  {
    category: "Testing & Diagnostics",
    questions: [
      { q: "What kind of lab tests do you run?", a: "We analyze 80+ biomarkers including comprehensive metabolic panels, full thyroid panels, hormone profiles (DUTCH test), gut microbiome analysis, nutrient deficiency panels, inflammatory markers, and more." },
      { q: "Can I do lab work from home?", a: "Yes. Most of our testing can be done at home with convenient collection kits shipped directly to you. Some specialized tests may require a visit to a local lab." },
      { q: "How are your lab ranges different from my doctor's?", a: "We use functional (optimal) ranges rather than conventional ranges. Conventional ranges are based on the average of a sick population. Our ranges reflect what's actually optimal for health and performance." },
    ],
  },
  {
    category: "Programs & Pricing",
    questions: [
      { q: "How much do your programs cost?", a: "Programs range from $297–$997/month depending on complexity. All programs include practitioner access, lab interpretation, custom protocols, and ongoing support. We also offer payment plans." },
      { q: "Do you accept insurance?", a: "We don't bill insurance directly, but many of our lab tests and consultations may be reimbursable through your HSA/FSA. We provide superbills for out-of-network reimbursement." },
      { q: "What's included in the free assessment?", a: "The free assessment is a comprehensive questionnaire that evaluates your symptoms, health history, and goals. You'll receive a personalized recommendation for which protocol best fits your needs." },
    ],
  },
  {
    category: "Results & Timeline",
    questions: [
      { q: "How quickly will I see results?", a: "Most members notice initial improvements within 2–4 weeks. Significant, measurable changes typically occur within 60–90 days. Complex cases may take longer as we address deeper root causes." },
      { q: "What if the protocol doesn't work?", a: "We continuously monitor your progress and adjust your protocol as needed. If you're not seeing results, we dig deeper with additional testing. We don't stop until we find answers." },
      { q: "What does '94% improvement rate' mean?", a: "Based on our internal data, 94% of members who complete at least 90 days of their prescribed protocol report measurable improvement in their primary health concern, validated through follow-up labs and symptom tracking." },
    ],
  },
  {
    category: "Supplements & Products",
    questions: [
      { q: "Are your supplements third-party tested?", a: "Yes. Every product in our dispensary is third-party tested for purity, potency, and contaminants. We only carry practitioner-grade supplements from trusted manufacturers." },
      { q: "Do I have to buy supplements through VELARA?", a: "No, but we recommend it. Our dispensary ensures you get the exact formulations prescribed in your protocol. Over-the-counter alternatives often have lower bioavailability." },
      { q: "Are your products safe to take with prescription medications?", a: "Our practitioners review all your current medications before prescribing any supplements. We'll flag any potential interactions and adjust your protocol accordingly." },
    ],
  },
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggle = (key: string) => {
    setOpenItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <section id="faq" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">FAQ</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground">
            Questions We Hear Often
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-10">
          {faqData.map((cat) => (
            <div key={cat.category}>
              <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">{cat.category}</h3>
              <div className="space-y-2">
                {cat.questions.map((item) => {
                  const key = `${cat.category}-${item.q}`;
                  const isOpen = openItems.includes(key);
                  return (
                    <div key={key} className="bg-background rounded-xl border border-border/50 overflow-hidden">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left"
                      >
                        <span className="text-sm font-medium text-foreground pr-4">{item.q}</span>
                        <ChevronDown
                          size={18}
                          className={`flex-shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
