"use client";

import { ClockIcon, HomeModernIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect, FC } from "react";
import ClearDataButton from "./ClearDataButton";
import { QueryAttractions, QueryDestinations } from "@/data/attraction/types"
import { Route } from "next";
import { useRouter } from "next/navigation";



export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
  setQuery?: (query: string) => void;
  setDestinationType?: (destinationType: "destination" | "attraction") => void
  data?: any[],
  closeModal?: () => void
}


const TourInput: FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = "Tour destination",
  desc = "Where are you planning to go?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
  setQuery = () => {},
  setDestinationType,
  data,
  closeModal
}) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [inputData, setInputData] = useState("");
  
  const [showPopover, setShowPopover] = useState(autoFocus);

  if (setQuery) {
    setQuery(inputData)
  }

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);



  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };

  // const handleSelectLocation = ({ item, category }: { item: string, category: "destination" | "attraction" }) => {
  //   setDestinationType && setDestinationType(category)
  //   setValue(item);
  //   setShowPopover(false);
  // };
  const handleSelectLocation = () => {
      if(closeModal){
        closeModal()
      }
  };

  const renderRecentSearches = (value: string) => {
    return (
      <>
        {value?.length == 0 && (
          <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 dark:text-neutral-100">
            Popular Tour Destinations
          </h3>
        )}
        <div className="mt-2">
          {
            data?.map((item,index) => (
                <span
                key={index}
                  onClick={() => {
                    handleSelectLocation()
                  router.push(`/tour-details/${item?.slug}` as Route)
                }}
                 
                 className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                >
                 
                  <span className="block text-neutral-400">
                    <MapPinIcon className="h-4 sm:h-6 w-4 sm:w-6" />
                  </span>
                  <span className=" block font-medium text-neutral-700 dark:text-neutral-200 capitalize">
                    {item?.packageName}
                  </span>
                </span>
              ))}
        </div>
      </>
    );
  };

  const renderSearchValue = () => {
    return (
      <>
        {data?.map((item,index) => (
          <span
            // onClick={() => handleSelectLocation({
            //   item: item?.slug, category: "attraction"
            // })}
            key={index}
            className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <span className="block text-neutral-400">
              <HomeModernIcon className="h-4 w-4 sm:h-6 sm:w-6" />
            </span>
            <span className="block font-medium text-neutral-700 dark:text-neutral-200 capitalize">
              {item?.destination}
            </span>
          </span>
        ))}
      </>
    );
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${showPopover ? "nc-hero-field-focused" : ""
          }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow">
          <input
            className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate capitalize`}
            placeholder={placeHolder}
            value={inputData}
            autoFocus={showPopover}
            onChange={(e) => {
             
              
              setQuery('inputData')
              setInputData(e.currentTarget.value);
            }}
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
          {value && (
            <ClearDataButton
              onClick={() => {
                setInputData("");
              }}
            />
          )}
        </div>
      </div>

      {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        ></div>
      )}

      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {value?.length > 2 ? <>
            {renderRecentSearches(value)}
            {renderSearchValue()}
          </>
            : renderRecentSearches(value)}
        </div>
      )}
    </div>
  );
};

export default TourInput;
