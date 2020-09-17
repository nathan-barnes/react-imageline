import React from "react";
import { Grid } from "@material-ui/core";

// import FeedbackButtonToggle from "../FeedbackButtonToggle";
import FeedbackSlider from "../FeedbackSlider";

// import Waves from "@material-ui/icons/Waves";
import GraphicEq from "@material-ui/icons/GraphicEq";
// import RotateRightIcon from "@material-ui/icons/RotateRight";

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
            label={"Max Perforations/ft"}
            {...getProps("Lines: Perf per Ft of Line")}
            icon={GraphicEq}
          />
        </Grid>
        <Grid item xs={12}>
          <FeedbackSlider
            label={"Stroke (%) - Modify Openness"}
            {...getProps("Lines: Stroke%ofMax")}
            // icon={RotateRightIcon}
          />
        </Grid>
      </Grid>
    </div>
  );
}
