import { useState, useEffect } from 'react'

const getScrollAmount = () => {
  const { pageXOffset: xaxisAmount, pageYOffset: yaxisAmount } = window

  return {
    xaxisAmount,
    yaxisAmount,
  }
}

export const useScrollAmount = () => {
  const [scrollAmount, setScrollAmount] = useState(getScrollAmount())

  useEffect(() => {
    const handleScroll = () => {
      setScrollAmount(getScrollAmount())
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('resize', handleScroll)
  }, [])

  return {
    xaxisAmount: scrollAmount.xaxisAmount,
    yaxisAmount: scrollAmount.yaxisAmount,
  }
}
