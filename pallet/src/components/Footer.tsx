// Template registered for NextMonth Lab
// Type: Business Website

import React from "react";
import { Link } from "wouter";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <h3 className="text-xl font-bold mb-4">Your Business Name</h3>
            <p className="text-gray-300 mb-4">
              Professional services delivered with excellence. We help businesses 
              achieve their goals through strategic planning and innovative solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="bx bxl-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="bx bxl-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="bx bxl-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="bx bxl-instagram text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <i className="bx bx-envelope mr-2"></i>
                <span>hello@yourbusiness.com</span>
              </div>
              <div className="flex items-center">
                <i className="bx bx-phone mr-2"></i>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <i className="bx bx-map mr-2"></i>
                <span>123 Business St, Your City, ST 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Your Business Name. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <span className="text-gray-400 text-sm">
                Powered by NextMonth Lab
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;