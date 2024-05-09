import React from 'react'
import './AnimateImage.css'
type imageProps={
    image:string
}
export default function AnimationImage({image}:imageProps) {
  return (
    <div className="highlights-animation-container side-shadow  w-full h-full relative ">
          <div className="img-highlights-animation bg-blue-900"></div>
          <div className="animation-line"></div>
          <img
            className="w-full h-full"
            src={image}
            alt="img"
          />
        </div>
  )
}
