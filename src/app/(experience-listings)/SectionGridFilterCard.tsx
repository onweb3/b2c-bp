import React, { FC, useEffect, useMemo, useState } from "react";
import { Pagination } from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import ExperiencesCard from "@/components/Attraction/ExperiencesCard";
import { FiltersType, SearchByDestination } from "@/data/attraction/types";
import { UUID } from "crypto";
import ComponentLoader from "@/components/loader/ComponentLoader";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "@/redux/store";
import { InitialAttractionDestiantions } from "@/data/general/types";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import Categories from "@/components/Categories";

interface ResponseData {
  attractions: {
    _id: UUID | string | null;
    totalAttractions: number;
    data: SearchByDestination[];
  };
  skip: number;
  limit: number;
}

export interface SectionGridFilterCardProps {
  className?: string;
  data?: ResponseData;
  params?: string;
  filters?: FiltersType;
  setFilters?: (newFilters: FiltersType) => void;
  isLoading?: boolean;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data,
  params,
  filters,
  setFilters,
  isLoading = true,
}) => {
  const [isLoadings, setIsLoadings] = useState<boolean>(true);

  const { config } = useAppSelector((state) => state.initials)

    
  useEffect(() => {
    setIsLoadings(isLoading);
  }, [isLoading]);

  return (
    <div className={`nc-SectionGridFilterCard ${className}`}>
      {params !== "dubai" && (
      <Heading2
				className="capitalize mt-5"
				heading={
					params &&
					`Experiences in ${params
						?.replaceAll("-", " ")
						?.replaceAll("%20", " ")}`
				}
				subHeading={
					<span className=" block text-neutral-500 dark:text-neutral-400 mt-3">
						{data &&
							data?.attractions &&
							data?.attractions?.totalAttractions +
								" Attractions"}
					</span>
				}
			/>
      )}

   {params === "dubai" && (
      <div className="md:listingSection__wrap mt-5 border p-2 rounded-2xl md:mt-10 md:mb-10 mb-5">
        <div className="md:flex md:gap-5 items-center justify-center pb-3">
          <div className="rounded-full  md:block hidden md:h-[200px] h-[100px] md:w-[200px] w-[100px]">
            <Image
              src={`${
                config?.NEXT_PUBLIC_CDN_URL +
                "/public/images/destinations/image-1672982741618-547465184.jpg"
              }`}
              className="rounded-full md:block hidden h-full w-full shadow-xl"
              alt="places"
              height={1000}
              width={1000}
            />
          </div>
          <div className="md:w-[80%] w-[100%]">
            <h1 className="md:text-2xl text-lg font-bold">
              Discover Dubai: {data?.attractions.totalAttractions} Must-See Attractions and Experiences
            </h1>
            <p className="md:text-md text-xs font-thin">
              {" "}
              Uncover the charm and excitement of Dubai with our curated list of
              <span className="ml-1">{data?.attractions.totalAttractions}</span> top attractions and experiences. From iconic landmarks like the
              Burj Khalifa to thrilling desert safaris and luxurious shopping
              destinations, explore the best of Dubai and create unforgettable
              memories in this vibrant city.
            </p>
          </div>
        </div>
      </div>
      )}

  {params === "dubai" && (
	  <div className="mb-5 md:block hidden">
		<Categories />
	  </div>
  )}

      <div className="mb-8 lg:mb-11">
        <TabFilters setFilters={setFilters} filters={filters} />
      </div>

      {isLoadings ? (
        <div className="space-y-3">
          <ComponentLoader />
          <ComponentLoader />
          <ComponentLoader />
        </div>
      ) : (
        <>
          {data?.attractions?.data?.length ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4">
                {data &&
                  data.attractions?.data.map(
                    (attraction: SearchByDestination) => (
                      <ExperiencesCard
                        key={attraction._id}
                        data={attraction}
                        size="small"
                      />
                    )
                  )}
              </div>
              {/* {data && data.attractions?.totalAttractions && (
                <div className="flex mt-16 justify-center items-center">
                  <Pagination
                    limit={filters?.limit}
                    skip={filters?.skip}
                    total={data && data.attractions?.totalAttractions}
                    incOrDecSkip={(number) => {
                      if (setFilters && filters) { // Check if setFilters is defined
                        setFilters({
                          ...filters,
                          skip: filters.skip + number,
                        }
                        )
                      }
                    }}

                    updateSkip={(skip: number) => {
                      if (setFilters && filters) { // Check if setFilters is defined
                        setFilters({
                          ...filters,
                          skip: Number(skip),
                        });
                      }
                    }}
                  />
                </div>
              )} */}
            </>
          ) : (
            <>
              <div className="w-full flex justify-start h-full items-center ">
                <p className="font-mono text-lg tracking-wide text-gray-500">
                  Sorry! No attraction found for this query.
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SectionGridFilterCard;
