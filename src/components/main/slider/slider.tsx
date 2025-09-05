'use client'

import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import '@/styles/slider/index.scss'

const images = [
  'https://images.unsplash.com/photo-1752606402449-0c14a2d6af70?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0',
]

const SliderContent = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  useEffect(() => {
    if (!emblaApi) return

    let timeout: NodeJS.Timeout

    const autoScroll = () => {
      const delay = Math.random() * (2500 - 1000) + 1000

      timeout = setTimeout(() => {
        const goNext = Math.random() < 0.5
        if (goNext) {
          emblaApi.scrollNext()
        } else {
          emblaApi.scrollPrev()
        }

        autoScroll()
      }, delay)
    }

    autoScroll()

    return () => {
      clearTimeout(timeout)
    }
  }, [emblaApi])

  return (
    <div className="slider" ref={emblaRef}>
      <div className="slider__container">
        {images.map((src, i) => (
          <div key={i} className="slider__slide">
            <Image
              src={src}
              alt={`Slide ${i + 1}`}
              fill
              className="slider__image"
            />
          </div>
        ))}
      </div>
      <button
        onClick={scrollPrev}
        className="slider__button slider__button--left"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={scrollNext}
        className="slider__button slider__button--right"
      >
        <ChevronRight />
      </button>
    </div>
  )
}

const Slider = () => {
  return (
    <>
      <SliderContent />
    </>
  )
}

export default Slider
