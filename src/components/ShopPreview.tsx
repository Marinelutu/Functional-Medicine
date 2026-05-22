const ShopPreview = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="group flex flex-col lg:flex-row bg-[#F7F3EE] rounded-[24px] overflow-hidden shadow-sm border border-border/50">
          {/* Image Side */}
          <div className="lg:w-1/2 min-h-[350px] lg:min-h-[500px] overflow-hidden relative">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'url(/images/services/pexels-adanvdo-42038771-7359304.jpg)' }}
            />
          </div>
          
          {/* Text Side */}
          <div className="lg:w-1/2 p-10 lg:p-20 flex flex-col justify-center">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-4">
              The Velara Dispensary
            </p>
            <h2 className="text-3xl lg:text-5xl font-display font-semibold text-[#1C1C1C] mb-6">
              Practitioner-Grade Supplements
            </h2>
            <p className="text-[#1C1C1C]/80 leading-relaxed text-lg mb-10 max-w-lg">
              Every protocol is supported by practitioner-grade supplements, dispensed exclusively to active VELARA patients. Our curated selection ensures maximum bioavailability and clinical efficacy.
            </p>
            <div>
              <a 
                href="/shop" 
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#2D4A3E] text-white font-medium text-sm hover:bg-[#C9A84C] transition-colors duration-300 group"
              >
                View All Supplements
                <span className="ml-2 inline-block transition-transform duration-300 translate-x-0 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPreview;
