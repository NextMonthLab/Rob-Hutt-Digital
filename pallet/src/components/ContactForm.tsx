import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import SocialLinks from "./SocialLinks";

// Define the form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      setIsSuccess(true);
      form.reset();
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl mb-4">Get in Touch</h2>
            <p className="text-gray-600">
              Ready to elevate your digital presence? Let's start a conversation.
            </p>
          </div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Contact Form */}
            <form 
              className="space-y-6" 
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  {...form.register("name")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                />
                {form.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  {...form.register("email")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                />
                {form.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  {...form.register("message")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                />
                {form.formState.errors.message && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <div>
                <motion.button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#1e3a8a] text-white font-['Montserrat'] font-semibold py-3 px-6 rounded-md shadow-md hover:bg-[#1e3a8a]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center mb-4">Prefer to schedule a call directly?</p>
              <a 
                href="https://calendly.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-white text-[#1e3a8a] border border-[#1e3a8a] font-['Montserrat'] font-semibold py-3 px-6 rounded-md hover:bg-gray-50 transition-colors"
              >
                Book a 15-minute intro call
              </a>
            </div>
            
            <div className="mt-8 flex justify-center space-x-6">
              <SocialLinks color="gray" size="lg" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
