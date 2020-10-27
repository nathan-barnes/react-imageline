import React from "react";
import { Grid } from "@material-ui/core";

// import FeedbackButtonToggle from "../FeedbackButtonToggle";
import FeedbackSlider from "../components-generic/FeedbackSlider";

// import Waves from "@material-ui/icons/Waves";
import GraphicEq from "@material-ui/icons/GraphicEq";
// import RotateRightIcon from "@material-ui/icons/RotateRight";
// import BrightnessMediumIcon from "@material-ui/icons/BrightnessMedium";
import ViewListIcon from "@material-ui/icons/ViewList";

// import { AmplitudeIcon } from "../DimIcons";

export default function PerfMenu(props) {
  const {
    getProps,
    // getValue
  } = props;
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <FeedbackSlider
            label={"Perforations/ft"}
            {...getProps("Lines: Perf per Ft of Line")}
            icon={GraphicEq}
          />
        </Grid>
        <Grid item xs={12}>
          <FeedbackSlider
            label={"Modify Openness"}
            {...getProps("Lines: Stroke%ofMax")}
            step = {10}
            icon={ViewListIcon}
          />
        </Grid>
      </Grid>
    </div>
  );
}
