import { roomIcon } from "@/app/svgs";
import React, { useState } from "react";

type OpenObjectType = {
  room: boolean;
  country: boolean;
  category: boolean;
}
type RoomProps={
  optionsOpen:OpenObjectType,
  setOptionsOpen: (newValue: OpenObjectType) => void;
}

export default function RoomAdultChildCountInput({optionsOpen,setOptionsOpen}:RoomProps): React.ReactElement {
  const count = [1, 2, 3, 4];
  const [hotelCount, setHotelCount] = useState('1');
  

  function renderSelect() {
    return (
      <div className="z-10 bg-white p-4 min-w-[250px] w-full sm:w-1/2 md:w-full flex flex-col items-center absolute bottom-[-130px] left-0 md:left-[50%] md:translate-x-[-50%] rounded-2xl shadow-2xl shadow-slate-900">
        <div className="flex gap-2">
          <section className="flex flex-col">
            <div className="text-sm font-semibold">Rooms</div>
            <select
              className=" ring-0 focus:ring-0 focus:outline-none "
              name=""
              id=""
            >
              {count.map((elem, index) => {
                return (
                  <option key={index} value="1">
                    {elem}
                  </option>
                );
              })}
            </select>
          </section>

                

          <div className="flex gap-2 ">
          <section className="flex flex-col">
            <div className="text-sm font-semibold">Adult</div>
            <select
              className=" ring-0 focus:ring-0 focus:outline-none "
              name=""
              id=""
            >
              {count.map((elem, index) => {
                return (
                  <option key={index} value="1">
                    {elem}
                  </option>
                );
              })}
            </select>
          </section>

          <section className="flex flex-col">
            <div className="text-sm font-semibold">Child</div>
            <select
              className=" ring-0 focus:ring-0 focus:outline-none "
              name=""
              id=""
            >
              {count.map((elem, index) => {
                return (
                  <option key={index} value="1">
                    {elem}
                  </option>
                );
              })}
            </select>
          </section>
          </div>


        </div>
        <button
        onClick={(e)=>{
          setOptionsOpen(
            {
              room: false,
              country:false,
              category:false,
            }
          )
        
          e.stopPropagation()
        }}
         className="bg-blue-600 text-white font-bold px-2 py-1 rounded-md mt-3 w-full max-w-[200px] mx-auto ">OK</button>
      </div>
    );
  }

  return (
    <div
      onClick={() =>{
        setOptionsOpen(
          {
            room: true,
            country:false,
            category:false,
          }
        )}}
      className="h-[70px] flex   md:justify-center items-center cursor-pointer gap-2 relative w-full md:w-1/3"
    >
        <div className="text-stone-300 mr-2">
            {roomIcon}
          </div>
      <section className="flex flex-col">
        <label className="font-semibold  h-[30px]">Rooms</label>
        <div className="text-sm text-stone-400 text-center">1</div>
      </section>

      <section className="flex flex-col">
        <label className="font-semibold  h-[30px]">Adult</label>
        <div className="text-sm text-stone-400 text-center">1</div>
      </section>

      <section className="flex flex-col">
        <label className="font-semibold  h-[30px]">Child</label>
        <div className="text-sm text-stone-400 text-center">0</div>
      </section>
      {optionsOpen.room && renderSelect() }
    </div>
  );
}
