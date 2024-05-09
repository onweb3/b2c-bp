"use client";

import BgGlassmorphism from "@/components/BgGlassmorphism";
import React, { useEffect, useMemo, useState } from "react";
import SectionHero from "./(server-components)/SectionHero";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SliderCards from "@/components/Attraction/SliderCards";
import ComponentLoader from "@/components/loader/ComponentLoader";
import SectionGridFilterAttractionCard from "@/components/Attraction/SectionGridFilterAttractionCard";
import Heading from "@/shared/Heading";
import { fetchAffiliateUser } from "@/redux/features/affiliatesSlice";
import { setUser } from "@/redux/features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { RootState, useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { Route } from "next";
import SectionMobileHero from "./(server-components)/SectionMobileHero";
import StickyBanner from "@/components/StickyBanner/StickyBanner";
import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface CategoriesProps {
	categoryName: string;
}
import HotelSvg from "@/images/landings/hotel.svg";
import LocationSvg from "@/images/landings/location-marker.svg";
import PassportSvg from "@/images/landings/passport-control.svg";
import WavesSvg from "@/images/landings/Wave-10s-1920px.svg";
import uaeSvg from "@/images/landings/uae-flag.svg";
import blogSvg from "@/images/landings/blogs.svg";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import textureBG from "@/images/landings/texture.png";
import { InitialAttractionDestiantions } from "@/data/general/types";
import SliderOurServices from "@/components/SliderOurServices";
import SliderBlogs from "@/components/SliderBlogs";
import Categories from "@/components/Categories";
import { UUID } from "crypto";
import { SearchByDestination } from "@/data/attraction/types";

interface AttractionData {
	attractions: {
		_id: UUID | string | null;
		totalAttractions: number;
		data: SearchByDestination[];
	};
	destination: {
		code: string;
		country: string;
		createdAt: string | Date;
		image: string;
		isDeleted: false;
		name: string;
		slug: string;
		updatedAt: string | Date;
		__v: number;
		_id: string;
	};
	skip: number;
	limit: number;
	totalAttractions: number;
}

