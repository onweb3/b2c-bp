"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

export interface FaqProps {
	ele: {
		question: string;
		answer: string;
	};
	index: number;
}
const ShowFaqs: React.FC<FaqProps> = ({ ele, index }) => {
	const [faqs, setFaqs] = useState(false);

	return (
		<div key={index} className="">
			<div
				className={`p-5 ${index !== 0 ? "border-t" : ""} `}
				onClick={() => {
					setFaqs(!faqs);
				}}
			>
				<div
					className={`flex justify-between ${
						faqs ? "font-bold" : ""
					} text-lg`}
				>
					<h1>{ele?.question}</h1>
					{faqs ? (
						<h1 className="text-2xl">
							<MdKeyboardArrowDown />
						</h1>
					) : (
						<h1 className="text-2xl">
							<MdKeyboardArrowRight />
						</h1>
					)}
				</div>
				{faqs ? (
					<div className="pt-3">
						<h1>{ele?.answer}</h1>
						{index === 3 ? (
							<ul className="pt-3 list-disc ml-7">
								<li>
									If the refunded amount is less than the
									remaining payments, then the remaining
									payments will be adjusted against
									accordingly.
								</li>
								<li>
									If the refunded amount is more than the
									remaining payments, then the remaining
									payments will be cancelled and the rest will
									be refunded.
								</li>
							</ul>
						) : (
							""
						)}
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default ShowFaqs;
