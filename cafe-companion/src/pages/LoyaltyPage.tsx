import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loyaltyRewards, LoyaltyReward } from '../data/loyaltyData';
import LoyaltyCard from '../components/LoyaltyCard';
import Swal from 'sweetalert2';

const LoyaltyPage = () => {
  // Mock user data
  const [userPoints, setUserPoints] = useState(120);
  const [redeemHistory, setRedeemHistory] = useState<LoyaltyReward[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedReward, setSelectedReward] = useState<LoyaltyReward | null>(null);
  
  const handleRedeem = (reward: LoyaltyReward) => {
    setSelectedReward(reward);
    setShowConfirmation(true);
  };
  
  const confirmRedeem = () => {
    if (selectedReward && userPoints >= selectedReward.pointsRequired) {
      setUserPoints(userPoints - selectedReward.pointsRequired);
      setRedeemHistory([...redeemHistory, selectedReward]);
      setShowConfirmation(false);
      setSelectedReward(null);
      Swal.fire({
        icon: 'success',
        title: 'Reward Redeemed!',
        text: 'You have successfully redeemed your reward.',
        timer: 1800,
        showConfirmButton: false
      });
    }
  };
  
  const cancelRedeem = () => {
    setShowConfirmation(false);
    setSelectedReward(null);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background px-0 md:px-4 py-8"
    >
      {/* Page Title */}
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-primary drop-shadow-lg tracking-tight"
        style={{textShadow: '0 4px 24px #b07d5633'}}
      >
        Loyalty Program
      </motion.h1>
      <div className="w-24 h-2 mx-auto mb-12 rounded-full" style={{background: 'linear-gradient(90deg, #d9a066 40%, #7b4b28 100%)'}}></div>

      {/* User Points Summary */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="loyalty-points bg-secondary rounded-2xl shadow-lg p-8 mb-12 border-b-4 border-accent"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-primary mb-2">Your Loyalty Points</h2>
            <p className="text-secondary mt-1">Earn points with every purchase and redeem them for rewards.</p>
          </motion.div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="mt-4 md:mt-0 text-center"
          >
            <motion.div 
              key={userPoints}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="loyalty-points__amount shadow-lg border-2 border-accent bg-accent/10 text-accent rounded-lg px-8 py-2"
              style={{boxShadow: '0 4px 32px #d9a06633'}}
            >
              {userPoints}
            </motion.div>
            <div className="loyalty-points__label text-secondary">Available Points</div>
          </motion.div>
        </div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 pt-8 border-t border-accent"
        >
          <h3 className="text-lg font-semibold mb-3 text-primary">How to Earn Points</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
            {[
              '1 point for every $1 spent',
              '5 bonus points for trying new items',
              '10 bonus points on your birthday'
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center bg-accent/20 rounded-lg p-4 shadow-md border-2 border-accent/30 text-primary font-medium hover:bg-accent/30 hover:border-accent/50 cursor-pointer transition-all"
              >
                <span className="text-accent mr-3 text-xl">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Available Rewards */}
      <motion.h2 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-2xl font-bold mb-6 text-primary"
      >
        Available Rewards
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {loyaltyRewards.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #d9a06633' }}
            className="reward-card border-b-4 border-accent"
          >
            <LoyaltyCard 
              reward={reward} 
              userPoints={userPoints} 
              onRedeem={handleRedeem} 
            />
          </motion.div>
        ))}
      </div>

      {/* Redemption History */}
      <AnimatePresence>
        {redeemHistory.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 1.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-primary">Redemption History</h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="bg-secondary rounded-2xl shadow-lg overflow-hidden border-b-4 border-accent"
            >
              <table className="w-full">
                <thead className="bg-accent/10">
                  <tr>
                    <th className="py-3 px-4 text-left text-primary">Reward</th>
                    <th className="py-3 px-4 text-left text-primary">Points Used</th>
                    <th className="py-3 px-4 text-left text-primary">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {redeemHistory.map((reward, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      className="border-t border-accent/20"
                    >
                      <td className="py-3 px-4 text-secondary">{reward.name}</td>
                      <td className="py-3 px-4 text-accent font-bold">{reward.pointsRequired}</td>
                      <td className="py-3 px-4 text-secondary">{new Date().toLocaleDateString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && selectedReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-secondary rounded-2xl shadow-xl max-w-md w-full p-8 border-b-4 border-accent"
            >
              <motion.h3 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold text-primary mb-4 text-center"
              >
                Confirm Redemption
              </motion.h3>
              <p className="text-secondary text-center mb-6">
                Are you sure you want to redeem <span className="text-accent font-semibold">{selectedReward.name}</span> for <span className="text-accent font-semibold">{selectedReward.pointsRequired} points</span>?
              </p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmRedeem}
                  className="flex-1 bg-primary text-light py-3 rounded-md font-medium hover:bg-accent transition-colors shadow-md border-2 border-accent"
                >
                  Confirm
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cancelRedeem}
                  className="flex-1 border-2 border-primary text-primary py-3 rounded-md font-medium hover:bg-primary/5 transition-colors shadow-md"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoyaltyPage;
