import React from "react";
import { Grid, Typography } from "@material-ui/core";

// import FeedbackButtonToggle from "../FeedbackButtonToggle";
import FeedbackSlider from "../components-generic/FeedbackSlider";

import { WidthIcon, HeightIcon } from "../static/DimIcons";

export default function ScopeMenu(props) {
  const { getProps } = props;
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <FeedbackSlider
            // key="Width"
            label="Width"
            {...getProps("Scope: Width")}
            max={18}
            defVal={18}
            icon={WidthIcon}
          />
        </Grid>
        <Grid item xs={12}>
          <FeedbackSlider
            // key="Height"
            label="Height"
            {...getProps("Scope: Height")}
            max={18}
            icon={HeightIcon}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <p />
          <Typography align="center" variant="h6">
            <a href={"https://www.azahner.com/contact/"}>Contact Us</a> to customize ImageLines for specific dimensions or
            conditions.
          </Typography>
        </Grid> */}
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
