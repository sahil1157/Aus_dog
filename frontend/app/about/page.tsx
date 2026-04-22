import React from 'react'

const page = () => {
    return (
        <div>
            <div className="relative bg-[#1E2A3A] py-25 bg-no-repeat bg-cover"
                style={{ backgroundImage: "url('/images/image copy.png')" }}
            >
                <div className="max-w-7xl mx-auto px-6 ">
                    <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 flex items-center justify-center">
                        About Us
                    </h1>
                    <div className="w-full h-px bg-white/70" />
                </div>
            </div>


            <div className='max-w-7xl mx-auto  mt-30'>


                <div className='grid grid-cols-2'>
                    {/* ── Left column — image slides in from left ── */}
                    <div
                        className={`mb-10 transition-all duration-700 ease-out delay-200"
                    `}
                    >
                        <img src="/images/about.png" alt="dog image" />
                    </div>

                    {/* ── Right column — content slides in from right ── */}
                    <div
                        className={`mt- transition-all duration-700 ease-out delay-300 
                    }`}
                    >
                        <div className='mx-3 position-relative pr-3 pl-3'>
                            <h1 className='text-2xl font-semibold text-gray-500 mb-5'>Top Dog</h1>
                            <p className='block text-left font-normal text-xl text-[#242424] mb-4'>
                                It is a long established fact that a reader will be distracted by the readable
                                content of a page when looking at its layout. The point of using Lorem Ipsum is
                                that it has a more-or-less normal distribution.
                            </p>
                            <p className='block text-left font-normal text-xl text-[#242424] mb-4'>
                                It is a long established fact that a reader will be distracted by the readable
                                content of a page when looking at its layout. The point of using Lorem Ipsum is
                                that it has a more-or-less normal distribution.
                            </p>
                            <p className='block text-left font-normal text-xl text-[#242424] mb-4'>
                                It is a long established fact that a reader will be distracted by the readable
                                content of a page when looking at its layout. The point of using Lorem Ipsum is
                                that it has a more-or-less normal distribution.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page