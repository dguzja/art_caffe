/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9C2C00",    // Intense coffee/auburn
        secondary: "#F8F0E3",  // Light cream
        accent: "#FF9933",     // Vibrant orange
        background: "#FEF8EC", // Warm very light cream
        text: "#33180F",       // Deep brown
        success: "#00B57F",    // Vibrant green
        warning: "#FF6B00",    // Bright orange
        error: "#FF2F54",      // Bright red
        gold: "#FFD700",       // Gold
        bronze: "#CD7F32",     // Bronze
        surface: "#FFFAF0",    // Floral white for cards
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'Inter', 'sans-serif'],
        accent: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '2rem',
        '3xl': '3rem',
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(156, 44, 0, 0.1), 0 8px 10px -6px rgba(156, 44, 0, 0.06)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(156, 44, 0, 0.06)',
        'gold': '0 0 15px rgba(255, 215, 0, 0.5)',
        'glow': '0 0 20px rgba(255, 153, 51, 0.7)',
        'intense': '0 20px 50px -12px rgba(156, 44, 0, 0.25)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #FFD700, #FFA500)',
        'gradient-fire': 'linear-gradient(135deg, #FF6B00, #FF2F54)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
        'pattern-coffee': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF9933' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin 4s linear infinite',
        'bounce-gentle': 'bounce 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 153, 51, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 153, 51, 0.8)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.2, 0.8, 0.2, 1.4)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
