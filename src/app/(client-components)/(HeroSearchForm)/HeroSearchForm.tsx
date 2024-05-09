"use client";
import React, { FC, useState } from "react";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
import ExperiencesSearchForm from "./(experiences-search-form)/ExperiencesSearchForm";
import RentalCarSearchForm from "./(car-search-form)/RentalCarSearchForm";
import FlightSearchForm from "./(flight-search-form)/FlightSearchForm";
import { useRouter } from "next/navigation";
import { Route } from "next";
import { TicketIcon } from "@heroicons/react/24/outline";
import { TicketIcon as SolidTicketIcon } from "@heroicons/react/24/solid";
import ToursSearchForm from "./(Tours-search-form)/ToursSearchform";
import HotelSearchForm from "./(hotel-search-form)/HotelSearchForm";
import burljarabSVG from "@/images/landings/buljarab.svg"
import passportSVG from "@/images/landings/passport.svg"
import Image from "next/image";
export type SearchTab =
	| "Stays"
	| "Experiences"
	| "Visa"
	| "Flights"
	| "Tours"
	| "Hotel";

export interface HeroSearchFormProps {
	className?: string;
	currentTab?: SearchTab;
	currentPage?:
		| "Stays"
		| "Experiences"
		| "Visa"
		| "Flights"
		| "Tours"
		| "Hotel";
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
	className = "",
	currentTab = "Experiences",
	currentPage,
}) => {
	const router = useRouter(); // Initialize the router object

	const tabs: SearchTab[] = ["Experiences", "Visa"];
	// const tabs: SearchTab[] = ["Experiences", "Tours", "Hotel", "Visa"];
	const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

	const renderTab = () => {
		return (
			<ul className="ml-2 sm:ml-6 md:ml-12 hidden md:flex  overflow-x-auto hiddenScrollbar">
				{tabs.map((tab) => {
					const renderIcons = (tab: SearchTab) => {
						switch (tab) {
							case "Experiences":
								return <Image src={burljarabSVG} className="h-30 w-30 bg-transparent" alt="experience icon" height={100} width={100} />
								// return (
								// 	<svg
								// 		fill="#ffffff"
								// 		version="1.1"
								// 		id="Layer_1"
								// 		xmlns="http://www.w3.org/2000/svg"
								// 		xmlnsXlink="http://www.w3.org/1999/xlink"
								// 		viewBox="0 0 512.001 512.001"
								// 		xmlSpace="preserve"
								// 		stroke="#ffffff"
								// 	>
								// 		<g
								// 			id="SVGRepo_bgCarrier"
								// 			strokeWidth="0"
								// 		></g>
								// 		<g
								// 			id="SVGRepo_tracerCarrier"
								// 			strokeLinecap="round"
								// 			strokeLinejoin="round"
								// 		></g>
								// 		<g id="SVGRepo_iconCarrier">
								// 			{" "}
								// 			<g>
								// 				{" "}
								// 				<g>
								// 					{" "}
								// 					<path d="M409.887,28.761c-6.079-6.077-14.161-9.424-22.76-9.424c-6.78,0-13.239,2.081-18.649,5.941 c-5.409-3.86-11.869-5.941-18.649-5.941c-8.599,0-16.681,3.347-22.759,9.423c-6.08,6.077-9.429,14.158-9.429,22.755 c0,8.597,3.349,16.678,9.426,22.751l32.537,32.551c2.371,2.37,5.522,3.675,8.874,3.675c3.354,0,6.508-1.306,8.878-3.677 l32.532-32.544c6.08-6.078,9.429-14.159,9.429-22.755S415.967,34.839,409.887,28.761z M398.804,63.187l-30.326,30.338 l-30.329-30.342c-3.118-3.115-4.835-7.259-4.835-11.667c0-4.408,1.718-8.552,4.837-11.669c3.119-3.118,7.267-4.835,11.679-4.835 c4.413,0,8.56,1.718,11.679,4.835l1.429,1.429c3.06,3.059,8.021,3.059,11.08,0l1.429-1.429c3.119-3.118,7.267-4.835,11.679-4.835 c4.413,0,8.56,1.718,11.679,4.836c3.119,3.117,4.837,7.261,4.837,11.668C403.642,55.923,401.924,60.068,398.804,63.187z"></path>{" "}
								// 				</g>{" "}
								// 			</g>{" "}
								// 			<g>
								// 				{" "}
								// 				<g>
								// 					{" "}
								// 					<path d="M179.319,115.397c-5.296-5.292-12.335-8.207-19.823-8.207c-5.586,0-10.921,1.622-15.469,4.641 c-4.547-3.02-9.883-4.641-15.468-4.641c-7.489,0-14.528,2.914-19.821,8.207c-5.297,5.292-8.214,12.332-8.214,19.82 c0,7.489,2.916,14.526,8.21,19.815l26.986,26.996c2.219,2.219,5.169,3.441,8.307,3.441c3.096,0,6.125-1.256,8.309-3.442 l26.981-26.993c5.297-5.292,8.214-12.332,8.214-19.819S184.614,120.691,179.319,115.397z M168.236,143.952l-24.208,24.218 l-24.211-24.221c-2.333-2.331-3.617-5.432-3.617-8.731c-0.001-3.302,1.284-6.402,3.62-8.735c2.334-2.333,5.439-3.618,8.741-3.618 c3.303,0,6.406,1.285,8.742,3.62l1.186,1.185c3.058,3.057,8.018,3.059,11.078,0.002l1.19-1.188 c2.334-2.333,5.439-3.618,8.741-3.618s6.407,1.285,8.743,3.62c2.334,2.332,3.62,5.435,3.62,8.733 C171.858,138.516,170.573,141.617,168.236,143.952z"></path>{" "}
								// 				</g>{" "}
								// 			</g>{" "}
								// 			<g>
								// 				{" "}
								// 				<g>
								// 					{" "}
								// 					<path d="M418.879,241.831c-5.296-5.293-12.335-8.208-19.823-8.208c-5.586,0-10.921,1.622-15.469,4.641 c-4.547-3.02-9.883-4.641-15.468-4.641c-7.489,0-14.528,2.914-19.821,8.207c-5.297,5.292-8.214,12.332-8.214,19.82 c0,7.489,2.917,14.526,8.21,19.815l26.986,26.997c2.219,2.219,5.169,3.441,8.307,3.441c3.096,0,6.125-1.256,8.309-3.442 l26.981-26.993c5.297-5.292,8.214-12.332,8.214-19.819C427.092,254.163,424.175,247.125,418.879,241.831z M407.797,270.384 l-24.208,24.218l-24.211-24.221c-2.333-2.331-3.617-5.432-3.617-8.731c0-3.3,1.285-6.4,3.621-8.733 c2.334-2.333,5.439-3.618,8.741-3.618s6.406,1.285,8.742,3.62l1.186,1.185c3.06,3.057,8.018,3.059,11.078,0.002l1.19-1.188 c2.334-2.333,5.439-3.618,8.741-3.618c3.303,0,6.407,1.285,8.743,3.62c2.334,2.333,3.62,5.435,3.62,8.733 C411.419,264.948,410.133,268.049,407.797,270.384z"></path>{" "}
								// 				</g>{" "}
								// 			</g>{" "}
								// 			<g>
								// 				{" "}
								// 				<g>
								// 					{" "}
								// 					<path d="M413.705,469.827h-22.881c-13.319-27.257-26.247-57.295-38.587-89.668h3.227c7.547,0,13.688-6.153,13.688-13.716V347.63 c0-7.563-6.14-13.716-13.688-13.716h-19.892c-10.104-29.619-19.624-60.616-28.426-92.496h1.498 c7.548,0,13.689-6.152,13.689-13.715V208.89c0-7.563-6.141-13.715-13.689-13.715h-13.609 c-6.682-26.964-12.828-54.361-18.362-81.914h5.634c7.548,0,13.69-6.153,13.69-13.715V84.261c0-7.563-6.141-13.715-13.69-13.715 h-0.437V49.005c0-8.868-7.198-16.084-16.045-16.084h-2.016V7.837c0-4.328-3.509-7.837-7.837-7.837 c-4.328,0-7.837,3.509-7.837,7.837v25.084h-2.016c-8.848,0-16.047,7.215-16.047,16.084v21.541h-0.437 c-7.548,0-13.689,6.152-13.689,13.715v15.286c0,7.563,6.141,13.715,13.689,13.715h5.693 c-5.533,27.552-11.678,54.949-18.361,81.914h-13.666c-7.548,0-13.69,6.152-13.69,13.715v18.812c0,7.563,6.142,13.715,13.69,13.715 h1.556c-8.802,31.88-18.322,62.876-28.427,92.496h-19.948c-7.548,0-13.689,6.153-13.689,13.716v18.812 c0,7.563,6.141,13.716,13.689,13.716h3.284c-12.34,32.371-25.268,62.409-38.588,89.668H98.242 c-7.352,0-13.333,5.991-13.333,13.357v15.459c0,7.365,5.981,13.357,13.333,13.357h94.529c7.352,0,13.334-5.991,13.334-13.357 v-15.459c0-7.365-5.982-13.357-13.334-13.357h-9.706c4.154-11.964,11.208-22.825,20.699-31.602 c14.311-13.234,32.863-20.522,52.239-20.522c19.391,0,37.942,7.28,52.238,20.498c9.493,8.777,16.548,19.647,20.703,31.626h-9.765 c-7.352,0-13.334,5.991-13.334,13.357v15.459c0,7.365,5.982,13.357,13.334,13.357h94.529c7.351,0,13.332-5.991,13.332-13.357 v-15.459C427.036,475.818,421.056,469.827,413.705,469.827z M319.025,333.914h-26.453v-9.995h23.12 C316.797,327.267,317.908,330.598,319.025,333.914z M310.62,308.245h-18.049v-5.227c0-2.14-0.2-4.232-0.561-6.267h15.002 C308.205,300.601,309.408,304.432,310.62,308.245z M257.568,267.635c-11.106,0-21.014,5.262-27.431,13.443h-20.375 c1.348-4.507,2.681-9.035,4.001-13.584h43.282c4.328,0,7.837-3.509,7.837-7.837c0-4.328-3.509-7.837-7.837-7.837h-38.813 c0.969-3.459,1.929-6.927,2.883-10.403h69.773c0.954,3.476,1.915,6.944,2.883,10.403h-5.379c-4.328,0-7.837,3.509-7.837,7.837 c0,4.328,3.509,7.837,7.837,7.837h9.848c1.32,4.548,2.653,9.077,4.001,13.584h-17.243 C278.582,272.897,268.674,267.635,257.568,267.635z M276.898,303.018v30.896h-38.661v-30.896c0-10.868,8.672-19.71,19.331-19.71 S276.898,292.15,276.898,303.018z M231.622,97.588v-11.37h11.565c4.328,0,7.837-3.509,7.837-7.837c0-3.43-2.208-6.338-5.277-7.4 V49.005c0-0.226,0.167-0.411,0.373-0.411h19.704c0.206,0,0.373,0.184,0.373,0.411v21.541h-1.038c-4.328,0-7.837,3.509-7.837,7.837 c0,4.328,3.509,7.837,7.837,7.837h15.165v11.37H231.622z M271.306,163.091c0.654,2.877,1.315,5.749,1.981,8.618h-34.57 c0.667-2.869,1.327-5.742,1.981-8.618H271.306z M244.187,147.417c2.478-11.35,4.856-22.741,7.131-34.156h9.366 c2.275,11.416,4.654,22.807,7.131,34.156H244.187z M235.01,187.383h41.985c0.628,2.602,1.261,5.199,1.898,7.793h-45.781 C233.749,192.581,234.382,189.983,235.01,187.383z M205.286,210.849H306.66v14.895H205.286V210.849z M204.992,296.751h18.133 c-0.362,2.035-0.561,4.127-0.561,6.267v5.227h-21.18C202.596,304.432,203.799,300.601,204.992,296.751z M196.312,323.918h26.252 v9.995h-29.585C194.097,330.598,195.207,327.267,196.312,323.918z M158.468,364.485v-14.898h195.01v14.898H158.468z M141.87,462.89h27.042c-0.843,2.279-1.597,4.592-2.261,6.937h-28.063C139.686,467.533,140.779,465.22,141.87,462.89z M190.43,485.5v10.826h-89.848V485.5H190.43z M176.442,447.216h-27.395c2.15-4.805,4.286-9.686,6.409-14.629h31.866 C183.206,437.126,179.565,442.024,176.442,447.216z M220.474,402.286h28.984c-15.628,1.104-30.612,6.143-43.698,14.629H162.05 c1.986-4.818,3.959-9.694,5.919-14.629h22.203c4.328,0,7.837-3.509,7.837-7.837s-3.509-7.837-7.837-7.837h-16.096 c0.817-2.14,1.631-4.292,2.444-6.453h158.962c0.812,2.16,1.627,4.313,2.444,6.453H220.474c-4.328,0-7.837,3.509-7.837,7.837 S216.146,402.286,220.474,402.286z M306.271,416.914c-13.084-8.485-28.076-13.524-43.72-14.629h81.484 c1.959,4.935,3.933,9.811,5.918,14.629H306.271z M324.701,432.588h31.846c5.536,12.887,11.164,25.311,16.869,37.239h-28.064 C341.447,456.031,334.409,443.296,324.701,432.588z M411.362,496.327h-89.847V485.5h89.847V496.327z"></path>{" "}
								// 				</g>{" "}
								// 			</g>{" "}
								// 		</g>
								// 	</svg>
								// );
							case "Flights":
								return (
									<svg
										fill="#ffffff"
										viewBox="0 0 512 512"
										enable-background="new 0 0 512 512"
										id="plane"
										version="1.1"
										xmlSpace="preserve"
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
										transform="rotate(45)"
										stroke="#000000"
										strokeWidth="0.00512"
									>
										<g
											id="SVGRepo_bgCarrier"
											strokeWidth="0"
										></g>
										<g
											id="SVGRepo_tracerCarrier"
											strokeLinecap="round"
											strokeLinejoin="round"
										></g>
										<g id="SVGRepo_iconCarrier">
											{" "}
											<g>
												{" "}
												<path d="M393.158,135.677c1.308,1.249,2.985,1.869,4.661,1.869c1.78,0,3.556-0.699,4.882-2.087 c2.575-2.695,2.478-6.968-0.217-9.543l-14.116-13.485c-2.697-2.576-6.969-2.478-9.544,0.218c-2.574,2.695-2.477,6.968,0.218,9.543 L393.158,135.677z"></path>{" "}
												<path d="M264.002,311.413l-5.928,5.419c-2.751,2.515-2.942,6.784-0.427,9.537c1.331,1.455,3.154,2.194,4.983,2.194 c1.627,0,3.258-0.584,4.554-1.768l5.927-5.419c2.752-2.515,2.943-6.784,0.428-9.536 C271.023,309.09,266.756,308.899,264.002,311.413z"></path>{" "}
												<path d="M311.643,267.869l-29.888,27.319c-2.753,2.515-2.944,6.784-0.429,9.535c1.332,1.457,3.155,2.196,4.984,2.196 c1.626,0,3.257-0.584,4.552-1.768l29.888-27.319c2.752-2.516,2.943-6.784,0.428-9.535 C318.662,265.545,314.393,265.355,311.643,267.869z"></path>{" "}
												<path d="M195.624,247.017l23.696-23.779c2.631-2.641,2.623-6.914-0.018-9.545c-2.639-2.632-6.914-2.625-9.546,0.017l-23.696,23.779 c-2.632,2.641-2.623,6.915,0.018,9.546c1.316,1.313,3.04,1.968,4.764,1.968C192.573,249.002,194.306,248.34,195.624,247.017z"></path>{" "}
												<path d="M235.18,207.323l5.032-5.049c2.632-2.64,2.624-6.914-0.017-9.545c-2.641-2.633-6.914-2.625-9.547,0.017l-5.031,5.049 c-2.632,2.64-2.624,6.914,0.017,9.545c1.317,1.313,3.042,1.969,4.765,1.969C232.129,209.309,233.86,208.647,235.18,207.323z"></path>{" "}
												<path d="M407.824,284.613c1.543-0.538,3.017-1.305,4.363-2.307l6.726-5.009c5.414-4.032,7.788-11.099,5.905-17.584l-1.992-6.854 c-1.149-3.952-3.711-7.253-7.131-9.339c-1.141-0.696-2.376-1.256-3.687-1.661c-0.646-0.2-1.297-0.357-1.951-0.474 c-0.347-0.063-0.694-0.083-1.043-0.123c-0.305-0.034-0.608-0.087-0.913-0.104c-0.487-0.027-0.973-0.011-1.458,0.006 c-0.161,0.006-0.323-0.006-0.483,0.005c-0.583,0.037-1.16,0.117-1.734,0.216c-0.059,0.01-0.117,0.013-0.176,0.023 c-2.537,0.469-4.951,1.553-7.049,3.192l-2.492-9.386l-12.519-47.153l5.834-5.485c0.052-0.049,0.105-0.101,0.156-0.152 c4.985-5,48.667-49.695,47.34-78.759c-0.316-6.931-3.141-12.811-8.164-17.006c-28.035-23.403-80.891,29.619-87.29,36.236 l-17.125,16.472l-58.892-17.626c0.4-0.432,0.77-0.881,1.109-1.351c0.005-0.006,0.009-0.012,0.013-0.018 c0.331-0.458,0.633-0.929,0.904-1.417c0.018-0.031,0.033-0.063,0.05-0.094c0.254-0.464,0.483-0.936,0.683-1.422 c0.031-0.075,0.056-0.151,0.086-0.226c0.175-0.449,0.334-0.902,0.462-1.367c0.038-0.138,0.064-0.278,0.099-0.417 c0.101-0.413,0.196-0.827,0.259-1.249c0.033-0.216,0.044-0.437,0.067-0.655c0.036-0.357,0.079-0.712,0.089-1.074 c0.009-0.323-0.014-0.648-0.027-0.974c-0.012-0.268-0.005-0.535-0.032-0.804c-0.058-0.603-0.151-1.207-0.287-1.81 c-1.131-5.014-4.728-8.945-9.623-10.515l-10.164-3.26c-5.09-1.631-10.621-0.323-14.434,3.415l-7.627,7.468c0,0-0.001,0-0.001,0.001 c-1.07,1.048-1.927,2.235-2.608,3.5l-66.119-19.79c-2.101-0.628-4.384-0.197-6.11,1.164l-27.862,21.938 c-1.781,1.402-2.74,3.604-2.551,5.863c0.187,2.258,1.496,4.272,3.484,5.36l58.86,32.222l23.911,13.09c0.001,0,0.001,0,0.002,0.001 l13.296,7.278l40.947,22.416l-57.664,55.463l-109.907-2.438l-6.064-0.135c-0.052-0.002-0.102-0.002-0.151-0.002 c-0.115,0-0.225,0.024-0.339,0.03c-0.464,0.019-0.914,0.086-1.353,0.198c-0.017,0.004-0.033,0.008-0.051,0.013 c-0.413,0.11-0.811,0.255-1.19,0.44c-0.033,0.016-0.067,0.028-0.101,0.045c-0.375,0.191-0.732,0.411-1.065,0.668 c-0.021,0.016-0.043,0.027-0.063,0.043c-0.352,0.277-0.679,0.587-0.971,0.931l0,0c0,0,0,0,0,0.001 c-0.045,0.052-0.079,0.114-0.122,0.168c-0.196,0.246-0.388,0.496-0.549,0.769c-0.1,0.167-0.17,0.352-0.255,0.528 c-0.001,0.002-0.003,0.004-0.003,0.006c-0.002,0.002-0.003,0.004-0.004,0.007c-0.083,0.174-0.181,0.339-0.25,0.521 c0,0.001,0,0.001,0,0.001l0,0c-0.141,0.373-0.25,0.763-0.324,1.167l-3.938,21.542c-0.592,3.241,1.243,6.438,4.341,7.561 l52.545,19.033c0.001,0,0.002,0,0.003,0.001l47.346,17.149l21.565,99.56c0.578,2.665,2.702,4.722,5.384,5.212l20.003,3.657 c0.403,0.072,0.81,0.109,1.214,0.109c1.427,0,2.828-0.452,3.995-1.31c1.497-1.1,2.476-2.767,2.704-4.61l13.965-112.645 l70.269-66.067l71.359,140.64c1.025,2.021,2.998,3.392,5.249,3.651c0.258,0.029,0.515,0.044,0.771,0.044 c1.98,0,3.879-0.873,5.17-2.41l22.799-27.162c1.414-1.684,1.919-3.948,1.355-6.072L407.824,284.613z M196.893,125.127 l-16.64,14.336l-40.901-22.391l17.083-13.451l48.551,14.532L196.893,125.127z M405.45,255.264c0.125-0.103,0.251-0.19,0.376-0.265 c0.501-0.298,0.995-0.382,1.413-0.372c0.104,0.003,0.204,0.012,0.298,0.023c0.188,0.025,0.353,0.064,0.485,0.106 c0.399,0.124,1.03,0.414,1.474,1.077c0.148,0.221,0.275,0.482,0.365,0.793l1.992,6.854c0.32,1.102-0.083,2.305-1.004,2.99 l-6.548,4.875l-2.162-8.143l-1.136-4.28L405.45,255.264z M242.75,108.148c0.227-0.223,0.557-0.302,0.862-0.202l10.165,3.26 c0.127,0.041,0.469,0.15,0.577,0.629c0.108,0.48-0.153,0.725-0.252,0.817l-4.933,4.634l-12.064-3.611L242.75,108.148z M247.551,176.305l-25.6-14.014l22.836-18.651l12.161-9.933l54.819,16.407l-40.646,39.094L247.551,176.305z M238.603,304.536 c-1.147,1.079-1.882,2.525-2.075,4.088l-6.109,49.277l-10.381,2.248l-16.547,3.584l-10.291-47.51 c-0.491-2.269-2.114-4.126-4.298-4.917l-44.439-16.098l10.608-28.294l50.697,1.124c1.781,0.054,3.533-0.64,4.829-1.884 l90.551-87.095l28.313-27.232c0.001-0.001,0.003-0.003,0.005-0.004l20.049-19.284c0.061-0.058,0.121-0.118,0.179-0.178 c16.207-16.799,54.396-47.54,69.013-35.338c2.125,1.774,3.184,4.08,3.328,7.255c0.425,9.252-6.947,24.319-20.758,42.426 c-10.646,13.956-21.608,25.129-22.587,26.12l-7.81,7.343h-0.001c-0.35,0.232-0.687,0.486-0.993,0.785l-4.113,4.017L238.603,304.536 z M350.86,277.831l-20.164-39.741l40.347-39.4l13.607,51.25l-14.323,11.822L350.86,277.831z M398.67,372.057l-25.358-49.978 l24.682-21.882l14.656,55.204L398.67,372.057z"></path>{" "}
											</g>{" "}
										</g>
									</svg>
								);
							case "Visa":
								return <Image src={passportSVG} className="h-30 w-30 bg-transparent" alt="experience icon" height={100} width={100} />
								// return tabActive === "Visa" ? (
								// 	<SolidTicketIcon />
								// ) : (
								// 	<TicketIcon />
								// );
							case "Tours":
								return (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-6 h-6"
									>
										<path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
										<path
											fillRule="evenodd"
											d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z"
											clipRule="evenodd"
										/>
									</svg>
								);

							case "Hotel":
								return (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path
											fillRule="evenodd"
											d="M1 2.75A.75.75 0 0 1 1.75 2h10.5a.75.75 0 0 1 0 1.5H12v13.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5H2v-13h-.25A.75.75 0 0 1 1 2.75ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM8 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM8.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM14.25 6a.75.75 0 0 0-.75.75V17a1 1 0 0 0 1 1h3.75a.75.75 0 0 0 0-1.5H18v-9h.25a.75.75 0 0 0 0-1.5h-4Zm.5 3.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm.5 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"
											clipRule="evenodd"
										/>
									</svg>
								);

							default:
								return null;
						}
					};

					const active = tab === tabActive;
					return (
						<li
							onClick={() => {
								setTabActive(tab);
								if (tab === "Experiences") {
									router.push("/" as Route);
								} else if (tab === "Tours") {
									router.push(
										`/${tab.toLowerCase()}` as Route
									);
								} else {
									router.push(
										`/${tab.toLowerCase()}` as Route
									);
								}
							}}
							className={`flex-shrink-0 flex bg-orange-300 items-center cursor-pointer  lg:text-base text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 ${
								active
									? "text-white border rounded-full  "
									: " text-white hover:text-gray-100 dark:hover:text-neutral-200 rounded-full "
							} `}
							key={tab}
						>
							<span className=" w-8 h-8 flex justify-center items-center  mr-2">
								{renderIcons(tab)}
							</span>
							<span>{tab}</span>
						</li>
					);
				})}
			</ul>
		);
	};

	const renderForm = () => {
		switch (tabActive) {
			// case "Stays":
			// 	return <StaySearchForm />;
			case "Experiences":
				return <ExperiencesSearchForm />;
			case "Visa":
				// router.push("/visa" as Route);
				return <RentalCarSearchForm />;
			// case "Flights":
			// 	return <FlightSearchForm />;
			// case "Tours":
			// 	return <ToursSearchForm />;
			// case "Hotel":
			// 	return <HotelSearchForm />;

			default:
				return null;
		}
	};

	return (
		<div
			className={`nc-HeroSearchForm w-full max-w-6xl z-10 ${className}`}
		>
			<div className="-mb-[10px]">
			{renderTab()}
			</div>
			{renderForm()}
		</div>
	);
};

export default HeroSearchForm;
