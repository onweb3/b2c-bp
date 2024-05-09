import { FC } from "react";
import ContactusPage from "./ContactusPage";
import { Metadata, ResolvingMetadata } from "next";

export interface PageContactProps {}

export async function generateMetadata(
	_params: any, // Removed the parameter since it's not needed
	parent: ResolvingMetadata
): Promise<Metadata> {
	
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/initial/b2c`,
		{ method: "GET", cache: "no-store" }
	);
	const config = await response.json();

	return {
		title: `Contact Us - Reach Out Easily | ${config?.data?.NEXT_PUBLIC_TITLE_SHORT_NAME}`,
		description: `Get your queries resolved with the best Tour solutions and ideas. Drop us a message and we will respond in no time!  And Now Our services are now.`,
		keywords: [
			"travel agency in dubai",
			"Contact Us - Providing Brilliant Ideas for Your Tour",
			"contact us",
			"tourism company in dubai",
			"best travel company in dubai",
			"tour agency",
			"travel and tours",
			"travels in dubai",
			"tour and travel agency",
			"travel agency dubai",
			"travel agency uae",
		],
		openGraph: {
			title: `Contact Us - Reach Out Easily | ${config?.NEXT_PUBLIC_TITLE_SHORT_NAME}`,
			description: `Get your queries resolved with the best Tour solutions and ideas. Drop us a message and we will respond in no time!  And Now Our services are now.`,
		},
	};
}

const PageContact: FC<PageContactProps> = ({}) => {
	return <ContactusPage />;
};

export default PageContact;
