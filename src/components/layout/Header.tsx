'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import type { RootState } from '@/store';

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/products?search=${encodeURIComponent(search)}`);
      setSearch('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 shadow bg-green-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 h-full">
        <div className="relative h-36 w-32">
          <Image
            src="/PasarFresh.png"
            alt="PasarFresh Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>

      {/* Navigation + Search */}
      <nav className="flex items-center gap-6">
        <Link href="/" className="text-gray-600 hover:text-black">Home</Link>
        <Link href="/products" className="text-gray-600 hover:text-black">Products</Link>

        <Link href="/cart" className="text-gray-600 hover:text-black">
          <ShoppingCart />
        </Link>

        {auth.isAuthenticated ? (
          <button onClick={handleLogout} className="text-gray-600 hover:text-black">Logout</button>
        ) : (
          <>
            <Link href="/signup" className="text-gray-600 hover:text-black">Sign Up</Link>
            <Link href="/login" className="text-gray-600 hover:text-black">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
