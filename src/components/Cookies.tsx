'use client'
import React, { useEffect, useState } from 'react'
import './Cookies.css'
export default function Cookies():React.ReactElement {
    const [hide, setHide] = useState(true)
    useEffect(() => {
        const hideTimeout = setTimeout(() => {
            setHide(false);
        }, 10000);
    
        return () => {
            clearTimeout(hideTimeout);
        };
    }, []);
    
  return (
    <div className={`${hide && 'move-dawn'} cookie-container fixed bottom-5 left-5 w-1/2 bg-white rounded-xl border-8 z-50 p-4`}>
      <h1 className='font-bold'>We value your privacy</h1>
      <p className='mt-3'>We use cookies to enhance your browsing experience, By clicking "Accept All" you consent to our use of cookies. <span className='text-blue-500'>Cookie Policy</span> </p>
        <div className='flex justify-center items-center gap-2 w-full p-2'>
                <button
                onClick={()=>setHide(true)}
                 className='w-[100px] flex justify-center items-center border-2 border-blue-600 text-blue-600 text-sm font-bold h-[40px]'>Reject All</button>
                <button className='w-[100px] flex justify-center items-center border-2 bg-blue-600 text-white text-sm font-bold h-[40px]'>Accept All</button>
        </div>
    </div>
  )
}
