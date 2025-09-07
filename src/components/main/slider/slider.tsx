'use client'
import React, { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import '@/styles/slider/index.scss'

const SLIDER_IMAGES = [
  'https://images.unsplash.com/photo-1752606402449-0c14a2d6af70?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0',
]

const CAROUSEL_OPTIONS = {
  loop: true,
  duration: 35,
  dragFree: false,
  containScroll: 'trimSnaps' as const,
}

const AUTOSCROLL_INITIAL_DELAY = 2000
const AUTOSCROLL_RESUME_DELAY = 800
const BASE_DELAY = 3000
const VARIANCE_DELAY = 5000
const NATURAL_RHYTHM_DIVISOR = 10000
const MOOD_DIVISOR = 20000
const MOOD_THRESHOLD = 0.3

const SliderContent = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(CAROUSEL_OPTIONS)

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  const getNextDelay = useCallback(() => {
    const naturalRhythm =
      Math.sin(Date.now() / NATURAL_RHYTHM_DIVISOR) * 0.3 + 0.7
    return BASE_DELAY + Math.random() * VARIANCE_DELAY * naturalRhythm
  }, [])

  const getDirection = useCallback(() => {
    const time = Date.now() / MOOD_DIVISOR
    const mood = Math.sin(time)

    if (mood > MOOD_THRESHOLD) {
      return Math.random() < 0.75 ? 'next' : 'prev'
    } else if (mood < -MOOD_THRESHOLD) {
      return Math.random() < 0.25 ? 'next' : 'prev'
    } else {
      return Math.random() < 0.5 ? 'next' : 'prev'
    }
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    let timeout: NodeJS.Timeout
    let isPaused = false

    const autoScroll = () => {
      if (isPaused) return
      const delay = getNextDelay()
      timeout = setTimeout(() => {
        if (!isPaused && emblaApi) {
          const direction = getDirection()
          if (direction === 'next') {
            emblaApi.scrollNext()
          } else {
            emblaApi.scrollPrev()
          }
          autoScroll()
        }
      }, delay)
    }

    const handleMouseEnter = () => {
      isPaused = true
      clearTimeout(timeout)
    }

    const handleMouseLeave = () => {
      isPaused = false
      setTimeout(() => {
        if (!isPaused) autoScroll()
      }, AUTOSCROLL_RESUME_DELAY)
    }

    setTimeout(autoScroll, AUTOSCROLL_INITIAL_DELAY)

    const sliderElement = emblaApi?.containerNode()

    if (sliderElement) {
      sliderElement.addEventListener('mouseenter', handleMouseEnter)
      sliderElement.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      clearTimeout(timeout)
      if (sliderElement) {
        sliderElement.removeEventListener('mouseenter', handleMouseEnter)
        sliderElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [emblaApi, getNextDelay, getDirection, emblaRef])

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

const Slider = () => {
  return <SliderContent />
}

export default Slider
