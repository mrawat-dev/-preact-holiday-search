import { h, JSX } from "preact";
import { useRouter } from "preact-router";
import { useEffect, useState } from "preact/hooks";

import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

import SearchComponent from "../components/search.component";
import { ProgressBarComponent } from "../components/progress-bar/progress-bar.component";

import { doRequest } from "../services/http.service";
import { BookingRequest, BookingResponse, Holiday } from "../types/booking";
import { DateTime } from "luxon";

export default function ResultsRoute(): JSX.Element {
  const [searchParams] = useRouter();

  const [holidays, setHolidays] = useState<Holiday[]>([]);
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
          const holidayList = data.holidays;
          setHolidays(holidayList);
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
          {holidays &&
            holidays.map((holiday: Holiday) => (
              <span>{holiday.hotel.name}</span>
            ))}
        </div>
      )}
    </section>
  );
}
