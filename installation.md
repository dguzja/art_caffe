# Installation and Usage Guide

This document provides instructions for installing and using the Café Companion App.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:gasolineeater/hackaton1_art_coffe.git
   cd cafe-companion
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage Guide

### Browsing the Menu
1. Click on "Menu" in the navigation bar to view all available coffee options
2. Use the category filters to narrow down your selection
3. Click on any coffee item to view details and customization options

### Customizing Orders
1. From the menu, click on a coffee item to open the details modal
2. Select your preferred options (size, milk type, flavors, etc.)
3. Click "Add to Cart" to add the customized item to your cart

### Using the Shopping Cart
1. Click the cart icon in the top right corner to view your cart
2. Adjust quantities using the + and - buttons
3. Remove items by clicking the X button
4. View the cost breakdown including subtotal, tax, and total
5. Click "Checkout" to proceed with your order

### Table-side Ordering
1. Navigate to "Scan & Order" in the navigation bar
2. Scan the QR code on your table or enter your table number manually
3. Browse the menu and add items to your order
4. Add any special instructions if needed
5. Click "Add to Cart" to add all items to your cart

### Sending Gift Cards
1. Navigate to "Gift Cards" in the navigation bar
2. Select a gift card design
3. Choose an amount
4. Enter recipient details and a personal message
5. Click "Send Gift Card" to complete the process

### Using the Loyalty Program
1. Navigate to "Loyalty" in the navigation bar
2. View your current points balance
3. Browse available rewards
4. Click "Redeem" on a reward to use your points

## Project Structure

```
cafe-companion/
├── public/              # Static files
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context for state management
│   ├── data/            # Mock data for development
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API and service functions
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
├── README.md            # Project documentation
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Development Workflow

1. **Feature Branches**: Create a new branch for each feature you're working on
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Commit Messages**: Use clear, descriptive commit messages
   ```bash
   git commit -m "Add: feature description"
   ```

3. **Pull Requests**: Create a pull request when your feature is ready for review

## Available Features

1. **Digital Gift Cards**
   - Send digital gift cards to friends and family
   - Include personalized messages
   - Easy redemption process in-store or online

2. **Custom Coffee Ordering**
   - Customize coffee orders with various options
   - Browse the full café menu
   - Place orders for pickup or table delivery
   - Receive notifications when orders are ready

3. **Loyalty Program**
   - Point-based system for purchases
   - Track points and available rewards
   - Redeem points for free items

4. **Table-side Ordering via QR Codes**
   - Scan QR code on the table
   - View menu and place orders directly
   - No waiting in line required

5. **Shopping Cart**
   - Add items from any page in the application
   - Customize orders before adding to cart
   - View detailed cost breakdown including tax
   - Modify quantities or remove items

6. **AI-based Recommendations**
   - Get personalized coffee recommendations based on preferences
   - "Customers who liked this also tried..." suggestions
   - Recommendations adapt based on browsing and order history

## Technical Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Backend**: Firebase/Supabase (TBD)
- **Authentication**: Firebase Auth/Supabase Auth (TBD)

## Design Guidelines

- **Color Palette**:
  - Primary: #4A2C2A (Coffee Brown)
  - Secondary: #D4A76A (Latte)
  - Accent: #8C6B4F (Mocha)
  - Background: #FAF7F2 (Cream)
  - Text: #2D2926 (Dark Roast)

- **Typography**:
  - Headings: Poppins
  - Body: Inter
