// import React, { FC, useEffect, useState } from "react";
// import GuestsInput from "../GuestsInput";
// import { Route } from "next";
// import TourInput from "../TourInput";
// import HotelInput from "../HotelInput";
// import FlightSearchForm from "../(flight-search-form)/FlightSearchForm";

// export interface HotelSerarchProps {
//   closeModal?: () => void
// }
// interface QueryResponseData {
//   _id?:string,
//   destination?:string,
//   images?:string[]
//  }

// const HotelSearchForm: FC<HotelSerarchProps> = ({ closeModal }) => {
//   const [query, setQuery] = useState<string>("")
//   const [destination, setDestination] = useState<string>("")
//   const [response, setResponse] = useState<QueryResponseData[]>([])

//   const getTours= async ()=>{
//     try {

//         const tours= await fetch(`${config?.NEXT_PUBLIC_TOURS_URL}/api/v1/tour-packages/all`, { next: { revalidate: 60 } })

//         if (!tours.ok) {

//           throw new Error('Failed to fetch data fsdfdsf')
//         }else{

//         }

//         return tours.json()
//     } catch (error) {
//         console.log(error);

//     }
// }

// async function findTours() {
//     try {

//       const response =  await getTours()

//   //  setResponse(response?.tourPackages)

//     } catch (error) {
//         console.log(error);
//     }
// }

// useEffect(() => {
//   const findAttractionQuery = async (queries: string) => {
//     try {
//       console.log('fetching data...');
//       const query = await fetch(`${config?.NEXT_PUBLIC_TOURS_URL}/api/v1/tour-packages/search?search=${queries}`, { cache: 'no-store' });
//       return query.json();
//     } catch (error) {
//       console.log('Error fetching data:', error);
//       throw error;
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const response = await findAttractionQuery(query);
//       console.log(response,'fetch dattaaa');
//       setResponse(response.tourPackages)

//     } catch (error) {
//       console.log('Error in fetchData:', error);
//     }
//   };

//   fetchData();

// }, [query]);

// useEffect(() => {

//     findTours()
// }, [])

//   const renderForm = () => {
//     return (

//             <HotelInput/>
//     );
//   };

//   return renderForm();
// };

// export default HotelSearchForm;

"use client";

import React, { FC, useState } from "react";
import LocationInput from "../LocationInput";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import NcInputNumber from "@/components/NcInputNumber";
import HotelDateRangeInput from "./HotelDateRangeInput";
import { GuestsObject } from "../../type";
import ButtonSubmit from "../ButtonSubmit";
import { Route } from "next";

export interface FlightSearchFormProps {}

const starCategory = [
	{
		name: "5 star",
		href: "##",
	},
	{
		name: "4 star",
		href: "##",
	},
	{
		name: "3 star",
		href: "##",
	},
	{
		name: "2 star",
		href: "##",
	},
	{
		name: "1 star",
		href: "##",
	},
];

export type TypeDropOffLocationType = "roundTrip" | "oneWay" | "";

const FlightSearchForm: FC<FlightSearchFormProps> = ({}) => {
	const [dropOffLocationType, setDropOffLocationType] =
		useState<TypeDropOffLocationType>("roundTrip");
	const [starCategoryState, setStarCategoryState] = useState("5 star");

	const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(1);
	const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
	const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(0);

	const handleChangeData = (value: number, type: keyof GuestsObject) => {
		let newValue = {
			guestAdults: guestAdultsInputValue,
			guestChildren: guestChildrenInputValue,
			guestInfants: guestInfantsInputValue,
		};
		if (type === "guestAdults") {
			setGuestAdultsInputValue(value);
			newValue.guestAdults = value;
		}
		if (type === "guestChildren") {
			setGuestChildrenInputValue(value);
			newValue.guestChildren = value;
		}
		if (type === "guestInfants") {
			setGuestInfantsInputValue(value);
			newValue.guestInfants = value;
		}
	};

	const totalGuests =
		guestChildrenInputValue +
		guestAdultsInputValue +
		guestInfantsInputValue;

	const renderGuest = () => {
		return (
			<Popover className="relative">
				{({ open }) => (
					<>
						<Popover.Button
							as="button"
							className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
						>
							<span>{`${totalGuests || ""} Guests`}</span>
							<ChevronDownIcon
								className={`${
									open ? "" : "text-opacity-70"
								} ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
								aria-hidden="true"
							/>
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel className="absolute z-20 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 left-1/2 -translate-x-1/2  py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black/5 dark:ring-white/10">
								<NcInputNumber
									className="w-full"
									defaultValue={guestAdultsInputValue}
									onChange={(value) =>
										handleChangeData(value, "guestAdults")
									}
									max={10}
									min={1}
									label="Adults"
									desc="Ages 13 or above"
								/>
								<NcInputNumber
									className="w-full mt-6"
									defaultValue={guestChildrenInputValue}
									onChange={(value) =>
										handleChangeData(value, "guestChildren")
									}
									max={4}
									label="Children"
									desc="Ages 2–12"
								/>

								<NcInputNumber
									className="w-full mt-6"
									defaultValue={guestInfantsInputValue}
									onChange={(value) =>
										handleChangeData(value, "guestInfants")
									}
									max={4}
									label="Infants"
									desc="Ages 0–2"
								/>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		);
	};

	const renderStarCategory = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<Popover.Button
							className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
						>
							<span>{`${starCategoryState}`}</span>
							<ChevronDownIcon
								className={`${
									open ? "" : "text-opacity-70"
								} ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
								aria-hidden="true"
							/>
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel className="absolute z-20 w-screen max-w-[200px] sm:max-w-[220px] px-4 top-full mt-3 transform -translate-x-1/2 left-1/2 sm:px-0  ">
								<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
									<div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
										{starCategory.map((item) => (
											<a
												key={item.name}
												href={item.href}
												onClick={(e) => {
													e.preventDefault();
													setStarCategoryState(
														item.name
													);
													close();
												}}
												className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
											>
												<p className="text-sm font-medium ">
													{item.name}
												</p>
											</a>
										))}
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		);
	};

	const renderRadioBtn = () => {
		return (
			<div className=" py-5 [ nc-hero-field-padding ] flex flex-row flex-wrap border-b border-neutral-100 dark:border-neutral-700">
				<div className="mr-2 my-1 sm:mr-3 border border-neutral-300 dark:border-neutral-700 rounded-full">
					{renderStarCategory()}
				</div>
				<div className="my-1 border border-neutral-300 dark:border-neutral-700 rounded-full">
					{renderGuest()}
				</div>
			</div>
		);
	};

	const renderForm = () => {
		return (
			<form className="w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
				{renderRadioBtn()}
				<div className="flex flex-1 items-center rounded-full">
					<LocationInput
						placeHolder="Destination"
						desc="Choose one destination"
						className="flex-1"
					/>
					<div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
					<LocationInput
						placeHolder="Nationality"
						desc="Select Nationality"
						className="flex-1"
						divHideVerticalLineClass=" -inset-x-0.5"
					/>
					<div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
					<HotelDateRangeInput
						selectsRange={true}
						className="flex-1"
					/>
					{/* BUTTON SUBMIT OF FORM */}
					<div className="pr-2 xl:pr-4 w-full md:w-fit pb-3 md:pb-0 mt-5 md:mt-0">
						<ButtonSubmit href={"/hotel/hotel-list" as Route} />
					</div>
				</div>
			</form>
		);
	};

	return renderForm();
};

export default FlightSearchForm;
