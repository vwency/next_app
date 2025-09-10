'use client'
import React, { memo, useMemo } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAutoEmblaCarousel } from '@/hooks'
import '@/styles/slider/index.scss'

const SLIDER_IMAGES = [
  'https://images.unsplash.com/photo-1752606402449-0c14a2d6af70?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0',
]

type SlideImageProps = {
  src: string
  index: number
  priority: boolean
}

const SlideImage = memo(({ src, index, priority }: SlideImageProps) => (
  <div className="slider__slide">
    <Image
      src={src}
      alt={`Slide ${index + 1}`}
      fill
      className="slider__image"
      priority={priority}
      sizes="100vw"
      quality={75}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      loading={priority ? 'eager' : 'lazy'}
    />
  </div>
))

SlideImage.displayName = 'SlideImage'

const Slider = () => {
  const { emblaRef, scrollPrev, scrollNext } = useAutoEmblaCarousel()

  const slides = useMemo(
    () =>
      SLIDER_IMAGES.map((src, i) => (
        <SlideImage key={i} src={src} index={i} priority={i === 0} />
      )),
    []
  )

  return (
    <div className="slider">
      <div className="slider__viewport" ref={emblaRef}>
        <div className="slider__container">{slides}</div>
      </div>

      <div className="slider__navigation">
        <button
          onClick={scrollPrev}
          className="slider__nav-button slider__nav-button--prev"
          aria-label="Previous slide"
          type="button"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          className="slider__nav-button slider__nav-button--next"
          aria-label="Next slide"
          type="button"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default memo(Slider)
