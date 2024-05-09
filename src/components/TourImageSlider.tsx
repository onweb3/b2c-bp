"use client";
import React, { useEffect, useRef, useState } from "react";
import "./TourImageSlider.css";
import Link from "next/link";
import { Route } from "next";
import Image from "next/legacy/image";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useAppSelector } from "@/redux/store";
interface TourImageProps {
  TourImgs: string[];
  slug: string;
}
export default function TourImageSlider({ TourImgs, slug }: TourImageProps) {

  const { config } = useAppSelector((state) => state.initials);
  const carouselRef = useRef<HTMLUListElement | null>(null);
  const elemRef = useRef<HTMLLIElement>(null);
  const [leftIcon, setLeftIcon] = useState(false);
  const [rightIcon, setRightIcon] = useState(true);

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

  return (
    <div className="tour-img-container  w-full h-full relative">
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
      <ul ref={carouselRef} className="tour-img-carousel flex w-full h-[200px]">
        {typeof TourImgs != "string" &&
          TourImgs?.map((url: any, index: any) => {
            return (
              <li
                key={index}
                draggable="false"
                ref={elemRef}
                className="tour-carousel-card w-full h-full  flex-shrink-0"
              >
                <Link href={`/tour-details/${slug}` as Route}>
                  <div
                   className="w-full h-full relative">
                    <Image
                     draggable="false"
                     src={`${config?.NEXT_PUBLIC_TOURS_URL + url}`}
                      alt="Image description"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  {/* <img 
                  className="w-full h-full "
                  src={`${config?.NEXT_PUBLIC_TOURS_URL + url}`}
                  alt="" /> */}
                </Link>
               
              </li>
            );
          })}
      </ul>
    </div>
  );
}
