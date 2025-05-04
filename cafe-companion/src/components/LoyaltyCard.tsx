import { LoyaltyReward } from '../data/loyaltyData';
import { motion } from 'framer-motion';

interface LoyaltyCardProps {
  reward: LoyaltyReward;
  userPoints: number;
  onRedeem: (reward: LoyaltyReward) => void;
}

const LoyaltyCard = ({ reward, userPoints, onRedeem }: LoyaltyCardProps) => {
  const canRedeem = userPoints >= reward.pointsRequired;
  const pointsNeeded = reward.pointsRequired - userPoints;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 32px #d9a06633' }}
      whileTap={{ scale: 0.98 }}
      className="bg-secondary rounded-2xl overflow-hidden border-b-4 border-accent shadow-lg"
    >
      {/* Image Section */}
      <div className="h-48 bg-accent/10 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl text-accent"
          >
            🎁
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <motion.h3 
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            className="text-xl font-bold text-primary"
          >
            {reward.name}
          </motion.h3>
          <motion.div
            initial={{ x: 10 }}
            animate={{ x: 0 }}
            className="flex items-center space-x-1"
          >
            <span className="text-lg font-semibold text-accent">
              {reward.pointsRequired}
            </span>
            <span className="text-xs text-primary/60">points</span>
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-primary/80 text-sm mb-4"
        >
          {reward.description}
        </motion.p>

        <div className="flex justify-between items-center">
          {/* Progress Bar */}
          <div className="flex-1 mr-4">
            <div className="h-2 bg-accent/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((userPoints / reward.pointsRequired) * 100, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${canRedeem ? 'bg-accent' : 'bg-primary/60'}`}
              />
            </div>
            {!canRedeem && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-primary/60 mt-1"
              >
                {pointsNeeded} more points needed
              </motion.p>
            )}
          </div>

          {/* Redeem Button */}
          <motion.button
            whileHover={canRedeem ? { scale: 1.05 } : {}}
            whileTap={canRedeem ? { scale: 0.95 } : {}}
            onClick={() => onRedeem(reward)}
            disabled={!canRedeem}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              canRedeem 
                ? 'bg-primary text-light hover:bg-accent shadow-md' 
                : 'bg-secondary text-primary/40 cursor-not-allowed'
            }`}
          >
            {canRedeem ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-1"
              >
                <span>Redeem</span>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.span>
              </motion.span>
            ) : (
              'Not Enough Points'
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoyaltyCard;
