import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Service } from "@/lib/types";

const ServiceCards = () => {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return <ServiceCardsLoading />;
  }

  if (error || !services) {
    // Fallback services if API fails
    const fallbackServices = [
      {
        id: 1,
        icon: "bx-broadcast",
        title: "Studio Build & Delivery",
        description: "I design and deliver YouTube and podcast studios—customised to your brand and operational within two weeks."
      },
      {
        id: 2,
        icon: "bx-palette",
        title: "Brand Identity & Development",
        description: "From brand refresh to full rebrand, I handle design, messaging, and execution."
      },
      {
        id: 3,
        icon: "bx-cog",
        title: "Marketing Automation",
        description: "I streamline your digital marketing by removing bottlenecks, replacing them with smooth automation."
      },
      {
        id: 4,
        icon: "bx-movie-play",
        title: "Video Strategy & Direction",
        description: "As an award-winning filmmaker, I help bring clarity and story to your video brand."
      },
      {
        id: 5,
        icon: "bx-news",
        title: "Press & PR Support",
        description: "From press releases to high-impact positioning—I help you get seen, shared, and remembered."
      }
    ];
    
    return <ServiceGrid services={fallbackServices} />;
  }

  return <ServiceGrid services={services} />;
};

const ServiceGrid = ({ services }: { services: Service[] }) => {
  return (
    <section id="services" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl mb-4">Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Specialized expertise to elevate your brand and streamline your digital presence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 * index }}
    >
      <div className="p-6">
        <div className="text-4xl text-[#1e3a8a] mb-4">
          <i className={`bx ${service.icon}`}></i>
        </div>
        <h3 className="font-['Montserrat'] font-bold text-xl mb-3">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <Link 
          href={`/service/${service.id}`}
          className="text-[#1e3a8a] font-medium hover:underline flex items-center gap-1"
        >
          <motion.span
            className="flex items-center gap-1"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Learn more
            <i className='bx bx-right-arrow-alt'></i>
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
};

const ServiceCardsLoading = () => {
  return (
    <section id="services" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="h-10 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
          <div className="h-5 bg-gray-200 rounded w-full max-w-2xl mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="p-6">
                <div className="h-10 w-10 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
