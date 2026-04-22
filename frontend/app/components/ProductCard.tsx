'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {

  // first variant image for card preview
  const previewImage = product.variants?.[0]?.images?.[0] || "/placeholder.png";

  // extract colors from variants
  const colors = product.variants?.map(v => v.color) || [];

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">

        {/* Image */}
        <div className="relative overflow-hidden bg-linear-to-br from-blue-50 to-purple-50">
          <Image
            src={previewImage}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5">

          {/* <div className="text-sm text-purple-500 font-medium">
            {product.category}
          </div> */}

          <h3 className="text-lg font-bold text-gray-800 mt-1 line-clamp-2">
            {product.name}
          </h3>
{/* 
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {product.description}
          </p> */}

          {/* Material & Sizes */}


          {/* Colors */}
          <div className="flex gap-1 mt-3 flex-wrap">
            {colors.map((color, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 px-2 py-1 rounded"
              >
                {color}
              </span>
            ))}
          </div>

          {/* Price + Button */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <span className="text-xl font-bold text-[#ee6d49]">
              ${product.price.toFixed(2)}
            </span>

            <button className="bg-[#ee6d49] text-white px-4 py-2 rounded-lg hover:bg-[#ed572e] transition-all flex items-center gap-1 text-sm font-medium shadow-md hover:shadow-lg">
              View Details
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;