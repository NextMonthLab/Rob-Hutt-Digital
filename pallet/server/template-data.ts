import { Service, HighlightCard, About } from "../shared/schema";

// Generic template data for services
export const templateServices: Service[] = [
  {
    id: 1,
    title: "Digital Marketing",
    type: "marketing",
    tag: "popular",
    icon: "bx-broadcast",
    description: "Comprehensive digital marketing strategies to grow your online presence and reach your target audience effectively.",
    detailUrl: "#services",
    automation: "enabled",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Content Creation",
    type: "creative",
    tag: "featured",
    icon: "bx-video",
    description: "Professional content creation services including video production, copywriting, and visual design.",
    detailUrl: "#services",
    automation: "partial",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Business Consulting",
    type: "consulting",
    tag: "premium",
    icon: "bx-line-chart",
    description: "Strategic business consulting to help you make informed decisions and optimize your operations.",
    detailUrl: "#services",
    automation: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Process Automation",
    type: "technical",
    tag: "efficiency",
    icon: "bx-cog",
    description: "Streamline your business processes with custom automation solutions that save time and reduce errors.",
    detailUrl: "#services",
    automation: "enabled",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Generic template data for highlight cards
export const templateHighlightCards: HighlightCard[] = [
  {
    id: 1,
    title: "Strategic Approach",
    type: "value",
    tag: "strategy",
    icon: "bx-rocket",
    description: "We develop comprehensive strategies tailored to your specific business goals and market position.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Proven Results",
    type: "achievement",
    tag: "success",
    icon: "bx-trophy",
    description: "Our track record speaks for itself with measurable results and satisfied clients across various industries.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Expert Team",
    type: "team",
    tag: "expertise",
    icon: "bx-group",
    description: "Work with experienced professionals who understand your industry and bring years of expertise to your project.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Timely Delivery",
    type: "service",
    tag: "reliability",
    icon: "bx-time-five",
    description: "We respect your timeline and deliver quality work on schedule, keeping your projects moving forward.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Generic template data for about section
export const templateAbout: About = {
  id: 1,
  title: "About Our Business",
  type: "company",
  tag: null,
  content: {
    bio: [
      "Welcome to our business! We are dedicated to providing exceptional services that help our clients achieve their goals.",
      "With years of experience in the industry, we have developed a deep understanding of what it takes to succeed in today's competitive marketplace.",
      "Our team combines creativity, technical expertise, and strategic thinking to deliver solutions that make a real difference."
    ],
    credentials: [
      "Industry Certified Professional",
      "Years of Experience in Field",
      "Award-Winning Service Provider",
      "Trusted by Leading Companies"
    ],
    quote: "Success is not just about what you accomplish in your life, it's about what you inspire others to do.",
    skills: {
      creativeSkills: [
        { name: "Creative Strategy", level: 95 },
        { name: "Brand Development", level: 90 },
        { name: "Content Creation", level: 88 },
        { name: "Visual Design", level: 85 }
      ],
      technicalSkills: [
        { name: "Digital Marketing", level: 92 },
        { name: "Analytics & Data", level: 88 },
        { name: "Process Automation", level: 90 },
        { name: "Project Management", level: 95 }
      ]
    }
  },
  profileImage: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};