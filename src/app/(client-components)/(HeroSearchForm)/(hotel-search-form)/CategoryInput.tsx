import { starIcon } from '@/app/svgs'
import React, { useState } from 'react'
type OpenObjectType = {
  room: boolean;
  country: boolean;
  category: boolean;
}
type CategoryProps={
  optionsOpen:OpenObjectType,
  setOptionsOpen: (newValue: OpenObjectType) => void;
}

export default function CategoryInput({optionsOpen,setOptionsOpen}:CategoryProps):React.ReactElement {
    const [category,setCategory]= useState('')
    const [open,setOpen]=useState(false)
    const categoryArray=['1 Star','2 Star','3 Star','4 Star','5 Star','Apartment','Hostel','Unrated']
   
   
    function renderCatagory(){
        return(
          <div className='p-4 absolute w-full left-[50%] translate-x-[-50%] bottom-0 
           translate-y-[100%] rounded-2xl shadow-2xl shadow-slate-900 bg-white '>
           <div className='font-semibold '>Select Star Category</div>
            {
              categoryArray?.map((elem,index)=>{
                return(
                  <div key={index}
                  onClick={(e)=>{
                    setCategory(elem)
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
                   {elem}
                  </div>
                )
              })
            }
          </div>
        )
      }


  return (
    <div
    onClick={()=>{
      setOptionsOpen(
        {
          room: false,
          country:false,
          category:true,
        }
      )
    }}
     className="flex md:justify-center items-center w-1/3 gap-5 cursor-pointer  h-[70px] w-full md:w-1/4 relative  pt-2">
    <div className="text-stone-300 ">
        {starIcon}
      </div>
      <div className="flex flex-col ">
       
       <label className="font-semibold
        h-[30px]
       ">{category?category:"Star Category"}</label>
        <div className='text-sm text-stone-400'>
        {category?"Category":"Choose Category"}
</div>
      </div>
      {optionsOpen?.category&& renderCatagory()}
    </div>
  )
}
