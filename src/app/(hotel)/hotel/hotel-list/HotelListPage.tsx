"use client";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";
import SectionGridFilterCard from "@/app/(real-estate-listings)/SectionGridFilterCard";
import { FiltersType } from "@/data/attraction/types";

export default function HotelListPage(): React.ReactElement {
	const [filters, setFilters] = useState<FiltersType>({
		skip: 0,
		limit: 12,
		category: [],
		rating: [],
		duration: [],
		priceFrom: 100,
		priceTo: 9000,
		hasMore: false,
	});

	return (
		<div className="container relative">
			<SectionGridFilterCard
				filters={filters}
				setFilters={setFilters}
				className="py-12 lg:py-12"
			/>
		</div>
	);
}
