export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  image: string;
}

export const loyaltyRewards: LoyaltyReward[] = [
  {
    id: "free-coffee",
    name: "Free Coffee",
    description: "Redeem for any small coffee of your choice.",
    pointsRequired: 50,
    image: "/rewards/free-coffee.jpg"
  },
  {
    id: "free-pastry",
    name: "Free Pastry",
    description: "Redeem for any pastry from our bakery selection.",
    pointsRequired: 75,
    image: "/rewards/free-pastry.jpg"
  },
  {
    id: "size-upgrade",
    name: "Size Upgrade",
    description: "Upgrade any drink to the next size for free.",
    pointsRequired: 30,
    image: "/rewards/size-upgrade.jpg"
  },
  {
    id: "flavor-shot",
    name: "Free Flavor Shot",
    description: "Add any flavor shot to your drink for free.",
    pointsRequired: 20,
    image: "/rewards/flavor-shot.jpg"
  },
  {
    id: "specialty-drink",
    name: "Free Specialty Drink",
    description: "Redeem for any specialty drink of your choice.",
    pointsRequired: 100,
    image: "/rewards/specialty-drink.jpg"
  },
  {
    id: "coffee-beans",
    name: "Bag of Coffee Beans",
    description: "Redeem for a 250g bag of our signature coffee beans.",
    pointsRequired: 200,
    image: "/rewards/coffee-beans.jpg"
  }
];
