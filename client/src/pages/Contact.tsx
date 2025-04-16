import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Contact | Rob Hutt</title>
        <meta 
          name="description" 
          content="Get in touch with Rob Hutt for digital strategy, brand development, marketing automation, and creative direction services."
        />
      </Helmet>
      
      <main className="pt-24">
        <ContactForm />
      </main>
    </motion.div>
  );
};

export default Contact;
