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
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "@/redux/store";
import Link from "next/link";
import { Route } from "next";

export interface SliderCardsProps {
	className?: string;
	itemClassName?: string;
	itemPerRow?: 4 | 5;
	sliderStyle?: "style1" | "style2";
}

const SliderBlogs: FC<SliderCardsProps> = ({
	className = "",
	itemClassName = "",
	itemPerRow = 5,
	sliderStyle = "style1",
}) => {

	const { config } = useAppSelector((state) => state.initials);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const [numberOfItems, setNumberOfitem] = useState(0);
    const { globalData } = useSelector(
		(state: RootState) => state.initials
	);

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
	if (typeof globalData === "undefined") {
		return null;
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (currentIndex < globalData?.recentBlogs?.length - 1) {
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
                            {globalData?.recentBlogs?.slice(0, 3)?.map((item, indx) => (
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
									<Link
							href={`/blog/${item?.slug}` as Route}
							className="cursor-pointer"
							key={item?._id}
						>
							<div className="w-[90vw] relative rounded-xl overflow-hidden">
								<i className="md:text-white absolute top-1 right-3 font-light text-sm ">
									{item?.createdAt?.toString()?.slice(0, 10)}
								</i>
								<div className="overflow-hidden rounded-xl dark:rounded-xl-t">
									<Image
										className="hover:scale-110 object-cover  h-[20em] lg:h-[32.5em] w-full transition-all duration-500 cursor-pointer"
										src={
											config?.NEXT_PUBLIC_CDN_URL +
											item?.thumbnail
										}
										alt={item?.title}
										width={1000}
										height={100}
									/>
								</div>
								<div className="md:absolute  bg-gradient-to-b from-white  md:from-transparent   to-white md:to-black bottom-0 px-3 space-y-3 pb-5 pt-3 text-darktext">
									<div className="font-semibold md:text-white">
										{item?.title}
									</div>

									<div
										className="text-sm text-gray-400 leading-relaxed "
										dangerouslySetInnerHTML={{
											__html:
												item?.body?.slice(0, 150) +
												"...",
										}}
									></div>
								</div>
							</div>
						</Link>
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

					{globalData?.recentBlogs?.length > currentIndex + numberOfItems ? (
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

export default SliderBlogs;
