"use client";
import Modal from "@/components/Modal";
import React, {  useState } from "react";
import "./TourEnquiry.css";
import EnquiryContent from "./EnquiryContent";
interface TourEnquiry {
  tourDetails: any;
}
export default function TourEnquiry({
  tourDetails,
}: TourEnquiry): React.ReactElement {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const modalContent = () => {
    return (
    
        <EnquiryContent tourDetails={tourDetails}/>
  
    );
  };

  return (
    <>
    <section className="hidden lg:block   absolute bottom-[50px] right-2">
    <div className="w-fit min-h-[100px] h-fit shadow-all-sides px-5 py-2 rounded-xl flex flex-col items-end relative  bg-white">
      <p className="text-[14px]">From AED</p>
      <h1 className="font-bold text-xl">{tourDetails?.totalPrice}</h1>
      <h2 className="text-[14px]">Per Person</h2>
      <div className="w-full flex justify-center">
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          children={modalContent()}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setModalOpen(true);
            e.stopPropagation();
          }}
          className="px-3 py-1 bg-blue-600 rounded-lg text-white whitespace-nowrap"
        >
          ENQUIRY NOW
        </button>
      </div>
    </div>
    </section>
    <section>
    <div className="w-full flex justify-center lg:hidden relative bottom-[-30%] right-2">
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          children={modalContent()}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setModalOpen(true);
            e.stopPropagation();
          }}
          className="px-3 py-1 bg-blue-600 rounded-lg text-white whitespace-nowrap text-sm md:text-base"
        >
          ENQUIRY NOW
        </button>
      </div>
    </section>
    </>
  );
}
