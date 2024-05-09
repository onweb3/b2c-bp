"use client";

import React, { FC, useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { Route } from "next";
import { Tab } from "@headlessui/react";

import CarCard from "@/components/CarCard";
import RentalCarSearchForm from "@/app/(client-components)/(HeroSearchForm)/(car-search-form)/RentalCarSearchForm";
import { RootState, useAppSelector } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import ErrorModal from "@/shared/Status/ErrorModal";
import InquirySidebar from "@/components/InquirySidebar/InquirySidebar";
import MobileMainNav from "@/app/(client-components)/(Header)/MobileMainNav";
import MobileEnquiring from "../MobileEnquiring";
import { UUID } from "crypto";

export interface ListVisaDetailPage {}

interface VisaTC {
	name: string;
	slug: string;
	description: string;
	country: {
		countryName: string;
		_id: string | UUID;
	};
	sampleVisa: string;
	inclusions: string[];
	details?: {
		title: string;
		body: string;
	}[];
	faqs?: {
		question: string;
		answer: string;
	}[];
	termsAndConditions?: string;
}

interface VisaDetails {
	_id: string;
	id: string | number;
	date: string;
	visaName: string;
	adultPrice: number;
	childPrice: number;
	ageTo: number;
	ageFrom: number;
	href: Route<string>;
	title: string;
	commentCount: number;
	viewCount: number;
	address: string;
	reviewStart: number;
	reviewCount: number;
	like: boolean;
	price: string;
	seats: number;
	gearshift: string;
	saleOff?: string | null;
	isAds: boolean | null;
	map: {
		lat: number;
		lng: number;
	};
	// include other properties as needed
}

const ListVisaDetailPage: FC<ListVisaDetailPage> = ({}) => {
	const thisPathname = usePathname();
	const router = useRouter();
	const [visaDetails, setVisaDetails] = useState<VisaDetails[] | null>(null);
	const [visaTC, setVisaTC] = useState<VisaTC | null>(null);
	const [visaNationality, setVisaNationality] = useState("");
	const [error, setError] = useState<string>("");
	const [visaDestination, setVisaDestination] = useState("");
	const dispatch = useDispatch();

	const closeModal = () => {
		setError("");
	};

	const { Nationality } = useSelector((state: RootState) => state.visa);
	const { visaNavigated } = useSelector(
		(state: RootState) => state.affiliateUsers
	);
	const { config, globalData, selectedCurrency } = useAppSelector(
		(state) => state.initials
	);

	useEffect(() => {
		const currentURL = window.location.href;
		const url = new URL(currentURL);
		const searchParams = new URLSearchParams(url.search);

		const visaNationality = searchParams.get("nationality");
		const visaDestination = url.pathname?.split("/").pop();

		if (visaNationality !== "") {
			setVisaNationality(visaNationality || "");
		}

		if (visaDestination !== "") {
			setVisaDestination(visaDestination || "");
		}
	}, [Nationality]);

	const handleOpenModalImageGallery = () => {
		router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
	};

	const fetchVisaDetails = async () => {
		setVisaDetails([]);
		try {
			const nationality = await fetch(
				`${
					config?.NEXT_PUBLIC_SERVER_URL
				}/api/v1/visa/type/${visaDestination}/all/${
					Nationality || visaNationality
				}`
			);
			return nationality.json();
		} catch (error) {
			console.log(error);
		}
	};

	async function getVisaDetails() {
		try {
			const response = await fetchVisaDetails();
			setVisaDetails(response?.visaTypes);
			setVisaTC(response?.visa);
			setError(response?.error);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		{
			visaDestination && visaNationality && getVisaDetails();
		}
		{
			Nationality &&
				router.push(
					`/visa/${visaDestination}?nationality=${Nationality}` as Route
				);
		}
	}, [visaDestination, Nationality]);

	const termsAndConditions = visaTC?.termsAndConditions || "";

	let [categories] = useState(["Car for rent"]);

	// Structured Data......... Schema.org
	useEffect(() => {
		const currentURL = window.location.href;
		const loadDetailSchema = async () => {
			const context = {
				"@context": "https://schema.org",
				"@type": "Product",
				category: visaNationality + " visa",
				description: visaTC?.description,
				name: visaTC?.name,
				image: `${
					config?.NEXT_PUBLIC_SERVER_URL || "" + visaTC?.sampleVisa
				}`,
				offers: visaDetails?.map((data) => {
					return {
						"@type": "Offer",
						availability: `${config?.NEXT_PUBLIC_CLIENT_URL}/${thisPathname}/apply?nationality=${Nationality}&visaType=${data?._id}`,
						priceCurrency: selectedCurrency?.isocode,
						price: data?.adultPrice,
					};
				}),
				brand: {
					"@type": "Organization",
					name: config?.NEXT_PUBLIC_TITLE_NAME,
					telephone: [
						`+${globalData?.home?.phoneNumber1}`,
						`+${globalData?.home?.phoneNumber2}`,
					],
					address: [
						config?.NEXT_PUBLIC_COMPANYADDRESS1,
						config?.NEXT_PUBLIC_COMPANYADDRESS2,
					],
					email: globalData?.home?.email,
					logo: config?.NEXT_PUBLIC_COMPANY_LOGO,
					sameAs: [
						"https://travellerschoice.ae/",
						globalData?.home?.facebookUrl || "",
						`https://wa.me/${globalData?.home?.phoneNumber2}`,
						globalData?.home?.instagramUrl || "",
					],
				},
				isBasedOn: {
					"@type": "CreativeWork",
					publisher: {
						"@type": "Organization",
						name: config?.NEXT_PUBLIC_TITLE_NAME,
						telephone: [
							`+${globalData?.home?.phoneNumber1}`,
							`+${globalData?.home?.phoneNumber2}`,
						],
						address: [
							config?.NEXT_PUBLIC_COMPANYADDRESS1,
							config?.NEXT_PUBLIC_COMPANYADDRESS2,
						],
						duns: 561191215,
						url: config?.NEXT_PUBLIC_CLIENT_URL,
						contactPoint: {
							"@type": "ContactPoint",
							telephone: `+${globalData?.home?.phoneNumber1}`,
							contactType: "customer service",
						},
						email: globalData?.home?.email,
						logo: config?.NEXT_PUBLIC_COMPANY_LOGO,
						sameAs: [
							"https://travellerschoice.ae/",
							globalData?.home?.facebookUrl || "",
							`https://wa.me/${globalData?.home?.phoneNumber2}`,
							globalData?.home?.instagramUrl || "",
						],
					},
					archivedAt: {
						"@type": "WebPage",
						breadcrumb: {
							"@type": "BreadcrumbList",
							itemListElement: [
								{
									"@type": "ListItem",
									position: 1,
									name: "Home",
									item: `${config?.NEXT_PUBLIC_CLIENT_URL}/`,
								},
								{
									"@type": "ListItem",
									position: 1,
									name: "Visa",
									item: `${config?.NEXT_PUBLIC_CLIENT_URL}/visa/`,
								},
								{
									"@type": "ListItem",
									position: 1,
									name: "Visa Nationality",
									item: currentURL,
								},
							],
						},
						mainEntity: {
							"@type": "FAQPage",
							mainEntity: [
								visaTC?.faqs?.map((item) => {
									return {
										"@type": "Question",
										name: item?.question,
										acceptedAnswer: {
											"@type": "Answer",
											text: item?.answer,
										},
									};
								}),
							],
						},
					},
				},
			};

			const script = document.createElement("script");
			script.type = "application/ld+json";
			script.innerHTML = JSON.stringify(context);
			document.head.appendChild(script);
		};

		loadDetailSchema();

		return () => {
			// Clean up script when component unmounts
			const schemaScript = document.querySelector(
				'script[type="application/ld+json"]'
			);
			if (schemaScript) {
				schemaScript.remove();
			}
		};
	}, [globalData?.home, visaTC]);

	const renderSection1 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="md:text-2xl text-lg font-semibold">{`Types of United Arab Emirates Visa for ${
						Nationality.charAt(0).toUpperCase() +
							Nationality.slice(1) ||
						visaNationality.charAt(0).toUpperCase() +
							visaNationality.slice(1)
					}`}</h2>
				</div>

				<div>
					<Tab.Group>
						<Tab.Panels>
							<Tab.Panel className="">
								<div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
									{visaDetails && (
										<>
											{visaDetails?.map(
												(
													visa: VisaDetails,
													index: number
												) => {
													return (
														<CarCard
															key={visa?._id}
															data={visa}
															destination={
																visaDestination
															}
															nationality={
																Nationality
															}
														/>
													);
												}
											)}
										</>
									)}
								</div>
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</div>
		);
	};

	const renderSectionTienIch = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<p className="text-lg font-semibold">
						Documents required for Dubai Visa{" "}
					</p>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-1 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 ">
					{visaTC?.details?.map((item: any, index: number) => (
						<div key={index} className="items-center ">
							<p className="font-bold text-base">{item.title}</p>
							<p className="text-base">{item.body}</p>
						</div>
					))}
				</div>
			</div>
		);
	};

	const renderSection8 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Things to know</h2>
				{visaTC?.faqs?.map((ele: any, i: number) => (
					<div className="p-1 relative " key={ele?._id}>
						<input
							type="checkbox"
							className="peer absolute top-0 inset-x-0 w-full h-10 opacity-0  cursor-pointer"
						/>
						<div className="flex items-center space-x-3 ">
							<span className="">+</span>
							<span className="text-lightblue">
								{ele?.question}
							</span>
						</div>
						<div
							className={`text-sm text-gray-400 font-light overflow-hidden  max-h-0 peer-checked:max-h-[100vh] transition-all duration-700 `}
						>
							<div className="p-1">
								<p className="">{ele?.answer}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	};

	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap">
				<div className="grid grid-cols-1 lg:grid-cols-1 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 ">
					<div className="flex items-center space-x-4 text-base">
						<div
							dangerouslySetInnerHTML={{
								__html: termsAndConditions,
							}}
						/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className={` `}>
			<header className="nc-PageHome hidden md:block relative pb-6 px-10 pt-1 bg-primary-6000">
				<div className="container hidden  md:block">
					<RentalCarSearchForm Nationality={visaNationality} />
				</div>
			</header>

			<main className="container relative z-10 mt-11 flex flex-col lg:flex-row ">
				<div className="w-full lg:w-3/5 xl:w-2/3 p-4 space-y-8 lg:pr-10 lg:space-y-10">
					<nav
						className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
						aria-label="Breadcrumb"
					>
						<ol className="inline-flex items-center space-x-1 md:space-x-3">
							<li className="inline-flex items-center">
								<a
									href="/"
									className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
								>
									<svg
										className="w-3 h-3 mr-2.5"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
									</svg>
									Home
								</a>
							</li>
							<li>
								<div className="flex items-center">
									<svg
										className="w-3 h-3 mx-1 text-gray-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 6 10"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 9 4-4-4-4"
										/>
									</svg>
									<a
										href="/visa"
										className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
									>
										Visa
									</a>
								</div>
							</li>
							<li aria-current="page">
								<div className="flex items-center">
									<svg
										className="w-3 h-3 mx-1 text-gray-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 6 10"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 9 4-4-4-4"
										/>
									</svg>
									<span className="ml-1 capitalize text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
										{Nationality || visaNationality}
									</span>
								</div>
							</li>
						</ol>
					</nav>

					<ErrorModal
						title="Something went wrong"
						text={error}
						isOpen={error?.length > 0}
						closeModal={closeModal}
					/>

					{visaDetails && <>{renderSection1()}</>}

					{!visaDetails && (
						<>
							<div className="grid grid-cols-2 gap-4">
								<div
									role="status"
									className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
								>
									<div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
										<svg
											className="w-10 h-10 text-gray-200 dark:text-gray-600"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 16 20"
										>
											<path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
											<path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
										</svg>
									</div>
									<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
									<div className="flex items-center mt-4">
										<svg
											className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
										</svg>
										<div>
											<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
											<div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
										</div>
									</div>
									<span className="sr-only">Loading...</span>
								</div>

								<div
									role="status"
									className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
								>
									<div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
										<svg
											className="w-10 h-10 text-gray-200 dark:text-gray-600"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 16 20"
										>
											<path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
											<path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
										</svg>
									</div>
									<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
									<div className="flex items-center mt-4">
										<svg
											className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
										</svg>
										<div>
											<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
											<div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
										</div>
									</div>
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						</>
					)}
					{visaTC?.details &&
						visaTC?.details?.length > 0 &&
						renderSectionTienIch()}
					{visaTC?.faqs && visaTC.faqs.length > 0 && renderSection8()}
					{visaTC?.termsAndConditions && renderSection2()}
				</div>
				<MobileEnquiring />
				{/* SIDEBAR */}
				<div className="block flex-grow mt-14 p-4 lg:mt-0">
					<div className="hidden lg:block mt-10 sticky top-28">
						<InquirySidebar />
					</div>
				</div>
			</main>
		</div>
	);
};

export default ListVisaDetailPage;
