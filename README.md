# PasarFresh 🥬

**PasarFresh** is a modern e-commerce web application for a local wet market. It features a beautiful UI, product search, filtering, and a shopping cart experience.


## 🚀 Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Product Catalog**: Browse, search, and filter fresh products (meat, dairy, eggs, fish, etc.)
- **Search**: Global and homepage search bars redirect to filtered product results
- **Filtering & Sorting**: Filter by category, price, and sort by name, price, rating, or newest
- **Cart**: Add products to cart (UI ready, backend integration ready)
- **Authentication**: Sign Up and Login pages (UI ready)
- **API Ready**: Easily connect to your backend API (see `src/lib/api.ts`)
- **TypeScript**: Full type safety for all data models
- **Mobile Friendly**: Fully responsive for all devices


## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit (for authentication, cart, etc.)
- **API**: Axios (with ready-to-use API layer)
- **Form Validation**: React Hook Form + Zod
- **Icons**: Lucide React


## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Ecommerce-PasarFresh.git
cd Ecommerce-PasarFresh
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Configuration

- **API Base URL**: Set `NEXT_PUBLIC_API_URL` in your environment to point to your backend API (default: `http://localhost:5000/api`).
- **Product Images**: Place product images in the `/public` folder.

## 📝 Customization

- **Add new products**: Update the sample data or connect to your backend API.
- **Cart functionality**: Integrate with your backend for real cart and checkout.
- **Authentication**: Connect to your backend for real user accounts.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)


