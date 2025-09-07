'use client'
import React, { useEffect, useCallback, useRef } from 'react'
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
  duration: 45,
  dragFree: false,
  containScroll: 'trimSnaps' as const,
}

const AUTOSCROLL_INITIAL_DELAY = 500
const AUTOSCROLL_RESUME_DELAY = 1500
const BASE_DELAY = 4000
const VARIANCE_DELAY = 3000
const DIRECTION_CHANGE_PROBABILITY = 0.15
const MIN_SAME_DIRECTION_COUNT = 3
const MAX_SAME_DIRECTION_COUNT = 7

const SliderContent = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(CAROUSEL_OPTIONS)
  const currentDirection = useRef<'next' | 'prev'>('next')
  const sameDirectionCount = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isPausedRef = useRef(false)

  const clearAutoScroll = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      clearAutoScroll()
      emblaApi.scrollPrev()
      currentDirection.current = 'prev'
      sameDirectionCount.current = 1
      setTimeout(() => {
        if (!isPausedRef.current) {
          startAutoScroll()
        }
      }, AUTOSCROLL_RESUME_DELAY)
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      clearAutoScroll()
      emblaApi.scrollNext()
      currentDirection.current = 'next'
      sameDirectionCount.current = 1
      setTimeout(() => {
        if (!isPausedRef.current) {
          startAutoScroll()
        }
      }, AUTOSCROLL_RESUME_DELAY)
    }
  }, [emblaApi])

  const getNextDelay = useCallback(() => {
    const variation = Math.random() * VARIANCE_DELAY
    return BASE_DELAY + variation
  }, [])

  const shouldChangeDirection = useCallback(() => {
    if (sameDirectionCount.current >= MAX_SAME_DIRECTION_COUNT) {
      return true
    }

    if (sameDirectionCount.current < MIN_SAME_DIRECTION_COUNT) {
      return false
    }

    return Math.random() < DIRECTION_CHANGE_PROBABILITY
  }, [])

  const getDirection = useCallback(() => {
    sameDirectionCount.current++

    if (shouldChangeDirection()) {
      currentDirection.current =
        currentDirection.current === 'next' ? 'prev' : 'next'
      sameDirectionCount.current = 1
    }

    return currentDirection.current
  }, [shouldChangeDirection])

  const startAutoScroll = useCallback(() => {
    if (isPausedRef.current) return

    clearAutoScroll()

    const delay = getNextDelay()
    timeoutRef.current = setTimeout(() => {
      if (!isPausedRef.current && emblaApi) {
        const direction = getDirection()
        if (direction === 'next') {
          emblaApi.scrollNext()
        } else {
          emblaApi.scrollPrev()
        }
        startAutoScroll()
      }
    }, delay)
  }, [emblaApi, getNextDelay, getDirection, clearAutoScroll])

  useEffect(() => {
    if (!emblaApi) return

    const handleMouseEnter = () => {
      isPausedRef.current = true
      clearAutoScroll()
    }

    const handleMouseLeave = () => {
      isPausedRef.current = false
      setTimeout(() => {
        if (!isPausedRef.current) {
          startAutoScroll()
        }
      }, AUTOSCROLL_RESUME_DELAY)
    }

    setTimeout(() => {
      if (!isPausedRef.current) {
        startAutoScroll()
      }
    }, AUTOSCROLL_INITIAL_DELAY)

    const sliderElement = emblaApi?.containerNode()

    if (sliderElement) {
      sliderElement.addEventListener('mouseenter', handleMouseEnter)
      sliderElement.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      clearAutoScroll()
      if (sliderElement) {
        sliderElement.removeEventListener('mouseenter', handleMouseEnter)
        sliderElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [emblaApi, startAutoScroll, clearAutoScroll])

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
