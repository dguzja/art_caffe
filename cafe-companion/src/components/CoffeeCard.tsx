import { CoffeeOption } from '../data/coffeeData';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface CoffeeCardProps {
  coffee: CoffeeOption;
  onClick: (coffee: CoffeeOption) => void;
}

const CoffeeCard = ({ coffee, onClick }: CoffeeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
        y: -15,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      className="relative group perspective z-10"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(coffee)}
    >
      {/* 3D Card Container with perspective effect */}
      <motion.div
        animate={{ 
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="coffee-card bg-gradient-light w-full rounded-2xl overflow-hidden cursor-pointer shadow-xl relative z-10 transform-gpu"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Shine effect overlay */}
        <motion.div 
          className="absolute inset-0 z-10 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100"
          animate={{ 
            backgroundPosition: isHovered ? ["200% 200%", "0% 0%"] : "200% 200%"
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Glowing border */}
        <motion.div 
          className="absolute -inset-0.5 rounded-2xl z-0 opacity-0 group-hover:opacity-100 blur"
          animate={{
            background: isHovered 
              ? [
                  "linear-gradient(45deg, transparent 20%, rgba(255, 153, 51, 0.3) 40%, rgba(255, 153, 51, 0) 60%)",
                  "linear-gradient(45deg, transparent 0%, rgba(255, 153, 51, 0.3) 20%, rgba(255, 153, 51, 0) 40%)",
                  "linear-gradient(45deg, transparent 60%, rgba(255, 153, 51, 0.3) 80%, rgba(255, 153, 51, 0) 100%)"
                ] 
              : "none"
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Image Section with 3D effect */}
        <div className="coffee-card__image relative h-56 bg-gradient-to-b from-accent/5 to-primary/5 overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            animate={{ 
              z: isHovered ? 30 : 0, 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, 5, 0, -5, 0] : 0
            }}
            transition={{ 
              z: { duration: 0.3 },
              scale: { duration: 0.5 },
              rotate: { duration: 2, repeat: isHovered ? Infinity : 0, repeatType: "mirror" }
            }}
            style={{ 
              transformStyle: "preserve-3d",
              transform: `translateZ(${isHovered ? '20px' : '0px'})`
            }}
          >
            <motion.div 
              className="text-7xl drop-shadow-2xl"
              initial={{ filter: "drop-shadow(0 10px 8px rgba(156, 44, 0, 0.2))" }}
              animate={{ 
                filter: isHovered 
                  ? "drop-shadow(0 20px 30px rgba(156, 44, 0, 0.4))" 
                  : "drop-shadow(0 10px 8px rgba(156, 44, 0, 0.2))"
              }}
              transition={{ duration: 0.5 }}
            >
              ☕
              <motion.div
                className="absolute -top-1 -right-1 text-2xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  scale: isHovered ? 1 : 0,
                  rotate: isHovered ? [0, 20, -20, 0] : 0
                }}
                transition={{ 
                  scale: { duration: 0.3 },
                  rotate: { duration: 1, repeat: isHovered ? Infinity : 0, repeatType: "mirror" }
                }}
              >
                ✨
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Steam Animation */}
          <motion.div 
            className="absolute top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-70"
            animate={{
              opacity: isHovered ? [0, 0.3, 0] : 0,
              y: isHovered ? [0, -15, -30] : 0
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C9.5 6 7 6.5 6 9C5 11.5 7 14 9.5 14C12 14 13 12 14 9" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <motion.div 
            className="absolute top-10 left-1/2 transform -translate-x-1/2 translate-x-3 opacity-0 group-hover:opacity-70 delay-150"
            animate={{
              opacity: isHovered ? [0, 0.3, 0] : 0,
              y: isHovered ? [0, -10, -25] : 0
            }}
            transition={{
              duration: 1.7,
              delay: 0.3,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C9.5 6 7 6.5 6 9C5 11.5 7 14 9.5 14C12 14 13 12 14 9" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          
          {/* Category Badge */}
          <motion.div 
            className="absolute top-3 right-3 z-30"
            animate={{
              z: isHovered ? 40 : 10,
              y: isHovered ? -2 : 0,
              x: isHovered ? -2 : 0
            }}
            transition={{ duration: 0.3 }}
            style={{ 
              transformStyle: "preserve-3d",
              transform: `translateZ(${isHovered ? '30px' : '0px'})`
            }}
          >
            <motion.span 
              whileHover={{ scale: 1.1 }}
              className="text-xs px-3 py-1.5 bg-gradient-primary text-white rounded-full font-medium shadow-lg backdrop-blur-sm"
            >
              {coffee.category}
            </motion.span>
          </motion.div>
        </div>

        {/* Content Section with 3D effect */}
        <div className="p-7 relative bg-white/80 backdrop-blur-sm">
          {/* Price Badge with 3D pop */}
          <motion.div 
            className="absolute -top-7 right-5 z-20"
            animate={{
              z: isHovered ? 40 : 10,
              y: isHovered ? -5 : 0,
              rotate: isHovered ? [0, -5, 5, 0] : 0
            }}
            transition={{ 
              z: { duration: 0.3 },
              y: { duration: 0.3 },
              rotate: { duration: 0.5, delay: 0.1 }
            }}
            style={{ 
              transformStyle: "preserve-3d",
              transform: `translateZ(${isHovered ? '30px' : '0px'})`
            }}
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="bg-gradient-gold text-text-primary text-lg font-bold rounded-full h-16 w-16 flex items-center justify-center shadow-gold border-2 border-white"
            >
              ${coffee.price.toFixed(2)}
            </motion.div>
          </motion.div>
          
          {/* Title with 3D effect */}
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-xl font-bold text-text mb-3 font-heading relative z-10"
            style={{ 
              transformStyle: "preserve-3d",
              transform: `translateZ(${isHovered ? '15px' : '0px'})`
            }}
          >
            {coffee.name}
          </motion.h3>

          {/* Description with 3D effect */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-text/80 text-sm mb-5 line-clamp-2 relative z-10"
            style={{ 
              transformStyle: "preserve-3d",
              transform: `translateZ(${isHovered ? '10px' : '0px'})`
            }}
          >
            {coffee.description}
          </motion.p>

          {/* Footer with 3D effect */}
          <motion.div 
            className="flex justify-between items-center pt-4 border-t border-accent/10 relative z-10"
            style={{ 
              transformStyle: "preserve-3d",
              transform: `translateZ(${isHovered ? '20px' : '0px'})`
            }}
          >
            {coffee.customizable && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <span className="text-xs font-medium text-text/70">Customizable</span>
                <motion.span
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 5 },
                    scale: { repeat: Infinity, duration: 2 }
                  }}
                  className="text-sm text-gold"
                >
                  ✨
                </motion.span>
              </motion.div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-primary px-5 py-2 rounded-full text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all uppercase tracking-wider"
            >
              Select
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Shadow that grows on hover */}
      <motion.div
        className="absolute -inset-0.5 bg-black/50 blur-xl rounded-2xl -z-10 opacity-0 group-hover:opacity-20"
        animate={{
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? 0.2 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default CoffeeCard;
