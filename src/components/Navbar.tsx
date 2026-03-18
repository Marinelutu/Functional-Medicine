import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "./CartDrawer";
import ConsultationModal from "./ConsultationModal";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Book", href: "/book" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const { count, badgeBounce, toggleDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect if header is over a dark section
      const headerCenterY = 40; 
      let overDark = false;
      const darkSelectors = ['.hero-section', '.problem-section', '.eligibility-gate', '.dream-life-section', 'footer', '.dark-section'];
      
      for (const selector of darkSelectors) {
        const elements = document.querySelectorAll(selector);
        for (const el of Array.from(elements)) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerCenterY && rect.bottom >= headerCenterY) {
            overDark = true;
            break;
          }
        }
        if (overDark) break;
      }
      setIsDarkBg(overDark);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  // Toggle body class for menu open state (scroll lock + CSS targeting)
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  // Dynamic classes based on background and scroll state
  const textColor = isDarkBg ? "text-[#F5F0E8]" : "text-[#2D4A3E]";
  const hoverColor = isDarkBg ? "hover:text-[#C9A84C]" : "hover:text-primary";
  const iconColor = isDarkBg ? "text-[#F5F0E8]" : "text-foreground/80";
  const iconHover = isDarkBg ? "hover:text-[#C9A84C]" : "hover:text-primary";
  const navBgClass = scrolled
    ? isDarkBg
      ? "bg-[rgba(20,35,25,0.85)] backdrop-blur-[8px] shadow-sm"
      : "bg-[rgba(255,255,255,0.9)] backdrop-blur-[8px] shadow-sm"
    : "bg-transparent";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${navBgClass}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className={`font-display text-2xl lg:text-3xl font-semibold tracking-wide transition-colors duration-200 pr-4 ${textColor}`}>
            VELARA
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${isDarkBg ? "text-[#F5F0E8]/80 hover:text-[#C9A84C]" : "text-foreground/80 hover:text-primary"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleDrawer}
              className={`relative transition-colors duration-200 ${iconColor} ${iconHover}`}
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              <span
                className={`cart-badge ${badgeBounce ? "cart-badge--bounce" : ""}`}
              >
                {count}
              </span>
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Check If You Qualify
            </button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleDrawer}
              className={`relative flex items-center justify-center w-10 h-10 transition-colors duration-200 ${isDarkBg ? "text-[#F5F0E8]" : "text-foreground/80"}`}
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              <span
                className={`cart-badge ${badgeBounce ? "cart-badge--bounce" : ""}`}
                style={{ top: '2px', right: '-2px' }}
              >
                {count}
              </span>
            </button>
            <button 
              onClick={() => setMobileOpen(true)} 
              className="flex items-center justify-center w-10 h-10 text-[#C9A84C] transition-colors duration-200" 
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Overlay Mobile Menu (Slides in from right) 
          Placed at highest depth to avoid stacking issues
      */}
      <div
        className={`lg:hidden fixed inset-0 z-[9999] flex flex-col pt-24 px-6 pb-12 transition-all duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"
        }`}
        style={{ 
          backgroundColor: '#2D4A3E',
          pointerEvents: mobileOpen ? 'auto' : 'none'
        }}
      >
        {/* Close Button Top Right */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 p-2 text-[#F5F0E8] transition-colors hover:text-[#C9A84C]"
          aria-label="Close menu"
        >
          <X size={32} />
        </button>

        {/* Menu Links */}
        <div className="flex flex-col items-center gap-8 mt-12 bg-transparent">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-display text-3xl font-medium text-[#F5F0E8] hover:text-[#C9A84C] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA in menu */}
        <button
          onClick={() => { setMobileOpen(false); setModalOpen(true); }}
          className="mt-12 w-full flex items-center justify-center min-h-[52px] py-4 rounded-full bg-[#C9A84C] text-[#2D4A3E] text-lg font-semibold hover:bg-opacity-90 transition-opacity"
        >
          Change your life
        </button>
      </div>

      <CartDrawer />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Sticky Mobile CTA — only visible on small screens and when menu is closed */}
      <div 
        className="lg:hidden fixed bottom-6 left-0 right-0 px-6 z-[70] pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 mobile-sticky-cta-wrapper"
        style={{ display: mobileOpen ? 'none' : 'block' }}
      >
        <button
          onClick={() => setModalOpen(true)}
          className="w-full flex items-center justify-center min-h-[52px] rounded-full bg-[#C9A84C] text-[#2D4A3E] text-base font-semibold shadow-xl pointer-events-auto active:scale-[0.98] transition-all"
        >
          Change your life →
        </button>
      </div>
    </>
  );
};

export default Navbar;
