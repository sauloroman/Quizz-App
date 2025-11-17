import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

import authImg1 from '../../assets/img/img-1.avif'
import authImg2 from '../../assets/img/img-2.avif'
import authImg3 from '../../assets/img/img-3.avif'

interface Slide {
    img: string
    title: string
    description: string
}

const slides: Slide[] = [
    {
        img: authImg1,
        title: 'Aprende de forma inteligente',
        description: 'Crea quizzes personalizados y mejora tu retención de conocimiento con nuestro sistema interactivo'
    },
    {
        img: authImg2,
        title: 'Estudia en cualquier momento',
        description: 'Accede a tus quizzes desde cualquier dispositivo y estudia a tu propio ritmo'
    },
    {
        img: authImg3,
        title: 'Mide tu progreso',
        description: 'Obtén estadísticas detalladas de tu desempeño y identifica áreas de mejora'
    },
    {
        img: authImg1,
        title: 'Domina cualquier tema',
        description: 'Desde programación hasta idiomas, crea quizzes para cualquier materia que desees estudiar'
    }
]

export const Slides: React.FC = () => {
    return (
        <Swiper 
            modules={[Autoplay, Pagination]}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false
            }}
            pagination={{ 
                clickable: true,
                dynamicBullets: true
            }}
            slidesPerView={1}
            loop={true}
            className='h-screen w-full'
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div className='relative w-full h-screen'>
                        <img
                            className='w-full h-screen object-cover' 
                            src={slide.img} 
                            alt={slide.title} 
                        />
                        <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                            <div className='text-center px-8 max-w-3xl'>
                                <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6'>
                                    {slide.title}
                                </h2>
                                <p className='text-lg text-gray-200 font-light'>
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}