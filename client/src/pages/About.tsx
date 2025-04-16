import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ContactForm from "@/components/ContactForm";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>About Rob Hutt | Digital Strategy & Creative Direction</title>
        <meta 
          name="description" 
          content="Learn about Rob Hutt's background, experience, and expertise in digital strategy, brand development, and creative direction."
        />
      </Helmet>
      
      <main className="pt-24">
        <AboutSection />
        <SkillsSection />
        <ContactForm />
      </main>
    </motion.div>
  );
};

export default About;
