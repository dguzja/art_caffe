import React, { useState } from 'react';

const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Define coffee categories
  const categories = ["Espresso", "Milk-based", "Cold"];
  
  // Filter coffees based on selected category
  const getCoffeesForCategory = (category: string | null) => {
    if (!category) return allCoffees;
    return allCoffees.filter(coffee => coffee.category === category);
  };

  // Define all coffees
  const allCoffees = [
    {
      id: "espresso",
      name: "Espresso",
      description: "A concentrated coffee brewed by forcing hot water under pressure through finely-ground coffee beans.",
      price: 2.50,
      category: "Espresso"
    },
    {
      id: "americano",
      name: "Americano",
      description: "Espresso diluted with hot water, similar in strength to coffee but with a different flavor.",
      price: 3.00,
      category: "Espresso"
    },
    {
      id: "cappuccino",
      name: "Cappuccino",
      description: "Equal parts espresso, steamed milk, and milk foam.",
      price: 3.50,
      category: "Milk-based"
    },
    {
      id: "latte",
      name: "Latte",
      description: "Espresso with steamed milk and a small layer of milk foam.",
      price: 4.00,
      category: "Milk-based"
    },
    {
      id: "mocha",
      name: "Mocha",
      description: "A chocolate-flavored variant of a latte.",
      price: 4.50,
      category: "Milk-based"
    },
    {
      id: "cold-brew",
      name: "Cold Brew",
      description: "Coffee brewed with cold water over a long period, resulting in a smooth, less acidic taste.",
      price: 4.00,
      category: "Cold"
    },
    {
      id: "iced-latte",
      name: "Iced Latte",
      description: "Espresso and milk served over ice.",
      price: 4.00,
      category: "Cold"
    },
    {
      id: "frappe",
      name: "Frappé",
      description: "A blended iced coffee drink with a frothy, creamy texture.",
      price: 5.00,
      category: "Cold"
    }
  ];
  
  // Define recommended coffees (could be based on popularity or any other criteria)
  const recommendedCoffees = [
    {
      id: "cappuccino",
      name: "Cappuccino",
      description: "Equal parts espresso, steamed milk, and milk foam.",
      price: 3.50,
      category: "Milk-based"
    },
    {
      id: "mocha",
      name: "Mocha",
      description: "A chocolate-flavored variant of a latte.",
      price: 4.50,
      category: "Milk-based"
    },
    {
      id: "cold-brew",
      name: "Cold Brew",
      description: "Coffee brewed with cold water over a long period, resulting in a smooth, less acidic taste.",
      price: 4.00,
      category: "Cold"
    }
  ];
  
  // Get filtered coffees based on selected category
  const filteredCoffees = getCoffeesForCategory(selectedCategory);
  
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-primary drop-shadow-lg tracking-tight">
        Our Coffee Menu
      </h1>
      <div className="w-24 h-2 mx-auto mb-12 rounded-full" style={{background: 'linear-gradient(90deg, #d9a066 40%, #7b4b28 100%)'}}></div>
      
      {/* Category filters */}
      <div className="category-filter bg-secondary shadow-lg rounded-full px-4 py-3 mb-12 flex flex-wrap justify-center gap-4 border-b-4 border-accent">
        <button
          className={`category-button px-4 py-2 rounded-full text-lg font-semibold shadow-md ${
            selectedCategory === null
              ? 'bg-accent text-white'
              : 'bg-white/50 text-primary hover:bg-accent/20'
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`category-button px-4 py-2 rounded-full text-lg font-semibold shadow-md ${
              selectedCategory === category
                ? 'bg-accent text-white'
                : 'bg-white/50 text-primary hover:bg-accent/20'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Recommended Section - only show when no category is selected */}
      {!selectedCategory && (
        <section className="recommendation-section mb-16 bg-secondary rounded-2xl shadow-lg px-6 py-8">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">Recommended For You</h2>
            <div className="ml-3 px-3 py-1 bg-accent text-white text-sm rounded-full shadow-md font-semibold">
              AI Powered
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCoffees.map(coffee => (
              <div key={coffee.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-accent/10 hover:shadow-xl transition duration-300">
                <div className="p-4 bg-accent/5 flex items-center justify-center text-7xl">
                  ☕
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-primary mb-2">{coffee.name}</h3>
                    <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-medium">
                      {coffee.category}
                    </span>
                  </div>
                  <p className="text-secondary text-sm mb-4 line-clamp-2">{coffee.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-accent font-bold">${coffee.price.toFixed(2)}</span>
                    <button 
                      className="px-3 py-1 bg-primary hover:bg-accent text-white rounded-md text-sm font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* All Coffees Section */}
      <section className="coffee-grid mb-16">
        <h2 className="text-2xl font-bold mb-6 text-primary">
          {selectedCategory ? `${selectedCategory} Coffees` : 'All Coffees'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCoffees.map(coffee => (
            <div key={coffee.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-accent/10 hover:shadow-xl transition duration-300">
              <div className="p-4 bg-accent/5 flex items-center justify-center text-7xl">
                ☕
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-primary mb-2">{coffee.name}</h3>
                  <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-medium">
                    {coffee.category}
                  </span>
                </div>
                <p className="text-secondary text-sm mb-4 line-clamp-2">{coffee.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-accent font-bold">${coffee.price.toFixed(2)}</span>
                  <button 
                    className="px-3 py-1 bg-primary hover:bg-accent text-white rounded-md text-sm font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
