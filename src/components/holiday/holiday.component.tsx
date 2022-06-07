import { h, JSX } from "preact";

import Card from "@mui/material/Card";
import { Box } from "@material-ui/core";

import { HotelContent } from "./hotel-content.component";
import { HotelMedia } from "./hotel-media.component";

export const HolidayCard = ({ holiday }) => {
  return (
    <Box sx={{ m: 2 }}>
      <Card sx={{ maxWidth: "auto", display: 'flex' }} key={holiday?.hotel?.id}>
        <HotelMedia images={holiday?.hotel?.content?.images} />
        <HotelContent hotel={holiday?.hotel} pricePerPerson={holiday?.pricePerPerson} />
      </Card>
    </Box>
  );
};
