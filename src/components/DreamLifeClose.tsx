import { useEffect, useRef, useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

const DreamLifeClose = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current || !imageRef.current) return;
        if (isMobile) {
          imageRef.current.style.transform = 'none';
          return;
        }

        const scrollY = window.scrollY;
        const offsetTop = sectionRef.current.offsetTop;
        const offset = (scrollY - offsetTop) * 0.4;

        imageRef.current.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  const getAnimStyle = (delay: number) => ({
    transitionDelay: `${delay}s`,
    transitionDuration: '0.6s',
    transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    transitionProperty: 'opacity, transform',
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    opacity: isVisible ? 1 : 0,
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[100vh] flex items-center justify-center bg-[#1c1c1c]"
    >
      {/* Background Image Container */}
      <div
        ref={imageRef}
        className="absolute top-[-20%] left-0 w-full h-[140%] will-change-transform"
      >
        <ImagePlaceholder
          label="[IMAGE: Dream Life Close — Person thriving, hiking, cinematic]"
          aspectRatio="hero"
          className="w-full h-full rounded-none object-cover"
          src="/images/dream_life_close_1772491714558.png"
        />
      </div>

      {/* Layered Gradient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, rgba(28,28,28,0.75) 0%, rgba(28,28,28,0.2) 50%, transparent 100%)"
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(28,28,28,0.4) 100%)"
        }}
      />

      {/* Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content Stack */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-6 max-w-3xl mx-auto text-center mt-8">

        {/* Leaf Icon (32px) */}
        <div
          className="mb-4 text-[#C9A84C] flex justify-center w-full"
          style={getAnimStyle(0)}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2.66663C16 2.66663 26.6667 8.00003 26.6667 16.0001C26.6667 22.9999 21.3333 26.6667 16 30.6667C10.6667 26.6667 5.33333 22.9999 5.33333 16.0001C5.33333 8.00003 16 2.66663 16 2.66663Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 30.6667V16.0001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Eyebrow Label */}
        <p
          className="font-mono uppercase text-[#C9A84C] opacity-80 text-[11px] tracking-[0.15em] mb-3"
          style={getAnimStyle(0.1)}
        >
          Your Dream Life Awaits
        </p>

        {/* Headline */}
        <h2
          className="font-display text-white text-[36px] md:text-[64px] leading-[1.2] max-w-[720px] mx-auto mb-6"
          style={getAnimStyle(0.2)}
        >
          This is what's waiting<br />
          <span className="italic">on the other side.</span>
        </h2>

        {/* Subline */}
        <p
          className="font-sans text-white text-[17px] opacity-75 max-w-[480px] mx-auto leading-[1.7] mb-10"
          style={getAnimStyle(0.35)}
        >
          A life where you wake up energized, think clearly, move freely, and feel like yourself again.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col md:flex-row gap-3 md:gap-4 mb-12 w-full md:w-auto"
          style={getAnimStyle(0.5)}
        >
          <a
            href="/book"
            className="flex items-center justify-center bg-[#C9A84C] text-[#1C1C1C] font-sans font-medium text-[15px] rounded-full h-[52px] px-[40px] transition-transform hover:scale-105 w-full md:w-auto whitespace-nowrap"
          >
            Begin Your Transformation
          </a>
          <a
            href="/services"
            className="flex items-center justify-center border border-white text-white bg-transparent font-sans font-medium text-[15px] rounded-full h-[52px] px-[40px] transition-colors hover:bg-white/10 w-full md:w-auto whitespace-nowrap"
          >
            See Our Protocols
          </a>
        </div>

        {/* Reassurance Line */}
        <p
          className="font-sans italic text-white opacity-45 text-[13px] m-0"
          style={getAnimStyle(0.65)}
        >
          Join 4,200+ people who chose to understand their body.
        </p>

      </div>
    </section>
  );
};

export default DreamLifeClose;
