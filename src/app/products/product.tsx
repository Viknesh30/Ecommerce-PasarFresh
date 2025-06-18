'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShoppingCart, Star, Filter, Search, Grid, List } from 'lucide-react';
import { productsAPI } from '@/lib/api';
import { Product, ProductFilters } from '@/types';

// Sample categories for now
const categories = [
  { id: 'meat', name: 'Meat', slug: 'meat' },
  { id: 'dairy', name: 'Dairy', slug: 'dairy' },
  { id: 'eggs', name: 'Eggs', slug: 'eggs' },
  { id: 'fish', name: 'Fish', slug: 'fish' },
];

// Sample products for now (replace with API call later)
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Chicken',
    description: 'Locally sourced, hormone-free chicken.',
    price: 16.00,
    category: 'meat',
    stock: 50,
    images: ['/chicken.png'],
    rating: 4.5,
    reviewCount: 12,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Organic Eggs',
    description: 'Farm fresh organic eggs.',
    price: 6.50,
    category: 'eggs',
    stock: 100,
    images: ['/eggs.jpg'],
    rating: 4.8,
    reviewCount: 25,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Fresh Fish',
    description: 'Fresh fish from the sea.',
    price: 15.00,
    category: 'fish',
    stock: 30,
    images: ['/fish.jpg'],
    rating: 4.3,
    reviewCount: 8,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '4',
    name: 'Fresh Goat Meat',
    description: 'Fresh goat meat from the farm.',
    price: 20.00,
    category: 'meat',
    stock: 25,
    images: ['/goat.png'],
    rating: 4.6,
    reviewCount: 15,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '5',
    name: 'Fresh Duck Meat',
    description: 'Fresh duck meat from the farm.',
    price: 25.00,
    category: 'meat',
    stock: 20,
    images: ['/duck.jpg'],
    rating: 4.4,
    reviewCount: 10,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '6',
    name: 'Fresh Goat Milk',
    description: 'Fresh goat milk from the farm.',
    price: 10.00,
    category: 'dairy',
    stock: 40,
    images: ['/goatmilk.jpg'],
    rating: 4.7,
    reviewCount: 18,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '7',
    name: 'Fresh Cow Milk',
    description: 'Fresh cow milk from the farm.',
    price: 10.00,
    category: 'dairy',
    stock: 60,
    images: ['/cowmilk.jpg'],
    rating: 4.5,
    reviewCount: 22,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '8',
    name: 'Fresh Cow Meat',
    description: 'Fresh cow meat from the farm.',
    price: 20.00,
    category: 'meat',
    stock: 35,
    images: ['/beef.jpg'],
    rating: 4.6,
    reviewCount: 16,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
];

export default function ProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'newest');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Load products from API (commented out for now since we're using sample data)
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Uncomment when API is ready:
        // const response = await productsAPI.getAll({
        //   search: searchQuery,
        //   category: selectedCategory,
        //   minPrice: priceRange.min ? Number(priceRange.min) : undefined,
        //   maxPrice: priceRange.max ? Number(priceRange.max) : undefined,
        //   sortBy: sortBy as any,
        //   sortOrder,
        // });
        // setProducts(response.data.data);
        
        // For now, use sample data
        setProducts(sampleProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchQuery, selectedCategory, priceRange, sortBy, sortOrder]);

  // Filter products based on current filters
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    if (priceRange.min) {
      filtered = filtered.filter(product => product.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => product.price <= Number(priceRange.max));
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'newest':
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange, sortBy, sortOrder]);

  const handleAddToCart = (productId: string) => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', productId);
  };

  const updateURL = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });
    router.push(`/products?${newSearchParams.toString()}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    updateURL({ search: query });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateURL({ category });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateURL({ sortBy: sort });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Our Products</h1>
        <p className="text-gray-600">Fresh, local, and high-quality products from trusted farmers</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="newest">Newest</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>

          {/* Sort Order */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>

          {/* View Mode */}
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white'}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white'}`}
            >
              <List size={18} />
            </button>
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Products Grid/List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
        }>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Product Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'h-48'}`}>
                <Image
                  src={product.images[0] || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600 ml-1">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price and Stock */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-green-600">
                    RM {product.price.toFixed(2)}
                  </span>
                  <span className={`text-sm ${
                    product.stock > 10 ? 'text-green-600' : 
                    product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {product.stock > 10 ? 'In Stock' : 
                     product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product.id)}
                  disabled={product.stock === 0}
                  className="w-full bg-green-50 text-black py-2 px-4 rounded-lg hover:bg-green-100 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 