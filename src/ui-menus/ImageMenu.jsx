import React from "react";
import FeedbackImageUpload from "../components-generic/FeedbackImageUpload";
import FeedbackButtonToggle from "../components-generic/FeedbackButtonToggle";
import FeedbackSlider from "../components-generic/FeedbackSlider";
import { Grid } from "@material-ui/core";
import { ContrastIcon } from "../static/DimIcons";

export default function ImageMenu(props) {
  const { getProps } = props;

  return (
    <div>
      <Grid container justify="center" spacing={2}>
        {/* <Grid container spacing={2} direction="row-reverse"> */}
        <Grid
          item
          xs={12}
          //  sm={6} md={12} lg={6}
        >
          <FeedbackImageUpload {...getProps("Image: Input")} />
        </Grid>
        <Grid key={"stretch/crop"} item xs={12} sm={6} md={12} lg={6}>
          <FeedbackButtonToggle
            option1="Stretch"
            option2="Crop"
            {...getProps("Image: Crop/Stretch")}
          />
        </Grid>
        {/* </Grid> */}
        <Grid key={"invertSampling"} item xs={12} sm={6} md={12} lg={6}>
          <FeedbackButtonToggle //Replace with Checkbox
            option1="Invert"
            option2="Original"
            {...getProps("Image: Invert Sampling")}
          />
        </Grid>
        <Grid item xs={12}>
          <FeedbackSlider
            label={"Image Contrast"}
            icon={ContrastIcon}
            {...getProps("Image: Contrast")}
          />
        </Grid>
        {/* <Grid key={"invertColor"} item xs={12} sm={6} md={12} lg={12}>
          <FeedbackButtonToggle //Replace with Checkbox
            option1="Invert Color"
            option2="Original"
            {...getProps("Image: Invert Color")}
          />
        </Grid> */}
      </Grid>
    </div>
  );
}
