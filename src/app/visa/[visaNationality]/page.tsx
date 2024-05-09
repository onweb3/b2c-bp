import { Metadata, ResolvingMetadata } from "next";
import { SeoCall } from "@/app/SEOapi";
import ListVisaDetailPage from "./VisaDetails";

export interface ListingVisaDetailPageProps {
	params: { visaNationality: string };
	searchParams: { [key: string]: string };
}

export async function generateMetadata(
	{ params, searchParams }: ListingVisaDetailPageProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const { nationality } = searchParams;

	const data = await SeoCall({
		type: "products",
		name: "visa",
		slug: nationality,
	});

	const title = (await parent).title;
	const description = (await parent).description;
	const keywords = (await parent).keywords;

	return {
		title: data?.title ? data?.title : title,
		description: data?.description ? data?.description : description,
		keywords: data?.keywords ? data?.keywords : keywords,
		openGraph: {
			title: data?.title ? data?.title : title,
			description: data?.description ? data?.description : description,
		},
	};
}

function ListingVisaDetailPage<ListingVisaDetailPageProps>({
	params,
}: {
	params: { visaNationality: string };
}) {
	return <ListVisaDetailPage />;
}

export default ListingVisaDetailPage;
