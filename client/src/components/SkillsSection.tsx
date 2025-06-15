import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Skill, About } from "@/lib/types";

const SkillsSection = () => {
  const { data: about, isLoading, error } = useQuery<About>({
    queryKey: ["/api/about"],
  });

  if (isLoading) {
    return <SkillsSectionLoading />;
  }

  // Fallback data if API fails
  const fallbackSkills = {
    creativeSkills: [
      { name: "Brand Strategy", level: 95 },
      { name: "Visual Direction", level: 90 },
      { name: "Storytelling", level: 95 }
    ],
    technicalSkills: [
      { name: "Automation Design", level: 90 },
      { name: "Studio Engineering", level: 85 },
      { name: "Marketing Systems", level: 95 }
    ]
  };

  const skills = about?.skills || fallbackSkills;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="font-['Montserrat'] font-semibold text-xl mb-6 text-center">Skills & Expertise</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillCategory 
            title="Creative" 
            skills={skills.creativeSkills} 
          />
          
          <SkillCategory 
            title="Technical" 
            skills={skills.technicalSkills} 
          />
        </div>
      </div>
    </section>
  );
};

type SkillCategoryProps = {
  title: string;
  skills: Skill[];
};

const SkillCategory = ({ title, skills }: SkillCategoryProps) => {
  return (
    <div>
      <h4 className="font-medium mb-3">{title}</h4>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar 
            key={index}
            name={skill.name}
            level={skill.level}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

type SkillBarProps = {
  name: string;
  level: number;
  index: number;
};

const SkillBar = ({ name, level, index }: SkillBarProps) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div 
          className="bg-[#1e3a8a] h-2 rounded-full"
          style={{ width: `${level}%` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 * index }}
        />
      </div>
    </div>
  );
};

const SkillsSectionLoading = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6 mx-auto"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i}>
              <div className="h-5 bg-gray-200 rounded w-24 mb-3"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <div key={j}>
                    <div className="flex justify-between mb-1">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-10"></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
