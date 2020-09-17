import React from "react";
import { Grid } from "@material-ui/core";

// import FeedbackButtonToggle from "../FeedbackButtonToggle";
import FeedbackSlider from "../FeedbackSlider";

import { WidthIcon, HeightIcon } from "../DimIcons";

export default function ScopeMenu(props) {
  const {
    getProps,
    // getValue, setBool1, bool1
  } = props;
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <FeedbackSlider
            // key="Width"
            label="Width"
            {...getProps("Scope: Width")}
            icon={WidthIcon}
          />
        </Grid>
        <Grid item xs={12}>
          <FeedbackSlider
            // key="Height"
            label="Height"
            {...getProps("Scope: Height")}
            icon={HeightIcon}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FeedbackButtonToggle
            option1="Wall"
            option2="Ceiling"
            setValue={setBool1}
            value={bool1}
          />
        </Grid> */}
      </Grid>
    </div>
  );
}
