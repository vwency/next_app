'use client'

import React from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAutoEmblaCarousel } from '@/hooks'
import '@/styles/slider/index.scss'

const SLIDER_IMAGES = [
  'https://images.unsplash.com/photo-1752606402449-0c14a2d6af70?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0',
]

const Slider = () => {
  const { emblaRef, scrollPrev, scrollNext } = useAutoEmblaCarousel()

  return (
    <div className="slider">
      <div className="slider__viewport" ref={emblaRef}>
        <div className="slider__container">
          {SLIDER_IMAGES.map((src, i) => (
            <div key={i} className="slider__slide">
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                fill
                className="slider__image"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="slider__navigation">
        <button
          onClick={scrollPrev}
          className="slider__nav-button slider__nav-button--prev"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          className="slider__nav-button slider__nav-button--next"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default Slider
