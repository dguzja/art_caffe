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
    image: "/images/esspresso.png",
    category: "Espresso",
    customizable: true,
    options: {
      "Size": ["Single", "Double", "Triple"],
      "Strength": ["Regular", "Strong", "Extra Strong"],
      "Temperature": ["Hot", "Extra Hot"]
    }
  },
  {
    id: "americano",
    name: "Americano",
    description: "Espresso diluted with hot water, similar in strength to coffee but with a different flavor.",
    price: 3.0,
    image: "/images/americano.png",
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
    image: "/images/cappucino.png",
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
    image: "/images/latte.png",
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
    image: "/images/mocha.png",
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
    image: "/images/coldbrew.png",
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
    image: "/images/iced-latte.png",
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
    image: "/images/frappe.png",
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
