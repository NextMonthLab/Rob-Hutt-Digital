// Type definitions for the application

export type HighlightCard = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type Service = {
  id: number;
  icon: string;
  title: string;
  description: string;
  detailUrl?: string;
};

export type Skill = {
  name: string;
  level: number;
};

export type About = {
  bio: string[];
  credentials: string[];
  quote: string;
  profileImage: string;
  skills?: {
    creativeSkills: Skill[];
    technicalSkills: Skill[];
  };
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};
