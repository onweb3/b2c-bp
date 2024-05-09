import Image from "next/image";
import React from "react";

export interface PaymentPartnerProps {}

interface PaymentsDataInterface {
	id: number;
	imageUrl: string;
	name: string;
}

const paymentData: PaymentsDataInterface[] = [
	{
		id: 1,
		imageUrl: "https://www.ccavenue.com/images_mcpg/iso_logo_footer.jpg",
		name: "",
	},
	{
		id: 2,
		imageUrl: "https://www.ccavenue.com/images_mcpg/pci_logo_footer.png",
		name: "",
	},
	{
		id: 3,
		imageUrl:
			"https://www.ccavenue.com/images_mcpg/digicert_geotrust_logo_footer.jpg",
		name: "",
	},
	{
		id: 4,
		imageUrl: "https://www.ccavenue.com/images_mcpg/digitalindia.png",
		name: "",
	},
	{
		id: 5,
		imageUrl:
			"https://www.ccavenue.com/images_mcpg/mastercard_logo_footer.jpg",
		name: "",
	},
	{
		id: 6,
		imageUrl: "https://www.ccavenue.com/images_mcpg/visa_logo_footer.jpg",
		name: "",
	},
	{
		id: 7,
		imageUrl:
			"https://www.ccavenue.com/images_mcpg/american_exp_footer.jpg",
		name: "",
	},
	{
		id: 8,
		imageUrl: "https://www.ccavenue.com/images_mcpg/rupay_logo_footer.jpg",
		name: "",
	},
	{
		id: 10,
		imageUrl: "https://www.ccavenue.com/images_mcpg/jcb_logo_footer.jpg",
		name: "",
	},
	{
		id: 11,
		imageUrl:
			"https://2817548791-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FX4TmIyMsX35rbmwHL104%2Fuploads%2Fp05EY2T7FrCuqylQdmJ0%2Ftabby-badge.png?alt=media&token=2e18e518-fada-4353-8204-077cf52d3c91",
		name: "",
	},
];

const PaymentPartners: React.FC<PaymentPartnerProps> = () => {
	return (
		<div className="grid grid-cols-10 gap-2  place-items-center ">
			{paymentData?.map((image) => (
				<div key={image?.id} className="">
					<Image
						src={image?.imageUrl}
						alt="ccavenue"
						className="w-20 h-fit"
						width={300}
						height={300}
					/>
				</div>
			))}
		</div>
	);
};

export default PaymentPartners;
