import { UUID } from "crypto";
import {
	BookingTypeEnum,
	CategorySearchByDestination,
} from "../attraction/types";

export interface SelectedCurrency {
	isocode: string;
	conversionRate: number;
	flag: string;
}

export interface InitialCountries {
	countryName?: string;
	createdAt?: Date | string;
	flag?: string;
	isDeleted?: boolean;
	isocode?: string;
	phonecode?: string;
	updatedAt?: Date | string;
	__v?: number;
	_id?: UUID | string;
}

export interface InitialAttractionDestiantions {
	country?: string;
	createdAt?: Date | string;
	image?: string;
	isDeleted?: boolean;
	name?: string;
	updatedAt?: Date | string;
	slug?: string;
	__v?: number;
	_id?: string;
}

export interface InitialCurrencies {
	conversionRate?: number;
	country?: InitialCountries;
	createdAt?: Date | string;
	currencyName?: string;
	currencySymbol?: string;
	isocode?: string;
	updatedAt?: Date | string;
	__v?: number;
	_id?: string;
}

export interface InitialHotelDestinations {
	childSuggestions?: Array<any>;
	cityId?: string;
	cityName?: string;
	clickable?: boolean;
	countryName?: string;
	propertyCount?: number;
	stateName?: string;
	suggestionType?: string;
	_id?: string;
}

export interface User {
	_id: UUID | string;
	name: string;
	email: string;
	isEmailVerified: boolean;
	country: UUID | string;
	balance: number;
	isAffiliate: boolean;
	affiliateCode: number;
}

/// Home api data.
export interface TopAttractions {
	_id: UUID | string;
	destination: {
		name: string;
	};
	title: string;
	category: CategorySearchByDestination;
	bookingType: BookingTypeEnum;
	images: string[];
	slug: string;
	activity: {
		adultPrice: number;
		lowPrice: number;
	};
	isPromoCode: boolean;
	totalReviews: number;
	averageReviews: number;
}

export interface BestSellingAttractions {
	_id: UUID | string;
	destination: {
		name: string;
	};
	title: string;
	category: CategorySearchByDestination;
	bookingType: BookingTypeEnum;
	images: string[];
	slug: string;
	activity: {
		adultPrice: number;
	};
	isPromoCode: boolean;
	totalReviews: number;
	averageRating: number;
}

export interface HomeCard {
	title: string;
	description: string;
	backgroundImage: string;
	tag: string;
	url: string;
	isRelativeUrl: boolean;
	_id: UUID | string;
	icon: string;
}

export interface NavLinks {
	name: string;
	link: string;
	isRelativeUrl: boolean;
	_id: UUID | string;
}

export interface Footer {
	title: string;
	navLinks: NavLinks[];
	_id: UUID | string;
}

export interface Heros {
	title: string;
	description: string;
	image: string;
	place: string;
	_id: UUID | string;
}
export interface Home {
	_id?: UUID | string;
	settingsNumber?: number;
	__v?: number;
	bestSellingAttractions?: string[];
	cards?: HomeCard[];
	createdAt?: Date | string;
	footer?: Footer[];
	heroImages?: string[];
	isBestSellingAttractionsSectionEnabled?: boolean;
	isBlogsEnabled?: boolean;
	isTopAttractionsSectionEnabled?: boolean;
	logo?: string;
	topAttractions?: string[];
	updatedAt?: Date | string;
	heroDescription?: string;
	heroTitle?: string;
	email?: string;
	facebookUrl?: string;
	footerDescription?: string;
	instagramUrl?: string;
	phoneNumber1?: number;
	phoneNumber2?: number;
	heros?: Heros[];
}

export interface BlogCategory {
	categoryName: string;
	createdAt: Date | string;
	description: string;
	slug: string;
	updatedAt: Date | string;
	_id: UUID | string;
	__v?: string;
}

export interface Blog {
	body: string;
	category: BlogCategory;
	createdAt: Date | string;
	isDeleted: Boolean;
	slug: string;
	tags: string[];
	thumbnail: string;
	title: string;
	updatedAt: Date | string;
	__v: 0;
	_id: UUID | string;
}

export interface ENVs {
	_id: string;
	NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
	CLOUDINARY_API_KEY: string;
	CLOUDINARY_API_SECRET: string;
	CLOUDINARY_FOLDER: string;
	GOOGLE_CLIENT_ID: string;
	GOOGLE_CLIENT_SECRET: string;
	NEXTAUTH_SECRET: string;
	NEXTAUTH_URL: string;
	NEXT_PUBLIC_GOOGLE_ANALYTIC_ID: string;
	NEXT_PUBLIC_TABBY_PUBLIC_KEY: string;
	NEXT_PUBLIC_TABBY_MERCHANT_CODE: string;
	NEXT_PUBLIC_TOURS_URL: string;
	NEXT_PUBLIC_SERVER_URL: string;
	NEXT_PUBLIC_CLIENT_URL: string;
	NEXT_PUBLIC_CDN_URL: string;
	NEXT_PUBLIC_TITLE_NAME: string;
	NEXT_PUBLIC_TITLE_SHORT_NAME: string;
	NEXT_PUBLIC_TITLE_SHORT_CODE: string;
	NEXT_PUBLIC_COMPANY_LOGO: string;
	NEXT_PUBLIC_COMPANY_FAVICON: string;
	NEXT_PUBLIC_BANNER_IMAGE: string;
	NEXT_PUBLIC_BANNER_VIDEO: string;
	NEXT_PUBLIC_BANNER_VIDEO_MOBILE: string;
	NEXT_PUBLIC_BANNER_IMAGE_MOBILE: string;
	NEXT_PUBLIC_MOBILE_APP_IMAGE: string;
	NEXT_PUBLIC_PLAYSTORE_URL: string;
	NEXT_PUBLIC_COMPANYADDRESS1: string;
	NEXT_PUBLIC_COMPANYADDRESS2: string;
}
