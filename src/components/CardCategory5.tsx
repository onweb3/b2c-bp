import React, { FC } from "react";
import { TaxonomyType } from "@/data/types";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Link from "next/link";
import Image from "next/image";
import { InitialAttractionDestiantions } from "@/data/general/types";
import { useAppSelector } from "@/redux/store";

export interface CardCategory5Props {
  className?: string;
  taxonomy: InitialAttractionDestiantions;
}

const CardCategory5: FC<CardCategory5Props> = ({
  className = "",
  taxonomy,
}) => {
  const { config } = useAppSelector((state) => state.initials);
  const { name, image } = taxonomy;
  return (
    <Link
      href={`/${name}`}
      className={`nc-CardCategory5 flex flex-col ${className}`}
      data-nc-id="CardCategory5"
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group`}
      >
        <Image
          fill
          alt=""
          src={image ? `${config?.NEXT_PUBLIC_CDN_URL + image}` : ""}
          className="object-cover w-full h-full rounded-2xl"
          sizes="(max-width: 400px) 100vw, 400px"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 px-3 truncate">
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate capitalize`}
        >
          {name}
        </h2>
        {/* <span
          className={`block mt-2 text-sm text-neutral-6000 dark:text-neutral-400`}
        >
          {convertNumbThousand(count)} properties
        </span> */}
      </div>
    </Link>
  );
};

export default CardCategory5;
