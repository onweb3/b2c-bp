"use client";

import React, { FC, useEffect, useState } from "react";
import Logo from "@/shared/Logo";
import Navigation from "@/shared/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "@/shared/ButtonPrimary";
import MenuBar from "@/shared/MenuBar";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import HeroSearchForm2MobileFactory from "../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";
import LangDropdown from "./LangDropdown";
import CurrencySelector from "@/shared/CurrencySelector";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "@/redux/store";
import Avatar from "@/shared/Avatar";
import { useRouter } from "next/navigation";
import { Route } from "next";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Cart from "./Cart";
import { PhoneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export interface MainNav1Props {
  className?: string;
}

const MobileMainNav: FC<MainNav1Props> = ({ className = "" }) => {
  const router = useRouter();
  const { user, jwtToken } = useSelector(
    (state: RootState) => state.users
  );
  const { config } = useAppSelector((state) => state.initials)
  const isBrowser = typeof window !== 'undefined';


    // Add state to track scroll position
    const [isTop, setIsTop] = useState(true);

    // Add event listener to update state on scroll
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsTop(scrollPosition === 0);
      };
  
      if (isBrowser) {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }
    }, [isBrowser]);

    


  return (
    <div className={`nc-MainNav1 ${isTop ? 'hidden' : ''} fixed top-0 dark:bg-[#1f2836] bg-white flx flex-col justify-center w-full  md:hidden block z-50 ${className}`}>
      <div className="px-4 lg:container h-16 relative flex justify-between gap-3">
        <div className="flex justify-left md:justify-start">
          <Logo imgClassName="border rounded-xl" imgLight={config?.NEXT_PUBLIC_COMPANY_FAVICON} img={config?.NEXT_PUBLIC_COMPANY_FAVICON} className={`w-12 self-center`} />
        </div>

     
        <div className={`flex  md:hidden flex-[3] max-w-lg !mx-auto md:px-3`}>
        <div className="self-center flex-1">
          <HeroSearchForm2MobileFactory />
        </div>
      </div>
        
      </div>
    
    </div>
  );
};

export default MobileMainNav;
