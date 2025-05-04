import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CoffeeOption } from '../data/coffeeData';

// Define the cart item type
export interface CartItem {
  id: string;
  coffee: CoffeeOption;
  quantity: number;
  customizations?: {
    [key: string]: string;
  };
  specialInstructions?: string;
}

// Define the cart context type
interface CartContextType {
  items: CartItem[];
  addToCart: (coffee: CoffeeOption, quantity?: number, customizations?: { [key: string]: string }, specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage if available
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cafe-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cafe-cart', JSON.stringify(items));
  }, [items]);

  // Generate a unique ID for cart items
  const generateItemId = (coffee: CoffeeOption, customizations?: { [key: string]: string }): string => {
    const customizationString = customizations 
      ? Object.entries(customizations).sort().map(([key, value]) => `${key}:${value}`).join('|')
      : '';
    return `${coffee.id}-${customizationString}`;
  };

  // Add an item to the cart
  const addToCart = (
    coffee: CoffeeOption, 
    quantity: number = 1, 
    customizations?: { [key: string]: string },
    specialInstructions?: string
  ) => {
    const itemId = generateItemId(coffee, customizations);
    
    // Check if the item is already in the cart
    const existingItemIndex = items.findIndex(item => item.id === itemId);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += quantity;
      setItems(updatedItems);
    } else {
      // Add new item
      setItems([
        ...items,
        {
          id: itemId,
          coffee,
          quantity,
          customizations,
          specialInstructions
        }
      ]);
    }
  };

  // Remove an item from the cart
  const removeFromCart = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  // Update the quantity of an item
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    const updatedItems = items.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    
    setItems(updatedItems);
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
  };

  // Calculate the total price of items in the cart
  const getCartTotal = (): number => {
    return items.reduce((total, item) => total + (item.coffee.price * item.quantity), 0);
  };

  // Get the total number of items in the cart
  const getItemCount = (): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  // Create the context value
  const contextValue: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getItemCount
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
