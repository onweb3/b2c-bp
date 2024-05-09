"use client";

import { RootState, useAppSelector } from "@/redux/store";
import ButtonSecondary from "@/shared/ButtonSecondary";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import priceConversion from "@/utils/priceConversion";
import { OrderExcursion } from "@/data/attraction/types";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface OrderTemplateProps {
	data?: OrderExcursion;
}

const OrderTemplate: FC<OrderTemplateProps> = ({ data }) => {
	const [attractionOrderInvoice, setAttractionOrderInvoice] =
		useState<null | Blob>(null);
	const [attractionOrderAllTickets, setAttractionOrderAllTickets] =
		useState<null | Blob>(null);
	const [attractionOrderSingleTicket, setAttractionOrderSingleTicket] =
		useState<null | Blob>(null);
		const { config, selectedCurrency } = useAppSelector((state) => state.initials)

	const { jwtToken } = useSelector((state: RootState) => state.users);

	function formatDate(updatedAt: Date | string) {
		const options = {
			month: "long",
			day: "numeric",
			year: "numeric",
		} as Intl.DateTimeFormatOptions;
		const date = new Date(updatedAt);
		return date.toLocaleDateString("en-US", options);
	}

	const fetchAttractionInvoice = async (attractionOrderId: string) => {
		try {
			const response = await fetch(
				`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/orders/invoice/${attractionOrderId}`,
				{
					headers: {
						"Content-Type": "arraybuffer",
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			);
			return response.blob();
		} catch (error) {
			console.log(error);
		}
	};

	async function getAttractionInvoice(attractionOrderId: string) {
		try {
			const response = await fetchAttractionInvoice(attractionOrderId);

			if (response) {
				setAttractionOrderInvoice(response);
			} else {
				// Handle the case when response is undefined
				// For example, set an appropriate error message or handle it accordingly
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		{
			data?._id && getAttractionInvoice(data?._id);
		}
	}, [data?._id]);

	const handleDownload = () => {
		if (attractionOrderInvoice) {
			const pdfBlob = new Blob([attractionOrderInvoice], {
				type: "application/pdf",
			});
			const url = URL.createObjectURL(pdfBlob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "attractioninvoice.pdf";
			a.click();
		}
	};

	const fetchAttractionAllTickets = async (
		attractionOrderId: string,
		activityId: string
	) => {
		try {
			const response = await fetch(
				`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/orders/${attractionOrderId}/ticket/${activityId}`,
				{
					headers: {
						"Content-Type": "arraybuffer",
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			);
			return response.blob();
		} catch (error) {
			console.log(error);
		}
	};

	async function getAttractionAllTickets(
		attractionOrderId: string,
		activityId: string
	) {
		try {
			const response = await fetchAttractionAllTickets(
				attractionOrderId,
				activityId
			);

			if (response) {
				setAttractionOrderAllTickets(response);
			} else {
				// Handle the case when response is undefined
				// For example, set an appropriate error message or handle it accordingly
			}
		} catch (error) {
			console.error(error);
		}
	}

	// useEffect(() => {
	//   {
	//     data?._id && getAttractionAllTickets(data?._id, data?.activities[0]?._id);
	//   }
	// }, [data?._id]);

	const handleDownloadAllTickets = () => {
		if (attractionOrderAllTickets) {
			const pdfBlob = new Blob([attractionOrderAllTickets], {
				type: "application/pdf",
			});
			const url = URL.createObjectURL(pdfBlob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "attractionalltickets.pdf";
			a.click();
		}
	};

	//   useEffect(() => {
	//   {
	//     data?._id && getAttractionAllTickets(data?._id, data?.activities[0]?._id);
	//   }
	// }, [data?._id]);

	useEffect(() => {
		handleDownloadAllTickets();
	}, [attractionOrderAllTickets]);

	const fetchAttractionSingleTicket = async (
		attractionOrderId: string,
		activityId: string,
		ticketId: string
	) => {
		try {
			const response = await fetch(
				`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/orders/${attractionOrderId}/ticket/${activityId}/single/${ticketId}`,
				{
					headers: {
						"Content-Type": "arraybuffer",
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			);
			return response.blob();
		} catch (error) {
			console.log(error);
		}
	};

	async function getAttractionSingleTicket(
		attractionOrderId: string,
		activityId: string,
		ticketId: string
	) {
		try {
			const response = await fetchAttractionSingleTicket(
				attractionOrderId,
				activityId,
				ticketId
			);

			if (response) {
				setAttractionOrderSingleTicket(response);
			} else {
				// Handle the case when response is undefined
				// For example, set an appropriate error message or handle it accordingly
			}
		} catch (error) {
			console.error(error);
		}
	}

	const handleDownloadSingleTicket = () => {
		if (attractionOrderSingleTicket) {
			const pdfBlob = new Blob([attractionOrderSingleTicket], {
				type: "application/pdf",
			});
			const url = URL.createObjectURL(pdfBlob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "attractionticket.pdf";
			a.click();
		}
	};

	useEffect(() => {
		handleDownloadSingleTicket();
	}, [attractionOrderSingleTicket]);

	return (
		<div className="listingSection__wrap container mb-7">
			{!data && (
				<>
					<div
						role="status"
						className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
					>
						<div className="w-full space-y-2">
							<div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
							<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
							<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
							<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
							<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
							<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
						</div>
					</div>

					<div
						role="status"
						className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
					>
						<div className="w-full space-y-2">
							<div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
							<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
							<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
							<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
							<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
							<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
						</div>
					</div>
				</>
			)}

			{data && (
				<div className="text text-center">
					<h1 className="text-3xl hidden md:block font-bold text-primary-6000">
						THANK YOU FOR YOUR ORDER
					</h1>
					<h1 className="text-3xl md:hidden font-semibold text-primary-6000">
						THANK YOU <br /> FOR YOUR ORDER
					</h1>
					<p className="md:block hidden">
						Wohoo! Your payment was successful, and your order is
						complete.
					</p>
					<p className="md:hidden">
						Wohoo! Your payment was successful, <br /> and your
						order is complete.
					</p>
					{data?.activities?.map((activity, index) => (
						<div className="mt-10 grid md:grid-cols-12 gap-5 md:gap-10 p-2 md:p-0">
							<div className=" listingSection__wrap md:col-span-8  font-semibold md:p-4 p-2 rounded-xl">
								<div className="flex flex-col md:flex-row gap-5 md:justify-between text-left">
									<div className="flex flex-col gap-4">
										<div className="flex flex-wrap gap-2">
											<p className="font-mono text-primary-6000 text-lg md:text-xl">
												{activity?.attraction?.title}
											</p>
											<p className="bg-green-600 w-fit rounded-full px-2 py-0.5 text-white">
												{activity?.bookingType
													.charAt(0)
													.toUpperCase()}
												{activity?.bookingType?.slice(
													1
												)}
											</p>
										</div>

										<div className="flex gap-4 ">
											<div className="text-center w-fit">
												<p>Adults</p>
												<p className="ttnc-ButtonSecondary px-2 py-1 rounded-xl text-neutral-700 font-medium border border-primary-6000  dark:bg-neutral-900 dark:text-white dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">
													{activity?.adultsCount}{" "}
													Adults
												</p>
											</div>
											<div className="text-center w-fit">
												<p>Childrens</p>
												<p className="ttnc-ButtonSecondary px-2 py-1 rounded-xl text-neutral-700 font-medium border border-primary-6000  dark:bg-neutral-900 dark:text-white dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">
													{activity?.childrenCount}{" "}
													Childrens
												</p>
											</div>
											<div className="text-center w-fit">
												<p>Infants</p>
												<p className="ttnc-ButtonSecondary px-2 py-1 rounded-xl text-neutral-700 font-medium border border-primary-6000  dark:bg-neutral-900 dark:text-white dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">
													{activity?.infantCount}{" "}
													Infants
												</p>
											</div>
										</div>
									</div>
									<div className="md:text-right ">
										<p className="whitespace-nowrap">
											{activity?.transferType} transfer
										</p>
										<p className="whitespace-nowrap">
											{formatDate(data?.updatedAt)}
										</p>

										<div className="md:mt-8 mt-4">
											<p>Grand Total</p>
											<p>
												{priceConversion(
													data?.totalAmount,
													selectedCurrency,
													true
												)}
											</p>
										</div>
									</div>
								</div>
								<div className="md:grid md:grid-cols-2">
									{activity?.adultTickets?.map((adt, i) => (
										<>
											<div className="md:flex items-center md:gap-5 ">
												<p>Adult {i + 1}</p>
												<ButtonPrimary
													className="w-full md:w-fit"
													onClick={() =>
														getAttractionSingleTicket(
															data?._id,
															activity?._id,
															adt?.ticketNo
														)
													}
												>
													Download Ticket
												</ButtonPrimary>
											</div>
										</>
									))}
								</div>

								{activity?.childTickets?.length > 0 && (
									<div className="grid grid-cols-2 mt-3">
										{activity?.childTickets?.map(
											(chd, i) => (
												<>
													<div className="md:flex items-center md:gap-5 mt-3">
														<p>Child {i + 1}</p>
														<ButtonSecondary
															className="w-full md:w-fit"
															onClick={() =>
																getAttractionSingleTicket(
																	data?._id,
																	activity?._id,
																	chd?.ticketNo
																)
															}
														>
															Download Ticket
														</ButtonSecondary>
													</div>
												</>
											)
										)}
									</div>
								)}
							</div>

							<div className="listingSection__wrap  md:col-span-4  font-semibold p-4 rounded-xl">
								<div className={`flex flex-col gap-5 `}>
									<p className="text-primary-6000 font-mono">
										{activity?.attraction?.title}
									</p>
									<div className="">
										<ButtonPrimary
											onClick={handleDownload}
											className=" w-full "
										>
											Download Invoice
										</ButtonPrimary>
									</div>

									{activity?.bookingType === "ticket" && (
										<div className="">
											<ButtonPrimary
												onClick={() =>
													getAttractionAllTickets(
														data?._id,
														activity?._id
													)
												}
												className=" w-full "
											>
												Download All Tickets
											</ButtonPrimary>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default OrderTemplate;
