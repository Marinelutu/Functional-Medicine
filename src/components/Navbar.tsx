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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const { count, badgeBounce, toggleDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav shadow-sm" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="font-display text-2xl lg:text-3xl font-semibold tracking-wide text-primary">
            VELARA
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm font-medium tracking-wide text-foreground/80 hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleDrawer}
              className="relative text-foreground/80 hover:text-primary transition-colors"
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
              Book a Free Consultation
            </button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleDrawer}
              className="relative text-foreground/80"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              <span
                className={`cart-badge ${badgeBounce ? "cart-badge--bounce" : ""}`}
              >
                {count}
              </span>
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground" aria-label="Toggle menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 top-16 z-49 bg-[#2D4A3E] flex flex-col items-center justify-center gap-8 px-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="font-display text-[28px] font-medium text-white hover:text-[#C9A84C] transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => { setMobileOpen(false); setModalOpen(true); }}
              className="mt-4 inline-flex items-center px-8 py-3.5 rounded-full bg-accent text-accent-foreground text-base font-semibold hover:opacity-90 transition-opacity"
            >
              Book a Free Consultation
            </button>
          </div>
        )}
      </nav>

      <CartDrawer />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;
