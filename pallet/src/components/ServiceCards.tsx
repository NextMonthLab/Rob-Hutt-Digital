// Template registered for NextMonth Lab
// Type: Business Website

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const ServiceCards = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const fallbackServices = [
    {
      id: 1,
      title: "Digital Strategy",
      description: "Comprehensive digital marketing strategies to grow your business online.",
      icon: "bx-broadcast"
    },
    {
      id: 2,
      title: "Creative Design",
      description: "Professional design services for your brand and marketing materials.",
      icon: "bx-palette"
    },
    {
      id: 3,
      title: "Web Development",
      description: "Modern, responsive websites built with the latest technologies.",
      icon: "bx-code-alt"
    }
  ];

  const displayServices = services || fallbackServices;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayServices.map((service: any, index: number) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className={`bx ${service.icon} text-2xl text-blue-600`}></i>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
          <p className="text-gray-600 leading-relaxed">{service.description}</p>
          {service.tag && (
            <span className="inline-block mt-3 px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
              {service.tag}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceCards;