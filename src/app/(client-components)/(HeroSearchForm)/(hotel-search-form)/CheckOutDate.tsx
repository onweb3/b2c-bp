import React from 'react'
import './DateInput.css'

export default function CheckOutDate():React.ReactElement {
  return (
    <div className="flex md:justify-center pl-10 md:pl-0 items-center w-full md:w-1/3 gap-5 cursor-pointer h-[70px]  pt-4 w-1/4 ">
    <div className="flex flex-col">
        <label className="font-semibold h-[30px]  m:text-center ">Check out Date</label>
        <label >
            <input  id="dateInput" className="dateinput bg-gray-100 md:bg-white ring-0 border-0 focus:ring-0 focus:border-0" type="date" />
        </label>
    </div>
</div>
  )
}
