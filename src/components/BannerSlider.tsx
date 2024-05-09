"use client";
import React, { useEffect, useRef, useState } from "react";
import "./BannerSlider.css";
import Link from "next/link";
import { Route } from "next";
import Image from "next/legacy/image";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
interface TourImageProps {
  banner?: any;
  slug?: string;
}
export default function BannerSlider({ banner, slug }: TourImageProps) {
  const carouselRef = useRef<HTMLUListElement | null>(null);
  const elemRef = useRef<HTMLLIElement>(null);
  const [leftIcon, setLeftIcon] = useState(false);
  const [rightIcon, setRightIcon] = useState(true);

  const [isMouseDawn, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  function infinitescroll() {
    if (carouselRef.current && elemRef?.current?.offsetWidth) {
      if (carouselRef.current?.scrollLeft === 0) {
        setLeftIcon(false);
      } else {
        setLeftIcon(true);
      }
    }

    if (carouselRef.current && elemRef?.current?.offsetWidth) {
      if (
        carouselRef.current?.scrollLeft ===
        carouselRef?.current?.scrollWidth - carouselRef?.current?.offsetWidth
      ) {
        setRightIcon(false);
      } else {
        setRightIcon(true);
      }
    }
  }

  useEffect(() => {
    carouselRef.current?.addEventListener("scroll", infinitescroll);
    return () => {
      carouselRef.current?.removeEventListener("scroll", infinitescroll);
    };
  }, []);

  function moveleft() {
    if (carouselRef.current && elemRef.current) {
        // elemRef.current.classList.add("tour-carousel-left");
        // elemRef.current.classList.remove("tour-carousel-right");
      let width = carouselRef.current.scrollLeft;
      carouselRef.current.scrollLeft = width - elemRef.current.offsetWidth ?? 0;
    }
  }
  function moveRight(e: React.MouseEvent | React.TouchEvent) {
    if (carouselRef.current && elemRef.current) {
      let width = carouselRef.current.scrollLeft;
      carouselRef.current.scrollLeft = width + elemRef.current.offsetWidth ?? 0;
    }
    e.stopPropagation();
  }

  function handleMouseDawn(e: React.MouseEvent<HTMLUListElement>) {
    setMouseDown(true);
    if (carouselRef.current) {
      carouselRef.current.classList.add("dragging");
      setStartX((e.pageX - carouselRef.current.offsetLeft) as number);
      setScrollLeft(carouselRef.current?.scrollLeft);
    }
  }

  function handleMouseLeave(
    e: React.MouseEvent<HTMLUListElement> | React.TouchEvent<HTMLUListElement>
  ) {
    setMouseDown(false);
  }

  function handleMouseUp() {
    setMouseDown(false);
    // if(elemRef?.current){
    //     elemRef?.current.classList.remove("tour-carousel-right");
    //     elemRef?.current.classList.remove("tour-carousel-left");    
    // }
    if (carouselRef.current) {
      carouselRef.current.classList.remove("dragging");
    }
  }

  function handleMouseMove(e: React.MouseEvent<HTMLUListElement>) {
    if (!isMouseDawn) return;
    e.preventDefault();
    if (carouselRef.current) {
      const x = e.pageX - carouselRef.current?.offsetLeft;
      const walk = x - startX;
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  }


  return (
    <div className="banner-img-container  w-full h-full relative ">
      {leftIcon && (
        <div
          onClick={moveleft}
          className="absolute movearrowTop top-[50%] right-2 text-[30px]  z-50 text-white"
        >
          <FaArrowAltCircleRight />
        </div>
      )}
      {rightIcon && (
        <div
          onClick={moveRight}
          className="absolute movearrowTop top-[50%] left-2 text-[30px]  z-50 text-white"
        >
          <FaArrowAltCircleLeft />
        </div>
      )}
      <ul
       ref={carouselRef}
       onMouseDown={handleMouseDawn}
       onMouseLeave={handleMouseLeave}
       onMouseUp={handleMouseUp}
       onMouseMove={handleMouseMove}
        className="banner-img-carousel  w-full   ">

       {/* <li ref={elemRef} className="bg-red-400 h-full rounded-xl">fdfsd</li>
       <li className="bg-red-500 h-full rounded-xl">fdfsd</li>
       <li className="bg-red-600 h-full rounded-xl">fdfsd</li>
       <li className="bg-red-700 h-full rounded-xl">fdfsd</li> */}
        {
          banner?.map((banner: any, index: any) => {
            return (
              <li
                key={index}
                draggable="false"
                ref={elemRef}
                className="banner-carousel-card w-full   h-[200px]  "
              >
                
                  {/* <div
                   className="w-1/3 h-full relative">
                    <Image
                     draggable="false"
                     src={``}
                      alt="Image description"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div> */}
                  <img 
                  className="w-full h-full rounded-lg"
                  draggable="false"
                  src={banner.image}
                  alt="" />
               
               
              </li>
            );
          })}
      </ul>
    </div>
  );
}