const LandingPage = () => {
	const dispatch = useDispatch();
	const { data: session } = useSession();
	const [attractionData, setAttractionData] = useState<AttractionData>();
	const [destinations, setDestinations] =
		useState<InitialAttractionDestiantions[]>();
	const [dest, setDest] = useState("dubai");

	const { attractionDestinations, globalData, selectedCurrency } =
		useSelector((state: RootState) => state.initials);

	const { jwtToken } = useSelector((state: RootState) => state.users);
	const { config } = useAppSelector((state) => state.initials)

	const findAttraction = async () => {
		try {
			// const attraction = await fetch('https://jsonplaceholder.typicode.com/todos/1')
			const attraction = await fetch(
				`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/all?limit=10000&skip=0&destination=${dest}`,
				{ next: { revalidate: 1 } }
			);
			return attraction.json();
		} catch (error) {
			console.log(error);
		}
	};

	async function attractionFound() {
		try {
			const response = await findAttraction();

			setAttractionData(response);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		attractionFound();
	}, [dest, config?.NEXT_PUBLIC_SERVER_URL]);

	useEffect(() => {
		{
			attractionDestinations && setDestinations(attractionDestinations);
		}
	}, [attractionDestinations]);

	const googleSignIn = async () => {
		const payload = {
			email: session?.user?.email,
			name: session?.user?.name,
		};

		try {
			const response = await fetch(
				`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/users/emailLogin`,
				{
					method: "POST",
					body: JSON.stringify(payload),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			return response.json();
		} catch (error) {
			console.log(error);
		}
	};

	async function googleProcess() {
		try {
			const response = await googleSignIn();
			dispatch(setUser(response));
			dispatch(fetchAffiliateUser() as any);
			// {response?.jwtToken && (
			//   router.push("/")
			// )}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		{
			session && googleProcess();
		}
	}, [session, config?.NEXT_PUBLIC_SERVER_URL]);

	const tabs = useMemo(() => {
		if (attractionDestinations && attractionDestinations.length > 0) {
			return attractionDestinations.map(
				(destination) => destination.name || ""
			);
		} else if (destinations && destinations.length > 0) {
			return destinations.map((destination) => destination.name || "");
		} else {
			return []; // Handle the case when both arrays are empty
		}
	}, [attractionDestinations, destinations]);
;

	useEffect(() => {
		const loadDetailSchema = async () => {
			const context = {
				"@context": "https://schema.org/",
				"@type": "Organization",
				name: config?.NEXT_PUBLIC_TITLE_NAME,
				alternateName: config?.NEXT_PUBLIC_TITLE_SHORT_NAME,
				duns: 561191215,
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
				address: [
					config?.NEXT_PUBLIC_COMPANYADDRESS1,
					config?.NEXT_PUBLIC_COMPANYADDRESS2,
				],
				email: globalData?.home?.email,
				logo: config?.NEXT_PUBLIC_COMPANY_LOGO,
				image: config?.NEXT_PUBLIC_COMPANY_LOGO,
				sameAs: [
					"https://travellerschoice.ae/",
					globalData?.home?.facebookUrl || "",
					`https://wa.me/${globalData?.home?.phoneNumber2}`,
					globalData?.home?.instagramUrl || "",
				],
			};

			const destinationContext = attractionDestinations?.map((item) => {
				return {
					"@context": "http://schema.org",
					"@type": "TouristDestination",
					name: item?.name,
					address: config?.NEXT_PUBLIC_COMPANYADDRESS1,
					description:
						"Explore Dubai's iconic landmarks and vibrant culture. Discover the breathtaking beauty of its beaches, towering skyscrapers, and desert adventures.",
					telephone: [
						`+${globalData?.home?.phoneNumber1}`,
						`+${globalData?.home?.phoneNumber2}`,
					],
					url: `${config?.NEXT_PUBLIC_CLIENT_URL}/${item?.slug}`,
				};
			});

			const productDestinationContext =
				attractionData?.attractions?.data?.map((item) => {
					return {
						"@context": "https://schema.org",
						"@type": "Product",
						aggregateRating: {
							"@type": "AggregateRating",
							ratingValue: item?.averageRating,
							reviewCount: item?.totalReviews,
						},
						category: item?.category?.categoryName,
						description: item?.slug,
						name: item?.title,
						image: item?.images.map((img) => {
							return config?.NEXT_PUBLIC_SERVER_URL + img;
						}),

						offers: {
							"@type": "Offer",
							price: item?.activity?.lowPrice,
							priceCurrency: selectedCurrency?.isocode,
							availability: `${config?.NEXT_PUBLIC_CLIENT_URL}/${item?.destination?.slug}/${item?.slug}/activity?date=${new Date()?.toDateString()}`,
						},
					};
				});

			const blogContext = globalData?.recentBlogs
				?.slice(0, 3)
				?.map((item) => {
					return {
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						name: config?.NEXT_PUBLIC_TITLE_NAME,
						url: `${config?.NEXT_PUBLIC_CLIENT_URL}/blog`,
						datePublished: new Date(
							item?.createdAt
						)?.toDateString(),
						mainEntityOfPage: {
							"@type": "WebPage",
							"@id": `${config?.NEXT_PUBLIC_CLIENT_URL}/blog`,
						},
						headline: item?.title,
						image: [
							config?.NEXT_PUBLIC_SERVER_URL +
								item?.thumbnail,
						],
						description: item?.body,
						publisher: {
							"@type": "Organization",
							name: config?.NEXT_PUBLIC_TITLE_NAME,
							logo: {
								"@type": "ImageObject",
								url: config?.NEXT_PUBLIC_COMPANY_LOGO,
							},
						},
					};
				});

			const script = document.createElement("script");
			script.type = "application/ld+json";
			script.innerHTML = JSON.stringify(context);
			script.id = "organization";
			document.head.appendChild(script);
			//
			const scriptDestination = document.createElement("script");
			scriptDestination.type = "application/ld+json";
			scriptDestination.id = "destination";
			scriptDestination.innerHTML = JSON.stringify(destinationContext);
			document.head.appendChild(scriptDestination);
			//
			const scriptProducts = document.createElement("script");
			scriptProducts.type = "application/ld+json";
			scriptProducts.id = "products";
			scriptProducts.innerHTML = JSON.stringify(
				productDestinationContext
			);
			document.head.appendChild(scriptProducts);
			//
			const scriptBlog = document.createElement("script");
			scriptBlog.type = "application/ld+json";
			scriptBlog.id = "blogs";
			scriptBlog.innerHTML = JSON.stringify(blogContext);
			document.head.appendChild(scriptBlog);
		};

		loadDetailSchema();

		return () => {
			// Clean up script when component unmounts
			const schemaScript = document.querySelector(
				'script[id="organization"]'
			);
			if (schemaScript) {
				schemaScript.remove();
			}
			//
			const schemaScript2 = document.querySelector(
				'script[id="destination"]'
			);
			if (schemaScript2) {
				schemaScript2.remove();
			}
			//
			const schemaScript3 = document.querySelector(
				'script[id="products"]'
			);
			if (schemaScript3) {
				schemaScript3.remove();
			}
			//
			const schemaScript4 = document.querySelector('script[id="blogs"]');
			if (schemaScript4) {
				schemaScript4.remove();
			}
		};
	}, [
		globalData?.home,
		globalData?.recentBlogs,
		attractionDestinations,
		attractionData?.attractions,
	]);

	const renderOurSection = () => {
		return (
			<div className="">
				{/* <Heading desc={""} isCenter={false}>
        Leading Tourism Company in Dubai
				</Heading> */}
				<Heading desc={""} isCenter={false}>
					Why Choose Our Tour Agency?
				</Heading>

				<div className="border    rounded-xl  overflow-hidden">
					<div className=" w-full h-full p-8">
						<div className="flex justify-between">
							<h3
								className={`text-xl  md:text-xl font-semibold text-center flex items-end gap-2`}
							>
								{/* <i className="las la-gopuram pr-2"></i> */}
								<Image
									src={uaeSvg}
									alt="icon"
									width={300}
									height={300}
									className="w-16 h-16"
								/>
								Leading Tourism Company in Dubai
							</h3>
						</div>
						<p className="block mt-2 md:mt-3 font-normal text-base sm:text-sm  text-justify ">
							Travellers Choice is an esteemed travel agency in
							Dubai that was founded in 2012. Our aim is to offer
							our clients a curated experience for their travels
							in Dubai and UAE. You can book the most sought-after
							experiences and adventures from the comfort of your
							home. We have a team of seasoned experts who ensure
							that you will explore the iconic landmarks and
							hidden gems in the most seamless way possible. Get
							ready for a simple, exciting, and personalized
							travel experience with our tour agency!
						</p>
					</div>
				</div>

				<div className="md:hidden mt-5">
					<SliderOurServices />
				</div>

				<div className="hidden md:grid md:grid-cols-3 gap-7 mt-3">
					<div className="border bg-orange-300  rounded-xl  overflow-hidden">
						<div className=" w-full h-full p-8">
							<div className="flex justify-between">
								<h3
									className={`text-xl text-black  md:text-xl font-semibold text-center flex items-end gap-2`}
								>
									{/* <i className="las la-gopuram pr-2"></i> */}
									<Image
										src={HotelSvg}
										alt="icon"
										width={300}
										height={300}
										className="w-16 h-16"
									/>
									Attractions
								</h3>
							</div>
							<p className="block text-black mt-2 md:mt-3 font-normal text-base sm:text-sm  text-justify ">
								We offer an array of diverse experiences for
								your travel and tours in UAE to ensure there's
								something special for every traveler to
								discover. Whether you thrive on adventure or
								find solace in nature, our tour agency in Dubai
								caters to all tastes. For thrill-seekers, our
								offerings include the Desert Safari in Dubai,
								Jebel Jais Zipline, and much more. Nature lovers
								can bask in the scenic beauty of Fujairah or
								dive into the culture on an Abu Dhabi City Tour.
								Choose what you like to do and make a booking
								online.
							</p>
						</div>
					</div>

					<div className=" bg-blue-200 rounded-xl overflow-hidden">
						<div className=" w-full h-full p-8">
							<div className="flex justify-between">
								<h3
									className={`text-xl text-black md:text-xl  font-semibold text-center flex items-end gap-2`}
								>
									{/* <i className="las la-fighter-jet pr-2"></i> */}
									<Image
										src={PassportSvg}
										alt="icon"
										width={300}
										height={300}
										className="w-16 h-16"
									/>
									Visa Services
								</h3>
							</div>
							<p className="block text-black mt-2 md:mt-3 font-normal text-base sm:text-sm  text-justify">
								Our travel agency in UAE is here to simplify the
								visa process for you. Whether you're planning a
								leisurely escape, business trip, or family
								vacation, our expert team navigates the
								intricacies of visa applications to make the
								journey to the UAE smoother for you. With a
								commitment to efficiency and accuracy, we offer
								a swift and reliable visa processing experience.
								Trust us to handle the paperwork, so you can
								focus on creating unforgettable moments.
							</p>
						</div>
					</div>
					<div className=" bg-green-300   rounded-xl overflow-hidden">
						<div className=" w-full h-full p-8">
							<div className="flex justify-between">
								<h3
									className={`text-xl text-black md:text-xl  font-semibold text-center flex items-end gap-2`}
								>
									{/* <i className="las la-hotel pr-2"></i> */}
									<Image
										src={LocationSvg}
										alt="icon"
										width={300}
										height={300}
										className="w-16 h-16"
									/>
									Hotel Bookings
								</h3>
							</div>
							<p className="block text-black mt-2 md:mt-3 font-normal text-base sm:text-sm  text-justify">
								Discover hassle-free hotel bookings with us! Our
								tourism company in Dubai is connected with over
								1200 hotels, providing a variety of options
								suiting your preferences. Experience the ease of
								online hotel booking through our platform to
								ensure a personalized experience for every stay.
								From luxurious resorts to charming hotels, our
								extensive network offers the perfect
								accommodation for your memorable trip.
							</p>
							<p className="text-black font-mono pt-2 ">
								Coming soon......
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	};
	//
	const renderWhyUSSection = () => {
		return (
			<div className="pt-10">
				{/* <Heading desc={""} isCenter={false}>
          Why Choose Our Tour Agency?
        </Heading> */}
				<div className="grid md:grid-cols-2 gap-7 ">
					<div className="sections__ relative  shadow-[1px_1px_20px_6px_rgba(0,0,0,0.10)] bg-gradient-to-br from-white via-white dark:from-neutral-900 dark:via-neutral-800 to-primary-500/20 rounded-xl p-4 sm:p-6 md:p-10">
						<div className="absolute left-5 -top-4 rounded-full w-10 h-10 bg-primary-500 flex justify-center items-center text-white">
							<i className="las la-quote-left text-2xl"></i>
						</div>
						<h3
							className={`text-lg sm:text-xl md:text-2xl font-semibold text-center`}
						>
							Diverse Adventures
						</h3>
						<p className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400 text-justify ">
							From heart-pounding activities like Desert Safari
							Dubai and Jebel Jais Zipline to serene explorations
							in Fujairah, our range of adventures caters to all
							preferences.
						</p>
					</div>
					<div className="sections__ relative  shadow-[1px_1px_20px_6px_rgba(0,0,0,0.10)] bg-gradient-to-br from-white via-white dark:from-neutral-900 dark:via-neutral-800 to-primary-500/20 rounded-xl p-4 sm:p-6 md:p-10">
						<div className="absolute left-5 -top-4 rounded-full w-10 h-10 bg-primary-500 flex justify-center items-center text-white">
							<i className="las la-quote-left text-2xl"></i>
						</div>
						<h3
							className={`text-lg sm:text-xl md:text-2xl font-semibold text-center`}
						>
							Tailored Experiences
						</h3>
						<p className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400 text-justify">
							We are committed to offering a personalized service
							to all our clients. We ensure that each adventure is
							crafted to match your individual preferences.
						</p>
					</div>
					<div className="sections__ relative  shadow-[1px_1px_20px_6px_rgba(0,0,0,0.10)] bg-gradient-to-br from-white via-white dark:from-neutral-900 dark:via-neutral-800 to-primary-500/20 rounded-xl p-4 sm:p-6 md:p-10">
						<div className="absolute left-5 -top-4 rounded-full w-10 h-10 bg-primary-500 flex justify-center items-center text-white">
							<i className="las la-quote-left text-2xl"></i>
						</div>
						<h3
							className={`text-lg sm:text-xl md:text-2xl font-semibold text-center`}
						>
							Effortless Booking Experience
						</h3>
						<p className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400 text-justify">
							Booking your favorite adventure or a hotel is
							extremely easy with our travel agency in UAE.
							Simplify your trip planning using our online
							services for a stress-free and streamlined travel
							experience.
						</p>
					</div>
					<div className="sections__ relative  shadow-[1px_1px_20px_6px_rgba(0,0,0,0.10)] bg-gradient-to-br from-white via-white dark:from-neutral-900 dark:via-neutral-800 to-primary-500/20 rounded-xl p-4 sm:p-6 md:p-10">
						<div className="absolute left-5 -top-4 rounded-full w-10 h-10 bg-primary-500 flex justify-center items-center text-white">
							<i className="las la-quote-left text-2xl"></i>
						</div>
						<h3
							className={`text-lg sm:text-xl md:text-2xl font-semibold text-center`}
						>
							Excellent Service
						</h3>
						<p className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400 text-justify">
							We are dedicated to punctuality and curating a
							seamless travel experience for our clients. This
							makes us your reliable partner for memorable
							adventures in Dubai and all over the UAE.
						</p>
					</div>
				</div>
			</div>
		);
	};

	const renderRecentBlogSection = () => {
		return (
			<div className="">
				<StickyBanner />

				<div className=" gap-2 md:grid-cols-4 grid ">
					<div className="border  bg-yellow-200  rounded-xl w-[90vw] md:w-full overflow-hidden">
						<div className="relative w-full h-full">
							<div className="flex justify-between">
								<p className="block mt-2 p-8 absolute inset-0 text-black md:mt-3 font-medium text-base sm:text-sm  ">
									Our blog is your gateway to a world of
									exploration, offering a treasure trove of
									travel inspiration, tips, and insights.
									Whether you're a seasoned globetrotter or
									embarking on your very first adventure, our
									expertly curated content will ignite your
									wanderlust, provide practical travel advice,
									and connect you to a global community of
									fellow explorers. Join us on this journey as
									we uncover hidden gems, share insider
									knowledge, and help you craft unforgettable
									memories, one destination at a time.
								</p>
							</div>

							<div className="pt-3 absolute md:mt-[400px] mt-[450px] pl-8">
								<ButtonSecondary href={`/blog` as Route}>
									View Blogs
								</ButtonSecondary>
							</div>
							<div className="">
								<Image
									className="hover:scale-110 object-cover  h-[32.5em] lg:h-[32.5em] w-full transition-all duration-500 cursor-pointer"
									src={textureBG}
									alt={"icon"}
									width={1000}
									height={100}
								/>
							</div>
						</div>
					</div>
					<div className="md:hidden">
						<SliderBlogs />
					</div>
					{globalData?.recentBlogs?.slice(0, 3)?.map((item) => (
						<Link
							href={`/blog/${item?.slug}` as Route}
							className="cursor-pointer"
							key={item?._id}
						>
							<div className="hidden md:block relative rounded-xl overflow-hidden">
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
					))}
				</div>
			</div>
		);
	};

	return (
		<main className="nc-PageHome relative overflow-hidden">
			{/* GLASSMOPHIN */}
			<BgGlassmorphism />

			<div className="relative">
				{/* SECTION HERO */}
				<SectionHero
					currentPage="Experiences"
					currentTab="Experiences"
					className="hidden md:block lg:block"
				/>

				<SectionMobileHero
					currentPage="Experiences"
					currentTab="Experiences"
					className="md:hidden block  min-h-screen  pt-10 lg:pt-16 lg:pb-16 "
				/>

				<div className=" relative container space-y-8 lg:space-y-8 my-10 lg:mt-[120px] md:mt-[80px] xl:mt-[200px]">
					<Categories />

					{/* SECTION 1 */}
					{attractionDestinations.length > 0 && (
						<SectionSliderNewCategories
							destinations={attractionDestinations}
						/>
					)}

					{globalData.topAttractions?.length &&
					globalData?.home?.isTopAttractionsSectionEnabled ? (
						<SliderCards
							data={globalData.topAttractions}
							heading="Top attractions"
							subHeading="Explore the city's treasures with the best travel company in Dubai. Choose your adventure:"
						/>
					) : (
						""
					)}

					{globalData.bestSellingAttractions?.length &&
					globalData?.home?.isBestSellingAttractionsSectionEnabled ? (
						<SliderCards
							data={globalData.bestSellingAttractions}
							heading="Best selling attractions"
							subHeading="Visit our best selling attractions."
						/>
					) : (
						""
					)}

					{attractionDestinations.length === 0 && (
						<>
							<ComponentLoader />
							<ComponentLoader />
							<ComponentLoader />
							<ComponentLoader />
						</>
					)}

					{/* <SectionOurFeatures /> */}
					{attractionData && (
						<SectionGridFilterAttractionCard
							data={attractionData}
							tabs={tabs}
							setDest={setDest}
							className="md:pb-8 lg:pb-8"
						/>
					)}

					{globalData?.recentBlogs?.length &&
					globalData?.home?.isBlogsEnabled
						? renderRecentBlogSection()
						: ""}

					{renderOurSection()}
					{renderWhyUSSection()}
				</div>
			</div>
		</main>
	);
};

export default LandingPage;
