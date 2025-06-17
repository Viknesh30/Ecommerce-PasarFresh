'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';

const schema = z.object({
  search: z.string().min(1, 'Search cannot be empty'),
});

export default function Home() {
  const dispatch = useDispatch(); // ready for future use
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: { search: string }) => {
    console.log('Search:', data.search);
    // Future: dispatch search action or call API
  };

  useEffect(() => {
    // Example API call
    axios.get('/api/featured-products').then((res) => {
      console.log('Featured products:', res.data);
    });
  }, []);

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


      {/* Product Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div key={id} className="border rounded-lg overflow-hidden shadow-sm">
              <Image
                src="/placeholder-product.png"
                alt={`Product ${id}`}
                width={400}
                height={300}
                className="object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">Product {id}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Short product description.
                </p>
                <span className="text-xl font-bold block mb-3">$19.99</span>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
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
