import React, { useEffect, useState } from 'react'
import './WhatsAppLogin.css'
import {  useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
export default function WhatsAppLognContent() {
    const {  countries } = useSelector((state: RootState) => state.initials)
    const [mobileNoSubmit,setMomileNoSubmit]=useState(false)

    function enterMobile(){
        return(
            <div className='min-w-[500px]  bg-white rounded-xl p-8'>

      <form >

        <div className='flex gap-3 w-full justify-center  items-center'>
            <div className='flex flex-col'>
                <label >Country</label>
            <select className='w-[150px] remove-focus-outline rounded-lg border border-gray-300'>
            {countries?.map((elem, index) => (
                  <option key={index} value={elem.phonecode}>
                    {elem?.countryName}
                  </option>
                ))}
            </select>
            </div>

            <div className='flex flex-col  w-fit '>
            <label >Mobile</label>
       <input
                required
                className="w-  remove-focus-outline rounded-lg border border-gray-300 "
                placeholder="Mobile"
                type="number"
                // value={formData?.phoneNumber ? formData?.phoneNumber : ""}
                title="Please enter only numeric digits"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "+" || e.key === "-") {
                    e.preventDefault();
                  }
                }}
                minLength={10}
                maxLength={10}
               
              />
            </div>

       
        </div>
                    <div className='w-full flex justify-center mt-10'>
                        <button onClick={()=> setMomileNoSubmit(true)} type="button" className="px-3 py-1 bg-blue-600 rounded-lg text-white whitespace-nowrap" >
                        Get Otp
                        </button>
                    </div>
      </form>
    </div>
        )
    }

    function enterOtp(){
      return (
        <div className='min-w-[500px]  bg-white rounded-xl p-8'>
          <section className='flex flex-col'>

         <label >Enter Otp</label>
          <input 
          required
          className="w-  remove-focus-outline rounded-lg border border-gray-300 "
          placeholder="Enter Otp"
          type="number"
          // value={formData?.phoneNumber ? formData?.phoneNumber : ""}
          title="Please enter only numeric digits"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "+" || e.key === "-") {
              e.preventDefault();
            }
          }}
          
           />
          </section>
          <div className='w-full flex justify-center mt-10'>
                        <button  type="button" className="px-3 py-1 bg-blue-600 rounded-lg text-white whitespace-nowrap" >
                      Submit
                        </button>
                    </div>
        </div>
      )
    }

  return (
    <>
    {
      !mobileNoSubmit?
        enterMobile():
        enterOtp()
    }
    </>
  )
}
