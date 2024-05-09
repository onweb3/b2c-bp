"use client";
import DefaultLoader from "@/components/loader/DefaultLoader";
import React, { FC, useEffect, useMemo, useState } from "react";
import MobileFooterStickyDate from "../../MobileFooterStickyDate";
import Breadcrumb, { BreadcrumbsList } from "@/components/General/BreadCrumb";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import {
	PlayCircleIcon,
	MapPinIcon,
	ArrowUpRightIcon,
	PhoneIcon,
} from "@heroicons/react/24/solid";
import ReactPlayer from "react-player";
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import ButtonPrimary from "@/shared/ButtonPrimary";
import StayDatesRangeInput from "./StayDatesRangeInput";
import StartRating from "@/components/StartRating";
import priceConversion from "@/utils/priceConversion";
import GoogleMapReact from "google-map-react";
import ButtonSecondary from "@/shared/ButtonSecondary";
import CommentListing from "@/components/CommentListing";
import Textarea from "@/shared/Textarea";
import Input from "@/shared/Input";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import ErrorModal from "@/shared/Status/ErrorModal";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import Badge from "@/shared/Badge";
import { handleSetFavourites } from "@/redux/features/attractionSlice";
import { Route } from "next";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AppDispatch, RootState, useAppSelector } from "@/redux/store";
import {
	ActivityExcursion,
	BookingTypeEnum,
	CancellationTypeEnum,
	ExcursionDetails,
	ReviewExcursion,
	SectionsExcursion,
} from "@/data/attraction/types";
import { format, parse } from "date-fns";
import placeholder from "@/images/map.jpg";
import { MovingBorderButton } from "@/components/MovingBorderButton";
import Link from "next/link";
import Logo from "@/shared/Logo";
import HeroSearchForm2MobileFactory from "@/app/(client-components)/(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";

interface ExcursionReviews {
	attractionReviews: ReviewExcursion[];
	limit: number;
	skip: number;
	totalAttractionReviews: number;
}

export interface AttractionDetailPageProps {
	attraction: string;
}

