'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const schema = z.object({
  search: z.string().min(1, 'Search cannot be empty'),
});

const products = [
  {
    id: 1,
    name: "Fresh Chicken",
    description: "Locally sourced, hormone-free chicken.",
    price: 16.00,
    image: "/chicken.png"
  },
  {
    id: 2,
    name: "Organic Eggs",
    description: "Farm fresh organic eggs.",
    price: 6.50,
    image: "/eggs.jpg"
  },
  {
    id: 3,
    name: "Fresh Fish",
    description: "Fresh fish from the sea.",
    price: 15.00,
    image: "/fish.jpg"
  },
  {
    id: 4,
    name: "Fresh Goat Meat",
    description: "Fresh goat meat from the farm.",
    price: 20.00,
    image: "/goat.png"
  },
  {
    id: 5,
    name: "Fresh Duck Meat",
    description: "Fresh duck meat from the farm.",
    price: 25.00,
    image: "/duck.jpg"
  },
  {
    id: 6,
    name: "Fresh Goat Milk",
    description: "Fresh goat milk from the farm.",
    price: 10.00,
    image: "/goatmilk.jpg"
  },
  {
    id: 7,
    name: "Fresh Cow Milk",
    description: "Fresh cow milk from the farm.",
    price: 10.00,
    image: "/cowmilk.jpg"
  },
  { 
    id: 8,
    name: "Fresh Cow Meat",
    description: "Fresh cow meat from the farm.",
    price: 20.00,
    image: "/beef.jpg"
  },
  
];

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch(); // ready for future use
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: { search: string }) => {
    if (data.search.trim()) {
      router.push(`/products?search=${encodeURIComponent(data.search)}`);
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-6">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">PasarFresh</h1>
        <p className="text-gray-600 mb-2">
          Your trusted wet market online — daging, susu, dan telur dari ladang tempatan.
        </p>
        <p className="text-gray-500 mb-5 text-sm italic">
          Supporting local farmers. Menghantar kesegaran ke pintu rumah anda.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          <ShoppingCart size={18} />
          Shop Now
        </Link>
      </section>

      {/* Search Bar */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 max-w-xl mx-auto">
        <input
          {...register('search')}
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
        {errors.search && (
          <p className="text-red-500 text-sm mt-1">{errors.search.message as string}</p>
        )}
      </form>

      {/* Product Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm flex flex-col h-[460px] w-[280px] mx-auto">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={200}
                className="object-cover w-full h-[200px]"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 flex-grow">{product.description}</p>
                <span className="text-xl font-bold block mb-3">RM{product.price.toFixed(2)}</span>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-auto">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
