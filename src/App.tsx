import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ShellPage from "./components/ShellPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ShellPage title="Services" />} />
          <Route path="/shop" element={<ShellPage title="Shop" />} />
          <Route path="/about" element={<ShellPage title="About" />} />
          <Route path="/blog" element={<ShellPage title="Blog" />} />
          <Route path="/book" element={<ShellPage title="Book a Consultation" />} />
          <Route path="/blog/:slug" element={<ShellPage title="Blog Post" />} />
          <Route path="/shop/:slug" element={<ShellPage title="Product" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
