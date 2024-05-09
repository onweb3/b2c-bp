import React, { FC } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import { Pagination } from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import HotelCardH from "@/components/PropertyCardH";
import { FiltersType } from "@/data/attraction/types";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
  filters?: FiltersType
  setFilters?: (newFilters: FiltersType) => void;
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = DEMO_DATA,
  filters,
  setFilters,
}) => {
  return (
    <div className={`nc-SectionGridFilterCard ${className}`}>
      <Heading2
        heading="Hotels in Dubai"
        subHeading={
          <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
            233 Hotels
            <span className="mx-2">·</span>
            Feb 12 - 18
          </span>
        }
      />

      <div className="mb-8 lg:mb-11">
        <TabFilters filters={filters} setFilters={setFilters} />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2 ">
        {data.map((stay) => (
          <HotelCardH key={stay.id} data={stay} />
        ))}
      </div>
      {/* <div className="flex mt-16 justify-center items-center">
        <Pagination />
      </div> */}
    </div>
  );
};

export default SectionGridFilterCard;
