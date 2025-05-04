import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { coffeeOptions, CoffeeOption } from '../data/coffeeData';
import { getPersonalizedRecommendations, mockUserPreference } from '../utils/recommendationEngine';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

interface CustomizationOption {
  name: string;
  value: string;
}

interface CustomizedCoffee {
  base: CoffeeOption;
  options: CustomizationOption[];
}

const CustomOrderPage = () => {
  const { addToCart } = useCart();
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeOption | null>(null);
  const [customizationStep, setCustomizationStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<CustomizationOption[]>([]);
  const [customizedCoffees, setCustomizedCoffees] = useState<CustomizedCoffee[]>([]);
  const [recommendations, setRecommendations] = useState<CoffeeOption[]>([]);

  // Filter only customizable coffees
  const customizableCoffees = coffeeOptions.filter(coffee => coffee.customizable);

  // Generate AI recommendations based on order history and preferences
  useEffect(() => {
    // Create a modified user preference based on current order
    const userPref = { ...mockUserPreference };

    // Add any selected options to user preferences
    if (customizedCoffees.length > 0) {
      // Extract flavor preferences from orders
      const flavorPreferences = customizedCoffees
        .flatMap(coffee => coffee.options)
        .filter(option => option.name === 'Flavor' || option.name === 'Extras')
        .map(option => option.value);

      // Extract milk preferences from orders
      const milkPreferences = customizedCoffees
        .flatMap(coffee => coffee.options)
        .filter(option => option.name === 'Milk')
        .map(option => option.value);

      // Update user preferences if we found any
      if (flavorPreferences.length > 0) {
        userPref.flavors = [...new Set([...userPref.flavors, ...flavorPreferences])];
      }

      if (milkPreferences.length > 0) {
        userPref.milkTypes = [...new Set([...userPref.milkTypes, ...milkPreferences])];
      }

      // Add ordered coffee IDs to lastOrdered
      const orderedCoffeeIds = customizedCoffees.map(coffee => coffee.base.id);
      userPref.lastOrdered = [...new Set([...userPref.lastOrdered, ...orderedCoffeeIds])];
    }

    // Get personalized recommendations
    const aiRecommendations = getPersonalizedRecommendations(
      customizableCoffees,
      userPref,
      selectedCoffee?.id,
      3
    );

    setRecommendations(aiRecommendations);
  }, [customizedCoffees, selectedCoffee]);

  const handleCoffeeSelect = (coffee: CoffeeOption) => {
    setSelectedCoffee(coffee);
    setCustomizationStep(1);
    setSelectedOptions([]);
  };

  const handleOptionSelect = (optionName: string, value: string) => {
    // Check if this option type is already selected
    const existingOptionIndex = selectedOptions.findIndex(
      option => option.name === optionName
    );

    if (existingOptionIndex >= 0) {
      // Replace existing option
      const updatedOptions = [...selectedOptions];
      updatedOptions[existingOptionIndex] = { name: optionName, value };
      setSelectedOptions(updatedOptions);
    } else {
      // Add new option
      setSelectedOptions([...selectedOptions, { name: optionName, value }]);
    }
  };

  const handleNextStep = () => {
    if (selectedCoffee && selectedCoffee.options) {
      const optionKeys = Object.keys(selectedCoffee.options);
      if (customizationStep < optionKeys.length) {
        setCustomizationStep(customizationStep + 1);
      } else {
        // Final step, add to cart
        if (selectedCoffee) {
          setCustomizedCoffees([
            ...customizedCoffees,
            { base: selectedCoffee, options: selectedOptions }
          ]);
          setSelectedCoffee(null);
          setCustomizationStep(1);
          setSelectedOptions([]);
        }
      }
    }
  };

  const handlePrevStep = () => {
    if (customizationStep > 1) {
      setCustomizationStep(customizationStep - 1);
    }
  };

  const getCurrentOptionName = (): string => {
    if (selectedCoffee && selectedCoffee.options) {
      const optionKeys = Object.keys(selectedCoffee.options);
      if (customizationStep <= optionKeys.length) {
        return optionKeys[customizationStep - 1];
      }
    }
    return '';
  };

  const getCurrentOptionValues = (): string[] => {
    if (selectedCoffee && selectedCoffee.options) {
      const optionName = getCurrentOptionName();
      return selectedCoffee.options[optionName] || [];
    }
    return [];
  };

  const getSelectedValueForOption = (optionName: string): string => {
    const option = selectedOptions.find(opt => opt.name === optionName);
    return option ? option.value : '';
  };

  const handleRemoveFromCart = (index: number) => {
    const updatedCart = [...customizedCoffees];
    updatedCart.splice(index, 1);
    setCustomizedCoffees(updatedCart);
  };

  const calculateTotal = () => {
    return customizedCoffees.reduce((total, item) => total + item.base.price, 0);
  };

  // Convert customization options to the format expected by the cart
  const convertOptionsToCartFormat = (options: CustomizationOption[]): { [key: string]: string } => {
    const result: { [key: string]: string } = {};
    options.forEach(option => {
      result[option.name] = option.value;
    });
    return result;
  };

  const handlePlaceOrder = () => {
    // Add all customized coffees to the cart
    customizedCoffees.forEach(customizedCoffee => {
      const customizations = convertOptionsToCartFormat(customizedCoffee.options);
      addToCart(customizedCoffee.base, 1, customizations);
    });

    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Order Added!',
      text: 'All items have been added to your cart.',
      timer: 1800,
      showConfirmButton: false
    });

    // Clear the custom order
    setCustomizedCoffees([]);
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
        Custom Order
      </motion.h1>
      <div className="w-24 h-2 mx-auto mb-12 rounded-full" style={{background: 'linear-gradient(90deg, #d9a066 40%, #7b4b28 100%)'}}></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <AnimatePresence mode="wait">
            {selectedCoffee ? (
              <motion.div
                key="customization"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex justify-between items-start mb-6"
                >
                  <div>
                    <motion.h2 
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold text-primary"
                    >
                      {selectedCoffee.name}
                    </motion.h2>
                    <motion.p 
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-600 mt-1"
                    >
                      {selectedCoffee.description}
                    </motion.p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedCoffee(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </motion.button>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex mb-4"
                  >
                    {selectedCoffee.options && Object.keys(selectedCoffee.options).map((optionName, index) => (
                      <motion.div
                        key={optionName}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className={`flex-1 text-center py-2 ${
                          index + 1 === customizationStep
                            ? 'border-b-2 border-primary text-primary font-medium'
                            : index + 1 < customizationStep
                              ? 'border-b-2 border-green-500 text-green-500'
                              : 'border-b border-gray-200 text-gray-500'
                        }`}
                      >
                        {optionName}
                        {index + 1 < customizationStep && getSelectedValueForOption(optionName) && (
                          <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className="ml-1 text-xs"
                          >
                            ({getSelectedValueForOption(optionName)})
                          </motion.span>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.h3 
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-lg font-semibold mb-3"
                  >
                    Select {getCurrentOptionName()}
                  </motion.h3>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6"
                  >
                    {getCurrentOptionValues().map((value, index) => (
                      <motion.label
                        key={value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`border rounded-lg p-3 flex items-center cursor-pointer ${
                          getSelectedValueForOption(getCurrentOptionName()) === value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={getCurrentOptionName()}
                          value={value}
                          checked={getSelectedValueForOption(getCurrentOptionName()) === value}
                          onChange={() => handleOptionSelect(getCurrentOptionName(), value)}
                          className="mr-2"
                        />
                        {value}
                      </motion.label>
                    ))}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex justify-between"
                  >
                    {customizationStep > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePrevStep}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Back
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextStep}
                      disabled={!getSelectedValueForOption(getCurrentOptionName())}
                      className={`px-6 py-2 rounded-md ${
                        getSelectedValueForOption(getCurrentOptionName())
                          ? 'bg-primary text-white hover:bg-accent'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {customizationStep < Object.keys(selectedCoffee.options || {}).length
                        ? 'Next'
                        : 'Add to Order'}
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="selection"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold mb-8 text-primary"
                >
                  Select a Coffee to Customize
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                >
                  {customizableCoffees.map((coffee, index) => (
                    <motion.div
                      key={coffee.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #7b4b2833' }}
                      className="coffee-card cursor-pointer border-b-4 border-accent bg-secondary rounded-2xl shadow-lg overflow-hidden"
                      onClick={() => handleCoffeeSelect(coffee)}
                    >
                      <div className="coffee-card__image relative h-48 bg-accent/10 flex items-center justify-center">
                        {coffee.image ? (
                          <motion.img
                            src={coffee.image}
                            alt={coffee.name}
                            className="object-cover w-full h-full rounded-t-2xl"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6 }}
                          />
                        ) : (
                          <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-6xl text-accent"
                          >
                            ☕
                          </motion.div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <motion.h3 
                            initial={{ x: -10 }}
                            animate={{ x: 0 }}
                            className="text-xl font-bold text-primary"
                          >
                            {coffee.name}
                          </motion.h3>
                          <motion.span 
                            initial={{ x: 10 }}
                            animate={{ x: 0 }}
                            className="text-lg font-semibold text-accent"
                          >
                            ${coffee.price.toFixed(2)}
                          </motion.span>
                        </div>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-primary/80 text-sm mb-4 line-clamp-2"
                        >
                          {coffee.description}
                        </motion.p>
                        <div className="flex justify-between items-center">
                          <motion.span 
                            whileHover={{ scale: 1.05 }}
                            className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full font-medium"
                          >
                            {coffee.category}
                          </motion.span>
                          {coffee.customizable && (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center space-x-1"
                            >
                              <span className="text-xs text-primary font-medium">Customizable</span>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="text-xs text-accent"
                              >
                                ✨
                              </motion.span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Order Summary Sidebar */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-secondary rounded-2xl shadow-lg p-8 border-b-4 border-accent sticky top-4"
          >
            <motion.h2 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl font-semibold mb-4 text-primary"
            >
              Your Custom Order
            </motion.h2>
            <AnimatePresence>
              {customizedCoffees.length === 0 ? (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-secondary text-center py-6"
                >
                  Your order is empty. Customize a coffee to add it here.
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
                    transition={{ delay: 0.6 }}
                    className="space-y-4 mb-6"
                  >
                    {customizedCoffees.map((coffee, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="border-b border-accent/20 pb-4"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-primary">{coffee.base.name}</h3>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => handleRemoveFromCart(index)}
                            className="text-accent hover:text-primary text-sm"
                          >
                            ✕
                          </motion.button>
                        </div>
                        <motion.ul 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="mt-1 text-sm text-secondary"
                        >
                          {coffee.options.map((option, optIndex) => (
                            <motion.li
                              key={optIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.9 + optIndex * 0.1 }}
                            >
                              {option.name}: <span className="font-medium text-primary">{option.value}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 + index * 0.1 }}
                          className="mt-2 text-accent font-bold"
                        >
                          ${coffee.base.price.toFixed(2)}
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="border-t border-accent/20 pt-4 mb-6"
                  >
                    <div className="flex justify-between font-bold text-primary">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlaceOrder}
                    className="w-full py-3 bg-primary text-light rounded-lg font-medium hover:bg-accent"
                  >
                    Add All to Cart
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CustomOrderPage;
