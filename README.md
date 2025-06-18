# PasarFresh 🥬

*PasarFresh* is a modern e-commerce web application for a local wet market. It features a beautiful UI, product search, filtering, a shopping cart experience, and mock authentication—all running fully in the browser with localStorage.

---

## 🏗️ Architecture & Design Decisions

### Project Structure
- *Next.js App Router*: Uses the /app directory for routing, layouts, and server/client components, enabling modular, scalable code.
- *Redux Toolkit*: Manages global state for cart and authentication, with localStorage persistence for both.
- *TypeScript*: Ensures type safety and reduces runtime errors.
- *Tailwind CSS*: Provides a utility-first, responsive, and consistent design system.
- *Component-based*: Layout, header, and footer are shared across pages for consistency.

### Mock Data & Persistence
- *Mock Authentication*: Sign up and login are handled entirely in the browser using localStorage. User data is stored and checked locally, with Redux state reflecting the current session.
- *Cart Persistence*: Cart state is saved to localStorage and restored on page reload, ensuring a seamless shopping experience.
- *No Backend Required*: All data (products, users, cart) is managed in the browser, making the app easy to demo, test, and extend.

### UI/UX Features
- *Modern, Responsive Design*: Inspired by leading e-commerce platforms, with a split-screen layout for auth pages and a clean, mobile-friendly product catalogue.
- *Pagination*: Product lists are paginated for better usability, even with large mock datasets.
- *Out-of-Stock Handling*: Products with zero stock are clearly labelled and cannot be added to the cart.
- *Navigation*: After login/signup, users are redirected to the homepage. Logout is available in the header when logged in and redirects to the login page.
- *Form Validation*: All forms use Zod schemas for robust, type-safe validation.

### Trade-offs & Rationale
- *Frontend-Only*: No backend/API is required, making the app easy to run anywhere and ideal for prototyping or UI/UX testing.
- *LocalStorage for Auth/Cart*: Chosen for simplicity and demo purposes; not secure for production, but perfect for mock/demo apps.
- *Redux vs. Context*: Redux is used for its devtools, scalability, and ease of state persistence, even though Context could suffice for smaller apps.
- *No Real Security*: All authentication is mock and for demonstration only.

---

## 🚀 Features

- *Modern UI*: Clean, responsive design with Tailwind CSS
- *Product Catalogue*: Browse, search, and filter fresh products (meat, dairy, eggs, fish, etc.)
- *Search*: Global and homepage search bars redirect to filtered product results
- *Filtering & Sorting*: Filter by category, price, and sort by name, price, rating, or newest
- *Pagination*: Product lists are paginated for better UX
- *Cart*: Add products to cart (with localStorage persistence)
- *Authentication*: Sign Up, Login, and Logout (mock, with localStorage persistence)
- *Out-of-Stock Handling*: Disabled Add to Cart and clear labels for out-of-stock products
- *TypeScript*: Full type safety for all data models
- *Mobile Friendly*: Fully responsive for all devices

---

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

- *API Base URL*: Not required for mock/demo mode.
- *Product Images*: Place product images in the /public folder.

## 📝 Customization

- *Add new products*: Update the sample data in the code.
- *Cart functionality*: Already integrated with localStorage.
- *Authentication*: Fully mockable, can be extended for real backend integration.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
