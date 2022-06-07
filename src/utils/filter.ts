import { HotelFilterDataModel, FilterBy } from "../model/filter";

const sortByPricePerPerson = (
  dataSource: HotelFilterDataModel[]
): HotelFilterDataModel[] => {
  return dataSource.slice().sort((a, b) => {
    return a.pricePerPerson - b.pricePerPerson;
  });
};

export const getPriceRange = (
  dataSource: HotelFilterDataModel[]
): FilterBy[] => {
  const sortedList = sortByPricePerPerson(dataSource);

  if (sortedList && sortedList.length > 0) {
    const firstItem: HotelFilterDataModel = sortedList[0];
    const lastItem: HotelFilterDataModel = sortedList[sortedList.length - 1];

    const rangePriceItem = lastItem.pricePerPerson - firstItem.pricePerPerson;

    const priceDifference = Math.ceil(rangePriceItem / 4);
    const basePrice = firstItem.pricePerPerson;
    let priceRange: FilterBy[] = [];

    for (let i = 1; i < 5; i++) {
      const pricePerPerson = Math.ceil(basePrice + i * priceDifference);

      if (i === 1) {
        priceRange.push({
          key: i,
          valueText: `up to £${pricePerPerson}`,
          hotelId: sortedList
            .filter(s => s.pricePerPerson < pricePerPerson)
            ?.map(h => h.hotelId)
        });
      } else if (i > 1 && i < 4) {
        const lowerBoundValue = pricePerPerson - priceDifference;
        const upperBoundValue = pricePerPerson;
        priceRange.push({
          key: i,
          valueText: `£${lowerBoundValue} to £${upperBoundValue}`,
          hotelId: sortedList
            .filter(
              s =>
                s.pricePerPerson >= lowerBoundValue &&
                s.pricePerPerson <= upperBoundValue
            )
            ?.map(h => h.hotelId)
        });
      } else {
        const lowerBoundValue = pricePerPerson - priceDifference;
        priceRange.push({
          key: i,
          valueText: `over to £${lowerBoundValue}`,
          hotelId: sortedList
            .filter(s => s.pricePerPerson > lowerBoundValue)
            ?.map(h => h.hotelId)
        });
      }
    }
    return priceRange;
  }
};
