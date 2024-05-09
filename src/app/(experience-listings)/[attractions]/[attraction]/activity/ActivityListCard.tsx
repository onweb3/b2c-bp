"use client";

import {
	ActivityExcursion,
	ActivityTypeEnum,
	BaseTypeEnum,
	ExcursionDetails,
	PrivateTransferExcursion,
	TimeSlotExcursion,
	TransferTypeEmun,
} from "@/data/attraction/types";
import { AppDispatch, RootState } from "@/redux/store";
import priceConversion from "@/utils/priceConversion";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransferInput from "./TransferInput";
import GuestsInput from "./GuestsInput";
import { handleChangeActivityData } from "@/redux/features/attractionSlice";
import HourInput from "./HourInput";
import { format } from "date-fns";
import TimeSlot from "./TimeSlot";

interface ActivityDetailPageProps {
	findSlotsAvailable: ({
		activity,
		jwtToken,
	}: {
		activity: ActivityExcursion;
		jwtToken: string;
	}) => Promise<TimeSlotExcursion[] | undefined>;
	data: ActivityExcursion;
	index: number;
	attraction?: ExcursionDetails;
}

const ActivityListCard: FC<ActivityDetailPageProps> = ({
	data,
	index,
	findSlotsAvailable,
	attraction,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [selectedVehicle, selectVehicle] =
		useState<PrivateTransferExcursion>();
	const { selectedCurrency, UAE } = useSelector(
		(state: RootState) => state.initials
	);
	const { jwtToken } = useSelector((state: RootState) => state.users);

	// Promotion Calculation function.
	const promotionCalculationHandler = (
		isPromoCodeExist: boolean,
		sum: number,
		adultCount: number,
		childCount: number,
		promoAmountAdult: number = 0,
		promoAmountChild: number = 0
	) => {
		if (
			data.base === BaseTypeEnum.hourly &&
			data.activityType === ActivityTypeEnum.transfer
		) {
			handleChangeData(
				"priceWithoutPromoGrandTotal",
				sum * data.hourCount
			);
		} else {
			handleChangeData("priceWithoutPromoGrandTotal", sum);
		}
		if (isPromoCodeExist) {
			const grandTotal =
				sum +
				adultCount * promoAmountAdult +
				childCount * promoAmountChild;
			const appliedPromoAmount =
				adultCount * promoAmountAdult + childCount * promoAmountChild;

			handleChangeData("isPromoAdded", true);
			handleChangeData("grandTotal", grandTotal);
			handleChangeData("appliedPromoAmount", appliedPromoAmount);
		}
	};

	const handleChangeData = (keyName: string, value: any) => {
		dispatch(
			handleChangeActivityData({
				index: index,
				keyName: keyName,
				value: value,
			})
		);
	};

	// Boolean for either transfer of [x] exist.
	const isPrivateTransferAvail =
		data?.isPrivateTransferAvailable && data?.privateTransfers?.length;
	const isSharedTransferAvail =
		data?.isSharedTransferAvailable && data.sharedTransferPrice;

	useEffect(() => {
		// Initialising variables
		let array: PrivateTransferExcursion[] = [];
		let sum = 0;

		// general prices of paxes.
		let adultPrice = data.adultPrice * data.adultCount;
		let childPrice = data.childPrice * data.childCount;
		let infantPrice = data.infantPrice * data.infantCount;
		// Total travellers taken for calculation.
		let totalTravellers = data.adultCount + data.childCount;

		// Setting sum of activity selected with basetype.
		if (data.slotsAvailable && data.hasOwnProperty("slot")) {
			sum =
				Number(data?.slot?.AdultPrice) * Number(data?.adultCount) +
				Number(data?.slot?.ChildPrice) * Number(data?.childCount) +
				Number(data?.infantPrice) * Number(data?.infantCount);
		} else if (data.base === BaseTypeEnum.hourly) {
			// activityType == normal
			if (data.activityType === ActivityTypeEnum.normal) {
				sum = data.hourCount * data.hourlyCost;
			}
		} else {
			sum = adultPrice + childPrice + infantPrice;
		}

		// Condition if transfer Type is Private. -----------------------------------------------
		if (data?.transferType === TransferTypeEmun.private) {
			let totalPrivateTransferPrice = 0;
			if (isPrivateTransferAvail) {
				let priceList = [...data?.privateTransfers];
				priceList = priceList?.sort((a, b) => {
					return a.maxCapacity - b.maxCapacity;
				});

				// Setting vehicles according to the totalPaxes and Vehicles available.
				while (totalTravellers > 0) {
					for (let x = 0; x < priceList.length; x++) {
						if (x === 0) {
							if (
								totalTravellers > 0 &&
								// totalTravellers <= priceList[x].maxCapacity
								totalTravellers <=
									(selectedVehicle?.maxCapacity as number)
							) {
								totalPrivateTransferPrice =
									// totalPrivateTransferPrice + priceList[x].price;
									totalPrivateTransferPrice +
									(selectedVehicle?.price as number);
								// totalTravellers = totalTravellers - priceList[x].maxCapacity;
								totalTravellers =
									totalTravellers -
									(selectedVehicle?.maxCapacity as number);
								// array = [...array, priceList[x]];
								array = [
									...array,
									selectedVehicle as PrivateTransferExcursion,
								];
								break;
							}
						} else {
							if (
								totalTravellers <= priceList[x].maxCapacity &&
								totalTravellers > priceList[x - 1].maxCapacity
							) {
								totalPrivateTransferPrice =
									// totalPrivateTransferPrice + priceList[x].price;
									totalPrivateTransferPrice +
									(selectedVehicle?.price as number);
								// totalTravellers = totalTravellers - priceList[x].maxCapacity;
								totalTravellers =
									totalTravellers -
									(selectedVehicle?.maxCapacity as number);
								array = [...array, priceList[x]];
								break;
							}
						}
						if (x === priceList.length - 1) {
							totalPrivateTransferPrice =
								// totalPrivateTransferPrice + priceList[x].price;
								totalPrivateTransferPrice +
								(selectedVehicle?.price as number);
							// totalTravellers = totalTravellers - priceList[x].maxCapacity;
							totalTravellers =
								totalTravellers -
								(selectedVehicle?.maxCapacity as number);
							// array = [...array, priceList[x]];
							array = [
								...array,
								selectedVehicle as PrivateTransferExcursion,
							];
						}
					}
				}

				// Assigning Grand Total.
				if (data?.base === BaseTypeEnum.hourly) {
					handleChangeData(
						"grandTotal",
						totalPrivateTransferPrice * data.hourCount
					);
				} else {
					handleChangeData("grandTotal", totalPrivateTransferPrice);
				}

				// If activity type is normal. It should also add activity general price along with paxes to the transfer price.
				if (data?.activityType === ActivityTypeEnum.normal) {
					totalPrivateTransferPrice += sum;
				}

				// Assigning the vehicles which calculated by capacity and pax.
				handleChangeData("vehicles", array);
			} // End of Is Private Transfer available.

			promotionCalculationHandler(
				data.isPromoCode,
				totalPrivateTransferPrice,
				data.adultCount,
				data.childCount,
				data.promoAmountAdult,
				data.promoAmountChild
			);

			// Condition if the transfer Type is Shared. ------------------------------------------------------
		} else if (data.transferType === TransferTypeEmun.shared) {
			// If activity type is normal. It should also add activity general price along with paxes to the transfer price.
			if (data.activityType === ActivityTypeEnum.normal) {
				sum += totalTravellers * data?.sharedTransferPrice;
			} else {
				// Calculation of Shared transfer price only.
				sum = totalTravellers * data.sharedTransferPrice;
			}

			// Assigning Grand Total.
			handleChangeData("grandTotal", sum);

			// Promotion condition.
			promotionCalculationHandler(
				data.isPromoCode,
				sum,
				data.adultCount,
				data.childCount,
				data.promoAmountAdult,
				data.promoAmountChild
			);

			// Condition if the transfer type is without. ----------------------------------------------------
		} else if (data.transferType === TransferTypeEmun.without) {
			//  Promotion condition .
			handleChangeData("grandTotal", sum);

			promotionCalculationHandler(
				data.isPromoCode,
				sum,
				data.adultCount,
				data.childCount,
				data.promoAmountAdult,
				data.promoAmountChild
			);
		}
	}, [
		data.adultCount,
		data.childCount,
		data.infantCount,
		data.transferType,
		data.hourCount,
		data.isChecked,
		data.slot,
		selectedVehicle,
	]);

	useEffect(() => {
		if (data?.privateTransfers && data.privateTransfers.length > 0) {
			selectVehicle(data?.privateTransfers[0]);
		}
	}, []);

	const vehicleArray = useMemo(() => {
		let array: PrivateTransferExcursion[] = [];

		if (data.vehicles && data.vehicles.length) {
			for (let i = 0; i < data.vehicles.length; i++) {
				const ind = array.findIndex(
					(val) => val._id === data.vehicles[i]._id
				);

				if (ind !== -1) {
					array[ind] = { ...array[ind] };
					if (array[ind].count) {
						array[ind].count += 1;
					} else {
						array[ind].count = 2;
					}
				} else {
					array.push(data.vehicles[i]);
				}
			}
		}
		return array;
	}, [data.vehicles]);

	useEffect(() => {
		const fecthApiResponse = async ({
			activity,
			jwtToken,
		}: {
			activity: ActivityExcursion;
			jwtToken: string;
		}) => {
			try {
				const response = await findSlotsAvailable({
					activity: activity,
					jwtToken: jwtToken,
				});
				// dispatch  attraction activities.
				handleChangeData("slotsAvailable", response);
			} catch (error) {
				console.log(error);
			}
		};
		if (data.isChecked && attraction?._id === "63ff12f5d7333637a938cad4") {
			fecthApiResponse({ activity: data, jwtToken: jwtToken });
		}
	}, [data.isChecked]);

	const renderSelectedBadge = () => {
		return (
			<>
				{data.isChecked ? (
					<p className="text-sm text-green-600 font-mono pb-2">
						<i className="lar la-check-circle text-lg"></i>
						<span className="pl-1 text-xl font-bold">Selected</span>
					</p>
				) : (
					""
				)}
			</>
		);
	};

	const PrivateTransferVehicleListingSection = () => {
		return (
			<>
				{data.vehicles.length &&
				data.transferType === TransferTypeEmun.private ? (
					<div className=" py-2">
						<p className="text-xs text-gray-400 ">
							Private Vehicles
						</p>
						<p className="w-20 border-b my-1"></p>

						<div className="border-neutral-800 dark:border-neutral-600 rounded-md ">
							<table className="w-full text-sm">
								<tbody className="divide-y">
									{/* {data.vehicles.map((vehicle) => (
                    <tr key={vehicle?._id}>
                      <td className="py-2 ">
                        <div className="relative">
                         
                          <p className="">{vehicle.name}</p>  
                        </div>
                      </td>
                      <td className="py-2 text-right">{priceConversion(vehicle.price, selectedCurrency, true)}</td>
                    </tr>
                  ))} */}

									{data?.privateTransfers.map((vehicle) => (
										<tr key={vehicle?._id}>
											<td className="py-2 ">
												<div className="relative">
													<p
														onClick={() => {
															selectVehicle(
																vehicle
															);
														}}
														className={`${
															selectedVehicle?._id !==
															vehicle?._id
																? "text-stone-400"
																: ""
														} cursor-pointer`}
													>
														{vehicle.name}
													</p>
												</div>
											</td>
											<td
												className={`${
													selectedVehicle?._id !==
													vehicle?._id
														? "text-stone-400"
														: ""
												} py-2 text-right`}
											>
												{priceConversion(
													vehicle.price,
													selectedCurrency,
													true
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					""
				)}
			</>
		);
	};

	const SharedTransferSection = () => {
		return (
			<>
				{data.isSharedTransferAvailable &&
				data.transferType === TransferTypeEmun.shared ? (
					<div className=" py-2">
						<p className="text-xs text-gray-400 ">
							Shared Transfer
						</p>
						<p className="w-20 border-b my-1"></p>

						<div className="border-neutral-800 dark:border-neutral-600 rounded-md ">
							<table className="w-full text-sm">
								<tbody>
									<tr>
										<td className="py-2 ">
											Shared transfer price
										</td>
										<td className="py-2 text-right">
											{priceConversion(
												data.sharedTransferPrice,
												selectedCurrency,
												true
											)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				) : (
					""
				)}
			</>
		);
	};

	const renderTransferDetails = () => {
		switch (data.transferType) {
			case TransferTypeEmun.private:
				return PrivateTransferVehicleListingSection();
			case TransferTypeEmun.shared:
				return SharedTransferSection();
			default:
				return "";
		}
	};

	const BreakdownComponentMaker = ({
		name,
		total,
		count,
		sign,
		price,
		key,
	}: {
		name: string;
		total: string;
		count: string;
		sign: string;
		price: string;
		key?: string;
	}) => {
		return (
			<tr key={key ? key : ""}>
				<td className="py-2 ">
					<div className="flex gap-[15px] items-center w-full">
						<span className="">
							{name}
							{Number(count) > 0 ? (
								<span className="text-xs text-gray-400 pl-1">
									({`${count} ${sign} ${price}`})
								</span>
							) : (
								""
							)}
						</span>
						<div className="border-b border-dashed flex-1"></div>
						<span className="text-right">
							{Number(count) > 0 ? total : 0}
						</span>
					</div>
				</td>
			</tr>
		);
	};

	const PriceBreakDownSection = () => {
		return (
			<div className=" py-2">
				<p className="text-xs text-gray-400 ">Price Breakdown</p>
				<p className="w-20 border-b my-1"></p>

				<div className="border-neutral-800 dark:border-neutral-600 rounded-md ">
					<table className="w-full text-sm">
						<tbody>
							{data.activityType === ActivityTypeEnum.normal &&
							data.base !== BaseTypeEnum.hourly ? (
								<>
									{BreakdownComponentMaker({
										name: "Adult Price",
										count: `${data.adultCount}`,
										price:
											data.promoAmountAdult &&
											data?.isPromoCode
												? priceConversion(
														data.adultPrice +
															data.promoAmountAdult,
														selectedCurrency,
														true
												  )
												: priceConversion(
														data.adultPrice,
														selectedCurrency,
														true
												  ),
										sign: "X",
										total:
											data.promoAmountAdult &&
											data?.isPromoCode
												? priceConversion(
														data.adultPrice *
															data.adultCount +
															data.promoAmountAdult,
														selectedCurrency,
														true
												  )
												: priceConversion(
														data.adultPrice *
															data.adultCount,
														selectedCurrency,
														true
												  ),
									})}
									{BreakdownComponentMaker({
										name: "Child Price",
										count: `${data.childCount}`,
										price:
											data.promoAmountChild &&
											data?.isPromoCode
												? priceConversion(
														data.childPrice +
															data.promoAmountChild,
														selectedCurrency,
														true
												  )
												: priceConversion(
														data.childPrice,
														selectedCurrency,
														true
												  ),
										sign: "X",
										total:
											data.promoAmountChild &&
											data?.isPromoCode
												? priceConversion(
														data.childPrice *
															data.childCount +
															data.promoAmountChild,
														selectedCurrency,
														true
												  )
												: priceConversion(
														data.childPrice *
															data.childCount,
														selectedCurrency,
														true
												  ),
									})}
									{BreakdownComponentMaker({
										name: "Infant Price",
										count: `${data.infantCount}`,
										price: priceConversion(
											data.infantPrice,
											selectedCurrency,
											true
										),
										sign: "X",
										total: priceConversion(
											data.infantPrice * data.infantCount,
											selectedCurrency,
											true
										),
									})}
								</>
							) : (
								<>
									{data.base !== BaseTypeEnum.hourly ? (
										<>
											{BreakdownComponentMaker({
												name: "Number of paxes",
												count: ``,
												price: "",
												sign: "",
												total: `${
													data.adultCount +
													data.childCount
												} travellers`,
											})}
										</>
									) : (
										<>
											{BreakdownComponentMaker({
												name: "Number of Hours",
												count: ``,
												price: "",
												sign: "",
												total: `${data.hourCount} hours`,
											})}
										</>
									)}
								</>
							)}
							{data.base === BaseTypeEnum.hourly &&
							data.activityType === ActivityTypeEnum.normal ? (
								<>
									{BreakdownComponentMaker({
										name: "Hourly Price",
										count: ``,
										price: "",
										sign: "",
										total: priceConversion(
											data.hourlyCost,
											selectedCurrency,
											true
										),
									})}
								</>
							) : (
								""
							)}
							{/* {vehicleArray.length && data.transferType === TransferTypeEmun.private ? vehicleArray.map((vehicle) => (
                <>
                  {BreakdownComponentMaker({
                    key: vehicle._id,
                    name: vehicle.name,
                    count: `${vehicle.count || 1}`,
                    price: priceConversion(vehicle.price, selectedCurrency, true),
                    sign: "X",
                    total: priceConversion(
                      vehicle.price * (vehicle.count || 1),
                      selectedCurrency,
                      true
                    )
                  })}
                </>
              )) : ""} */}

							{selectedVehicle &&
							data.transferType === TransferTypeEmun.private ? (
								<>
									{BreakdownComponentMaker({
										// key: selectedVehicle?._id,
										name: selectedVehicle.name,
										count: `${selectedVehicle?.count || 1}`,
										price: priceConversion(
											selectedVehicle.price,
											selectedCurrency,
											true
										),
										sign: "X",
										total: priceConversion(
											selectedVehicle.price *
												(selectedVehicle?.count || 1),
											selectedCurrency,
											true
										),
									})}
								</>
							) : (
								""
							)}

							{data.transferType === TransferTypeEmun.shared &&
							isSharedTransferAvail ? (
								<>
									{BreakdownComponentMaker({
										name: "Shared Transfer",
										count: `${
											data.adultCount + data.childCount
										}`,
										price: priceConversion(
											data.sharedTransferPrice,
											selectedCurrency,
											true
										),
										sign: "X",
										total: priceConversion(
											(data.adultCount +
												data.childCount) *
												data.sharedTransferPrice,
											selectedCurrency,
											true
										),
									})}
								</>
							) : (
								""
							)}

							<tr>
								<td className="py-2 ">
									<div className="flex gap-[15px] items-center w-full">
										<span className="font-medium">
											Grand Total
										</span>
										<div className="border-b border-dashed flex-1"></div>
										<span className="text-right font-medium text-lg">
											{priceConversion(
												data.grandTotal,
												selectedCurrency,
												true
											)}
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	};

	const renderTimeSlotSection = () => {
		return (
			<div className="">
				{data?.slot && data?.slot?.EventID?.length ? (
					<div className="w-full">
						<p className="text-xs text-gray-400 ">Slot Selected</p>
						<p className="w-20 border-b my-1"></p>

						<table className="w-full text-sm">
							<tbody>
								<tr className="w-full ">
									<td className="py-2 w-full ">
										<div className="flex gap-[15px] items-center w-full">
											<span className="">Event ID</span>
											<div className="border-b border-dashed flex-1"></div>
											<span className="text-right">
												{data?.slot?.EventID}
											</span>
										</div>
									</td>
								</tr>
								<tr className="w-full ">
									<td className="py-2 w-full ">
										<div className="flex gap-[15px] items-center w-full">
											<span className="">Event Name</span>
											<div className="border-b border-dashed flex-1"></div>
											<span className="text-right">
												{data?.slot?.EventName}
											</span>
										</div>
									</td>
								</tr>
								<tr className="w-full ">
									<td className="py-2 w-full ">
										<div className="flex gap-[15px] items-center w-full">
											<span className="">Event Time</span>
											<div className="border-b border-dashed flex-1"></div>
											<span className="text-right">
												{format(
													new Date(
														data?.slot?.StartDateTime
													),
													"d MMM, yyyy"
												)}
											</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				) : (
					""
				)}
				<div
					className={`${
						data?.slot?.EventID?.length
							? " flex justify-end "
							: " w-full "
					} py-2  `}
				>
					<TimeSlot
						data={data}
						handleChangeData={handleChangeData}
						className={`${
							data?.slot?.EventID?.length
								? " border text-neutral-600 dark:text-neutral-300 "
								: " w-full bg-blue-600 text-neutral-100 dark:text-neutral-300 "
						} p-2  rounded-lg `}
					/>
				</div>
			</div>
		);
	};

	const renderTimeSlot = () => {
		return (
			<div className=" my-4 p-2 border-4 border-blue-600/20 rounded-xl h-40 overflow-y-auto shadow-inner w-full">
				{data?.slotsAvailable && data?.slotsAvailable?.length > 0 ? (
					<div className="grid grid-cols-2 gap-3 relative">
						{data?.slotsAvailable?.map((slot) => (
							<div
								key={slot?.EventID}
								onClick={() => {
									if (
										Number(slot?.Available) >=
										data?.adultCount
									) {
										handleChangeData("slot", slot);
									}
								}}
								className={` ${
									Number(slot?.Available) < data?.adultCount
										? " border-red-500/20 text-stone-500  "
										: slot?.EventID === data.slot?.EventID
										? " border-green-500/20 bg-green-100/50 "
										: " border-green-500/20 "
								} relative border-4 rounded-full  w-full pt-2 shadow-md flex flex-col items-center justify-center cursor-pointer`}
							>
								{slot?.EventID === data.slot?.EventID ? (
									<p className="text-sm text-green-600 font-mono pb-2">
										<i className="lar la-check-circle text-sm"></i>
										<span className="pl-1 text-xs">
											Selected
										</span>
									</p>
								) : (
									""
								)}
								<p className="text-xs">
									{format(
										new Date(slot?.StartDateTime),
										"d-M-yyyy"
									) +
										" TO " +
										format(
											new Date(slot?.EndDateTime),
											"d-M-yyyy"
										)}
								</p>
								<div className="md:flex  gap-1 ">
									<p className="text-xs flex  gap-1">
										<span className="text-sm">
											<i className="las la-male"></i>
										</span>
										{priceConversion(
											Number(slot?.AdultPrice),
											selectedCurrency,
											true
										)}
									</p>
									<p className="text-xs flex gap-1">
										<span className="text-sm">
											<i className="las la-baby"></i>
										</span>{" "}
										{priceConversion(
											Number(slot?.ChildPrice),
											selectedCurrency,
											true
										)}
									</p>
								</div>
								{slot?.EventID === data.slot?.EventID ? (
									<div
										onClick={(e) => {
											e.stopPropagation();
											handleChangeData("slot", {});
										}}
										className="absolute bg-red-500 text-white h-5 w-5 rounded-full -top-1 right-1 flex gap-1 justify-center items-center"
									>
										<i className="las la-ban text-lg font-semibold"></i>
									</div>
								) : (
									""
								)}
							</div>
						))}
					</div>
				) : (
					""
				)}
			</div>
		);
	};

	return (
		<div
			key={data?._id}
			className={`${
				data.isChecked
					? data.transferType === TransferTypeEmun.private
						? " md:col-span-2  "
						: " md:col-span-2  "
					: ""
			}`}
		>
			{renderSelectedBadge()}
			<div
				className={`bg-white border  dark:border-neutral-700 dark:bg-neutral-800 rounded-xl shadow-sm p-4 ${
					data.isChecked ? " ring-4 ring-green-500/20 " : " "
				}`}
			>
				<div
					onClick={() =>
						handleChangeData("isChecked", !data.isChecked)
					}
					className={
						"font-medium pb-2 cursor-pointer flex gap-2 justify-between"
					}
				>
					<div className="flex gap-2">
						<div>
							<input
								type="checkbox"
								className="appearance-none focus:outline-none"
								checked={data.isChecked}
								onClick={() => {
									handleChangeData(
										"isChecked",
										!data.isChecked
									);
								}}
								name=""
								id=""
							/>
						</div>
						<h1>{data.name}</h1>
					</div>
					{!data.isChecked ? (
						<div>
							<h1>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</h1>
						</div>
					) : (
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 text-red-500"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</div>
					)}
				</div>
				<hr />
				{data.isChecked ? (
					<>
						<div className="md:flex gap-5">
							<div className="md:w-1/2">
								<div className="py-2">
									<p className=" text-xs text-gray-400 py-1">
										Choose tranfser type?
									</p>
									<TransferInput
										data={data}
										handleChangeData={handleChangeData}
									/>
								</div>

								{/* On Hourly */}
								{data.base !== BaseTypeEnum.person ? (
									<div className="py-2">
										<p className=" text-xs text-gray-400 py-1">
											Choose number of hours?
										</p>
										<HourInput
											data={data}
											handleChangeData={handleChangeData}
										/>
									</div>
								) : (
									""
								)}

								{/* On Person */}
								{data.base !== BaseTypeEnum.hourly ? (
									<div className="py-2">
										<p className=" text-xs text-gray-400 py-1">
											Choose your pax?
										</p>
										<GuestsInput
											data={data}
											handleChangeData={handleChangeData}
											attraction={
												attraction
													? attraction
													: ({} as ExcursionDetails)
											}
										/>
									</div>
								) : (
									""
								)}

								{/* render transfer details */}
								{renderTransferDetails()}
							</div>

							<div className="md:w-1/2">
								{/* Price Breadown section */}
								<div className=" py-2">
									{PriceBreakDownSection()}{" "}
								</div>
							</div>
						</div>
						<hr />
					</>
				) : (
					""
				)}
				{attraction?.isApiConnected &&
				attraction?.connectedApi === "63f0a47b479d4a0376fe12f4" &&
				data?.isChecked &&
				data?.date &&
				data?.adultCount > 0 ? (
					<div className="mt-2">
						{/* render time slot component */}
						{/* {renderTimeSlot()} */}
						{renderTimeSlotSection()}
					</div>
				) : (
					""
				)}
				<div className="flex justify-between gap-2 text-gray-500 pt-2">
					<div className="text-sm">per {data?.base}*</div>
					<div className="text-xs text-gray-400 ">
						lowest Price
						<span className="font-medium text-gray-500 text-base pl-1">
							{data?.isPromoCode && data?.promoAmountAdult
								? priceConversion(
										data?.lowPrice + data?.promoAmountAdult,
										selectedCurrency,
										true
								  )
								: priceConversion(
										data?.lowPrice,
										selectedCurrency,
										true
								  )}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ActivityListCard;
