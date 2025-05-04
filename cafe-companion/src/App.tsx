import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CustomOrderPage from './pages/CustomOrderPage';
import LoyaltyPage from './pages/LoyaltyPage';
import GiftCardPage from './pages/GiftCardPage';
import ScanOrderPage from './pages/ScanOrderPage';

// Context
import { CartProvider } from './context/CartContext';

// Komponent për të shkuar në krye të faqes kur ndryshon rruga
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Komponent për çdo faqe individuale për të siguruar rendering të saktë
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
  >
    {children}
  </motion.div>
);

// Komponent për shfaqjen e rrugëve
function AppRoutes() {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <>
      {/* Ambient background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 right-1/3 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Komponent që shkron në krye të faqes kur ndryshon rruga */}
      <ScrollToTop />
      
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
            <Route path="/menu" element={<PageWrapper><MenuPage /></PageWrapper>} />
            <Route path="/custom-order" element={<PageWrapper><CustomOrderPage /></PageWrapper>} />
            <Route path="/loyalty" element={<PageWrapper><LoyaltyPage /></PageWrapper>} />
            <Route path="/gift-cards" element={<PageWrapper><GiftCardPage /></PageWrapper>} />
            <Route path="/scan" element={<PageWrapper><ScanOrderPage /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      
      {/* Coffee bean cursor effect - follows mouse */}
      <motion.div 
        className="fixed w-8 h-8 pointer-events-none z-50 flex items-center justify-center text-accent/30 text-xl"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16
        }}
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 10, ease: "linear" },
          scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
      >
        ☕
      </motion.div>
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading with timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <CartProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-background"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
              className="w-32 h-32 flex items-center justify-center"
            >
              <img 
                src="/images/logo-coffee-2.png" 
                alt="Art Coffee Loading" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.div
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut" 
              }}
            >
              <div className="w-40 h-40 rounded-full border-2 border-accent"></div>
            </motion.div>
          </motion.div>
        ) : (
          <Router>
            <div className="flex flex-col min-h-screen">
              <AppRoutes />
            </div>
          </Router>
        )}
      </AnimatePresence>
    </CartProvider>
  );
}

export default App;
