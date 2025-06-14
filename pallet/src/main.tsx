import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add global styles for font families
const styles = document.createElement("style");
styles.textContent = `
  :root {
    --font-montserrat: 'Montserrat', sans-serif;
    --font-inter: 'Inter', sans-serif;
    --color-brand-blue: #1e3a8a;
    --color-brand-charcoal: #1e293b;
    --color-brand-crimson: #9f1239;
    --color-brand-light: #f8fafc;
  }
  
  body {
    font-family: 'Inter', sans-serif;
  }
  
  .font-heading {
    font-family: 'Montserrat', sans-serif;
  }
`;
document.head.appendChild(styles);

createRoot(document.getElementById("root")!).render(<App />);
