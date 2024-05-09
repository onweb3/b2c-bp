import React from 'react'
import { IoBedOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FiChrome } from "react-icons/fi";
import './HotelDetails.css'
import { StarIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";
import AnimationImage from './(animation-image)/AnimationImage';
export default function HotelDetails() {
    const images=['https://cf.bstatic.com/xdata/images/hotel/max1024x768/327131338.jpg?k=db70bd7e61ce12f4a21f31564c21a3655a53cb6cab207f010f52bbaf8c1b3364&o=&hp=1'
,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/292959378.jpg?k=28fb1b223297344f55971b4e28f794488453167b50d8c2dbb37c09afc3917f61&o=&hp=1',
'https://cf.bstatic.com/xdata/images/hotel/max1024x768/292988647.jpg?k=c4a6dc49136bcfc315b2755f47e9c9f80c2fb63603435b5792c3eb9c96032a2f&o=&hp=1',
'https://cf.bstatic.com/xdata/images/hotel/max1024x768/327130398.jpg?k=e266498a3b4dee638a4a8adb2106b6228356b97b084df3b03a61ff362661a06e&o=&hp=1',
'https://cf.bstatic.com/xdata/images/hotel/max1024x768/327130396.jpg?k=f85d5b8a5220e18232fd0b74dfb3049d6cc54e4dc1c4e68fa3ff7e93ec6a5b66&o=&hp=1',]
  
const facilityArray=[
   {type:'HEALTHY & SAFETY',items:[
      'Crystal - Hygienic Concept','Minor - AvaniSHIELD','RIU - Covid-19 Health Protocol'
   ]},
   {type:'ROOM FACILITIES (STANDARD ROOM)',items:[
   'Make-Up Mirror','Slippers', 'Toiletries', 'Number Of Bedrooms','Crystal - Hygienic Concept','Minor - AvaniSHIELD','RIU - Covid-19 Health Protocol'
   ]},
]

function availablity(){
   return (
      <section className='flex flex-col lg:flex-row gap-2'>
            <div className='w-full h-[250px] lg:w-1/4 rounded-2xl overflow-hidden mt-2'>
                  <img className='w-full h-full' src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/292959378.jpg?k=28fb1b223297344f55971b4e28f794488453167b50d8c2dbb37c09afc3917f61&o=&hp=1" alt="" />
            </div>
      <div className='border rounded-2xl p-2 mt-2 w-full lg:w-3/4' >
         <h1 className='sm:text-lg md:text-xl font-semibold text-blue-600'>Availablity</h1>

         <h1 className='sm:text-base md:text-lg font-semibold text-stone-700'>Standard Double Or Twin Room</h1>


         <hr className='w-full my-3' />
         <h1 className='text-sm text-stone-500'>Standard Double Or Twin Room With Room Only</h1>
         <section className='flex flex-col md:flex-row gap-10 mt-3'>
            <div className='flex  justify-between w-full sm:w-1/2 max-w-[500px]'>
               <div className='flex justify-between  '>

                <IoBedOutline  className=' w-[30px] h-[30px] m-2 text-blue-600'/>
                  <div className='flex flex-col'>
                     <h2 className='text-[12px] font-semibold text-stone-600 '>Occupancy</h2>
                     <h3 className='text-[12px] text-stone-600'>1 Single</h3>
                  </div>
               </div>
               <h1>Non Refundable</h1>
            </div>

            <div className='w-full sm:w-1/2 h-full '>
               <div className='flex justify-around'>
                  <div className='flex flex-col gap-1'>
                        <h2 className='text-sm'>1 Traveller & 1 Rooms</h2>
                        <h2 className='bg-blue-300 text-white text-center'>Price for 2 nights</h2>
                        <h2 className='font-bold text-gray-600 text-center'>210.00 AED</h2>
                  </div>

                  <div className='flex flex-col'>
                        <button className='bg-blue-600 text-sm font-bold text-white rounded-md p-2 mb-2'>Submit Enquiry</button>
                        <p className='text-[10px] w-[130px] leading-tight'>This room type doesn't have availability. Kindly submit enquiry.</p>
                  </div>
               </div>

            </div>
         </section>

         <hr className='w-full my-3' />
         <h1 className='text-sm text-stone-500'>Standard Double Or Twin Room With Room Only</h1>
         <section className='flex flex-col sm:flex-row gap-10 mt-3'>
            <div className='flex  justify-between w-full sm:w-1/2 max-w-[500px]'>
               <div className='flex justify-between  '>

                <IoBedOutline  className=' w-[30px] h-[30px] m-2 text-blue-600'/>
                  <div className='flex flex-col'>
                     <h2 className='text-[12px] font-semibold text-stone-600 '>Occupancy</h2>
                     <h3 className='text-[12px] text-stone-600'>1 Single</h3>
                  </div>
               </div>
               <h1>Non Refundable</h1>
            </div>

            <div className='w-full sm:w-1/2 h-full '>
               <div className='flex justify-around'>
                  <div className='flex flex-col gap-1'>
                        <h2 className='text-sm'>1 Traveller & 1 Rooms</h2>
                        <h2 className='bg-blue-300 text-white text-center'>Price for 2 nights</h2>
                        <h2 className='font-bold text-gray-600 text-center'>210.00 AED</h2>
                  </div>

                  <div className='flex flex-col'>
                        <button className='bg-blue-600 text-sm font-bold text-white rounded-md p-2 mb-2'>Submit Enquiry</button>
                        <p className='text-[10px] w-[130px] leading-tight'>This room type doesn't have availability. Kindly submit enquiry.</p>
                  </div>
               </div>

            </div>
         </section>

      </div>
      </section>
   )
}

function facilities(){
   return (
      <div>
         <h1>Most popular facilities</h1>
         <div>

         {facilityArray?.map((facility,index)=>{
            return(
               <div key={index}>
                  <div className='flex gap-1 items-center'>
                  <FiChrome />

                  {facility?.type}

                  </div>
                  <section className='flex flex-wrap '>

                     {
                        facility.items.map((item,index)=>{
                           return (
                              <div key={index} className='w-fit flex'>
                              <IoCheckmarkOutline />
                                 {item}
                                
                              </div>
                           )
                        })
                     }
                  </section>


               </div>
            )
         })}
         </div>
      </div>
   )
}

return (
    <div className='container'>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-semibold'>MOUNTAIN SHADOWS RESORTS</h1>
        <div className='flex'>
            <StarIcon className='text-yellow-400 w-5 h-5'/>
            <StarIcon className='text-yellow-400 w-5 h-5'/>
            <StarIcon className='text-yellow-400 w-5 h-5'/>
            <StarIcon className='text-yellow-200 w-5 h-5'/>
            <StarIcon className='text-yellow-200 w-5 h-5'/>
        </div>
     <div className='flex items-center'>
        <MapPinIcon className='w-5 h-5 text-stone-500'/>
        <h2 className='text-stone-500'>Dubai,united arab emirates</h2>
     </div>
     <section className='banner mt-5 w-full flex gap-[10px] '>
        <div className='w-1/2 h-[300px]'>
     <AnimationImage image={images[0]}/>
        </div>

        <div className='w-1/2 h-[300px] grid grid-cols-4 gap-[10px]'>
        <div className='col-span-2 h-[145px]'>
     <AnimationImage image={images[2]}/>
        </div>
        <div className='col-span-2 h-[145px]'>
     <AnimationImage image={images[3]}/>
        </div>
        <div className='col-span-2 h-[145px]'>
     <AnimationImage image={images[4]}/>
        </div>
        <div className='col-span-2 h-[145px]'>
     <AnimationImage image={images[1]}/>
        </div>
        </div>

     </section>

     <div className='border rounded-2xl p-2 mt-2'>
        <h1 className='sm:text-lg md:text-xl font-semibold text-blue-600'>Description</h1>
        <p className='text-[12px] sm:text-sm md:text-base text-stone-700 text-justify '>
        Centrally located in Deira area and a 20 minutes' drive from Dubai International Airport, 
        White Fort offers air-conditioned rooms with a flat-screen TV. It features a restaurant and a 24-hour 
        front desk. Sabkha Bus Station is a 5-minute walk away. Tiled floors and printed wall papers are part 
        of the modern classic décor. Each room offers a minibar and a wardrobe. Free Wi-Fi is available throughout. Some rooms include a balcony. White Fort Hotel's restaurant serves buffet from local and international cuisine. Several cafés, shops and restaurants are within a 10 minutes' walk away. Naif Park is a 5-minute walk away. Dubai World Trade Centre is 15 minutes by hotel. Baniyas Square metro station is a minute walk away. This area is also great for shopping, with popular brands nearby: Apple.
        </p>
     </div>

   {availablity()}
   {facilities()}
    </div>
  )
}
