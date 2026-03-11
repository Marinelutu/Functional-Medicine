import { useState } from "react";
import { Link } from "react-router-dom";

interface FooterLink {
  label: string;
  to?: string;
  href?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Programs",
    links: [
      { label: "Weight Loss", to: "/services?filter=Weight Loss" },
      { label: "Hormones", to: "/services" },
      { label: "Longevity", to: "/services" },
      { label: "Gut Health", to: "/services" },
      { label: "Mental Clarity", to: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Our Team", to: "/about" },
      { label: "Press", to: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "FAQ", to: "/#faq" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", to: "/book" },
      { label: "Help Center", to: "/book" },
      { label: "Privacy Policy", to: "/" },
      { label: "Terms of Service", to: "/" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "YouTube", href: "https://youtube.com" },
      { label: "TikTok", href: "https://tiktok.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
    ],
  },
];

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterError, setNewsletterError] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail.trim() || !emailRegex.test(newsletterEmail.trim())) {
      setNewsletterError("Please enter a valid email address.");
      return;
    }
    setNewsletterError("");
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="gradient-sage py-16 lg:py-20" data-theme="dark">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-6 gap-10 mb-12 text-left">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-display text-2xl font-semibold text-primary-foreground">
              VELARA
            </Link>
            <p className="mt-3 text-sm text-primary-foreground/60 leading-relaxed">
              Functional medicine, reimagined for the modern human.
            </p>
          </div>

          {/* Columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to || "/"}
                        className="text-sm text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-primary-foreground/10 pt-10 mb-10">
          <div className="max-w-md">
            <h4 className="font-display text-lg text-primary-foreground mb-3 font-semibold">
              Get weekly health insights
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterError(""); }}
                  disabled={newsletterSubscribed}
                  className={`flex-1 px-4 py-2.5 rounded-full bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 text-sm border focus:outline-none transition-colors ${newsletterError ? 'border-red-400' : 'border-primary-foreground/10 focus:border-accent'
                    }`}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={newsletterSubscribed}
                  className="px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-100 disabled:cursor-default"
                >
                  {newsletterSubscribed ? "✓" : "Subscribe"}
                </button>
              </div>
              {newsletterError && (
                <p className="text-red-400 text-xs mt-1 ml-4 font-medium italic">
                  {newsletterError}
                </p>
              )}
              {newsletterSubscribed && (
                <p className="text-accent text-xs mt-1 ml-4 font-medium uppercase tracking-wider">
                  You're in! Check your inbox.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} VELARA Health, Inc. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/30 max-w-xl">
            Disclaimer: VELARA provides functional medicine services and is not a replacement for emergency or conventional medical care.
            Our protocols are designed to complement, not replace, your existing healthcare. Always consult your primary care provider
            before making changes to your treatment plan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
