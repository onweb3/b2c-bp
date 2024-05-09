
"use client"
import React, { FC, useMemo } from "react";
import GallerySlider from "@/components/GallerySlider";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Route } from "next";
import { useSearchParams } from "next/navigation";
import priceConversion from "@/utils/priceConversion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "@/redux/store";
import { handleSetFavourites } from "@/redux/features/attractionSlice";
import TourImageSlider from "../TourImageSlider";
import { TourPackage } from "@/data/tours/types";

export interface ExperiencesCardProps {
  className?: string;
  ratioClass?: string;
  data?: any;
  size?: "default" | "small";
  packageItem:TourPackage
}

const TourCard: FC<ExperiencesCardProps> = ({
  size = "default",
  className = "",
  data,
  ratioClass = "aspect-w-3 aspect-h-3",
  packageItem
}) => {
	const { config } = useAppSelector((state) => state.initials);

  const dispatch = useDispatch<AppDispatch>()
  const searchParams = useSearchParams()!;
  const date = searchParams?.get("date");
  const { favourites } = useSelector((state: RootState) => state.attraction)

  const handleLikeExc = () => {
    if (data) {
      dispatch(handleSetFavourites(data))
    }
  }

  console.log(packageItem?.slug,"packageItem");
  

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full h-full rounded-2xl overflow-hidden ">

          {/* <img src='https://d1i3enf1i5tb1f.cloudfront.net/City-Images/13236/abu-dhabi.jpg' alt="img" /> */}
        {/* <div>
          <img 
          className="w-full h-[200px]"
          src={`${config?.NEXT_PUBLIC_SERVER_URL + packageItem?.thumbnail}`}
          alt="img"/>
        </div> */}
        {packageItem?.thumbnail&&
        <TourImageSlider
          
          TourImgs={packageItem?.thumbnail}
          slug={packageItem?.slug}
          
          />
        }
       
        </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "py-2 space-y-3 overflow-hidden" : "p-3 space-y-1 overflow-hidden"}>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            <div className="flex items-center gap-1">
            <MapPinIcon className="w-4 h-4" />
            <span className="capitalize">{packageItem?.destination?.name}</span>
            </div>
            { <Badge name={`${packageItem?.packageThemes[0]?.themeName}`} className=" relative capitalize " color="blue" />}
          </div>

       
    
            <div className="text-[12px] text-center font-bold text-stone-700">{packageItem?.packageName}</div>
            
    
        </div>
        <div className="border-b border-neutral-100 dark:border-neutral-800"></div>
        <div style={{
           marginTop: '0px'
        }} className="flex justify-around items-center">
          <span className="text-base font-semibold">
            {/* {priceConversion(activity?.lowPrice, selectedCurrency, true)} */}
            {` `}
            {size === "default" && (
              <span className=" dark:text-neutral-400 font-semibold">
               {packageItem?.totalPrice} AED per person
              </span>
            )}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ExperiencesCard group relative ${className}`}>
      
      {renderSliderGallery()}
      <Link href={`/tour-details/${packageItem?.slug}` as Route}>
        {renderContent()}
        </Link>
    </div>
  );
};

export default TourCard;
