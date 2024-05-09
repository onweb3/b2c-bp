import React from 'react'
import './BannerImageSlider.css'
import Image from "next/legacy/image";
export default function BannerImageSlider():React.ReactElement {

    const image = ['https://api-server-i1.mytravellerschoice.com/public/images/tour-packages/thumbnailImg-1701846208392-888020268.png','http://localhost:3050/_next/image?url=https%3A%2F%2Fapi-server-i1.mytravellerschoice.com%2Fpublic%2Fimages%2Fattractions%2Fimages-1674217598056-740257214.jpg&w=1920&q=75','https://api-server-i1.mytravellerschoice.com/public/images/tour-packages/thumbnailImg-1701846208392-888020268.png','http://localhost:3050/_next/image?url=https%3A%2F%2Fapi-server-i1.mytravellerschoice.com%2Fpublic%2Fimages%2Fattractions%2Fimages-1674217598056-740257214.jpg&w=1920&q=75']

  return (
    <div className='bannerimage-slider-container absolute top-0 left-2 z-10  w-[100px] h-full'>
      <section className='bannerimage-slider flex flex-col gap-2 overflow-y-scroll'>
        {
            image.map((image)=>{
                return(
                    <img className='w-full h-[70px] flex-shrink-0 ' src={image} alt="" />
                )
            })
        }
      </section>
    </div>
  )
}
