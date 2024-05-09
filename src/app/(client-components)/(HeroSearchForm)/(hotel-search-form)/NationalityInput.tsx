import { flag } from '@/app/svgs'
import React, { useState } from 'react'
import {  useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { InitialCountries } from '@/data/general/types';

type OpenObjectType = {
  room: boolean;
  country: boolean;
  category: boolean;
}
type NationalityProps={
  optionsOpen:OpenObjectType,
  setOptionsOpen: (newValue: OpenObjectType) => void;
}


export default function NationalityInput({optionsOpen,setOptionsOpen}:NationalityProps):React.ReactElement {
  const {  countries } = useSelector((state: RootState) => state.initials)
  const [nationality,setNationality]= useState<InitialCountries|null>(null)


  function capitalizeFirstLetters(text: string|undefined) {
    if(typeof(text)==="string"){
      const words = text?.split(" ");
      const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      return capitalizedWords.join(" ");
    }else{
      return text
    }
  }

  function renderNationality(){
    return(
      <div className='z-10 p-4 absolute w-full left-[50%] translate-x-[-50%] bottom-0  translate-y-[100%] rounded-2xl shadow-2xl shadow-slate-900 bg-white '>
        <div className='font-semibold '>Choose Nationality</div>
        <div className='h-[250px] overflow-y-scroll'>

        {
          countries?.map((elem,index)=>{
            return(
              <div key={index}
              onClick={(e)=>{
                setNationality(elem)
                setOptionsOpen(
                  {
                    room: false,
                    country:false,
                    category:false,
                  }
                )
                e.stopPropagation()
              }}
              >
                {capitalizeFirstLetters(elem?.countryName) }
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }

  return (
    <div 
    onClick={()=>{
      setOptionsOpen(
        {
          room: false,
          country:true,
          category:false,
        }
      )
    }}
    className="flex md:justify-center items-center w-full md:w-1/3 gap-5 cursor-pointer  h-[70px] relative">
        <div className="text-stone-300 ">
            {flag}
          </div>
          <div className="flex flex-col ">
           
           <label className="font-semibold
            h-[30px]
           ">{
            nationality ?capitalizeFirstLetters(nationality?.countryName):"Nationality"
           }</label>
            <div className='text-sm text-stone-400'>{nationality?"Nationality":"Select Nationality"}</div>
          </div>
          {optionsOpen?.country  && renderNationality()}
        </div>
  )
}
