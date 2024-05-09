import React, { FC, ReactNode } from "react";
import imagePng from "@/images/hero-right2.png";
import HeroSearchForm, {
  SearchTab,
} from "../(client-components)/(HeroSearchForm)/HeroSearchForm";
import Image, { StaticImageData } from "next/image";
import HeroSearchForm2Mobile from "../(client-components)/(HeroSearchForm2Mobile)/HeroSearchForm2Mobile";
import { useAppSelector } from "@/redux/store";

export interface SectionHeroArchivePageProps {
  className?: string;
  listingType?: ReactNode;
  currentPage: "Stays" | "Experiences" | "Visa" | "Flights" | "Hotel";
  currentTab: SearchTab;
  rightImage?: StaticImageData;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = "",
  listingType,
  currentPage,
  currentTab,
  rightImage = imagePng,
}) => {
  const { config } = useAppSelector((state) => state.initials)
  const backgroundVideo = config?.NEXT_PUBLIC_BANNER_VIDEO;

  return (
    <div
      className={`nc-SectionHeroArchivePage  flex flex-col mb-10 min-h-[400px] max-h-[400px] relative ${className}`}
      data-nc-id="SectionHeroArchivePage"
    >
    
      <Image
        src={`${
          config?.NEXT_PUBLIC_CDN_URL +
          "/public/images/destinations/image-1672982741618-547465184.jpg"
        }`}
        className="object-cover w-full  bg-inherit flex-grow relative h-[20em] md:h-[30em]"
        alt="places"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
      />

      <div className="absolute bottom-0 bg-gradient-to-b dark:from-[#1f2836] from-transparent  via-gray-800  to-black">
        <div className=" md:ml-[5%] 2xl:ml-[10%] pb-3">
        <p className="text-2xl text-white border-b-2 mb-3 w-fit font-extrabold">
        Discover Dubai: 69 Must-See Attractions and Experiences
        </p>
        <p className="text-sm text-white"> Uncover the charm and excitement of Dubai with our curated list 
                of 69 top attractions and experiences. From iconic landmarks 
                like the Burj Khalifa to thrilling desert safaris and luxurious
                shopping destinations, explore the best of Dubai and create 
                unforgettable memories in this vibrant city.</p>
                </div>
                </div>
           
        {/* <p className="absolute  top-0 text-center w-full z-10">
          <div className="h-[20em] md:h-[20em] flex flex-col justify-end -ml-[600px] pl-5">
            <div className="mb-10">
              <div
                className="text-2xl text-black font-extrabold   heading uppercase"
                // style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
              >
                <div className="flex flex-col justify-start">
                <p className="md:-ml-[50px] 2xl:-ml-[20%]">
                Discover Dubai: 69 Must-See Attractions
                </p>
                <p className="md:-ml-[50px] 2xl:-ml-[20%]">
                and Experiences
                </p>
                </div>
              
              </div>
              <div
                className="text-md text-black font-bold  heading uppercase"
                
              >
                <p className="md:-ml-[50px] 2xl:-ml-[20%]">
                Uncover the charm and excitement of Dubai with our  <br /> curated list 
                of 69 top attractions and experiences. <br /> From iconic landmarks 
                like the Burj Khalifa to thrilling  <br /> desert safaris and luxurious
                shopping destinations,<br /> explore the best of Dubai and create 
                unforgettable <br /> memories  in this vibrant city.
                </p>
              </div>
            </div>
          </div>
        </p> */}
  

      {/* <div className="absolute md:block hidden inset-0 bg-primary-6000/30" /> */}

      {/* <div className="mt-10 md:hidden block  mb-5 p-2">
        <HeroSearchForm2Mobile />
      </div> */}
    </div>
  );
};

export default SectionHeroArchivePage;
