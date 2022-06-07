import { h, JSX } from "preact";
import { useRouter } from "preact-router";
import { useEffect, useState } from "preact/hooks";

import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

import { DateTime } from "luxon";

import SearchComponent from "../components/search/search.component";
import { ProgressBarComponent } from "../components/progress-bar/progress-bar.component";
import { SearchResult } from "../components/search-result/search-result.component";

import { doRequest } from "../services/http.service";
import { BookingRequest, BookingResponse, Holiday } from "../types/booking";
import { HotelFilterDataModel } from "../model/filter";

export default function ResultsRoute(): JSX.Element {
  const [searchParams] = useRouter();

  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [filterDataModel, setFilterDataModel] = useState<
    HotelFilterDataModel[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const departureDate = DateTime.fromFormat(
      searchParams?.matches?.departureDate,
      "yyyy-MM-dd"
    ).toFormat("dd-MM-yyyy");
    const requestBody: BookingRequest = {
      bookingType: "holiday",
      location: searchParams?.matches?.location,
      departureDate: departureDate,
      duration: (searchParams?.matches?.duration as unknown) as number,
      gateway: "LHR",
      partyCompositions: [
        {
          adults: (searchParams?.matches?.adults as unknown) as number,
          childAges: [],
          infants: 0
        }
      ]
    };

    const fetchData = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const response = await doRequest(
          "POST",
          "/cjs-search-api/search",
          requestBody
        );
        if (response as BookingResponse) {
          const data = response as BookingResponse;
          const holidayList: Holiday[] = data.holidays;

          let filterDataModel: HotelFilterDataModel[] = [];
          holidayList.forEach(item => {
            filterDataModel.push({
              hotelId: item?.hotel?.id,
              pricePerPerson: item?.pricePerPerson,
              starRating: item?.hotel?.content?.starRating as number,
              hotelFacilities: item?.hotel?.content?.hotelFacilities
            });
          });

          setHolidays(holidayList);
          setFilterDataModel(filterDataModel);
        }
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [searchParams]);

  return (
    <section>
      {hasError && (
        <Snackbar
          open={hasError}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="error">Something went wrong!</Alert>
        </Snackbar>
      )}
      {isLoading ? (
        <ProgressBarComponent />
      ) : (
        <div>
          <SearchComponent />
          {(holidays && filterDataModel) && (
            <SearchResult
              holidays={holidays}
              filterDataModel={filterDataModel}
            />
          )}
        </div>
      )}
    </section>
  );
}
