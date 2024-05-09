import { UUID } from "crypto";

export interface Hotels {
    _id:UUID | string;
    price: number;
    title:string;
    noofNights: number;
    city: UUID | string;
    country: UUID | string;
    hotelOptions:HotelOptions[]
    address: string;
    hotelName: string;
    image: {
        isRelative:boolean;
        _id:UUID | string;
        path: string;
    };
    
}

export interface HotelOptions{
    roomType: {
        _id:UUID | string;
        roomName: string;
    };
    roomTypeId:UUID | string;
        hotel:Hotel;
        price:number;
    hotelId: string;
    boardCode: string;
  }
  export interface Hotel{
    address:string;
    hotelName:string;
    _id:UUID | string;
    image:{
        isRelative:boolean;
        path:string;
        _id:UUID | string;
    }
  }
  export interface  ItineraryItems{
    activity:{
        attraction:{
            images:string[];
            thumbnail:string;
            _id:UUID | string;
        };
        name:string;
        _id:UUID | string;
    };
    activityId:UUID | string;
    attractionId:UUID | string;
    description:string;
    itineraryName:string;
    price:number|null;
    transferType:string;
    _id:UUID | string;
  }

  export interface  Itineraries{
    itineraryItems:ItineraryItems[];
    title:string;
    _id:UUID | string;
  }
  export interface  packageTheme{
    themeName:string;
    _id:UUID | string;
  }

export interface TourDetails {
    airportTransferPrice: number;
    availableDates: [];
    country: {
        _id:UUID | string;
      countryName: string;
    };
    createdAt: string;
    destination: Destination;
    excludedDates: [];
    exclusions: TrustedHTML;
    hotels: Hotels[]; 
    inclusions: TrustedHTML;
    interHotelPrice: number;
    isActive: boolean;
    isAirportTransfer: boolean;
    isCustomDate: boolean;
    isDeleted: boolean;
    isInterHotelTransfer: boolean;
    itineraries: Itineraries[]; 
    noofDays: number;
    overveiw: string;
    packageName: string;
    packageThemes: packageTheme[]; 
    packageType: string;
    slug: string;
    termsAndConditions: TrustedHTML;
    thumbnail: string;
    totalPrice: number;
    updatedAt: string;
    visaPolicy: TrustedHTML;
    _id:UUID | string;
  }
  
  export interface TourPackage {
    country: {
      countryName: string;
    };
    name: string;
    destination?: Destination; 
    noofDays: number;
    packageName: string;
    packageThemes: Theme[];
    packageType: string;
    slug: string;
    thumbnail: string[];
    totalPrice: number;
    _id:UUID | string;
  }
  
  interface Destination{
    name: string;
    _id:UUID | string;
  }
  
  interface Theme {
    themeName: string;
    _id:UUID | string;
  }
  
  