# PasarFresh 🥬

*PasarFresh* is a modern e-commerce web application for a local wet market. It features a beautiful UI, product search, filtering, and a shopping cart experience.


# 🏗️ Architecture & Design Decisions

## Project Structure

- *Next.js App Router*: Uses the new /app directory for routing, layouts, and server/client components, enabling better code organization and performance.
- *Modular Folders*: Code is organized by feature (e.g., products, auth, components/layout, store), making it scalable and maintainable.
- *TypeScript*: Ensures type safety across the codebase, reducing runtime errors and improving developer experience.

## State Management

- *Redux Toolkit*: Chosen for global state (auth, cart) due to its scalability, devtools support, and ease of integration with React.
  - Trade-off: Slightly more boilerplate than Context API, but much better for complex state and debugging.

## Styling

- *Tailwind CSS*: Enables rapid UI development with utility classes, ensuring a consistent, responsive design.

## Forms & Validation

- *React Hook Form + Zod*: Provides performant, scalable form handling with schema-based validation.

## API Layer

- *Axios*: Used for HTTP requests, wrapped in a custom API layer (src/lib/api.ts) for easier future backend integration and error handling.
  - Trade-off: Could use fetch for smaller bundles, but Axios offers better features and interceptors.

## UI/UX Decisions

- *Modern, Responsive Design*: Inspired by leading e-commerce platforms (e.g., Shopee), with a split-screen layout for auth pages, prominent branding, and mobile-first responsiveness.
- *Component Reuse*: Layout, header, and footer components are shared across pages for consistency.
- *Sample Data*: Product and category data are mocked for now, making it easy to swap in a real API later.

## Trade-offs & Future Improvements

- *No Backend Integration Yet*: The app is API-ready but uses sample/mock data for now. This allows rapid UI prototyping and easy backend swapping later.
- *Authentication*: UI is ready, but real authentication requires backend integration.
- *Cart/Checkout*: Cart state is managed in Redux, but checkout logic is stubbed for future backend work.
- *Testing*: No automated tests yet; recommend adding unit and integration tests as the app grows.

---

## Why These Choices?

- *Next.js App Router*: Modern, flexible, and future-proof for React apps.
- *Redux Toolkit*: Best for apps that may grow in complexity.
- *Tailwind CSS*: Fast, consistent, and easy to maintain.
- *TypeScript*: Reduces bugs and improves code quality.
- *React Hook Form + Zod*: Scalable, type-safe forms.

---

This architecture balances rapid development, scalability, and maintainability, making it easy to extend PasarFresh as your needs grow.


## 🚀 Features

- *Modern UI*: Clean, responsive design with Tailwind CSS
- *Product Catalogue*: Browse, search, and filter fresh products (meat, dairy, eggs, fish, etc.)
- *Search*: Global and homepage search bars redirect to filtered product results
- *Filtering & Sorting*: Filter by category, price, and sort by name, price, rating, or newest
- *Cart*: Add products to cart (UI ready, backend integration ready)
- *Authentication*: Sign Up and Login pages (UI ready)
- *API Ready*: Easily connect to your backend API (see src/lib/api.ts)
- *TypeScript*: Full type safety for all data models
- *Mobile Friendly*: Fully responsive for all devices


## 🛠️ Tech Stack

- *Framework*: Next.js 15 (App Router)
- *Language*: TypeScript
- *Styling*: Tailwind CSS
- *State Management*: Redux Toolkit (for authentication, cart, etc.)
- *API*: Axios (with ready-to-use API layer)
- *Form Validation*: React Hook Form + Zod
- *Icons*: Lucide React


## 📦 Getting Started

### 1. Clone the repository

bash
git clone https://github.com/your-username/Ecommerce-PasarFresh.git
cd Ecommerce-PasarFresh


### 2. Install dependencies

bash
npm install


### 3. Run the development server

bash
npm run dev


Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Configuration

- *Product Images*: Place product images in the /public folder.

## 📝 Customization

- *Add new products*: Update the sample data or connect to your backend API.
- *Cart functionality*: Integrate with your backend for real cart and checkout.
- *Authentication*: Connect to your backend for real user accounts.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
