"use client";
import "./tour-details.css";
import { tours } from "@/app/constants";
import TourEnquiry from "../TourEnquiry";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import Image from "next/legacy/image";
import HotelSlider from "../HotelSlider";
import { TourDetails } from "@/data/tours/types";
import BannerImageSlider from "./BannerImageSlider";
import { useAppSelector } from "@/redux/store";

type TourDetailPageProps = {
  slug: string;
};

export default function TourDetails({ slug }: TourDetailPageProps) {
  const { config } = useAppSelector((state) => state.initials);
  const [imageModal, setImageModal] = useState(false);
  const TourDetails = tours.find((element) => element._id === "1");
  const [tourDetail, setTourDetail] = useState<TourDetails>();

  const findTourDetails = async () => {
    try {
      const tourDeatails = await fetch(
        `${config?.NEXT_PUBLIC_TOURS_URL}/api/v1/tour-packages/single/${slug}`,
        { next: { revalidate: 60 } }
      );

      return tourDeatails.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function getTourDetails() {
    try {
      const response = await findTourDetails();
      setTourDetail(response as TourDetails);

      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTourDetails();
  }, []);

  useEffect(() => {}, []);

  function totalNights() {
    if ((TourDetails?.days.length as number) > 1) {
      return (TourDetails?.days.length as number) - 1;
    } else {
      1;
    }
  }

  function imageModalContent(imageArray: string[]) {
    return (
      <div className="bg-white w-[300px] h-[400px] sm:w-[500px] sm:h-[550px] rounded-md overflow-y-scroll p-3 grid grid-cols-4 ">
        {imageArray?.map((image, index) => {
          return (
            <>
              <div className="col-span-4 w-full h-[200px] mb-2 relative">
             
                <Image
                  src={`${config?.NEXT_PUBLIC_TOURS_URL + image}`}
                  alt="image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </>
          );
        })}
      </div>
    );
  }

  const otherDetails = () => {
    return (
      <>
        <section className="w-full bg-white mt-3 p-2 rounded-xl border ">
          <h1 className="font-bold mt-3">Terms And Conditions</h1>
          <p
            dangerouslySetInnerHTML={{ __html:tourDetail?.termsAndConditions ? tourDetail.termsAndConditions : ''}}
            className="text-stone-500 text-[10px] sm:text-sm md:text-base text-justify"
          ></p>
        </section>

        <section className="w-full bg-white mt-3 p-2 rounded-xl border ">
          <h1 className="font-bold mt-3">Visa Policy</h1>
          <p
            dangerouslySetInnerHTML={{ __html: tourDetail?.visaPolicy ? tourDetail?.visaPolicy :''}}
            className="text-stone-500 text-[10px] sm:text-sm md:text-base text-justify"
          ></p>
        </section>

        <section className="w-full bg-white mt-3 p-2 rounded-xl border ">
          <h1 className="font-bold mt-3">Inclusions</h1>
          <p
            dangerouslySetInnerHTML={{ __html: tourDetail?.inclusions? tourDetail?.inclusions :''}}
            className="text-stone-500 text-[10px] sm:text-sm md:text-base text-justify"
          ></p>
        </section>

        <section className="w-full bg-white mt-3 p-2 rounded-xl border ">
          <h1 className="font-bold mt-3">Exclusions</h1>
          <p
            dangerouslySetInnerHTML={{ __html: tourDetail?.exclusions ?  tourDetail?.exclusions: '' }}
            className="text-stone-500 text-[10px] sm:text-sm md:text-base text-justify"
          ></p>
        </section>
      </>
    );
  };

  const packageDetails = () => {
    return (
      <div className="w-full bg-white mt-3 p-2 rounded-xl border">
        <h1 className="font-bold mt-3">Over View</h1>
        <p className="text-stone-500 text-[10px] sm:text-sm md:text-base text-justify">
          {tourDetail?.overveiw}
        </p>
        <section className="">
          <h1 className="font-bold mt-5 ">Itineraries</h1>

          {tourDetail?.itineraries?.map((day: any, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row w-full gap-4 sm:gap-10 px-1 sm:py-3"
              >
                <div
                  className={`${
                    index % 2 === 0 ? " bg-fuchsia-400" : " bg-fuchsia-600"
                  } hidden sm:flex  text-white   flex-col justify-center items-center p-1 text-[13px]`}
                >
                  Day <span>{index + 1}</span>
                </div>
                <div
                  className={`${
                    index % 2 === 0 ? " bg-fuchsia-400" : " bg-fuchsia-600"
                  } sm:hidden  text-white  flex font-bold justify-center items-center p-1 text-[13px]`}
                >
                  {" "}
                  Day {index + 1}
                </div>
                <div className="w-[100%]">
                  <h1 className="text-[13px] sm:text-sm md:text-base font-semibold text-stone-700 mb-1">
                    {day.title}
                  </h1>
                  <div className="flex flex-col gap-10  w-full">
                    {day.itineraryItems.map((schedule: any, index: number) => {
                      return (
                        <div
                          style={{ width: "100%" }}
                          key={index}
                          className=" flex  flex-col md:flex-row gap-2 w-[100%] flex-shrink-0 border rounded p-1 cursor-pointer "
                        >
                          <div className="w-[200px] h-[200px] md:w-[100px] md:h-[100px] flex-shrink-0 relative">
                            <Modal
                              setModalOpen={setImageModal}
                              modalOpen={imageModal}
                              children={imageModalContent(
                                schedule.activity.attraction.images
                              )}
                            />
                            <h1 className="absolute bottom-0 right-1 text-white text-sm font-semibold z-10">
                              View All
                            </h1>

                            <div className="w-full h-full rounded overflow-hidden flex-shrink-0 relative">
                              <Image
                                onClick={(e) => {
                                  setImageModal(true);
                                  e.stopPropagation();
                                }}
                                 
                                src={`${
                                  config?.NEXT_PUBLIC_TOURS_URL +
                                  schedule.activity.attraction.thumbnail
                                }`}
                                alt="Image description"
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                          </div>

                          <div>
                            <h1 className="text-[13px] sm:text-sm md:text-base font-semibold text-stone-600">
                              {schedule.itineraryName}
                            </h1>
                            <p className="text-stone-500 text-[13px] sm:text-sm md:text-base">
                              {schedule.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    );
  };
 
  return (
    <section className="container   pt-3 ">
      <div className="tour-detail-banner-container relative w-full   rounded-t-lg overflow-hidden  ">
        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0">
          <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-white">
            {tourDetail?.destination?.name} Tour Packages
          </h1>
        </div>

      <div className="w-full h-[150px] sm:h-[220px] md:h-[260px] relative ">
       
            <img
              className="w-full   h-full "
              src={`${config?.NEXT_PUBLIC_TOURS_URL}${tourDetail?.thumbnail || ''}`}
              alt="banner image"
            />
            {/* <BannerImageSlider/> */}
      </div>

      </div>
      <div className="w-full bg-white  rounded-b-xl flex p-3 justify-between h-fit min-h-[80px] border relative ">
        <h1 className="font-bold text-sm sm:text-base md:text-xl lg:text:2xl ">
          {tourDetail?.packageName}
        <h2 className="text-[12px] sm:text-sm text-stone-600 lg:hidden">From <span>AED {tourDetail?.totalPrice}</span> Per Person</h2>
        </h1>

        <TourEnquiry tourDetails={tourDetail} />
      </div>

      {packageDetails()}

      <>{otherDetails()}</>

      <section className="bg-white mt-3 p-3 rounded-xl border">
        <h1 className="sm:text-xl">Hotel Options</h1>
        {tourDetail?.hotels?.map((hotel: any, index: number) => {
          return (
            <div key={index}>
              {/* <div className="mt-3">City</div> */}
              <h1 className="text-[12px] sm:text-[14px] text-black">
                {hotel.title}
              </h1>
              <h1 className="text-[12px] sm:text-[14px] text-stone-500">
                {hotel.noOfNights} Nights
              </h1>
              <h2>{hotel.price} AED</h2>

              <HotelSlider hotel={hotel} />
            </div>
          );
        })}
      </section>
    </section>
  );
}
