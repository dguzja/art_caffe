import { CoffeeOption } from '../data/coffeeData';

// Define user preference types
export interface UserPreference {
  category: string;
  flavors: string[];
  milkTypes: string[];
  temperature: 'hot' | 'cold';
  lastOrdered: string[]; // IDs of recently ordered coffees
}

// Mock user preferences (in a real app, this would come from a backend)
export const mockUserPreference: UserPreference = {
  category: 'Milk-based',
  flavors: ['Vanilla', 'Caramel'],
  milkTypes: ['Almond', 'Oat'],
  temperature: 'hot',
  lastOrdered: ['latte', 'cappuccino', 'mocha']
};

/**
 * Calculate similarity score between user preferences and a coffee option
 * Higher score means better match
 */
const calculateSimilarityScore = (
  coffee: CoffeeOption, 
  userPreference: UserPreference
): number => {
  let score = 0;
  
  // Category match
  if (coffee.category === userPreference.category) {
    score += 3;
  }
  
  // Temperature match (infer from category)
  const isCold = coffee.category.toLowerCase().includes('cold');
  if ((isCold && userPreference.temperature === 'cold') || 
      (!isCold && userPreference.temperature === 'hot')) {
    score += 2;
  }
  
  // Check if coffee has customization options that match user preferences
  if (coffee.customizable && coffee.options) {
    // Flavor match
    if (coffee.options['Flavor']) {
      const matchingFlavors = coffee.options['Flavor'].filter(
        flavor => userPreference.flavors.includes(flavor)
      );
      score += matchingFlavors.length * 1.5;
    }
    
    // Milk type match
    if (coffee.options['Milk']) {
      const matchingMilk = coffee.options['Milk'].filter(
        milk => userPreference.milkTypes.includes(milk)
      );
      score += matchingMilk.length * 1.5;
    }
  }
  
  // Penalize if this coffee was recently ordered (to encourage variety)
  if (userPreference.lastOrdered.includes(coffee.id)) {
    score -= 1;
  }
  
  return score;
};

/**
 * Get personalized recommendations based on user preferences
 * @param coffees All available coffee options
 * @param userPreference User's preferences
 * @param currentCoffeeId ID of the coffee currently being viewed (to exclude from recommendations)
 * @param limit Maximum number of recommendations to return
 * @returns Array of recommended coffee options
 */
export const getPersonalizedRecommendations = (
  coffees: CoffeeOption[],
  userPreference: UserPreference = mockUserPreference,
  currentCoffeeId?: string,
  limit: number = 3
): CoffeeOption[] => {
  // Filter out the current coffee if provided
  const availableCoffees = currentCoffeeId 
    ? coffees.filter(coffee => coffee.id !== currentCoffeeId)
    : coffees;
  
  // Calculate similarity scores for each coffee
  const scoredCoffees = availableCoffees.map(coffee => ({
    coffee,
    score: calculateSimilarityScore(coffee, userPreference)
  }));
  
  // Sort by score (highest first) and take the top 'limit' results
  return scoredCoffees
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.coffee);
};

/**
 * Get "Customers who liked this also tried..." recommendations
 * Based on category and similarity of options
 */
export const getRelatedRecommendations = (
  coffees: CoffeeOption[],
  currentCoffee: CoffeeOption,
  limit: number = 3
): CoffeeOption[] => {
  // Filter out the current coffee
  const otherCoffees = coffees.filter(coffee => coffee.id !== currentCoffee.id);
  
  // Calculate similarity scores
  const scoredCoffees = otherCoffees.map(coffee => {
    let score = 0;
    
    // Same category is a strong signal
    if (coffee.category === currentCoffee.category) {
      score += 3;
    }
    
    // Similar price range
    const priceDiff = Math.abs(coffee.price - currentCoffee.price);
    if (priceDiff < 0.5) {
      score += 2;
    } else if (priceDiff < 1) {
      score += 1;
    }
    
    // Both customizable or both not customizable
    if (coffee.customizable === currentCoffee.customizable) {
      score += 1;
    }
    
    // Similar customization options
    if (coffee.customizable && currentCoffee.customizable && 
        coffee.options && currentCoffee.options) {
      const coffeeOptions = Object.keys(coffee.options);
      const currentOptions = Object.keys(currentCoffee.options);
      
      // Count matching option types
      const matchingOptions = coffeeOptions.filter(opt => currentOptions.includes(opt));
      score += matchingOptions.length * 0.5;
    }
    
    return { coffee, score };
  });
  
  // Sort by score (highest first) and take the top 'limit' results
  return scoredCoffees
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.coffee);
};
