"use client"

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppSelector } from "@/redux/store";
import { useRouter } from 'next/navigation';
import Image from 'next/image';


const OrderCancelPage = () => {

   const { user } = useSelector(
      (state: RootState) => state.users
   );
   const { config, globalData } = useAppSelector((state) => state.initials)

   const router = useRouter()

   const handleNavigateHome = () => {
      router.push('/')
   }

   interface userData {
      email: string,
      name: string,
      affiliateCode: string,
      balance: number,
      isAffiliate: boolean,
      isEmailVerified: boolean,
      _id: string
   }
   let data = user


   return (
      <div className="max-w-screen-2xl mx-auto py-20">
         <div className=" bg-white shadow-sm p-5 w-full rounded-[0.40rem] border">
            <div className="border-b flex justify-center pb-3">
               <img src={config?.NEXT_PUBLIC_COMPANY_LOGO} alt="hero" className=" w-40" />
            </div>
            <div className="details">
               <div className="bg-primary-500 flex p-3 space-x-5 rounded-[0.25rem]">
                  <div className="text-main">
                     <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Dialog-warning.svg/2048px-Dialog-warning.svg.png"} alt="warning" className="h-12" />
                  </div>
                  <div className="text-gray-200">
                     <h3 className="uppercase font-semibold text-lg ">
                        Oops! Your payment did not get through
                     </h3>
                     <p className="text-sm">
                        We regret to inform you that your payment has been
                        declined. Following might be one of the reasons for the
                        payment decline
                     </p>
                  </div>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2 text-textColor">

                  {data?.name ? (
                     <div className="flex justify-between border h-7 text-sm p-2">
                        <span className="font-medium">Customer Name</span>
                        <span className="">{data?.name}</span>
                     </div>
                  ) : ""}
                  {data?.email ? (
                     <div className="flex justify-between border h-7 text-sm p-2">
                        <span className="font-medium">Customer Email</span>
                        <span className="">{data?.email}</span>
                     </div>
                  ) : ""}
               </div>

               <div className="">
                  <div className=" sm:flex justify-between items-center">
                     <div className="sm:w-9/12 grid md:grid-cols-2 gap-2 p-6">
                        <div className="border rounded-[.25rem] pl-2 py-1 border-[#A0C3D2]">
                           <span className="">
                              1. Unauthorized Card Country
                           </span>
                           <span className=""></span>
                        </div>
                        <div className="border rounded-[.25rem] pl-2 py-1 border-[#A0C3D2]">
                           <span className="">2. Unauthorized IP Country</span>
                           <span className=""></span>
                        </div>
                        <div className="border rounded-[.25rem] pl-2 py-1 border-[#A0C3D2]">
                           <span className="">
                              3. Temporary technical issue
                           </span>
                           <span className=""></span>
                        </div>
                        <div className="border rounded-[.25rem] pl-2 py-1 border-[#A0C3D2]">
                           <span className="">4. Authentication Failed</span>
                           <span className=""></span>
                        </div>
                        <div className="border rounded-[.25rem] pl-2 py-1 border-[#A0C3D2]">
                           <span className="">5. Autherization Declined</span>
                           <span className=""></span>
                        </div>
                     </div>
                     <div className="w-3/12 mx-auto">
                        {/* <Lottie animationData={errorAnimation} /> */}
                     </div>
                  </div>
                  <div className="flex justify-center">
                     <button
                        className="text-sm bg-buttonprimry-6000 text-light w-[100px] py-1 rounded-[0.25rem] bg-primary-6000 hover:bg-primary-700 text-white"
                        onClick={handleNavigateHome}
                     >
                        Try Again
                     </button>
                  </div>
               </div>

               <div className="grid sm:grid-cols-3 mt-4">
                  <div className="flex space-x-2 bg-soft shadow-sm p-2">
                     <div className=" h-10 w-10 text-2xl rounded-full bg-[#A0C3D2] flex justify-center items-center">
                        <i className="las la-headset"></i>
                     </div>
                     <div className="">
                        <p className="text-sm text-darktext underline font-medium">
                           24/7 Live Support
                        </p>
                        <p className="text-xs text-gray-600">
                           Available live support
                        </p>
                     </div>
                  </div>
                  <div className="flex space-x-2 bg-soft shadow-sm p-2">
                     <div className=" h-10 w-10 text-2xl rounded-full bg-[#A0C3D2] flex justify-center items-center">
                        <i className="las la-phone-volume"></i>
                     </div>
                     <div className="">
                        <p className="text-sm text-darktext underline font-medium">
                           Call Us
                        </p>
                        <p className="text-xs text-gray-600">
                           +{globalData?.home?.phoneNumber1}
                        </p>
                     </div>
                  </div>
                  <div className="flex space-x-2 bg-soft shadow-sm p-2">
                     <div className=" h-10 w-10 text-2xl rounded-full bg-[#A0C3D2] flex justify-center items-center">
                        <i className="las la-envelope"></i>
                     </div>
                     <div className="">
                        <p className="text-sm text-darktext underline font-medium">
                           Email Us
                        </p>
                        <p className="text-xs text-gray-600">{globalData?.home?.email}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default OrderCancelPage