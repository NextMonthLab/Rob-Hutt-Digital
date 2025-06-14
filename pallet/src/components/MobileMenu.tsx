type MobileMenuProps = {
  isOpen: boolean;
  onNavItemClick: (path: string) => void;
};

const MobileMenu = ({ isOpen, onNavItemClick }: MobileMenuProps) => {
  return (
    <div className={`md:hidden bg-white border-t ${isOpen ? "block" : "hidden"}`}>
      <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
        <MobileNavLink 
          label="Home" 
          path="#home" 
          onClick={() => onNavItemClick("#home")} 
        />
        <MobileNavLink 
          label="Services" 
          path="#services" 
          onClick={() => onNavItemClick("#services")} 
        />
        <MobileNavLink 
          label="About" 
          path="#about" 
          onClick={() => onNavItemClick("#about")} 
        />
        <MobileNavLink 
          label="Contact" 
          path="#contact" 
          onClick={() => onNavItemClick("#contact")} 
        />
        <MobileNavLink 
          label="Admin" 
          path="/admin/sot" 
          onClick={() => onNavItemClick("/admin/sot")} 
        />
      </div>
    </div>
  );
};

type MobileNavLinkProps = {
  label: string;
  path: string;
  onClick: () => void;
};

const MobileNavLink = ({ label, path, onClick }: MobileNavLinkProps) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="font-medium py-2 hover:text-[#1e3a8a] transition-colors cursor-pointer"
    >
      {label}
    </div>
  );
};

export default MobileMenu;
