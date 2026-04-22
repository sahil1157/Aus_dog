export type ProductVariant = {
  id: number
  color: string
  images: string[]
}

export type Product = {
  id: number
  name: string
  category: string
  price: number
  sizes: string[]
  material: string
  description: string
  features: string[]
  variants: ProductVariant[]
}

