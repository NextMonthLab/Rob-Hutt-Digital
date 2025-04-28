import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from "framer-motion";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// Custom hook for smooth scrolling to anchors
const useHashScroll = () => {
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        
        if (element) {
          const headerOffset = 80; // Account for fixed header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Run on initial load and hash change
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
};

function AppRoutes() {
  const [currentPath] = useLocation();
  useHashScroll();
  
  // Track path changes for route transitions
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };
    
    // Run on mount and route changes
    handleRouteChange();
    
    // No need to return a cleanup function here
  }, [currentPath]);
  
  return (
    <>
      <NavBar />
      <AnimatePresence mode="wait">
        <Switch key={currentPath}>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin/sot" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
      <Footer />
    </>
  );
}

function App() {
  useEffect(() => {
    // Import SOT client but don't block rendering
    import('./lib/sotClient').then(({ sotClient }) => {
      // SOT client will auto-initialize on import
      console.log('[NextMonth Integration] SOT client initialized');
    }).catch(err => {
      console.error('[NextMonth Integration] Failed to load SOT client:', err);
    });
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
