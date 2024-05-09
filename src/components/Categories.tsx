import { useAppSelector } from '@/redux/store';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface CategoriesProps {
    categoryName: string;
}

function Categories() {
    const [categories, setCategories] = useState<CategoriesProps[]>();
    const [showModal, setShowModal] = useState(false);
    const { config } = useAppSelector((state) => state.initials);

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
    <div>
         {categories && categories?.length > 0 && (
            <div className="md:flex md:flex-wrap hidden justify-center gap-5">
              {categories?.slice(1, 8).map((category: any, index: number) => (
                <div
                  key={index}
                  onClick={() =>
                    window.open(
                      `/attraction/categories/${category.slug}`,
                      "_blank"
                    )
                  }
                  className="flex flex-col cursor-pointer justify-center border rounded-xl py-5 px-7 items-center mb-3 border-neutral-300 pb-2"
                >
                  <div className="max-h-[40px] mb-5 max-w-[45px]">
                    <Image
                      alt="categories icon"
                      width={100}
                      height={100}
                      src={config?.NEXT_PUBLIC_CDN_URL + category?.icon}
                    />
                  </div>
                  <p className="text-neutral-900 font-semibold dark:text-neutral-300 text-sm capitalize">
                    {category?.categoryName}
                  </p>
                </div>
              ))}
              <div
                onClick={() => setShowModal(true)}
                className="flex flex-col text-gray-300 hover:text-gray-500 cursor-pointer justify-center border rounded-xl p-5 items-center mb-3 border-neutral-300 pb-2"
              >
                <div className="mb-5 ">
                  <SparklesIcon width={40} height={40} />
                </div>
                <p className="text-neutral-900 font-semibold dark:text-neutral-300 text-sm">
                  All Categories
                </p>
              </div>

              {showModal === true && (
                <div className="fixed w-full h-full z-50 left-0 top-0 backdrop-blur-xl bg-opacity-30 bg-black">
                  <div className="flex w-full justify-center">
                    <div className="bg-white md:mt-[80px] dark:bg-neutral-800 mt-[120px] m-5 md:m-0 md:min-w-[500px]  md:max-w-[600px] p-2 text-center  md:max-h-[550px] max-h-[400px]  overflow-x-auto py-5 rounded-xl shadow-2xl">
                      {" "}
                      <div>
                        <div className="border-b mb-5 flex justify-between items-center text-center">
                          <h2 className="text-center self-center mt-2 text-lg pb-3 font-semibold pl-4">
                            All Categories
                          </h2>
                          <div
                            onClick={() => setShowModal(false)}
                            className=" dark:bg-neutral-800 cursor-pointer"
                          >
                            <XMarkIcon height={40} width={40} />
                          </div>
                        </div>
                        <div className="grid grid-cols-3">
                          {categories?.map((category: any, index: number) => (
                            <div
                              onClick={() =>
                                window.open(
                                  `/attraction/categories/${category.slug}`,
                                  "_blank"
                                )
                              }
                              className="flex hover:bg-gray-200 p-2 rounded-lg flex-col cursor-pointer justify-center items-center mb-3 border-neutral-300 pb-2"
                            >
                              <div className="max-h-[40px] mb-5 max-w-[45px]">
                                <Image
                                  alt="categories icon"
                                  width={100}
                                  height={100}
                                  src={
                                    config?.NEXT_PUBLIC_CDN_URL +
                                    category?.icon
                                  }
                                />
                              </div>
                              <p className="text-neutral-900 font-semibold dark:text-neutral-300 text-sm capitalize">
                                {category?.categoryName}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

    </div>
  )
}

export default Categories