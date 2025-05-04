export interface Coffee {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  customizable: boolean;
  options?: {
    [key: string]: string[];
  };
}

export interface CartItem {
  coffee: Coffee;
  quantity: number;
  customizations?: {
    [key: string]: string;
  };
}

export interface UserPreferences {
  lastOrdered: string[];
  flavors: string[];
  milkTypes: string[];
}

export interface LoyaltyPoints {
  current: number;
  total: number;
  history: {
    date: string;
    points: number;
    reason: string;
  }[];
}

export interface GiftCard {
  id: string;
  amount: number;
  recipient: string;
  message: string;
  template: string;
}

export interface CustomizationOption {
  name: string;
  value: string;
}

export interface CustomizedCoffee {
  base: Coffee;
  options: CustomizationOption[];
} 