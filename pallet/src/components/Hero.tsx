import { Link } from "wouter";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";

type HeroProps = {
  title: string;
  tagline: string;
  profileImage?: string;
};

const Hero = ({ 
  title = "Your Business Name",
  tagline = "Your professional tagline describing what you do and who you serve",
  profileImage = "https://via.placeholder.com/400x400?text=Profile+Image"
}: HeroProps) => {
  
  return (
    <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 md:pr-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-['Montserrat'] font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
              {title}
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-gray-600">
              {tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div 
                className="inline-block bg-[#1e3a8a] text-white font-['Montserrat'] font-semibold py-3 px-6 rounded-md shadow-md hover:bg-[#1e3a8a]/90 transition-colors text-center cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book a 15-minute intro call
              </motion.div>
              
              <motion.div 
                className="inline-block bg-white text-[#1e3a8a] border border-[#1e3a8a] font-['Montserrat'] font-semibold py-3 px-6 rounded-md hover:bg-gray-50 transition-colors text-center cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View my services
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src={profileImage}
                alt="Rob Hutt - Professional portrait" 
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <SocialLinks color="white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
