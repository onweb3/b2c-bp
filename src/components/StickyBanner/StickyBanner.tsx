import { useAppSelector } from "@/redux/store";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Route } from "next";
import React, { useState } from "react";

function StickyBanner() {
  const { config } = useAppSelector((state) => state.initials);
    const [rendering, setRendering] = useState(true);
  return (
    <>
    {rendering === true && (
    <div className="sticky md:hidden block bottom-0 dark:bg-[#1f2836] rounded-2xl mb-3 border p-4 bg-white">
        <div onClick={() => setRendering(false)} className="flex justify-end">
        <XMarkIcon width={24} height={24} className="" />
        </div>
       <p className="mb-1">Explore the world with <span className="font-semibold">MyTravellersChoice</span> app! 🌍 Download now for exclusive travel deals and seamless booking experiences.</p>
       <ButtonPrimary href={config?.NEXT_PUBLIC_PLAYSTORE_URL as Route} className="w-full">Download Now</ButtonPrimary>
    </div>
    )}
    </>
  );
}

export default StickyBanner;
