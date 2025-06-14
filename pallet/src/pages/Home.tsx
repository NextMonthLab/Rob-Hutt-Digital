import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import HighlightCards from "@/components/HighlightCards";
import ServiceCards from "@/components/ServiceCards";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="min-h-screen">
        <Hero 
          title="Your Business Name"
          tagline="This is your hero section tagline describing what you do"
          profileImage="https://via.placeholder.com/400x400?text=Profile+Image"
        />
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This section showcases the services your business offers. Each service card 
              can include an icon, title, and description.
            </p>
          </motion.div>
          <ServiceCards />
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Highlight your key differentiators and what makes your business unique.
            </p>
          </motion.div>
          <HighlightCards />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">About Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell your business story and share your background, experience, and expertise.
            </p>
          </motion.div>
          <AboutSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your project? Contact us today to discuss your needs.
            </p>
          </motion.div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default Home;