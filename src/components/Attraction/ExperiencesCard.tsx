"use client"
import React, { FC, useMemo } from "react";
import GallerySlider from "@/components/GallerySlider";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { SearchByDestination } from "@/data/attraction/types";
import { Route } from "next";
import { useSearchParams } from "next/navigation";
import priceConversion from "@/utils/priceConversion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { handleSetFavourites } from "@/redux/features/attractionSlice";

export interface ExperiencesCardProps {
  className?: string;
  ratioClass?: string;
  data?: SearchByDestination;
  size?: "default" | "small";
}

const ExperiencesCard: FC<ExperiencesCardProps> = ({
  size = "default",
  className = "",
  data,
  ratioClass = "aspect-w-3 aspect-h-2",
}) => {


  const dispatch = useDispatch<AppDispatch>()
  const searchParams = useSearchParams()!;
  const date = searchParams?.get("date");

  const { selectedCurrency } = useSelector((state: RootState) => state.initials)
  const { favourites } = useSelector((state: RootState) => state.attraction)

  const {
    _id, images, isPromoCode, bookingType, destination, title, activity, totalReviews, averageRating, category

  } = data as SearchByDestination;


  const isLiked = useMemo(() => {
    const liked = favourites.find((item) => item._id === _id)
    if (liked) {
      return true
    } else {
      return false
    }
  }, [favourites])

  // handler for liking the attraction.
  const handleLikeExc = () => {
    if (data) {
      dispatch(handleSetFavourites(data))
    }
  }

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full rounded-t-2xl overflow-hidden ">
        <GallerySlider
          uniqueID={`ExperiencesCard_${"id"}`}
          ratioClass={ratioClass}
          galleryImgs={images}
          href={data && `/${data?.destination?.name}/${data?.slug}` as Route}
          galleryClass={size === "default" ? undefined : ""}
        />
        <BtnLikeIcon isLiked={isLiked} onClick={handleLikeExc} className="absolute right-3 top-3" />
        {isPromoCode && <SaleOffBadge desc={"Promotion available"} className="absolute capitalize left-3 top-3" />}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "py-4 space-y-3" : "p-3 space-y-1"}>
        <div className="space-y-2">
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {size === "default" && <MapPinIcon className="w-4 h-4" />}
            <span className="capitalize text-[9px] md:text-sm">{destination.name}</span>
            {category && <Badge name={category.categoryName} className="hidden md:block relative capitalize " color="blue" />}
            {category && <Badge name={category.categoryName.slice(0,12) + `${category.categoryName.length > 12 ? "..." : ""}`} className="block text-[10px] md:hidden relative capitalize " color="blue" />}
          </div>

          <div className="flex items-center md:space-x-2">
            {bookingType && <Badge name={bookingType} className="hidden md:block relative capitalize " color="green" />}
            <h2
              className={`font-semibold md:font-medium capitalize text-xs md:text-base overflow-hidden ${size === "default" ? "text-base" : "text-base"
                }`}
            >
              <span className={` md:line-clamp-1 `}>{title}</span>
            </h2>
          </div>
        </div>
        <div className="border-b border-neutral-100 hidden md:block dark:border-neutral-800"></div>
        <div className="md:flex md:justify-between md:items-center">
          <span className="text-xs md:text-base font-semibold">
            {priceConversion(activity?.lowPrice + (activity?.promoAmountAdult ? activity?.promoAmountAdult : 0), selectedCurrency, true)}
            {` `}
          
              <span className="text-xs md:hidden md:text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /person
              </span>
           
          </span>
          <div className="flex mt-2 md:mt-0 justify-between md:block">
          <StartRating className="text-xs md:text-base" reviewCount={totalReviews} point={Number(averageRating?.toFixed(2))} />
          {bookingType && <Badge name={bookingType} className="md:hidden block text-xs relative capitalize " color="green" />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div key={data?._id} className={`nc-ExperiencesCard border rounded-2xl group relative ${className}`}>
      {renderSliderGallery()}
      <Link href={`/${data?.destination?.slug}/${data?.slug}` as Route}>{renderContent()}</Link>
    </div>
  );
};

export default ExperiencesCard;
