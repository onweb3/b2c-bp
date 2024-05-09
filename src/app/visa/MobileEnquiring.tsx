import InquirySidebar from '@/components/InquirySidebar/InquirySidebar';
import ButtonPrimary from '@/shared/ButtonPrimary'
import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react'

function MobileEnquiring() {
    const [modal, setModal] = useState(false);
  return (
    <>
        <div className="block lg:hidden fixed bottom-0 inset-x-0  sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
          <div className="container flex py-3 items-center justify-between">
			<p className="text-xl font-bold">Contact Us</p>
			<ButtonPrimary
            onClick={() => setModal(true)}
            >Submit Enquiry</ButtonPrimary>
		  </div>
        </div>

        {modal === true && (
                <div className="fixed w-full h-full z-50 left-0 top-0 backdrop-blur-xl bg-opacity-30 bg-black">
                  <div className="flex w-full justify-center p-4">
                    <div className="bg-white md:mt-[80px] dark:bg-neutral-800  md:min-w-[500px] min-w-full min-h-[650px] md:max-w-[600px] p-2 text-center  md:max-h-[550px] max-h-[400px]  overflow-x-auto py-5 rounded-xl shadow-2xl">
                      {" "}
                      <div>
                        <div className="border-b mb-5 flex justify-between items-center text-center">
                          <h2 className="text-center self-center mt-2 text-lg pb-3 font-semibold pl-4">
                            Enquiry 
                          </h2>
                          <div
                            onClick={() => setModal(false)}
                            className=" dark:bg-neutral-800 cursor-pointer"
                          >
                            <XMarkIcon height={40} width={40} />
                          </div>
                        </div>
                        <div>
                         <InquirySidebar />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
         
 
    </>
  )
}

export default MobileEnquiring