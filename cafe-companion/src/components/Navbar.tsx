import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const { getItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/menu', label: 'Menu', icon: '☕' },
    { path: '/custom-order', label: 'Custom Order', icon: '✨' },
    { path: '/loyalty', label: 'Loyalty', icon: '🏆' },
    { path: '/gift-cards', label: 'Gift Cards', icon: '🎁' },
    { path: '/scan', label: 'Scan & Order', icon: '📱' }
  ];

  const glassEffect = scrolled ? 
    'bg-glass backdrop-blur-lg border-b border-white/10' : 
    'bg-transparent';

  return (
    <>
      <div className="h-24 w-full flex-shrink-0"></div> {/* Spacer që nuk shkurtohet */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
        className={`${glassEffect} fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
        style={{
          boxShadow: scrolled ? '0 10px 30px rgba(156, 44, 0, 0.1)' : 'none'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  rotate: [0, -5, 5, -5, 0],
                  transition: { rotate: { duration: 0.5 } }
                }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <img 
                  src="/images/logo-coffee-2.png" 
                  alt="Art Coffee Logo" 
                  className="h-12 w-auto"
                />
                <motion.div 
                  className="absolute -top-3 -right-3 text-gold text-lg"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 6 },
                    scale: { repeat: Infinity, duration: 2 }
                  }}
                >
                  ✨
                </motion.div>
              </motion.div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group"
                >
                  <motion.div 
                    className="flex items-center gap-1 py-2"
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="text-xs opacity-80">{link.icon}</span>
                    <span
                      className={`font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'text-accent font-semibold'
                          : 'text-text/90 group-hover:text-accent'
                      }`}
                    >
                      {link.label}
                    </span>
                  </motion.div>
                  
                  {location.pathname === link.path ? (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full opacity-0 bg-gradient-to-r from-accent to-primary group-hover:opacity-50"
                      initial={{ width: 0, left: '50%', right: '50%' }}
                      whileHover={{ width: '100%', left: 0, right: 0, opacity: 0.5 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <motion.button
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -5, 5, -5, 0],
                  transition: { rotate: { duration: 0.5 } }
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 rounded-full bg-gradient-glass backdrop-blur-sm border border-white/20 shadow-lg overflow-hidden group"
                aria-label="Open cart"
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-accent group-hover:text-primary transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>

                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-1 -right-1 bg-gradient-gold text-text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-gold animate-pulse-slow"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button 
                className="md:hidden p-3 rounded-full bg-gradient-glass backdrop-blur-sm border border-white/20 shadow-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                  </svg>
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-24 left-0 right-0 z-40 bg-glass backdrop-blur-xl shadow-lg border-y border-white/10 md:hidden overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6">
              <motion.div 
                className="flex flex-col space-y-4"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`p-4 rounded-xl font-medium flex items-center gap-3 transition-all ${
                        location.pathname === link.path 
                          ? 'bg-gradient-primary text-white shadow-md' 
                          : 'text-text hover:bg-accent/5 hover:text-accent'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span>{link.label}</span>
                      {location.pathname === link.path && (
                        <motion.span 
                          className="ml-auto text-lg"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          ➤
                        </motion.span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay when mobile menu is open */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Navbar;
