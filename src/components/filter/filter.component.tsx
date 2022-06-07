import { h, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { FilterBy } from "../../model/filter";
import { getPriceRange } from "../../utils/filter";

export const FilterByComponent = ({
  setStarFilter,
  setPriceFilter,
  setFacilityFilter,
  filerByDataList
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const [priceRange, setPriceRange] = useState<FilterBy[]>([]);
  const [starRange, setStarRange] = useState<FilterBy[]>([]);

  const defaultFilterValue = {
    status: false,
    hotelId: []
  };

  useEffect(() => {
    const priceRange = getPriceRange(filerByDataList);
    setPriceRange(priceRange);
  }, [filerByDataList]);

  const handleChange = (panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePriceCheckBoxChange = event => {
    if (event.target.checked) {
      const key = event.target.value;
      const getItems = priceRange.filter(p => p.key == key);
    
      if (getItems && getItems.length > 0) {
        const hoteIds = getItems.map(i => i.hotelId);
        if (hoteIds && hoteIds.length > 0) {
          return setPriceFilter({
            status: true,
            hotelId: hoteIds[0]
          });
        }
      }
    }
    setPriceFilter(defaultFilterValue);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography gutterBottom variant="h5" component="div">
        Filter by..
      </Typography>
      <Accordion
        expanded={expanded === "ratingPanel"}
        onChange={handleChange("ratingPanel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="rating-content"
          id="rating-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>RATING</Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "ppPanel"}
        onChange={handleChange("ppPanel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pp-content"
          id="pp-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Price (pp)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {priceRange &&
              priceRange.map((range, index) => (
                <Box sx={{ display: "inline-flex", m: 1 }}>
                  <FormControlLabel
                    key={`price-${index}`}
                    control={
                      <Checkbox
                        onChange={handlePriceCheckBoxChange}
                        value={range.key}
                      />
                    }
                    label={range.valueText}
                  />
                  <em>({range.hotelId.length})</em>
                </Box>
              ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "hfPanel"}
        onChange={handleChange("hfPanel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="hf-content"
          id="hf-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            Hotel Facilities
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
