"use client";

import React, { FC, Fragment, useEffect, useState } from "react";
import HeroSearchForm, { SearchTab } from "../(client-components)/(HeroSearchForm)/HeroSearchForm";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";
import MobileSearchForm from "../(client-components)/(HeroSearchForm2Mobile)/MobileSearchForm";
import ReactPlayer from "react-player";
import Logo from "@/shared/Logo";
import Lottie from "lottie-react";
import scrollDownAnimation from "@/animations/scrollDownAnimation.json"
import { Dialog, Tab, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useTimeoutFn } from "react-use";
import { useRouter } from "next/navigation";
import { Route } from "next";
import HeroSearchForm2MobileFactory from "../(client-components)/(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";
import MenuBar from "@/shared/MenuBar";
import { useAppSelector } from "@/redux/store";

export interface SectionHeroProps {
  className?: string;
  currentPage: "Stays" | "Experiences" | "Visa" | "Flights";
  currentTab: SearchTab;
}

interface CategoriesProps {
  categoryName: string;
}

const SectionMobileHero: FC<SectionHeroProps> = ({
  className = "",
  currentPage,
  currentTab,
}) => {

  const { config } = useAppSelector((state) => state.initials)

  const backgroundVideo = config?.NEXT_PUBLIC_BANNER_VIDEO;
  const mobileBackgroundVideo = config?.NEXT_PUBLIC_BANNER_VIDEO_MOBILE;
  const backgroundImage = config?.NEXT_PUBLIC_BANNER_IMAGE_MOBILE
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [categories, setCategories] = useState<CategoriesProps[]>();
  let [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);
  const route = useRouter();

  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }


  const fetchCategory = async () => {
    try {
      const nationality = await fetch(
        `${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/categories/all`
      );
      return nationality.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function getAllCategory() {
    try {
      const response = await fetchCategory();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);


  return (
    <div
      // style={{
      //   background: `url(${backgroundImage})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      // }}
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
    >


      <div className="md:hidden block">
        <Image src={backgroundImage || ""} fill alt="landing page banner" />
      </div>




      {/* <div className="absolute inset-0 bg-primary-6000/30" /> */}


      <div className=" container lg:mb-0 lg:mt-10 w-full">
        <div className=" flex w-full">
         <div className="absolute top-5">
          <Logo imgLight={config?.NEXT_PUBLIC_COMPANY_LOGO} img={config?.NEXT_PUBLIC_COMPANY_LOGO} className={`w-40 self-center`} />
         </div>
       <div className="absolute top-5 right-2">
       <MenuBar />
       </div>
     
        </div>

        <div className="sticky md:hidden -mt-[550px]">
          <MobileSearchForm />
          {categories && (
          <div className="bg-white dark:bg-[#1f2836] rounded-3xl p-4 -mt-[100px] shadow-2xl">
            <div className="grid grid-cols-3 text-center gap-2">
              {categories?.slice(1, 7).map((category: any, index: number) => (
                <div
                  onClick={() => route.push(`/attraction/categories/${category.slug}` as Route)}
                  className="flex flex-col justify-center items-center mb-3 border-b border-neutral-300 pb-2">
                  <div className="max-h-[20px] mb-5 max-w-[30px]">
                    <Image alt="categories icon" width={100} height={100} src={config?.NEXT_PUBLIC_CDN_URL + category?.icon} />
                  </div>
                  <p className="text-neutral-900 dark:text-neutral-300 text-sm capitalize">{category?.categoryName}</p>
                </div>
              ))}

            </div>
            <div
              onClick={() => setShowModal(true)}
              className="mt-2 flex bg-gray-200 dark:bg-[#1f2836] border rounded-xl p-2 justify-center items-center gap-3 w-full">
              {/* <FontAwesomeIcon icon={faMicrosoft} fontSize="20px" /> */}
              <p className="text-neutral-900 dark:text-neutral-300 text-sm">All Categories</p>
            </div>
          </div>
          )}

          <div className="w-full flex justify-center mt-[10px]">

            <div style={{ width: '40px', height: '100px' }} className="flex justify-center mt-3">
              <Lottie animationData={scrollDownAnimation} loop={true} width={50} height={50} />
            </div>
          </div>


          <Transition appear show={showModal} as={Fragment}>
            <Dialog
              as="div"
              className="HeroSearchFormMobile__Dialog relative z-max"
              onClose={closeModal}
            >
              <div className="fixed inset-0 top-[85px] rounded-t-3xl bg-neutral-100 dark:bg-neutral-900">
                <div className="flex h-full">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out transition-transform"
                    enterFrom="opacity-0 translate-y-52"
                    enterTo="opacity-100 translate-y-0"
                    leave="ease-in transition-transform"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-52"
                  >
                    <Dialog.Panel className="relative h-full overflow-hidden w-full">
                      {showDialog && (
                        <Tab.Group manual>
                          <div className="absolute flex justify-center w-full top-5">
                            <button className="" onClick={closeModal}>
                              <XMarkIcon className="w-7 h-7 text-black dark:text-white" />
                            </button>
                          </div>


                          <div className="mt-[50px] p-4 max-h-[550px] overflow-y-auto">
                            {categories?.map((category: any, index: number) => (
                              <div
                                onClick={() => route.push(`/attraction/categories/${category.slug}` as Route)}
                                className="flex gap-3 items-center mb-3 border-b border-neutral-300 pb-4">
                                <div className="max-h-[20px] mb-5 max-w-[40px]">
                                  <Image alt="categories icon" width={100} height={100} src={config?.NEXT_PUBLIC_CDN_URL + category?.icon} />
                                </div>                              
                                <p className="text-neutral-900 font-light dark:text-neutral-100 capitalize">{category?.categoryName}</p>
                                {/* <FontAwesomeIcon icon={faChevronRight} fontSize="10px" style={{ color: '#90074C' }} /> */}
                              </div>
                            ))}
                          </div>


                        </Tab.Group>
                      )}
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>


        </div>

      </div>
    </div>
  );
};

export default SectionMobileHero;
