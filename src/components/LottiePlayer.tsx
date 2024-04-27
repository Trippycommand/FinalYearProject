'use client'

import Lottie from 'lottie-react'

export default function LottiePlayer({
  animationData,
  className,
}: {
  animationData: any
  className: string
}) {
  return (
    <Lottie animationData={animationData} className={className} loop={true} />
  )
}
