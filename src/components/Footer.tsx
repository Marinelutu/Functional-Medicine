import { Link } from "react-router-dom";

const footerColumns = [
  {
    title: "Programs",
    links: ["Weight Loss", "Hormones", "Longevity", "Gut Health", "Mental Clarity"],
  },
  {
    title: "Company",
    links: ["About Us", "Our Team", "Careers", "Press"],
  },
  {
    title: "Resources",
    links: ["Blog", "Podcast", "Research", "FAQ"],
  },
  {
    title: "Support",
    links: ["Contact", "Help Center", "Privacy Policy", "Terms of Service"],
  },
  {
    title: "Connect",
    links: ["Instagram", "YouTube", "TikTok", "LinkedIn"],
  },
];

const Footer = () => {
  return (
    <footer className="gradient-sage py-16 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-6 gap-10 mb-12">
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
                  <li key={link}>
                    <span className="text-sm text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-primary-foreground/10 pt-10 mb-10">
          <div className="max-w-md">
            <h4 className="font-display text-lg text-primary-foreground mb-3">
              Get weekly health insights
            </h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-full bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 text-sm border border-primary-foreground/10 focus:outline-none focus:border-accent"
              />
              <button className="px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                Subscribe
              </button>
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
