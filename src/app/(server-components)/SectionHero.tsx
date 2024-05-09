import React, { FC, useEffect, useState } from "react";
import HeroSearchForm, {
  SearchTab,
} from "../(client-components)/(HeroSearchForm)/HeroSearchForm";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";
import MobileSearchForm from "../(client-components)/(HeroSearchForm2Mobile)/MobileSearchForm";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "@/redux/store";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
export interface SectionHeroProps {
  className?: string;
  currentPage: "Stays" | "Experiences" | "Visa" | "Flights" | "Tours" | "Hotel";
  currentTab: SearchTab;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  currentPage,
  currentTab,
}) => {
  const { config, globalData } = useAppSelector((state) => state.initials)
  const backgroundVideo = config?.NEXT_PUBLIC_BANNER_VIDEO;
  const backgroundImage = config?.NEXT_PUBLIC_BANNER_IMAGE;

  const [isMobile, setIsMobile] = useState(false);

  const cardsData = globalData && globalData.home ? globalData.home.cards : [];

  const [currentSlide, setCurrentSlide] = useState(0);

  const updateCurrentSlide = (index: number) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  // Check the window width and update isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767); // Adjust the threshold based on your mobile breakpoint
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`nc-SectionHero hidden md:flex flex-col-reverse lg:flex-col min-h-[300px] max-h-[400px] relative ${className}`}
    >
      <div className="max-h-[300px]">
        <Carousel
          infiniteLoop
          autoPlay
          showThumbs={false}
          interval={9000}
          showArrows={false}
          stopOnHover
          swipeable={false}
          selectedItem={currentSlide}
          showIndicators={false}
          showStatus={false}
          onChange={updateCurrentSlide}
        >
          {cardsData &&
            cardsData.map((item, index) => (
              <>
                <div className="absolute z-20 xl:bottom-20 md:bottom-[15em] lg:bottom-[9.5em]">
                  <p
                    className="ml-10 cursor-pointer -mb-10 text-2xl font-bold text-gray-400 hover:text-gray-400 bg-transparent border-2 transition-all duration-300 border-white hover:bg-soft h-14 w-14 rounded-full flex justify-center items-center"
                    onClick={() => setCurrentSlide(currentSlide + 1)}
                  >
                    <ChevronRightIcon />
                  </p>
                </div>

                <div
                  onClick={() => window.open(`${item?.url}`, "_blank")}
                  className="bg-inherit cursor-pointer h-[20em] md:h-[30em] relative object-cover"
                  key={index}
                >
                  <p className="absolute  top-0 text-center w-full z-10">
                    <div className="h-[20em] xl:h-[28em] lg:h-[23em] md:h-[18em] sm:h-[22em] flex flex-col justify-end">
                      <div className="">
                        <div
                          className="text-3xl text-white font-extrabold  heading uppercase"
                          style={{
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          {item?.title}
                        </div>
                        <div
                          className=" text-sm text-white font-medium"
                          style={{
                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          {item?.description}
                        </div>
                      </div>
                    </div>
                  </p>
                  <Image
                    src={`${config?.NEXT_PUBLIC_CDN_URL}${item.backgroundImage}`}
                    alt={`Slide ${index + 1}`}
                    width={1000}
                    height={100}
                    className=""
                  />
                </div>
              </>
            ))}
        </Carousel>
      </div>

      {/* {isMobile ? null : (
      <video
        autoPlay
        loop
        muted
        className="hidden md:block"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
)} */}

      {/* <div className="absolute hidden md:block inset-0 bg-primary-6000/10" /> */}

      <div className="hidden container md:hidden lg:block lg:mb-0 lg:-mt-40 w-full ">
        <div className="md:flex hidden">
          <HeroSearchForm currentPage={currentPage} currentTab={currentTab} />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
