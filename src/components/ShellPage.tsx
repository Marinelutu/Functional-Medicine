import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ShellPageProps {
  title: string;
}

const ShellPage = ({ title }: ShellPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="min-h-[70vh] flex items-center justify-center pt-20">
        <div className="text-center space-y-6">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent">Coming Soon</p>
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground">{title}</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're crafting something beautiful. This page will be available soon.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShellPage;
