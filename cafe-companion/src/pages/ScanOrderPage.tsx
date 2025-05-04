import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { coffeeOptions, CoffeeOption } from '../data/coffeeData';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

const ScanOrderPage = () => {
  const { addToCart } = useCart();
  const [tableNumber, setTableNumber] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [localCart, setLocalCart] = useState<{ item: CoffeeOption; quantity: number }[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Mock function to simulate QR code scanning
  const handleScan = () => {
    setIsScanning(true);

    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setIsScanned(true);
      setTableNumber('12'); // Mock table number from QR code
    }, 2000);
  };

  const handleAddToCart = (coffee: CoffeeOption) => {
    const existingItemIndex = localCart.findIndex(item => item.item.id === coffee.id);

    if (existingItemIndex >= 0) {
      // Item already in cart, increase quantity
      const updatedCart = [...localCart];
      updatedCart[existingItemIndex].quantity += 1;
      setLocalCart(updatedCart);
    } else {
      // Add new item to cart
      setLocalCart([...localCart, { item: coffee, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (coffeeId: string) => {
    const existingItemIndex = localCart.findIndex(item => item.item.id === coffeeId);

    if (existingItemIndex >= 0) {
      const updatedCart = [...localCart];
      if (updatedCart[existingItemIndex].quantity > 1) {
        // Decrease quantity
        updatedCart[existingItemIndex].quantity -= 1;
      } else {
        // Remove item from cart
        updatedCart.splice(existingItemIndex, 1);
      }
      setLocalCart(updatedCart);
    }
  };

  const calculateTotal = () => {
    return localCart.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  };

  const handlePlaceOrder = () => {
    // Add all items to the global cart
    localCart.forEach(item => {
      // Add table number as a special instruction
      const tableInfo = `Table #${tableNumber}`;
      const instructions = specialInstructions
        ? `${tableInfo} - ${specialInstructions}`
        : tableInfo;

      addToCart(item.item, item.quantity, undefined, instructions);
    });

    // Show order confirmation
    setOrderPlaced(true);
    Swal.fire({
      icon: 'success',
      title: 'Order Placed!',
      text: 'Your order has been placed successfully.',
      timer: 1800,
      showConfirmButton: false
    });
  };

  const handleNewOrder = () => {
    setLocalCart([]);
    setOrderPlaced(false);
    setIsScanned(false);
    setTableNumber('');
    setSpecialInstructions('');
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
        Scan & Order
      </motion.h1>
      <div className="w-24 h-2 mx-auto mb-12 rounded-full" style={{background: 'linear-gradient(90deg, #d9a066 40%, #7b4b28 100%)'}}></div>

      <AnimatePresence mode="wait">
        {!isScanned ? (
          <motion.section
            key="scan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-md mx-auto bg-secondary rounded-2xl shadow-lg p-8 text-center border-b-4 border-accent mb-16"
          >
            <motion.h2 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold mb-4 text-primary"
            >
              Scan QR Code at Your Table
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-secondary mb-6"
            >
              Scan the QR code on your table to place an order directly from your seat.<br />No need to wait in line!
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <AnimatePresence mode="wait">
                {isScanning ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-64 bg-accent/10 rounded-lg flex items-center justify-center"
                  >
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }}
                      className="text-center"
                    >
                      <div className="text-accent text-5xl mb-2 animate-spin-slow">⟳</div>
                      <p className="text-secondary">Scanning...</p>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-64 bg-accent/10 rounded-lg flex items-center justify-center"
                  >
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="text-center"
                    >
                      <div className="text-7xl mb-4">📱</div>
                      <p className="text-secondary">Ready to scan</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScan}
              disabled={isScanning}
              className={`w-full py-3 rounded-full font-bold text-lg shadow-md border-2 border-accent transition-all ${
                isScanning
                  ? 'bg-accent/20 text-secondary cursor-not-allowed'
                  : 'bg-primary text-light hover:bg-accent'
              }`}
              style={{boxShadow: '0 2px 12px #d9a06633'}}
            >
              {isScanning ? 'Scanning...' : 'Scan QR Code'}
            </motion.button>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-secondary mt-6"
            >
              Your table number will be detected automatically.
            </motion.p>
          </motion.section>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnimatePresence mode="wait">
              {!orderPlaced ? (
                <motion.div
                  key="ordering"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-lg shadow-md p-4 mb-6"
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Table #{tableNumber}</h2>
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        Ready to Order
                      </motion.span>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="md:col-span-2"
                    >
                      <motion.h2 
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl font-semibold mb-4"
                      >
                        Menu
                      </motion.h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {coffeeOptions.map((coffee, index) => (
                          <motion.div
                            key={coffee.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white rounded-lg shadow-md overflow-hidden flex"
                          >
                            <motion.div 
                              whileHover={{ scale: 1.05 }}
                              className="w-24 bg-gray-200 flex-shrink-0"
                            />
                            <div className="p-3 flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium">{coffee.name}</h3>
                                <span className="text-accent font-bold">${coffee.price.toFixed(2)}</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{coffee.description}</p>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAddToCart(coffee)}
                                className="mt-2 px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-accent"
                              >
                                Add to Order
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.div 
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-lg shadow-md p-4 sticky top-4"
                      >
                        <motion.h2 
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-xl font-semibold mb-4"
                        >
                          Your Order
                        </motion.h2>

                        <AnimatePresence>
                          {localCart.length === 0 ? (
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-gray-500 text-center py-6"
                            >
                              Your order is empty. Add items from the menu.
                            </motion.p>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-3 mb-4"
                              >
                                {localCart.map((item, index) => (
                                  <motion.div
                                    key={item.item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    className="flex justify-between items-center"
                                  >
                                    <div>
                                      <h4 className="font-medium">{item.item.name}</h4>
                                      <p className="text-sm text-gray-500">${item.item.price.toFixed(2)} each</p>
                                    </div>

                                    <div className="flex items-center">
                                      <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                        onClick={() => handleRemoveFromCart(item.item.id)}
                                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                                      >
                                        -
                                      </motion.button>
                                      <span className="mx-2">{item.quantity}</span>
                                      <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                        onClick={() => handleAddToCart(item.item)}
                                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                                      >
                                        +
                                      </motion.button>
                                    </div>
                                  </motion.div>
                                ))}
                              </motion.div>

                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="mt-4"
                              >
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Special Instructions
                                </label>
                                <textarea
                                  value={specialInstructions}
                                  onChange={(e) => setSpecialInstructions(e.target.value)}
                                  placeholder="Any special requests for your order?"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                  rows={2}
                                />
                              </motion.div>

                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="border-t border-gray-200 pt-4 mt-4 mb-4"
                              >
                                <div className="flex justify-between font-bold">
                                  <span>Total:</span>
                                  <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                              </motion.div>

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handlePlaceOrder}
                                className="w-full py-3 bg-primary text-white rounded-md font-medium hover:bg-accent"
                              >
                                Add to Cart
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-6xl mb-4 text-green-500"
                  >
                    ✓
                  </motion.div>
                  <motion.h2 
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-bold mb-2"
                  >
                    Order Placed!
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 mb-6"
                  >
                    Your order has been sent to the kitchen. We'll bring it to Table #{tableNumber} shortly.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 p-4 bg-gray-50 rounded-lg"
                  >
                    <motion.h3 
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="font-semibold mb-2"
                    >
                      Order Summary
                    </motion.h3>
                    {localCart.map((item, index) => (
                      <motion.div
                        key={item.item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex justify-between text-sm mb-1"
                      >
                        <span>{item.quantity}x {item.item.name}</span>
                        <span>${(item.item.price * item.quantity).toFixed(2)}</span>
                      </motion.div>
                    ))}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="border-t border-gray-200 mt-2 pt-2 font-bold flex justify-between"
                    >
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </motion.div>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNewOrder}
                    className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-accent"
                  >
                    Place Another Order
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScanOrderPage;
