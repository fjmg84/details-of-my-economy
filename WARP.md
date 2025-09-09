# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a personal finance tracking application built with **Astro**, TypeScript, and Tailwind CSS. The app allows users to track income and expenses, view financial summaries, and visualize data with charts. All data is stored locally in the browser's localStorage.

## Development Commands

All commands should be run from the project root:

```bash
# Install dependencies
npm install

# Start development server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro [command]

# Get help with Astro CLI
npm run astro -- --help
```

## Architecture and Code Structure

### Core Architecture
- **Frontend Framework**: Astro with TypeScript
- **Styling**: Tailwind CSS with custom utility classes
- **State Management**: Browser localStorage with custom event system
- **Charts**: Chart.js for data visualization
- **Notifications**: Toastify.js for user feedback

### Key Directories
```
src/
├── components/     # Reusable Astro components
├── layouts/        # Layout components (base and dashboard)
├── pages/          # File-based routing (index + dashboard pages)
├── types/          # TypeScript type definitions
├── utils/          # Utility functions and helpers
├── styles/         # Global CSS and Tailwind configuration
└── assets/         # Static assets (SVGs, images)
```

### Data Model
The application centers around `Transaction` objects defined in `src/types/finance.ts`:
- Transactions have `id`, `description`, `amount`, `type` (income/expense), `category`, `date`, and `createdAt`
- Categories are predefined in `src/utils/config.ts` with colors for visualization
- All data persists in localStorage via `src/utils/storage.ts`

### Component Architecture
- **Layouts**: `Layout.astro` (base) and `Layout.Dashboard.astro` (with navigation and totals)
- **Forms**: `FinanceForm.astro` handles transaction creation with client-side validation
- **Lists**: Components in `ListView.astro/` directory display transactions by type
- **Charts**: `FinanceCharts.astro` renders Chart.js visualizations
- **Navigation**: `Nav.astro` provides dashboard navigation between sections

### State Management Pattern
The app uses a custom event-driven pattern:
1. Components modify localStorage directly via `storage.ts` utilities
2. Changes dispatch `transactionsUpdated` custom events
3. Other components listen for these events to update their displays
4. This pattern is defined in `EVENT_NAME.TRANSACTIONS_UPDATED` constant

### Path Aliases
TypeScript path mapping is configured for:
- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`

### Utility Functions
Key utilities in `src/utils/`:
- `lib.ts`: Currency formatting, date handling, transaction calculations
- `chart.ts`: Chart.js configuration and rendering helpers
- `config.ts`: Categories, colors, constants, and event names
- `storage.ts`: localStorage interface for transactions

### Styling System
- Tailwind CSS with custom utility classes defined in `src/styles/global.css`
- Custom components: `.btn`, `.btn-primary`, `.card`, `.form-input`, `.form-label`
- Color scheme uses indigo primary, gray secondary, with success/danger variants
- Responsive design with mobile-first approach

## Development Patterns

### Adding New Transaction Types
1. Update `TransactionType` union in `src/types/finance.ts`
2. Add categories to `Categories` object in `src/utils/config.ts`
3. Add colors to `categoryConfig` in same file
4. Update form options in `FinanceForm.astro`

### Creating New Pages
1. Add `.astro` files to `src/pages/` or `src/pages/dashboard/`
2. Use `Layout.Dashboard.astro` for dashboard pages with navigation
3. Dashboard pages automatically include financial totals header

### Working with Charts
- Charts use Chart.js via the `generateChart` utility in `src/utils/chart.ts`
- Chart components should manage their own chart instances with proper cleanup
- Use category colors from `categoryConfig` for consistent styling

### Event System
When modifying transaction data:
1. Update localStorage via `setTransactions()`
2. Dispatch custom event: `window.dispatchEvent(new CustomEvent(EVENT_NAME.TRANSACTIONS_UPDATED))`
3. Components listen with `addEventListener(EVENT_NAME.TRANSACTIONS_UPDATED, handler)`
