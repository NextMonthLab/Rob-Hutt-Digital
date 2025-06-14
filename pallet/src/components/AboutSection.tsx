// Template registered for NextMonth Lab
// Type: Business Website

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const AboutSection = () => {
  const { data: about, isLoading } = useQuery({
    queryKey: ["/api/about"],
  });

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
        <div>
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  const content = about?.content || {
    bio: [
      "We are a dedicated team of professionals committed to delivering exceptional results for our clients.",
      "With years of experience in our field, we understand what it takes to succeed in today's competitive marketplace.",
      "Our approach combines strategic thinking with creative execution to help businesses achieve their goals."
    ],
    credentials: [
      "Industry Certified Professional",
      "Years of Experience",
      "Award-Winning Service",
      "Trusted by Leading Companies"
    ],
    skills: {
      creativeSkills: [
        { name: "Strategic Planning", level: 95 },
        { name: "Creative Design", level: 90 },
        { name: "Brand Development", level: 85 }
      ],
      technicalSkills: [
        { name: "Digital Marketing", level: 92 },
        { name: "Analytics", level: 88 },
        { name: "Project Management", level: 95 }
      ]
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6">About Our Business</h2>
        
        <div className="space-y-4 mb-8">
          {content.bio.map((paragraph: string, index: number) => (
            <p key={index} className="text-gray-600 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Our Credentials</h3>
          <ul className="space-y-2">
            {content.credentials.map((credential: string, index: number) => (
              <li key={index} className="flex items-center text-gray-600">
                <i className="bx bx-check text-green-500 mr-2"></i>
                {credential}
              </li>
            ))}
          </ul>
        </div>

        {content.quote && (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
            "{content.quote}"
          </blockquote>
        )}
      </motion.div>

      {/* Image/Visual */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="bx bx-user text-4xl text-white"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional Team</h3>
            <p className="text-gray-600">Dedicated to your success</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;