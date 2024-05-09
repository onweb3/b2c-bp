import {
	BestSellingAttractions,
	Blog,
	ENVs,
	Home,
	InitialAttractionDestiantions,
	InitialCountries,
	InitialCurrencies,
	InitialHotelDestinations,
	SelectedCurrency,
	TopAttractions,
} from "@/data/general/types";
import { TourPackage } from "@/data/tours/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
	UAE: InitialCountries;
	selectedCurrency: SelectedCurrency;
	countries: InitialCountries[];
	attractionDestinations: InitialAttractionDestiantions[];
	currencies: InitialCurrencies[];
	hotelDestinations: InitialHotelDestinations[];
	tours: TourPackage[];
	globalData: {
		home: Home;
		topAttractions: TopAttractions[];
		bestSellingAttractions: BestSellingAttractions[];
		tours: TourPackage[];
		recentBlogs: Blog[];
	};
	config: ENVs;
};

const UAE_FLAG =
	"https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.10/svg/ae.svg";

const initialState = {
	UAE: {},
	selectedCurrency: {
		isocode: "AED",
		conversionRate: 1,
		flag: UAE_FLAG,
	},
	countries: [],
	attractionDestinations: [],
	currencies: [],
	hotelDestinations: [],
	tours: [],
	globalData: {
		home: {},
		topAttractions: [],
		bestSellingAttractions: [],
		tours: [],
		recentBlogs: [],
	},
	config: {} as ENVs,
} as InitialState;

export const initials = createSlice({
	name: "initials",
	initialState: initialState,
	reducers: {
		changeCurrencyInitials: (state, action) => {
			state.selectedCurrency = {
				isocode: action.payload?.isocode,
				conversionRate: action.payload?.conversionRate,
				flag: action.payload?.flag,
			};
			typeof window !== "undefined" &&
				localStorage.setItem(
					"currency",
					JSON.stringify(state.selectedCurrency)
				);
		},

		setTourData: (state, action) => {
			state.tours = action.payload.tourPackages;
		},

		setInitialData: (state, action) => {
			state.countries = action.payload.countries;
			state.attractionDestinations = action.payload.destinations;
			state.currencies = action.payload.currencies;
			state.hotelDestinations = action.payload.popularHotelCities;

			const localCurrency =
				typeof window !== "undefined" &&
				localStorage.getItem("currency");

			// Settiing up the selected currency all time initially on page load.
			if (localCurrency) {
				const parsedCurrency = JSON.parse(localCurrency);

				if (parsedCurrency) {
					const objIndex = state.currencies?.findIndex((currency) => {
						return (
							currency?.isocode?.toUpperCase() ===
							parsedCurrency?.isocode?.toUpperCase()
						);
					});
					if (objIndex !== -1) {
						state.selectedCurrency = {
							isocode:
								state.currencies[objIndex]?.isocode || "AED",
							conversionRate:
								state.currencies[objIndex]?.conversionRate || 1,
							flag:
								state.currencies[objIndex]?.country?.flag ||
								UAE_FLAG,
						};
					} else {
						state.selectedCurrency = {
							isocode: "AED",
							conversionRate: 1,
							flag: UAE_FLAG,
						};
					}
				} else {
					state.selectedCurrency = {
						isocode: "AED",
						conversionRate: 1,
						flag: UAE_FLAG,
					};
				}
			}

			// Setting the UAE country data with iso code initially.
			state.UAE = action.payload?.countries?.find(
				(item: InitialCountries) => item?.isocode === "AE"
			);
		},
		// setting Home global Data.
		setGlobalHomeData: (state, action) => {
			state.globalData.home = action.payload.home;
			state.globalData.topAttractions = action.payload.topAttractions;
			state.globalData.bestSellingAttractions =
				action.payload.bestSellingAttractions;

			state.globalData.recentBlogs = action.payload.recentBlogs;
		},
		setInitialEnvData: (state, action) => {
			state.config = action.payload?.data;
		},
	},
});

export const {
	setInitialData,
	changeCurrencyInitials,
	setGlobalHomeData,
	setTourData,
	setInitialEnvData,
} = initials.actions;
export default initials.reducer;
