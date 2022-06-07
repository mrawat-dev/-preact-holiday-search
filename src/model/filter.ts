export interface HotelFilterDataModel {
  hotelId: string;
  pricePerPerson: number;
  starRating: number;
  hotelFacilities: string[];
}

export interface FilterBy {
  key: number;
  valueText: string;
  hotelId: string[];
};

export interface FilterResult {
  status: boolean;
  hotelId: string[];
}
