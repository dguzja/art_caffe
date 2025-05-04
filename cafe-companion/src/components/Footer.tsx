import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Menu',
      links: [
        { name: 'All Coffees', to: '/menu', icon: '☕' },
        { name: 'Seasonal Specials', to: '/menu?category=seasonal', icon: '🌟' },
        { name: 'Non-Coffee Drinks', to: '/menu?category=non-coffee', icon: '🍹' },
        { name: 'Food', to: '/menu?category=food', icon: '🥐' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Custom Orders', to: '/custom-order', icon: '✨' },
        { name: 'Loyalty Program', to: '/loyalty', icon: '🏆' },
        { name: 'Gift Cards', to: '/gift-cards', icon: '🎁' },
        { name: 'Order Ahead', to: '/scan', icon: '📱' }
      ]
    },
    {
      title: 'About Us',
      links: [
        { name: 'Our Story', to: '#', icon: '📖' },
        { name: 'Locations', to: '#', icon: '📍' },
        { name: 'Careers', to: '#', icon: '👥' },
        { name: 'Contact Us', to: '#', icon: '✉️' }
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary opacity-90"></div>
        <div className="absolute inset-0 bg-pattern-coffee"></div>
      </div>
      
      {/* Decorative Coffee Beans */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-10">
        <div className="relative h-16">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute w-full h-20 -top-1 text-primary opacity-10">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="currentColor" opacity="0.6"></path>
          </svg>
        </div>
      </div>

      {/* Floating Coffee Icons */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl text-accent/10"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0.2,
              scale: Math.random() * 1 + 1
            }}
            animate={{
              y: ["-20%", "-35%"],
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {["☕", "✨", "🌟", "☕", "🎁"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <div className="container relative mx-auto px-6 z-20">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Logo and Description */}
          <motion.div 
            className="lg:col-span-5"
            variants={itemVariants}
          >
            <Link to="/" className="block mb-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative inline-block"
              >
                <img 
                  src="/images/logo-coffee-2.png" 
                  alt="Art Coffee Logo" 
                  className="h-16 w-auto"
                />
                <motion.span 
                  className="absolute -top-2 -right-2 text-accent text-lg"
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
                </motion.span>
              </motion.div>
            </Link>
            <p className="text-text/90 mb-8 text-lg">
              We're passionate about crafting the perfect coffee experience for you. 
              Our app helps you customize, order, and enjoy your coffee exactly how you like it.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-5 mb-10">
              {[
                {name: 'facebook', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>},
                {name: 'twitter', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>},
                {name: 'instagram', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>},
                {name: 'youtube', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>}
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={`https://${social.name}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <motion.div
                    whileHover={{ 
                      y: -8, 
                      scale: 1.2,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-glass backdrop-blur-sm flex items-center justify-center text-accent border border-white/10 shadow-lg group-hover:text-white group-hover:bg-gradient-primary transition-all duration-300 overflow-hidden"
                  >
                    {social.icon}
                    <motion.span 
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Empty space for alignment */}
          <div className="lg:col-span-1 hidden lg:block"></div>

          {/* Links Sections */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerLinks.map((section, index) => (
              <motion.div 
                key={section.title}
                variants={itemVariants}
                custom={index}
                className="text-right"
              >
                <h3 className="text-primary font-bold text-xl mb-6 font-heading relative inline-block">
                  {section.title}
                  <motion.span 
                    className="absolute bottom-0 right-0 w-2/3 h-0.5 bg-gradient-primary rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "66%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  />
                </h3>
                <ul className="space-y-4 text-right">
                  {section.links.map((link) => (
                    <motion.li 
                      key={link.name}
                      whileHover={{ x: -5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Link 
                        to={link.to} 
                        className="text-text/80 hover:text-accent transition-colors inline-flex items-center gap-2 group"
                      >
                        <span className="group-hover:underline">{link.name}</span>
                        <span className="text-accent/50 group-hover:text-accent transition-colors">{link.icon}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div 
          className="mt-16 py-8 px-8 rounded-2xl bg-glass backdrop-blur-md shadow-lg border border-white/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Background shimmer effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
            animate={{ 
              opacity: [0, 0.5, 0],
              left: ["-100%", "100%"]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
          />
          
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.h3 
              className="text-2xl font-bold text-primary mb-4 font-heading"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join Our Coffee Club
            </motion.h3>
            <motion.p 
              className="text-text/70 mb-6"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Subscribe to receive special offers and updates on our newest creations
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="px-5 py-3.5 bg-white rounded-xl shadow-inner-soft border border-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/30 flex-grow text-text"
              />
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-primary text-white px-7 py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-text/50 text-sm">
            © {new Date().getFullYear()} Art Coffee. All rights reserved.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm">
            <Link to="#" className="text-text/60 hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-text/60 hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="#" className="text-text/60 hover:text-accent transition-colors">Cookie Policy</Link>
            <Link to="#" className="text-text/60 hover:text-accent transition-colors">Accessibility</Link>
          </div>
        </motion.div>
      </div>
      
      {/* Back to top button */}
      <motion.a
        href="#top"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-lg z-50"
        whileHover={{ y: -5, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.a>
    </footer>
  );
};

export default Footer;
