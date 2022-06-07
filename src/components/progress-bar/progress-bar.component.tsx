
import { h } from "preact";
import { LinearProgress } from "@mui/material";

import { withStyles } from "@material-ui/core/styles";

export const ProgressBarComponent = withStyles({
    colorPrimary: {
      backgroundColor: "#DA0530"
    },
    barColorPrimary: {
      backgroundColor: "#FF7377"
    }
})(LinearProgress);

