import { useParams } from "wouter";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@/lib/types";

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  
  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const service = services?.find(s => s.id === parseInt(serviceId || "1"));

  // Fallback service data if not found
  const fallbackService = {
    id: 1,
    title: "Professional Service",
    description: "Comprehensive service description with detailed information about what we offer.",
    icon: "bx-briefcase",
    tag: "featured"
  };

  const currentService = service || fallbackService;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>{currentService.title} | Your Business</title>
        <meta 
          name="description" 
          content={`Learn more about our ${currentService.title.toLowerCase()} service offerings and how we can help your business.`}
        />
      </Helmet>
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-16">
          {/* Service Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl text-[#1e3a8a] mb-6">
              <i className={`bx ${currentService.icon}`}></i>
            </div>
            <h1 className="font-['Montserrat'] font-bold text-4xl md:text-5xl mb-4">
              {currentService.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentService.description}
            </p>
          </motion.div>

          {/* Service Details */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-['Montserrat'] font-bold text-2xl mb-6">What's Included</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="bx bx-check text-[#1e3a8a] text-xl mr-3 mt-1"></i>
                  <span>Comprehensive consultation and planning phase</span>
                </li>
                <li className="flex items-start">
                  <i className="bx bx-check text-[#1e3a8a] text-xl mr-3 mt-1"></i>
                  <span>Custom solution design tailored to your business needs</span>
                </li>
                <li className="flex items-start">
                  <i className="bx bx-check text-[#1e3a8a] text-xl mr-3 mt-1"></i>
                  <span>Professional implementation and delivery</span>
                </li>
                <li className="flex items-start">
                  <i className="bx bx-check text-[#1e3a8a] text-xl mr-3 mt-1"></i>
                  <span>Ongoing support and optimization</span>
                </li>
                <li className="flex items-start">
                  <i className="bx bx-check text-[#1e3a8a] text-xl mr-3 mt-1"></i>
                  <span>Training and documentation for your team</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="font-['Montserrat'] font-bold text-2xl mb-6">Process Overview</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#1e3a8a] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Discovery & Planning</h3>
                    <p className="text-gray-600">We start with understanding your specific needs and objectives.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#1e3a8a] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Strategy Development</h3>
                    <p className="text-gray-600">Custom strategy and solution design based on your requirements.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#1e3a8a] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Implementation</h3>
                    <p className="text-gray-600">Professional execution with regular updates and communication.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#1e3a8a] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Delivery & Support</h3>
                    <p className="text-gray-600">Final delivery with ongoing support and optimization.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Benefits Section */}
          <motion.div
            className="bg-gray-50 rounded-lg p-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="font-['Montserrat'] font-bold text-2xl mb-6 text-center">Why Choose This Service</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <i className="bx bx-award text-4xl text-[#1e3a8a] mb-4"></i>
                <h3 className="font-semibold mb-2">Expert Quality</h3>
                <p className="text-gray-600">Professional-grade solutions delivered by experienced specialists.</p>
              </div>
              <div className="text-center">
                <i className="bx bx-time text-4xl text-[#1e3a8a] mb-4"></i>
                <h3 className="font-semibold mb-2">Timely Delivery</h3>
                <p className="text-gray-600">Efficient project management ensuring on-time completion.</p>
              </div>
              <div className="text-center">
                <i className="bx bx-support text-4xl text-[#1e3a8a] mb-4"></i>
                <h3 className="font-semibold mb-2">Ongoing Support</h3>
                <p className="text-gray-600">Continuous support and optimization after project completion.</p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="font-['Montserrat'] font-bold text-2xl mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8">Contact us today to discuss how this service can benefit your business.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-[#1e3a8a] text-white font-['Montserrat'] font-semibold py-3 px-8 rounded-md hover:bg-[#1e3a8a]/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.location.href = "/#contact";
                }}
              >
                Contact Us Today
              </motion.button>
              <motion.button
                className="bg-white text-[#1e3a8a] border border-[#1e3a8a] font-['Montserrat'] font-semibold py-3 px-8 rounded-md hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.location.href = "/services";
                }}
              >
                View All Services
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default ServiceDetail;