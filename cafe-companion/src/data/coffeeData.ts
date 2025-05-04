export interface CoffeeOption {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  customizable: boolean;
  options?: {
    [key: string]: string[];
  };
}

export const coffeeOptions: CoffeeOption[] = [
  {
    id: "espresso",
    name: "Espresso",
    description: "A concentrated coffee brewed by forcing hot water under pressure through finely-ground coffee beans.",
    price: 2.5,
    image: "/coffee/espresso.jpg",
    category: "Espresso",
    customizable: false
  },
  {
    id: "americano",
    name: "Americano",
    description: "Espresso diluted with hot water, similar in strength to coffee but with a different flavor.",
    price: 3.0,
    image: "/coffee/americano.jpg",
    category: "Espresso",
    customizable: true,
    options: {
      "Size": ["Small", "Medium", "Large"],
      "Strength": ["Regular", "Strong", "Extra Strong"]
    }
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and milk foam.",
    price: 3.5,
    image: "/coffee/cappuccino.jpg",
    category: "Milk-based",
    customizable: true,
    options: {
      "Size": ["Small", "Medium", "Large"],
      "Milk": ["Whole", "Skim", "Almond", "Soy", "Oat"],
      "Extras": ["Cinnamon", "Chocolate Powder", "Vanilla Syrup"]
    }
  },
  {
    id: "latte",
    name: "Latte",
    description: "Espresso with steamed milk and a small layer of milk foam.",
    price: 4.0,
    image: "/coffee/latte.jpg",
    category: "Milk-based",
    customizable: true,
    options: {
      "Size": ["Small", "Medium", "Large"],
      "Milk": ["Whole", "Skim", "Almond", "Soy", "Oat"],
      "Flavor": ["None", "Vanilla", "Caramel", "Hazelnut", "Mocha"]
    }
  },
  {
    id: "mocha",
    name: "Mocha",
    description: "A chocolate-flavored variant of a latte.",
    price: 4.5,
    image: "/coffee/mocha.jpg",
    category: "Milk-based",
    customizable: true,
    options: {
      "Size": ["Small", "Medium", "Large"],
      "Milk": ["Whole", "Skim", "Almond", "Soy", "Oat"],
      "Chocolate": ["Dark", "Milk", "White"],
      "Whipped Cream": ["Yes", "No"]
    }
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    description: "Coffee brewed with cold water over a long period, resulting in a smooth, less acidic taste.",
    price: 4.0,
    image: "/coffee/cold-brew.jpg",
    category: "Cold",
    customizable: true,
    options: {
      "Size": ["Small", "Medium", "Large"],
      "Sweetener": ["None", "Sugar", "Honey", "Syrup"],
      "Ice": ["Regular", "Light", "Extra"]
    }
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    description: "Espresso and milk served over ice.",
    price: 4.0,
    image: "/coffee/iced-latte.jpg",
    category: "Cold",
    customizable: true,
    options: {
      "Size": ["Small", "Medium", "Large"],
      "Milk": ["Whole", "Skim", "Almond", "Soy", "Oat"],
      "Flavor": ["None", "Vanilla", "Caramel", "Hazelnut"],
      "Ice": ["Regular", "Light", "Extra"]
    }
  },
  {
    id: "frappe",
    name: "Frappé",
    description: "A blended iced coffee drink with a frothy, creamy texture.",
    price: 5.0,
    image: "/coffee/frappe.jpg",
    category: "Cold",
    customizable: true,
    options: {
      "Size": ["Small", "Medium", "Large"],
      "Flavor": ["Coffee", "Mocha", "Caramel", "Vanilla"],
      "Whipped Cream": ["Yes", "No"],
      "Drizzle": ["None", "Caramel", "Chocolate", "Strawberry"]
    }
  }
];
