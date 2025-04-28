import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "./MobileMenu";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, setLocation] = useLocation();

  // Handle scroll event to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavItemClick = (path: string) => {
    if (path.startsWith("#")) {
      // For hash links, set the hash and close menu
      const currentPath = window.location.pathname;
      if (currentPath !== "/") {
        setLocation(`/${path}`);
      } else {
        window.location.hash = path;
      }
    } else {
      // For regular routes
      setLocation(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full bg-white/90 backdrop-blur-sm z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          onClick={() => handleNavItemClick("/")}
          className="font-['Montserrat'] font-bold text-xl md:text-2xl text-[#1e3a8a] cursor-pointer"
        >
          Rob Hutt
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-[#1e293b] focus:outline-none"
          aria-label="Toggle menu"
        >
          <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-3xl`}></i>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLink href="/#home" onClick={() => handleNavItemClick("#home")}>Home</NavLink>
          <NavLink href="/#services" onClick={() => handleNavItemClick("#services")}>Services</NavLink>
          <NavLink href="/#about" onClick={() => handleNavItemClick("#about")}>About</NavLink>
          <NavLink href="/#contact" onClick={() => handleNavItemClick("#contact")}>Contact</NavLink>
          <NavLink href="/admin/sot" onClick={() => handleNavItemClick("/admin/sot")}>
            <span className="flex items-center">
              <i className="bx bx-wrench mr-1"></i>
              Admin
            </span>
          </NavLink>
        </nav>
      </div>
      
      {/* Mobile Navigation Menu */}
      <MobileMenu isOpen={isMenuOpen} onNavItemClick={handleNavItemClick} />
    </header>
  );
};

// NavLink component with hover effect
const NavLink = ({ href, onClick, children }: { href: string; onClick?: () => void; children: React.ReactNode }) => {
  return (
    <a 
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      className="font-medium hover:text-[#1e3a8a] transition-colors"
    >
      {children}
    </a>
  );
};

export default NavBar;
