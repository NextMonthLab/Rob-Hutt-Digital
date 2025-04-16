import { Link } from "wouter";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1e293b] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="font-['Montserrat'] font-bold text-xl mb-2">Rob Hutt</div>
            <p className="text-gray-400">Digital Strategy & Creative Execution</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <FooterLink href="/#home">Home</FooterLink>
            <FooterLink href="/#services">Services</FooterLink>
            <FooterLink href="/#about">About</FooterLink>
            <FooterLink href="/#contact">Contact</FooterLink>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} Rob Hutt. All rights reserved. Powered by NextMonth.</p>
        </div>
      </div>
    </footer>
  );
};

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

const FooterLink = ({ href, children }: FooterLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If the link is to the home page, just set the hash
    if (window.location.pathname !== "/" && href.startsWith("/#")) {
      window.location.href = href;
    } else if (href.startsWith("#")) {
      window.location.hash = href;
    } else {
      window.location.href = href;
    }
    
    // Scroll to the top if it's a non-hash link
    if (!href.includes("#")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  return (
    <a 
      href={href} 
      onClick={handleClick}
      className="hover:text-[#1e3a8a] transition-colors"
    >
      {children}
    </a>
  );
};

export default Footer;
