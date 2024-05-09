import React from "react";
import TourDetails from "./TourDeatils";

import { Metadata, ResolvingMetadata } from "next";
import { SeoCall } from "@/app/SEOapi";

export interface TourDetalPageProps {
	params: { slug: string };
}

export async function generateMetadata(
	{ params }: TourDetalPageProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { slug } = params;
	const data = await SeoCall({
		type: "product",
		name: "tours",
		slug: slug, // Access the global slug variable here
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

export default function TourPageDetails({
	params,
}: {
	params: { slug: string };
}) {
	return <TourDetails slug={params.slug} />;
}
