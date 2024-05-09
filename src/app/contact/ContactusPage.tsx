"use client";

import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import SocialsList from "@/shared/SocialsList";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "@/redux/store";
import Select from "@/shared/Select";
import BtnLoader from "@/shared/Loader/BtnLoader";
import ErrorModal from "@/shared/Status/ErrorModal";
import MobileMainNav from "../(client-components)/(Header)/MobileMainNav";

function ContactusPage() {
	const { config, globalData, countries } = useAppSelector(
		(state) => state.initials
	);
	const { jwtToken } = useSelector((state: RootState) => state.users);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [data, setData] = useState({
		name: "",
		email: "",
		country: "",
		phone: "",
		message: "",
	});

	const setDataHandler = (
		e:
			| ChangeEvent<HTMLInputElement>
			| ChangeEvent<HTMLTextAreaElement>
			| ChangeEvent<HTMLSelectElement>
	) => {
		return setData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			setError("");
			setIsLoading(true);
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
				`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/home/contact-us`,
				{
					body: JSON.stringify(data),
					method: "POST",
					headers: headers,
				}
			);

			if (!response.ok) {
				throw new Error("Form submission failed.!");
			}
			setIsLoading(false);
			return response.json();
		} catch (error: any) {
			console.log(error?.response?.data?.error || error);
			setIsLoading(false);
			setError(error?.response?.data?.error || error);
		}
	};

	const closeModal = () => {
		setError("");
	};

	const info = [
		{
			title: "🗺DUBAI ADDRESS",
			desc: config?.NEXT_PUBLIC_COMPANYADDRESS1 || "",
		},
		{
			title: "🗺 INDIA ADDRESS",
			desc: config?.NEXT_PUBLIC_COMPANYADDRESS2 || "",
		},
		{
			title: "💌 EMAIL",
			desc: globalData?.home?.email || "",
		},
		{
			title: "☎ PHONE",
			desc: `+${globalData?.home?.phoneNumber1} ${
				globalData?.home?.phoneNumber2
					? ", +" + globalData?.home?.phoneNumber2
					: ""
			}`,
		},
	];

	useEffect(() => {
		const loadDetailSchema = async () => {
			const context = {
				"@context": "http://schema.org",
				"@type": "contact_us",
				address: info,
				dubaiAddress: config?.NEXT_PUBLIC_COMPANYADDRESS1,
				indiaAddress: config?.NEXT_PUBLIC_COMPANYADDRESS2,
				publisher: {
					"@type": "Organization",
					name: config?.NEXT_PUBLIC_TITLE_NAME,
					logo: {
						"@type": "ImageObject",
						url: config?.NEXT_PUBLIC_COMPANY_LOGO,
						width: 300,
						height: 60,
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
	}, []);

	return (
		<div className={`nc-PageContact overflow-hidden`}>
			<ErrorModal
				title="Something went wrong"
				text={error}
				isOpen={error?.length > 0}
				closeModal={closeModal}
			/>
			<div className="mb-24 lg:mb-32">
				<MobileMainNav />
				<h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
					Contact
				</h2>
				<div className="container max-w-7xl mx-auto">
					<div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
						<div className="max-w-sm space-y-8">
							{info.map((item, index) => (
								<div key={index}>
									<h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
										{item.title}
									</h3>
									<span className="block mt-2 text-neutral-500 dark:text-neutral-400">
										{item.desc}
									</span>
								</div>
							))}
							<div>
								<h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
									🌏 SOCIALS
								</h3>
								<SocialsList className="mt-2" />
							</div>
						</div>
						<div>
							<form
								onSubmit={handleSubmit}
								className="grid grid-cols-1 gap-6"
								action="#"
								method="post"
							>
								<label className="block">
									<Label>Full name</Label>

									<Input
										placeholder="Example Doe"
										type="text"
										className="mt-1"
										name="name"
										value={data.name}
										onChange={setDataHandler}
									/>
								</label>
								<label className="block">
									<Label>Email address</Label>

									<Input
										type="email"
										placeholder="example@example.com"
										className="mt-1"
										name="email"
										value={data.email}
										onChange={setDataHandler}
									/>
								</label>
								<label className="block">
									<Label>Country</Label>

									<Select
										className="mt-1 capitalize"
										name="country"
										value={data.country}
										onChange={setDataHandler}
									>
										<option hidden>Choose Country</option>
										{countries?.map((data) => (
											<option
												className="capitalize"
												value={data._id}
											>
												{data?.countryName}
											</option>
										))}
									</Select>
								</label>
								<label className="block">
									<Label>Phone Number</Label>

									<Input
										type="number"
										placeholder="Ex : 0000000000"
										className="mt-1 no-spinner"
										name="phone"
										value={data.phone}
										onChange={setDataHandler}
									/>
								</label>
								<label className="block">
									<Label>Message</Label>

									<Textarea
										className="mt-1"
										rows={6}
										name="message"
										value={data.message}
										onChange={setDataHandler}
									/>
								</label>
								<div>
									<ButtonPrimary type="submit">
										{isLoading ? (
											<BtnLoader />
										) : (
											"Send Message"
										)}
									</ButtonPrimary>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			{/* OTHER SECTIONS */}
			{/* <div className="container">
        <SectionSubscribe2 className="pb-24 lg:pb-32" />
      </div> */}
		</div>
	);
}

export default ContactusPage;