const AttractionDetails: FC<AttractionDetailPageProps> = ({ attraction }) => {



const { config } = useAppSelector((state) => state.initials)

const findAttraction = async (attractionSlug: string) => {
	try {
		const attraction = await fetch(
			`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/single/${attractionSlug}?affiliateCode=`,
			{ next: { revalidate: 1 } }
		);
		return attraction.json();
	} catch (error) {
		console.log(error);
	}
};

const findAttractionReviews = async ({
	limit = 5,
	skip = 0,
	attraction,
}: {
	limit: number;
	skip: number;
	attraction: string;
}) => {
	try {
		const reviews = await fetch(
			`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/reviews/single/${attraction}?limit=${limit}&skip=${skip}`
		);
		return reviews.json();
	} catch (error) {
		console.log(error);
	}
};

	const thisPathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams()!;
	const modal = searchParams?.get("modal");
	const dispatch = useDispatch<AppDispatch>();
	let limit = Number(searchParams?.get("limit")) || 2;

	const [isMobile, setIsMobile] = useState(false);

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

	const { selectedCurrency } = useSelector(
		(state: RootState) => state.initials
	);
	const { jwtToken, isLoggedIn } = useSelector(
		(state: RootState) => state.users
	);

	const { favourites } = useSelector((state: RootState) => state.attraction);
	const { globalData } = useSelector((state: RootState) => state.initials);

	//
	const [skipReview, setSkipReview] = useState<number>(0);
	const [isVideoModal, setIsVideoModal] = useState<boolean>(false);

	//
	const [attractionData, setAttractionData] = useState<ExcursionDetails>();

	const [attractionReviews, setAttractionReviews] =
		useState<ExcursionReviews>();
	const [totalReviews, setTotalReviews] = useState<ReviewExcursion[]>([]);
	const [review, setReview] = useState<{ title: string; note: string }>({
		title: "",
		note: "",
	});
	const [stars, setStars] = useState<number>(5);
	const [ratingSubmitErr, setRatingSubmitErr] = useState<string>("");
	//
	const [date, setDate] = useState<Date | null>(null);

	// Fetching the attraction details.
	useEffect(() => {
		const fecthApiResponse = async (attraction: string) => {
			try {
				const response = await findAttraction(attraction);
				const filteredActivity = response?.activities?.filter(
					(item: ActivityExcursion) => {
						if (
							!response?.isApiConnected &&
							response?.bookingType !== BookingTypeEnum.booking &&
							item?.adultTicketCount <= 0 &&
							item?.childTicketCount <= 0
						) {
							console.log("missed");
						} else {
							return item;
						}
					}
				);
				setAttractionData({
					...response,
					activities: filteredActivity,
				});
			} catch (error) {
				console.log(error);
			}
		};
		fecthApiResponse(attraction);
	}, [attraction,config?.NEXT_PUBLIC_SERVER_URL]);

	// Fetching the reviews of attraction.
	const fetchReviewResponse = async ({
		limit = 5,
		skip = 0,
		attraction,
	}: {
		limit: number;
		skip: number;
		attraction: string;
	}) => {
		try {
			// if(totalReviews?.length <=)
			const response = await findAttractionReviews({
				limit,
				skip,
				attraction,
			});
			setAttractionReviews(response);
			setTotalReviews([...totalReviews, ...response?.attractionReviews]);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchReviewResponse({ limit, skip: skipReview, attraction });
	}, [limit, skipReview]);

	const handleCloseModalImageGallery = () => {
		let params = new URLSearchParams(document.location.search);
		params.delete("modal");
		router.push(`${thisPathname}/?${params.toString()}` as Route);
	};

	const handleOpenModalImageGallery = () => {
		router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
	};

	// Onclick handler for reviews.
	const reviewOnClickHandler = () => {
		setSkipReview((prev) => {
			return prev + 1;
		});
	};

	// Finding the review see more button is disabled or not.
	const isReviewSeeMoreDisabled = () => {
		if (attractionReviews?.totalAttractionReviews) {
			return (
				attractionReviews?.totalAttractionReviews <=
				totalReviews?.length
			);
		} else {
			return false;
		}
	};

	// Handle Like button in excursion.
	const handleFavourites = (data: ExcursionDetails) => {
		dispatch(handleSetFavourites(data));
	};

	// handle map click
	const handleMapClick = () => {
		let url;

		if (attractionData?.mapLink !== "") {
			url = attractionData?.mapLink;
		} else {
			url = `https://www.google.com/maps/search/?api=1&query=${attractionData?.slug}`;
		}

		window.open(url, "_blank");
	};

	// isAttracionExist checkng.
	const isFavAttraction = useMemo(() => {
		const isExist = favourites.find(
			(item) => item._id === attractionData?._id
		);
		if (isExist) {
			return true;
		} else {
			return false;
		}
	}, [attractionData?._id, favourites]);

	// Review submit handler.
	const reviewSubmitHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			let headers = {};
			if (
				jwtToken?.length &&
				jwtToken !== null &&
				jwtToken !== undefined
			) {
				headers = {
					"Content-Type": "application/json",
					Authorization: `Bearer ${jwtToken}`,
				};
			} else {
				headers = {
					"Content-Type": "application/json",
				};
			}

			const response = await fetch(
				`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/reviews/add`,
				{
					method: "POST",
					body: JSON.stringify({
						rating: stars,
						title: review?.title,
						description: review?.note,
						attraction: attraction,
					}),
					headers: headers,
				}
			);

			if (!response.ok) {
				const res = await response.json();
				console.log(res);
				setRatingSubmitErr(res?.error);
				return;
			}
			setTotalReviews([]);
			fetchReviewResponse({ limit, skip: 0, attraction: attraction });
		} catch (error: any) {
			setRatingSubmitErr(error?.response?.data?.error);
			console.log(error);
		}
	};

	const closeModal = () => {
		setRatingSubmitErr("");
	};

	// Making breadcrums data.
	const parts = thisPathname?.split("/").filter((part) => part !== "");
	let link = "";
	const breadcrum: BreadcrumbsList[] =
		parts?.map((item) => {
			link += `/${item}`;
			return {
				name: item,
				link: link,
				classNames: "",
			};
		}) || [];

	const cancellationTypes = attractionData?.cancellationType;
	let cancellationTypeString: string;
	switch (cancellationTypes) {
		case CancellationTypeEnum.freeCancellation:
			cancellationTypeString = "Free Cancellation within 24 hours";
			break;
		case CancellationTypeEnum.cancelWithFee:
			cancellationTypeString = "Cancellation with Fee";
			break;
		case CancellationTypeEnum.nonRefundable:
			cancellationTypeString = "Non Refundable";
			break;
		default:
			cancellationTypeString = "";
			break;
	}

	const lowPriceSideBar: number = useMemo(() => {
		if (
			attractionData?.activities?.length &&
			attractionData?.activities[0]?.lowPrice &&
			attractionData?.activities[0]?.isPromoCode &&
			attractionData?.activities[0]?.promoAmountAdult
		) {
			return (
				attractionData?.activities[0]?.lowPrice +
				attractionData?.activities[0]?.promoAmountAdult
			);
		} else if (
			attractionData?.activities?.length &&
			attractionData?.activities[0]?.lowPrice
		) {
			return attractionData?.activities[0]?.lowPrice;
		} else {
			return 0;
		}
	}, [attractionData?.activities?.length, attractionData?.activities]);

	const highPriceSideBar: number = useMemo(() => {
		if (attractionData?.activities?.length) {
			let lastIndex: number = attractionData?.activities?.length - 1 || 0;
			if (
				attractionData?.activities[lastIndex]?.lowPrice &&
				attractionData?.activities[lastIndex]?.isPromoCode &&
				attractionData?.activities[lastIndex]?.promoAmountAdult
			) {
				return (
					attractionData?.activities[lastIndex]?.lowPrice +
					(attractionData?.activities[lastIndex]?.promoAmountAdult ||
						0)
				);
			} else if (
				attractionData?.activities?.length &&
				attractionData?.activities[lastIndex]?.lowPrice
			) {
				return attractionData?.activities[lastIndex]?.lowPrice;
			} else {
				return 0;
			}
		} else {
			return 0;
		}
	}, [attractionData?.activities?.length, attractionData?.activities]);

	useEffect(() => {
		const loadTabbyPromoScript = async () => {
			const script = document.createElement("script");
			const script2 = document.createElement("script");
			script.src = "https://checkout.tabby.ai/tabby-promo.js";
			script.async = true;
			script.type = "text/javascript";
			script2.innerHTML = `
			new TabbyPromo({
			  selector: '#TabbyPromo', 
			  currency: 'AED', 
			  price: ${lowPriceSideBar},
			  shouldInheritBg: true,
			  lang: 'en', 
			  installmentsCount: 4,
			  source: 'product', 
			  publicKey: '${config?.NEXT_PUBLIC_TABBY_PUBLIC_KEY}',
			  merchantCode: '${config?.NEXT_PUBLIC_TABBY_MERCHANT_CODE}'  
			});
			console.log("TabbyPromo script loaded successfully");
		  `;
			document.head.appendChild(script);
			document.head.appendChild(script2);
		};

		loadTabbyPromoScript();

		return () => {
			// Clean up script when component unmounts
			const tabbyPromoScript = document.querySelector(
				'script[src="https://checkout.tabby.ai/tabby-promo.js"]'
			);
			if (tabbyPromoScript) {
				tabbyPromoScript.remove();
			}
		};
	}, [lowPriceSideBar]);

	// Structured Data......... Schema.org
	useEffect(() => {
		const loadDetailSchema = async () => {
			const context = {
				"@context": "https://schema.org",
				"@type": "Product",
				aggregateRating: {
					"@type": "AggregateRating",
					ratingValue: attractionData?.averageRating
						? Number(attractionData?.averageRating?.toFixed(2))
						: 0,
					reviewCount: attractionData?.totalRating,
				},
				category: attractionData?.category?.categoryName,
				description: attractionData?.description,
				name: attractionData?.title,
				image: attractionData?.images.map((item) => {
					return config?.NEXT_PUBLIC_SERVER_URL + item;
				}),
				offers: {
					"@type": "Offer",
					availability: `${config?.NEXT_PUBLIC_CLIENT_URL}/${thisPathname}/activity?date=${date?.toDateString()}`,
					priceCurrency: selectedCurrency?.isocode,
					highPrice: highPriceSideBar,
					price: lowPriceSideBar,
					lowPrice: lowPriceSideBar,
				},
				brand: {
					"@type": "Organization",
					name: config?.NEXT_PUBLIC_TITLE_NAME,
					telephone: [
						`+${globalData?.home?.phoneNumber1}`,
						`+${globalData?.home?.phoneNumber2}`,
					],
					url: config?.NEXT_PUBLIC_CLIENT_URL,
					contactPoint: {
						"@type": "ContactPoint",
						telephone: `+${globalData?.home?.phoneNumber1}`,
						contactType: "customer service",
					},
					duns: 561191215,
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
				review: attractionReviews?.attractionReviews?.map((item) => {
					return {
						"@type": "Review",
						author: config?.NEXT_PUBLIC_TITLE_SHORT_CODE,
						datePublished: item?.updatedAt,
						reviewBody: item?.description,
						name: item?.title || item?.createdBy,
						reviewRating: {
							"@type": "Rating",
							bestRating: "5",
							ratingValue: `${item?.rating}`,
							worstRating: "1",
						},
					};
				}),
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
									item: `${config?.NEXT_PUBLIC_CLIENT_URL}`,
								},
								...breadcrum?.map((item, index) => {
									return {
										"@type": "ListItem",
										position: index + 2,
										name: item?.name,
										item: `${config?.NEXT_PUBLIC_CLIENT_URL}${item?.link}`,
									};
								}),
							],
						},
						mainEntity: {
							"@type": "FAQPage",
							mainEntity: [
								attractionData?.faqs?.map((item) => {
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
	}, [
		attractionData,
		attractionData?.title,
		lowPriceSideBar,
		globalData?.home,
		highPriceSideBar,
		attractionReviews?.attractionReviews,
	]);

	const renderSection1 = () => {
		return (
			<div className="listingSection__wrap !space-y-5">
				{/* 1 */}
				<div className="flex justify-between items-center">
					<div className="flex gap-2">
						<Badge
							color="green"
							name={attractionData?.bookingType}
							className="capitalize dark:bg-neutral-800 dark:text-neutral-100"
						/>
						<Badge
							color="blue"
							name={attractionData?.category?.categoryName}
							className="capitalize dark:bg-neutral-800 dark:text-neutral-100"
						/>
					</div>
					<LikeSaveBtns
						attraction={attractionData}
						handleFavourites={handleFavourites}
						isLiked={isFavAttraction}
					/>
				</div>

				{/* 2 */}
				<h2 className="text-xl sm:text-2xl lg:text-4xl font-semibold">
					{attractionData?.title}
				</h2>

				{/* 3 */}
				<div className="flex items-center space-x-4">
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
					/>
					<span>·</span>
					<span>
						<i className="las la-map-marker-alt"></i>
						<span className="ml-1 capitalize">
							{" "}
							{attractionData?.destination?.name}
						</span>
					</span>
				</div>

				{/* 4 */}
				<div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

				{/* 5 */}
				<div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
					<div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
						<i className="las la-clock text-2xl"></i>
						<span className="">
							{attractionData?.duration +
								" " +
								attractionData?.durationType +
								" (approx)"}{" "}
						</span>
					</div>
					<div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
						<i className="las la-coins text-2xl"></i>
						<span className="">{cancellationTypeString}</span>
					</div>
					{attractionData?.bookingType == "ticket" && (
						<div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
							<i className="las la-bolt text-2xl"></i>
							<span className=""> Instant Confirmation</span>
						</div>
					)}
				</div>
			</div>
		);
	};

	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-lg sm:text-xl md:2xl font-semibold">
					Highlights
				</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{attractionData?.highlights && (
					<div
						dangerouslySetInnerHTML={{
							__html: attractionData?.highlights,
						}}
						className="text-neutral-6000 dark:text-neutral-300"
					></div>
				)}
			</div>
		);
	};

	const renderSection3 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-lg sm:text-xl md:2xl font-semibold">
						Availablity{" "}
					</h2>
					<span className="block mt-2 text-neutral-500 dark:text-neutral-400">
						Included in the Time
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* 6 */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
					{attractionData?.availability?.map((item) => (
						<div
							key={item._id}
							className="flex items-center space-x-3"
						>
							<i className="las la-check-circle text-lg sm:text-xl md:2xl"></i>
							<span className="capitalize">
								{item?.open && item.close
									? `${item.day} ${format(
											parse(
												item.open,
												"HH:mm",
												new Date()
											),
											"h:mm a"
										)} - ${format(
											parse(
												item.close,
												"HH:mm",
												new Date()
											),
											"h a"
										)} `
									: item?.day}
							</span>
						</div>
					))}
				</div>
			</div>
		);
	};

	const renderSection5 = (section: SectionsExcursion) => {
		return (
			<div key={section._id} className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-lg sm:text-xl md:2xl font-semibold">
					{section.title}
				</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* desc */}
				{section.body && (
					<span
						dangerouslySetInnerHTML={{ __html: section.body }}
						className="block text-neutral-6000 dark:text-neutral-300"
					></span>
				)}
			</div>
		);
	};

	const renderSection6 = () => {
		return (
			<div className="listingSection__wrap">
				<ErrorModal
					title="Something went wrong"
					text={ratingSubmitErr}
					isOpen={ratingSubmitErr?.length > 0}
					closeModal={closeModal}
				/>
				{/* HEADING */}
				<h2 className="text-lg sm:text-xl md:2xl font-semibold">
					Reviews ({attractionReviews?.totalAttractionReviews}{" "}
					reviews)
				</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* Content */}
				{jwtToken && isLoggedIn ? (
					<form onSubmit={reviewSubmitHandler}>
						<div className="space-y-5">
							<FiveStartIconForRate
								setStars={setStars}
								iconClass="w-6 h-6"
								className="space-x-0.5"
							/>
							<Input
								fontClass=""
								sizeClass="h-16 px-4 py-3"
								rounded="rounded-3xl"
								placeholder="Title of feedback"
								onChange={(e) => {
									setReview((prev) => {
										return {
											...prev,
											title: e.target.value,
										};
									});
								}}
							/>
							<Textarea
								onChange={(e) => {
									setReview((prev) => {
										return {
											...prev,
											note: e.target.value,
										};
									});
								}}
								placeholder="Share your thoughts ..."
							/>
							<div className="flex justify-end">
								<ButtonPrimary className="" type="submit">
									Add Review{" "}
									<ArrowRightIcon className="w-5 h-5" />
								</ButtonPrimary>
							</div>
						</div>
					</form>
				) : (
					""
				)}

				{/* comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
					{totalReviews &&
						totalReviews?.map((review) => (
							<CommentListing data={review} className="py-8" />
						))}

					<div className="pt-8">
						<ButtonSecondary
							disabled={isReviewSeeMoreDisabled()}
							className=" cursor-pointer disabled:cursor-not-allowed "
							onClick={() => reviewOnClickHandler()}
						>
							View more reviews
						</ButtonSecondary>
					</div>
				</div>
			</div>
		);
	};

	const Mark = ({ lat, lng }: { lat: number; lng: number }) => (
		<div className="text-2xl text-red-500">
			<i className="las la-map-marker"></i>
		</div>
	);

	// Map section
	const renderSection7 = (latitude: number, longitude: number) => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Location</h2>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* MAP */}
				<div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
					<div className="rounded-xl overflow-hidden z-0">
						<div className=" overflow-hidden w-full h-full ">
							{/* {latitude &&
                                longitude &&
                                !isNaN(longitude) &&
                                !isNaN(latitude) ? (
                                <GoogleMapReact
                                    bootstrapURLKeys={{
                                        key: "AIzaSyA6qMfsMovR4sRbC8bu6zMNMH3brgzxwW4",
                                    }}
                                    defaultCenter={{
                                        lat: latitude && Number(latitude),
                                        lng: longitude && Number(longitude),
                                    }}
                                    defaultZoom={14}
                                >
                                    <Mark
                                        lat={latitude && Number(latitude)}
                                        lng={longitude && Number(longitude)}
                                    />
                                </GoogleMapReact>
                            ) : ( */}
							<div
								onClick={handleMapClick}
								className="cursor-pointer"
							>
								<Image
									src={placeholder}
									className="w-full h-full object-cover"
									alt="bann"
									fill
								/>
								<div className="flex justify-center mt-[150px] md:mt-[150px] xl:mt-[200px] lg:mt-[150px] sm:mt-[150px]">
									<h2 className="md:text-2xl text-lg flex gap-5 items-center absolute font-semibold">
										<span>
											{" "}
											<MapPinIcon
												height={30}
												width={30}
											/>{" "}
										</span>{" "}
										{attractionData?.title}{" "}
										<span>
											{" "}
											<ArrowUpRightIcon
												height={30}
												width={30}
											/>{" "}
										</span>
									</h2>
								</div>
							</div>
							{/* )} */}
						</div>
					</div>
				</div>
			</div>
		);
	};

	const renderSection8 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Faq</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}

				{attractionData?.faqs &&
					attractionData?.faqs?.map((faq) => (
						<div key={faq._id}>
							<h4 className="text-lg font-semibold">
								{faq.question}
							</h4>
							<span className="block mt-3 text-neutral-500 dark:text-neutral-400">
								{faq.answer}
							</span>
						</div>
					))}
			</div>
		);
	};

	const renderSidebar = () => {
		if (attractionData?.activities?.length) {
			return (
				<div className="w-full flex flex-col rounded-2xl border-primary-500 border-b-2 border-t-2 border-l-2 border-r-2  dark:border-neutral-700 space-y-6 xl:space-y-7 pb-10 p-2 sm:p-4 xl:px-8 xl:py-6 relative  animate-shadowping">
					{/* PRICE */}
					<div className="flex justify-between">
						<div className="text-2xl font-semibold">
							<p className="text-xs font-light text-neutral-700 dark:text-neutral-400">
								Starting from
							</p>
							{priceConversion(
								lowPriceSideBar,
								selectedCurrency,
								true
							)}
							<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
								/
								{attractionData?.activities?.length &&
									attractionData?.activities[0]?.base}
							</span>
						</div>
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
						/>
					</div>

					<div className="md:max-w-[400px]" id="TabbyPromo"></div>

					{/* FORM */}
					<div>
						<div className="pb-2 px-2 text-lg font-medium text-neutral-900 dark:text-neutral-200">
							Select tour date
						</div>
						<form className="flex flex-col bg-green-500/10 dark:bg-green-600/10 border animate-shadowpingGreen border-green-600 dark:border-green-700 rounded-3xl ">
							<StayDatesRangeInput
								setDate={setDate}
								attraction={attractionData}
								className="flex-1 z-[11]"
							/>
							{/* <GuestsInput className="flex-1" /> */}
						</form>
					</div>

					{/* SUBMIT */}

					{isMobile ? null : (
						<Link
							href={
								`${thisPathname}/activity?date=${date?.toDateString()}` as Route
							}
						>
							<MovingBorderButton
								duration={2000}
								width="w-full"
								borderRadius="1.75rem"
								className="bg-white w-full  dark:bg-slate-900 text-black text-xl dark:text-white border-primary-6000 shadow-2xl dark:border-slate-800"
							>
								Reserve
							</MovingBorderButton>
						</Link>
					)}
					{/* <ButtonPrimary
						className="animate-[shadowAnimationPrimaryColor_2s_ease-in_12s_3]"
						href={
							`${thisPathname}/activity?date=${date?.toDateString()}` as Route
						}
					>
						Reserve
					</ButtonPrimary> */}
				</div>
			);
		} else {
			return (
				<div className="  w-full flex flex-col rounded-2xl border-primary-500 border-b-2 border-t-2 border-l-2 border-r-2  dark:border-neutral-700 space-y-6 xl:space-y-7 pb-10 p-2 sm:p-4 xl:px-8 xl:py-6 relative  ">
					<div className="absolute left-5 -top-4 rounded-full w-10 h-10 bg-primary-500 flex justify-center items-center text-white">
						<i className="las la-quote-left text-2xl"></i>
					</div>
					<div className="text-center text-3xl font-black">
						Contact us
					</div>
					<div className="flex flex-col gap-5 items-center ">
						<a
							hrefLang={"en"}
							href={`tel:${globalData?.home?.phoneNumber1}`}
							className=" px-3 cursor-pointer flex items-center"
						>
							<span className="">
								<PhoneIcon className="w-4 h-4" />
							</span>
							<span className="">
								{globalData?.home?.phoneNumber1}
							</span>
						</a>
						<a
							href={`https://wa.me/${globalData?.home?.phoneNumber2}`}
							className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
						>
							<i className={"lab la-whatsapp"}></i>
							<span className="hidden lg:block text-sm">
								Whatsapp
							</span>
						</a>
					</div>
				</div>
			);
		}
	};

	return (
		<div className={` nc-ListingExperiencesDetailPage `}>
			<div className="md:hidden flex -mt-[38px] lg:container h-16 relative justify-between gap-3">
				<div className="flex justify-left md:justify-start">
					<Logo
						imgClassName="border rounded-xl"
						imgLight={config?.NEXT_PUBLIC_COMPANY_FAVICON}
						img={config?.NEXT_PUBLIC_COMPANY_FAVICON}
						className={`w-12 self-center`}
					/>
				</div>

				<div
					className={`flex  md:hidden flex-[3] max-w-lg !mx-auto md:px-3`}
				>
					<div className="self-center flex-1">
						<HeroSearchForm2MobileFactory />
					</div>
				</div>
			</div>
			<ListingImageGallery
				isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
				onClose={handleCloseModalImageGallery}
				images={
					attractionData && attractionData?.images?.length
						? attractionData?.images
						: [""]
				}
			/>

			{attractionData && (
				<div className="mb-4 md:mt-0 mt-3">
					<div className="md:flex md:justify-between border rounded-2xl md:p-4 p-2">
						<div className="md:space-y-2 space-y-1">
							<h1 className="text-xl max-w-[80%] md:max-w-[100%] sm:text-2xl lg:text-4xl font-semibold">
								{attractionData?.title}
							</h1>

							<div className="flex items-center md:space-x-4 space-x-2">
								{isMobile ? null : (
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
										reviewCount={
											attractionData?.totalRating
										}
										className=""
									/>
								)}
								<span className="md:block hidden">·</span>
								<span>
									<i className="las la-map-marker-alt"></i>
									<span className="md:ml-1 capitalize text-xs md:text-md">
										{" "}
										{attractionData?.destination?.name}
									</span>
								</span>

								<span className="md:block hidden">·</span>

								<div className="flex gap-2">
									<Badge
										color="green"
										name={attractionData?.bookingType}
										className="capitalize text-sm  dark:bg-neutral-800 dark:text-neutral-100"
									/>
									<span className="md:block hidden">·</span>
									<Badge
										color="blue"
										name={
											attractionData?.category
												?.categoryName
										}
										className="capitalize text-sm dark:bg-neutral-800 dark:text-neutral-100"
									/>
								</div>
							</div>

							<div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

							{/* 5 */}
							<div className="flex items-center justify-between xl:justify-start space-x-2 xl:space-x-12 md:text-sm text-xs text-neutral-700 dark:text-neutral-300">
								<div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
									<i className="las la-clock text-lg md:text-2xl"></i>
									<span className="">
										{attractionData?.duration +
											" " +
											attractionData?.durationType +
											" (apx)"}{" "}
									</span>
								</div>
								<div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
									<i className="las la-coins text-lg md:text-2xl"></i>
									<span className="">
										{cancellationTypeString}
									</span>
								</div>
								{attractionData?.bookingType == "ticket" && (
									<div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
										<i className="las la-bolt text-lg md:text-2xl"></i>
										<span className="">
											Insta Confirmation
										</span>
									</div>
								)}
							</div>
						</div>

						<div className="md:block md:relative md:top-0 md:right-0 absolute top-[85px] right-7">
							<LikeSaveBtns
								attraction={attractionData}
								handleFavourites={handleFavourites}
								isLiked={isFavAttraction}
							/>
						</div>
					</div>
				</div>
			)}

			{attractionData && <Breadcrumb breadCrumbs={breadcrum} />}

			{/* SINGLE HEADER */}
			<header className="rounded-md sm:rounded-xl mt-4 md:mt-4">
				<div className="relative grid grid-cols-4 gap-1 sm:gap-2">
					{attractionData && attractionData?.images?.length && (
						<div
							onClick={() => setIsVideoModal(!isVideoModal)}
							className=" col-span-4 row-span-4 md:col-span-3 md:row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
						>
							{isVideoModal ? (
								<ReactPlayer
									width={"100%"}
									height={"100%"}
									muted
									playing
									onClick={() =>
										setIsVideoModal(!isVideoModal)
									}
									loop
									url={`${attractionData?.youtubeLink}?modestbranding=1`}
								/>
							) : (
								<>
									<Image
										onClick={() => {
											console.log(
												"on Click wrking on Image tag"
											);
											setIsVideoModal(!isVideoModal);
										}}
										alt="photo 1"
										// fill
										width={1000}
										height={100}
										className="object-cover max-h-[290px] rounded-md sm:rounded-xl"
										src={`${
											config?.NEXT_PUBLIC_CDN_URL +
											attractionData?.images[0]
										}`}
										// sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
									/>
									<div className="block absolute top-0 bottom-0 left-0 right-0">
										<div className="cursor-pointer flex justify-center items-center h-full z-10">
											<PlayCircleIcon
												color="white"
												width={100}
												height={100}
											/>
										</div>
									</div>
								</>
							)}

							<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
						</div>
					)}

					{attractionData?.images
						?.filter((_, i) => i < 2)
						.map((item, index) => (
							<div
								onClick={handleOpenModalImageGallery}
								key={index}
								className={`relative hidden md:block rounded-md sm:rounded-xl overflow-hidden ${
									index >= 2 ? "block" : ""
								}`}
							>
								<div className="min-h-[140px]">
									<Image
										alt="photos"
										fill
										className="object-cover w-full h-full rounded-md sm:rounded-xl "
										src={
											`${config?.NEXT_PUBLIC_CDN_URL + item}` ||
											""
										}
										sizes="400px"
									/>
								</div>

								{/* OVERLAY */}
								<div
									className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
									onClick={handleOpenModalImageGallery}
								/>
							</div>
						))}

					{attractionData?.images
						?.filter((_, i) => i < 3)
						.map((item, index) => (
							<div
								onClick={handleOpenModalImageGallery}
								key={index}
								className={`relative md:hidden block rounded-md sm:rounded-xl overflow-hidden ${
									index >= 2 ? "block" : ""
								}`}
							>
								<div className="aspect-w-3 aspect-h-2">
									<Image
										alt="photos"
										fill
										className="object-cover w-full h-full rounded-md sm:rounded-xl "
										src={
											`${config?.NEXT_PUBLIC_CDN_URL + item}` ||
											""
										}
										sizes="400px"
									/>
								</div>

								{/* OVERLAY */}
								<div
									className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
									onClick={handleOpenModalImageGallery}
								/>
							</div>
						))}
					{attractionData && (
						<div
							className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
							onClick={handleOpenModalImageGallery}
						>
							<Squares2X2Icon className="h-5 w-5" />
							<span className="ml-2 text-neutral-800 text-sm font-medium">
								Show all photos
							</span>
						</div>
					)}
				</div>
			</header>

			{/* MAIn */}
			<main className="relative z-10 mt-5 md:mt-11 flex flex-col lg:flex-row  ">
				{/* CONTENT */}
				<div className="w-full lg:w-3/5 xl:w-2/3 space-y-3 md:space-y-8 lg:pr-10 ">
					{!isMobile ? null : (
						<div className="block" id="TabbyPromo"></div>
					)}
					{attractionData && (
						<>
							{/* {renderSection1()} */}
							{renderSection2()}
							{renderSection3()}
						</>
					)}

					{!attractionData && (
						<>
							<div
								role="status"
								className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
							>
								<div className="w-full">
									<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
								</div>
							</div>
							<div
								role="status"
								className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
							>
								<div className="flex items-center justify-center min-w-[100%] min-h-[400px] bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
									<svg
										className="w-10 h-10 text-gray-200 dark:text-gray-600"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 18"
									>
										<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
									</svg>
								</div>
							</div>
							<div
								role="status"
								className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
							>
								<div className="w-full">
									<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
								</div>
							</div>

							<div
								role="status"
								className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
							>
								<div className="w-full">
									<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
								</div>
							</div>

							<div
								role="status"
								className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
							>
								<div className="w-full">
									<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
								</div>
							</div>
						</>
					)}
					{/* <SectionDateRange /> */}
					{attractionData?.sections &&
						attractionData?.sections?.map((section) =>
							renderSection5(section)
						)}
					{attractionData ? (
						<>
							{renderSection6()}
							{renderSection7(
								attractionData?.latitude,
								attractionData?.longitude
							)}
						</>
					) : (
						""
					)}
					{attractionData?.faqs && attractionData?.faqs?.length
						? renderSection8()
						: ""}
				</div>

				{/* SIDEBAR */}
				<div className="hidden lg:block flex-grow mt-14 lg:mt-0">
					<div className="sticky top-28">
						{attractionData && <>{renderSidebar()}</>}
					</div>
					{!attractionData && (
						<>
							<div className="sticky top-28">
								<div
									role="status"
									className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
								>
									<div className="flex items-center justify-center min-w-[100%] min-h-[200px] bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
										<svg
											className="w-10 h-10 text-gray-200 dark:text-gray-600"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 20 18"
										>
											<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
										</svg>
									</div>
								</div>

								<div
									role="status"
									className="space-y-8 mt-1 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
								>
									<div className="flex items-center justify-center min-w-[100%] min-h-[200px] bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
										<svg
											className="w-10 h-10 text-gray-200 dark:text-gray-600"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 20 18"
										>
											<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
										</svg>
									</div>
								</div>

								<div className="mt-5">
									<DefaultLoader />
								</div>
							</div>
						</>
					)}
				</div>
			</main>
			{/* STICKY FOOTER MOBILE */}
			{attractionData?.activities &&
				attractionData?.activities?.length > 0 && (
					<MobileFooterStickyDate attractionData={attractionData} />
				)}

			{attractionData?.activities?.length === 0 && (
				<div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
					<div className="container flex py-3 items-center justify-between">
						<p className="text-xl font-bold">Contact Us</p>
						<div className="flex flex-row gap-5 items-center ">
							<a
								hrefLang={"en"}
								href={`tel:${globalData?.home?.phoneNumber1}`}
								className=" px-3 cursor-pointer flex items-center"
							>
								<span className="">
									<PhoneIcon className="w-4 h-4" />
								</span>
								<span className="">
									{globalData?.home?.phoneNumber1}
								</span>
							</a>
							<a
								href={`https://wa.me/${globalData?.home?.phoneNumber2}`}
								className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
							>
								<i
									className={
										"lab la-whatsapp text-green-700 font-bold text-3xl"
									}
								></i>
								<span className="hidden lg:block text-sm">
									Whatsapp
								</span>
							</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AttractionDetails;
