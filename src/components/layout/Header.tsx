'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [search, setSearch] = useState('');

  return (
    <header className="h-16 flex items-center justify-between px-6 shadow bg-white">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 h-full">
        <div className="relative h-40 w-34">
          <Image
            src="/PasarFresh.png"
            alt="PasarFresh Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </Link>

      {/* Navigation + Search */}
      <nav className="flex items-center gap-6">
        <Link href="/" className="text-gray-600 hover:text-black">Home</Link>
        <Link href="/products" className="text-gray-600 hover:text-black">Products</Link>

        <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />


        <Link href="/cart" className="text-gray-600 hover:text-black">
          <ShoppingCart />
        </Link>

        <Link href="/signup" className="text-gray-600 hover:text-black">Sign Up</Link>
        <Link href="/login" className="text-gray-600 hover:text-black">Login</Link>
      </nav>
    </header>
  );
}
