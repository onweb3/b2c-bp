"use client";

import BgGlassmorphism from "@/components/BgGlassmorphism";
import React, { useEffect, useMemo, useState } from "react";

import SliderCards from "@/components/Attraction/SliderCards";
import ComponentLoader from "@/components/loader/ComponentLoader";
import SectionGridFilterAttractionCard from "@/components/Attraction/SectionGridFilterAttractionCard";
import Heading from "@/shared/Heading";
import { fetchAffiliateUser } from "@/redux/features/affiliatesSlice";
import { setUser } from "@/redux/features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { RootState, useAppSelector } from "@/redux/store";
import Tours from "@/components/Tours";
import SectionHero from "../(server-components)/SectionHero";
const TourPage = () => {
	const { config, attractionDestinations, globalData, tours } =
		useAppSelector((state) => state.initials);

	const dispatch = useDispatch();
	const { data: session } = useSession();
	const [attractionData, setAttractionData] = useState();
	const [tour, setTours] = useState([]);

	const [dest, setDest] = useState("dubai");

	const findAttraction = async () => {
		try {
			// const attraction = await fetch('https://jsonplaceholder.typicode.com/todos/1')
			const attraction = await fetch(
				`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/all?limit=8&skip=0&destination=${dest}`,
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

	const getTours = async () => {
		try {
			const tours = await fetch(
				`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/tour-packages/all`,
				{ next: { revalidate: 1 } }
			);
			if (!tours.ok) {
				throw new Error("Failed to fetch data");
			}

			return tours.json();
		} catch (error) {
			console.log(error);
		}
	};

	async function findTours() {
		try {
			const response = await getTours();

			console.log(response?.tourPackages, "tours");

			setTours(response?.tourPackages);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		attractionFound();
		findTours();
	}, [dest]);

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
	}, [session]);

	const tabs = useMemo(() => {
		return attractionDestinations.map((destination) => {
			return destination.name || "";
		});
	}, []);

	const renderOurSection = () => {
		return (
			<div className="">
				<Heading desc={""} isCenter={false}>
					Our Services
				</Heading>
				<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-7 lg:gap-14">
					<div className="sections__ border rounded-xl p-4 sm:p-10">
						<h3
							className={`text-lg sm:text-xl md:text-2xl  font-semibold text-center`}
						>
							<i className="las la-gopuram pr-2"></i>
							Attractions
						</h3>
						<p className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400 text-justify ">
							We offer an array of diverse experiences for your
							travel and tours in UAE to ensure there's something
							special for every traveler to discover. Whether you
							thrive on adventure or find solace in nature, our
							tour agency in Dubai caters to all tastes. For
							thrill-seekers, our offerings include the Desert
							Safari in Dubai, Jebel Jais Zipline, and much more.
							Nature lovers can bask in the scenic beauty of
							Fujairah or dive into the culture on an Abu Dhabi
							City Tour. Choose what you like to do and make a
							booking online.
						</p>
					</div>
					<div className="sections__ border rounded-xl p-4 sm:p-10">
						<h3
							className={`text-lg sm:text-xl md:text-2xl font-semibold text-center`}
						>
							<i className="las la-hotel pr-2"></i>
							Hotel Bookings
						</h3>
						<p className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400 text-justify">
							Discover hassle-free hotel bookings with us! Our
							tourism company in Dubai is connected with over 1200
							hotels, providing a variety of options suiting your
							preferences. Experience the ease of online hotel
							booking through our platform to ensure a
							personalized experience for every stay. From
							luxurious resorts to charming hotels, our extensive
							network offers the perfect accommodation for your
							memorable trip.
						</p>
					</div>
					<div className="sections__ border rounded-xl p-4 sm:p-10">
						<h3
							className={`text-lg sm:text-xl md:text-2xl font-semibold text-center`}
						>
							<i className="las la-fighter-jet pr-2"></i>
							Visa Services
						</h3>
						<p className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400 text-justify">
							Our travel agency in UAE is here to simplify the
							visa process for you. Whether you're planning a
							leisurely escape, business trip, or family vacation,
							our expert team navigates the intricacies of visa
							applications to make the journey to the UAE smoother
							for you. With a commitment to efficiency and
							accuracy, we offer a swift and reliable visa
							processing experience. Trust us to handle the
							paperwork, so you can focus on creating
							unforgettable moments.
						</p>
					</div>

					<div className="sections__ border rounded-xl p-4 sm:p-10">
						<h3
							className={`text-lg sm:text-xl md:text-2xl font-semibold text-center`}
						>
							{/* <i className="las la-gopuram pr-2"></i> */}
							<i className="las la-plane-departure pr-2"></i>
							Airport Transfer
						</h3>
						<p className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400 text-justify ">
							We offer an array of diverse experiences for your
							travel and tours in UAE to ensure there's something
							special for every traveler to discover. Whether you
							thrive on adventure or find solace in nature, our
							tour agency in Dubai caters to all tastes. For
							thrill-seekers, our offerings include the Desert
							Safari in Dubai, Jebel Jais Zipline, and much more.
							Nature lovers can bask in the scenic beauty of
							Fujairah or dive into the culture on an Abu Dhabi
							City Tour. Choose what you like to do and make a
							booking online.
						</p>
					</div>
				</div>
			</div>
		);
	};
	//
	const renderWhyUSSection = () => {
		return (
			<div className="">
				<Heading desc={""} isCenter={false}>
					Why Choose Our Tour Agency?
				</Heading>
				<div className="grid md:grid-cols-2 gap-7 ">
					<div className="sections__ border rounded-xl p-4 sm:p-6 md:p-10">
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
					<div className="sections__ border rounded-xl p-4 sm:p-6 md:p-10">
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
					<div className="sections__ border rounded-xl p-4 sm:p-6 md:p-10">
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
					<div className="sections__ border rounded-xl p-4 sm:p-6 md:p-10">
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

	const faqs = () => {
		return (
			<>
				<div>
					<Heading desc={""} isCenter={false}>
						FAQs
					</Heading>

					<div className="grid md:grid-cols-2 gap-7 ">
						<div className="sections__ border rounded-xl p-5">
							<h3
								className={`text-base sm:text-xl md:text-2xl font-semibold text-justify`}
							>
								How can I make a reservation for any experience
								with your tarvel agency?
							</h3>
							<p className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400 text-justify ">
								From heart-pounding activities like Desert
								Safari Dubai and Jebel Jais Zipline to serene
								explorations in Fujairah, our range of
								adventures caters to all preferences.
							</p>
						</div>

						<div className="sections__ border rounded-xl p-5">
							<h3
								className={`text-base sm:text-xl md:text-2xl font-semibold text-justify`}
							>
								Do you offer packages exclusively for Dubai
								attractions?
							</h3>
							<p className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400 text-justify ">
								From heart-pounding activities like Desert
								Safari Dubai and Jebel Jais Zipline to serene
								explorations in Fujairah, our range of
								adventures caters to all preferences.
							</p>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<main className="nc-PageHome relative overflow-hidden ">
			{/* GLASSMOPHIN */}
			<BgGlassmorphism />

			<div className="relative md:mb-16 mb-16 lg:mb-16">
				{/* SECTION HERO */}
				<SectionHero
					currentPage="Tours"
					currentTab="Tours"
					className="hidden lg:block pt-10 lg:pt-16 lg:pb-16  "
				/>

				<div className=" relative container space-y-10 lg:space-y-12 mt-10 lg:mt-12 ">
					{/* SECTION 1 */}

					{tours.length ? <Tours data={tours} /> : ""}

					{globalData.topAttractions?.length ? (
						<SliderCards
							data={globalData.topAttractions}
							heading="Top attractions"
							subHeading="Explore the city's treasures with the best travel company in Dubai. Choose your adventure:"
						/>
					) : (
						""
					)}

					{globalData.bestSellingAttractions?.length ? (
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
							className="md:pb-14 lg:pb-18"
						/>
					)}

					<div className="">
						<Heading desc={""} isCenter={false}>
							Leading Tourism Company in Dubai
						</Heading>
						<p className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
							My Travellers Choice is an esteemed travel agency in
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

					{renderOurSection()}
					{renderWhyUSSection()}
					{faqs()}
				</div>
			</div>
		</main>
	);
};

export default TourPage;
