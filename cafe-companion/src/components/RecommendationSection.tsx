import { CoffeeOption } from '../data/coffeeData';
import { motion } from 'framer-motion';
import CoffeeCard from './CoffeeCard';

interface RecommendationSectionProps {
  title: string;
  recommendations: CoffeeOption[];
  onCoffeeClick: (coffee: CoffeeOption) => void;
}

const RecommendationSection = ({ 
  title, 
  recommendations, 
  onCoffeeClick 
}: RecommendationSectionProps) => {
  if (recommendations.length === 0) {
    return null;
  }
  
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="recommendation-section mt-12 bg-secondary rounded-2xl p-8 border-b-4 border-accent shadow-lg"
    >
      <div className="flex items-center justify-between mb-8">
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold text-primary"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-2"
        >
          <span className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
            AI Powered
          </span>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-accent"
          >
            ✨
          </motion.span>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
      >
        {recommendations.map((coffee, index) => (
          <motion.div
            key={coffee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <CoffeeCard 
              coffee={coffee} 
              onClick={onCoffeeClick} 
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default RecommendationSection;
