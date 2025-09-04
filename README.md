# Calendar Application

A modern, interactive calendar application built with React, TypeScript, and Vite. This application features a beautiful UI with journal functionality, month navigation, and responsive design.

## Features

- 📅 Interactive calendar interface
- 📝 Journal entry management
- 🎨 Modern, responsive UI design
- 🔄 Month navigation
- 💾 Local data persistence
- 📱 Mobile-friendly design

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **State Management**: React Context API

## Project Structure

```
calendar/
├── dist/                          # Build output directory
├── node_modules/                  # Dependencies
├── public/                        # Static assets
│   └── vite.svg
├── src/                           # Source code
│   ├── assets/                    # Static assets
│   │   └── react.svg
│   ├── components/                # React components
│   │   ├── card/                  # Card-related components
│   │   │   ├── carousel.tsx       # Image carousel component
│   │   │   ├── journal-card-month.tsx  # Monthly journal card
│   │   │   └── month-card.tsx     # Month display card
│   │   ├── sections/              # Page sections
│   │   │   ├── add-journal.tsx    # Journal creation form
│   │   │   ├── header.tsx         # Application header
│   │   │   └── journal-dialog.tsx # Journal dialog/modal
│   │   └── ui/                    # Reusable UI components
│   │       ├── button.tsx         # Button component
│   │       ├── dialog.tsx         # Dialog component
│   │       ├── input.tsx          # Input field component
│   │       ├── label.tsx          # Label component
│   │       └── textarea.tsx       # Textarea component
│   ├── contexts/                  # React contexts
│   │   └── calendar-context.ts    # Calendar state management
│   ├── lib/                       # Utility libraries
│   │   └── utils.ts               # General utilities
│   ├── providers/                 # Context providers
│   │   └── calendar-context-provider.tsx  # Calendar context provider
│   ├── types/                     # TypeScript type definitions
│   │   └── global.d.ts            # Global type declarations
│   ├── util/                      # Utility functions
│   │   ├── date.ts                # Date manipulation utilities
│   │   └── journalEntries.ts      # Journal entry utilities
│   ├── App.css                    # Main application styles
│   ├── App.tsx                    # Main application component
│   ├── index.css                  # Global styles
│   ├── main.tsx                   # Application entry point
│   └── vite-env.d.ts              # Vite environment types
├── .eslintrc.js                   # ESLint configuration
├── index.html                     # HTML template
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json              # App-specific TypeScript config
├── tsconfig.node.json             # Node-specific TypeScript config
└── vite.config.ts                 # Vite build configuration
```

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd calendar
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running Locally

### Development Mode

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is occupied).

### Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Development

The project uses:

- **Vite** for fast development and building
- **TypeScript** for type safety
- **ESLint** for code quality
- **Tailwind CSS** for styling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
