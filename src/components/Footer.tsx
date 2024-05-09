"use client";

import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import FooterNav from "./FooterNav";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Footer: React.FC = () => {
	const { globalData, config } = useSelector((state: RootState) => state.initials);

	return (
		<>
			<FooterNav />

			<div className="nc-Footer relative pb-28 md:pb-0 pt-5 md:pt-0 lg:py-16 border-t border-neutral-200 dark:border-neutral-700">
				<div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
					<div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
						<div className="col-span-2 md:col-span-1">
							<Logo
								imgLight={config?.NEXT_PUBLIC_COMPANY_LOGO}
								img={config?.NEXT_PUBLIC_COMPANY_LOGO}
							/>
						</div>
						<div className="col-span-2 flex items-center md:col-span-3">
							<SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
						</div>
					</div>
					{globalData.home &&
						globalData.home?.footer &&
						globalData.home?.footer?.map((ele, index) => {
							return (
								<div key={index} className="text-sm">
									<h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
										{ele.title}
									</h2>
									<ul className="mt-5 space-y-4">
										{ele.navLinks.map((item, index) => (
											<li key={index}>
												<a
													key={index}
													className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
													href={item?.link}
												>
													{item?.name}
												</a>
											</li>
										))}
									</ul>
								</div>
							);
						})}
				</div>
				<div className="container py-3 text-[10px] leading-tight text-center">
					<p className="pb-1 ">
						Disclaimer <i className="las la-info-circle"></i>
					</p>
					License No. 671267 The logos, images, and other visual
					content displayed on our Website are used for informational
					and illustrative purposes only. These images may include,
					but are not limited to, logos of various travel agencies,
					hotels, airlines, and destination logos. Please note that
					these logos and images may be the property of third parties,
					such as businesses, organizations, or government entities,
					and are subject to copyright and trademark protections. The
					Google logo and Play Store logo are the intellectual
					property of Google LLC. These logos are protected by
					copyright and trademark laws. Google's terms of use and
					branding guidelines apply to the use of their logos.
				</div>
			</div>
		</>
	);
};

export default Footer;
