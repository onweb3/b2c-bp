import React, { useState } from "react";
import ShowFaqs from "./ShowFaqs";

function TabbyLandingPage() {
	const faqsData = [
		{
			question: "Who can use Tabby?",
			answer: "Any resident of the UAE, KSA, Qatar, Bahrain and Kuwait that's over the age of 18 can use Tabby.",
		},
		{
			question: "How much can I spend with Tabby?",
			answer: "To keep shopping safe, spending limits are based on a number of factors including the type of products you're buying, the store you're buying from and your history with Tabby.",
		},
		{
			question: "Is Tabby free to use?",
			answer: "It is! Tabby does not charge interest or fees for any payments that are made on time.",
		},
		{
			question: "How do refunds work with Tabby?",
			answer: "All refunds will be issued according to the store’s policy for returns and cancellations. Once the store has registered your return or cancellation with tabby, your refund will be processed. Here’s what you can expect with your refund:",
		},
	];

	return (
		<div>
			<div className="py-10 px-44">
				<section>
					<div className="grid md:grid-cols-2 justify-between items-center">
						<div className="">
							<div className="w-32 h-20">
								<img
									src="/public/tabbyLandingPage/tabby-logo-charcoal.png"
									alt="asdf"
								/>
							</div>
							<div className="pt-10">
								<h1 className="text-7xl font-bold w-[800px]">
									Shop now. Pay later with tabby.
								</h1>
							</div>
							<div className="pt-3">
								<h1 className="w-[500px]">
									We've partnered with Tabby to bring you a
									more rewarding way to shop. Tabby lets you
									split your purchases into 4 interest-free
									payments with no fees.
								</h1>
							</div>
						</div>
						<div className="w-full h-full">
							<img
								className="w-full h-full object-fill"
								src="/public/tabbyLandingPage/Hero-Banner-EN.png"
								alt=""
							/>
						</div>
					</div>
				</section>

				<section>
					<div className="pt-20">
						<div>
							<div className="mb-10">
								<h1 className="text-3xl font-bold">
									Here's how it works
								</h1>
							</div>
							<div className="grid md:grid-cols-3 gap-32">
								<div>
									<img
										src="/public/tabbyLandingPage/Howitworks-EN-1.png"
										alt=""
									/>
									<div className="pt-3">
										<h1 className="text-lg font-bold">
											{" "}
											Step One
										</h1>
									</div>
									<div className="pt-2">
										<div className="flex gap-2">
											<div>
												<p className=" text-lg">
													Choose
												</p>
											</div>
											<div className="w-16 h-16">
												<img
													src="/public/tabbyLandingPage/tabby-badge.png"
													alt=""
												/>
											</div>
											<div>
												<p className=" text-lg">
													at checkout.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div>
									<img
										src="/public/tabbyLandingPage/Howitworks-EN-2.png"
										alt=""
									/>
									<div className="pt-3">
										<h1 className="text-lg font-bold">
											{" "}
											Step Two
										</h1>
									</div>
									<div>
										<p className="w-80">
											Link any debit or credit card and
											get instant approval.
										</p>
									</div>
								</div>
								<div>
									<img
										src="/public/tabbyLandingPage/Howitworks-EN-3.png"
										alt=""
									/>
									<div className="pt-3">
										<h1 className="text-lg font-bold">
											{" "}
											Step Three
										</h1>
									</div>
									<div>
										<p className="w-[360px]">
											Complete checkout and tabby will
											remind you when it's time to pay.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section>
					<div className="pt-20">
						<div className="grid md:grid-cols-2  ">
							<div className="">
								<h1 className="text-3xl font-bold">
									Making upcoming payments
								</h1>
								<div className="pt-5">
									<p className="w-[590px] text-lg">
										The best way to track your purchases and
										upcoming bills is by getting the tabby
										app.
									</p>
								</div>
								<div className="pt-5">
									<p className="w-[500px] text-lg">
										When you use Visa and Mastercard cards
										to shop with Tabby, your payments are
										automatically charged.
									</p>
								</div>
								<div className="pt-5">
									<p className="text-lg">
										If you paid with a{" "}
										<strong>MADA card,</strong> please
										follow the steps below:
									</p>
								</div>
								<div className="pt-5">
									<ul className="text-lg">
										<li className="pt-1">
											1. Log in to the app or tabby.ai
										</li>
										<li className="pt-1">
											2. Select the ‘My Payments’ tab
										</li>
										<li className="w-[570px] pt-1">
											3. Choose the order you want to pay
											for and follow the steps to make
											your payment
										</li>
									</ul>
								</div>
								<div className="pt-8">
									<div className="flex gap-1">
										<div>
											<a href="https://tabby.onelink.me/J7ue/5b94fa1">
												<img
													src="/public/tabbyLandingPage/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg"
													alt=""
												/>
											</a>
										</div>
										<div>
											<a href="https://tabby.onelink.me/J7ue/5b94fa1">
												<img
													src="/public/tabbyLandingPage/android.svg"
													alt=""
												/>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="w-full">
								<img
									className="w-full h-[500px] object-cover"
									src="/public/tabbyLandingPage/Upcoming-Payments-Banner-EN.png"
									alt=""
								/>
							</div>
						</div>
					</div>
				</section>

				<section>
					<div className="pt-20">
						<div>
							<h1 className="font-bold text-3xl">
								{" "}
								Frequently asked questions
							</h1>
						</div>
						<div className="pt-5 p-5">
							{faqsData?.map((ele, index) => (
								<ShowFaqs ele={ele} index={index} />
							))}
						</div>
						<div className="pt-5">
							<p className="lg:text-2xl">
								Visit{" "}
								<a
									className="text-blue-600"
									href="https://helpcenter.tabby.ai/hc/en-us/"
									target="_blank"
								>
									tabby's help center
								</a>{" "}
								to find out more.
							</p>
						</div>
					</div>
				</section>

				<section>
					<div className="pt-20">
						<div>
							<h1 className="font-bold text-3xl">About Tabby</h1>
						</div>
						<div className="pt-5">
							<p className="w-[900px]">
								Tabby empowers you with the flexibility and
								freedom to choose how and when to pay for the
								things you love. Tabby lets you to shop now, pay
								later and earn cash – without the interest, fees
								or debt traps.
							</p>
							<div className="pt-4">
								<p>
									Tabby is licensed by the Saudi Central Bank,
									Shari’ah-compliant and PCI DSS certified.{" "}
									<a
										className="text-blue-600"
										href="https://tabby.ai/en-AE"
									>
										Learn more about tabby.
									</a>
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

export default TabbyLandingPage;
