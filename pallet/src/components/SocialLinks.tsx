type SocialLinksProps = {
  color?: "white" | "gray" | "blue";
  size?: "sm" | "md" | "lg";
};

const SocialLinks = ({ color = "gray", size = "md" }: SocialLinksProps) => {
  // Define color classes based on the color prop
  const colorClasses = {
    white: "text-white hover:text-gray-200",
    gray: "text-gray-600 hover:text-[#1e3a8a]",
    blue: "text-[#1e3a8a] hover:text-[#1e3a8a]/80"
  };
  
  // Define size classes based on the size prop
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl"
  };
  
  return (
    <div className="flex items-center gap-3">
      <a 
        href="https://linkedin.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`${colorClasses[color]} transition-colors`}
        aria-label="LinkedIn Profile"
      >
        <i className={`bx bxl-linkedin ${sizeClasses[size]}`}></i>
      </a>
      <a 
        href="https://youtube.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`${colorClasses[color]} transition-colors`}
        aria-label="YouTube Channel"
      >
        <i className={`bx bxl-youtube ${sizeClasses[size]}`}></i>
      </a>
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`${colorClasses[color]} transition-colors`}
        aria-label="Instagram Profile"
      >
        <i className={`bx bxl-instagram ${sizeClasses[size]}`}></i>
      </a>
    </div>
  );
};

export default SocialLinks;
