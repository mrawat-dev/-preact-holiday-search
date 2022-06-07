import { h, JSX } from "preact";
import { useState, useEffect } from "preact/hooks";

import { Grid } from "@material-ui/core";

import { FilterByComponent } from "../filter/filter.component";
import { HolidayCard } from "../holiday/holiday.component";

import { Holiday } from "../../types/booking";
import { FilterResult } from "../../model/filter";

export const SearchResult = ({ holidays, filterDataModel }) => {
  const defaultFilter = {
    status: false,
    hotelId: []
  };

  const [priceFilter, setPriceFilter] = useState<FilterResult>(defaultFilter);
  const [starFilter, setStarFilter] = useState<FilterResult>(defaultFilter);
  const [facilityFilter, setFacilityFilter] = useState<FilterResult>(
    defaultFilter
  );

  const [filteredResults, setFilteredResults] = useState<Holiday[]>(holidays);

  useEffect(() => {
    let filteredData = [...holidays];

    if (priceFilter.status) {
      filteredData = filteredData.filter((item: Holiday) =>
        priceFilter.hotelId.includes(item.hotel.id)
      );
    }

    if (starFilter.status) {
      filteredData = filteredData.filter((item: Holiday) =>
        priceFilter.hotelId.includes(item.hotel.id)
      );
    }

    if (facilityFilter.status) {
      filteredData = filteredData.filter((item: Holiday) =>
        facilityFilter.hotelId.includes(item.hotel.id)
      );
    }

    setFilteredResults(filteredData);
  }, [priceFilter, starFilter, facilityFilter, holidays]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {filterDataModel && (
          <FilterByComponent
            filerByDataList={filterDataModel}
            setPriceFilter={setPriceFilter}
            setStarFilter={setStarFilter}
            setFacilityFilter={setFacilityFilter}
          />
        )}
      </Grid>
      <Grid item xs={8}>
        {filteredResults &&
          filteredResults.map((holiday, index) => (
            <HolidayCard key={`holiday-${index}`} holiday={holiday} />
          ))}
      </Grid>
    </Grid>
  );
};
