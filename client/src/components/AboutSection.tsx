import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { About } from "@/lib/types";

const AboutSection = () => {
  const { data: about, isLoading, error } = useQuery<About>({
    queryKey: ["/api/about"],
  });

  if (isLoading) {
    return <AboutSectionLoading />;
  }

  // Fallback data if API fails
  const fallbackAbout: About = {
    bio: [
      "With over 15 years of experience in digital strategy and creative direction, I've helped brands across multiple industries strengthen their digital presence and streamline their operations.",
      "My background spans award-winning filmmaking, marketing automation, and brand development—giving me a unique perspective that bridges creative vision with technical execution.",
      "I believe in simplifying the complex, removing bottlenecks, and delivering solutions that not only look great but perform exceptionally well."
    ],
    credentials: [
      "Royal Television Society Award - Documentary Direction",
      "Certified Marketing Automation Specialist",
      "Featured in Creative Quarterly, \"Digital Innovators\""
    ],
    quote: "I'm passionate about helping people translate their vision into reality. Technology should simplify, not complicate.",
    profileImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  };

  const aboutData = about || fallbackAbout;

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            className="lg:w-5/12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src={aboutData.profileImage}
                alt="Rob Hutt - Professional portrait" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-7/12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl mb-6">About Rob</h2>
            
            <div className="prose max-w-none text-gray-700">
              {aboutData.bio.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mb-8">
              <h3 className="font-['Montserrat'] font-semibold text-xl mb-4">Awards & Credentials</h3>
              <ul className="space-y-2">
                {aboutData.credentials.map((credential, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <i className='bx bx-trophy text-[#1e3a8a] mt-1'></i>
                    <span>{credential}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <motion.div 
              className="p-6 bg-[#f8fafc] rounded-lg border-l-4 border-[#1e3a8a] italic"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {aboutData.quote}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutSectionLoading = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-5/12 animate-pulse">
            <div className="rounded-lg overflow-hidden shadow-xl bg-gray-200 aspect-[4/3]"></div>
          </div>
          
          <div className="lg:w-7/12">
            <div className="h-10 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
            
            <div className="space-y-4 mb-8 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
            
            <div className="mb-8 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-64 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
            
            <div className="p-6 bg-[#f8fafc] rounded-lg border-l-4 border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
