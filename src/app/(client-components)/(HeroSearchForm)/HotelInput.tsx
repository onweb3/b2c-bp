import React, { useState } from "react";
import "./HotelInput.css";

import {
  ClockIcon,
  HomeModernIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import NationalityInput from "./(hotel-search-form)/NationalityInput";
import RoomAdultChildCountInput from "./(hotel-search-form)/RoomAdultChildCountInput";
import CategoryInput from "./(hotel-search-form)/CategoryInput";
import CheckInDate from "./(hotel-search-form)/DateInput";
import { Route } from "next";
import ButtonSubmit from "./ButtonSubmit";
import CheckOutDate from "./(hotel-search-form)/CheckOutDate";
export default function HotelInput() {
  const [optionsOpen,setOptionsOpen] =useState({
room:false,
country:false,
category:false
  })


  return (
    <>
      <div className="p-5 pl-10 w-full md:mt-8  md:bg-white rounded-[49px]">
        <section className="md:flex w-full">
          <div className="flex md:justify-center items-center w-full md:w-1/3  h-[70px]  ">
            <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7 text-stone-300 flex-shrink-0" />
            <div className="flex flex-col">
              <input
                placeholder="Enter Destination"
                className="
                  pl-5
                  h-[30px]
                  bg-gray-100 md:bg-white
                  max-w-[250px]
                  w-fit
                  text-lg
                  font-semibold text-neutral-800
                  placeholder-neutral-800
                  focus:placeholder-neutral-300
                  search-input outline-no ne ring-0 focus:ring-0 focus:outline-none focus:border-none border-none"
                type="text"
              />
              <label className="pl-5 text-stone-400 text-sm">
                Choose one destination
              </label>
            </div>
          </div>

          <RoomAdultChildCountInput optionsOpen={optionsOpen} setOptionsOpen={setOptionsOpen} />
          <NationalityInput optionsOpen={optionsOpen} setOptionsOpen={setOptionsOpen}/>
        </section>
        <section className="md:flex w-full">
          {/* <div className="h-[70px]  flex justify-center items-center w-1/3">
          <HotelDateRangeInput className="flex-1" />
        </div> */}
          <CategoryInput optionsOpen={optionsOpen} setOptionsOpen={setOptionsOpen}/>
          <CheckInDate  />

          <CheckOutDate  />
          <div className="w-full md:w-1/4 flex justify-center items-center pt-3">
            <ButtonSubmit href={"/" as Route} />
          </div>
        </section>
      </div>
    </>
  );
}
