import React, { useEffect, useState } from "react";
import { count, isoCodes } from "../constants";
import './EnquiryContent.css'
import { useAppSelector } from "@/redux/store";
interface contentProps {
  tourDetails: any;
}
export default function EnquiryContent({
  tourDetails,
}: contentProps): React.ReactElement {

  const { config } = useAppSelector((state) => state.initials);
  const [submitSuccess,setSubmitSuccess] = useState(false)
  const [error,setError] = useState('')

  const [formData, setFormdata] = useState({
    tourPackageId: "",
    name: "",
    email: "",
    phoneNumber: "",
    adultCount: "1",
    childrenCount: "0",
    countryCode: "DZ",
    isFlightBooked: false,
    fromDate: "",
    remarks: "",
  });

  useEffect(() => {
    setFormdata({
      ...formData,
      tourPackageId: "65701cc260e6dc64cd9b2fa3",
    });
  }, []);

  let errorTimeOut: NodeJS.Timeout;

  function handleErrorResponse(error:string) {
    setError(error);
  
    errorTimeOut = setTimeout(() => {
      setError('');
      clearTimeout(errorTimeOut);
    }, 4000);
  }
  
 

  const selectDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const excludedDates = tourDetails.excludedDates

    let dateExclued = excludedDates.includes(e.target.value);

    if (dateExclued) {
      handleErrorResponse('This date is excluded please choose another date')
      return;
    }

    setFormdata({
      ...formData,
      fromDate: e.target.value,
    });
  };
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    month = month.length === 1 ? "0" + month : month; // Pad single digit month with zero
    let day = today.getDate().toString();
    day = day.length === 1 ? "0" + day : day; // Pad single digit day with zero
    return `${year}-${month}-${day}`;
  }

  const flightOptionChange = (value: string) => {
    if (value === "yes") {
      setFormdata({
        ...formData,
        isFlightBooked: true,
      });
    } else {
      setFormdata({
        ...formData,
        isFlightBooked: false,
      });
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        handleErrorResponse("Enter a proper email")
        return;
      }
    }else{
      handleErrorResponse("Email is required")
    }

    try {
      console.log(formData, "formData", tourDetails._id);
 
      const response = await fetch(
        `${config?.NEXT_PUBLIC_TOURS_URL}/api/v1/tour-packages/enquiries/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        console.log(responseData,"responseData");
        
        handleErrorResponse(responseData.error)
        throw new Error("Network response was not ok");
      } else {
        console.log(response, "REsponse");
        setSubmitSuccess(true)
      }
    } catch (error) {
      console.error("There was an error submitting the enquiry:", error);
    }
  }

  return (
    <div>
        {!submitSuccess ?
      <div className=" w-full  h-full sm:max-h-[570px]  bg-white rounded-xl p-[3%] w-fit min-w-[250px] overflow-y-scroll">
        <h1 className="font-bold  sm:text-lg md:text-xl text-center">
          {tourDetails?.packageName}
        </h1>
        <hr className="mt-2" />
        <div className="flex flex-col sm:flex-row  max-h-[200px] sm:max-h-[160px] overflow-y-scroll tour-hotel-container">
          <div className="pt-2 w-full sm:w-1/2 ">
            {/* Tours */}
            <h1 className="ml-3 font-sans font-semibold">Tour</h1>
            {tourDetails?.itineraries?.map((day: any, index: number) => {
              return (
                <div key={index}>
                  {day?.itineraryItems?.map((schedule: any, index: number) => {
                    return (
                      <h2
                        className="bg-red-100 text-red-400 mb-1 rounded-full w-fit px-3 text-[10px] sm:text-sm  font-medium "
                        key={index}
                      >
                        {schedule?.itineraryName}
                      </h2>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className=" w-full sm:w-1/2  whitespace-no-wrap mt-1 ">
            {/* hotels */}
            <h1 className="ml-3 font-sans font-semibold">Hotel</h1>
            {tourDetails?.hotels?.map((hotelArray: any, index: number) => {
              return (
                <div key={index}>
                  {hotelArray?.hotelOptions?.map(
                    (hotels: any, index: number) => {
                      return (
                        <h2
                          key={index}
                          className="bg-red-100 text-red-400 mb-1 rounded-full w-fit px-3 text-[10px] sm:text-sm   font-medium"
                        >
                          {hotels?.hotel?.hotelName}
                        </h2>
                      );
                    }
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <hr className=" hidden sm:block sm:mt-2" />

        {/* form start */}
        <form className="mt-1 sm:mt-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col sm:flex-row gap-1 ">
            <input
              onChange={(e) => {
                setFormdata({
                  ...formData,
                  name: e.target.value,
                });
              }}
              value={formData.name}
              required
              className="remove-focus-outline rounded-lg border-none w-full sm:w-1/2 h-[30px] sm:h-[40px]  bg-gray-200 text-stone-500 text-[12px] sm:text-base"
              placeholder="Name"
              type="text"
            />
            <input
              onChange={(e) => {
                setFormdata({
                  ...formData,
                  email: e.target.value,
                });
              }}
              value={formData.email}
              required
              className="w-full sm:w-1/2  remove-focus-outline rounded-lg border-none bg-gray-200 h-[30px] sm:h-[40px] text-stone-500 text-[12px] sm:text-base"
              placeholder="Email Address"
              type="email"
            />
          </div>

          <div className="flex flex-col sm:flex-row mt-1 sm:mt-3 gap-1 sm:gap-3">
            <div className="flex w-full sm:w-1/2 gap-1 sm:gap-3 ">
              <select
              required
                value={formData.countryCode}
                onChange={(e) => {
                  setFormdata({
                    ...formData,
                    countryCode: e.target.value,
                  });
                }}
                className="w-2/6 min-w-[30px]  remove-focus-outline rounded-lg border-none bg-gray-200 h-[35px] sm:h-[40px] text-stone-500 text-[12px] sm:text-base"
                name=""
                id=""
              >
                {isoCodes?.map((iso, index) => (
                  <option key={index} value={iso}>
                    {iso}
                  </option>
                ))}
              </select>

              <input
                required
                className="w-5/6  remove-focus-outline rounded-lg border-none bg-gray-200 h-[35px] sm:h-[40px] text-stone-500 text-[12px] sm:text-base"
                placeholder="Mobile"
                type="number"
                value={formData?.phoneNumber ? formData?.phoneNumber : ""}
                title="Please enter only numeric digits"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "+" || e.key === "-") {
                    e.preventDefault();
                  }
                }}
                minLength={10}
                maxLength={10}
                onChange={(e) => {
                  setFormdata({
                    ...formData,
                    phoneNumber: e.target.value,
                  });
                }}
              />
            </div>

            <div className="w-1/2 h-[30px] sm:h-[40px] text-[12px]">
              <input
                required
                min={getCurrentDate()}
                onChange={(e) => {
                  selectDate(e);
                }}
                className="remove-focus-outline border-none h-full w-[200px] bg-gray-200 text-stone-500 rounded-lg flex justify-start pl-3 items-center"
                type="date"
              ></input>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col">
              <label className="ml-1 font-medium text-[12px] sm:text-base">Adult</label>
              <select
                required
                className="remove-focus-outline rounded-lg border-none bg-gray-200 text-stone-500 h-[35px] sm:h-[40px]"
                name="adult"
                id=""
                value={formData.adultCount}
                onChange={(e) => {
                  setFormdata({
                    ...formData,
                    adultCount: e.target.value,
                  });
                }}
              >
                {count.map((count, index) => {
                  return (
                    <option key={index} value={count}>
                      {count}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[12px] sm:text-base ">child</label>
              <select
                className=" remove-focus-outline rounded-lg border-none bg-gray-200 text-stone-500 h-[35px] sm:h-[40px]"
                name="child"
                onChange={(e) => {
                  // const selectedValue = parseInt(e.target.value);
                  setFormdata({
                    ...formData,
                    childrenCount: e.target.value,
                  });
                }}
                id=""
              >
                {count.map((count, index) => {
                  return (
                    <option key={index} value={count}>
                      {count}
                    </option>
                  );
                })}
              </select>
            </div>
            <div></div>

            <div className="flex flex-col">
              <label className="font-medium text-[12px] sm:text-base">Flight Booked</label>
              <div className="flex juftify-center items-center">
                <input
                  id="flightBookedYes"
                  checked={formData.isFlightBooked === true}
                  onChange={() => flightOptionChange("yes")}
                  className="bg-whi te "
                  type="radio"
                />{" "}
                <span>Yes</span>
              </div>
              <div className="flex juftify-center items-center">
                <input
                  checked={formData.isFlightBooked === false}
                  onChange={() => flightOptionChange("no")}
                  className="bg-white "
                  type="radio"
                />{" "}
                <span>No</span>
              </div>
            </div>
          </div>
          <textarea
          value={formData.remarks}
            onChange={(e) => {
              setFormdata({
                ...formData,
                remarks: e.target.value,
              });
            }}
            className="w-full  h-[50px] max-h-[50px] min-h-[40px] remove-focus-outline rounded-lg border-none bg-gray-200 text-stone-500 text-[12px] sm:text-base"
            placeholder="Remarks"
            name="Remarks"
            id=""
          ></textarea>
          <div className="w-full h-[20px]  flex justify-center pb-[10px] mb-2 text-red-500">
          {error&&<div>{error}</div>} 
          </div>
          <button
            type="submit"
            className="w-full h-[35px] sm:h-[50px]  rounded-md bg-blue-600 text-white font-semibold"
          >
            Submit Enquiry
          </button>
        </form>
        {/* form end */}
      </div>
      :
      <section className="p-10 bg-white rounded-md">
        <h1 className="font-bold">
      Enquiry submited successfully
        </h1>
      </section>
        }
    </div>
  );
}
