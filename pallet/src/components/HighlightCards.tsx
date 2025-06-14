// Template registered for NextMonth Lab
// Type: Business Website

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const HighlightCards = () => {
  const { data: highlights, isLoading } = useQuery({
    queryKey: ["/api/highlightCards"],
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-5 bg-gray-200 rounded mb-2"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const fallbackHighlights = [
    {
      id: 1,
      title: "Expert Team",
      description: "Experienced professionals dedicated to your success.",
      icon: "bx-group"
    },
    {
      id: 2,
      title: "Proven Results",
      description: "Track record of delivering exceptional outcomes.",
      icon: "bx-trophy"
    },
    {
      id: 3,
      title: "24/7 Support",
      description: "Round-the-clock assistance when you need it most.",
      icon: "bx-support"
    },
    {
      id: 4,
      title: "Innovative Solutions",
      description: "Cutting-edge approaches to solve complex challenges.",
      icon: "bx-bulb"
    }
  ];

  const displayHighlights = (highlights as any[]) || fallbackHighlights;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayHighlights.map((highlight: any, index: number) => (
        <motion.div
          key={highlight.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className={`bx ${highlight.icon} text-2xl text-blue-600`}></i>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{highlight.description}</p>
          {highlight.tag && (
            <span className="inline-block mt-3 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {highlight.tag}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default HighlightCards;