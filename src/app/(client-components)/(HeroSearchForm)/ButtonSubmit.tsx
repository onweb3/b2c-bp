import { setNavigation } from "@/redux/features/affiliatesSlice";
import { RootState } from "@/redux/store";
import { PathName } from "@/routers/types";
import Link from "next/link";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  href?: PathName;
}

const ButtonSubmit: FC<Props> = ({ href = "/listing-stay-map" }) => {
  const dispatch = useDispatch()
  const { navigated } = useSelector((state: RootState) => state.affiliateUsers);
  return (
    <Link
      href={href as any}
      type="button"
      onClick={() => dispatch(setNavigation({navigated: !navigated}))}
      className="h-14 w-14 md:h-16  md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"
    >
      <span className="mr-3 hidden">Search</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </Link>
  );
};

export default ButtonSubmit;
