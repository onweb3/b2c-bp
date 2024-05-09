"use client"

import { FiltersType } from '@/data/attraction/types';
import React, { FC, useEffect, useState } from 'react'
import SectionGridFilterCard from '../SectionGridFilterCard';
import SectionHeroArchivePage from '@/app/(server-components)/SectionHeroArchivePage';
import { useAppSelector } from '@/redux/store';

export interface AttractionListingPageProps {
    attractions: string
}

const AttractionListing: FC<AttractionListingPageProps> = ({
    attractions,
}) => {


    const [responses, setResponses] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { config } = useAppSelector((state) => state.initials)

    const [filters, setFilters] = useState<FiltersType>({
        skip: 0,
        limit: 10000,
        category: [],
        rating: [],
        duration: [],
        priceFrom: 0,
        priceTo: 9000,
        hasMore: false
    });


    const findAttractions = async (destination: string) => {
        try {
            setIsLoading(true)
            const attraction = await fetch(
                `${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/all?limit=${filters?.limit}&skip=${filters?.skip}&destination=${destination}&categories=${JSON.stringify(filters.category)}&ratings=${JSON.stringify(filters.rating)}&durations=${JSON.stringify(filters.duration)}&priceFrom=${JSON.stringify(filters.priceFrom)}&priceTo=${JSON.stringify(filters.priceTo)}`
            );
            return attraction.json();
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    };

    useEffect(() => {
        findAttractions(attractions).then(setResponses).then(() => {
            setIsLoading(false)
        }).catch(() => {
            setIsLoading(false)
        })
    }, [attractions, filters]);
    
    return (
        <div>
            {/* <SectionHeroArchivePage
               currentPage="Experiences"
               currentTab="Experiences"
               className="hidden md:block lg:block pt-10 lg:pt-16 lg:pb-16 "
            /> */}
            <div className="container relative">
                <SectionGridFilterCard
                    data={responses ? responses : undefined}
                    params={attractions}
                    filters={filters}
                    setFilters={setFilters}
                    isLoading={isLoading}
                    className="pb-20 lg:pb-24"
                />
            </div>
        </div>
    )
}

export default AttractionListing