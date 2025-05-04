import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { coffeeOptions } from '../data/coffeeData';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';


const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Featured products data
  const featuredProducts = [
    {
      id: "specialty-latte",
      name: "Specialty Latte",
      description: "Our signature latte with house-made syrups and premium espresso.",
      price: 4.50,
      image: "/images/latte.jpg"
    },
    {
      id: "cold-brew",
      name: "Cold Brew",
      description: "Smooth, low-acidity coffee brewed for 24 hours for a perfect refreshment.",
      price: 4.00,
      image: "/images/cold-brew.jpg"
    },
    {
      id: "mocha-frappe",
      name: "Mocha Frappé",
      description: "Blended iced coffee with chocolate, topped with whipped cream.",
      price: 5.00,
      image: "/images/11.webp"
    }
  ];

  // Handle adding a featured product to cart
  const handleAddToCart = (product: any) => {
    const coffeeProduct = coffeeOptions.find(coffee =>
      coffee.id === product.id || coffee.name.toLowerCase() === product.name.toLowerCase()
    );
    if (coffeeProduct) {
      addToCart(coffeeProduct);
    } else {
      addToCart(product);
    }
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${product.name} has been added to your cart.`,
      timer: 1800,
      showConfirmButton: false
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 md:py-32 flex flex-col items-center justify-center mb-20"
        style={{
          background: "linear-gradient(135deg, #f9f6f2 60%, #f5eee6 100%)"
        }}
      >
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-7xl select-none pointer-events-none opacity-30" aria-hidden>
          ☕
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 text-primary drop-shadow-xl tracking-tight"
            style={{textShadow: '0 4px 24px #b07d5633'}}
          >
            Art Coffee
          </motion.h1>
          <div className="w-24 h-2 mx-auto mb-8 rounded-full" style={{background: 'linear-gradient(90deg, #d9a066 40%, #7b4b28 100%)'}}></div>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-secondary"
          >
            Coffee your way!<br />
            <span className="text-accent">Order</span> easily and <span className="text-accent">earn points</span> with every purchase.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/custom-order')}
              className="bg-secondary/80 backdrop-blur-md text-primary px-8 py-4 rounded-full font-bold shadow-lg hover:bg-accent/20 transition-all border-2 border-accent text-lg"
              style={{boxShadow: '0 4px 32px #d9a06633'}}
            >
              Order Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/menu')}
              className="bg-primary text-light px-8 py-4 rounded-full font-bold shadow-lg hover:bg-accent transition-all border-2 border-accent text-lg"
              style={{boxShadow: '0 4px 32px #7b4b2833'}}
            >
              View Menu
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="py-20 bg-background border-t border-b border-accent/30 mb-20"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
          >
            Our Services
          </motion.h2>
          <div className="w-16 h-1 mx-auto mb-12 rounded-full bg-accent"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: "☕",
                title: "Custom Ordering",
                description: "Customize your coffee exactly how you like it and place orders through our app."
              },
              {
                icon: "🎁",
                title: "Digital Gift Cards",
                description: "Send digital gift cards to friends and family for any occasion."
              },
              {
                icon: "🎯",
                title: "Loyalty Program",
                description: "Earn points with every purchase and redeem them for free items."
              },
              {
                icon: "📱",
                title: "Scan & Order",
                description: "Scan a QR code at your table and order directly from your seat."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 32px #d9a06633' }}
                className="bg-secondary p-8 rounded-2xl shadow-lg text-center border-b-4 border-accent transition-all"
              >
                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"
                >
                  <span>{feature.icon}</span>
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
                <p className="text-secondary text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
          >
            Our Coffees
          </motion.h2>
          <div className="w-16 h-1 mx-auto mb-12 rounded-full bg-accent"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1 }}
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #7b4b2833' }}
                className="coffee-card cursor-pointer border-b-4 border-accent"
                onClick={() => handleAddToCart(product)}
              >
                <div className="coffee-card__image relative">
                  <img src={product.image} alt={product.name} className="object-cover w-full h-48 rounded-t-2xl" />
                </div>
                <div className="coffee-card__content">
                  <h3 className="coffee-card__title">{product.name}</h3>
                  <p className="coffee-card__description line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="coffee-card__price">${product.price.toFixed(2)}</span>
                    <button
                      onClick={e => { e.stopPropagation(); handleAddToCart(product); }}
                      className="px-4 py-2 bg-primary text-light rounded-full font-medium shadow-md hover:bg-accent transition-colors border-2 border-accent"
                      style={{boxShadow: '0 2px 12px #d9a06633'}}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;
