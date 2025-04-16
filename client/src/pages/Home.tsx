import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import HighlightCards from "@/components/HighlightCards";
import ServiceCards from "@/components/ServiceCards";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ContactForm from "@/components/ContactForm";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Rob Hutt | Digital Strategy & Creative Execution</title>
        <meta 
          name="description" 
          content="Rob Hutt - Brand builder. Automation specialist. Filmmaker. Professional digital strategy and creative execution services."
        />
      </Helmet>
      
      <main>
        <Hero />
        <HighlightCards />
        <ServiceCards />
        <AboutSection />
        <SkillsSection />
        <ContactForm />
      </main>
    </motion.div>
  );
};

export default Home;
