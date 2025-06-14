import { Service, HighlightCard, About } from "../shared/schema";

// Generic template data for services
export const templateServices: Service[] = [
  {
    id: 1,
    title: "Service Name 1",
    type: "service",
    tag: "popular",
    icon: "bx-briefcase",
    description: "Brief description of what this service includes and how it benefits your clients. Customize this text to match your business offerings.",
    detailUrl: "#services",
    automation: "enabled",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Service Name 2",
    type: "service",
    tag: "featured",
    icon: "bx-trending-up",
    description: "Brief description of what this service includes and how it benefits your clients. Customize this text to match your business offerings.",
    detailUrl: "#services",
    automation: "partial",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Service Name 3",
    type: "service",
    tag: "premium",
    icon: "bx-cog",
    description: "Brief description of what this service includes and how it benefits your clients. Customize this text to match your business offerings.",
    detailUrl: "#services",
    automation: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Service Name 4",
    type: "service",
    tag: "efficiency",
    icon: "bx-support",
    description: "Brief description of what this service includes and how it benefits your clients. Customize this text to match your business offerings.",
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
      "Tell your brand story here. Replace this with information about your business, mission, and what makes you unique in your industry.",
      "Share your journey, experience, and the values that drive your work. This is where potential clients learn who you are and why they should choose you.",
      "Highlight your expertise, achievements, and the passion that fuels your business success."
    ],
    credentials: [
      "Add Your Certification Here",
      "Years of Experience in Your Field",
      "Your Awards or Recognition",
      "Notable Client Achievements"
    ],
    quote: "Add an inspiring quote that represents your business philosophy or mission statement.",
    skills: {
      creativeSkills: [
        { name: "Your Skill 1", level: 95 },
        { name: "Your Skill 2", level: 90 },
        { name: "Your Skill 3", level: 88 },
        { name: "Your Skill 4", level: 85 }
      ],
      technicalSkills: [
        { name: "Your Technical Skill 1", level: 92 },
        { name: "Your Technical Skill 2", level: 88 },
        { name: "Your Technical Skill 3", level: 90 },
        { name: "Your Technical Skill 4", level: 95 }
      ]
    }
  },
  profileImage: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};