// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import { products, Product } from '@/data/products';

// interface Props {
//   params: Promise<{ id: string }>;
// }

// export default async function ProductPage({ params }: Props) {
//   const { id } = await params;
//   const productId = parseInt(id);
//   const product = products.find(p => p.id === productId) as Product | undefined;

//   if (!product) {
//     notFound();
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Product Image */}
//         <div className="mb-8">
//           <Image
//             src={product.image}
//             alt={product.name}
//             width={600}
//             height={400}
//             className="w-full h-96 object-cover rounded-lg shadow-xl"
//           />
//         </div>

//         {/* Product Details */}
//         <div className="grid lg:grid-cols-2 gap-12">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
//             <p className="text-3xl font-bold text-green-600 mb-6">${product.price}</p>
            
//             <div className="space-y-4 mb-8">
//               <div>
//                 <span className="font-medium text-gray-700">Material:</span> {product.material}
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700">Colors:</span> 
//                 <span className="ml-2 bg-blue-100 px-2 py-1 rounded text-sm">{product.colors.join(', ')}</span>
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700">Sizes:</span> 
//                 <span className="ml-2 bg-green-100 px-2 py-1 rounded text-sm">{product.sizes.join(', ')}</span>
//               </div>
//             </div>

//             <p className="text-gray-700 text-lg leading-relaxed mb-8">{product.description}</p>
//           </div>

//           {/* Features & Add to Cart */}
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Features</h3>
//               <ul className="space-y-2">
//                 {product.features.map((feature, index) => (
//                   <li key={index} className="flex items-start">
//                     <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <button className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg">
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Pre-generate static pages for each product at build time
// export async function generateStaticParams() {
//   return products.map((product) => ({
//     id: product.id.toString(),
//   }));
// }


// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import { products, Product } from '@/data/products';

// interface Props {
//   params: Promise<{ id: string }>;
// }

// export default async function ProductPage({ params }: Props) {
//   const { id } = await params;
//   const productId = parseInt(id);
//   const product = products.find(p => p.id === productId) as Product | undefined;

//   if (!product) {
//     notFound();
//   }

//   return (
//     <div className="min-h-screen bg-purple-50 flex items-center justify-center py-10 px-4">
//       <div className="w-full max-w-5xl">

//         {/* Card Container */}
//         <div className="bg-white rounded-xl shadow-xl overflow-hidden">

//           <div className="md:grid md:grid-cols-2 gap-8">

//             {/* IMAGE SECTION */}
//             <div className="p-6">
//               <div className="relative w-full h-96 bg-gray-100 rounded-md overflow-hidden">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   fill
//                   className="object-contain"
//                 />
//               </div>
//             </div>

//             {/* PRODUCT DETAILS */}
//             <div className="p-8 space-y-6">

//               {/* Category */}
//               <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
//                 Product
//               </span>

//               {/* Name */}
//               <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
//                 {product.name}
//               </h1>

//               {/* Price */}
//               <p className="text-3xl font-bold text-purple-600">
//                 ${product.price}
//               </p>

//               {/* Basic Info */}
//               <div className="space-y-2 text-gray-700">
//                 <div>
//                   <span className="font-semibold">Material:</span> {product.material}
//                 </div>

//                 <div>
//                   <span className="font-semibold">Colors:</span>
//                   <span className="ml-2 bg-purple-100 px-2 py-1 rounded text-sm">
//                     {product.colors.join(', ')}
//                   </span>
//                 </div>

//                 <div>
//                   <span className="font-semibold">Sizes:</span>
//                   <span className="ml-2 bg-purple-100 px-2 py-1 rounded text-sm">
//                     {product.sizes.join(', ')}
//                   </span>
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <h2 className="text-xl font-semibold">Description</h2>
//                 <p className="text-gray-700 leading-relaxed">
//                   {product.description}
//                 </p>
//               </div>

//               {/* Features */}
//               <div>
//                 <h2 className="text-xl font-semibold">Key Features</h2>
//                 <ul className="list-disc list-inside text-gray-700 space-y-1">
//                   {product.features.map((feature, index) => (
//                     <li key={index}>{feature}</li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Button */}
//               <button className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50 font-semibold transition">
//                 Add to Cart
//               </button>

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import { notFound } from 'next/navigation'
import { products, Product } from '@/data/products'
import ProductDetailClient from '@/app/components/ProductDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {

  const { id } = await params
  const productId = parseInt(id)

  const product = products.find(p => p.id === productId) as Product | undefined

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}

export async function generateStaticParams() {
  return products.map(product => ({
    id: product.id.toString()
  }))
}