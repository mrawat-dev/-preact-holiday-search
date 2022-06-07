export interface HotelFilterDataModel {
  hotelId: string;
  pricePerPerson: number;
  starRating: string | number;
  hotelFacilities: string[];
}

export interface FilterBy {
  key: number;
  valueText: string;
  hotelIds: string[];
};

export interface FilterResult {
  status: boolean;
  hotelIds: string[];
}
