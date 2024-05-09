import React, { FC, useEffect, useState } from "react";
import ModalSelectDate from "@/components/ModalSelectDate";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { ExcursionDetails } from "@/data/attraction/types";
import { addDays, format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import priceConversion from "@/utils/priceConversion";
import { Route } from "next";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MobileMovingBorderButton } from "@/components/MobileMovingBorderButton";
import StartRating from "@/components/StartRating";

interface MobileFooterStickyProps {
	attractionData?: ExcursionDetails;
}

const MobileFooterStickyDate: FC<MobileFooterStickyProps> = ({
	attractionData,
}) => {
	const thisPathname = usePathname();

	const [startDate, setStartDate] = useState<Date>(
		attractionData && attractionData.bookingPriorDays
			? addDays(new Date(), Number(attractionData.bookingPriorDays))
			: addDays(new Date(), 1)
	);

	const { selectedCurrency } = useSelector(
		(state: RootState) => state.initials
	);


	const [isMobile, setIsMobile] = useState(false);

// Check the window width and update isMobile state
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 767); // Adjust the threshold based on your mobile breakpoint
  };

  // Initial check on component mount
  handleResize();

  // Add event listener for window resize
  window.addEventListener('resize', handleResize);

  // Cleanup the event listener on component unmount
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);


	return (
		<div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
			<div className="container flex items-center justify-between">
				{/* {renderPage(page)} */}
				<div className="">
				
					{attractionData?.activities?.length ? (
						<span className="block text-xl font-semibold">
							{priceConversion(
								attractionData.activities[0].lowPrice,
								selectedCurrency,
								true
							)}
							<span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
								lowest price
							</span>
						</span>
					) : (
						"No price showing"
					)}
					<div className="flex gap-2 items-center">
					<ModalSelectDate
						setStartDate={setStartDate}
						startDate={startDate}
						renderChildren={({ openModal }) => (
							<span
								onClick={openModal}
								className="block text-sm underline font-medium"
							>
								{/* {converSelectedDateToString([startDate, endDate])} */}
								{format(startDate, "d MMM")}
							</span>
						)}
					/>
						<StartRating
						point={
							attractionData?.averageRating
								? Number(
										attractionData?.averageRating?.toFixed(
											2
										)
								  )
								: 0
						}
						reviewCount={attractionData?.totalRating}
						className=""
					/>
					</div>
				</div>
				{/* <ModalReserveMobile
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
              onClick={openModal}
            >
              Reserve
            </ButtonPrimary>
          )}
        /> */}
		{!isMobile ? null : (
						<Link href={
						`${thisPathname}/activity?date=${startDate.toISOString()}` as Route
					}>
						<MobileMovingBorderButton
							duration={2000}
							width="w-24"
							borderRadius="1.75rem"
							className="bg-white border-primary-6000 w-24 md:hidden dark:bg-slate-900 text-black dark:text-white text-[18px] dark:border-slate-800"

						>Reserve</MobileMovingBorderButton>
					</Link>
		)}


				{/* <ButtonPrimary
					className="animate-shadowping"
					href={
						`${thisPathname}/activity?date=${startDate.toISOString()}` as Route
					}
					sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
				>
					Reserve
				</ButtonPrimary> */}
			</div>
		</div>
	);
};

export default MobileFooterStickyDate;
