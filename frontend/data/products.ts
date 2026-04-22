export interface ProductVariant {
  color: string;
  images: string[];
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  sizes: string[];
  material: string;
  description: string;
  features: string[];
  variants: ProductVariant[];
}

export const products: Product[] = [
  {
  id: 2,
  name: "Waterproof BioThane Dog Collar",
  category: "Pet Accessories",
  price: 24.99,
  sizes: ["Medium", "Large"],
  material: "BioThane",
  description:
    "A rugged waterproof collar designed for outdoor adventures and rainy conditions.",
  features: [
    "100% waterproof material",
    "Odor resistant",
    "Rust-proof hardware",
    "Easy to clean",
    "Flexible and durable"
  ],
  variants: [
    {
      color: "Olive",
      images: [
        "/images/products/p1.png",
        "/images/products/p2.png"
      ]
    },
    {
      color: "Tan",
      images: [
        "/images/products/p3.png"
      ]
    },
    {
      color: "Black",
      images: [
        "/images/products/p4.png"
      ]
    }
  ]
},

{
  id: 3,
  name: "Classic Leather Dog Collar",
  category: "Pet Accessories",
  price: 29.99,
  sizes: ["Small", "Medium", "Large"],
  material: "Genuine Leather",
  description:
    "A premium leather dog collar combining durability, elegance, and comfort.",
  features: [
    "Genuine leather build",
    "Elegant classic design",
    "Soft padded lining",
    "Strong metal buckle",
    "Long-lasting durability"
  ],
  variants: [
    {
      color: "Brown",
      images: [
        "/images/products/p5.png"
      ]
    },
    {
      color: "Dark Brown",
      images: [
        "/images/products/p6.png"
      ]
    },
    {
      color: "Black",
      images: [
        "/images/products/p7.png"
      ]
    }
  ]
},

{
  id: 4,
  name: "Reflective Night Safety Dog Collar",
  category: "Pet Accessories",
  price: 21.99,
  sizes: ["Small", "Medium", "Large"],
  material: "Reflective Nylon",
  description:
    "Highly visible reflective collar designed to keep dogs safe during night walks.",
  features: [
    "High-visibility reflective strip",
    "Lightweight nylon fabric",
    "Adjustable strap",
    "Comfortable inner lining",
    "Strong D-ring for leash attachment"
  ],
  variants: [
    {
      color: "Neon Green",
      images: [
        "/images/products/p8.png"
      ]
    },
    {
      color: "Orange",
      images: [
        "/images/products/p8.png"
      ]
    },
    {
      color: "Yellow",
      images: [
        "/images/products/p8.png"
      ]
    }
  ]
},

{
  id: 5,
  name: "Heavy Duty Training Dog Collar",
  category: "Pet Accessories",
  price: 27.99,
  sizes: ["Medium", "Large"],
  material: "Reinforced Nylon",
  description:
    "Built for strength and durability, ideal for training active and large breed dogs.",
  features: [
    "Heavy duty nylon webbing",
    "Reinforced stitching",
    "Strong metal buckle",
    "Extra grip handle",
    "Weather resistant"
  ],
  variants: [
    {
      color: "Black",
      images: [
        "/images/products/p9.png"
      ]
    },
    {
      color: "Army Green",
      images: [
        "/images/products/p9.png"
      ]
    },
    {
      color: "Desert Tan",
      images: [
        "/images/products/p9.png"
      ]
    }
  ]
},

{
  id: 6,
  name: "Soft Padded Comfort Dog Collar",
  category: "Pet Accessories",
  price: 22.99,
  sizes: ["Small", "Medium", "Large"],
  material: "Padded Nylon",
  description:
    "Ultra-soft padded dog collar designed for maximum comfort during everyday wear.",
  features: [
    "Soft padded interior",
    "Breathable fabric",
    "Lightweight design",
    "Durable buckle",
    "Skin-friendly material"
  ],
  variants: [
    {
      color: "Pink",
      images: [
        "/images/products/p10.png"
      ]
    },
    {
      color: "Sky Blue",
      images: [
        "/images/products/p10.png"
      ]
    },
    {
      color: "Purple",
      images: [
        "/images/products/p10.png"
      ]
    }
  ]
}
];