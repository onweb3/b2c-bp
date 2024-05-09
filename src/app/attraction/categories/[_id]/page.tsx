"use client"

import { FiltersType } from '@/data/attraction/types';
import React, { FC, useEffect, useState } from 'react'
import SectionGridFilterCard from '@/components/SectionGridFilterCard';
import ExperiencesCard from '@/components/Attraction/ExperiencesCard';
import MobileMainNav from '@/app/(client-components)/(Header)/MobileMainNav';
import ComponentLoader from '@/components/loader/ComponentLoader';
import { useAppSelector } from '@/redux/store';

export interface AttractionListingPageProps {
    attractions: string;
}

interface ResponsesProps {
    attractions: {
        data: any[]
    }
}
const AttractionCategory= () => {
    const { config } = useAppSelector((state) => state.initials)
    const [responses, setResponses] = useState<ResponsesProps | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [id, setId] = useState("")

    useEffect(() => {
        const currentUrl = window.location.pathname;
        const parts = currentUrl.split("/");
        const id = parts[parts.length - 1];
        setId(id)
    },[])
    
    // const [filters, setFilters] = useState<FiltersType>({
    //     skip: 0,
    //     limit: 10000,
    //     category: [],
    //     rating: [],
    //     duration: [],
    //     priceFrom: 100,
    //     priceTo: 9000,
    //     hasMore: false
    // });

    const findAttractions = async (id: string) => {
        setResponses(null)
        try {
            setIsLoading(true)
            const attraction = await fetch(
                `${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/all?categories=[${JSON.stringify(id)}]`
            );
            return attraction.json();
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    };



    async function getAllAttractions(id: string) {
        try {
            const response = await findAttractions(id);
            setResponses(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        {
            id && (
                getAllAttractions(id)
            )
        }
    }, [id]);

    

    return (
        <div>
            <div className='mb-5'>
                <MobileMainNav />
            </div>
            <div className="container relative">

                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4">
                    {responses?.attractions?.data.map((attraction: any, index: number) => (
                        <ExperiencesCard size='small' data={attraction} key={attraction.id} />
                    ))}
                </div>

                {!responses && (
                    <>
                    <div className='flex flex-col gap-3'>
                    <ComponentLoader />
                    <ComponentLoader />
                    <ComponentLoader />
                    </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default AttractionCategory