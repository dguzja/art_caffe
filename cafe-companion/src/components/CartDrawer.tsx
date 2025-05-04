import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [isClosing, setIsClosing] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex justify-end"
        >
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-secondary w-full max-w-md h-full border-l-4 border-accent shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b-4 border-accent flex justify-between items-center bg-primary">
                <motion.h2 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-2xl font-bold text-light"
                >
                  Your Cart
                </motion.h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="text-light hover:text-accent text-2xl"
                >
                  ✕
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-grow overflow-y-auto p-6">
                {items.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-6xl mb-4 text-accent"
                    >
                      🛒
                    </motion.div>
                    <p className="text-primary/60 mb-6">Your cart is empty</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClose}
                      className="px-6 py-3 bg-primary text-light rounded-full font-medium hover:bg-accent shadow-md"
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="order-item bg-secondary rounded-xl p-4 border-b-4 border-accent shadow-md w-full"
                      >
                        <div className="flex justify-between items-start w-full">
                          <div className="flex-1 pr-4">
                            <motion.h3 
                              initial={{ x: -10 }}
                              animate={{ x: 0 }}
                              className="text-lg font-bold text-primary"
                            >
                              {item.coffee.name}
                            </motion.h3>
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-sm text-accent"
                            >
                              ${item.coffee.price.toFixed(2)} each
                            </motion.p>
                            {item.customizations && Object.keys(item.customizations).length > 0 && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2"
                              >
                                <div className="flex flex-wrap gap-2">
                                  {Object.entries(item.customizations).map(([key, value]) => (
                                    <motion.span
                                      key={key}
                                      whileHover={{ scale: 1.05 }}
                                      className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full"
                                    >
                                      {key}: {value}
                                    </motion.span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                            {item.specialInstructions && (
                              <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs text-primary/60 mt-2"
                              >
                                Note: {item.specialInstructions}
                              </motion.p>
                            )}
                          </div>
                          <div className="flex flex-col items-end">
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                              onClick={() => removeFromCart(item.id)}
                              className="text-accent hover:text-primary text-lg"
                            >
                              ✕
                            </motion.button>
                            <div className="flex items-center mt-2 space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center bg-accent/10 rounded-full text-accent hover:bg-accent/20"
                              >
                                -
                              </motion.button>
                              <span className="text-primary font-medium">{item.quantity}</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-accent/10 rounded-full text-accent hover:bg-accent/20"
                              >
                                +
                              </motion.button>
                            </div>
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-accent font-bold mt-2"
                            >
                              ${(item.coffee.price * item.quantity).toFixed(2)}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t-4 border-accent p-6"
                >
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-primary/80">Subtotal:</span>
                      <span className="font-bold text-primary">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary/60">Tax (8%):</span>
                      <span className="text-primary/60">${(getCartTotal() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-accent/20">
                      <span className="font-bold text-lg text-primary">Total:</span>
                      <span className="font-bold text-lg text-accent">
                        ${(getCartTotal() * 1.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearCart}
                      className="px-6 py-3 border-2 border-accent rounded-full hover:bg-accent/10 flex-1 font-medium"
                    >
                      Clear Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => alert('Proceeding to checkout!')}
                      className="px-6 py-3 bg-primary text-light rounded-full hover:bg-accent flex-1 font-medium shadow-md"
                    >
                      Checkout
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
