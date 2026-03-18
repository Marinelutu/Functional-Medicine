import { Link } from "react-router-dom";

const protocolSteps = [
  { num: "01", title: "Assess", desc: "An in-depth health assessment covering 80+ biomarkers — a complete picture conventional medicine rarely sees.", image: "/images/about_panel_assess_1773774546827.png" },
  { num: "02", title: "Diagnose", desc: "We analyze your results using functional ranges — catching imbalances long before they become diagnosable disease.", image: "/images/about_panel_diagnose_1773774568262.png" },
  { num: "03", title: "Protocol", desc: "A personalized plan combining targeted supplementation, nutrition strategy, and ongoing practitioner guidance.", image: "/images/about_panel_protocol_1773774584765.png" },
  { num: "04", title: "Transform", desc: "Within 90 days, most members experience measurable improvements. Your protocol evolves with you.", image: "/images/about_panel_transform_1773774597976.png" },
];

const VelaraProtocol = () => {
  return (
    <section className="bg-[#F5F0E8] pt-20 pb-12">
      <div className="container mx-auto px-6 mb-10 text-center">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-4">OUR METHOD</p>
        <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground">The Velara Protocol™</h2>
      </div>
      <div className="w-full">
        <div className="protocol-steps-container flex flex-col md:flex-row w-full h-auto md:h-[520px]">
          {protocolSteps.map((step) => (
            <div key={step.num} className="protocol-step-card group relative w-full md:w-1/4 h-[380px] md:h-[520px] overflow-hidden border-r border-transparent md:hover:border-[rgba(201,168,76,0.4)] transition-all duration-300">
              <img src={step.image} alt={step.title} className="protocol-step-image-area absolute inset-0 w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,35,25,0.92)] via-[rgba(20,35,25,0.5)] to-[rgba(20,35,25,0.15)] group-hover:from-[rgba(20,35,25,0.96)] transition-all duration-300"></div>
              
              <div className="absolute inset-x-0 top-12 flex justify-center">
                <span className="text-[96px] font-display font-bold text-[rgba(201,168,76,0.9)] group-hover:text-[#C9A84C] leading-none transition-colors duration-300">{step.num}</span>
              </div>
              
              <div className="absolute inset-x-0 top-[65%] flex justify-center">
                <div className="w-[40px] h-[1px] bg-[#C9A84C] group-hover:w-[60px] transition-all duration-300"></div>
              </div>

              <div className="protocol-step-content-area absolute inset-x-0 bottom-0 flex flex-col items-center pb-8 px-4">
                <h3 className="text-[22px] font-display italic text-[#F5F0E8] mb-4">{step.title}</h3>
                <p className="text-[14px] text-[#F5F0E8]/75 max-w-[180px] leading-[1.6] text-center mb-6 md:opacity-0 md:translate-y-[8px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
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
  );
};

export default VelaraProtocol;
