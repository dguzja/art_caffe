# Café Companion App - Art Coffee Hackathon Project

## Project Overview

This project is our submission for the Art Coffee challenge at the Junction Hackathon. We're building a digital café companion app that enhances the customer experience through technology.

### Challenge Description

The Art Coffee challenge asks us to reimagine how people interact with their favorite café through technology. We're building a Digital Café Companion App that enhances the end-to-end customer experience, from ordering and loyalty to gifting and table service.

## Core Features

Our app aims to implement the following key features:

1. **🎁 Digital Gift Cards**
   - Send digital gift cards to friends and family
   - Include personalized messages
   - Easy redemption process in-store or online

2. **☕ Custom Coffee Ordering**
   - Customize coffee orders with various options
   - Browse the full café menu
   - Place orders for pickup or table delivery
   - Receive notifications when orders are ready

3. **🎯 Loyalty Program**
   - Point-based system for purchases
   - Track points and available rewards
   - Redeem points for free items

4. **📱 Table-side Ordering via QR Codes**
   - Scan QR code on the table
   - View menu and place orders directly
   - No waiting in line required

5. **🛒 Shopping Cart**
   - Add items from any page in the application
   - Customize orders before adding to cart
   - View detailed cost breakdown including tax
   - Modify quantities or remove items

6. **🤖 AI-based Recommendations**
   - Get personalized coffee recommendations based on preferences
   - "Customers who liked this also tried..." suggestions
   - Recommendations adapt based on browsing and order history

## Technical Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Backend**: Firebase/Supabase (TBD)
- **Authentication**: Firebase Auth/Supabase Auth (TBD)

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

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
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

## Roadmap

### Day 1
- Set up project structure
- Implement basic UI components
- Create mock data
- Build the custom ordering interface

### Day 2
- Implement loyalty program functionality
- Add gift card sending feature
- Create QR code scanning for table ordering
- Connect to backend services

### Day 3
- Polish UI/UX
- Add animations and transitions
- Implement any bonus features
- Prepare presentation



## Judging Criteria

Our project will be judged on:
- Innovative ideas and business value
- System design and architecture
- Implementation of core functionalities
- User-friendly UI/UX
- Teamwork

## License

This project is created for the Junction Hackathon and is not licensed for commercial use.
