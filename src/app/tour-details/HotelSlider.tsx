import React, { useEffect, useState } from 'react'
import Heading from "@/shared/Heading";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";
import { useWindowSize } from 'react-use';
import PrevBtn from '@/components/PrevBtn';
import NextBtn from '@/components/NextBtn';
export interface ToursProps {
    className?: string;
    itemClassName?: string;
   
    hotel?: any;
    itemPerRow?: 4 | 5;
    sliderStyle?: "style1" | "style2";
}

export default function HotelSlider({
    className = "",
    itemClassName = "",
    hotel,
    itemPerRow = 5,
    sliderStyle = "style1",
}:ToursProps):React.ReactElement {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [numberOfItems, setNumberOfitem] = useState(0);

    const windowWidth = useWindowSize().width;
    useEffect(() => {
        if (windowWidth < 320) {
            return setNumberOfitem(1);
        }
        if (windowWidth < 500) {
            return setNumberOfitem(itemPerRow - 3);
        }
        if (windowWidth < 1024) {
            return setNumberOfitem(itemPerRow - 2);
        }
        if (windowWidth < 1280) {
            return setNumberOfitem(itemPerRow - 1);
        }

        setNumberOfitem(itemPerRow);
    }, [itemPerRow, windowWidth]);

    function changeItemId(newVal: number) {
        if (newVal > currentIndex) {
            setDirection(1);
        } else {
            setDirection(-1);
        }
        setCurrentIndex(newVal);
    }

    // return if data is not persist.
    // if (typeof data === "undefined") {
    //     return null
    // }

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if(hotel.hotelOptions){

                if (currentIndex < hotel?.length - 1) {
                    changeItemId(currentIndex + 1);
                }
            }
        },
        onSwipedRight: () => {
            if (currentIndex > 0) {
                changeItemId(currentIndex - 1);
            }
        },
        trackMouse: true,
    });
    if (!numberOfItems) return <></>;
  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
    <MotionConfig
        transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        }}
    >


        
        <div className={`relative flow-root`} {...handlers}>
            <div className={`flow-root overflow-hidden rounded-xl`}>
                <motion.ul
                    initial={false}
                    className="relative whitespace-nowrap -mx-2 xl:-mx-4"
                >
                    <AnimatePresence initial={false} custom={direction}>



                        {hotel?.hotelOptions?.map((item:any, indx:number) => (
                            <motion.li
                                className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                                custom={direction}
                                initial={{
                                    x: `${(currentIndex - 1) * -100}%`,
                                }}
                                animate={{
                                    x: `${currentIndex * -100}%`,
                                }}
                                variants={variants(200, 1)}
                                key={indx}
                                style={{
                                    width: `calc(1/${numberOfItems} * 100%)`,
                                }}
                            >
                               
                             
       
              
              <div className=' w-full overflow-hidden'>
                <button className="px-3 py-1 bg-blue-600 rounded-lg text-white whitespace-nowrap mt-3 text-[12px] sm:text-base w-full">*{item?.hotel?.hotelName}</button>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-3 ">
                    <img className="w-full rounded-md  h-[200px]" src={item?.hotel?.image?.path} alt="img" />
                </div>
                <h1 className="text-[11px] font-semibold text-stone-500 text-center">{item?.roomType?.roomName}</h1>
                      <h1 className="text-[10px] font-semibold p-1">{item?.hotel?.address}</h1>
              </div>
              
            
                            </motion.li>
                        ))}



                    </AnimatePresence>
                </motion.ul>
            </div>

            {currentIndex ? (
                <PrevBtn
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={() => changeItemId(currentIndex - 1)}
                    className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -left-3 xl:-left-6 top-1/3 -translate-y-1/2 z-[1]"
                />
            ) : null}

            {hotel!?.length > currentIndex + numberOfItems ? (
                <NextBtn
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={() => changeItemId(currentIndex + 1)}
                    className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1]"
                />
            ) : null}
        </div>



    </MotionConfig>
</div>
  )
}
