import { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  CAROUSEL_OPTIONS,
  AUTOSCROLL_INITIAL_DELAY,
  AUTOSCROLL_RESUME_DELAY,
  BASE_DELAY,
  VARIANCE_DELAY,
  DIRECTION_CHANGE_PROBABILITY,
  MIN_SAME_DIRECTION_COUNT,
  MAX_SAME_DIRECTION_COUNT,
} from '../consts'

export const useAutoEmblaCarousel = () => {
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

  const getNextDelay = useCallback(() => {
    const variation = Math.random() * VARIANCE_DELAY
    return BASE_DELAY + variation
  }, [])

  const shouldChangeDirection = useCallback(() => {
    if (sameDirectionCount.current >= MAX_SAME_DIRECTION_COUNT) return true
    if (sameDirectionCount.current < MIN_SAME_DIRECTION_COUNT) return false
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
  }, [emblaApi, clearAutoScroll, getDirection, getNextDelay])

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return
    clearAutoScroll()
    emblaApi.scrollPrev()
    currentDirection.current = 'prev'
    sameDirectionCount.current = 1
    setTimeout(() => {
      if (!isPausedRef.current) startAutoScroll()
    }, AUTOSCROLL_RESUME_DELAY)
  }, [emblaApi, clearAutoScroll, startAutoScroll])

  const scrollNext = useCallback(() => {
    if (!emblaApi) return
    clearAutoScroll()
    emblaApi.scrollNext()
    currentDirection.current = 'next'
    sameDirectionCount.current = 1
    setTimeout(() => {
      if (!isPausedRef.current) startAutoScroll()
    }, AUTOSCROLL_RESUME_DELAY)
  }, [emblaApi, clearAutoScroll, startAutoScroll])

  useEffect(() => {
    if (!emblaApi) return

    const handleMouseEnter = () => {
      isPausedRef.current = true
      clearAutoScroll()
    }
    const handleMouseLeave = () => {
      isPausedRef.current = false
      setTimeout(() => {
        if (!isPausedRef.current) startAutoScroll()
      }, AUTOSCROLL_RESUME_DELAY)
    }

    const sliderElement = emblaApi.containerNode()
    sliderElement.addEventListener('mouseenter', handleMouseEnter)
    sliderElement.addEventListener('mouseleave', handleMouseLeave)

    setTimeout(() => {
      if (!isPausedRef.current) startAutoScroll()
    }, AUTOSCROLL_INITIAL_DELAY)

    return () => {
      clearAutoScroll()
      sliderElement.removeEventListener('mouseenter', handleMouseEnter)
      sliderElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [emblaApi, startAutoScroll, clearAutoScroll])

  return { emblaRef, scrollPrev, scrollNext }
}
