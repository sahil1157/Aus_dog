"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const { addToCart } = useCart();

  const [activeVariant, setActiveVariant] = useState(product.variants[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  // Material options - since product has single material, we'll make it clickable for future flexibility
  // You can modify this array if you want multiple material options
  const materialOptions = [product.material];

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="md:grid md:grid-cols-2 gap-8">
            {/* IMAGE SECTION */}
            <div className="p-6">
              <div className="relative w-full h-96 bg-gray-100 rounded-md overflow-hidden mb-4">
                <Image
                  src={activeVariant.images[activeImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* thumbnails */}
              {activeVariant.images.length > 1 && (
                <div className="flex gap-2">
                  {activeVariant.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`border-2 rounded ${
                        i === activeImageIndex
                          ? "border-[#ff9167]"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="p-8 space-y-6">
              <span className="bg-purple-100 text-[#ff9167] px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>

              <h1 className="text-3xl font-extrabold">{product.name}</h1>

              <p className="text-3xl font-bold text-[#df6839]">
                ${product.price.toFixed(2)}
              </p>

              {/* COLOR SELECTOR */}
              <div>
                <h3 className="font-semibold mb-2">Colors</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveVariant(variant);
                        setActiveImageIndex(0);
                      }}
                      className={`px-3 py-1 border rounded-md ${
                        activeVariant.color === variant.color
                          ? "border-[#ff9167] bg-purple-100"
                          : "border-gray-300"
                      }`}
                    >
                      {variant.color}
                    </button>
                  ))}
                </div>
              </div>

              {/* MATERIAL SELECTOR - Clickable */}
              <div>
                <h3 className="font-semibold mb-2">Material</h3>
                <div className="flex gap-2 flex-wrap">
                  {materialOptions.map((material, index) => (
                    <button
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-md border border-gray-300"
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIZE SELECTOR - Clickable */}
              <div>
                <h3 className="font-semibold mb-2">Sizes</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 border rounded-md transition ${
                        selectedSize === size
                          ? "border-[#ff9167] bg-purple-100 text-[#ff9167] font-semibold"
                          : "border-gray-300 hover:border-[#ff9167]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-lg">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div>
                <h2 className="font-semibold text-lg">Features</h2>
                <ul className="list-disc list-inside space-y-1">
                  {product.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Selected Options Summary */}
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p className="font-semibold mb-1">Selected Options:</p>
                <p>
                  Color:{" "}
                  <span className="font-medium">{activeVariant.color}</span>
                </p>
                <p>
                  Material:{" "}
                  <span className="font-medium">{product.material}</span>
                </p>
                <p>
                  Size: <span className="font-medium">{selectedSize}</span>
                </p>
              </div>

              <button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    color: activeVariant.color,
                    material: product.material,
                    size: selectedSize,
                    image: activeVariant.images[0],
                  });

                  toast.success(
                    `${product.name} (${activeVariant.color}, ${selectedSize}) added to cart!`,
                  );
                }}
                className="w-full bg-[#ff9167] text-white py-3 rounded-lg hover:bg-[#df6839] font-semibold transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
