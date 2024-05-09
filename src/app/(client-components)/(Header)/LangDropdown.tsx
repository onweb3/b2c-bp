import { Popover, Tab, Transition } from "@headlessui/react";
import {
  BanknotesIcon,
  GlobeAltIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { FC, Fragment } from "react";
import { headerCurrency } from "./CurrencyDropdown";
import CurrencySelector from "@/shared/CurrencySelector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { changeCurrencyInitials } from "@/redux/features/initialsSlice";

export const headerLanguage = [
  {
    id: "English",
    name: "English",
    description: "United State",
    active: true,
  },
  // {
  //   id: "Vietnamese",
  //   name: "Vietnamese",
  //   description: "Vietnamese",
  //   href: "##",
  // },
  // {
  //   id: "Francais",
  //   name: "Francais",
  //   description: "Belgique",
  //   href: "##",
  // },
  // {
  //   id: "Francais",
  //   name: "Francais",
  //   description: "Canada",
  //   href: "##",
  // },
  // {
  //   id: "Francais",
  //   name: "Francais",
  //   description: "Belgique",
  //   href: "##",
  // },
  // {
  //   id: "Francais",
  //   name: "Francais",
  //   description: "Canada",
  //   href: "##",
  // },
];

interface LangDropdownProps {
  panelClassName?: string;
  className?: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const LangDropdown: FC<LangDropdownProps> = ({
  panelClassName = "top-full right-0 max-w-sm w-96",
  className = "hidden md:flex",
}) => {
  const renderLang = (close: () => void) => {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        {headerLanguage.map((item, index) => (
          <a
            key={index}
            onClick={() => close()}
            className={`flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${item.active ? "bg-gray-100 dark:bg-gray-700" : "opacity-80"
              }`}
          >
            <div className="">
              <p className="text-sm font-medium ">{item.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    );
  };

  const dispatch = useDispatch<AppDispatch>()

  const { currencies, selectedCurrency } = useSelector((state: RootState) => state.initials);


  const renderCurr = (close: () => void) => {
    return (
      <div className="flex flex-col gap-2">

        {currencies.length && currencies?.map((currency) => (
          <div
            onClick={() => {
              dispatch(changeCurrencyInitials({
                isocode: currency?.isocode,
                conversionRate: currency?.conversionRate,
                flag: currency?.country?.flag,
              }))
              close()
            }}
            key={currency?._id} className={`flex items-center gap-3 px-5 py-3  rounded-xl cursor-pointer ${selectedCurrency.isocode === currency.isocode ? " bg-green-200 shadow-md dark:bg-blue-600 " : " hover:bg-gray-100 dark:hover:bg-neutral-700 "}`}>
            <div className="">
              <Image
                alt="Currency"
                className="object-cover rounded "
                src={currency?.country?.flag || ""}
                width={30}
                height={20}
              />
            </div>
            <div className="capitalize text-sm">{currency?.country?.countryName} / {currency?.isocode}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Popover className={`LangDropdown relative ${className}`}>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-80"}
             group self-center h-10 sm:h-12 px-3 py-1.5 inline-flex items-center text-sm text-gray-800 dark:text-neutral-200 font-medium hover:text-opacity-100 focus:outline-none `}
            >
              <GlobeAltIcon className="w-5 h-5 opacity-80" />
              <span className="mx-1">/</span>
              <BanknotesIcon className="w-5 h-5 opacity-80" />
              <ChevronDownIcon
                className={`${open ? "-rotate-180" : "text-opacity-70"}
                  ml-1 h-4 w-4  group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className={`absolute z-20  ${panelClassName}`}>
                <div className="p-3 sm:p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5">
                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-full bg-gray-100 dark:bg-slate-700 p-1">
                      {["Language", "Currency"].map((category) => (
                        <Tab
                          key={category}
                          className={({ selected }) =>
                            classNames(
                              "w-full rounded-full py-2 text-sm font-medium leading-5 text-gray-700",
                              "focus:outline-none focus:ring-0",
                              selected
                                ? "bg-white shadow"
                                : "text-gray-700 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-900/40"
                            )
                          }
                        >
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels className="mt-5">
                      <Tab.Panel
                        className={classNames(
                          "rounded-xl p-3",
                          "focus:outline-none focus:ring-0"
                        )}
                      >
                        {renderLang(close)}
                      </Tab.Panel>
                      <Tab.Panel
                        className={classNames(
                          "rounded-xl ",
                          "focus:outline-none focus:ring-0"
                        )}
                      >
                        {renderCurr(close)}
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};
export default LangDropdown;
