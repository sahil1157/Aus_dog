'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import ProductCard from './ProductCard'
import { products } from '@/data/products'

const ProductSlider = () => {
    return (
        <div className='w-full py-10'>
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={20}
                slidesPerView={3}
                loop={true}
                navigation
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false
                }}
                
                speed={5000}
                className="px-6"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}

            </Swiper>

        </div>
    )
}
export default ProductSlider