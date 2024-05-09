import React, { FC, useEffect, useState } from "react";
import GuestsInput from "../GuestsInput";
import { Route } from "next";
import TourInput from "../TourInput";
import { useAppSelector } from "@/redux/store";

export interface TourSearchFormProps {
  closeModal?: () => void
}
interface QueryResponseData {
  _id?:string,
  destination?:string,
  images?:string[]
 }

const ToursSearchForm: FC<TourSearchFormProps> = ({ closeModal }) => {
  const [query, setQuery] = useState<string>("")
  const [response, setResponse] = useState<QueryResponseData[]>([])

  const { config } = useAppSelector((state) => state.initials)

  const getTours= async ()=>{
    try {
        
        const tours= await fetch(`${config?.NEXT_PUBLIC_TOURS_URL}/api/v1/tour-packages/all`, { next: { revalidate: 60 } })
        
        if (!tours.ok) {
          
          throw new Error('Failed to fetch data fsdfdsf')
        }else{
          
        }
       
        
        return tours.json()
    } catch (error) {
        console.log(error);
        
    }
}

async function findTours() {
    try {

      const response =  await getTours()


   
  //  setResponse(response?.tourPackages)
    
    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
  const findAttractionQuery = async (queries: string) => {
    try {
      console.log('fetching data...');
      const query = await fetch(`${config?.NEXT_PUBLIC_TOURS_URL}/api/v1/tour-packages/search?search=${queries}`, { cache: 'no-store' });
      return query.json();
    } catch (error) {
      console.log('Error fetching data:', error);
      throw error; 
    }
  };

  const fetchData = async () => {
    try {
      const response = await findAttractionQuery(query);
      console.log(response,'fetch dattaaa'); 
      setResponse(response.tourPackages)
     
    } catch (error) {
      console.log('Error in fetchData:', error);
    }
  };

  fetchData(); 

}, [query]); 



useEffect(() => {


    findTours()
}, [])





  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex flex-col md:flex-row rounded-3xl md:rounded-full md:shadow-xl dark:shadow-2xl md:bg-white dark:bg-neutral-800 ">
      
        <TourInput closeModal={closeModal} data={response} setQuery={setQuery}  className="flex-[1.5]" />
      
        <GuestsInput
          className="flex-1"
        />
      </form>
    );
  };

  return renderForm();
};

export default ToursSearchForm;



