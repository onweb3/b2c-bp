"use client";

import MobileMainNav from "@/app/(client-components)/(Header)/MobileMainNav";
import { Blog } from "@/data/general/types";
import { useAppSelector } from "@/redux/store";
import ButtonCircle from "@/shared/ButtonCircle";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

interface BlogResponseInterface {
	blogs: Blog[];
	limit: number;
	skip: number;
	totalBlogs: number;
}

const BlogLandingPage = () => {
	const thisPathname = usePathname();
	const { config } = useAppSelector((state) => state.initials)

	const [value, setValue] = useState<string>("");
	const [blogResponse, setBlogResponse] =
		useState<BlogResponseInterface | null>(null);
	const [isLoading, setIsLoading] = useState<Boolean>(false);

	const filteredData: Blog[] = useMemo(() => {
		const searchRegex = new RegExp(value, "i");
		return (
			blogResponse?.blogs?.filter((data) =>
				searchRegex.test(data?.title)
			) || []
		);
	}, [value, blogResponse]);

	useEffect(() => {
		async function getAllBlogs() {
			try {
				setIsLoading(true);
				const response = await fetch(
					`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/blogs/all`,
					{
						next: { revalidate: 10 },
					}
				);
				if (!response.ok) {
					setIsLoading(false);
					return;
				}
				setBlogResponse(await response.json());
				setIsLoading(false);
			} catch (err: any) {
				console.log(err, "ERROR");
				setIsLoading(false);
			}
		}
		getAllBlogs();
	}, [config?.NEXT_PUBLIC_SERVER_URL]);

	useEffect(() => {
		const loadDetailSchema = async () => {
			const context = blogResponse?.blogs?.map((item) => {
				return {
					"@context": "https://schema.org",
					"@type": "BlogPosting",
					name: config?.NEXT_PUBLIC_TITLE_NAME,
					url: `${config?.NEXT_PUBLIC_CLIENT_URL}/blog/${item?.slug}`,
					datePublished: new Date(item?.createdAt)?.toDateString(),
					mainEntityOfPage: {
						"@type": "WebPage",
						"@id": `${config?.NEXT_PUBLIC_CLIENT_URL}/blog/${item?.slug}`,
					},
					headline: item?.title,
					image: [
						config?.NEXT_PUBLIC_SERVER_URL + item?.thumbnail,
					],
					keywords: item?.tags,
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
			script.id = "blog";
			document.head.appendChild(script);
		};

		loadDetailSchema();

		return () => {
			// Clean up script when component unmounts
			const schemaScript = document.querySelector('script[id="blog"]');
			if (schemaScript) {
				schemaScript.remove();
			}
		};
	}, [blogResponse?.blogs]);

	const renderSearchSection = () => {
		return (
			<div className=" items-center">
				<div className=" flex items-center gap-2">
					<input
						type="search"
						placeholder="Search here!!!"
						onChange={(e) => setValue(e.target.value)}
						value={value}
						className=" py-3 bg-light border border-main px-2  outline-none rounded-xl"
					/>
					<ButtonCircle size="w-14 h-14">
						<i className="las la-search text-2xl"></i>
					</ButtonCircle>
				</div>
			</div>
		);
	};

	const renderMappingCard = (item: Blog, index: number) => {
		return (
			<div className=" mt-2 bg-neutral-50 dark:bg-neutral-800 shadow p-3 rounded-3xl cursor-pointer">
				<div className=" relative">
					<div className="overflow-hidden rounded-t-3xl rounded-b-md">
						<Image
							className="hover:scale-110 object-cover  h-[14em] lg:[14em] w-full transition-all duration-500 cursor-pointer"
							src={
								config?.NEXT_PUBLIC_SERVER_URL +
								item?.thumbnail
							}
							alt="blog"
							width={200}
							height={100}
						/>
					</div>
					<div className="px-3 space-y-3 pb-5 pt-3 text-darktext">
						<div className="font-semibold">{item?.title} </div>
						<div className="flex space-x-2 items-center justify-between">
							<span className="">
								<i className="text-bluetrans font-light text-sm ">
									{item?.createdAt?.toString()?.slice(0, 10)}
								</i>
							</span>
							<span className="">
								<button className="bg-lightblue px-2 text-xs text-light py-1 rounded-md capitalize">
									{item?.category?.categoryName}
								</button>
							</span>
						</div>

						<div className="text-sm text-text leading-relaxed">
							<div
								dangerouslySetInnerHTML={{ __html: item?.body }}
								className=" space-y-2 line-clamp-6"
							></div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const loadingComponent = () => {
		return (
			<div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
				{Array.from({ length: 3 }).map((data, index) => (
					<div
						key={index}
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
					</div>
				))}
			</div>
		);
	};

	return (
		<>
			<div className="mb-3">
				<MobileMainNav />
			</div>
			<div className="lg:max-w-screen-xl lg:mx-auto lg:py-14 py-3 p-5">
				{renderSearchSection()}
				{!isLoading ? (
					<div className="mt-5">
						<div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
							{filteredData?.map((item, index) => (
								<Link
									key={item?.slug}
									href={
										`${thisPathname}/${item?.slug}` as Route
									}
								>
									{renderMappingCard(item, index)}
								</Link>
							))}
						</div>
					</div>
				) : (
					loadingComponent()
				)}
			</div>
		</>
	);
};

export default BlogLandingPage;
