import { h, JSX } from "preact";

import { Box, Grid, Typography } from "@material-ui/core";
import { Rating } from "@mui/material";

import * as styles from "./hotel.module.less";

export const HotelContent = ({ hotel, pricePerPerson }) => {
  return (
    <Box
      sx={{
        display: "grid",
        m:1,
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1,
        gridTemplateRows: "auto",
        gridTemplateAreas: `"header header header ppp"
        "main main . sidebar"
        "footer footer footer footer"`
      }}
    >
      <Box sx={{ gridArea: "header" }}>
        <Typography gutterBottom variant="h5" component="div">
          {hotel.name}
        </Typography>
      </Box>
      <Box sx={{ gridArea: "ppp" }}>
        <Typography variant="h5" className={styles["price"]}>£{pricePerPerson}</Typography>
      </Box>
      <Box sx={{ gridArea: "main" }}>
        <div className={styles["tripadvisor"]}>
          <img src={hotel.tripAdvisor?.ratingImageUrl} alt="ratings" />
          <label>Based on {hotel.tripAdvisor?.numReviews} reviews</label>
        </div>
      </Box>
      <Box sx={{ gridArea: "sidebar" }}>
        <div className={styles["rating"]}>
          <Rating name="read-only" value={hotel.content?.starRating} readOnly />
          <label className={styles["rating-label"]}>Star rating</label>
        </div>
      </Box>
      <Box sx={{ gridArea: "footer" }}>
        <Typography variant="body2">
          {hotel.content.hotelDescription}
        </Typography>
      </Box>
    </Box>
  );
};
