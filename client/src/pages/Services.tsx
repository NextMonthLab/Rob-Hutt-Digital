import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import ServiceCards from "@/components/ServiceCards";
import ContactForm from "@/components/ContactForm";

const Services = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Services | Rob Hutt</title>
        <meta 
          name="description" 
          content="Professional services offered by Rob Hutt including studio build & delivery, brand identity, marketing automation, video strategy, and PR support."
        />
      </Helmet>
      
      <main className="pt-24">
        <ServiceCards />
        <ContactForm />
      </main>
    </motion.div>
  );
};

export default Services;
