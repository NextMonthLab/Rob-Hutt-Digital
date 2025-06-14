import { motion } from "framer-motion";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";

const About = () => {
  return (
    <div className="min-h-screen py-20">
      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">About Our Business</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn more about our story, expertise, and what drives us to deliver exceptional results.
            </p>
          </motion.div>
          <AboutSection />
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Expertise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bring a comprehensive skill set to every project we undertake.
            </p>
          </motion.div>
          <SkillsSection />
        </div>
      </section>
    </div>
  );
};

export default About;