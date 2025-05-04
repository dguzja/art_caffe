# Windows Installation Guide for Café Companion App

This guide provides step-by-step instructions for installing and running the Café Companion App on Windows systems.

## Prerequisites

Before you begin, ensure you have the following installed on your Windows machine:

1. **Node.js and npm**
   - Download the LTS version from [Node.js official website](https://nodejs.org/)
   - During installation, ensure "Automatically install the necessary tools" is checked
   - Verify installation by opening Command Prompt and typing:
     ```
     node --version
     npm --version
     ```

2. **Git**
   - Download from [Git for Windows](https://gitforwindows.org/)
   - During installation, select "Use Git from the Windows Command Prompt"
   - Verify installation by opening Command Prompt and typing:
     ```
     git --version
     ```

3. **Visual Studio Code (Recommended IDE)**
   - Download from [VS Code website](https://code.visualstudio.com/)
   - Recommended extensions:
     - ESLint
     - Prettier
     - Tailwind CSS IntelliSense

## Installation Steps

1. **Clone the Repository**
   - Open Command Prompt
   - Navigate to your desired project location:
     ```
     cd C:\path\to\your\projects\folder
     ```
   - Clone the repository:
     ```
     git clone https://github.com/gasolineeater/hackaton1_art_coffe.git
     ```
   - Navigate to the project directory:
     ```
     cd hackaton1_art_coffe
     cd cafe-companion
     ```

2. **Install Dependencies**
   - Install all required packages:
     ```
     npm install
     ```
   - This may take a few minutes depending on your internet connection

3. **Start the Development Server**
   - Run the development server:
     ```
     npm run dev
     ```
   - The terminal will display a URL (typically http://localhost:5173/)
   - Open this URL in your browser

## Troubleshooting Common Windows Issues

### Node.js Path Issues
If you encounter "node not recognized as an internal or external command":
1. Open System Properties (Right-click on This PC > Properties > Advanced system settings)
2. Click on Environment Variables
3. Under System variables, find and select PATH, then click Edit
4. Click New and add the path to your Node.js installation (typically C:\Program Files\nodejs\)
5. Click OK on all dialogs
6. Restart Command Prompt

### Port Already in Use
If port 5173 is already in use:
1. Either close the application using that port
2. Or modify the port in the Vite configuration:
   - Open `vite.config.ts`
   - Add a server section:
     ```typescript
     export default defineConfig({
       plugins: [react()],
       server: {
         port: 3000 // or any other available port
       }
     })
     ```

### Long Path Issues
Windows has path length limitations. If you encounter issues:
1. Enable long paths in Git:
   ```
   git config --system core.longpaths true
   ```
2. Enable long paths in Windows (requires admin rights):
   - Open Registry Editor (regedit)
   - Navigate to `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem`
   - Set `LongPathsEnabled` to `1`
   - Restart your computer

## Using the Application

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

## Development Tips for Windows

### Using Git Bash
For a more Linux-like experience, you can use Git Bash (installed with Git for Windows):
1. Right-click in your project folder and select "Git Bash Here"
2. Use Linux-style commands in this terminal

### Windows Subsystem for Linux (WSL)
For advanced users, consider using WSL for development:
1. Install WSL by following [Microsoft's guide](https://docs.microsoft.com/en-us/windows/wsl/install)
2. Install Node.js within your Linux distribution
3. Clone and run the project from within WSL

### Performance Optimization
To improve development performance on Windows:
1. Exclude the project folder from Windows Defender scans
2. Use an SSD for development if possible
3. Close unnecessary applications while running the development server

## Building for Production

To create a production build:
1. Run the build command:
   ```
   npm run build
   ```
2. The output will be in the `dist` folder
3. To preview the production build locally:
   ```
   npm run preview
   ```

## Need Help?

If you encounter any Windows-specific issues not covered in this guide:
1. Check the project's GitHub issues
2. Search for the error message online
3. Reach out to the team through the project's communication channels
