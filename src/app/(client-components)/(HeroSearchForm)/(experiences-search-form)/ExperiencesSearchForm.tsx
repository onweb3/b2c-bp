import React, { FC, useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import GuestsInput from "../GuestsInput";
import { Route } from "next";
import { useAppSelector } from "@/redux/store";

export interface ExperiencesSearchFormProps {
  closeModal?: () => void
}


const ExperiencesSearchForm: FC<ExperiencesSearchFormProps> = ({ closeModal }) => {
  const [query, setQuery] = useState<string>("")
  const [destination, setDestination] = useState<string>("")
  const [response, setResponse] = useState({})
  const { config } = useAppSelector((state) => state.initials)


  useEffect(() => {
    const findAttractionQuery = async (queries: string) => {
      try {
        const query = await fetch(`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/search/list?search=${queries}`, { cache: 'no-store' })
        setResponse(await query.json())
  
      } catch (error) {
        console.log(error);
 
      }
    }

    findAttractionQuery(query)

  }, [query])


  const renderForm = () => {
    return (
      <form className="md:w-[90%]  flex justify-center items-center text-center relative mt-8 md:flex-row rounded-3xl md:rounded-full md:shadow-xl dark:shadow-2xl md:bg-white dark:bg-neutral-800 ">
        <LocationInput closeModal={closeModal} data={response} setQuery={setQuery} setDestination={setDestination} className="flex-[1.5]" />
        {/* <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div> */}
        {/* <ExperiencesDateSingleInput className="flex-1" /> */}
        {/* <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div> */}
        {/* <GuestsInput
          className="flex-1"
          buttonSubmitHref={destination ? `/${destination}/${query}` as Route : `/${query}` as Route}
        /> */}
      </form>
    );
  };

  return renderForm();
};

export default ExperiencesSearchForm;
