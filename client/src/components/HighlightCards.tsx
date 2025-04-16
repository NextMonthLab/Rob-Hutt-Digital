import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { HighlightCard } from "@/lib/types";

const HighlightCards = () => {
  const { data: cards, isLoading, error } = useQuery<HighlightCard[]>({
    queryKey: ["/api/highlightCards"],
  });

  if (isLoading) {
    return <HighlightCardsLoading />;
  }

  if (error || !cards) {
    // Fallback cards if API fails
    const fallbackCards = [
      {
        id: 1,
        icon: "bx-rocket",
        title: "Strategic Vision",
        description: "I transform complex ideas into clear, actionable digital strategies that deliver results."
      },
      {
        id: 2,
        icon: "bx-bulb",
        title: "Creative Direction",
        description: "Award-winning creative expertise to help your brand stand out in today's crowded marketplace."
      },
      {
        id: 3,
        icon: "bx-cog",
        title: "Technical Execution",
        description: "I bridge the gap between creative vision and technical implementation for seamless delivery."
      }
    ];
    
    return <HighlightCardsGrid cards={fallbackCards} />;
  }

  return <HighlightCardsGrid cards={cards} />;
};

const HighlightCardsGrid = ({ cards }: { cards: HighlightCard[] }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <HighlightCardItem 
              key={card.id} 
              card={card} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const HighlightCardItem = ({ card, index }: { card: HighlightCard; index: number }) => {
  return (
    <motion.div
      className="bg-[#f8fafc] p-6 rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="text-[#1e3a8a] mb-3">
        <i className={`bx ${card.icon} text-4xl`}></i>
      </div>
      <h3 className="font-['Montserrat'] font-bold text-xl mb-2">{card.title}</h3>
      <p className="text-gray-600">{card.description}</p>
    </motion.div>
  );
};

const HighlightCardsLoading = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#f8fafc] p-6 rounded-lg shadow-sm animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightCards;
