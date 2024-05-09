"use client";

import React, { FC, useEffect, useState } from "react";
import Heading from "@/shared/Heading";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextBtn";
import { variants } from "@/utils/animationVariants";
import { useWindowSize } from "react-use";
import { SearchByDestination } from "@/data/attraction/types";
import HotelSvg from "@/images/landings/hotel.svg";
import LocationSvg from "@/images/landings/location-marker.svg";
import PassportSvg from "@/images/landings/passport-control.svg";
import WavesSvg from "@/images/landings/Wave-10s-1920px.svg";
import uaeSvg from "@/images/landings/uae-flag.svg";
import blogSvg from "@/images/landings/blogs.svg";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import textureBG from "@/images/landings/texture.png";
import Image from "next/image";

export interface SliderCardsProps {
	className?: string;
	itemClassName?: string;
	itemPerRow?: 4 | 5;
	sliderStyle?: "style1" | "style2";
}

const SliderOurServices: FC<SliderCardsProps> = ({
	className = "",
	itemClassName = "",
	itemPerRow = 5,
	sliderStyle = "style1",
}) => {
	const data = [
		{
			className:
				"border bg-orange-300 min-h-[500px] rounded-xl overflow-hidden w-[90vw] md:w-full",
			heading: "Attractions",
			description:
				"We offer an array of diverse experiences for your travel and tours in UAE to ensure there's something special for every traveler to discover. Whether you thrive on adventure or find solace in nature, our tour agency in Dubai caters to all tastes. For thrill-seekers, our offerings include the Desert Safari in Dubai, Jebel Jais Zipline, and much more. Nature lovers can bask in the scenic beauty of Fujairah or dive into the culture on an Abu Dhabi City Tour. Choose what you like to do and make a booking online.",
			image: HotelSvg,
			alt: "icon",
			comingSoon: false,
		},
		{
			className:
				"bg-blue-200 rounded-xl min-h-[500px] overflow-hidden w-[90vw] md:w-full",
			heading: "Visa Services",
			description:
				"Our travel agency in UAE is here to simplify the visa process for you. Whether you're planning a leisurely escape, business trip, or family vacation, our expert team navigates the intricacies of visa applications to make the journey to the UAE smoother for you. With a commitment to efficiency and accuracy, we offer a swift and reliable visa processing experience. Trust us to handle the paperwork, so you can focus on creating unforgettable moments.",
			image: PassportSvg,
			alt: "icon",
			comingSoon: false,
		},
		{
			className:
				"bg-green-300 rounded-xl min-h-[500px] overflow-hidden w-[90vw] md:w-full",
			heading: "Hotel Bookings",
			description:
				"Discover hassle-free hotel bookings with us! Our tourism company in Dubai is connected with over 1200 hotels, providing a variety of options suiting your preferences. Experience the ease of online hotel booking through our platform to ensure a personalized experience for every stay. From luxurious resorts to charming hotels, our extensive network offers the perfect accommodation for your memorable trip.",
			image: LocationSvg,
			alt: "icon",
			comingSoon: true,
		},
	];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const [numberOfItems, setNumberOfitem] = useState(0);

	const windowWidth = useWindowSize().width;
	useEffect(() => {
		if (windowWidth < 320) {
			return setNumberOfitem(1);
		}
		if (windowWidth < 500) {
			return setNumberOfitem(1);
		}
		if (windowWidth < 1024) {
			return setNumberOfitem(1);
		}
		if (windowWidth < 1280) {
			return setNumberOfitem(1);
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
	if (typeof data === "undefined") {
		return null;
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (currentIndex < data?.length - 1) {
				changeItemId(currentIndex + 1);
			}
		},
		onSwipedRight: () => {
			if (currentIndex > 0) {
				changeItemId(currentIndex - 1);
			}
		},
		trackMouse: true,
	});

	if (!numberOfItems) return null;

	return (
		<div className={`nc-SectionSliderNewCategories ${className}`}>
			<MotionConfig
				transition={{
					x: { type: "spring", stiffness: 300, damping: 30 },
					opacity: { duration: 0.2 },
				}}
			>
				<div className={`relative flow-root`} {...handlers}>
					<div className={`flow-root  rounded-xl`}>
						<motion.ul
							initial={false}
							className="relative flex  -mx-2 xl:-mx-4"
						>
							<AnimatePresence initial={false} custom={direction}>
								{data.map((item, indx) => (
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
										<div className={`${item?.className}`}>
											<div className=" w-full h-full p-8">
												<div className="flex justify-between">
													<h3
														className={`text-xl md:text-xl  font-semibold text-center flex items-end gap-2`}
													>
														{/* <i className="las la-fighter-jet pr-2"></i> */}
														<Image
															src={item?.image}
															alt="icon"
															width={300}
															height={300}
															className="w-16 h-16"
														/>
														{item?.heading}
													</h3>
												</div>
												<p className="block mt-2 md:mt-3 font-normal text-base sm:text-sm w-fit">
													{item?.description}
												</p>
											</div>
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

					{data.length > currentIndex + numberOfItems ? (
						<NextBtn
							style={{ transform: "translate3d(0, 0, 0)" }}
							onClick={() => changeItemId(currentIndex + 1)}
							className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1]"
						/>
					) : null}
				</div>
			</MotionConfig>
		</div>
	);
};

export default SliderOurServices;
