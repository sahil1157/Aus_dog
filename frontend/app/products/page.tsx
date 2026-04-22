'use client';
import React, { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '@/data/products';
import type { Product } from '@/data/products';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Dog Collars Collection</h1>
        
        {/* Search */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="Search dog collars..."
className="w-full max-w-lg mx-auto block px-6 py-4 border-2 border-gray-200 rounded-xl shadow-lg focus:outline-none focus:border-[#ff9167] focus:ring-4 focus:ring-orange-100 transition-all"            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ✅ Grid goes HERE - ProductCard renders SINGLE card */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No dog collars found matching {searchTerm}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
